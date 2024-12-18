// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

Sentry.init({
  dsn: 'https://03d2a1153fe90bca71b6f2f291427122@o4508484759453696.ingest.us.sentry.io/4508489928015872',
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
})
