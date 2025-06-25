export const useSearchParams = jest.fn(() => ({
  get: jest.fn(),
}));

export const usePathname = jest.fn(() => '');

export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
}));

export const redirect = jest.fn();

export constpermanentRedirect = jest.fn();
