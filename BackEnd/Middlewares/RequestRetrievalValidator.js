const validateRequestRetrieval = (req, res, next) => {
    // Currently, it just passes the request along.
    next();
};

module.exports = { validateRequestRetrieval };
