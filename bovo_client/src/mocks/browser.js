import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export function startWorker() {

  if (process.env.NODE_ENV === 'development') {
    worker.start({
      onUnhandledRequest: 'bypass',
    })
    console.log('MSW 활성화')
  }
}