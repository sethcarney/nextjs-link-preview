import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "src/nextjs/components/LinkPreview.tsx",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      banner: "'use client';"
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
      banner: "'use client';"
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
      exclude: ["**/*.test.tsx", "**/*.test.ts", "nextjs-demo/**"]
    })
  ],
  external: ["react", "react-dom", "next"]
};
