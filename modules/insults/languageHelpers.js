const isVowel = letter =>
  ["a", "e", "i", "o", "u"].includes(letter.toLowerCase());

module.exports = {
  addIndefiniteArticle2:function(str)
    {
      if (str.match(/^(use|urin)/)) {
        return "a " + str;
      }
    
      if (isVowel(str[0])) {
        return "an " + str;
      }
    
      return "a " + str;
    },
    capitalize:function(str) { 
      return str[0].toUpperCase() + str.slice(1); 
    },
    pluralize:function(str) {
      if (str.slice(-1) === "s") {
        return str + "es";
      }
      if (str.slice(-2) === "sh") {
        return str + "es";
      }
      return str + "s";
    },
    nounify:function(str) {
      if (str.slice(-3) === "ate") {
        return str.slice(0, str.length - 1) + "or";
      }
    
      if (isVowel(str.slice(-1))) {
        return str + "r";
      }
    
      if (isVowel(str[str.length - 2]) && isVowel(str[str.length - 3])) {
        return str + "er";
      }
    
      if (isVowel(str[str.length - 2])) {
        return str + str.slice(-1) + "er";
      }
    
      return str + "er";
    },
    ingify:function(str) {
      if (isVowel(str.slice(-1))) {
        return str.slice(0, str.length - 1) + "ing";
      }
    
      if (isVowel(str[str.length - 2]) && isVowel(str[str.length - 3])) {
        return str + "ing";
      }
    
      if (isVowel(str[str.length - 2])) {
        return str + str.slice(-1) + "ing";
      }
    
      return str + "ing";
    }
  }