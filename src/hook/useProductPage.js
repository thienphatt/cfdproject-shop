import queryString from "query-string";
import { useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { SORT_OPTIONS } from "../constants/general";
import { productService } from "../services/productService";
import useQuery from "./useQuery";
import useMutation from "./useMutation";

const litmit = 6;

const useProductPage = () => {
  const { search } = useLocation();
  const queryObject = queryString.parse(search);

  const [_, setSearchParams] = useSearchParams();

  // get API
  // API Products
  // const {
  //   data: producstData,
  //   loading: productsLoading,
  //   error: productsError,
  //   refetch: fetchData,
  // } = useQuery((query) =>
  //   productService.getProducts(query || `?limit=${litmit}`)
  // );
  const {
    data: producstData,
    loading: productsLoading,
    error: productsError,
    execute: fetchProducts,
  } = useMutation((query) =>
    productService.getProducts(query || `?limit=${litmit}`)
  );

  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: litmit,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };
  const products = producstData?.products || [];
  const pagination = producstData?.pagination || {};

  //API category
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getCategories);

  const categories = categoriesData?.products || [];
  // Products props
  const productListProps = {
    products,
    isLoading: productsLoading,
    isError: productsError,
  };

  useEffect(() => {
    fetchProducts?.(search);
  }, [search]);

  //Pagination
  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };

  const paginationProps = {
    onPagiChange,
    limit: Number(pagination?.limit || 0),
    total: Number(pagination?.total || 0),
    page: Number(pagination?.page || queryObject.page || 1),
  };

  //toolbox this.props.

  const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OPTIONS).find(
        (option) =>
          option.queryObject.orderBy === queryObject.orderBy &&
          option.queryObject.order === queryObject.order
      )?.value || SORT_OPTIONS.popularity.value
    );
  }, [queryObject]);

  const onSortChange = (sortType) => {
    const sortQueryObject = SORT_OPTIONS[sortType].queryObject;
    if (sortQueryObject) {
      updateQueryString({
        ...queryObject,
        ...sortQueryObject,
        page: 1,
      });
    }
  };

  const toolboxProps = {
    showNumb: products?.length || 0,
    totalNumb: pagination?.total || 0,
    activeSort,
    onSortChange,
  };

  //filter props

  const onCateFilterChange = (cateId, isChecked) => {
    let newCategory = Array.isArray(queryObject.category)
      ? [...queryObject.category, cateId]
      : [queryObject.category, cateId];

    if (!isChecked) {
      newCategory = newCategory.filter((category) => category !== cateId);
    }

    if (cateId === "") {
      newCategory = [];
    }

    updateQueryString({
      ...queryObject,
      category: newCategory,
      page: 1,
    });
  };

  const handleFilterChange = (value) => {
    if (value?.length === 2) {
      updateQueryString({
        ...queryObject,
        minPrice: value[0],
        maxPrice: value[1],
        page: 1,
      });
    }
  };

  const filterProps = {
    categories: categories || [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    activeCategory: Array.isArray(queryObject.category)
      ? queryObject.category
      : [queryObject.category],
    currentPriceRange: [
      queryObject.minPrice || 0,
      queryObject.maxPrice || 1000,
    ],
    onCateFilterChange,
    handleFilterChange,
  };

  return {
    productListProps,
    filterProps,
    paginationProps,
    toolboxProps,
  };
};

export default useProductPage;
