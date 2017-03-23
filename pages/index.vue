<template>
    <section class="container">
        <img src="../assets/img/coworkinglogo.svg" alt="Coworking Logo" class="logo"/>
        <h1 class="title">
            Willkommen im Coworking Space<br/>
            Infotainment System
        </h1>
    </section>
</template>
<script>

    export default {
        mounted() {
            console.log("mounted index");
            var that = this;
            setTimeout(function () {
                that.$router.replace("/meetup");
            }, 1000);
        }
    }

    /* setTimeout(function () {
     if (myContext.isClient) {
     setTimeout(function () {
     console.log("redirect in global settimeout");
     myContext.redirect(200, "/time");
     }, 4000);
     }

     }, 5000);*/
</script>

<style scoped>
    .title {
        margin: 50px 0;
    }
</style>
