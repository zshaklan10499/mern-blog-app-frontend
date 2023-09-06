import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CreateBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 93vh;

  @media (max-width: 768px) {
    min-height: 90vh;
  }
`;

const StyledBox = styled(Box)`
  width: 500px;
  margin-top: 50px;
  margin-left: 40px;
  box-shadow: 0 0 10px #000;
  border-radius: 10px;
  padding: 10px;

  @media (max-width: 768px) {
    padding: 0;
    width: 320px;
  }
`;
const StyledInput = styled(TextField)`
  margin: 10px;
`;
const StyledButton = styled(Button)`
  margin: 10px;
`;

const createBlogInitial = {
  title: "",
  category: "",
  image: "",
  description: "",
};

const CreateBlogs = () => {
  const [createBlog, setCreateBlog] = useState(createBlogInitial);
  // const [blog, setBlog] = useState({});

  const navigate = useNavigate();
  const { user } = useContext(DataContext);
  const updateId = useParams().id;

  useEffect(() => {
    const getBlog = async () => {
      try {
        if (updateId) {
          const { data } = await axios.get(`/blog/getsingle-blog/${updateId}`);
          setCreateBlog({
            title: data.blog.title,
            category: data.blog.category,
            image: data.blog.image,
            description: data.blog.description,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBlog();
  }, [updateId]);

  const handleCreateBlogInput = (e) => {
    setCreateBlog({
      ...createBlog,
      [e.target.name]: e.target.value,
    });
  };

  // Creating Blog
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      createBlog.userId = user.userId;
      const { data } = await axios.post("/blog/create-blog", createBlog);
      toast.success(data.msg);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  // Updating Blog
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `/blog/update-blog/${updateId}`,
        createBlog
      );
      toast.success(data.msg);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CreateBox>
      <StyledBox>
        <Typography variant="h3" textAlign={"center"}>
          {updateId ? "Update Blog" : "Create Blog"}
        </Typography>
        <form
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <StyledInput
            placeholder="enter title"
            name="title"
            value={createBlog.title}
            onChange={handleCreateBlogInput}
          />
          <StyledInput
            placeholder="enter category"
            name="category"
            value={createBlog.category}
            onChange={handleCreateBlogInput}
          />
          <StyledInput
            placeholder="enter image url"
            name="image"
            value={createBlog.image}
            onChange={handleCreateBlogInput}
          />
          <StyledInput
            placeholder="enter description"
            name="description"
            value={createBlog.description}
            onChange={handleCreateBlogInput}
          />
          {updateId ? (
            <StyledButton variant="contained" onClick={handleUpdate}>
              Update
            </StyledButton>
          ) : (
            <StyledButton variant="contained" onClick={handleCreate}>
              Create
            </StyledButton>
          )}
        </form>
      </StyledBox>
    </CreateBox>
  );
};

export default CreateBlogs;
