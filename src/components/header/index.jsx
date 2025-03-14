import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, TextField } from "@mui/material";
import { Search, ShoppingBasket } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchProducts } from "../../redux/slices/productSlice";
import './index.css'

const AppHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const { categorieData, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (searchTerm.trim()) {
      const delayDebounceFn = setTimeout(() => {
        dispatch(fetchProducts({ search: searchTerm.trim() }));
      }, 500); // API call after 500ms of inactivity

      return () => clearTimeout(delayDebounceFn); // Cleanup timeout on every key press
    }
    else{
      dispatch(fetchProducts())
    }
  }, [searchTerm, dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); 
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", padding: "10px 20px" }}>
      <Toolbar className="headfullbox" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Typography className="headleft" variant="h6" sx={{ color: "#FF0080", fontWeight: "bold" }}>
          MoBooM
        </Typography>

        {/* Search Bar */}
        <Box className="headcenter" sx={{ display: "flex", alignItems: "center", width: 300 }}>
          <TextField className="headsearchbar"
            fullWidth
            variant="outlined"
            label="Search products..."
            value={searchTerm}
            onChange={handleSearchChange} // Direct API call with debounce
            InputProps={{
              endAdornment: (
                <IconButton type="button" >
                  <Search />
                </IconButton>
              ),
            }}
          />
        </Box>

        {/* Navigation */}
        <Box className="headoption" sx={{ display: "flex", alignItems: "center" }}>
          <Typography className="head_p" sx={{ color: "black", cursor: "pointer" }}>Store</Typography>
          <Typography className="head_p" sx={{ color: "black", cursor: "pointer" }}>Account</Typography>
          <Typography className="head_p" sx={{ color: "black", cursor: "pointer" }}>{searchTerm}</Typography>
          <IconButton>
            <ShoppingBasket sx={{ color: "black" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
