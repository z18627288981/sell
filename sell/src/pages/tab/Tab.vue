<template>
  <div class="tab">
    <div class="tab-item">
      <div class="item" @click="toggleTab('Goods')">
       商品
      </div>
      <div class="item" @click="toggleTab('Ratings')">
       评价
      </div>
      <div class="item" @click="toggleTab('Sells')">
       商家
      </div>
    </div>
    <Goods :is="currentTab" keep-alive></Goods>
  </div>
</template>
<script type="text/javascript">
import Goods from '@/pages/goods/Goods'
import Ratings from '@/pages/ratings/Ratings'
import Sells from '@/pages/sells/Sells'
export default {
  name: 'Tab',
  data () {
    return {
      currentTab: 'Goods'
    }
  },
  components: {
    Goods,
    Ratings,
    Sells
  },
  methods: {
    toggleTab: function (tab) {
      this.currentTab = tab
    }
  }

}

</script>
<style>
.tab-item {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}

.item {
  flex: 1;
  text-align: center;
}

</style>
