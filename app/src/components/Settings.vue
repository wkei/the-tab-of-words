<template>
  <div class='settings'>
    <a
      href='javascript:void(0);'
      class='btn'
      @click='toggleFontSize'
    >
      {{fontSize}}
    </a>
    <a
      href='javascript:void(0);'
      class='btn'
      :class='{ active: showRomaji }'
      @click='toggleRomaji'
    >
      romaji
    </a>
    <a class='source' target='_blank' href='http://www.tanos.co.uk/jlpt/'>@datasource</a>
    <a class='source' target='_blank' href='http://the-tab-of-words.keipixel.com/'>@homepage</a>
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
      return this.store.settings.showRomaji
    },
    fontSize () {
      return this.store.settings.fontSize.toUpperCase()
    }
  },
  methods: {
    toggleRomaji: bus.toggleRomaji,
    toggleFontSize: bus.toggleFontSize
  }
}
</script>

<style>
.settings {
  position: fixed;
  top: auto;
  right: 1.8em;
  bottom: 2em;
  text-align: right;
  font-weight: 100;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  a {
    color: color(var(--cyan) a(80%));
    .sunset & {
      color: color(var(--lightGreen) a(80%));
    }
    .moon & {
      color: color(var(--silver) a(80%));
    }
  }
  .source {
    display: block;
    margin-top: .5em;
  }
  .btn {
    display: inline-block;
    margin-bottom: .5em;
    transition: color .3s;
    &.active {
      color: var(--inkBlue);
    }
  }
}
</style>
