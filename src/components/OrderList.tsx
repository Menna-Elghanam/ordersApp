import React from "react";
import { useOrderStore } from "../store/orderStore";
import Order from "./Order";

const OrderList: React.FC = () => {
  const { incomingOrders, acceptOrder, rejectOrder } = useOrderStore();

  return (
    <div>
      <h2 className="text-3xl">Incoming Orders</h2>
      <img src="./3.svg" alt="image" className="w-60" />
      <div className="flex">
        {incomingOrders.length === 0 ? (
          <p>No incoming orders.</p>
        ) : (
          incomingOrders.map((order) => (
            <Order
              key={order.id}
              order={order}
              onAccept={() => acceptOrder(order.id)}
              onReject={() => rejectOrder(order.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderList;