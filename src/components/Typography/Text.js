import React from "react";
import { twMerge } from "tailwind-merge";

export const Title = ({ children, className }) => {
  return (
    <h1
      className={twMerge(
        "text-8xl font-bold text-typography dark:text-typography-dark font-body",
        className
      )}
    >
      {children}
    </h1>
  );
};

export const H1 = ({ children, className }) => {
  return (
    <h1
      className={twMerge(
        "text-5xl font-semibold text-typography dark:text-typography-dark font-body",
        className
      )}
    >
      {children}
    </h1>
  );
};

export const H2 = ({ children, className }) => {
  return (
    <h2
      className={twMerge(
        "text-4xl font-semibold text-typography dark:text-typography-dark font-body",
        className
      )}
    >
      {children}
    </h2>
  );
};

export const H3 = ({ children, className }) => {
  return (
    <h3
      className={twMerge(
        "text-2xl font-medium text-typography dark:text-typography-dark font-body",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const H4 = ({ children, className }) => {
  return (
    <h4
      className={twMerge(
        "text-xl font-medium text-typography dark:text-typography-dark font-body",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const PLarge = ({ children, className }) => {
  return (
    <p
      className={twMerge(
        "text-xl font-normal text-typography dark:text-typography-dark font-body",
        className
      )}
    >
      {children}
    </p>
  );
};

export const P = ({ children, className }) => {
  return (
    <p
      className={twMerge(
        "text-base font-normal text-typography dark:text-typography-dark font-body",
        className
      )}
    >
      {children}
    </p>
  );
};
