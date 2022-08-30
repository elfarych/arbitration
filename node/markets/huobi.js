let tickers


function getTickers() {
    return tickers || []
}


async function loadTickers() {
    try {
        await $axios('https://api.huobi.pro/market/tickers')
            .then(res => {
                tickers = res.data.data
                    .filter(item => item.symbol.toUpperCase().endsWith('USDT'))
                    .map(item => {
                        // if (item.symbol.toUpperCase() === 'WBTCUSDT') console.log(item)
                        return {
                            symbol: item.symbol.toUpperCase(),
                            price: parseFloat(item.close)
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
