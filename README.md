# Eleventy/Figma Plugin Template Instructions

## Why Use This?

Creating a simple plugin for Figma is pretty straightforward. However, when your plugin starts getting bigger you run into a big issue; organization. Figma UI plugins have a limitation where it will only load one `.html` file, so you can't link to css using `<link rel="./some-local-path" />` or javascript using `<script src="./some-local-path" />`. If you want to do this, Figma recommends using a tool like Webpack. I don't know how to use webpack and didn't really care to learn it. I do however know Eleventy and figured it would work really well for creating a plugin. So, this is me sharing my Eleventy/Figma Plugin Template with you.

## Getting Started

Install this template. In a terminal navigate to this folder and run `npm install`. This will install all of the Eleventy and Figma dependencies. 

Once that is done, you will need to get your own Figma plugin ID. In the `manifest.json` file you will see an ID field with "###################". You will want to replace that number.

1. In Figma Desktop go to Plugins > Development > New Plugin. 
2. Add in a plugin name (whatever you want, it doesn't matter), then choose "Figma Design", then next.
3. Choose "Custom UI". You will then be prompted to save the plugin somewhere. 
4. Open that folder that you saved and open the `manifest.json` file and copy that ID. 
5. Paste that ID into this template.
6. OPTIONAL: If you are new to developing plugins for Figma, you might want to read through that README.md file which has additional information this file does not have.
7. You can delete that new plugin folder you just created. You don't need it anymore.

This project is set up to use `src` as the input directory and `dist` as the output directory. The `src` directory will include `code.ts` which is code for the Figma side of the plugin, and other files are handled by Eleventy. This setup uses Nunjucks, but you can use whatever other templating language Eleventy offers if you want. If you open `index.njk` there will be some comments guiding you on how to use the template.

To begin development, run `npm run dev`. This will create `dist/index.html` from the Eleventy project, and `dist/code.ts` from the `code.ts` file. From here, you can go to Figma > Plugins > Development > Import Plugin from Manifest. Select this project manifest and you can start using the plugin!

## Inlining JS, CSS, and Sass

The main limitation to developing plugins for Figma is that everything needs to be in one single `.html` file. This means that all JavaScript and CSS needs to be used in a `<script>...</script>` or `<style>...</style>` tag. You can manually write these, but this template provides a filter to extract that from a separate file and inline it in the output file. You can also use Sass which will automatically compile to CSS. Simply add a filter to your `.njk` file where ever you want it inserted (see example below). You can also pull code from `node_modules` as well. 


```njk
<!-- Please note that these file paths are relative to the `.eleventy.js` config file. -->
{{ './src/style.scss' | inlineFromFile | safe }}
{{ './src/style.css' | inlineFromFile | safe }}
{{ './src/script.js' | inlineFromFile | safe }}
{{ './node_modules/alpinejs/dist/cdn.js' | inlineFromFile | safe }}
```

## Adding External Code (CDN)

If you don't want to inline your code, but would rather use a CDN, you will need to modify the `manifest.json` file to allow the domains. Check out the [documentation](https://www.figma.com/plugin-docs/manifest/#networkaccess) for more details.

```json
{
  "networkAccess": {
    "allowedDomains": [
      "cdnjs.cloudflare.com" // was "none"
    ]
  }
}
```

## Documentation Links

For more information regarding development, check out the links below.

- [Figma Plugin Documentation](https://www.figma.com/plugin-docs/)
- [Eleventy Documentation](https://www.11ty.dev/)