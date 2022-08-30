let tickers


function getTickers() {
    return tickers || []
}


async function loadTickers() {
    try {
        await $axios('https://www.okx.com/api/v5/market/tickers?instType=SPOT')
            .then(res => {
                tickers = res.data.data
                    .filter(item => item.instId.endsWith('USDT'))
                    .map(item => {
                        return {
                            symbol: item.instId.replace('-', ''),
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
