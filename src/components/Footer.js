import { Box, Button, Typography, styled } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { DataContext } from "../context/DataProvider";
import { useContext } from "react";
import { toast } from "react-hot-toast";

const FooterBox = styled(Box)`
  background: #2196f3;
  text-align: center;
  padding: 15px;

  @media (max-width: 768px) {
    width: 112%;
  }
`;

const MobileFooterOptions = styled("div")`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  alignitems: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Footer = () => {
  const { user, setAuthenticated } = useContext(DataContext);

  const handleLogout = () => {
    setAuthenticated(false);
    toast.success("Logout Successfully");
  };

  return (
    <FooterBox>
      <MobileFooterOptions>
        <div style={{ marginBottom: "10px" }}>
          <PersonIcon
            style={{
              border: "2px solid #fff",
              borderRadius: "50%",
            }}
          />
          <Typography textTransform={"uppercase"}>{user.username}</Typography>
        </div>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </MobileFooterOptions>

      <Typography>All Rights Reserved @ zshaklan</Typography>
    </FooterBox>
  );
};

export default Footer;
