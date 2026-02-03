import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { comments, moments } from './routes'
import { cors } from 'hono/cors'
import { connectMongo } from './db/mongo'

const app = new Hono()

app.use('/*', cors({
  origin: ['https://luckycc.cc', 'https://zqqcee.github.io', 'http://localhost:3000'],
  allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
}))

app.route('/comments', comments)
app.route('/moments', moments)

const port = 1234

// 启动服务
const start = async () => {
  await connectMongo()
  console.log(`Server is running on http://localhost:${port}`)
  serve({
    fetch: app.fetch,
    port
  })
}

start()
