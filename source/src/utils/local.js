const STORE_KEY = 'THE_TAB_OF_WORDS'

const STORE_VERSION = '1.0.0'

const initStore = {
  loaded: false,
  showBook: false,
  db: [],
  card: {},
  // will be in local store
  version: '',
  level: 0, // { 0: all, 1: n1, ..., 5: n5 }
  likes: [],
  showRomaji: false
}

const local = {
  init () {
    const local = JSON.parse(window.localStorage.getItem(STORE_KEY))
    let store = initStore
    if (local && local.version === STORE_VERSION) {
      store = {
        ...store,
        level: local.level,
        likes: local.likes,
        showRomaji: local.showRomaji
      }
    } else {
      store.version = STORE_VERSION
      this.update(store)
    }
    return { ...store }
  },
  update (store) {
    const json = { ...store }
    delete json.loaded
    delete json.showBook
    delete json.db
    delete json.card
    window.localStorage.setItem(STORE_KEY, JSON.stringify(json))
  }
}

export default local
