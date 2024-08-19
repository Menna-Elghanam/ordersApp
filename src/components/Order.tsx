import React from "react";
import { Button } from "@nextui-org/react";
import { Order as OrderType } from "../store/orderStore";

interface OrderProps {
  order: OrderType;
  onAccept?: () => void;
  onReject?: () => void;
  onComplete?: () => void;
}

const Order: React.FC<OrderProps> = ({ order, onAccept, onReject, onComplete }) => (
  <div className="border p-4 m-2">
    <h3>{order.clientName}</h3>
    <p>{order.details}</p>
    {!order.completed && onAccept && onReject && (
      <>
        <Button color="success" variant="ghost" onClick={onAccept} className="m-3">
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

export default Order;