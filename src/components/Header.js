import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

const HeaderBox = styled(Box)`
  width: 100%;
  position: Fixed;
  top: 0;
  z-index: 2;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 15px;
  cursor: pointer;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MobileMenu = styled("div")`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const DesktopMenu = styled("div")`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const StyledMenuIcon = styled("div")`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DesktopHeaderOptions = styled("div")`
  width: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Header = () => {
  const { setAuthenticated, user } = useContext(DataContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuthenticated(false);
    toast.success("Logout Successfully");
  };

  return (
    <HeaderBox>
      <AppBar position="static">
        <StyledToolbar>
          <StyledMenuIcon>
            <MobileMenu>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <MenuIcon />
              </IconButton>
            </MobileMenu>
            <Typography variant="h6" component="div">
              Blog Application
            </Typography>
          </StyledMenuIcon>

          <DesktopMenu className="desktop-menu">
            <StyledLink to="/blogs">Blogs</StyledLink>
            <StyledLink to="/my-blogs">My Blogs</StyledLink>
            <StyledLink to="/create-blogs">Create Blogs</StyledLink>
          </DesktopMenu>

          <DesktopHeaderOptions>
            <div
              style={{
                width: "100px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <PersonIcon />
              <Typography textTransform={"uppercase"}>
                {user.username}
              </Typography>
            </div>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </DesktopHeaderOptions>
        </StyledToolbar>

        {menuOpen && (
          <MobileMenu className="mobile-menu">
            <div style={{ margin: "0 0 10px 30px" }}>
              <StyledLink to="/blogs">Blogs</StyledLink>
              <StyledLink to="/my-blogs">My Blogs</StyledLink>
              <StyledLink to="/create-blogs">Create Blogs</StyledLink>
            </div>
          </MobileMenu>
        )}
      </AppBar>
    </HeaderBox>
  );
};

export default Header;
