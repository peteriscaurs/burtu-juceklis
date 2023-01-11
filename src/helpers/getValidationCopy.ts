import sourceLetters, { SourceLetters } from "./sourceLetters"

function getValidationCopy(letter: keyof SourceLetters) {
  if (!sourceLetters[letter]) return `ievadīji "${letter}", bet te tādu nav`
  return `burta "${letter}" nav vairāk kā ${sourceLetters[letter]}`
}

export default getValidationCopy