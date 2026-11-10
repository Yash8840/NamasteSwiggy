import React from "react";
import { img_url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const AccItem = (props) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
    console.log("Item added to cart:", item);
  };

  console.log("AccItem props:", props);
  return (
    <div className="pb-5">
      {props.data.map((menuItem) => (
        <div
          key={menuItem.card.info.id}
          className="mr-10 flex justify-between py-4 border-t border-gray-200">
          <div>
            <p className="font-medium">{menuItem.card.info.name}</p>

            <p className="text-gray-600 mt-1">
              ₹ {menuItem.card.info.price / 100}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {menuItem.card.info.description}
            </p>
          </div>

          <div className="relative">
            <img
              src={img_url + menuItem.card.info.imageId}
              alt={menuItem.card.info.name}
              className="w-30 h-30 rounded-2xl object-cover"
            />

            <button
              onClick={() => {
                handleAddItem(menuItem.card.info);
              }}
              className="absolute left-1/2 bottom-2 translate-y-1/2 -translate-x-1/2
               bg-white text-green-600 font-semibold
               px-4 py-1 rounded-lg shadow-md border border-gray-200 cursor-pointer">
              Add+
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccItem;
