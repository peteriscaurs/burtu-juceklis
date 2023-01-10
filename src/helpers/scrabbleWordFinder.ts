import { Word } from "../types/types";

class ScrabbleTreeNode {
  children: any
  constructor() {
    this.children = Object.create(null);
  }
}

class ScrabbleDictionary {
  root: any
  constructor(words: string[]) {
    this.root = new ScrabbleTreeNode();
    words.forEach((word) => this.insert(word));
  }
  insert(word: any) {
    let cursor = this.root;
    for (let letter of word.letters) {
      if (!cursor.children[letter]) {
        cursor.children[letter] = new ScrabbleTreeNode();
      }
      cursor = cursor.children[letter];
    }
    cursor.isWord = true;
    cursor.value = word.value;
  }
}

class ScrabbleWordFinder {
  dict: any
  constructor(dict: string[]) {
    this.dict = new ScrabbleDictionary(dict);
  }
  find(letters: string): Word[] {
    return this.validWords(this.dict.root, letters);
  }
  validWords(node: any, letters: string, word = "", results = []) {
    if (node.isWord) {
      (results as any).push({ letters: word, value: node.value });
    }
    const seen = new Set();
    for (let ch of letters) {
      if (!seen.has(ch)) {
        seen.add(ch);
        if (node.children[ch]) {
          this.validWords(
            node.children[ch],
            letters.replace(ch, ""),
            word + ch,
            results
          );
        }
      }
    }
    return results;
  };
}

export default ScrabbleWordFinder;