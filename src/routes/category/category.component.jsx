import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import { selectCategoriesMap } from "../../store/categories/categories.selector";

import { CategoryContainer, CategoryTitle } from "./category.styles";

// URL parameter going to be the thing that tells to category component what data to get
const Category = () => {
  // allow to get the category value as an object
  // take the category name from the URL parameter
  const { category } = useParams();

  //console.log("render/re-rendering category component");
  // pulls off the categoriesMap from useSelector that will transform the categories array
  const categoriesMap = useSelector(selectCategoriesMap);
  // get the actual products from this category only when category value change or categoriesMap changes
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    //console.log("effect fired calling setProducts");
    // update the products an array with the name category
    setProducts(categoriesMap[category]);
    // whenever category value change or categoriesMap changes
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {
          // if products is undefined then don't render it only render products.map if products have a value
          products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
