import queryString from "query-string";
import { useEffect, useMemo, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { SORT_OPTIONS } from "../constants/general";
import { productService } from "../services/productService";
import useQuery from "./useQuery";
import useDebounce from "./useDebounce";
import useMutation from "./useMutation";

const limit = 9;

const useProductPage = () => {
    // Initial Hooks
    const { search } = useLocation();

    const queryObject = queryString.parse(search);

    const [_, setSearchParams] = useSearchParams();

    // API Products
    const {
        data: productsData,
        loading: productsLoading,
        error: productsError,
        execute: fetchProducts,
    } = useMutation((query) =>
        productService.getProducts(query || `?limit=${limit}`)
    );

    const products = productsData?.products || [];
    const pagination = productsData?.pagination || {};

    const {
        data: categoriesData,
        loading: categoriesLoading,
        error: categoriesError,
    } = useQuery(productService.getCategories);
    const categories = categoriesData?.products || [];

    useEffect(() => {
        fetchProducts?.(search);
    }, [search]);

    //General Funtions
    const updateQueryString = (queryObject) => {
        const newQueryString = queryString.stringify({
            ...queryObject,
            limit,
        });
        setSearchParams(new URLSearchParams(newQueryString));
    };

    //toolbox Props
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

    // Products Props
    const productListLoading = useDebounce(productsLoading, 2000);
    const productListProps = {
        products,
        isLoading: productListLoading,
        isError: !!productsError,
    };

    //Pagination Props
    const onPagiChange = (pageNumber) => {
        updateQueryString({ ...queryObject, page: pageNumber });
    };
    const paginationProps = {
        onPagiChange,
        limit: Number(pagination.limit || 0),
        total: Number(pagination.total || 0),
        page: Number(pagination.page || queryObject.page || 1),
    };

    // Filter Props

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

    const handleFilterPriceChange = (value) => {
        const vlaueChage = value;
        updateQueryString({
            ...queryObject,
            minPrice: vlaueChage[0],
            maxPrice: vlaueChage[1],
            page: 1,
        });
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
            queryObject.maxPrice || 7000,
        ],
        onCateFilterChange,
        handleFilterPriceChange,
    };

    return {
        productListProps,
        filterProps,
        paginationProps,
        toolboxProps,
    };
};

export default useProductPage;
