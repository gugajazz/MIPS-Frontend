import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "mips_example",
  exposes: {
    "./ExamplePage": "./src/components/Example.tsx",
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: "^18.0.0",
    },
    "react-dom": {
      singleton: true,
      requiredVersion: "^18.0.0",
    },
    "@emotion/react": {
      singleton: true,
      requiredVersion: "^11.0.0",
    },
  },
});
