import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, TextField } from "@mui/material";
import { Search, ShoppingBasket } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import './index.css'

const AppHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm?.trim()) {
      const delayDebounceFn = setTimeout(() => {
        dispatch(fetchProducts({ search: searchTerm.trim() }));
      }, 500); 
      return () => clearTimeout(delayDebounceFn); 
    }

    else{
      dispatch(fetchProducts())
    }
  }, [searchTerm, dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event); 
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", padding: "10px 20px" }}>
      <Toolbar className="headfullbox" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography className="headleft" variant="h6" sx={{ color: "#FF0080", fontWeight: "bold" }}>
          <b><a style={{color:"#ff0ba3"}}>M</a><a style={{color:"#000"}}>oBoo</a><a style={{color:"#ff0ba3"}}>M</a></b>
        </Typography>

        <Box className="headcenter" sx={{ display: "flex", alignItems: "center", width: 300 }}>
          <TextField className="headsearchbar"
            fullWidth
            variant="outlined"
            label="What do you want to buy today?"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton type="button" >
                  <Search />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box className="headoption" sx={{ display: "flex", alignItems: "center" }}>
          <Typography className="head_p" sx={{ color: "#6b7280", cursor: "pointer" }}>Store</Typography>
          <Typography className="head_p" sx={{ color: "#6b7280", cursor: "pointer" }}>Account</Typography>
          <Typography className="head_p" sx={{ color: "#6b7280", cursor: "pointer" }}>Wish List</Typography>
          <IconButton>
            <ShoppingBasket sx={{ color: "#6b7280" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
