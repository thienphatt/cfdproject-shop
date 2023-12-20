import useQuery from "../../hook/useQuery";
import { productService } from "../../services/productService";

const useMenuMobile = () => {
    const { data: cateloriesData } = useQuery(() =>
        productService.getCategories()
    );

    const catelories = cateloriesData?.products || {};
    const menuMoblieProps = { catelories };

    return {
        menuMoblieProps,
    };
};

export default useMenuMobile;
