import Vue from 'vue'
import _filter from 'lodash/filter'
import _includes from 'lodash/includes'
import local, { initStore } from '@/utils/local'
import { getWords } from '@/api'
import { randomArrEl, getNextArrEl } from '@/utils'

const MIN_LEVEL = 5

const FONT_SIZES = ['s', 'm', 'l']

const THEME_KEYS = ['sunrise', 'sunset', 'moon']

const bus = new Vue({
  data: {
    store: initStore
  },
  computed: {
    filteredWords () {
      const { level, words, hides } = this.store
      const _words = level === 0
        ? words
        : words.filter(item => item.level === level)
      return _filter(_words, word => !_includes(hides, word.uuid))
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
      this.store.card = randomArrEl(this.filteredWords, this.store.hides)
    },
    changeLevel () {
      let { level } = this.store
      this.store.level = level + 1 > MIN_LEVEL
        ? 0
        : level + 1
      this.generateCard()
      local.update(this.store)
    },
    hide (card) {
      this.store.hides.push(card.uuid)
      local.update(this.store)
      this.generateCard()
    },
    unhide (card) {
      const idx = this.store.hides.indexOf(card.uuid)
      if (idx >= 0) {
        this.store.hides.splice(idx, 1)
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
      this.store.settings.fontSize = getNextArrEl(this.store.settings.fontSize, FONT_SIZES)
      local.update(this.store)
    },
    changeTheme () {
      this.store.settings.theme = getNextArrEl(this.store.settings.theme, THEME_KEYS)
      local.update(this.store)
    }
  }
})

export default bus
