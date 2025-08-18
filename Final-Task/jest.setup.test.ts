import "@testing-library/jest-dom";
import React from "react";
const { useRouter, useSearchParams } = require("next/navigation");
const Image = require("next/image").default;
const { useSession, signIn, signOut } = require("next-auth/react");
const axios = require("axios");
const { motion } = require("framer-motion");

// jest.setup.test.ts

// 1. Test Next.js router mock
describe("jest.setup.ts Next.js router mock", () => {
  it("should mock useRouter and useSearchParams", () => {
    const router = useRouter();
    expect(router.push).instanceOf(Function);
    expect(router.replace).instanceOf(Function);
    expect(router.prefetch).instanceOf(Function);
    expect(router.back).instanceOf(Function);
    expect(router.refresh).instanceOf(Function);
    expect(useSearchParams()).instanceOf(URLSearchParams);
  });
});

// 2. Test Next.js Image mock
describe("jest.setup.ts Next.js Image mock", () => {
  it("should mock next/image as a functional component", () => {
    const element = Image({ src: "test.png", alt: "test" });
    expect(element.type).equal("img");
    expect(element.props.src).equal("test.png");
    expect(element.props.alt).equal("test");
  });
});

// 3. Test NextAuth mock
describe("jest.setup.ts NextAuth mock", () => {
  it("should mock useSession, signIn, signOut", () => {
    const session = useSession();
    expect(session).toEqual({ data: null, status: "unauthenticated" });
    expect(signIn).toBeInstanceOf(Function);
    expect(signOut).toBeInstanceOf(Function);
  });
});

// 4. Test axios mock
describe("jest.setup.ts axios mock", () => {
  it("should mock axios methods", () => {
    expect(axios.get).toBeInstanceOf(Function);
    expect(axios.post).toBeInstanceOf(Function);
    expect(axios.delete).toBeInstanceOf(Function);
    expect(axios.isAxiosError).toBeInstanceOf(Function);
  });
});

// 5. Test framer-motion mock
describe("jest.setup.ts framer-motion mock", () => {
  it("should mock motion.div and motion.button", () => {
    const div = motion.div({ children: "test", className: "foo" });
    expect(div.type).toBe("div");
    expect(div.props.children).toBe("test");
    expect(div.props.className).toBe("foo");

    const button = motion.button({ children: "btn", type: "button" });
    expect(button.type).toBe("button");
    expect(button.props.children).toBe("btn");
    expect(button.props.type).toBe("button");
  });
});

// 6. Test global ResizeObserver mock
describe("jest.setup.ts global ResizeObserver mock", () => {
  it("should mock global ResizeObserver", () => {
    expect(global.ResizeObserver).toBeInstanceOf(Function);
    const observer = new global.ResizeObserver();
    expect(observer.observe).toBeInstanceOf(Function);
    expect(observer.unobserve).toBeInstanceOf(Function);
    expect(observer.disconnect).toBeInstanceOf(Function);
  });
});
