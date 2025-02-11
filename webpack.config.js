const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/webflow/index.tsx",
  output: {
    filename: "luxurist-chatbot.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      name: 'LuxuristChatbot',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this',
    clean: true,
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
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
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
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
};