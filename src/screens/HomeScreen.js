import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Typography,
  Container,
  Button,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  makeStyles,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Rating from "../components/Rating";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
    width: 200,
  },
});
function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      {category && <Typography variant="h2">{category}</Typography>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <TextField
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button color="pre-primary" variant="contained" type="submit">
              Search
            </Button>
          </form>
        </li>
        <li>
          Sort By
          <Select
            name="sortOrder"
            onChange={sortHandler}
            inputProps={{
              name: "age",
              id: "age-native-simple",
            }}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="lowest">Lowest</MenuItem>
            <MenuItem value="highest">Highest</MenuItem>
          </Select>
        </li>
      </ul>
      <div className="container py-5">
  <header className="text-center mb-5">
    <h1 className="display-4 font-weight-bold">MediCare</h1>
    <p className="font-italic text-muted mb-0">An Easy way to purchase medicine Online.</p>
    </header>
</div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
         <ul className="products">
          {products.map((product) => (
           
           <Card key={product._id}>
              <CardActionArea>
                <img
                  src={product.image}
                  title={product.name}
                  width="150"
                  height="200"

                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h2">
                    {product.name}
                  </Typography>

                  <Typography gutterBottom variant="h5" component="h5">
                    {product.brand}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h5">
                    Rs.{product.price}
                  </Typography>
                  <Rating
                    value={product.rating}
                    text={product.numReviews + " reviews"}
                  />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <Link to={"/product/" + product._id}>{product.name}</Link>
                </Button>
              </CardActions>
            </Card>
          ))}
        </ul>
      )}
      
    </Container>
  );
}
export default HomeScreen;
