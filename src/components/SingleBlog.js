import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  styled,
  CircularProgress,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataContext } from "../context/DataProvider";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { URL } from "../constants/Data";

const SingleblogBox = styled(Box)`
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  min-height: 93vh;

  @media (max-width: 768px) {
    margin-top: 20px;
    min-height: 90vh;
  }
`;

const StyledCard = styled(Card)`
  margin: 50px 50px;
  width: 300px;
  height: 300px;
  position: relative;
`;

const StyledCardActions = styled(CardActions)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const SingleBlog = ({ blogs, setBlogs }) => {
  const [originalBlogs, setOriginalBlogs] = useState([]);

  const [searchParams] = useSearchParams();
  const params = searchParams.get("category");

  const { page, isLoading } = useContext(DataContext);

  const blogsArray = params ? originalBlogs : blogs;

  useEffect(() => {
    if (params) {
      const filteredBlogs = blogs.filter((b) => b.category === params);
      setOriginalBlogs(filteredBlogs);
    }
  }, [params, blogs]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${URL}/blog/delete-blog/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SingleblogBox>
      {isLoading ? (
        <CircularProgress />
      ) : blogsArray.length === 0 ? (
        <Typography variant="h5" color="error" textAlign="center">
          No Blogs Found
        </Typography>
      ) : (
        blogsArray.map((blog) => (
          <StyledCard sx={{ maxWidth: 345 }} key={blog._id}>
            <CardActionArea sx={{ marginBottom: "20px" }}>
              <CardMedia
                component="img"
                height="140"
                image={blog.image}
                alt="blog image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            {page === "my-blogs" ? (
              <StyledCardActions>
                <Link to={`/update-blog/${blog._id}`}>
                  <Button size="small" color="primary">
                    <ModeEditIcon />
                  </Button>
                </Link>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(blog._id)}
                >
                  <DeleteIcon />
                </Button>
              </StyledCardActions>
            ) : (
              ""
            )}
          </StyledCard>
        ))
      )}
    </SingleblogBox>
  );
};

export default SingleBlog;
