import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardMedia, CardContent, Typography, Grid, CircularProgress, Container, Checkbox, Pagination } from "@mui/material";
import { fetchProducts } from "../../redux/slices/productSlice";
import Button from '@mui/joy/Button';
import './home.css'
import { Favorite, FavoriteBorder, Label } from "@mui/icons-material";
import SearchBox from "./searchbox";
import PaginationRounded from "./pagenation";

const Home = () => {
  const dispatch = useDispatch();
  const {  productData, loading, error } = useSelector((state) => state.products);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Show 8 products per page

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }
  const totalPages = Math.ceil(productData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = productData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Container sx={{ mt: 3 }}>
        <div className="topadd_box">
          <h1> Products</h1>
          <p>E-commerce (short for electronic commerce) refers to the buying and selling of goods and services over the internet. It includes various types of online transactions, such as online shopping, electronic payments, internet banking, and digital marketplaces.</p>
         </div>
        <SearchBox />
        {currentProducts.length !==0 ?
        <Grid className="fulbox" container spacing={3}>
          {currentProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="productbox" sx={{ maxWidth: 300, mx: "auto" }}>
                <Checkbox className="favcheckbox" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                <CardMedia
                  className="imgbox"
                  component="img"
                  height="140"
                  image={product.thumbnail || "https://via.placeholder.com/140"}
                  alt={product.title}
                />
                <CardContent className="textbox">
                  <Typography className="boxheading" variant="h6" gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography className="boxdescription" variant="body2">
                    {product.description}
                  </Typography>
                  <Typography className="boxprice" variant="h6">
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>:<h1 style={{textAlign:"center"}}>No Produts Found ..</h1>}

      
        <Pagination className="pagenation"
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          sx={{ display: "flex", justifyContent: "center", mt: 3 }}
        />
      </Container>
    </>
);
};

export default Home;

