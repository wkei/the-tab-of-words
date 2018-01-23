<template>
  <div id='app' :class='{ loaded: store.loaded }'>
    <div class='container'>
      <transition name='fade' mode='out-in'>
        <Card v-if='!store.showBook' />
        <Book v-else />
      </transition>
    </div>
    <Toolbar />
  </div>
</template>

<script>
import bus from '@/utils/bus'

import Card from '@/components/Card'
import Book from '@/components/Book'
import Toolbar from '@/components/Toolbar'

export default {
  data () {
    return {
      store: bus.store
    }
  },
  components: {
    Card,
    Book,
    Toolbar
  },
  computed: {
    theme () {
      return this.store.settings.theme
    },
    fontSize () {
      return this.store.settings.fontSize
    }
  },
  watch: {
    fontSize (val, prevVal) {
      document.documentElement.classList.remove(prevVal)
      document.documentElement.classList.add(val)
      document.body.classList.remove(prevVal)
      document.body.classList.add(val)
    },
    theme (val, prevVal) {
      document.documentElement.classList.remove(prevVal)
      document.documentElement.classList.add(val)
      document.body.classList.remove(prevVal)
      document.body.classList.add(val)
    }
  },
  created () {
    bus.init()
    this.onKeydown()
  },
  methods: {
    onKeydown () {
      window.addEventListener('keydown', e => {
        if ([32, 13].includes(e.keyCode)) {
          e.preventDefault()
        }
        if ((e.keyCode === 32 || e.keyCode === 13) && this.store.loaded) {
          bus.generateCard()
        }
        if (e.keyCode === 27 && this.store.showBook) {
          bus.hideBook()
        }
      })
    }
  }
}
</script>

<style>
@import 'styles/base.css';
#app {
  width: 100%;
  height: 100%;
  opacity: 0;
  &.loaded {
    opacity: 1;
    transition: opacity .3s;
  }
}
.container {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
</style>
