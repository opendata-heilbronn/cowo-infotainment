Vue.component('clock', {
    props: ['time'],
    template: '<b>jetzt kommt die zeit: {{ time }}</b>',
    ready: function(){
        console.log('list ready')
    }
});

Vue.component('list', {
    data: function () {
        return {dateTime: new Date()}
    },
    template: '<b>ready {{ dateTime }}</b>',
    className: 'c-list',
    ready: function(){
        console.log('list ready2')
    },
    created: function () {
        console.log('created ');
    }
});


const NotFound = { template: '<p>Page not found</p>' };
const TimeScene = { template: '<p>Time Scene </p>' };
const DateScene = { template: '<p><clock v-bind:time="date"></clock></p>' };

const routes = {
    '/time': TimeScene,
    '/date': DateScene
};

const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue2!',
        now: "das ist jetzt",
        date: moment().format("HH:mm:ss"),
        currentRoute: '/date'
    },
    methods: {
        updateTime : function () {
            this.date = moment().format("HH:mm:ss")
        },
        updateScene : function () {
            if (this.currentRoute == "/date"){
                this.currentRoute = "/time";
                console.log("time");
            }
            else {
                this.currentRoute = "/date";
                console.log("date");
            }
        }
    },
    created: function () {
        console.log('created app');
        setInterval(this.updateScene, 5000)
        setInterval(this.updateTime, 1000)
    },
    computed: {
        ViewComponent () {
            return routes[this.currentRoute] || NotFound
        }
    },
    render (h) { return h(this.ViewComponent) }
});