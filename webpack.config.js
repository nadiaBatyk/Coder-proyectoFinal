const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode:'production',
    entry:'./src/index.ts',
    target:'node',
    externals:[nodeExternals()],
    watch:true,
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'main.js',
    },
    resolve:{
        extensions:['.ts','.js']
    },
    plugins:[
        new NodemonPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.ts?/,
                use:'ts-loader',
                exclude:/node_modules/
            }
        ]
    }
}