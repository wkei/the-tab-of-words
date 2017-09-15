const STORE_KEY = 'THE_TAB_OF_WORDS'

const initStore = {
  likes: [],
  showRomaji: false
}

export default {
  store: null,
  getStore () {
    if (!this.store) {
      this.store = JSON.parse(window.localStorage.getItem(STORE_KEY))
      if (!this.store) {
        this.store = initStore
        this.setStore(this.store)
      }
    }
    return { ...this.store }
  },
  setStore (store) {
    this.store = store
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store))
  },
  getLikes () {
    const store = this.getStore()
    return store.likes
  },
  addLike (like) {
    const store = this.getStore()
    store.likes.push(like)
    this.setStore(store)
    return store.likes
  },
  rmLike (like) {
    const store = this.getStore()
    store.likes.splice(store.likes.indexOf(like), 1)
    this.setStore(store)
    return store.likes
  },
  getLevel () {
    const store = this.getStore()
    if (typeof store.level === 'undefined') {
      store.level = 0
    }
    this.setLevel(store.level)
    return store.level
  },
  setLevel (level) {
    const store = this.getStore()
    store.level = level
    this.setStore(store)
    return store.level
  },
  getShowRomaji () {
    const store = this.getStore()
    return store.showRomaji
  },
  toggleRomaji () {
    const store = this.getStore()
    store.showRomaji = !store.showRomaji
    this.setStore(store)
    return store.showRomaji
  }
}
