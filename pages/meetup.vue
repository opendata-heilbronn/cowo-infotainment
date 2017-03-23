<template>
    <section class="container">
        <h1>Aktuelle Meetup Termine</h1>

        <transition-group name="list-complete" tag="div">
            <span v-for="event in visibleEvents" v-bind:key="event.id" class="list-complete-item">
                <h1>{{event.name}}</h1>
                <h3>{{event.time}}</h3>
                <p>{{event.remaining}}, {{event.yesRsvpCount}} Zusagen</p>
                <google-map v-bind:lat="event.lat" v-bind:lon="event.lon"/>
            </span>
        </transition-group>
    </section>
</template>
<script>
    import axios from 'axios'
    import moment from 'moment'
    import GoogleMap from '~components/Map.vue'

    var router = null;
    const toggleTime = 8000;

    let futureEvents = [];
    let visibleEvents = [];

    const createEvent = function (event) {
        const time = moment(event.time);
        const remaining = time.fromNow();
        return {
            "id": event.id,
            "name": event.name,
            "lat": event.venue.lat,
            "lon": event.venue.lon,
            "yesRsvpCount": event.yes_rsvp_count,
            "time": time.format("DD. MMMM YYYY HH:mm"),
            "remaining": remaining
        };
    };
    const filterEvents = function (events) {
        const now = Date.now();
        return events.filter(function (event) {
            return event.time > now;
        })
    };

    let visibleEvent = 0;
    const toggleEvents = function () {
        if (visibleEvent < futureEvents.length-1) {
            visibleEvent++;
            visibleEvents.splice(0, 1, futureEvents[visibleEvent]);
            setTimeout(toggleEvents, toggleTime);
        } else {
            setTimeout(function () {
                router.replace("/time");
            }, 1000);
        }
    };

    export default {
        data () {
            return axios.get('https://api.grundid.de/crossorigin', {
                params: {
                    url: "https://api.meetup.com/codeforhn/events?&sign=true&photo-host=public&page=6&status=upcoming",
                    cacheMinutes: 10
                }
            }).then((res) => {
                console.log("in data");
                futureEvents = filterEvents(res.data).map(createEvent);
                visibleEvents.slice(0, 1, futureEvents[0]);
                return {
                    visibleEvents: visibleEvents
                }
            })
        },
        mounted() {
            console.log("mounted meetup, visibleEvent: ", visibleEvent);
            visibleEvent = 0;
            visibleEvents.slice(0, 1, futureEvents[0]);
            router = this.$router;
            setTimeout(toggleEvents, toggleTime);
        },
        components: {
            GoogleMap
        }
    }
</script>

<style scoped>
    .list-complete-item {
        transition: all 1s;
        display: inline-block;
        margin-right: 10px;
    }

    .list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active for <2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }

    .list-complete-leave-active {
        position: absolute;
    }
</style>

