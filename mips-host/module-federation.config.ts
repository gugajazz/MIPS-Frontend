import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "mips-host",
  // remotes: {
  //   // Make sure this 'provider' URL is correct for your local setup
  //   // e.g., 'provider@http://localhost:3001/mf-manifest.json'
  //   provider:
  //     "rslib_provider@https://unpkg.com/module-federation-rslib-provider@latest/dist/mf/mf-manifest.json",
  // },
  remotes: {
    provider: "mips_product_page_name@http://localhost:3001/mf-manifest.json",
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
