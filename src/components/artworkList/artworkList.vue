<template>
  <div class="artwork-list">
    <artwork v-for="item in artworkList" :artwork="item" :key="item.id"></artwork>
  </div>
</template>
<script>
import artwork from '../artwork/artwork'
export default {
  props: {
    artworkList: Array
  },
  data () {
    return {}
  },
  created() {
    console.log(this.artworkList)
  },
  components: {
    artwork
  },
  methods: {
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
  .artwork-list
    display: flex
    flex-wrap: wrap
    justify-content: space-around
    align-items: flex-start
    width: 100%
</style>
