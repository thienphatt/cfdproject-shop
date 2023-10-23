import React from "react";
import { SORT_OPTIONS } from "../../constants/general";
import Select from "../../components/Select";

const ToolBox = ({ showNumb, totalNumb, activeSort, onSortChange }) => {
  const onSelectChange = (e) => {
    onSortChange?.(e.target.value);
  };
  return (
    <div className="toolbox">
      <div className="toolbox-left">
        <div className="toolbox-info">
          Showing{" "}
          <span>
            {showNumb || 0} of {totalNumb || 0}
          </span>{" "}
          Products
        </div>
      </div>
      <div className="toolbox-right">
        <Select
          label="Sort by:"
          className="toolbox-sort"
          value={activeSort}
          defaultValue={SORT_OPTIONS.popularity.value}
          options={[
            SORT_OPTIONS.popularity,
            SORT_OPTIONS.pricelow,
            SORT_OPTIONS.pricehigh,
            SORT_OPTIONS.newest,
            SORT_OPTIONS.rating,
          ]}
          onChange={onSelectChange}
        />
      </div>
    </div>
  );
};

export default ToolBox;
