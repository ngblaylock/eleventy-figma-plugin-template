const sass = require("sass");
const fs = require("fs");
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");

module.exports = (eleventyConfig) => {
  // minifies ui.html build
  eleventyConfig.addPlugin(eleventyPluginFilesMinifier);

  // refreshes page when any files in src change
  eleventyConfig.addWatchTarget("./src/");
  
  eleventyConfig.setBrowserSyncConfig({
    // refreshes page when css changes (instead of injecting)
    // https://browsersync.io/docs/options#option-injectChanges
    injectChanges: false,
  });

  // Filter to inline a file
  // Figma plugins cannot link to other files, everything must be in one .html file
  eleventyConfig.addFilter("inlineFromFile", function (filePath) {
    const extension = filePath.split(".").pop();
    if (extension === "scss") {
      const sassContent = sass.compile(filePath);
      return `<style>${sassContent.css}</style>`;
    } else if (extension === "css") {
      const cssContent = fs.readFileSync(filePath, "utf-8");
      return `<style>${cssContent}</style>`;
    } else if (extension === "js") {
      const jsContent = fs.readFileSync(filePath, "utf-8");
      return `<script>${jsContent}</script>`;
    }
    return "";
  });

  // For better organization
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
