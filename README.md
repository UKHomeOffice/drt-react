# React components for the DRT application suite

Built using [this Boilerplate](https://github.com/MidoAhmed/rollup-react-library-starter).


## Features
- [Rollup](https://rollupjs.org/) for bundling
- Bundles `commonjs` and `es` module formats
- [Jest](https://facebook.github.io/jest/) & [React Testing Library](https://testing-library.com/)  : For testing our components
- Support for [TypeScript](https://www.typescriptlang.org/)
- Sourcemap creation
- Support of CSS/SASS: For exporting components with style
- [Storybook](https://storybook.js.org/): For testing our components within the library itself as we design them
- Supports complicated peer-dependencies (example here is [Antd](https://ant.design/) so here the power of rollup-plugin-peer-deps-external we can use complicated peer dependency such Antd without having it bundled as a part of your module.)
- Optimizing bundle size: [@rollup/plugin-terser](https://www.npmjs.com/package/@rollup/plugin-terser) A Rollup plugin to generate a minified bundle with terser.
- Automatically externalize peerDependencies in a rollup bundle, thanks to [rollup-plugin-peer-deps-external](https://www.npmjs.com/package/rollup-plugin-peer-deps-external)
- Eslint
- Deploy Storybook to GitHub Pages

### Development:

- Storybook:
    - Storybook gives you an easy way to see and use your components while working on them in your library project, without having to build an unnecessary testing page just to display them.

        ```bash
        npm run storybook # runs the host Storybook application locally for quick and easy testing
        ```
Now, anytime you make a change to your library or the stories, the storybook will live-reload your local dev server so you can iterate on your component in real-time.

- Rollup watch and build:

    - for Local development run rollup to watch your src/ module and automatically recompile it into dist/ whenever you make changes.

        ```bash
        npm run dev # runs rollup with watch flag
        ```

### Scripts:
- `npm run build` : builds the library to `dist`
- `npm run dev`  : builds the library, then keeps rebuilding it whenever the source files change.
- `npm test` : tests the library and show the coverage.
- `npm run lint` : runs eslint.
- `npm run storybook` : runs the host Storybook application locally for quick and easy testing
- `npm run build-storybook` : builds a static HTML/JS bundle that can easily be hosted on a remote server, so all members of your team can try your components.
- `npm run deploy-storybook` : build & deploy the storybook to GitHub Pages

## License

[MIT](LICENSE).
