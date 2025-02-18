class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!(char in node.children)) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!(char in node.children)) {
        return false;
      };
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!(char in node.children)) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }

  delete(word) {
    function deleteHelper(node, word, depth = 0) {
      // if (!node) {
      //   return false
      // };

      if (depth == word.length) {
        if (node.isEndOfWord) {
          node.isEndOfWord = false;
          return Object.keys(node.children).length === 0;
        }
        return false;
      }

      let char = word[depth];
      if (!(char in node.children)) {
        return false;
      }

      const deleteCall = deleteHelper(node.children[char], word, depth + 1);

      if (deleteCall) {
        delete node.children[char];
        return Object.keys(node.children).length == 0;
      }

      return false;
    }

    deleteHelper(this.root, word);
  }
}

// Test Cases
const trie = new Trie();
trie.insert("data");
trie.insert("datavant");
trie.insert("date");

console.log(trie.search("data"));      // Expected: true
console.log(trie.search("dat"));       // Expected: false
console.log(trie.search("datavant"));  // Expected: true
console.log(trie.search("date"));      // Expected: true
console.log(trie.search("datum"));     // Expected: false
console.log(trie.startsWith("dat"));   // Expected: true
console.log(trie.startsWith("van"));   // Expected: false

trie.delete("data");
console.log(trie.search("data"));      // Expected: false
console.log(trie.search("datavant"));  // Expected: true
console.log(trie.search("date"));      // Expected: true
