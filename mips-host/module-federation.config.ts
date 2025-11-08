import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "mips_host",
  // remotes: {
  //   // Make sure this 'provider' URL is correct for your local setup
  //   // e.g., 'provider@http://localhost:3001/mf-manifest.json'
  //   provider:
  //     "rslib_provider@https://unpkg.com/module-federation-rslib-provider@latest/dist/mf/mf-manifest.json",
  // },
  remotes: {
    mips_product_page_provider:
      "mips_product_page@http://localhost:3001/mf-manifest.json",
    mips_shopping_cart_provider:
      "mips_shopping_cart@http://localhost:3002/mf-manifest.json",
  },
  shareStrategy: "loaded-first",
  shared: {
    react: {
      singleton: true,
      /**
       * Add the version from your host's package.json.
       * This tells MF to provide a version compatible with ^18.0.0.
       */
      requiredVersion: "^18.0.0",
    },
    "react-dom": {
      singleton: true,
      /**
       * Match the react version.
       */
      requiredVersion: "^18.0.0",
    },
  },
});
