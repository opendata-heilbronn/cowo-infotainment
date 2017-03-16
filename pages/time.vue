<template>
  <section class="container">
    <h1> Aktuelle Zeit </h1>
    <h1> {{ time }} </h1>
  </section>
</template>
<script>

import moment from 'moment'

var timeData = {time: ""};

export default {
  data (context) {
      if (context.isClient) {
          setTimeout(function () {
              console.log("redirect now");
              context.redirect(200, "/");
          }, 4000);
      }

      return timeData;
  },
  head () {
    return {
      title: `About Page (${this.name}-side)`
    }
  }
}

setInterval(function(){
    timeData.time = moment().format("DD.MMMM.YYYY HH:mm:ss");
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
