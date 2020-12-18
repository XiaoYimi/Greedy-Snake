
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    environment: {
      arrowFunction: false, // 不使用箭头函数
      const: false, // 兼容 IE10
    }
  },
  plugins: [
    new CleanWebpackPlugin(), // 每次打包前移除 dist 文件
    new HTMLWebpackPlugin({ template: "./src/index.html" }) // 自动化创建 html 文件,并引入相关文件
  ],
  module: {
    rules: [
      // JS 配置
      {
        test: /\.js|jsx$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    // 处理兼容的浏览器
                    targets: {
                      "chrome": "88",
                      "ie": "10"
                    },
                    "corejs": "3", // 使用 core-js 主版本
                    "useBuiltIns": "usage" // core-js 函数按需加载 
                  }
                ]
              ]
            },
          }
        ],
        exclude: /node_modules/
      },
      // TS 配置
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      "chrome": "88",
                      "ie": "10"
                    },
                    "corejs": "3",
                    "useBuiltIns": 'usage'
                  }
                ]
              ]
            },
          },
          "ts-loader"
        ],
        exclude: /node_modules/
      },
      // Css 配置
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
                  "postcss-preset-env"
                ]
              }
            }
          }
        ]
      },
      // Scss 配置
      { 
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env"
                ]
              }
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  // 用来设置模块支持
  resolve: {
    extensions: [
      ".ts",
      ".js"
    ]
  }
};
