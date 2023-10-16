import { useState } from "react";
import { pageService } from "../services/pageServices";
import { productService } from "../services/productService";
import useQuery from "./useQuery";

const useHomePage = () => {
  // API Handling

  // API products
  const { data: productsData } = useQuery(productService.getProducts);
  const products = productsData?.products || [];

  //API Brands Section
  const { data: homeData } = useQuery(() =>
    pageService.getPageDataByName("home")
  );

  // get  Brands data from pageService
  const brands = homeData?.data?.brands || [];

  // get  Brands data from pageService
  const services = homeData?.data?.information || [];

  //API categories
  const { data: categoriesData } = useQuery(productService.getCategories);
  const categories = categoriesData?.products || [];

  // Intro Section
  const featuredProducts =
    products?.filter((product) => product.featured) || [];
  const introProducts = featuredProducts.slice(0, 3);
  const introProps = {
    introProducts,
  };

  // HotProductSection
  const onSaleProducts = products?.filter((product) => product.onSale) || [];
  const topRatedProducts =
    products?.filter((product) => product.topRated) || [];

  const hotProductProps = {
    featuredProducts,
    onSaleProducts,
    topRatedProducts,
  };

  // DealProductSection
  const dealProduction = products?.filter((products) => products.discount > 0);
  const hotDealProps = {
    dealProduction,
  };

  // Brands Section
  const brandProps = {
    brands,
  };

  // Featured Section
  const [selectedCateSlug, setSelectedCateSlug] = useState("all");
  const featureProducts =
    selectedCateSlug === "all"
      ? [...(products || [])]
      : products?.filter(
          (product) => product?.category?.slug === selectedCateSlug
        );
  const featuredProps = {
    categories: [{ name: "All", slug: "all" }, ...categories],
    featureProducts,
    selectedCateSlug,
    handleSelectCate: (slug) => setSelectedCateSlug(slug),
  };

  // services Section

  const serviceProps = {
    services,
  };

  return {
    introProps,
    hotProductProps,
    hotDealProps,
    brandProps,
    featuredProps,
    serviceProps,
  };
};

export default useHomePage;
