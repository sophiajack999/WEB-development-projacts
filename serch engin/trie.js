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
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        return null;
      }
      node = node.children[char];
    }
    return node;
  }

  startsWith(prefix) {
    let node = this.search(prefix);
    if (!node) return [];
    return this._collectAllWords(node, prefix);
  }

  _collectAllWords(node, prefix) {
    let results = [];
    if (node.isEndOfWord) {
      results.push(prefix);
    }
    for (let char in node.children) {
      results = results.concat(
        this._collectAllWords(node.children[char], prefix + char)
      );
    }
    return results;
  }
}

const trie = new Trie();
const items = [
  "JavaScript Tutorial",
  "HTML and CSS Guide",
  "Learn React",
  "Understanding Node.js",
  "Introduction to Python",
  "Java Programming",
  "C++ Basics",
  "Ruby on Rails",
  "Django Framework",
  "Angular for Beginners",
];

items.forEach((item) => trie.insert(item.toLowerCase()));
