export type VocabEntry = {
    id?: number,
    spanishWord: string,
    englishTranslations: Array<string>,
    sentences: Array<Sentence>,
    conjugation?: Array<Conjugation>,
}

export type Sentence = {
    spanish: string,
    english: string,
}

export type Conjugation = {
    tense: string,
    values: Array<string>,
}