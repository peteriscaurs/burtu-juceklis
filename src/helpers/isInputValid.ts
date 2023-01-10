import sourceLetters, { SourceLetters } from "./sourceLetters";

function isScrabbleInputValid(input: string) {
  const letterCounts = [...input].reduce((allLetters, letter) => {
    const currentCount = (allLetters as SourceLetters)[letter as keyof SourceLetters] || 0;
    return {
      ...allLetters,
      [letter]: currentCount + 1,
    };
  }, {}) as SourceLetters
  const isValid = !Object.entries(letterCounts).some((inputLetter) => {
    return inputLetter[1] > sourceLetters[inputLetter[0] as keyof SourceLetters] 
      || sourceLetters[inputLetter[0] as keyof SourceLetters] === undefined
  })
  return isValid
}

export default isScrabbleInputValid
