import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import { ThemeContext } from "./Context";
import { twMerge } from "tailwind-merge";

const BackgroundBlob = ({ className }) => {
  return (
    <div
      className={twMerge(
        "sticky rounded-full translate-x-[-50%] translate-y-[-50%]",
        className
      )}
    />
  );
};

export default function Layout({ children }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [isClient, setIsClient] = useState(false);

  // Force rerender to trigger theme on PROD
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={`min-h-screen min-w-full ${
        isDarkMode ? "dark:bg-primary-dark-100 dark" : "bg-primary-500"
      }`}
      key={isClient}
    >
      <BackgroundBlob
        className="
          bg-gradient-to-br from-secondary-200 to-amber-200 dark:from-secondary-dark-200 dark:to-red-600 
          w-48 h-48 -mb-48 -mr-48 
          md:w-72 md:h-72 md:-mb-72 md:-mr-72 
          lg:w-96 lg:h-96 lg:-mb-96 lg:-mr-96 
          top-1/4 left-[20%] 
          filter blur-lg
        "
      />
      <BackgroundBlob
        className="
          bg-secondary-300 dark:bg-secondary-dark-300 
          w-36 h-36 -mb-36 -mr-36 
          md:w-56 md:h-56 md:-mb-56 md:-mr-56 
          lg:w-72 lg:h-72 lg:-mb-72 lg:-mr-72 
          top-1/2 left-1/4 
          filter blur-lg opacity-75
        "
      />
      <BackgroundBlob
        className="
          bg-amber-400 dark:bg-amber-600 
          w-28 h-28 -mb-28 -mr-28 
          md:w-40 md:h-40 md:-mb-40 md:-mr-40 
          lg:w-56 lg:h-56 lg:-mb-56 lg:-mr-56 
          top-2/3 left-[22%] 
          filter blur-xl opacity-60
        "
      />
      <BackgroundBlob
        className="
          bg-gradient-to-bl from-secondary-400 to-amber-300 dark:from-secondary-dark-400 dark:to-red-800 
          w-48 h-48 -mb-48 -mr-48 
          md:w-72 md:h-72 md:-mb-72 md:-mr-72 
          lg:w-96 lg:h-96 lg:-mb-96 lg:-mr-96 
          top-[40%] left-[60%] 
          filter blur-lg
        "
      />
      <BackgroundBlob
        className="
          bg-gradient-to-l from-secondary-600 to-amber-500 dark:from-secondary-dark-600 dark:to-red-800 
          w-20 h-20 -mb-20 -mr-20 
          md:w-32 md:h-32 md:-mb-32 md:-mr-32
          lg:w-40 lg:h-40 lg:-mb-40 lg:-mr-40
          top-1/2 left-1/2 
          filter blur-lg opacity-80
        "
      />
      <BackgroundBlob
        className="
          bg-amber-400 dark:bg-amber-600 
          w-24 h-24 -mb-24 -mr-24 
          md:w-36 md:h-36 md:-mb-36 md:-mr-36 
          lg:w-48 lg:h-48 lg:-mb-48 lg:-mr-48 
          top-1/4 left-[70%] 
          filter blur-md opacity-60
        "
      />
      <BackgroundBlob
        className="
          bg-gradient-to-tr from-secondary-200 to-amber-200 dark:from-secondary-dark-200 dark:to-red-600 
          w-36 h-36 -mb-36 -mr-36 
          md:w-56 md:h-56 md:-mb-56 md:-mr-56 
          lg:w-72 lg:h-72 lg:-mb-72 lg:-mr-72 
          top-[65%] left-[70%] 
          filter blur-lg opacity-60
        "
      />
      <BackgroundBlob
        className="
          bg-secondary-300 dark:bg-secondary-dark-300 
          w-24 h-24 -mb-24 -mr-24 
          md:w-36 md:h-36 md:-mb-36 md:-mr-36 
          lg:w-48 lg:h-48 lg:-mb-48 lg:-mr-48 
          top-[55%] left-[80%] 
          filter blur-lg opacity-70
        "
      />
      <Navbar />
      <div className="z-10 relative">{children}</div>
    </div>
  );
}
