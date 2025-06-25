import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer"; // Assuming Footer is exported from index or directly

describe("Footer Component", () => {
  it("renders the current year", () => {
    render(<Footer />);
    expect(screen.getByText(`© ${new Date().getFullYear()}`)).toBeInTheDocument();
  });

  it("renders FIBOS 导航 link", () => {
    render(<Footer />);
    const fibosLink = screen.getByText("FIBOS 导航");
    expect(fibosLink).toBeInTheDocument();
    expect(fibosLink.closest("a")).toHaveAttribute("href", "https://www.fibos123.com/");
  });

  it("renders BP 信息 link", () => {
    render(<Footer />);
    const bpLink = screen.getByText("BP 信息");
    expect(bpLink).toBeInTheDocument();
    // Check if the link points to /about. Our mock for next/link renders an 'a' tag.
    expect(bpLink.closest("a")).toHaveAttribute("href", "/about");
  });

  it("renders 返回首页 link", () => {
    render(<Footer />);
    const homeLink = screen.getByText("返回首页");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });
});
