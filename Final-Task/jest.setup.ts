import React from "react";
import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock Next.js Image component
jest.mock("next/image", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: (props: any) => {
      return React.createElement("img", props);
    },
  };
});

// Mock NextAuth
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: "unauthenticated",
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock axios
jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  isAxiosError: jest.fn(),
}));

// Mock framer-motion
jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: {
      div: ({
        children,
        ...props
      }: {
        children?: React.ReactNode;
      } & React.HTMLAttributes<HTMLDivElement>) => {
        return React.createElement("div", props, children);
      },
      button: ({
        children,
        ...props
      }: {
        children?: React.ReactNode;
      } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
        return React.createElement("button", props, children);
      },
    },
  };
});

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
