import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import app from "zStore/configureStore";

// __REDUCER__

class RouterView extends React.Component {
  constructor(props) {
    super(props);
    // configureStore.replace(reducer, [sagas]);
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
