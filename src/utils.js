const wordIsEmpty = word => word === "";

const wordStartsWith = (word, array) =>
  array.some(item => word.startsWith(item));

const wordInArray = (word, array) => array.some(item => word.includes(item));

module.exports = {
  wordIsEmpty,
  wordInArray,
  wordStartsWith
};
