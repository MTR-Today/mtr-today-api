import run from '@rollup/plugin-run'
import typescript from '@rollup/plugin-typescript'

const dev = process.env.NODE_ENV !== 'production'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    preserveModules: true,
  },
  plugins: [typescript(), dev && run()],
}
