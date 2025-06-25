import React from 'react';

const Link = ({ children, href, ...props }) => {
  return React.createElement('a', { ...props, href }, children);
};

export default Link;
