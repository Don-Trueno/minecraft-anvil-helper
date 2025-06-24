import { ENCHANTMENTS, i18n } from './data.js';
import { ENCHANTMENTS_OVERRIDE } from './data-bedrock.js';

function getEnchantments(useBedrock) {
  if (!useBedrock) return ENCHANTMENTS
  return { ...ENCHANTMENTS, ...ENCHANTMENTS_OVERRIDE }
}

function getEnchWeight(name, useBedrock) {
  const ENCHANTMENTS = getEnchantments(useBedrock)
  if (!ENCHANTMENTS[name]) throw new Error(`Unknown Enchantment: ${name}`)
  return ENCHANTMENTS[name].weight || 1
}

let itemId = 1;
function parseInput(inputArr) {
  return inputArr.map(obj => {
    const ench = [];
    for (const [k, v] of Object.entries(obj)) {
      if (k === "name") continue;
      if (!Number.isInteger(v) || v <= 0) throw new Error(`${k}'s level must be positive integer, current ${v}`);
      ench.push({ name: k, level: v });
    }
    return new ItemObj(obj.name, ench, itemId++);
  });
}

function calc_xp(lvl) {
  if (lvl === 0) {
    return 0;
  }
  if (lvl < 17) {
    return lvl ** 2 + 6 * lvl;
  }
  if (lvl < 32) {
    return 2.5 * lvl ** 2 - 40.5 * lvl + 360;
  }
  return 4.5 * lvl ** 2 - 162.5 * lvl + 2220;
}


class ItemObj {
  constructor(name, ench = [], id) {
    this.name = name; // "item" or "book"
    this.ench = ench.map(e => ({ ...e })); // [{ench.name, ench.level}]
    this.penaltyCount = 0;
    this.totalCost = 0;
    this.operations = null;
    this.idList = [id];
  }
  hash() {
    const enchKey = this.ench
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(e => `${e.name}:${e.level}`)
      .join(",");
    return `${this.name}|${this.penaltyCount}|${enchKey}|${this.idList.join(',')}`;
  }
}

class MergedItem extends ItemObj {
  constructor(left, right, useBedrock = false) {
    const enchMap = new Map();
    for (const ench of left.ench) {
      enchMap.set(ench.name, ench.level);
    }
    for (const ench of right.ench) {
      if (enchMap.has(ench.name)) {
        const leftLevel = enchMap.get(ench.name);
        if (leftLevel === ench.level) {
          enchMap.set(ench.name, leftLevel + 1);
        } else {
          enchMap.set(ench.name, Math.max(leftLevel, ench.level));
        }
      } else {
        enchMap.set(ench.name, ench.level);
      }
    }
    const newench = [];
    for (const [name, level] of enchMap.entries()) {
      newench.push({ name, level });
    }

    const mergedItemName = left.name === "item" ? "item" : "book";
    super(mergedItemName, newench, -1);
    this.idList = [...left.idList, ...right.idList];

    this.penaltyCount = Math.max(left.penaltyCount, right.penaltyCount) + 1;

    let rightCost = 0;
    let allIgnored = true;

    for (const ench of right.ench) {
      if (!Object.prototype.hasOwnProperty.call(getEnchantments(useBedrock), ench.name)) throw new Error(`Unknown Enchantment: ${ench.name}`);
      const leftLevel = left.ench.find(e => e.name === ench.name)?.level ?? 0;
      const rightLevel = ench.level;
      const mergedLevel = enchMap.get(ench.name);
      const weight = getEnchWeight(ench.name, useBedrock);

      if (leftLevel && rightLevel) {
        if (leftLevel === rightLevel) {
          rightCost += mergedLevel * weight;
          allIgnored = false;
        } else if (leftLevel > rightLevel) {
          if (useBedrock) {
            continue;
          } else {
            rightCost += mergedLevel * weight;
            allIgnored = false;
          }
        } else if (leftLevel < rightLevel) {
          if (useBedrock) {
            rightCost += (rightLevel - leftLevel) * weight;
            allIgnored = false;
          } else {
            rightCost += mergedLevel * weight;
            allIgnored = false;
          }
        }
      } else {
        rightCost += rightLevel * weight;
        allIgnored = false;
      }
    }

    if (useBedrock && right.ench.length > 0 && allIgnored) {
      throw new Error("All of the enchantments have been ignored");
    }

    const penalty = (2 ** left.penaltyCount - 1) + (2 ** right.penaltyCount - 1);
    const totalCost = penalty + rightCost;
    this.totalCost = left.totalCost + right.totalCost + totalCost;

    this.operations = {
      left: left,
      right: right,
      cost: totalCost,
      name: this.name,
      ench: this.ench.map(e => ({ ...e })),
      penaltyCount: this.penaltyCount,
      idList: this.idList.slice()
    };
  }
}

function getAllSubsets(arr) {
  const res = [];
  const n = arr.length;
  for (let i = 1; i < (1 << n); ++i) {
    const subset = [];
    for (let j = 0; j < n; ++j) {
      if (i & (1 << j)) subset.push(arr[j]);
    }
    if (subset.some(x => x.name === 'item')) res.push(subset);
  }
  return res;
}

function sumEnchLvl(item) {
  if (!item || !item.ench) return 0
  return item.ench.reduce((sum, e) => sum + e.level, 0)
}



function stateKey(items) {
  return items
    .map(i => i.hash())
    .sort()
    .join("||");
}

