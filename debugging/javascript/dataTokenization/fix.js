class Tokenizer {
  constructor() {
    this.delimiters = [",", ".", " "];
  }

  tokenize(text) {
    let tokens = [];
    for (let i = 0; i < this.delimiters.length; i++) {
      if (i === 0) {
        tokens = text.split(this.delimiters[i]);
      } else {
        tokens = tokens.reduce((acc, token) => {
          acc = [...acc, ...token.split(this.delimiters[i])]
          return acc;
        }, []);
      }
    }

    return tokens.filter(token => token.length > 0);
  }

  // ChatGPT better way
  // tokenize(text) {
  //   return this.delimiters.reduce((tokens, delimiter) => {
  //     return tokens.flatMap(token => token.split(delimiter));
  //   }, [text]).filter(Boolean);
  // }

  processTokens(tokens) {
    // let result = new Set(tokens.map(token => token.toLowerCase()));
    let result = new Set();
    tokens.forEach(token => {
      if (!result.has(token.toLowerCase())) {
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
