import { useSelector } from "react-redux";

const useDashboardPage = () => {
    const { cartInfo, cartLoading } = useSelector((state) => state.cart);

    const accountProps = { cartInfo };

    return { ...accountProps };
};

export default useDashboardPage;
