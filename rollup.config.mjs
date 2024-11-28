// rollup.config.js
import terser from '@rollup/plugin-terser';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import svgr from '@svgr/rollup'

import pkg from "./package.json" assert { type: 'json' };

export default [
	{
		input: 'src/index.ts',
		cache: false,
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				sourcemap: true,
				exports: 'named',
				noConflict: true,
				interop: "auto",
			},
			{
				file: pkg.module,
				format: "esm",
				sourcemap: true,
				exports: 'named',
				noConflict: true
			},
			/* {
				file: 'dist/bundle.min.js',
				format: 'iife',
				name: 'version',
				plugins: [terser()]
			} */
		],
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			svgr(),
			typescript({ tsconfig: "./tsconfig.json" }),
			postcss(),
			terser()
		]
	},
	{
		input: "dist/esm/types/index.d.ts",
		output: [{ 
			file: "dist/index.d.ts", 
			format: "esm",
			exports: 'named',
			noConflict: true
		}],
		cache: false,
		plugins: [dts()],
		external: [/\.(css|less|scss)$/],
	},
];
