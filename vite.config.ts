import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from "vite-plugin-imp"
import path from 'path'

const isProd = process.env.NODE_ENV === 'production';
const pkg = require('./package.json');
const dependencies = Object.keys(pkg.peerDependencies);

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    // antd主题修改
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#5dbd81',
          'link-color': '#5dbd81',
        },
        modules: true,
        javascriptEnabled: true,
      }
    }
  },
  plugins: [
    vue(),
    // 按需加载 不需要
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'ant-design-vue',
    //       style(name) {
    //         if (/popconfirm/.test(name)) {
    //           // support multiple style file path to import
    //           return [
    //             'ant-design-vue/es/button/style/index.less',
    //             'ant-design-vue/es/popover/style/index.less'
    //           ]
    //         }
    //         if (/row/.test(name)) {
    //           // support multiple style file path to import
    //           return [
    //             'ant-design-vue/es/button/style/index'
    //           ]
    //         }
    //         return `ant-design-vue/es/${name}/style/index.less`
    //       }
    //     },
    //   ]
    // })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'SLBasic',
    },
    rollupOptions: {
      onwarn: function (warning) {
        console.log(warning)
      },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: dependencies,
      output: {
        exports:'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'ant-design-vue': 'Antd',
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3001,
    open: true
  },
  esbuild: {
    // tsx语法报错React is not defined
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    // h is not difined
    // 或者tsx文件中 引入import { h } from 'vue'
    jsxInject: "import { h } from 'vue'"
  }
})
