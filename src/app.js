// const express = require('express')
import express from 'express'
import colorsR from './routes/colors.r.js'
import indexR from './routes/index.r.js'

const app = express()

app.use(express.json())

app.use(indexR)
app.use('/api',colorsR)


app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;
