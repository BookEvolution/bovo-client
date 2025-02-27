import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { startWorker } from './mocks/browser'
import { Provider } from 'react-redux'
import { store } from './store/index.js'

// 개발 환경에서 MSW 시작
if (process.env.NODE_ENV === 'development') {
  startWorker()
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)