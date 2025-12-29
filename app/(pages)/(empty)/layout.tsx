import React, { PropsWithChildren } from 'react'

const layout = ({ children }: PropsWithChildren) => {
  return <div className="h-full bg-purple-2 md:bg-white">{children}</div>;
};


export default layout