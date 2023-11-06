import React, { useState } from "react";
import Review from "../../components/Review";

const TABS = {
    desc: "description",
    shipping: "shipping&returns",
    review: "review",
};

const ProductDetailTab = ({ reviews, shipping, description }) => {
    const [activeTab, setActiveTab] = useState(TABS.desc);

    const _onTabChange = (e, tab) => {
        e?.preventDefault();
        setActiveTab(tab);
    };
    return (
        <div className="product-details-tab">
            <ul className="nav nav-pills justify-content-center" role="tablist">
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            activeTab === TABS.desc ? "active" : ""
                        }`}
                        href="#product-desc-tab"
                        onClick={(e) => _onTabChange(e, TABS.desc)}
                        // id="product-desc-link"
                        // data-toggle="tab"
                        // role="tab"
                        // aria-controls="product-desc-tab"
                        // aria-selected="true"
                    >
                        Description
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            activeTab === TABS.shipping ? "active" : ""
                        }`}
                        href="#product-shipping-tab"
                        onClick={(e) => _onTabChange(e, TABS.shipping)}
                        // id="product-shipping-link"
                        // data-toggle="tab"
                        // role="tab"
                        // aria-controls="product-shipping-tab"
                        // aria-selected="false"
                    >
                        Shipping &amp; Returns
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            activeTab === TABS.review ? "active" : ""
                        }`}
                        href="#product-review-tab"
                        onClick={(e) => _onTabChange(e, TABS.review)}
                        // id="product-review-link"
                        // data-toggle="tab"
                        // role="tab"
                        // aria-controls="product-review-tab"
                        // aria-selected="false"
                    >
                        Reviews ({reviews?.length || 0})
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                {activeTab === TABS.desc && (
                    <div
                        className="tab-pane fade show active"
                        id="product-desc-tab"
                        role="tabpanel"
                        aria-labelledby="product-desc-link"
                    >
                        <div className="product-desc-content">
                            <h3>Product Information</h3>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            ></div>
                        </div>
                    </div>
                )}
                {activeTab === TABS.shipping && (
                    <div
                        className="tab-pane fade show active"
                        id="product-shipping-tab"
                        role="tabpanel"
                        aria-labelledby="product-shipping-link"
                    >
                        <div className="product-desc-content">
                            {/* <h3>Delivery &amp; returns</h3> */}
                            <div
                                dangerouslySetInnerHTML={{ __html: shipping }}
                            ></div>
                        </div>
                    </div>
                )}
                {activeTab === TABS.review && (
                    <div
                        className="tab-pane fade show active"
                        id="product-review-tab"
                        role="tabpanel"
                        aria-labelledby="product-review-link"
                    >
                        <div className="reviews">
                            <h3 style={{ fontWeight: 400 }}>
                                (
                                {reviews?.length
                                    ? `Reviews ${reviews.length}`
                                    : "There is no any reviews"}
                                )
                            </h3>
                            <Review reviews={reviews} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailTab;
