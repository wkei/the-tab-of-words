<template>
  <div class='card'>
    <div class='meta'>
      <span class='romaji' :class='{ show: showRomaji }'>{{card.romaji || '&nbsp;'}}</span>
      <a class='hiragana' @click='playVoice'>{{card.hiragana || card.word}}</a>
      <!-- <p class='hiragana'>{{card.hiragana || card.word}}</p> -->
    </div>
    <h1 class='word'>
      <a :href='searchUrl' target='_blank'>{{card.word}}</a>
    </h1>
    <p class='meaning'>{{card.meaning}}</p>
    <span class='level'>N{{card.level}}</span>
    <Voice :word='card.word' ref='voiceRef' />
  </div>
</template>

<script>
import bus from '@/utils/bus'
import Voice from '@/components/Voice'

export default {
  data () {
    return {
      store: bus.store,
      voice: ''
    }
  },
  components: {
    Voice
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
  },
  methods: {
    playVoice () {
      this.$refs.voiceRef.play()
    }
  }
}
</script>

<style>
.card {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-60%);
  font-size: 2rem;
  text-align: center;
  width: 80%;
  .meta {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hiragana, .romaji {
    margin: 0;
  }
  .hiragana {
    cursor: pointer;
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
    font-weight: 300;
  }
  .level {
    display: inline-block;
    padding: 0 1em;
    border-radius: .15em;
    font-size: .8em;
    font-weight: 300;
    color: var(--white);
    background: var(--inkBlue);
    .moon & {
      color: var(--darkInk);
      background: var(--grey);
    }
    .sunset & {
      color: var(--yellow);
      background: var(--green);
    }
  }
}
</style>
