import Koa from 'koa'
import Router from '@koa/router'
import { LineCode, lines } from './constants/line'
import cors from '@koa/cors'
import { StopCode, stops } from './constants/stop'
import { scheduleService } from './services/scheduleService'
import './utils/dayjs'

const koa = new Koa()
koa.use(cors({ origin: 'http://localhost:5173' }))

const router = new Router()

// Stop API
router.get('/api/v1/stops', async ctx => {
  ctx.body = stops
})

router.get('/api/v1/stops/:stop', async ctx => {
  const { stop } = ctx.params
  ctx.body = stops.find(item => item.code === stop)
})

// Line API

router.get('/api/v1/lines', async ctx => {
  ctx.body = lines
})

router.get('/api/v1/lines/:line', async ctx => {
  const { line } = ctx.params
  ctx.body = lines.find(item => item.code === line)
})

router.get('/api/v1/lines/:line/stops', async ctx => {
  const { line } = ctx.params
  ctx.body = lines.find(item => item.code === line)?.stops
})

router.get('/api/v1/lines/:line/schedules', async ctx => {
  const { line } = ctx.params
  ctx.body = await scheduleService.getLineSchedule(line as LineCode)
})

router.get('/api/v1/lines/:line/stops/:stop/schedules', async ctx => {
  const { line, stop } = ctx.params
  ctx.body = await scheduleService.getStopSchedules(
    line as LineCode,
    stop as StopCode
  )
})

// Schedule API

router.get('/api/v1/schedules', async ctx => {
  ctx.body = await scheduleService.getSchedule()
})

koa.use(router.routes()).use(router.allowedMethods())
koa.listen(3000)
