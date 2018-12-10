var mcache = require('memory-cache');


var getCache = {
    cache: function (duration) {
        return (req, res, next) => {
            let key = '__express__' + req.originalUrl || req.url
            let cachedBody = mcache.get(key)
            if (cachedBody) {
                console.log("Hit in cache")
                res.send(cachedBody)
                return
            }
            else {
                res.sendResponse = res.send
                res.send = (body) => {
                    mcache.put(key, body, duration * 1000)
                    res.sendResponse(body)
                }
                console.log("Missed Cache")
                next()
            }
        }
    }

}
exports.data = getCache;