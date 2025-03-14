import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import "./home.css";
import { fetchProducts } from "../../redux/slices/productSlice";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { categorieData, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(1000);
      setLoading(false);
      setOptions([...categorieData]); // Populate options on open
    })();
  };

  const handleChange = (event, newValue) => {
   
      event?.preventDefault(); // Prevent form submission
      dispatch(fetchProducts({category:newValue?.slug})); // Dispatch action to fetch products based on category
  
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={handleOpen}
      onClose={() => setOpen(false)}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option?.slug === value?.slug}
      getOptionLabel={(option) => option?.name || ""}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
        className="searchouter"
          {...params}
          label="Select Category"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
/>
  );
}
