import Vue from 'vue'
import local, { initStore } from '@/utils/local'
import { getDB } from '@/api'
import { randomArrEl } from '@/utils'

const MIN_LEVEL = 5

const bus = new Vue({
  data: {
    store: initStore
  },
  computed: {
    filteredDB () {
      const { level, db } = this.store
      return level === 0
        ? db
        : db.filter(item => item.level === level)
    }
  },
  methods: {
    init () {
      local.init(store => {
        getDB().then(db => {
          store.db = db
          store.loaded = true
          this.store = Object.assign(this.store, store)
          this.generateCard()
        })
      })
    },
    generateCard () {
      this.store.card = randomArrEl(this.filteredDB)
    },
    changeLevel () {
      let { level } = this.store
      this.store.level = level + 1 > MIN_LEVEL
        ? 0
        : level + 1
      this.generateCard()
      local.update(this.store)
    },
    checkLiked (card) {
      return this.store.likes.includes(card.uuid)
    },
    like (card) {
      if (!this.checkLiked(card)) {
        this.store.likes.push(card.uuid)
        local.update(this.store)
      }
    },
    unlike (card) {
      const idx = this.store.likes.indexOf(card.uuid)
      if (idx >= 0) {
        this.store.likes.splice(idx, 1)
        local.update(this.store)
      }
    },
    toggleBook () {
      this.store.showBook = !this.store.showBook
      local.update(this.store)
    },
    hideBook () {
      if (this.store.showBook) {
        this.store.showBook = false
        local.update(this.store)
      }
    },
    toggleRomaji () {
      this.store.showRomaji = !this.store.showRomaji
      local.update(this.store)
    }
  }
})

export default bus
