import type { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx', 
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/icons',
    '@storybook/addon-jest',
    '@storybook/addon-themes',
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-a11y',
    '@kemuridama/storybook-addon-github',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // Makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // Makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop) =>
        prop.parent
          ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName)
          : true,
    },
  },
  webpackFinal: async config => {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module?.rules?.find((rule) =>
      (rule as { test?: RegExp })?.test?.test(".svg")
    ) as { [key: string]: any }

    config.module?.rules?.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule?.resourceQuery?.not || []), /url/]
        }, // exclude if *.svg?url
        use: ["@svgr/webpack"]
      }
    )
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  }
};
export default config;
