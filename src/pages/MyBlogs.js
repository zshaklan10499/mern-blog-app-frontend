import { Box, Grid } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

// component
import Filters from "../components/Filters";
import SingleBlog from "../components/SingleBlog";
import { DataContext } from "../context/DataProvider";
import { URL } from "../constants/Data";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const { user, setPage, setIsLoading } = useContext(DataContext);
  const userId = user.userId;

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${URL}/blog/getuser-blog/${userId}`);
        setBlogs(data.user.blogs);
        setPage("my-blogs");
        setIsLoading(false);
      } catch (error) {
        console.log(`Error in fetching blogs ${error}`);
      }
    };

    getAllBlogs();
  }, [userId, setPage, setIsLoading]);
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

export default MyBlogs;
