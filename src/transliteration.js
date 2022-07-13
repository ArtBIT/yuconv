const {
  LATIN_TO_CYRILLIC,
  CYRILLIC_TO_LATIN,
  ANY_TO_YUSCII,
  CYRILLIC_YUSCII_TO_LATIN,
  LATIN_YUSCII_TO_LATIN
} = require("./constants");

const buildTransliterationTree = map => {
  let tree = {};
  let currentNode;

  for (let key in map) {
    currentNode = tree;

    for (let char of key) {
      currentNode[char] = currentNode[char] || {};
      currentNode = currentNode[char];
    }

    currentNode.value = map[key];
  }

  return tree;
};

const applyTransliterationTree = (str, tree) => {
  let result = "";
  for (let i = 0, length = str.length; i < length; i++) {
    const char = str[i];

    // Check if char needs conversion
    if (!tree[char]) {
      result += char;
      continue;
    }

    // Search tree
    let currentNode = tree[char];
    let currentDepth = 0;
    let valueDepth = 0;
    let value = "";

    while (true) {
      if (currentNode.value) {
        value = currentNode.value;
        valueDepth = currentDepth;
      }

      if (currentNode[str[i + currentDepth + 1]]) {
        currentDepth++;
        currentNode = currentNode[str[i + currentDepth]];
      } else {
        break;
      }
    }

    // Insert original text if match is incomplete
    result += value || str.substr(i, valueDepth + 1);
    i += valueDepth;
  }

  return result;
};

const transliterationTree = {
  cyrillic: buildTransliterationTree(LATIN_TO_CYRILLIC),
  latin: buildTransliterationTree(CYRILLIC_TO_LATIN),
  ascii: buildTransliterationTree(ANY_TO_YUSCII),
  "yuscii-latin": buildTransliterationTree(LATIN_YUSCII_TO_LATIN),
  "yuscii-cyrillic": buildTransliterationTree(CYRILLIC_YUSCII_TO_LATIN)
};

const transliterate = (text, mode) => {
  const tree = transliterationTree[mode];
  if (!tree) {
    throw new Error(`Cannot find transliteration tree named ${mode}`);
  }
  switch (mode) {
    case "ascii":
    case "yuscii-latin":
    case "yuscii-cyrillic":
    case "cyrillic":
    case "latin":
      return applyTransliterationTree(text, tree);
  }
};

module.exports = transliterate;
