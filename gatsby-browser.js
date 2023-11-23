import "./src/styles/global.css";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { AppProvider } from "./src/components/Context";

export const wrapPageElement = ({ element }) => {
  return <AnimatePresence mode="wait">{element}</AnimatePresence>;
};

export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};
