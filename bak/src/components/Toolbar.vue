<template>
  <nav class='toolbar'>
    <button
      :class='{ btn: true, hide: store.showBook }'
      @click='changeLevel'
    >
      {{levels[store.level]}}
    </button>
    <button
      :class='{ btn: true, hide: store.showBook }'
      @click='hide'
    >
      隠
    </button>
    <button
      :class='{ btn: true, show: store.showBook }'
      @click='toggleBook'
    >
      帳
    </button>
    <button
      class='btn'
      @click='changeTheme'
    >
      {{themes[theme]}}
    </button>
  </nav>
</template>

<script>
import bus from '@/utils/bus'

export default {
  data () {
    return {
      themes: {
        sunrise: '日',
        sunset: '夕',
        moon: '月'
      },
      levels: ['全', '一', '二', '三', '四', '五'],
      store: bus.store
    }
  },
  computed: {
    theme () {
      return this.store.settings.theme
    }
  },
  methods: {
    hide () {
      bus.hide(this.store.card)
    },
    changeLevel: bus.changeLevel,
    toggleBook: bus.toggleBook,
    changeTheme: bus.changeTheme
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
    font-family: var(--fontSerif);
    &.hide {
      opacity: 0;
      visibility: hidden;
    }
    &.show {
      .sunrise & {
        color: var(--inkBlue);
      }
      .moon & {
        color: var(--white);
      }
      .sunset & {
        color: var(--green);
      }
    }
  }
  .btn-r {
    margin: 0;
    font-family: var(--font);
    font-weight: 300;
  }
}
</style>
