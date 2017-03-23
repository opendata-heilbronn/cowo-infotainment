<template>
    <section class="container">
        <h1>Twitter Updates von Coworking und Code For Heilbronn</h1>

        <transition-group name="list-complete" tag="div">
            <span v-for="tweet in visibleTweets" v-bind:key="tweet.id_str" class="list-complete-item">
                <h3>{{tweet.text}}</h3>
                <p>{{tweet.created_at}}, Favorites: {{tweet.favorite_count}}, Retweets: {{tweet.retweet_count}} </p>
                <img v-if="tweet.extended_entities" v-bind:src="tweet.extended_entities.media[0].media_url_https" />
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
    let visibleTweets = [];

    let visibleEvent = 0;
    const toggleEvents = function () {
        if (visibleEvent < futureEvents.length-1) {
            visibleEvent++;
            visibleTweets.splice(0, 1, futureEvents[visibleEvent]);
            setTimeout(toggleEvents, toggleTime);
        } else {
            setTimeout(function () {
                router.replace("/time");
            }, 1000);
        }
    };

    export default {
        data () {
            return axios.get('https://api.grundid.de/cowoTwitter').then((res) => {
                console.log("in data");
                futureEvents = res.data;
                visibleTweets.slice(0, 1, futureEvents[0]);
                return {
                    visibleTweets: visibleTweets
                }
            })
        },
        mounted() {
            console.log("mounted twitter, visibleEvent: ", visibleEvent);
            visibleEvent = 0;
            visibleTweets.slice(0, 1, futureEvents[0]);
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

