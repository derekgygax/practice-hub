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
    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i);
      if (node.children[char] === undefined) {
        node.children[char] = TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord == true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return true;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (node.children[char] == null) {
        return false;
      }
      node = node.children[char];
    }
    return node;
  }

  delete(word) {
    function deleteHelper(node, word, depth = 0) {
      if (node == null) return false;

      if (depth == word.length) {
        if (node.isEndOfWord) {
          node.isEndOfWord = false;
          return Object.keys(node.children).length === 0;
        }
      }

      let char = word[depth];
      if (deleteHelper(node.children[char], word, depth + 1)) {
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
