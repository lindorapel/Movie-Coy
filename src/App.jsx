import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Index";
import Home from "./pages/Home";
import DetailsMovies from "./pages/DetailsMovies";
import PopularMovies from "./pages/PopularMovies";
import SearchMovies from "./pages/SearchMovies";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:movieId" element={<DetailsMovies />} />
          <Route path="/populer-movies" element={<PopularMovies />} />
          <Route path="/search" element={<SearchMovies />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
