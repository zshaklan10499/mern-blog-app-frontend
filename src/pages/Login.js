import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { DataContext } from "../context/DataProvider";
import { URL } from "../constants/Data";

const StyledBox = styled(Box)`
  width: 350px;
  margin-top: 30px;
  box-shadow: 0 0 10px #000;
  border-radius: 10px;
`;
const StyledInput = styled(TextField)`
  margin: 10px;
`;
const StyledButton = styled(Button)`
  margin: 10px;
`;

const loginInitial = {
  email: "",
  password: "",
};

const registerInitial = {
  username: "",
  email: "",
  password: "",
};

const Login = () => {
  const [account, setAccount] = useState("login");
  const [login, setLogin] = useState(loginInitial);
  const [register, setRegister] = useState(registerInitial);

  const navigate = useNavigate();
  const { setUser, setAuthenticated } = useContext(DataContext);

  const handleAccount = () => {
    account === "login" ? setAccount("register") : setAccount("login");
  };

  const handleRegisterInput = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${URL}/user/register`, {
        username: register.username,
        email: register.email,
        password: register.password,
      });

      if (data?.success) {
        setRegister(registerInitial);
        setAccount("login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginInput = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${URL}/user/login`, {
        email: login.email,
        password: login.password,
      });

      if (data?.success) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        setAuthenticated(true);
        setUser({ username: data.username, userId: data.userId });

        toast.success("Login Successfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {account === "login" ? (
        <StyledBox>
          <Typography variant="h3" textAlign={"center"}>
            Login
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
              placeholder="enter email"
              name="email"
              value={login.email}
              onChange={handleLoginInput}
            />
            <StyledInput
              placeholder="enter password"
              name="password"
              value={login.password}
              onChange={handleLoginInput}
            />
            <StyledButton variant="contained" onClick={loginUser}>
              login
            </StyledButton>
            <Typography textAlign={"center"}>OR</Typography>
            <Button onClick={handleAccount}>
              Create a new account ? Register
            </Button>
          </form>
        </StyledBox>
      ) : (
        <StyledBox>
          <Typography variant="h3" textAlign={"center"}>
            Register
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
              placeholder="enter username"
              name="username"
              value={register.username}
              onChange={handleRegisterInput}
            />
            <StyledInput
              placeholder="enter email"
              name="email"
              value={register.email}
              onChange={handleRegisterInput}
            />
            <StyledInput
              placeholder="enter password"
              name="password"
              value={register.password}
              onChange={handleRegisterInput}
            />
            <StyledButton variant="contained" onClick={registerUser}>
              Register
            </StyledButton>
            <Typography textAlign={"center"}>OR</Typography>
            <Button onClick={handleAccount}>
              Already have an account ? Login
            </Button>
          </form>
        </StyledBox>
      )}
    </div>
  );
};

export default Login;
