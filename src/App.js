import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize = 9;
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  key="general"
                  pageSize={this.pageSize}
                  category="general"
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  key="buisness"
                  pageSize={this.pageSize}
                  category="business"
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  pageSize={this.pageSize}
                  category="entertainment"
                />
              }
            />
            <Route
              path="/general"
              element={
                <News
                  key="general"
                  pageSize={this.pageSize}
                  category="general"
                />
              }
            />
            <Route
              path="/health"
              element={
                <News key="health" pageSize={this.pageSize} category="health" />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  key="science"
                  pageSize={this.pageSize}
                  category="science"
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News key="sports" pageSize={this.pageSize} category="sports" />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  key="technology"
                  pageSize={this.pageSize}
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
