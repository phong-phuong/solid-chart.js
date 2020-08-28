import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import strip from "@rollup/plugin-strip";
import del from "rollup-plugin-delete";
const extensions = ["ts", "tsx", "js", "jsx"].map((x) => "." + x);

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "src/index.ts",
  treeshake: true,
  preserveEntrySignatures: false,
  output: {
    sourcemap: false,
    dir: "dist",
    format: "es",
    minifyInternalExports: true,
  },
  plugins: [
    nodeResolve({
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: "bundled",
      presets: ["solid", "@babel/preset-typescript"],
      exclude: /node_modules\//,
    }),
    commonjs({
      extensions,
    }),
    strip({
      include: /\.(js|mjs|ts|tsx|jsx)/,
    }),
    del({ targets: "dist/*" }),
  ],
};
export default config;
