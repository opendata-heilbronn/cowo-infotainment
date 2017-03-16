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
        data (context) {
            console.log("timeout in data2 - ", context.route);
            return {};
        },
        mounted() {
            console.log("mounted: ");
            var that = this;
            setTimeout(function () {
                console.log("redirect in global settimeout: ", that.$router);
                that.$router.replace("/time");
            }, 4000);
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
