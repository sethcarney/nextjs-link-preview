import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs"
    },
    {
      file: "dist/index.esm.js",
      format: "esm"
    }
  ],
  external: ["react", "react-dom", "axios", "cheerio"],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: "dist",
      rootDir: "src"
    }),
    resolve(),
    commonjs()
  ]
};
