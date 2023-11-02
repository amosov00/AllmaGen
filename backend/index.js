const api = require('./api.js');
const {events} = require('./consts.js')
const {prepareData} = require('./utils.js')
const express = require('express')
const joi = require('joi')
const cors = require('cors')



async function main() {
    const app = express()
    const port = 3000
    const [tableY, tableX] = await Promise.all([api.getYTable(), api.getXTable()])
    app.use(cors())
    app.get('/table', (_, res) => {
        res.send(prepareData(tableY, tableX))
    })
    app.get('/chart', (req, res) => {
        const schema = joi.object({
            event: joi.string().valid(...Object.values(events)).required(),
            minutes: joi.string().pattern(/^[0-9]+$/).required(),
        })
        const { error } = schema.validate(req.query, {abortEarly: false})
        if (error) {
            res.status(404).send({
                message: error.message
            });
            return
        }
        res.send(prepareData(tableY, tableX, req.query.event, parseInt(req.query.minutes)))
    })
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })

}

main()