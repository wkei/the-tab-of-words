<template>
  <div class="voice">
    <video ref='videoRef'>
      <source :src='voiceSource' type='audio/mp3' />
    </video>
  </div>
</template>

<script>
// const videoSourceHost = 'http://www.bing.com/translator/api/language/Speak?locale=ja-JP&gender=female&media=audio/mp3&text='

// const videoSourceHost = 'https://dict.youdao.com/dictvoice?le=jap&audio='
const videoSourceHost = 'https://fanyi.baidu.com/gettts?lan=jp&spd=3&source=web&text='

export default {
  props: ['word'],
  computed: {
    voiceSource () {
      return this.word ? `${videoSourceHost}${this.word}` : null
    }
  },
  methods: {
    play () {
      this.$refs.videoRef.pause()
      this.$refs.videoRef.load()
      this.$refs.videoRef.play()
    }
  }
}
</script>

<style>
.voice {
  display: none;
  visibility: hidden;
}
</style>
