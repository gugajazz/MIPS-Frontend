import React from "react";

// Simple inline styles for the PoC to make it obvious
const productPageStyles: React.CSSProperties = {
  padding: "1.5rem",
  border: "2px dashed #007bff", // Blue dashed border
  borderRadius: "8px",
  backgroundColor: "#17181aff",
  textAlign: "left",
};

const headerStyles: React.CSSProperties = {
  color: "#007bff",
  marginTop: 0,
};

const ProductPage = () => {
  // This state is self-contained within the remote
  const [counter, setCounter] = React.useState(0);

  return (
    <div style={productPageStyles}>
      <h2 style={headerStyles}>📦 Product Page (Loaded from Remote)</h2>
      <p>
        This entire component (including the border and this button) is being
        rendered by the <strong>mips_product_page</strong> remote.
      </p>
      <button onClick={() => setCounter((c) => c + 1)}>
        Remote Counter: {counter}
      </button>
      <p>
        <small>This proves that its own React state is encapsulated.</small>
      </p>
    </div>
  );
};

// This default export is what you will expose in your
// module-federation.config.ts
export default ProductPage;
