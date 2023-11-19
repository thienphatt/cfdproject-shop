import React, { useEffect } from "react";
import useHomePage from "../../hook/useHomePage";
import BrandSection from "./BrandSection";
import DealSection from "./DealSection";
import FeaturedSection from "./FeaturedSection";
import GetDealSection from "./GetDealSection";
import HotProductSection from "./HotProductSection ";
import IntrosSection from "./IntrosSection";
import ServiceSection from "./ServiceSection";

const HomePage = () => {
    const {
        introProps,
        hotProductProps,
        hotDealProps,
        brandProps,
        featuredProps,
        serviceProps,
        getDealProps,
    } = useHomePage();

    console.log("check1");

    return (
        <main className="main">
            <IntrosSection {...introProps} />
            <HotProductSection {...hotProductProps} />
            <div className="mb-7 mb-lg-11" />
            <DealSection {...hotDealProps} />
            <BrandSection {...brandProps} />
            <div className="container">
                <hr className="mt-3 mb-6" />
            </div>
            <div className="container">
                <hr className="mt-5 mb-6" />
            </div>
            <FeaturedSection {...featuredProps} />
            <div className="container">
                <hr className="mt-5 mb-0" />
            </div>
            <ServiceSection {...serviceProps} />
            <GetDealSection {...getDealProps} />
        </main>
    );
};

export default HomePage;
