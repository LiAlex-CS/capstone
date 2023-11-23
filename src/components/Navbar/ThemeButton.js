import React, { useContext } from "react";
import { ThemeContext } from "../Context";
import { BsMoon, BsSun } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const ThemeButton = ({ className }) => {
  const { isDarkMode, flipDarkTheme } = useContext(ThemeContext);

  const BUTTON_NAME = "Theme button";

  return (
    <button
      className={twMerge(
        "rounded-full p-3 m-0 md:ml-8 border-primary-300 dark:border-primary-dark-300 text-typography dark:text-typography-dark border-2 hover:border-primary-200 dark:hover:border-primary-dark-400",
        className
      )}
      onClick={flipDarkTheme}
      aria-label={BUTTON_NAME}
    >
      {isDarkMode ? <BsMoon /> : <BsSun />}
    </button>
  );
};

export default ThemeButton;
