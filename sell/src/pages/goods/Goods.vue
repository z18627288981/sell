<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,$index) in goods" class="menu-item" :class="{'current':currentIndex === $index}" @click="selectMenu($index,$event)">
          <span class="text border-1px">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售 {{ food.sellCount }} 份</span>                
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-show="food.oldPrice">{{ food.oldPrice }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  name: 'Goods',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
    currentIndex(){
      for(let i = 0; i< this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i+1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          return i;
        }
      }
      return 0;
    },
  },
  methods: {
    getSellerInfo() {
      axios.get('http://localhost:8080/static/mock/data.json', {}).then(this.getSellerInfoSucc)
    },
    getSellerInfoSucc(res) {
      console.log(res)
      this.goods = res.data.goods
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();

      })
    },
    selectMenu(index, event){
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      console.log('失误');
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for(let i = 0; i< foodList.length; i++){
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  mounted() {
    this.getSellerInfo()
  }
}

</script>
<style>
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
}

.menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
}

.menu-item {
  display: table;
  height: 54px;
  width: 56px;
  padding: 0 12px;
  line-height: 14px
}
.current {
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  font-weight: 700;
}
.text {

}
.icon {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  background-size: 12px 12px;
}
.text {
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  font-size: 12px;
}
.foods-wrapper{
  flex: 1;
}
.foods-wrapper .title {
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147, 153, 159);
  background: #f3f5f7
}
.food-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 18px;
  padding-bottom: 18px;
}
.food-item .icon {
  flex: 0 0 57px;
  margin-right: 10px;
}
.food-item .content {
  margin-top: 18px;
}
.content .name {
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7,17,27);
}
.content .desc,.content .extra {
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159)
}
.content .desc{
  line-height: 12px;
  margin-bottom: 8px;
}
.content .extra .count {
  margin-right: 12px;
}
.content .price {
  font-weight: 700;
  line-height: 24px;
}
.price .now {
  margin-right: 8px;
  font-size: 12px;
  color: rgb(240, 20, 20);
}
.price .old {
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 12px;
}
</style>
