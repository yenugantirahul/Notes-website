import React from "react";
import { FaMoon, FaNoteSticky, FaSun } from "react-icons/fa6";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme == "dark";
  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-700 dark:border-gray-700 bg-white/80  mx-auto text-white
    dark:bg-gray-900/80 backdrop-blur-md
    "
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to={"/"}>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl dark:text-white text-black">Notes</h1>
            <FaNoteSticky size={"50"} color={`${isDark ? "white" : "black"}`} />
          </div>
        </Link>
        <Link to={"/viewnotes"}>
          <Button className="cursor-pointer">View Notes</Button>
        </Link>
        <Button
          onClick={() => {
            setTheme(isDark ? "light" : "dark");
          }}
          className="dark:bg-white bg-black cursor-pointer"
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </Button>
      </div>
    </header>
  );
};

export default Header;
