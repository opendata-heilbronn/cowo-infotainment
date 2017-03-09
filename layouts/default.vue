<template>
  <div>
  <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top" style="justify-content:space-between">
    <a class="navbar-brand" href="#">Coworking Space</a>
    <div style="color: white">{{ time }}</div>
  </nav>

  <div class="container">
    <nuxt/>
  </div>
  </div>
</template>

<script>
    import moment from 'moment'
    var timeData = {time: ""};
    export default {
        data () {
            return timeData;
        }
    }
    setInterval(function(){
        timeData.time = moment().format("DD.MMMM YYYY HH:mm:ss");
    }, 1000);

</script>

<style>
.container
{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.button, .button:visited
{
  display: inline-block;
  color: #3B8070;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #3B8070;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #3B8070;
}

.title
{
  color: #505153;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
