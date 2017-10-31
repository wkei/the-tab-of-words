import Vue from 'vue'
import local, { initStore } from '@/utils/local'
import { getWords } from '@/api'
import { randomArrEl } from '@/utils'

const MIN_LEVEL = 5

const FONT_SIZES = ['s', 'm', 'l']

const bus = new Vue({
  data: {
    store: initStore
  },
  computed: {
    filteredWords () {
      const { level, words } = this.store
      return level === 0
        ? words
        : words.filter(item => item.level === level)
    }
  },
  methods: {
    init () {
      local.init(store => {
        getWords().then(words => {
          store.words = words
          store.loaded = true
          this.store = Object.assign(this.store, store)
          this.generateCard()
        })
      })
    },
    generateCard () {
      this.store.card = randomArrEl(this.filteredWords)
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
      this.store.settings.showRomaji = !this.store.settings.showRomaji
      local.update(this.store)
    },
    toggleFontSize () {
      const currentIdx = FONT_SIZES.indexOf(this.store.settings.fontSize)
      const nextIdx = currentIdx + 1 >= FONT_SIZES.length ? 0 : currentIdx + 1
      const nextFontSize = FONT_SIZES[nextIdx]
      this.store.settings.fontSize = nextFontSize
      local.update(this.store)
    }
  }
})

export default bus
