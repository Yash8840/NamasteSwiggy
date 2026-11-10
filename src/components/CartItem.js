import React from "react";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../utils/cartSlice";

const CartItem = (props) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className=" flex justify-between py-2 border-t border-gray-200 p-5 ">
        <div>
          <p className="font-medium">{props.item.name}</p>
          <p className="text-gray-600 mt-1">₹ {props.item.price / 100}</p>
          <p className="text-gray-500 text-sm mt-1">{props.item.description}</p>
        </div>

        <div className="h-10 w-20 flex items-center justify-center border border-gray-300 rounded-md mt-3 ">
          <button
            className=" cursor-pointer"
            onClick={() => dispatch(decreaseQuantity(props.item.id))}>
            -
          </button>
          <span className="px-3">{props.item.quantity}</span>

          <button
            className=" cursor-pointer"
            onClick={() => dispatch(increaseQuantity(props.item.id))}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
