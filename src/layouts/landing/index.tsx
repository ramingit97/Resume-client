import { Outlet } from "react-router";

export default function LandingLayout() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Без sidebar, без header dashboard */}
      <Outlet />
    </div>
  );
}