module.exports = {
    devServer: {
        host: "localhost",//要设置当前访问的ip 否则失效
        port: 8080,
        open: true,
        hot: true,
        proxy: {
            '/': {
                target: 'http://127.0.0.1:3000',
                ws: true,
                changeOrigin: true,
            }
        }
    }
}