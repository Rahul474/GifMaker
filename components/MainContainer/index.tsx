import React, { ReactNode } from "react"

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <div className="w-full max-w-[1200px] m-auto">
      {children}
    </div>
  )
}

export default MainContainer