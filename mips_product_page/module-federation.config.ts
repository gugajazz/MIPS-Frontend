import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "mips_product_page",
  exposes: {
    "./ProductPage": "./src/components/ProductPage.tsx",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
    "@mui/material": {
      singleton: true,
      requiredVersion: "^5.0.0",
    },
    "@emotion/react": {
      singleton: true,
      requiredVersion: "^11.0.0",
    },
    "@emotion/styled": {
      singleton: true,
      requiredVersion: "^11.0.0",
    },
  },
});
