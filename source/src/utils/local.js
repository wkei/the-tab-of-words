/* global chrome */

const STORE_KEY = 'THE_TAB_OF_WORDS'

const STORE_VERSION = '1.1.0'

const KEY_TO_STORE = ['version', 'level', 'likes', 'settings']

export const initStore = {
  loaded: false,
  showBook: false,
  words: [],
  card: {},
  // will be in local store
  version: STORE_VERSION,
  level: 0, // { 0: all, 1: n1, ..., 5: n5 }
  likes: [],
  settings: {
    showRomaji: false,
    fontSize: 'm' // 's, m, l'
  }
}

const local = {
  init (cb) {
    if (chrome.storage) {
      chrome.storage.sync.get(STORE_KEY, (json) => {
        json = json ? json[STORE_KEY] : {}
        cb(this.getInitStore(json))
      })
    } else {
      const json = JSON.parse(window.localStorage.getItem(STORE_KEY))
      cb(this.getInitStore(json))
    }
  },
  getInitStore (json) {
    let store = initStore
    if (json) {
      store = {
        ...store,
        ...json
      }
      if (json.version !== store.version) {
        store.version = store.version
        if (store.version === '1.1.0') {
          store.settings.showRomaji = store.showRomaji
          delete store.showRomaji
        }
        this.update(store)
      }
    } else {
      this.update(store)
    }
    return store
  },
  update (store) {
    const dataToStore = {}
    KEY_TO_STORE.forEach(key => {
      dataToStore[key] = store[key]
    })
    if (chrome.storage) {
      chrome.storage.sync.set({ [STORE_KEY]: dataToStore })
    } else {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(dataToStore))
    }
  }
}

export default local
