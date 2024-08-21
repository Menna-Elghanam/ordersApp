
import { create } from "zustand";
import { incomingOrdersData } from "./orderData";

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
  incomingOrders: incomingOrdersData,
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







