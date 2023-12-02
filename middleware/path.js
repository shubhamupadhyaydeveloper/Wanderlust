const path = ((req, res ,next) => {
     if(req.session.url) {
        res.locals.currurl = req.session.url;
     }
    next()
})

module.exports = path;