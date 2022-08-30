let tickers


function getTickers() {
    return tickers || []
}


async function loadTickers() {
    try {
        await $axios('https://ftx.com/api/markets')
            .then(res => {
                tickers = res.data.result
                    .filter(item => item.type === 'spot')
                    .filter(item => item.name.endsWith('USDT'))
                    .map(item => {
                        return {
                            symbol: item.name.replace('/', ''),
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
