import React from "react";
import Header from "../components/Header";

const Notfound = () => {
  return (
    <div>
      <Header />
      <h1 className="bg-slate-400 h-24 text-3xl flex items-center justify-center mt-6">
        Page not found
      </h1>
    </div>
  );
};

export default Notfound;
