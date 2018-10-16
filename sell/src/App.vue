<template>
  <div id="app">
    <div class="header">
      <Header></Header>
    </div>
    <div class="tab">
      <Tab></Tab>
    </div>
    <div class="content">
      <Content></Content>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from
 './pages/header/Header'
import Tab from './pages/tab/Tab'
import Content from './pages/content/Content'

export default {
  components: {
    Header,
    Tab,
    Content
  }
}

</script>
<style>
#app{
  font-size: 20px;
}
</style>
