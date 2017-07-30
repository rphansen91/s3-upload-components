import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import blink from './credentials/blink.json'
import info from './credentials/info.json'

ReactDOM.render(<App credentials={blink} />, document.getElementById('root'))
registerServiceWorker()
