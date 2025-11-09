import React from "react";

// 1. Define the same interfaces as the host
export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  instanceId: string;
  product: Product;
}

// 2. The props interface is updated
interface ShoppingCartPageProps {
  items: CartItem[]; // Expects an array of CartItem
  onRemoveFromCart: (instanceId: string) => void; // Expects an instanceId
}

// --- STYLES (same as before) ---
const cartPageStyles: React.CSSProperties = {
  padding: "1.5rem",
  border: "2px dashed #e63946",
  borderRadius: "8px",
  backgroundColor: "#1f1f1f",
  textAlign: "left",
  color: "#f1f1f1",
  maxWidth: "800px",
  margin: "1rem 0",
};

const headerStyles: React.CSSProperties = {
  color: "#e63946",
  marginTop: 0,
};

const cartItemStyles: React.CSSProperties = {
  padding: "1rem",
  backgroundColor: "#2a2a2a",
  borderRadius: "5px",
  marginBottom: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const removeButtonStyles: React.CSSProperties = {
  backgroundColor: "#e63946",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

// --- COMPONENT ---

const ShoppingCartPage = ({
  items = [],
  onRemoveFromCart = () => {},
}: ShoppingCartPageProps) => {
  // 3. Update total price calculation
  const totalPrice = items.reduce((sum, item) => sum + item.product.price, 0);

  return (
    <div style={cartPageStyles}>
      <h2 style={headerStyles}>🛒 Shopping Cart (Loaded from Remote)</h2>
      <p>Lists items from the host and calls `onRemoveFromCart`.</p>

      <div>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          // 4. Update the .map() to use the new structure
          items.map((item) => (
            <div key={item.instanceId} style={cartItemStyles}>
              {" "}
              {/* Use unique key */}
              <div>
                {/* Access data via 'item.product' */}
                <h4 style={{ margin: 0 }}>{item.product.name}</h4>
                <p style={{ margin: "5px 0 0 0" }}>
                  ${item.product.price.toFixed(2)}
                </p>
              </div>
              <button
                style={removeButtonStyles}
                onClick={() => onRemoveFromCart(item.instanceId)} // Pass instanceId
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <>
          <hr />
          <h3 style={{ textAlign: "right" }}>
            Total: ${totalPrice.toFixed(2)}
          </h3>
        </>
      )}
    </div>
  );
};

export default ShoppingCartPage;
