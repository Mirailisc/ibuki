import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://d0ac21a7d03c1f54d2d065d431c4ef5f@o4508484759453696.ingest.us.sentry.io/4508489995780096',
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
