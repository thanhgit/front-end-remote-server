var proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/api',
        proxy({
            target: 'http://localhost:8080',
            changeOrigin: true
        })
    )
    app.use(
        '/app/kibana#/dashboard',
        proxy(
            {
                target: 'http://localhost:5601',
                changeOrigin: true
            }
        )
    )
}