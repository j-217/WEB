const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")


module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    resolve: {    
        modules: [path.resolve(__dirname, 'src'), 'node_modules']  
    },

    devServer: {    
        contentBase: path.join(__dirname,'src'),
        host: 'localhost',
        port: 8000,
        compress: true,  
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /.(js|jsx)$/, 
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    "presets": [
                        "@babel/preset-env", 
                        "@babel/preset-react"
                    ],
                    "plugins": [
                        "@babel/plugin-proposal-class-properties", 
                        ["babel-plugin-import",{
                            "libraryName": "antd",
                            "libraryDirectory": "es",
                            "style": "css",
                        }]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
        ]
    }

}