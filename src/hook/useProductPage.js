import { productService } from "../services/productService";
import useQuery from "./useQuery";

const litmit = 6;

const useProductPage = () => {
  // get API
  const {
    data: producstData,
    loading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery((query) =>
    productService.getProducts(query || `?limit=${litmit}`)
  );

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getCategories);
  const categories = categoriesData?.products || [];

  const products = producstData?.products || [];
  const pagination = producstData?.pagination || {};

  // Products
  const productListProps = {
    products,
    productsLoading,
    productsError,
  };
  //Pagination

  const paginationProps = {
    pagination,
    limit: pagination?.limit,
    total: pagination?.total,
  };

  //categories
  const categorieProps = {
    categories,
    categoriesLoading,
    categoriesError,
    producstData,
  };

  return { productListProps, categorieProps, paginationProps };
};

export default useProductPage;
