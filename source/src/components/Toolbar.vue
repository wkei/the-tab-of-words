<template>
  <nav class='toolbar' :class='{ hideBtns: store.showBook }'>
    <button
      class='btn'
      :disabled='store.showBook'
      @click='changeLevel'
    >
      {{levels[store.level]}}
    </button>
    <button
      class='btn'
      :class='{ liked }'
      :disabled='store.showBook'
      @click='like'
    >
      愛
    </button>
    <button
      class='btn'
      :class='{ show: store.showBook }'
      @click='toggleBook'
    >
      帳
    </button>
    <!-- <div class='bottom'>
      <button
        class='btn btn-r'
        :class='{ muted: store.showRomaji }'
        :disabled='store.showBook'
        @click='toggleRomaji'
      >
        R
      </button>
    </div> -->
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
    // ,toggleRomaji: bus.toggleRomaji
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
  font-size: 3.5vh;
  user-select: none;

  &.hideBtns {
    .btn /*, .btn.muted*/ {
      opacity: 0;
    }
  }

  .btn {
    padding: 0;
    margin-left: .8em;
    color: var(--lightBlue);
    font-weight: 600;
    font-family: var(--fontSerif);
    transition: color .3s, opacity .3s;
    &.liked {
      color: var(--red);
    }
    /*&.muted {
      opacity: .2;
    }*/
    &.show {
      opacity: 1;
      color: var(--darkBlue);
    }
  }
  .btn-r {
    margin: 0;
    font-family: var(--font);
    font-weight: 300;
  }

  /*.bottom {
    position: fixed;
    top: auto;
    bottom: 1em;
    width: 1em;
  }*/
}
</style>
