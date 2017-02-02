<template>
    <section class="container">
        Aktuelle Meetup Termine
        <p>{{event.name}}</p>
        <b>{{event.time}}</b>
        <p>{{event.remaining}}</p>

    </section>
</template>
<script>
    import axios from 'axios'
    import moment from 'moment'

    const createEvent = function (event) {
        const time = moment(event.time);
        const remaining = time.fromNow();
        return {"name": event.name,
            "time": time.format("DD. MMMM YYYY HH:mm"),
            "remaining": remaining};
    };
    const filterEvents = function (events) {
        const now = Date.now();
        return events.filter(function (event) {
            return event.time > now;
        })
    };

    export default {
        data ({req}) {
            return axios.get('https://api.meetup.com/codeforhn/events?&sign=true&photo-host=public&page=5&status=upcoming')
                .then((res) => {
                    console.log(res.data);
                    const futureEvents = filterEvents(res.data);
                    return {
                        event: createEvent(futureEvents[0]),
                        events: futureEvents
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

