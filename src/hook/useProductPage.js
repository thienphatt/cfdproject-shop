import { productService } from "../services/productService";
import useQuery from "./useQuery";

const litmit = 6;

const useProductPage = () => {
  // get API
  const { data: productData } = useQuery((query) =>
    productService.getProducts(query || `?limit=${litmit}`)
  );

  const { data: categoriesData } = useQuery(productService.getCategories);
  const categories = categoriesData?.products || [];

  console.log("categories", categories);

  const products = productData?.products || [];
  const pagination = productData?.pagination || {};

  // Products
  const productProps = {
    products,
    pagination,
  };

  //

  return { productProps };
};

export default useProductPage;
