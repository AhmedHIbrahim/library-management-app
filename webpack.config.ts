import path from "path";

export default {
  mode: "production",
  entry: "./src/app.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "final.js", // Output should be a JavaScript file
  },
  target: "node",
  resolve: {
    extensions: [".ts", ".js"], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
