import { Hono } from 'hono'

const app = new Hono()
app.get('')

export default app;