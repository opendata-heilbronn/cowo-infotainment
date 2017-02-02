<template>
    <section class="container">
        Aktuelle Meetup Termine
        <p>{{event.name}}</p>
        <b></b>

    </section>
</template>
<script>
    import axios from 'axios'

    var toggleEvents = function () {

    };

    export default {
        data ({req}) {
            return axios.get('https://api.meetup.com/codeforhn/events?&sign=true&photo-host=public&page=5&status=upcoming')
                .then((res) => {
                    console.log(res.data);
                    return {
                        event: res.data[0],
                        events: res.data
                    }
                })
        },
        head () {
            return {
                title: 'Aktuelle Termine'
            }
        }
    }
</script>

<style scoped>
</style>

