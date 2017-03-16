<template>
    <section class="container">
        <h1> Aktuelle Zeit </h1>
        <h1> {{ time }} </h1>
    </section>
</template>
<script>
    import moment from 'moment'
    moment.locale('de');

    var timeData = {time: ""};
    var updateTime = function () {
        timeData.time = moment().format("dddd, DD.MMMM YYYY HH:mm:ss");
    };

    export default {
        data() {
            updateTime();
            return timeData;
        },
        mounted() {
            console.log("mounted: ");
            var router = this.$router;
            setTimeout(function () {
                router.replace("/");
            }, 4000);
            setInterval(updateTime, 1000);

        }

    }

</script>

<style scoped>
    .title {
        margin-top: 50px;
    }

    .info {
        font-weight: 300;
        color: #9aabb1;
        margin: 0;
        margin-top: 10px;
    }

    .button {
        margin-top: 50px;
    }
</style>
