<template>
    <section class="container">
        Aktuelle Meetup Termine

        <ul >
            <li v-for="event in events">
                <h1>{{event.name}}</h1>
                <h3>{{event.time}}</h3>
                <p>{{event.remaining}}, {{event.yesRsvpCount}} Zusagen</p>
                <google-map v-bind:lat="event.lat" v-bind:lon="event.lon" />
            </li>
        </ul>

    </section>
</template>
<script>
    import axios from 'axios'
    import moment from 'moment'
    import GoogleMap from '~components/Map.vue'

    let futureEvents = [];

    const createEvent = function (event) {
        const time = moment(event.time);
        const remaining = time.fromNow();
        return {"name": event.name,
            "lat": event.venue.lat,
            "lon": event.venue.lon,
            "yesRsvpCount" : event.yes_rsvp_count,
            "time": time.format("DD. MMMM YYYY HH:mm"),
            "remaining": remaining};
    };
    const filterEvents = function (events) {
        const now = Date.now();
        return events.filter(function (event) {
            return event.time > now;
        })
    };

    const toggleEvents = function () {

    };

    export default {
        data ({req}) {
            return axios.get('https://api.meetup.com/codeforhn/events?&sign=true&photo-host=public&page=6&status=upcoming')
                .then((res) => {
                    console.log("in data");
                    const futureEvents = filterEvents(res.data).map(createEvent);
                    return {
                        event: futureEvents[0],
                        events: futureEvents
                    }
                })
        },
        head () {
            return {
                title: 'Aktuelle Termine'
            }
        },
        components: {
            GoogleMap
        }
    }
</script>

<style scoped>
</style>

