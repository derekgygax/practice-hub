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
      if (!node.children[char]) {
        // 🛑 Bug here?
        node.children[char] = TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      // 🛑 Bug here?
      if (!node.children[char]) return true;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }
}

// Test Cases
const trie = new Trie();
trie.insert("data");
trie.insert("datavant");

console.log(trie.search("data"));     // Expected: true
console.log(trie.search("dat"));      // Expected: false
console.log(trie.search("datavant")); // Expected: true
console.log(trie.search("datum"));    // Expected: false
