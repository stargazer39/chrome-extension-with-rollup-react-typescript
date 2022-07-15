import typescript from 'rollup-plugin-typescript'
import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

const popup =  {
  input: "popup/index.tsx",
  output: {
    file: "dist/popup/app.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top',
      },
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        preventAssignment: true
    }),
    resolve(),
    commonjs(),
    typescript(),
    copy({
        targets: [
            { src: 'popup/*.html', dest: 'dist/popup/' },
            { src: 'manifest.json', dest: 'dist' },
        ]
    })
  ],
  watch: { include: ['manifest.json', 'popup/**/*'] },
};

export default [popup];