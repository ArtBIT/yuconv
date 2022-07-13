const {
  TRANSLITERATION_WHITELIST,
  TRANSLITERATION_BLACKLIST,
  DIGRAPH_EXCEPTIONS,
  DIGRAPH_REPLACEMENTS
} = require("./constants");

const { wordIsEmpty, wordStartsWith, wordInArray } = require("./utils");

const transliterate = require("./transliteration");

const shouldConvertWord = word => {
  word = word.trim().toLowerCase();

  // nothing to transliterate
  if (wordIsEmpty(word)) {
    return false;
  }

  // force transliterate these
  if (wordStartsWith(word, TRANSLITERATION_WHITELIST)) {
    return true;
  }

  // skip transliterating these
  if (wordStartsWith(word, TRANSLITERATION_BLACKLIST)) {
    return false;
  }

  return true;
};

const splitDigraphs = str => {
  const lowercaseStr = str.trim().toLowerCase();

  for (const digraph in DIGRAPH_EXCEPTIONS) {
    if (!lowercaseStr.includes(digraph)) {
      continue;
    }

    for (const word of DIGRAPH_EXCEPTIONS[digraph]) {
      if (!lowercaseStr.startsWith(word)) {
        continue;
      }

      // Split all possible occurrences, regardless of case.
      for (const key in DIGRAPH_REPLACEMENTS[digraph]) {
        str = str.replace(key, DIGRAPH_REPLACEMENTS[digraph][key]);
      }

      break;
    }
  }

  return str;
};

const convertWordToCyrillic = str =>
  shouldConvertWord(str) ? transliterate(splitDigraphs(str), "cyrillic") : str;

const replaceLatinToCyrillic = text =>
  text
    .split(" ")
    .map(convertWordToCyrillic)
    .join(" ");

const yuconv = (text, mode) => {
  if (text.trim().length === 0) {
    return text;
  }
  switch (mode) {
    case "ascii":
    case "yuscii-latin":
    case "yuscii-cyrillic":
    case "latin":
      return transliterate(text, mode);
    case "cyrillic":
      return replaceLatinToCyrillic(text);
    default:
      throw new Error("Unknown conversion target");
  }
};

module.exports = yuconv;
