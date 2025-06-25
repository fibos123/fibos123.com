import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./page"; // Default export
import { useSites } from "../hooks"; // Hook used by the page

// Mock the useSites hook
jest.mock("../hooks", () => ({
  useSites: jest.fn(),
  // Mock other hooks if HomePage starts using them, to avoid undefined errors
  useHeadBlockInfo: jest.fn(() => ({ info: [] })),
  useProducers: jest.fn(() => ({ bpList: [] })),
  useMonitor: jest.fn(() => ({ monitors: [], producerStatus: null }))
}));

const mockSitesData = [
  {
    name: "Category 1",
    icon: "<svg>cat1</svg>",
    sub: [
      {
        name: "SubCategory 1.1",
        child: [
          { name: "Site 1.1.1", url: "http://site111.com", desc: "Description 1.1.1", icon: "<svg>site1</svg>" },
          { name: "Site 1.1.2", url: "http://site112.com", desc: "Description 1.1.2", more: { name: "More", url: "http://more112.com"} },
        ],
      },
    ],
  },
  {
    name: "Category 2",
    icon: "<svg>cat2</svg>",
    sub: [
      {
        name: "SubCategory 2.1",
        child: [
          { name: "Site 2.1.1", url: "http://site211.com", desc: "Description 2.1.1" },
        ],
      },
      {
        name: "", // SubCategory without a name
        child: [
          { name: "Site 2.2.1", url: "http://site221.com", desc: "Description 2.2.1" },
        ],
      }
    ],
  },
];

describe("HomePage Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useSites as jest.Mock).mockClear();
  });

  it("renders hero section correctly", () => {
    (useSites as jest.Mock).mockReturnValue({ sites: [] }); // No sites data needed for this test
    render(<HomePage />);

    expect(screen.getByText("FIBOS 导航")).toBeInTheDocument();
    expect(screen.getByText("一个收录 FIBOS 网址及资源的小导航")).toBeInTheDocument();
    const heroDiv = screen.getByText("FIBOS 导航").closest("div");
    expect(heroDiv).toHaveStyle("background-image: url(/bg.jpg)");
  });

  it("renders 'No sites data' message or nothing when sites data is empty or undefined", () => {
    (useSites as jest.Mock).mockReturnValue({ sites: [] });
    const { container } = render(<HomePage />);
    // Check that no sections are rendered
    expect(container.querySelector("section")).toBeNull();

    (useSites as jest.Mock).mockReturnValue({ sites: undefined });
    const { container: container2 } = render(<HomePage />);
    expect(container2.querySelector("section")).toBeNull();
  });

  it("renders site categories and items correctly from useSites hook", () => {
    (useSites as jest.Mock).mockReturnValue({ sites: mockSitesData });
    render(<HomePage />);

    // Check Category 1
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 1").querySelector("i")?.innerHTML).toBe("<svg>cat1</svg>");
    expect(screen.getByText("SubCategory 1.1")).toBeInTheDocument();

    const site111Link = screen.getByText("Site 1.1.1").closest('a');
    expect(site111Link).toHaveAttribute("href", "http://site111.com");
    expect(screen.getByText("Description 1.1.1")).toBeInTheDocument();
    expect(site111Link?.querySelector("i")?.innerHTML).toBe("<svg>site1</svg>");

    const site112Link = screen.getByText("Site 1.1.2").closest('a');
    expect(site112Link).toHaveAttribute("href", "http://site112.com");
    expect(screen.getByText("Description 1.1.2")).toBeInTheDocument();
    const moreLink = screen.getByText("More");
    expect(moreLink).toBeInTheDocument();
    expect(moreLink.closest('a')).toHaveAttribute("href", "http://more112.com");

    // Check Category 2
    expect(screen.getByText("Category 2")).toBeInTheDocument();
    expect(screen.getByText("SubCategory 2.1")).toBeInTheDocument();
    const site211Link = screen.getByText("Site 2.1.1").closest('a');
    expect(site211Link).toHaveAttribute("href", "http://site211.com");
    expect(screen.getByText("Description 2.1.1")).toBeInTheDocument();

    // Check sub-category without a name (header should not be rendered)
    expect(screen.queryByRole('heading', { name: "" })).toBeNull(); // No h2 for empty subcategory name
    const site221Link = screen.getByText("Site 2.2.1").closest('a');
    expect(site221Link).toHaveAttribute("href", "http://site221.com");
    expect(screen.getByText("Description 2.2.1")).toBeInTheDocument();
  });
});
