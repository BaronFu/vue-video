<template>
    <div class="collection">
        <cube-scroll>
            <div class="collection-wrapper">
                <items v-for="item in collections" :artwork="item" :key="item.id"></items>
            </div>
        </cube-scroll>
    </div>
</template>
<script>
import items from '../components/items/items'
import api from '../api'
export default {
  data() {
    return {
      collections: []
    }
  },
  created() {
    api.getCollections({param: {}})
      .then(res => {
        if (res.status === 200) {
          this.collections = res.data.data.collections
        }
      })
  },
  components: {
    items
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .collection
        position: absolute
        top: 50px
        bottom: 0px
</style>