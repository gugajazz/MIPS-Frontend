import React from "react";
import "./App.css";

import SafeComponent from "./components/SafeComponent";

// 1. LAZY IMPORT the remote component using its exposed name
//    'provider' = the remote's name
const ProductPageRemoteProviderComponent = React.lazy(
  () => import("mips_product_page_provider/ProductPage")
);

const ShoppingCartPageRemoteProviderComponent = React.lazy(
  () => import("mips_shopping_cart_provider/ShoppingCart")
);

// (Using inline styles for this PoC)
const hostStyles: React.CSSProperties = {
  border: "2px solid green",
  padding: "1rem",
  borderRadius: "8px",
};

const App = () => {
  return (
    <div className="content" style={hostStyles}>
      <h1>Host Application</h1>
      <p>This part is rendered by the host.</p>

      {/* --- Remote Component 1 --- */}
      {/* Wrap EACH remote in its own boundary. This isolates it.
        If this component crashes, the SafeComponent catches it
        and the rest of the page (including the cart) keeps working.
      */}
      <SafeComponent>
        <React.Suspense fallback={<div>Loading Product Page...</div>}>
          <ProductPageRemoteProviderComponent />
        </React.Suspense>
      </SafeComponent>

      <hr />

      <SafeComponent>
        <React.Suspense fallback={<div>Loading remote component...</div>}>
          <ShoppingCartPageRemoteProviderComponent />
        </React.Suspense>
      </SafeComponent>
    </div>
  );
};

export default App;
