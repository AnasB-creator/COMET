const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {

    entry: {
        homeMainApp: './frontEndSource/javascript/mainApp/index.js',
    //    loginApp: "./frontEndSource/javascript/accounts/loginApp/index.js",
      //  passwordResetAskApp: "./frontEndSource/javascript/accounts/passwordResetAskApp/index.js",
      //  passwordResetSentMessageApp:  "./frontEndSource/javascript/accounts/passwordResetSentApp/index.js",
      //  passwordResetChangeKeyApp: "./frontEndSource/javascript/accounts/passwordResetChangeKeyApp/index.js",
      //  passwordResetChangeKeyDoneApp: "./frontEndSource/javascript/accounts/passwordResetChangeKeyDoneApp/index.js",
      //  signupApp: "./frontEndSource/javascript/accounts/signupApp/index.js",
      //  emailChangeConfirmApp: "./frontEndSource/javascript/accounts/emailChangeConfirmApp/index.js",
    },  // path to our input file
    output: {
        filename: '[name].bundle.js',  // output bundle file name
        path: path.resolve(__dirname, './static/js'),  // path to our Django static directory
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/, // Include TS and TSX files
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript", // Add TypeScript preset
                        "@babel/preset-flow"
                    ]
                }
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    }, resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
       
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './templates/account/login.html' // Adjust this path to your HTML template
        // })
    ],
    devServer: {
        static: {
            directory: './dist'
        },
        open: true // This opens your browser when the server starts
    },
    watchOptions: {
        ignored: /node_modules/, // Typical to ignore node_modules
        poll: 1000 // Check for changes every second
    }
};