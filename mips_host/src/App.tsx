import React from "react";
import "./App.css";
// Import Link as RouterLink to avoid conflicts
import {
  BrowserRouter,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// --- MUI Component Imports ---
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";

import SafeComponent from "./components/SafeComponent";

import StorefrontIcon from "@mui/icons-material/Storefront";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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

// --- New HomePage using MUI ---
const HomePage = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      Welcome to the Host Home Page
    </Typography>
    <Typography variant="body1">
      This content is rendered by the host application. Use the navigation bar
      above to load the remote micro-frontends.
    </Typography>
  </Box>
);

// --- Main App Component ---
const App = () => {
  // 4. Host state (unchanged)
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  // 5. Add to cart callback (unchanged)
  const handleAddToCart = (product: Product) => {
    const newCartItem: CartItem = {
      instanceId: crypto.randomUUID(),
      product: product,
    };
    setCartItems((prevItems) => [...prevItems, newCartItem]);
  };

  // 6. Remove from cart callback (unchanged)
  const handleRemoveFromCart = (instanceId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.instanceId !== instanceId)
    );
  };

  // --- Suspense Fallback ---
  const loadingFallback = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh", // Match the Paper's minHeight
      }}
    >
      <CircularProgress />
      <Typography sx={{ ml: 2 }}>Loading Remote Component...</Typography>
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Normalizes styles and applies dark bg */}
      <BrowserRouter>
        {/* --- MUI Navigation Bar --- */}
        <AppBar position="static" color="default">
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, mr: 2 }}
              >
                MIPS Host App (PoC)
              </Typography>
              <Box>
                <Button
                  component={RouterLink}
                  to="/"
                  sx={{ color: "white" }}
                  startIcon={
                    <Badge badgeContent={cartItems.length} color="error">
                      <HomeIcon />
                    </Badge>
                  }
                >
                  Home
                </Button>
                <Button
                  component={RouterLink}
                  to="/products"
                  sx={{ color: "white" }}
                  startIcon={
                    <Badge badgeContent={cartItems.length} color="error">
                      <StorefrontIcon />
                    </Badge>
                  }
                >
                  Products
                </Button>
                <Button
                  component={RouterLink}
                  to="/cart"
                  sx={{ color: "white" }}
                  startIcon={
                    <Badge badgeContent={cartItems.length} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  }
                >
                  Cart
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* --- Main Content Area --- */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Using Paper for a contained look, with the green border */}
          <Paper
            elevation={3}
            sx={{
              border: "2px solid #28a745",
              minHeight: "60vh",
              overflow: "hidden", // Good for nested rounded corners
            }}
          >
            {/* A single Suspense for all routes */}
            <React.Suspense fallback={loadingFallback}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/products"
                  element={
                    <SafeComponent>
                      <RemoteProductPage onAddToCart={handleAddToCart} />
                    </SafeComponent>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <SafeComponent>
                      <RemoteShoppingCartPage
                        items={cartItems}
                        onRemoveFromCart={handleRemoveFromCart}
                      />
                    </SafeComponent>
                  }
                />
              </Routes>
            </React.Suspense>
          </Paper>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
