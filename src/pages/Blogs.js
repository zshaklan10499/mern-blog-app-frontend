import { useState, useEffect, useContext } from "react";
import { Box, Grid } from "@mui/material";
import axios from "axios";

// component
import Filters from "../components/Filters";
import SingleBlog from "../components/SingleBlog";
import { DataContext } from "../context/DataProvider";
import { URL } from "../constants/Data";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const { setPage, setIsLoading } = useContext(DataContext);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${URL}/blog/getall-blog`);
        setBlogs(data.blogs);
        setPage("blogs");
        setIsLoading(false);
      } catch (error) {
        console.log(`Error in fetching blogs ${error}`);
      }
    };

    getAllBlogs();
  }, [setPage, setIsLoading]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Filters />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          <SingleBlog blogs={blogs} setBlogs={setBlogs} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Blogs;