function search(items, cache = new Map(), mode = "lvl", useBedrock = false) {
  if (items.length === 1) {
    if (mode === "xp") {
      return { total: items[0].totalXp || 0, operations: items[0] };
    } else {
      return { total: items[0].totalCost, operations: items[0] };
    }
  }
  const key = stateKey(items);
  if (cache.has(key)) return cache.get(key);
  let min = null;
  for (let i = 0; i < items.length; ++i) {
    for (let j = 0; j < items.length; ++j) {
      if (i === j) continue;
      if (items[j].name === "item") continue;
      try {
        const mergedItem = new MergedItem(items[i], items[j], useBedrock);
        const next = items.filter((_, idx) => idx !== i && idx !== j).concat([mergedItem]);
        const result = search(next, cache, mode, useBedrock);
        let total, stepXp = 0, stepLvl = 0;
        if (mode === "xp") {
          stepXp = calc_xp(mergedItem.operations.cost);
          if (stepXp > 2727) { throw new Error("Too expensive!"); }
          total = result.total + stepXp;
          mergedItem.totalXp = result.total + stepXp;
        } else {
          stepLvl = mergedItem.operations.cost;
          if (stepLvl > 39) { throw new Error("Too expensive!"); }
          total = result.total + stepLvl;
        }
        if (!min || total < min.total) {
          min = {
            total: total,
            operations: result.operations
          };
          mergedItem.operations.parent = null;
          result.operations.parent = mergedItem;
        }
      } catch {
      }
      cache.set(key, min);
      return min;
    }
  }
}

function collectSteps(finalNode) {
  const steps = [];
  function dfs(node) {
    if (!node || !node.operations || !node.operations.left || !node.operations.right) return;
    dfs(node.operations.left);
    dfs(node.operations.right);
    steps.push(node);
  }
  dfs(finalNode);
  return steps;
}

export function main(inputArr, mode, useBedrock) {
  try {
    const unit = i18n[mode];
    const items = parseInput(inputArr);

    // 1. test and get best subsets of items
    // TODO: check enchantments compatibility across items
    // TODO: check enchantments max level limit
    const allSubsets = getAllSubsets(items);

    let testLevel = -1;
    let testSets = [];
    let testFinalItem = null;
    let testResult = null;
    let testUsedIds = [];

    for (const subset of allSubsets) {
      if (subset.length < 2) continue;
      const result = search(subset, new Map(), mode, useBedrock);
      if (!result || !result.operations) continue;
      const finalItem = result.operations;
      const levelSum = sumEnchLvl(finalItem);
      if (levelSum > testLevel) {
        testLevel = levelSum;
        testSets = [subset];
        testFinalItem = finalItem;
        testResult = result;
      } else if (levelSum === testLevel) {
        testSets.push(subset);
      }
    }
    if (!testSets.length) return [];

    // 2. find cheapest step
    let minCost = Infinity;
    let minResult = null;
    let minFinalItem = null;
    let minUsedIds = [];
    let minSubset = null;
    for (const subset of testSets) {
      const result = search(subset, new Map(), mode, useBedrock);
      if (!result || !result.operations) continue;
      let cost = mode === 'xp' ? result.total : result.total;
      if (cost < minCost) {
        minCost = cost;
        minResult = result;
        minFinalItem = result.operations;
        minUsedIds = subset.map(x => x.idList[0]);
        minSubset = subset;
      }
    }

    // 3. process result
    const mergeResult = {
      name: i18n[minFinalItem.name],
      ench: minFinalItem.ench.map(e => ({
        name: i18n[e.name],
        level: i18n[e.level]
      })),
      penaltyCount: minFinalItem.penaltyCount
    };

    const usedIdSet = new Set(minUsedIds);
    const unusedItems = items.filter(x => !usedIdSet.has(x.idList[0])).map(x => ({
      name: i18n[x.name],
      ench: x.ench.map(e => ({
        name: i18n[e.name],
        level: i18n[e.level]
      }))
    }));

    // 4. output
    const steps = collectSteps(minFinalItem);
    const mergeSteps = [];
    let idx = 0;
    steps.forEach((step) => {
      idx += 1;
      const left = step.operations.left;
      const right = step.operations.right;
      const leftType = i18n[left.name];
      const leftEnch = left.ench.length
        ? `${i18n.leftbracket}${left.ench.map(e => `${i18n[e.name]} ${i18n[e.level]}`).join(`${i18n.comma}`)}${i18n.rightbracket}`
        : "";
      const leftPenalty = left.penaltyCount > 0
        ? `${i18n.leftbracket}${i18n.penaltyCount}${left.penaltyCount}${i18n.rightbracket}`
        : "";

      const rightType = i18n[right.name];
      const rightEnch = right.ench.length
        ? `${i18n.leftbracket}${right.ench.map(e => `${i18n[e.name]} ${i18n[e.level]}`).join(`${i18n.comma}`)}${i18n.rightbracket}`
        : "";
      const rightPenalty = right.penaltyCount > 0
        ? `${i18n.leftbracket}${i18n.penaltyCount}${right.penaltyCount}${i18n.rightbracket}`
        : "";

      let cost = 0;
      if (mode === "xp") {
        cost = calc_xp(step.operations.cost);
      } else {
        cost = step.operations.cost;
      }

      mergeSteps.push([
        `${idx}`,
        `${leftType}${leftEnch}${leftPenalty}`,
        `${rightType}${rightEnch}${rightPenalty}`,
        `${cost}${unit}`
      ]);
    });

    return [
      mergeResult,
      mergeSteps,
      unusedItems
    ];
  } catch (e) {
    return []
  }
}

