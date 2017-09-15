<template>
  <div class='bookWrapper'>
    <main class='book'>
      <transition name='fade' mode='out-in'>
        <div class='empty' v-if='!likedCards.length'>空</div>
        <transition-group name='list' tag='ul' v-else>
          <li v-for='item, idx in likedCards' :key='item.uuid' class='item'>
            <div class='inner'>
              <h3 class='word'>
                <a :href='searchUrl' target='_blank'>{{item.word}}</a>
              </h3>
              <span class='level'>N{{ item.level }}</span>
              <p class='hiragana'>{{ item.hiragana }}</p>
              <p class='meaning'>{{ item.meaning }}</p>
              <button class='btn-del' @click='unlike(item)'>×</button>
            </div>
          </li>
        </transition-group>
      </transition>
      <a class='source' target='_blank' href='http://www.tanos.co.uk/jlpt/'>@datasource</a>
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
      return db.filter(card => likes.includes(card.uuid))
    },
    searchUrl () {
      return `http://jisho.org/search/${this.store.card.word}`
    }
  },
  methods: {
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
  background: #fff;
}
.book {
  margin: auto;
  height: 100vh;
  width: 40vw;
  min-width: 420px;
  padding: 30px;
  overflow: hidden;
  overflow-y: auto;
  font-size: 16px;
  .item {
    max-height: auto;
    position: relative;
    margin: 15px 0;
    border-radius: 2px;
    box-shadow: 0 1px 1px rgba(89, 119, 148, 0.15), 0 0 0.5px 0 rgba(89, 119, 148, 0.3);
    overflow: hidden;
    .inner {
      padding: 15px 60px 15px 15px;
    }
  }
  .word {
    font-weight: 400;
    font-size: 24px;
    margin: 0;
  }
  .level {
    position: absolute;
    right: 15px;
    top: 15px;
    padding: 1px 6px;
    border-radius: 2px;
    background: var(--lightBlue);
    color: #fff;
    font-size: 14px;
  }
  .hiragana {
    margin: 8px 0 0;
  }
  .meaning {
    margin: 8px 0 0;
  }
  .btn-del {
    position: absolute;
    right: 15px;
    bottom: 5px;
    padding: 10px;
    opacity: .5;
    color: var(--lightBlue);
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
  .source {
    position: fixed;
    right: 1.8em;
    bottom: 2em;
    color: var(--lightBlue);
    opacity: .6;
  }
}

.list-enter-active, .list-leave-active {
  transition: all .3s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
</style>
