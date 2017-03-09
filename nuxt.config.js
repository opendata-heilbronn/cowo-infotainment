module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'Coworking Infotainment System',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
            {hid: 'description', content: "Nuxt.js project"}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: 'favicon.ico'},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
            {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css'}
        ],
        script: [
            {src: "https://code.jquery.com/jquery-3.1.1.slim.min.js"},
            {src: "https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"},
            {src: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"},
            {src: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"}
        ]
    },
    /*
     ** Global CSS
     */
    css: ['~assets/css/main.css'],
    /*
     ** Customize the progress-bar color
     */
    loading: {color: '#3B8070'}
}
