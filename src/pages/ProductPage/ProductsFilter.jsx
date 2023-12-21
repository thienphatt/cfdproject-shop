import { Skeleton } from "antd";
import React, { useEffect, useRef } from "react";
import CheckBox from "../../components/CheckBox";
import useDebounce from "../../hook/useDebounce";
import PriceFilter from "./PriceFilter";

const ProductsFilter = ({
    categories,
    isLoading,
    activeCategory,
    onCateFilterChange,
    handleFilterPriceChange,
    currentPriceRange,
    _checkValue,
}) => {
    const myPriceFilterTimeout = useRef();
    useEffect(() => {
        var slider = document.getElementById("price-slider");
        var priceLabel = document.getElementById("price-value");

        // Cập nhật giá tiền khi thanh trượt thay đổi
        slider.addEventListener("input", function () {
            priceLabel.textContent = slider.value;
        });

        // Slider For category pages / filter price
        var priceSlider = document.getElementById("price-slider");
        if (typeof noUiSlider === "object") {
            // Check if #price-slider elem is exists if not return
            // to prevent error logs
            if (priceSlider == null) return;

            noUiSlider.create(priceSlider, {
                start: currentPriceRange,
                connect: true,
                step: 50,
                margin: 200,
                range: {
                    min: 0,
                    max: 10000,
                },
                tooltips: true,
                format: wNumb({
                    decimals: 0,
                    prefix: "$",
                }),
            });

            // Update Price Range
            priceSlider.noUiSlider.on("update", function (values, handle) {
                $("#filter-price-range").text(values.join(" - "));

                if (myPriceFilterTimeout.current) {
                    clearTimeout(myPriceFilterTimeout.current);
                }
                myPriceFilterTimeout.current = setTimeout(() => {
                    handleFilterPriceChange(
                        values.map((value) => value?.substring(1))
                    );
                }, 500);
            });
        }
    }, []);

    const onFilterChange = (id, isChecked) => {
        onCateFilterChange(id, isChecked);
    };
    return (
        <aside className="col-lg-3 order-lg-first">
            <div className="sidebar sidebar-shop">
                <div className="widget widget-clean">
                    <label>Filters:</label>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onCateFilterChange("");
                        }}
                        className="sidebar-filter-clear"
                    >
                        Clean All
                    </a>
                </div>
                <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                        <a
                            data-toggle="collapse"
                            href="#widget-1"
                            role="button"
                            aria-expanded="true"
                            aria-controls="widget-1"
                        >
                            Category
                        </a>
                    </h3>
                    <div className="collapse show" id="widget-1">
                        <div className="widget-body">
                            <div className="filter-items filter-items-count">
                                {isLoading
                                    ? Array(3)
                                          .fill("")
                                          .map((_, i) => (
                                              <div
                                                  key={i}
                                                  className="filter-item"
                                              >
                                                  <Skeleton active />
                                              </div>
                                          ))
                                    : categories?.map((category, i) => (
                                          <div
                                              key={category?.id || i}
                                              className="filter-item"
                                          >
                                              <CheckBox
                                                  id={category?.id || i}
                                                  label={category.name || ""}
                                                  checked={activeCategory?.includes(
                                                      category?.id
                                                  )}
                                                  onChange={(value) => {
                                                      onFilterChange(
                                                          category?.id,
                                                          value.target.checked
                                                      );
                                                  }}
                                              />
                                          </div>
                                      ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                        <a
                            data-toggle="collapse"
                            href="#widget-2"
                            role="button"
                            aria-expanded="true"
                            aria-controls="widget-5"
                        >
                            {" "}
                            Price{" "}
                        </a>
                    </h3>
                    <div className="collapse show" id="widget-2">
                        <div className="widget-body">
                            <div className="filter-price">
                                <div className="filter-price-text">
                                    <span id="filter-price-range" />
                                </div>
                                <div id="price-slider" />
                            </div>
                        </div>
                    </div>
                    <PriceFilter />
                </div>
            </div>
        </aside>
    );
};

export default ProductsFilter;
