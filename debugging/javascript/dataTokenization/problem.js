class Tokenizer {
  constructor() {
    this.delimiters = [",", ".", " "];
  }

  tokenize(text) {
    let tokens = text.split(this.delimiters);
    return tokens.filter(token => token.length > 0);
  }

  processTokens(tokens) {
    let result = new Set();
    tokens.forEach(token => {
      if (!result.includes(token.toLowerCase())) {
        result.add(token.toLowerCase());
      }
    });
    return result;
  }
}

const tokenizer = new Tokenizer();
const inputText = "Hello, world. This is a test. Hello again!";
const tokens = tokenizer.tokenize(inputText);
console.log("Tokens:", tokens);
console.log("Processed Tokens:", tokenizer.processTokens(tokens));
