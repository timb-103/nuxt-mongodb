import { defineNuxtModule, createResolver, addTemplate } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-mongodb-auth',
    configKey: 'nuxtMongodbAuth',
  },
  defaults: {},
  async setup(options, nuxt) {
    // @ts-ignore
    const { resolve } = createResolver(import.meta.url)

    // add options to runtime config
    nuxt.options.runtimeConfig.nuxtMongodbAuth = defu(nuxt.options.runtimeConfig.nuxtMongodbAuth, {
      MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
      MONGO_DB: process.env.MONGO_DB,
    })

    // 5. Create virtual imports for server-side
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}

      // Inline module runtime in Nitro bundle
      nitroConfig.externals = defu(
        typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {},
        {
          inline: [resolve('./runtime')],
        }
      )
      nitroConfig.alias['#mongodb'] = resolve('./runtime/server/utils')
    })

    // add exports so we can use import {} from '#mongodb'
    addTemplate({
      filename: 'types/mongodb.d.ts',
      getContents: () =>
        [
          "declare module '#mongodb' {",
          `  const mongo: typeof import('${resolve('./runtime/server/utils')}').mongo`,
          '}',
        ].join('\n'),
    })

    // add nitro plugin to connect on load
    nuxt.hooks.hook('nitro:config', (config) => {
      config.plugins = config.plugins || []
      config.plugins.push(resolve('./runtime/nitro-plugin'))
    })
  },
})
