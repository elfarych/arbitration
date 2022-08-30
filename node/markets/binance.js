let tickers


function getTickers() {
    return tickers || []
}


async function loadTickers() {
    try {
        await $axios('https://api.binance.com/api/v3/ticker/24hr')
            .then(res => {
                tickers = res.data
                    .filter(item => item.symbol.endsWith('USDT'))
                    .map(item => {
                        return {
                            symbol: item.symbol,
                            price: parseFloat(item.lastPrice),
                            vol: parseFloat(item.quoteVolume)
                        }
                    })
            })
            .catch(e => {
                $errorHandler(e)
            })
    } catch (e) {
        $errorHandler(e)
    }
}


module.exports = {
    getTickers,
    loadTickers
}
