let tickers


function getTickers() {
    return tickers || []
}


async function loadTickers() {
    try {
        await $axios('https://api.bybit.com/spot/quote/v1/ticker/price')
            .then(res => {
                tickers = res.data.result
                    .filter(item => item.symbol.endsWith('USDT'))
                    .map(item => {
                        return {
                            symbol: item.symbol,
                            price: parseFloat(item.price),
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
