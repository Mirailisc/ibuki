import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://d56b4d1f41c971af17942d06e44ea9d7@o4508484759453696.ingest.us.sentry.io/4508484761550848',
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /^https:\/\/koharu\.arius\.cloud/],
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
