import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import builtins from 'rollup-plugin-node-builtins';
import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const isPrd = process.env.NODE_ENV === 'production';

const makeHtmlAttributes = attributes => {
  if (!attributes) {
    return '';
  }

  const keys = Object.keys(attributes);
  return keys.reduce(
    (result, key) => (result += ` ${key}="${attributes[key]}"`),
    ''
  );
};

export default [
  {
    input: 'src/index',
    output: {
      dir: 'dist',
      format: 'cjs',
    },
    plugins: [
      resolve({
        preferBuiltins: true,
        extensions,
      }), // tells Rollup how to find libraries in node_modules
      typescript(),
      commonjs(),
      json(),
    ],
  },
  {
    input: 'src/client/index',
    output: {
      dir: 'dist/client',
      format: 'es',
    },
    plugins: [
      builtins(),
      resolve({
        extensions,
      }), // tells Rollup how to find libraries in node_modules
      typescript(),
      babel({
        babelHelpers: 'bundled',
        extensions,
        exclude: './node_modules/**',
      }),
      commonjs(), // converts commonjs modules to ES modules
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          isPrd ? 'production' : 'development'
        ),
        preventAssignment: true,
      }),
      html({
        title: 'Collaborative Editor',
        template: options => {
          if (options) {
            const { attributes, meta, files, publicPath, title } = options;
            const scripts = (files.js || [])
              .map(({ fileName }) => {
                const attrs = makeHtmlAttributes(attributes.script);
                return `<script src="${publicPath}${fileName}"${attrs}></script>`;
              })
              .join('\n');

            const links = (files.css || [])
              .map(({ fileName }) => {
                const attrs = makeHtmlAttributes(attributes.link);
                return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
              })
              .join('\n');

            const metas = meta
              .map(input => {
                const attrs = makeHtmlAttributes(input);
                return `<meta${attrs}>`;
              })
              .join('\n');
            return `
                  <!doctype html>
                  <html${makeHtmlAttributes(attributes.html)}>
                    <head>
                      ${metas}
                      <title>${title}</title>
                      ${links}
                    </head>
                    <body>
                      <div id="root"></div>
                      ${scripts}
                    </body>
                  </html>`;
          }
          return '';
        },
      }),
    ],
  },
];
