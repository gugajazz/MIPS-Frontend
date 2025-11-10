import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "mips_host",
  remotes: {
    mips_product_page_provider:
      "mips_product_page@http://localhost:3001/mf-manifest.json",
    mips_shopping_cart_provider:
      "mips_shopping_cart@http://localhost:3002/mf-manifest.json",
  },
  shareStrategy: "loaded-first",
  shared: {
    // --- CORE REACT ---
    react: {
      singleton: true,
      requiredVersion: "^18.0.0",
      shareScope: "default", // <-- THIS IS THE FIX
    },
    "react-dom": {
      singleton: true,
      requiredVersion: "^18.0.0",
      shareScope: "default", // <-- THIS IS THE FIX
    },
    // "react-router-dom": {
    //   singleton: true,
    //   requiredVersion: "^6.0.0", // Make sure version matches your package.json
    // },

    // --- MUI & EMOTION ---
    "@mui/material": {
      singleton: true,
      requiredVersion: "^5.0.0", // Make sure version matches your package.json
    },
    "@mui/icons-material": {
      singleton: true,
      requiredVersion: "^5.0.0", // Make sure version matches your package.json
    },
    "@emotion/react": {
      singleton: true,
      requiredVersion: "^11.0.0", // Make sure version matches your package.json
    },
    "@emotion/styled": {
      singleton: true,
      requiredVersion: "^11.0.0", // Make sure version matches your package.json
    },
    "@emotion/react": {
      singleton: true,
      requiredVersion: "^11.0.0",
    },
  },
});
