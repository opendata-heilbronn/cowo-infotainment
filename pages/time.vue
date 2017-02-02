<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1> {{ time }} </h1>
    <nuxt-link class="button" to="/">
      Home page
    </nuxt-link>
    <nuxt-link class="button" to="/about">
       About page
    </nuxt-link>
  </section>
</template>
<script>

import moment from 'moment'

var timeData = {time: ""};

export default {
  data () {
    return timeData;
  },
  head () {
    return {
      title: `About Page (${this.name}-side)`
    }
  }
}

setInterval(function(){
    timeData.time = moment().format("DD:MMMM:YYYY HH:mm:ss");
}, 1000);

</script>

<style scoped>
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
