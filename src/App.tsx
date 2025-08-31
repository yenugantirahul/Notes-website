import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import { InputBox } from "./components/InputBox";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import { TbArrowBigLeftLine, TbArrowBigRightLine } from "react-icons/tb";
import Notes from "./pages/Notes";
function App() {
  const location: string = useLocation().pathname;
  return (
    <main className="h-screen">
      <Header />
      <Routes>
        <Route path="/addnotes" element={<InputBox />} />
        <Route path="/viewnotes" element={<Notes />} />
      </Routes>
      <div className="text-center ">
        {location == "/" && (
          <h1 className="text-black-700 sm:text-5xl text-center md:text-3xl lg:text-5xl mt-10  backdrop-blur-2xl  dark:text-indigo-4s00 font-bold">
            Welcome to Notes App
          </h1>
        )}
        {location == "/" ? (
          <Link to={"/addnotes"}>
            <Button className="mt-5 cursor-pointer text-xl">
              Add Notes
              <TbArrowBigRightLine size={"20px"} />
            </Button>
          </Link>
        ) : (
          <Link to={"/"}>
            <Button className="mt-5  cursor-pointer text-xl">
              <TbArrowBigLeftLine size={"20px"} />
              Home
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
}

export default App;
