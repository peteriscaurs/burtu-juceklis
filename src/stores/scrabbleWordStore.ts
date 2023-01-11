import { computed, makeObservable, observable, action } from "mobx";
import ScrabbleWordFinder from "../helpers/scrabbleWordFinder";
import endpoints from "../endpoints";
import { Word } from "../types/types";

export class ScrabbleWordStore {
  /** instance of ScrabbleWordFinder */
  wordFinder: ScrabbleWordFinder | undefined

  /** an array words found in the Latvian dictionary */
  results: Word[] | undefined

  selectedWord: Word | undefined

  /** an array with words found in local storage */
  savedWords: any = []

  wordMeaning: any

  currentPage: number = 1

  isSavedWordView = false

  validationCopy = ''

  constructor() {
    makeObservable(this, {
      results: observable,
      setResults: action,
      savedWords: observable,
      setSavedWords: action,
      setSelectedWord: action,
      isSavedWord: computed,
      currentPage: observable,
      setCurrentPage: action,
      isSavedWordView: observable,
      setSavedWordView: action,
      validationCopy: observable,
      setValidationCopy: action,
      getSavedWordsResults: action,
    });
    const savedWords = localStorage.getItem('savedWords')
    const parsed = savedWords ? JSON.parse(savedWords) : []
    this.savedWords = parsed
  }
  /** get all scrabble-eligible words from Latvian dictionary */
  private async fetchScrabbleWords(): Promise<string[]> {
    let data = null;
    try {
      const response = await fetch(endpoints.latvianScrabbleWordList);
      data = await response.json();
    } catch (error) {
      console.log("Ooops...", error);
    }
    return data.words;
  }
  /** initializes wordFinder */
  async initWordFinder() {
    const words = await this.fetchScrabbleWords()
    this.setWordFinder(words)
  }
  /** set wordFinder as an instance of ScrabbleWordFinder */
  private  async setWordFinder(words: string[]) {
    this.wordFinder = new ScrabbleWordFinder(words);
  }
  /** fetches data about selected word meaning */
  async retrieveEntry(selectedWord: string) {
    const response = await fetch(`https://tezaurs.lv/api/retrieveEntry?hw=${selectedWord}`)
    const text = await response.text()
    this.wordMeaning = text
  }
  /** sets the results observable */
  setResults(letters: string) {
    this.results = this.wordFinder
      ?.find(letters)
      // @ts-ignore
      ?.sort((a, b) => b.value - a.value) || []
    
    if (this.results.length) {
      localStorage.setItem('results', JSON.stringify(this.results));
    }
      // localStorage.setItem('results', JSON.stringify(this.results));
  }
  saveWord(word?: Word) {
    this.savedWords = this.savedWords.concat(word)
    const newSavedWords = JSON.stringify(this.savedWords)
    localStorage.setItem('savedWords', newSavedWords);
  }
  removeWord(letters?: string) {
    this.savedWords = this.savedWords.filter((word: Word) => word.letters !== letters)
    localStorage.setItem('savedWords', JSON.stringify(this.savedWords));
  }
  setSelectedWord(word: Word) {
    this.selectedWord = word
  }
  get isSavedWord() {
    return this.savedWords.some((e: Word) => e.letters === this.selectedWord?.letters)
  }
  setCurrentPage(page: number) {
    this.currentPage = page
  }
  setSavedWordView(isSavedWordView: boolean) {
    this.isSavedWordView = isSavedWordView
  }

  setValidationCopy(validationCopy: string) {
    this.validationCopy = validationCopy
  }

  getSavedWordsResults(letters: string) {
    const storedWords = JSON.parse(localStorage.getItem('savedWords') as string)
    const savedWordFinder = new ScrabbleWordFinder(storedWords)
    return savedWordFinder.find(letters)
  }

  setSavedWords(words: Word[]) {
    this.savedWords = words
  }
}

export default new ScrabbleWordStore()