<template>
  <div class='bookWrapper'>
    <main class='book'>
      <transition name='fade' mode='out-in'>
        <div class='empty' v-if='!likedCards.length'>空</div>
        <transition-group name='list' tag='ul' class='list' v-else>
          <li v-for='(item, idx) in likedCards' :key='idx' class='item'>
            <div class='inner'>
              <h3 class='word'>
                <a :href='searchUrl(item.word)' target='_blank'>{{item.word}}</a>
              </h3>
              <span class='level'>N{{ item.level }}</span>
              <p class='spelling'>
                <span class='hiragana' v-if='item.hiragana'>{{ item.hiragana }}</span>
                <span class='romaji' :class='{ show: showRomaji }'>{{ item.romaji }}</span>
              </p>
              <p class='meaning'>{{ item.meaning }}</p>
              <button class='btn-del' @click='unlike(item)'>×</button>
            </div>
          </li>
        </transition-group>
      </transition>
    </main>
    <Settings />
  </div>
</template>

<script>
import bus from '@/utils/bus'
import Settings from './Settings'

export default {
  data () {
    return {
      store: bus.store
    }
  },
  components: {
    Settings
  },
  computed: {
    showRomaji () {
      return this.store.settings.showRomaji
    },
    likedCards () {
      const { likes, words } = this.store
      let likedCards = words.filter(card => likes.includes(card.uuid))
      likedCards = likes.map(like => {
        return likedCards.filter(card => like === card.uuid)[0]
      })
      return likedCards
    }
  },
  methods: {
    searchUrl (word) {
      return `http://jisho.org/search/${word}`
    },
    unlike (item) {
      bus.unlike(item)
    }
  }
}
</script>

<style>
.bookWrapper {
  width: 100%;
  height: 100%;
  padding: 0 10%;
  overflow: hidden;
  overflow-y: auto;
}
.book {
  margin: auto;
  height: 100vh;
  width: 100%;
  max-width: 36rem;
  min-width: 420px;
  font-size: 1rem;
  .list {
    padding: 1.875em;
  }
  .item {
    max-height: auto;
    position: relative;
    margin: 1em 0;
    border-radius: 2px;
    box-shadow: 0 .1em .1em rgba(89, 119, 148, 0.15), 0 0 0.05em 0 rgba(89, 119, 148, 0.3);
    border: 1px solid transparent;
    border-left-width: 2px;
    overflow: hidden;
    .inner {
      padding: .8em 4em .8em 1em;
    }
    .moon & {
      box-shadow: none;
      border-radius: 0;
      border-left: 2px solid var(--cyan);
      background: var(--inkBlue);
    }
    .sunset & {
      box-shadow: none;
      border-radius: 0;
      /* border-right: 2px solid var(--lightGreen); */
      /* background: var(--inkBlue); */
      background: color(var(--green) a(8%));
      border-bottom: 1px solid var(--lightGreen);
    }
  }
  .word {
    font-weight: 400;
    font-size: 1.5em;
    margin: 0;
  }
  .level {
    position: absolute;
    right: 1em;
    top: 1em;
    padding: 1px .5em 0;
    border-radius: 2px;
    background: var(--cyan);
    color: var(--white);
    font-size: .8em;
    user-select: none;
    .moon & {
      background: var(--darkInk);
    }
    .sunset & {
      background: var(--green);
    }
  }
  .spelling {
    margin: .5em 0 0;
    .hiragana {
      margin-right: .5em;
    }
    .romaji {
      opacity: 0;
      transition: opacity .3s;
      user-select: none;
      &.show {
        opacity: 1;
        user-select: auto;
      }
    }
  }
  .meaning {
    margin: .5em 0 0;
  }
  .btn-del {
    position: absolute;
    right: .75em;
    bottom: .7em;
    padding: .7em;
    color: color(var(--cyan) a(80%));
    line-height: 0;
    user-select: none;
    .moon & {
      color: color(var(--silver) a(80%));
    }
    .sunset & {
      color: color(var(--lightGreen) a(80%));
    }
  }
  .empty {
    position: fixed;
    left: 50%;
    top: 50%;
    margin: 0;
    font-weight: 100;
    font-size: 5em;
    line-height: 1em;
    text-align: center;
    color: var(--cyan);
    opacity: .5;
    transform: translateX(-50%) translateY(-100%);
  }
}

.list-enter-active, .list-leave-active {
  transition: all .3s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
</style>
