import _get from 'lodash/get'
import _merge from 'lodash/merge'

const STORE_KEY = 'THE_TAB_OF_WORDS'

const STORE_VERSION = '1.3.0'

const KEY_TO_STORE = ['version', 'level', 'hides', 'settings']

export const initStore = {
  loaded: false,
  showBook: false,
  words: [],
  card: {},
  // will be in local store
  version: STORE_VERSION,
  level: 0, // { 0: all, 1: n1, ..., 5: n5 }
  hides: [],
  settings: {
    showRomaji: false,
    fontSize: 'm', // 's, m, l'
    theme: 'sunrise' // 'sunrise', 'sunset', 'moon'
  }
}

const syncStorage = _get(window, ['chrome', 'storage', 'sync'], null)

const local = {
  init (cb) {
    if (syncStorage) {
      syncStorage.get(STORE_KEY, localDB => {
        localDB = localDB ? localDB[STORE_KEY] : {}
        cb(this.getInitStore(localDB))
      })
    } else {
      const localDB = JSON.parse(window.localStorage.getItem(STORE_KEY))
      cb(this.getInitStore(localDB))
    }
  },
  getInitStore (localDB) {
    let store = initStore
    if (localDB) {
      _merge(store, localDB)
      if (store.version !== STORE_VERSION) {
        // Memory is a wonderful thing if you don't have to deal with the past.
        if (store.version < '1.1.0') { // magic js
          store.settings.showRomaji = store.showRomaji
          delete store.showRomaji
        }
        if (store.version < '1.3.0') {
          store.hides = store.likes
          delete store.likes
        }
        store.version = STORE_VERSION
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
    if (syncStorage) {
      syncStorage.set({ [STORE_KEY]: dataToStore })
    } else {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(dataToStore))
    }
  }
}

export default local
