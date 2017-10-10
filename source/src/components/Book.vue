<template>
  <div class='bookWrapper'>
    <main class='book'>
      <transition name='fade' mode='out-in'>
        <div class='empty' v-if='!likedCards.length'>空</div>
        <transition-group name='list' tag='ul' class='list' v-else>
          <li v-for='item, idx in likedCards' :key='item.uuid' class='item'>
            <div class='inner'>
              <h3 class='word'>
                <a :href='searchUrl(item.word)' target='_blank'>{{item.word}}</a>
              </h3>
              <span class='level'>N{{ item.level }}</span>
              <p class='spelling'>
                <span class='hiragana' v-if='item.hiragana'>{{ item.hiragana }}</span>
                <span class='romaji' :class='{ show: store.showRomaji }'>{{ item.romaji }}</span>
              </p>
              <p class='meaning'>{{ item.meaning }}</p>
              <button class='btn-del' @click='unlike(item)'>×</button>
            </div>
          </li>
        </transition-group>
      </transition>
      <div class='bottom'>
        <a
          href='javascript:void(0);'
          class='btn'
          :class='{ muted: !store.showRomaji }'
          @click='toggleRomaji'
        >
          romaji
        </a>
        <a class='source' target='_blank' href='http://www.tanos.co.uk/jlpt/'>@datasource</a>
      </div>
    </main>
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
    likedCards () {
      const { likes, db } = this.store
      let likedCards = db.filter(card => likes.includes(card.uuid))
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
    },
    toggleRomaji: bus.toggleRomaji
  }
}
</script>

<style>
.bookWrapper {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  overflow-y: auto;
}
.book {
  margin: auto;
  height: 100vh;
  width: 100%;
  max-width: 65vh;
  min-width: 420px;
  font-size: 2vh;
  .list {
    padding: 1.875em;
  }
  .item {
    max-height: auto;
    position: relative;
    margin: 1em 0;
    border-radius: 2px;
    box-shadow: 0 1px 1px rgba(89, 119, 148, 0.15), 0 0 0.5px 0 rgba(89, 119, 148, 0.3);
    overflow: hidden;
    .inner {
      padding: 1em 4em 1em 1em;
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
    background: var(--lightBlue);
    color: #fff;
    font-size: .8em;
  }
  .spelling {
    margin: .5em 0 0;
    .hiragana {
      margin-right: .5em;
    }
    .romaji {
      opacity: 0;
      transition: opacity .3s;
      &.show {
        opacity: 1;
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
    opacity: .5;
    color: var(--lightBlue);
    line-height: 0;
  }
  .empty {
    position: fixed;
    left: 50%;
    top: 50%;
    margin: 0;
    font-size: 10vh;
    text-align: center;
    font-weight: 100;
    color: var(--lightBlue);
    opacity: .5;
    transform: translateX(-50%) translateY(-100%);
  }
  /*.source {
    position: fixed;
    right: 1.8em;
    bottom: 2em;
    color: var(--lightBlue);
    opacity: .6;
  }*/
  .bottom {
    position: fixed;
    top: auto;
    right: 1.8em;
    bottom: 2em;
    text-align: right;
    .btn {
      display: block;
      margin-bottom: .5em;
      color: var(--darkBlue);
      transition: all .3s;
      &.muted {
        color: var(--lightBlue);
        opacity: .6;
      }
    }
    .source {
      color: var(--lightBlue);
      opacity: .6;
    }
  }
}

.list-enter-active, .list-leave-active {
  transition: all .3s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
</style>
