import './worker.js'

import cors from '@koa/cors'
import Router from '@koa/router'
import Koa from 'koa'
import logger from 'koa-logger'
import { LineCode, StopCode, lineMap, lines, stopMap, stops } from 'mtr-kit'

import { scheduleService } from './services/scheduleService.js'

const koa = new Koa()
koa.use(logger())
koa.use(
  cors({
    origin: (ctx): string => {
      try {
        const origin = ctx.headers.origin
        if (!origin) return ''

        const { origin: originUrl, hostname } = new URL(origin)
        if (!hostname || !originUrl) return ''

        if (hostname.endsWith('mtr.today')) return originUrl
        return ''
      } catch (e) {
        return ''
      }
    },
  })
)

const router = new Router()

// Stop API
router.get('/api/v1/stops', async ctx => {
  ctx.body = stops
})

router.get('/api/v1/stops/:stop', async ctx => {
  const { stop } = ctx.params
  ctx.body = stopMap[stop as StopCode]
})

router.get('/api/v1/stops/:stop/schedules', async ctx => {
  const { stop } = ctx.params
  ctx.body = scheduleService.getStopSchedules(stop as StopCode)
})

// Line API

router.get('/api/v1/lines', async ctx => {
  ctx.body = lines
})

router.get('/api/v1/lines/:line', async ctx => {
  const { line } = ctx.params
  ctx.body = lineMap[line as LineCode]
})

router.get('/api/v1/lines/:line/schedules', async ctx => {
  const { line } = ctx.params
  ctx.body = scheduleService.getLineSchedule(line as LineCode)
})

router.get('/api/v1/lines/:line/stops', async ctx => {
  const { line } = ctx.params
  ctx.body = lineMap[line as LineCode]?.stops
})

router.get('/api/v1/lines/:line/stops/:stop/schedules', async ctx => {
  const { line, stop } = ctx.params
  ctx.body = scheduleService.getLineStopSchedule(
    line as LineCode,
    stop as StopCode
  )
})

// Schedule API

router.get('/api/v1/schedules', async ctx => {
  ctx.body = await scheduleService.getSchedule()
})

koa.use(router.routes()).use(router.allowedMethods())
// eslint-disable-next-line no-console
console.log('Server is listening on port: 3000')
koa.listen(3000)
