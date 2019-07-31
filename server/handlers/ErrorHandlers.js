module.exports.catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch((e) => {
            if (e.response) {
                e.status = e.response.status
            }
            
            next(e)
        })
    }
}

module.exports.routeError = async (req, res) => res.status(400).json({
    errors: {
        message: 'Invalid route. See documentation.',
        error: {
            status: 400
        },
    }
})