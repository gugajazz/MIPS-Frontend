import React from "react";
import "./App.css";

// 1. LAZY IMPORT the remote component using its exposed name
//    'provider' = the remote's name
//    'ProviderComponent' = the key you just exposed
const RemoteProviderComponent = React.lazy(
  () => import("provider/ProviderComponent")
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

      {/* 2. WRAP it in Suspense to handle the async loading */}
      <React.Suspense fallback={<div>Loading remote component...</div>}>
        <RemoteProviderComponent />
      </React.Suspense>
    </div>
  );
};

export default App;
