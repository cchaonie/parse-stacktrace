"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const plugin_node_resolve_1 = tslib_1.__importDefault(require("@rollup/plugin-node-resolve"));
const plugin_replace_1 = tslib_1.__importDefault(require("@rollup/plugin-replace"));
const plugin_commonjs_1 = tslib_1.__importDefault(require("@rollup/plugin-commonjs"));
const plugin_html_1 = tslib_1.__importDefault(require("@rollup/plugin-html"));
const rollup_plugin_node_builtins_1 = tslib_1.__importDefault(require("rollup-plugin-node-builtins"));
const plugin_babel_1 = require("@rollup/plugin-babel");
const rollup_plugin_postcss_1 = tslib_1.__importDefault(require("rollup-plugin-postcss"));
const autoprefixer_1 = tslib_1.__importDefault(require("autoprefixer"));
const rollup_plugin_copy_1 = tslib_1.__importDefault(require("rollup-plugin-copy"));
const rollup_plugin_eslint_1 = require("rollup-plugin-eslint");
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const isPrd = process.env.NODE_ENV === 'production';
const makeHtmlAttributes = attributes => {
    if (!attributes) {
        return '';
    }
    const keys = Object.keys(attributes);
    return keys.reduce((result, key) => (result += ` ${key}="${attributes[key]}"`), '');
};
exports.default = [
    {
        input: 'src/client/index',
        output: {
            dir: 'dist/client',
            format: 'es',
            sourcemap: !isPrd,
        },
        plugins: [
            (0, rollup_plugin_eslint_1.eslint)(),
            (0, rollup_plugin_node_builtins_1.default)(),
            (0, plugin_node_resolve_1.default)({
                extensions,
            }),
            (0, plugin_babel_1.babel)({
                babelHelpers: 'bundled',
                extensions,
                exclude: './node_modules/**',
            }),
            (0, plugin_commonjs_1.default)(),
            (0, plugin_replace_1.default)({
                'process.env.NODE_ENV': JSON.stringify(isPrd ? 'production' : 'development'),
                preventAssignment: true,
            }),
            (0, rollup_plugin_postcss_1.default)({
                extract: true,
                plugins: [autoprefixer_1.default],
                modules: true,
            }),
            (0, rollup_plugin_copy_1.default)({
                targets: [{ src: 'src/assets', dest: 'dist/client' }],
            }),
            (0, plugin_html_1.default)({
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
                            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}/>`;
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
                      <link rel="icon" type="image/svg+xml" href="/assets/favicon.ico" />
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
