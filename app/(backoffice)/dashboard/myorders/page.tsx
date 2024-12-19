"use client";
import React from "react";
import { useSelector } from "react-redux";
import NoData from "@/components/custom/NoData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/store/store";

const MyOrders = () => {
  const orders = useSelector((state: RootState) => state.orders.order);

  console.log("order Items", orders);
  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold">
        <h1>Order</h1>
      </div>
      {!orders[0] && <NoData />}
      <div className="grid grid-cols-1 md:grid-cols-3 space-x-4 mx-5">
        {orders.map((order:any, index) => {
          return (
            // <div
            //   key={order._id + index + "order"}
            //   className="order rounded p-4 text-sm"
            // >

            //   <p>Order No : {order?.orderId}</p>
            //   <div className="flex gap-3">
            //     <img src={order.product_details.image[0]} className="w-14 h-14" />
            //     <p className="font-medium">{order.product_details.name}</p>
            //   </div>
            // </div>
            <Card className=" mt-3" key={index}>
              <CardHeader>
                <CardTitle>{order?.orderId}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <img
                    src={order.product_details.image[0]}
                    className="w-14 h-14"
                  />
                  <p className="font-medium">{order.product_details.name}</p>
                </div>
                <p className="font-medium">Status:{order.payment_status}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
