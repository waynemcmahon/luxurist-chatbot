const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/webflow/index.tsx",
  output: {
    filename: "luxurist-chatbot.js",
    path: path.resolve(__dirname, "dist"),
    library: "LuxuristChatbot",
    libraryTarget: "umd",
    globalObject: "this",
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
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript"
            ],
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
    react: "React",
    "react-dom": "ReactDOM",
  },
};