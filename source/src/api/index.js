const WORDS_JSON = './static/data/words.json'

export const getWords = () => fetch(WORDS_JSON).then(data => data.json())
