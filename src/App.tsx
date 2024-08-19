import "./App.css";
import React from "react";
import { create } from "zustand";
import NavBar from "./components/NavBar";
import Paginationn from "./components/Paginationn";
import { Button } from "@nextui-org/react";

// Define the types for orders and state
type Order = {
  id: number;
  clientName: string;
  details: string;
  completed: boolean;
};

type State = {
  incomingOrders: Order[];
  pastOrders: Order[];
  acceptOrder: (id: number) => void;
  rejectOrder: (id: number) => void;
  completeOrder: (id: number) => void;
};

// Initialize Zustand store
const useOrderStore = create<State>((set) => ({
  incomingOrders: [
    {
      id: 1,
      clientName: "Client A",
      details: "Order 1 details",
      completed: false,
    },
    {
      id: 2,
      clientName: "Client B",
      details: "Order 2 details",
      completed: false,
    },
    {
      id: 3,
      clientName: "Client C",
      details: "Order 3 details",
      completed: false,
    },
  ],
  pastOrders: [],
  acceptOrder: (id) =>
    set((state) => {
      const acceptedOrder = state.incomingOrders.find(
        (order) => order.id === id
      );
      if (acceptedOrder) {
        return {
          incomingOrders: state.incomingOrders.filter(
            (order) => order.id !== id
          ),
          pastOrders: [...state.pastOrders, acceptedOrder],
        };
      }
      return state;
    }),
  rejectOrder: (id) =>
    set((state) => ({
      incomingOrders: state.incomingOrders.filter((order) => order.id !== id),
    })),
  completeOrder: (id) =>
    set((state) => ({
      pastOrders: state.pastOrders.map((order) =>
        order.id === id ? { ...order, completed: true } : order
      ),
    })),
}));

// Component to display a single order
const Order: React.FC<{
  order: Order;
  onAccept?: () => void;
  onReject?: () => void;
  onComplete?: () => void;
}> = ({ order, onAccept, onReject, onComplete }) => (
  <div className="border p-4 m-2">
    <h3>{order.clientName}</h3>
    <p>{order.details}</p>
    {!order.completed && onAccept && onReject && (
      <>
        <Button
          color="success"
          variant="ghost"
          onClick={onAccept}
          className="m-3"
        >
          Accept
        </Button>
        <Button color="danger" variant="ghost" onClick={onReject}>
          Reject
        </Button>
      </>
    )}
    {onComplete && !order.completed && (
      <Button color="primary" variant="shadow" onClick={onComplete}>
        Mark as completed
      </Button>
    )}
    {order.completed && <span className="text-green-600">Completed</span>}
  </div>
);

// Component to display list of orders
const OrderList: React.FC = () => {
  const { incomingOrders, acceptOrder, rejectOrder } = useOrderStore();

  return (
    <div>
      <h2 className="text-3xl ">Incoming Orders</h2>
      <div className="flex ">
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

// Component to display list of in progress orders
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

// Main App component
const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 ">
        <h1 className="text-2xl font-bold mb-4">Vendor Order Management</h1>
        <OrderList />
        <PastOrders />
        <Paginationn />
      </div>
    </>
  );
};

export default App;
