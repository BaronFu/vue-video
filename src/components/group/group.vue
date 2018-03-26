<template>
  <div class="group">
    <cell v-for="(item,index) in cellLists"
          :link="item.link"
          :icon-url="item.iconUrl"
          :text="item.text"
          :desc="item.desc"
          :badg="item.badg"
          :more="item.more"
          :avatar="item.avatar"
          :key="index">
    </cell>
  </div>
</template>

<script>
import cell from '@/components/userCell/userCell'
export default {
  props: {
    cellLists: Array
  },
  components: {
    cell
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.group
  margin-bottom:10px
</style>
