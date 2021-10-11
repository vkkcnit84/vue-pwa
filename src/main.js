import { createApp } from 'vue'
import App from './App.vue'

import Amplify from 'aws-amplify';
import '@aws-amplify/ui-components'
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

import './registerServiceWorker'

createApp(App).mount('#app')
