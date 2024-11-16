import { Outlet } from "react-router-dom";
import VerticalMenu from "../Components/Menu/VerticalMenu";
import HorizontalMenu from "../Components/Menu/HorizontalMenu";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Vertical Menu */}
      <VerticalMenu />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow bg-gray-100 overflow-y-auto">
        {/* Horizontal Menu */}
        <div className="z-10 bg-white shadow-md w-full">
          <HorizontalMenu />
        </div>

        {/* Content Below Horizontal Menu */}
        <div className="flex-grow pt-16 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
