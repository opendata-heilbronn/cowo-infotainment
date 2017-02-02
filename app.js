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
const TimeScene = {     props: ['date'],
    template: '<b>jetzt kommt die zeit: {{ date }}</b>',
};
const DateScene = { template: '<p>date scene</p>' };

const routes = [
    { path: '/time', component: TimeScene },
    { path: '/date', component: DateScene }
];

const router = new VueRouter({
    routes // short for routes: routes
});

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
                router.replace("/time");
                console.log("time");
            }
            else {
                this.currentRoute = "/date";
                router.replace("/date");
                console.log("date");
            }
        }
    },
    created: function () {
        console.log('created app');
        setInterval(this.updateScene, 5000);
        setInterval(this.updateTime, 1000);
    },
    router: router
});