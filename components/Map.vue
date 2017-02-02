<template>
    <div>
        <img :src="src"/>
    </div>
</template>

<script>
    export default {
        props: ["lat", "lon"],
        data: function () {
            const src = "https://maps.googleapis.com/maps/api/staticmap?size=200x200&key=AIzaSyD3W_knn0uEAqeIQHxHHhLKQ3ztNyXnoUc" +
                "&maptype=roadmap&markers=color:red%7C" + this.lat + "," + this.lon;
            return {src}
        }
    }
</script>