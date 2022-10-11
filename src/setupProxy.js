const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use('/proxy',
        createProxyMiddleware(
            {
                target: 'https://klas.kw.ac.kr',
                changeOrigin: true,
                pathRewrite: { '^/proxy': '' },
                cookieDomainRewrite:{'kw.ac.kr':'localhost'}
            }
        )
    )
}