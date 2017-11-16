<template>
  <nav class='toolbar'>
    <button
      :class='{ btn: true, hide: store.showBook }'
      @click='changeLevel'
    >
      {{levels[store.level]}}
    </button>
    <button
      :class='{ btn: true, liked, hide: store.showBook }'
      @click='like'
    >
      愛
    </button>
    <button
      :class='{ btn: true, show: store.showBook }'
      @click='toggleBook'
    >
      帳
    </button>
  </nav>
</template>

<script>
import bus from '@/utils/bus'

export default {
  data () {
    return {
      levels: ['全', '一', '二', '三', '四', '五'],
      store: bus.store
    }
  },
  computed: {
    liked () {
      return bus.checkLiked(this.store.card)
    }
  },
  methods: {
    like () {
      if (!bus.checkLiked(this.store.card)) {
        bus.like(this.store.card)
      } else {
        bus.unlike(this.store.card)
      }
    },
    changeLevel: bus.changeLevel,
    toggleBook: bus.toggleBook
  }
}
</script>

<style>
.toolbar {
  position: fixed;
  right: 1em;
  top: 1em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  font-size: 1.7rem;
  user-select: none;
  .btn {
    padding: 0;
    margin-left: .8em;
    color: var(--lightBlue);
    font-family: var(--fontSerif);
    transition: color .3s, opacity .3s;
    &.liked {
      color: var(--red);
    }
    &.show {
      color: var(--darkBlue);
    }
    &.hide {
      opacity: 0;
      visibility: hidden;
    }
  }
  .btn-r {
    margin: 0;
    font-family: var(--font);
    font-weight: 300;
  }
}
</style>
