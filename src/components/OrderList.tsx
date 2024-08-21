
import React, { useState } from "react";
import { useOrderStore } from "../store/orderStore";
import Order from "./Order";
import { Pagination , Button } from "@nextui-org/react";

const OrderList: React.FC = () => {
  const { incomingOrders, acceptOrder, rejectOrder } = useOrderStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Set the number of orders to display per page

  // Calculate the start and end index of the orders to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const ordersToDisplay = incomingOrders.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className="text-3xl m-4">Incoming Orders</h2>

      <div className="flex justify-between">
        <div className="flex">
          {ordersToDisplay.length === 0 ? (
            <img src="./2.svg"/>
            // <p>No incoming orders.</p>
          ) : (
            ordersToDisplay.map((order) => (
              <Order
                key={order.id}
                order={order}
                onAccept={() => acceptOrder(order.id)}
                onReject={() => rejectOrder(order.id)}
              />
            ))
          )}
        </div>
        <div>
          <img src="./3.svg" alt="image" className="w-60" />
        </div>
      </div>

      {/* <div className="flex justify-center mt-4">
        <Pagination
          total={Math.ceil(incomingOrders.length / itemsPerPage)}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div> */}


<div className="flex flex-col gap-5">
      <p className="text-small text-default-500">Selected Page: {currentPage}</p>
      <Pagination
        total={10}
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
      />
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
        >
          Next
        </Button>
      </div>
    </div>
    </div>
  );
};

export default OrderList;
