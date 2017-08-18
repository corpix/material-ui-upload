module.exports = {
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            minimize: false
                        }
                    }
                ]
            },
        ]
    }
};
