const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/webflow/index.tsx",
  output: {
    filename: "luxurist-chatbot.js",
    path: path.resolve(__dirname, "public/dist"),
    library: "LuxuristChatbot",
    libraryTarget: "umd",
    globalObject: "this",
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
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  optimization: {
    minimize: true
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};