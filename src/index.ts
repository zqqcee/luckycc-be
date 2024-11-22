import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { comments } from './routes'
import { cors } from 'hono/cors'

const app = new Hono()

// app.use('*', cors({
//   origin: 'http://localhost:4321',
//   allowHeaders: ['*'],
//   allowMethods: ['POST', 'GET', 'OPTIONS'],
//   // exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
//   // credentials: true,
// }))

app.use('/*', cors())

app.route('/comments', comments)

const port = 1234
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
