import postcssJitProps from 'postcss-jit-props';
import autoprefixer from 'autoprefixer';
import postcssNesting from 'postcss-nesting';
import postcssPow from 'postcss-pow';
import postcssImport from 'postcss-import';
import OpenProps from 'open-props';
import postcssCustomMedia from 'postcss-custom-media';
// import process from 'process';

// Use process.env.NODE_ENV to check if the environment is production
// const isProd = import.meta.env.PROD;
// const isDev = import.meta.env.DEV;

// const isProd = process.env.NODE_ENV === 'production';

export default {
  plugins: [
    postcssImport,
    postcssJitProps(OpenProps),
    autoprefixer,
    postcssNesting,
    postcssPow,
    postcssCustomMedia,
  ],
};
// Use process.env.NODE_ENV to check if the environment is production
