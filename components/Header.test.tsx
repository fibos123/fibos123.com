import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";
import { useRouter } from "next/router"; // Import the mocked useRouter

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockMenu = [
  { name: "网站", path: "/", icon: "<svg>home</svg>" },
  { name: "节点列表", path: "/producer", icon: "<svg>list</svg>" },
  { name: "节点监控", path: "/monitor", icon: "<svg>monitor</svg>" },
];

describe("Header Component", () => {
  beforeEach(() => {
    // Provide a mock implementation for useRouter for each test
    (useRouter as jest.Mock).mockReturnValue({
      route: "/",
      pathname: "",
      query: {},
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    });
  });

  it("renders logo and navigation links", () => {
    render(<Header />);
    expect(screen.getByLabelText("Home")).toBeInTheDocument();
    mockMenu.forEach((item) => {
      // Desktop menu items
      const desktopLinks = screen.getAllByText(item.name);
      // Filter for links that are part of the desktop menu (visible)
      const visibleDesktopLink = desktopLinks.find(link =>
        link.closest('div.sm\\:block') // Check if parent has sm:block, meaning visible on small screens and up
      );
      expect(visibleDesktopLink).toBeInTheDocument();
      if (visibleDesktopLink) {
        expect(visibleDesktopLink.closest("a")).toHaveAttribute("href", item.path);
      }
    });
  });

  it("toggles mobile menu visibility on button click", () => {
    render(<Header />);
    const mobileMenuButton = screen.getByLabelText("Main menu");
    expect(mobileMenuButton).toBeInTheDocument();

    // Find the mobile menu container. It's always in the DOM but visibility is toggled.
    // The class 'hidden' or 'block' is applied to its direct parent 'nav'
    const mobileMenuNav = screen.getByRole('menu', { hidden: true }).closest('nav');
    expect(mobileMenuNav).toHaveClass("sm:hidden"); // Common class for mobile nav
    // Initially, it should be hidden or effectively hidden by classes
    // The actual class controlling visibility is on the nav element: "hidden" initially
     expect(mobileMenuNav).toHaveClass("hidden");


    fireEvent.click(mobileMenuButton);
    // After click, the 'hidden' class should be replaced by 'block' (or equivalent)
    expect(mobileMenuNav).not.toHaveClass("hidden");
    expect(mobileMenuNav).toHaveClass("block");


    // Check if mobile menu items are now accessible (they are always rendered, just visibility changes)
    mockMenu.forEach((item) => {
        // Mobile menu items are inside the nav that becomes visible
        const mobileLink = Array.from(mobileMenuNav!.querySelectorAll('a')).find(a => a.textContent?.includes(item.name));
        expect(mobileLink).toBeInTheDocument();
        expect(mobileLink).toHaveAttribute("href", item.path);
    });

    const closeButton = screen.getByLabelText("Close menu");
    fireEvent.click(closeButton);
    expect(mobileMenuNav).toHaveClass("hidden");
    expect(mobileMenuNav).not.toHaveClass("block");
  });

  it("highlights the active link based on the current route", () => {
    (useRouter as jest.Mock).mockReturnValue({
      route: "/producer", // Current route is /producer
      pathname: "/producer",
      query: {},
      asPath: "/producer",
      push: jest.fn(),
      events: { on: jest.fn(), off: jest.fn() },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    });

    render(<Header />);

    // Desktop link for "节点列表" should be active
    const desktopProducerLink = screen.getAllByText("节点列表").find(link => link.closest('div.sm\\:block'));
    expect(desktopProducerLink).toHaveClass("text-indigo-600");

    // Desktop link for "网站" should not be active
    const desktopHomeLink = screen.getAllByText("网站").find(link => link.closest('div.sm\\:block'));
    expect(desktopHomeLink).toHaveClass("text-slate-400");

    // Mobile menu (check when open)
    const mobileMenuButton = screen.getByLabelText("Main menu");
    fireEvent.click(mobileMenuButton);
    const mobileMenuNav = screen.getByRole('menu', { hidden: true }).closest('nav');

    const mobileProducerLink = Array.from(mobileMenuNav!.querySelectorAll('a')).find(a => a.textContent?.includes("节点列表"));
    expect(mobileProducerLink).toHaveClass("text-indigo-600");

    const mobileHomeLink = Array.from(mobileMenuNav!.querySelectorAll('a')).find(a => a.textContent?.includes("网站"));
    expect(mobileHomeLink).not.toHaveClass("text-indigo-600");
  });
});
