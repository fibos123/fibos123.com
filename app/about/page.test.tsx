import React from "react";
import { render, screen } from "@testing-library/react";
import AboutPage from "./page"; // Default export

describe("AboutPage Component", () => {
  beforeEach(() => {
    render(<AboutPage />);
  });

  it("renders the main heading", () => {
    expect(screen.getByRole("heading", { name: "FIBOS 导航竞选 FIBOS 超级节点", level: 2 })).toBeInTheDocument();
  });

  it("renders the '简介' section correctly", () => {
    expect(screen.getByRole("heading", { name: "简介", level: 5 })).toBeInTheDocument();
    expect(screen.getByText("FIBOS 导航是由在日本中国人 Andy 发起。")).toBeInTheDocument();
    expect(screen.getByText("旨在维护稳定的 FIBOS 节点，向公众传播有关 FIBOS 知识，为社区做出贡献。")).toBeInTheDocument();
  });

  it("renders the '成员' section correctly", () => {
    expect(screen.getByRole("heading", { name: "成员", level: 5 })).toBeInTheDocument();
    expect(screen.getByText("Andy 创始人")).toBeInTheDocument();
    expect(screen.getByText("全栈开发者，现居日本东京。")).toBeInTheDocument();
  });

  it("renders the '节点信息' section correctly", () => {
    expect(screen.getByRole("heading", { name: "节点信息", level: 5 })).toBeInTheDocument();
    expect(screen.getByText("节点账户")).toBeInTheDocument();
    expect(screen.getByText("fibos123comm")).toBeInTheDocument();
  });

  it("renders the '联系' section correctly", () => {
    expect(screen.getByRole("heading", { name: "联系", level: 5 })).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("bp@fibos123.com")).toBeInTheDocument();
  });

  it("renders the '物料下载' section with correct links", () => {
    expect(screen.getByRole("heading", { name: "物料下载", level: 5 })).toBeInTheDocument();
    expect(screen.getByText("品牌标识")).toBeInTheDocument();

    const svgLink = screen.getByRole("link", { name: "SVG" });
    expect(svgLink).toBeInTheDocument();
    expect(svgLink).toHaveAttribute("href", "/logo.svg");
    expect(svgLink).toHaveAttribute("target", "_blank");

    const pngLink = screen.getByRole("link", { name: "PNG" });
    expect(pngLink).toBeInTheDocument();
    expect(pngLink).toHaveAttribute("href", "/public/images/logo_256.png");
    expect(pngLink).toHaveAttribute("target", "_blank");
  });

  it("renders the '鸣谢' section", () => {
    expect(screen.getByRole("heading", { name: "鸣谢", level: 5 })).toBeInTheDocument();
    expect(screen.getByText("Icons made by Freepik from www.flaticon.com")).toBeInTheDocument();
  });

  it("has the outer div with id 'about-page'", () => {
    const { container } = render(<AboutPage />);
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveAttribute("id", "about-page");
  });
});
