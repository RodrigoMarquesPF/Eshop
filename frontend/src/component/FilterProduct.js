import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({category}) => {
  return (
    <div>
      <div className="text-3xl p-5  rounded-full cursor-pointer bg-yellow-500">
        <CiForkAndKnife />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
