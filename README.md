# @crystal-creations/crystal-components
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Crystal-Creations-GbR/crystal-components?sort=semver)](https://github.com/Crystal-Creations-GbR/crystal-components/releases) [![GitHub](https://img.shields.io/github/license/Crystal-Creations-GbR/crystal-components)](LICENSE) [![Build and publish npm package](https://github.com/Crystal-Creations-GbR/crystal-components/actions/workflows/publish.yml/badge.svg)](https://github.com/Crystal-Creations-GbR/crystal-components/actions/workflows/publish.yml) [![npm](https://img.shields.io/npm/v/@crystal-creations/crystal-components)](https://www.npmjs.com/package/@crystal-creations/crystal-components) [![npm](https://img.shields.io/npm/dw/@crystal-creations/crystal-components)](https://www.npmjs.com/package/@crystal-creations/crystal-components)

A vuetify based component library from crystal creations.

## Usage in nuxt 3
1. Install with

   `npm install @crystal-creations/crystal-components`

2. Add the following to your `nuxt.config.ts`.
    ```ts
    export default defineNuxtConfig({
      app: {
        // ...
        modules: [
          // ...
          "@crystal-creations/crystal-components/nuxt",
        ],
      },
    });
    ```

3. Add the component to your Vue component.
    ```vue
    <template>
      <AnimatedCheckmark></AnimatedCheckmark>
    </template>
    ```

## Usage in vue 3
1. Install with

   `npm install @crystal-creations/crystal-components`

2. Add the following to your Vue `main.ts`.
    ```ts
    import { AnimatedCheckmark } from "@crystal-creations/crystal-components";
    import "@crystal-creations/crystal-components/styles";
    
    // ...
    
    const app = createApp(App)
    
    app.component("AnimatedCheckmark", AnimatedCheckmark);
    ```

3. Add the component to your Vue component.
    ```vue
    <template>
      <AnimatedCheckmark></AnimatedCheckmark>
    </template>
    ```
