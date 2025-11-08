import "./App.css";
// Import the actual component you are building and exposing
import ShoppingCart from "./components/ShoppingCart";

// Simple styles for the standalone "harness"
const harnessStyles: React.CSSProperties = {
  padding: "1rem",
  backgroundColor: "#17181aff",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const App = () => {
  return (
    <div className="content" style={harnessStyles}>
      <h1>Running 'mips_shopping_cart_page' in Standalone Mode</h1>
      <p>
        This container is the <strong>local App.tsx</strong>. The component
        below is the one we are actually exporting.
      </p>
      <hr style={{ margin: "1.5rem 0" }} />

      {/* This is the actual micro-frontend component */}
      <ShoppingCart />
    </div>
  );
};

export default App;
