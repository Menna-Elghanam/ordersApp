import React from "react";
import NavBar from "./components/NavBar";
// import Paginationn from "./components/Paginationn";
import OrderList from "./components/OrderList";
import PastOrders from "./components/PastOrders";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto ">
        <OrderList />
        {/* <Paginationn /> */}
        <PastOrders />
      </div>
    </>
  );
};

export default App;
