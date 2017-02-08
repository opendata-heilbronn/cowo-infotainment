module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Coworking Infotainment System',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: "Nuxt.js project" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
      { rel: 'stylesheet', href: 'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css'}
    ],
    script: [
        {src: 'https://code.getmdl.io/1.3.0/material.min.js'}
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
