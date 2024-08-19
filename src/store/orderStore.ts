import { create } from "zustand";

export type Order = {
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

export const useOrderStore = create<State>((set) => ({
  incomingOrders: [
    { id: 1, clientName: "Client A", details: "Order 1 details", completed: false },
    { id: 2, clientName: "Client B", details: "Order 2 details", completed: false },
    { id: 3, clientName: "Client C", details: "Order 3 details", completed: false },
  ],
  pastOrders: [],
  acceptOrder: (id) =>
    set((state) => {
      const acceptedOrder = state.incomingOrders.find((order) => order.id === id);
      if (acceptedOrder) {
        return {
          incomingOrders: state.incomingOrders.filter((order) => order.id !== id),
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