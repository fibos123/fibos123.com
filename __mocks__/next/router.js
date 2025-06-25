export const useRouter = jest.fn(() => ({
  route: '/',
  pathname: '',
  query: {},
  asPath: '',
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  prefetch: jest.fn(() => null),
  replace: jest.fn(),
}));

// Mock next/router
export const withRouter = (Component) => {
  Component.defaultProps = {
    ...Component.defaultProps,
    router: {
      pathname: '/',
    },
  };
  return Component;
};
