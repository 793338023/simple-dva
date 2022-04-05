import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// __REDUCER__

class RouterView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>__ROUTE__</Routes>
      </BrowserRouter>
    );
  }
}

export default RouterView;
