import React from "react";
import { useOrderStore } from "../store/orderStore";
import Order from "./Order";

const PastOrders: React.FC = () => {
  const { pastOrders, completeOrder } = useOrderStore();

  return (
    <div>
      <h2 className="text-3xl">In Progress Orders</h2>
      <div className="flex">
        {pastOrders.length === 0 ? (
          <p>No past orders.</p>
        ) : (
          pastOrders.map((order) => (
            <Order
              key={order.id}
              order={order}
              onComplete={() => completeOrder(order.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PastOrders;