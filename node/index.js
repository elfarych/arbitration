const express = require('express')
const cors = require('cors')
require('dotenv').config()

const globals = require('./globals')
const markets = require('./markets')
const tickersHandlers = require('./tickers-handler')


globals.setGlobals()


const app = express()
const {APP_PORT, APP_IP, APP_PATH} = process.env

app.use(cors())
app.use(express.json({limit: '10mb'}))

function startScreener() {
    Promise
        .all([
            markets.bybit.loadTickers(),
            markets.binance.loadTickers(),
            markets.huobi.loadTickers(),
            markets.pancake.loadTickers(),
            markets.ftx.loadTickers(),
            markets.kucoin.loadTickers(),
            markets.okx.loadTickers(),
            // markets.gate.loadTickers(),
        ])
        .then(() => {
            setTimeout(() => {
                tickersHandlers.checkDifference([
                    {name: 'Binance', tickers: markets.binance.getTickers()},
                    {name: 'Bybit', tickers: markets.bybit.getTickers()},
                    {name: 'Huobi', tickers: markets.huobi.getTickers()},
                    {name: 'Pancake', tickers: markets.pancake.getTickers()},
                    {name: 'FTX', tickers: markets.ftx.getTickers()},
                    {name: 'Kucoin', tickers: markets.kucoin.getTickers()},
                    {name: 'OKX', tickers: markets.okx.getTickers()},
                    // {name: 'Gate', tickers: markets.gate.getTickers()},
                ])
            }, 1500)

        })

}

startScreener()
setInterval(() => {
    startScreener()
}, 1000 * 60)


app.get('/results', (req, res) => {
    res.json({ data: tickersHandlers.getResults() })
})


app.listen(APP_PORT, APP_IP, () => {
    console.log('server started...')
})
