import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/categories.selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  // CategoriesPreview should be properly selectCategoriesMap
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <>
      {/* allow to pass this object, and that returns an array of the keys */}
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
