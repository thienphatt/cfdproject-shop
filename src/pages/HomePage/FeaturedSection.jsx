import React, { useEffect } from "react";
import { owlCarousels } from "../../utils/owlCarousels";
import ProductCard from "../../components/ProductCard";

const FeaturedSection = ({
  categories,
  featureProducts,
  selectedCateSlug,
  handleSelectCate,
}) => {
  useEffect(() => {
    owlCarousels();
  }, [selectedCateSlug]);

  const _onSelectCate = (e, slug) => {
    e.preventDefault();
    e.stopPropagation();
    handleSelectCate?.("");
    setTimeout(() => {
      handleSelectCate?.(slug);
    }, 200);
  };

  return (
    <div className="container top" style={{ height: 505 }}>
      <div className="heading heading-flex mb-3">
        <div className="heading-left">
          <h2 className="title">Featured Products</h2>
        </div>
        <div className="heading-right">
          <ul
            className="nav nav-pills nav-border-anim justify-content-center"
            role="tablist"
          >
            {categories?.map((category, i) => {
              const { name, slug } = category || {};
              return (
                <li key={i} className="nav-item">
                  <a
                    className={`nav-link ${
                      selectedCateSlug === slug ? "active" : ""
                    }`}
                    href="#top-all-tab"
                    onClick={(e) => _onSelectCate(e, slug)}
                  >
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="tab-content tab-content-carousel just-action-icons-sm">
        <div
          className={`tab-pane p-0 fade ${
            featureProducts?.length > 0 ? "show active" : ""
          }`}
          id="top-all-tab"
          role="tabpanel"
          aria-labelledby="top-all-link"
        >
          {featureProducts?.length > 0 && (
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                    "nav": true, 
                    "dots": false,
                    "margin": 20,
                    "loop": false,
                    "responsive": {
                        "0": {
                            "items":2
                        },
                        "480": {
                            "items":2
                        },
                        "992": {
                            "items":3
                        },
                        "1200": {
                            "items":4
                        }
                    }
                }'
            >
              {featureProducts?.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
