import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import AccItem from "./AccItem";
import CartItem from "./CartItem";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  return (
    <div className="bg-[#e9ecee] flex h-screen px-15 py-9">
      <div className="w-8/12 flex flex-col gap-5">
        <div className="bg-white flex justify-between p-5">
          <div>
            <h1 className="font-bold text-2xl  px-5">Account</h1>
            <p className="px-5 text-gray-400 mb-5">
              To place your order now, log in to your existing account or sign
              up.
            </p>

            <div className="mt-4">
              <button className="bg-white p-2 m-2 rounded-md hover:bg-gray-400 cursor-pointer text-green-600">
                Login
              </button>
              <button className="bg-green-600 p-2 m-2 rounded-md hover:bg-gray-400 cursor-pointer text-white">
                Sign up
              </button>
            </div>
          </div>
          <div className="mr-3">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r"
              className="w-35 h-35"
            />
          </div>
        </div>
        <div className=" py-8 px-4 bg-white">
          <span className="text-gray-600 font-bold">Delivery Address</span>
        </div>
        <div className="py-8 px-4 bg-white flex justify-between">
          <span className="text-gray-600 font-bold">Payment</span>
        </div>
        <div>
          <button
            className="bg-green-600 p-2 rounded-md hover:bg-green-400 cursor-pointer text-white"
            onClick={() => {
              // Clear the cart items from the Redux store
              dispatch(clearCart());
            }}>
            clear cart
          </button>
        </div>
      </div>
      <div className="h-[75vh] bg-white w-4/12 ml-5 flex flex-col justify-between p-5">
        <div className="flex items-center">
          <div>
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r"
              className="w-25 h-25"
            />
          </div>
          <div className="ml-2 flex flex-col">
            <h2 className="font-bold leading-none mb-1">Rest Name</h2>
            <p className=" text-gray-400 leading-none">Sector 50</p>
          </div>
        </div>
        <div className="overflow-y-scroll">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="border-t border-gray-200 p-4">
          <p className="font-bold">
            Total: ₹ {useSelector((store) => store.cart.totalPrice) / 100}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
