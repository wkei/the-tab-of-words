<template>
  <div class='card'>
    <div class='meta'>
      <p class='romaji' :class='{ show: showRomaji }'>{{card.romaji || '&nbsp;'}}</p>
      <p class='hiragana'>{{card.hiragana || '&nbsp;'}}</p>
    </div>
    <h1 class='word'>
      <a :href='searchUrl' target='_blank'>{{card.word}}</a>
    </h1>
    <p class='meaning'>{{card.meaning}}</p>
    <span class='level'>N{{card.level}}</span>
  </div>
</template>

<script>
import bus from '@/utils/bus'

export default {
  data () {
    return {
      store: bus.store
    }
  },
  computed: {
    showRomaji () {
      return bus.store.settings.showRomaji
    },
    card () {
      return this.store.card
    },
    searchUrl () {
      return `http://jisho.org/search/${this.store.card.word}`
    }
  }
}
</script>

<style>
.card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-60%);
  font-size: 2rem;
  text-align: center;
  width: 80%;
  .hiragana, .romaji {
    margin: 0;
  }
  .romaji {
    opacity: 0;
    font-size: .8em;
    transition: opacity .3s;
    &.show {
      opacity: 1;
    }
  }
  .word {
    font-size: 2.8em;
    margin: .5em 0;
  }
  .meaning {
    max-width: 80%;
    margin: 1em auto;
  }
  .level {
    display: inline-block;
    padding: 0 1em;
    border-radius: .15em;
    background: var(--darkBlue);
    font-size: .8em;
    color: #fff;
  }
}
</style>
