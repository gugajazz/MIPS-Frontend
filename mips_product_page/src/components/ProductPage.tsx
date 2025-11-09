import React from "react";

// 1. A shared type for our product.
//    (In a real app, this would be in a shared 'types' folder)
export interface Product {
  id: string;
  name: string;
  price: number;
}

// 2. The props this component expects from the host
interface ProductPageProps {
  onAddToCart: (product: Product) => void;
}

// 3. A list of dummy products
const dummyProducts: Product[] = [
  { id: "p1", name: "MIPS T-Shirt", price: 24.99 },
  { id: "p2", name: "MIPS Hoodie", price: 49.99 },
  { id: "p3", name: "MIPS Sticker Pack", price: 9.99 },
];

// --- STYLES ---

const productPageStyles: React.CSSProperties = {
  padding: "1.5rem",
  border: "2px dashed #007bff", // Blue dashed border
  borderRadius: "8px",
  backgroundColor: "#17181aff",
  textAlign: "left",
  color: "#f1f1f1",
  maxWidth: "800px",
  margin: "1rem 0",
};

const headerStyles: React.CSSProperties = {
  color: "#007bff",
  marginTop: 0,
};

const productListStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "1rem",
};

const productItemStyles: React.CSSProperties = {
  padding: "1rem",
  backgroundColor: "#2a2a2a",
  borderRadius: "5px",
};

const buttonStyles: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
};

// --- COMPONENT ---

const ProductPage = ({ onAddToCart = () => {} }: ProductPageProps) => {
  return (
    <div style={productPageStyles}>
      <h2 style={headerStyles}>📦 Product Page (Loaded from Remote)</h2>
      <p>
        This component lists products and calls the host's `onAddToCart`
        function.
      </p>

      <div style={productListStyles}>
        {dummyProducts.map((product) => (
          <div key={product.id} style={productItemStyles}>
            <h4 style={{ marginTop: 0 }}>{product.name}</h4>
            <p>${product.price.toFixed(2)}</p>
            <button style={buttonStyles} onClick={() => onAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
