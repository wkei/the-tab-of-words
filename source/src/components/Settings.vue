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
  .btn {
    display: block;
    margin-bottom: .5em;
    color: var(--lightBlue);
    opacity: .6;
    transition: color .3s;
    &.active {
      color: var(--darkBlue);
    }
  }
  .source {
    color: var(--lightBlue);
    opacity: .6;
  }
}
</style>
