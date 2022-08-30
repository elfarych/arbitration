const axios = require('axios')
const errorHandler = (err) => console.log(err.message || err)

function setGlobals () {
    global.$axios = axios
    global.$errorHandler = errorHandler
}

module.exports = {
    setGlobals
}

