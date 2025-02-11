const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/webflow/index.tsx",
  output: {
    filename: "luxurist-chatbot.js",
    path: path.resolve(__dirname, "public/dist"),
    library: {
      name: 'LuxuristChatbot',
      type: 'umd',
      export: 'default',
      umdNamedDefine: true
    },
    globalObject: 'window',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { 
                targets: "> 0.25%, not dead",
                modules: "umd"
              }],
              ["@babel/preset-react", { 
                runtime: "automatic",
                importSource: "react"
              }],
              "@babel/preset-typescript"
            ],
            plugins: [
              "@babel/plugin-transform-runtime"
            ]
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};