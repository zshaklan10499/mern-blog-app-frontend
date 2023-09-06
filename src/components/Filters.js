import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

// components
import { filters } from "../constants/Data";
import { DataContext } from "../context/DataProvider";

const StyledFilter = styled(Box)`
  margin-top: 50px;

  @media (max-width: 768px) {
    margin-top: 100px;
  }
`;

const StyledTable = styled(Table)`
  border: 2px solid rgba(224, 224, 224, 1);

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledButton = styled(Button)`
  margin: 10px 40px;
`;

const MobileFilterSelect = styled(Box)`
  margin: 20px 40px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Filters = () => {
  const [filter, setFilter] = useState("");
  const { page } = useContext(DataContext);

  let queryOrigin;

  page === "blogs" ? (queryOrigin = "blogs") : (queryOrigin = "my-blogs");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClearFilter = () => {
    setFilter("");
  };

  return (
    <StyledFilter>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5" textAlign={"center"}>
                Filters
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filters.map((filter) => {
            return (
              <TableRow key={filter.id}>
                <TableCell>
                  <StyledLink to={`/${queryOrigin}/?category=${filter.type}`}>
                    {filter.type}
                  </StyledLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>

      <MobileFilterSelect sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select A Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Select A Filter"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {filters.map((filter) => (
              <MenuItem key={filter.id} value={filter.type}>
                <Link to={`/${queryOrigin}/?category=${filter.type}`}>
                  {filter.type}
                </Link>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </MobileFilterSelect>

      <Link to={`/${page}`}>
        <StyledButton variant="contained" onClick={handleClearFilter}>
          Clear Filters
        </StyledButton>
      </Link>
    </StyledFilter>
  );
};

export default Filters;
