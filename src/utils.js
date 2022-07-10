const {
  latinToCyrillicMap,
  cyrillicToLatinMap,
  anyToAsciiMap,
  cyrillicYusciiToLatin,
  latinYusciiToLatin,
  serbianWordsWithForeignCharacterCombinations,
  commonForeignWords,
  foreignCharacterCombinations,
  digraphExceptions,
  digraphReplacements
} = require("./constants");

const latinToCyrillicTree = buildTree(latinToCyrillicMap);
const cyrillicToLatinTree = buildTree(cyrillicToLatinMap);
const anyToAsciiTree = buildTree(anyToAsciiMap);
const latinYusciiToLatinTree = buildTree(latinYusciiToLatin);
const cyrillicYusciiToLatinTree = buildTree(cyrillicYusciiToLatin);

function buildTree(map) {
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
}

function replaceUsingTree(str, tree) {
  let result = "";

  for (let i = 0, length = str.length; i < length; i++) {
    if (!tree[str[i]]) {
      result += str[i];
      continue;
    }

    // Search tree
    let currentNode = tree[str[i]];
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
}

function convertText(text, mode) {
  if (mode === "ascii") {
    return replaceUsingTree(text, anyToAsciiTree);
  }

  if (mode === "yuscii-latin") {
    return replaceUsingTree(text, latinYusciiToLatinTree);
  }

  if (mode === "yuscii-cyrillic") {
    return replaceUsingTree(text, cyrillicYusciiToLatinTree);
  }

  if (mode === "latin") {
    return replaceUsingTree(text, cyrillicToLatinTree);
  }

  if (text.trim().length === 0) {
    return text;
  }

  let words = text.split(" ");
  for (let i = 0, length = words.length; i < length; i++) {
    if (!looksLikeForeignWord(words[i])) {
      words[i] = convertWordToCyrillic(words[i]);
    }
  }

  return words.join(" ");
}

function looksLikeForeignWord(word) {
  word = word.trim().toLowerCase();
  if (word === "") {
    return false;
  }

  if (wordStartsWith(word, serbianWordsWithForeignCharacterCombinations)) {
    return false;
  }

  if (wordInArray(word, foreignCharacterCombinations)) {
    return true;
  }

  if (wordStartsWith(word, commonForeignWords)) {
    return true;
  }

  return false;
}

function convertWordToCyrillic(str) {
  str = splitDigraphs(str);
  return replaceUsingTree(str, latinToCyrillicTree);
}

function splitDigraphs(str) {
  const lowercaseStr = str.trim().toLowerCase();

  for (const digraph in digraphExceptions) {
    if (!lowercaseStr.includes(digraph)) {
      continue;
    }

    for (const word of digraphExceptions[digraph]) {
      if (!lowercaseStr.startsWith(word)) {
        continue;
      }

      // Split all possible occurrences, regardless of case.
      for (const key in digraphReplacements[digraph]) {
        str = str.replace(key, digraphReplacements[digraph][key]);
      }

      break;
    }
  }

  return str;
}

function wordStartsWith(word, array) {
  for (let arrayWord of array) {
    if (word.startsWith(arrayWord)) {
      return true;
    }
  }

  return false;
}

function wordInArray(word, array) {
  for (let arrayWord of array) {
    if (word.includes(arrayWord)) {
      return true;
    }
  }

  return false;
}

module.exports = {
  convertText
};
