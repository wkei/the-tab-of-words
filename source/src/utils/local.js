/* global chrome */

const STORE_KEY = 'THE_TAB_OF_WORDS'

const STORE_VERSION = '1.0.0'

export const initStore = {
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
  init (cb) {
    if (chrome.storage) {
      chrome.storage.sync.get(STORE_KEY, (json) => {
        let store = initStore
        json = json ? json[STORE_KEY] : {}
        if (json && json.version === STORE_VERSION) {
          store = {
            ...store,
            ...json
          }
        } else {
          store.version = STORE_VERSION
          this.update(store)
        }
        cb(store)
      })
    } else {
      const json = JSON.parse(window.localStorage.getItem(STORE_KEY))
      let store = initStore
      if (json && json.version === STORE_VERSION) {
        store = {
          ...store,
          ...json
        }
      } else {
        store.version = STORE_VERSION
        this.update(store)
      }
      cb(store)
    }
  },
  update (store) {
    const json = { ...store }
    delete json.loaded
    delete json.showBook
    delete json.db
    delete json.card
    if (chrome.storage) {
      chrome.storage.sync.set({ [STORE_KEY]: json })
    } else {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(json))
    }
  }
}

export default local
