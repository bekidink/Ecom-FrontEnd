"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/provider/GlobalProvider";
import Axios from "@/utils/Axios";
import SummaryApi from "@/utils/summaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "@/utils/AxiosToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RootState } from "@/store/store";

const AddToCartButton = ({ data }:any) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state: RootState) => state.cartItem.cart);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemsDetails] = useState({_id:""});

  const handleADDTocart = async (e:any) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.addTocart,
        data: {
          productId: data?._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  //checking this item in cart or not
  useEffect(() => {
    const checkingitem = cartItem.some(
      (item) => item.productId._id === data._id
    );
    setIsAvailableCart(checkingitem);

    const product:any = cartItem.find((item) => item.productId._id === data._id);
    if(product){
  setQty(product?.quantity ?? 0);
  setCartItemsDetails(product);
    }
  
  }, [data, cartItem]);

  const increaseQty = async (e:any) => {
    e.preventDefault();
    e.stopPropagation();

    const response = await updateCartItem(cartItemDetails?._id, qty + 1);

    if (response.success) {
      toast.success("Item added");
    }
  };

  const decreaseQty = async (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty === 1) {
      deleteCartItem(cartItemDetails?._id);
    } else {
      const response = await updateCartItem(cartItemDetails?._id, qty - 1);

      if (response.success) {
        toast.success("Item remove");
      }
    }
  };
  return (
    <div className="w-full max-w-[150px]">
      {isAvailableCart ? (
        <div className="flex w-full h-full">
          <button
            onClick={decreaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaMinus />
          </button>

          <p className="flex-1 w-full font-semibold px-1 flex items-center justify-center">
            {qty}
          </p>

          <button
            onClick={increaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleADDTocart}
          className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
