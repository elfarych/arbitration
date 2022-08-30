let tickers


function getTickers() {
    return tickers || []
}


async function loadTickers() {
    try {
        await $axios('https://api.kucoin.com/api/v1/market/allTickers')
            .then(res => {
                tickers = res.data.data.ticker
                    .filter(item => item.symbol.endsWith('USDT'))
                    .map(item => {
                        return {
                            symbol: item.symbol.replace('-', ''),
                            price: parseFloat(item.last)
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
