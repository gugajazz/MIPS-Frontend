import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

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

// 2. The props interface is unchanged
interface ShoppingCartPageProps {
  items: CartItem[]; // Expects an array of CartItem
  onRemoveFromCart: (instanceId: string) => void; // Expects an instanceId
}

// --- COMPONENT ---

const ShoppingCartPage = ({
  items = [],
  onRemoveFromCart = () => {},
}: ShoppingCartPageProps) => {
  // 3. Update total price calculation
  const totalPrice = items.reduce((sum, item) => sum + item.product.price, 0);

  return (
    // Replaced main <div> with MUI Box and `style` with `sx` prop
    <Box
      sx={{
        p: "1.5rem",
        border: "2px dashed",
        borderColor: "error.main", // Use theme color
        borderRadius: "8px",
        bgcolor: "#1f1f1f", // Your custom background
        color: "#f1f1f1", // Your custom text color
        maxWidth: "800px",
        my: "1rem", // Replaces margin: "1rem 0"
        textAlign: "left",
      }}
    >
      {/* Replaced <h2> with Typography */}
      <Typography
        variant="h4" // Good semantic equivalent for <h2>
        component="h2" // Keeps the HTML tag
        sx={{
          color: "error.main", // Use theme color
          mt: 0,
          fontWeight: "bold", // Headers are bold by default, but explicit
        }}
      >
        🛒 Shopping Cart (Loaded from Remote)
      </Typography>

      {/* Replaced <p> with Typography */}
      <Typography variant="body1" sx={{ mb: 2 }}>
        Lists items from the host and calls `onRemoveFromCart`.
      </Typography>

      <Box>
        {items.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          // Use MUI List for semantic list
          <List sx={{ padding: 0 }}>
            {/* 4. Update the .map() to use the new structure */}
            {items.map((item) => (
              // Use ListItem for semantic item
              <ListItem
                key={item.instanceId} // Use unique key
                sx={{
                  p: "1rem",
                  bgcolor: "#2a2a2a", // Your custom item background
                  borderRadius: "5px",
                  mb: "1rem",
                }}
                // `secondaryAction` is the robust MUI way to add a button/control
                // to the end of a list item.
                secondaryAction={
                  <Button
                    variant="contained" // Gives background color
                    color="error" // Uses the red from the theme
                    onClick={() => onRemoveFromCart(item.instanceId)} // Pass instanceId
                    sx={{
                      fontWeight: "bold", // Your custom style
                    }}
                  >
                    Remove
                  </Button>
                }
              >
                {/* Using Box and Typography here instead of ListItemText
                  to precisely match your original h4/p margin styles.
                */}
                <Box>
                  <Typography
                    variant="h6"
                    component="h4"
                    sx={{ margin: 0, color: "inherit" }} // Inherit parent's #f1f1f1
                  >
                    {item.product.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ margin: "5px 0 0 0", color: "inherit" }} // Inherit
                  >
                    ${item.product.price.toFixed(2)}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {items.length > 0 && (
        <>
          {/* Replaced <hr> with MUI Divider */}
          <Divider sx={{ borderColor: "#444", my: 2 }} />{" "}
          {/* Lighten divider for dark bg */}
          {/* Replaced <h3> with Typography */}
          <Typography
            variant="h5"
            component="h3"
            sx={{ textAlign: "right", fontWeight: "bold" }}
          >
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ShoppingCartPage;
