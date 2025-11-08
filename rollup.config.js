import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const config = [
  // JavaScript bundles
  {
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
        declarationDir: "dist/types",
        exclude: ["**/*.test.tsx", "**/*.test.ts", "nextjs-demo/**"]
      })
    ],
    external: ["react", "react-dom", "next"]
  },
  // TypeScript declarations bundle
  {
    input: "dist/types/nextjs/components/LinkPreview.d.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es"
    },
    plugins: [dts()],
    external: ["react"]
  }
];

export default config;
