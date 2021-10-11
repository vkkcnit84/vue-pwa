/* eslint-disable no-console */
// import env from '../.env';
import { register } from 'register-service-worker'

// if (process.env.NODE_ENV === 'production') {
  
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, TEST visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      // console.log(env.VUE_APP_NOT_SECRET_CODE)
      console.log('Service worker has been registered.---------vinaytest--------')
    },
    cached () {
      console.log('Content has been cached for offline use.------cached')
    },
    updatefound () {
      console.log('New content is downloading.----- updatefound')
    },
    updated () {
      console.log('New content is available; please refresh.------ UPDATED')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
// }
