import express from 'express'
const app = express()
import appSetup from './startup/init'
import securitySetup from './startup/security'
import routerSetup from './startup/router/route'

appSetup(app)
securitySetup(app, express)
routerSetup(app)