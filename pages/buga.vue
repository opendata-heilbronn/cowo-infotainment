<template>
    <section class="container">
        <h1> Zeit bis Bundesgartenschau 2019 </h1>
        <h1> {{ time }} </h1>
    </section>
</template>
<script>
    import moment from 'moment'
    moment.locale('de');
    const bugaOpening = moment("19042019 09:00", "DDMMYYYY HH:mm");

    var timeData = {time: ""};
    var updateTime = function () {
        timeData.time = moment.duration(bugaOpening.diff(moment, "seconds"), "seconds").humanize();
    };

    export default {
        data() {
            updateTime();
            return timeData;
        },
        mounted() {
            console.log("mounted time");
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
