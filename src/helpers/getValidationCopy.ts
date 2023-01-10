import sourceLetters from "./sourceLetters"

function getValidationCopy(letter: string) {
  if (!sourceLetters[letter]) return `ievadīji "${letter}", bet te tādu nav`
  return `burta "${letter}" nav vairāk kā ${sourceLetters[letter]}`
}

export default getValidationCopy