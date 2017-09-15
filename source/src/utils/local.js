const STORE_KEY = 'THE_TAB_OF_WORDS'

const local = {
  init () {
    const local = JSON.parse(window.localStorage.getItem(STORE_KEY))
    let store = {
      loaded: false,
      showBook: false,
      db: [],
      card: {},
      level: 0, // { 0: all, 1: n1, ..., 5: n5 }
      likes: [],
      showRomaji: false
    }
    if (local) {
      store = {
        ...store,
        level: local.level,
        likes: local.likes,
        showRomaji: local.showRomaji
      }
    } else {
      this.update(store)
    }
    return { ...store }
  },
  update (store) {
    const json = {
      level: store.level,
      likes: store.likes,
      showRomaji: store.showRomaji
    }
    window.localStorage.setItem(STORE_KEY, JSON.stringify(json))
  }
}

export default local
