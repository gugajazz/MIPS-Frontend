import React from "react";
import "./App.css";

import SafeComponent from "./components/SafeComponent";

// 1. Define the Product interface (as seen by the ProductPage)
export interface Product {
  id: string; // The *product* ID (e.g., "p1")
  name: string;
  price: number;
}

// 2. Define the CartItem interface (the new state structure)
export interface CartItem {
  instanceId: string; // The *unique instance* ID (e.g., "uuid-123-abc")
  product: Product;
}

// 3. Lazy load the remote components
const RemoteProductPage = React.lazy(
  () => import("mips_product_page_provider/ProductPage")
);

const RemoteShoppingCartPage = React.lazy(
  () => import("mips_shopping_cart_provider/ShoppingCartPage")
);

// --- STYLES (same as before) ---
const hostStyles: React.CSSProperties = {
  border: "2px solid #28a745",
  padding: "1rem",
  borderRadius: "8px",
  backgroundColor: "#1f1f1f",
  color: "#f1f1f1",
  maxWidth: "900px",
  margin: "2rem auto",
};

const hostHeaderStyles: React.CSSProperties = {
  backgroundColor: "#2a2a2a",
  padding: "1rem",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #444",
};

// --- COMPONENT ---

const App = () => {
  // 4. Host state is now an array of CartItem
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  /**
   * 5. Update handleAddToCart
   */
  const handleAddToCart = (product: Product) => {
    // Create the new CartItem with a unique instanceId
    const newCartItem: CartItem = {
      instanceId: crypto.randomUUID(),
      product: product,
    };

    setCartItems((prevItems) => [...prevItems, newCartItem]);
  };

  /**
   * 6. Update handleRemoveFromCart
   * It now removes based on the unique instanceId
   */
  const handleRemoveFromCart = (instanceId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.instanceId !== instanceId)
    );
  };

  return (
    <div className="content" style={hostStyles}>
      <div style={hostHeaderStyles}>
        <h1 style={{ margin: 0 }}>Host Application</h1>
        <h2 style={{ margin: 0 }}>🛒 Cart Count: {cartItems.length}</h2>
      </div>

      <p style={{ padding: "1rem 0" }}>
        This host manages the cart state and passes it down.
      </p>

      {/* --- Remote Product Page (No prop changes needed) --- */}
      <SafeComponent>
        <React.Suspense fallback={<div>Loading Product Page...</div>}>
          <RemoteProductPage onAddToCart={handleAddToCart} />
        </React.Suspense>
      </SafeComponent>

      {/* 7. Pass the new state and callback to the cart */}
      <SafeComponent>
        <React.Suspense fallback={<div>Loading Shopping Cart...</div>}>
          <RemoteShoppingCartPage
            items={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
          />
        </React.Suspense>
      </SafeComponent>
    </div>
  );
};

export default App;
