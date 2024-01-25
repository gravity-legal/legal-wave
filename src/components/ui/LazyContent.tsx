import React from 'react';

const LazyContent = ({ children }: { children: () => React.ReactNode }) => {
  return <>{children()}</>;
};

export default LazyContent;
