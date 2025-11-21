import {Navigate, RouteObject,Outlet } from "react-router";
import LandingLayout from "@/layouts/landing";
import { Component } from "./dashboard/utils";
import { Suspense, lazy } from "react";

// export const landingRoutes: RouteObject[] = [
//   {
//     element: <LandingLayout />,
//     children: [
//       { index: true, element: <Navigate to="list" replace /> },
//       { path: "list", element: Component("/pages/landing/ResumeAILanding") },
//     ],
//   },
// ];
export const landingRoutes: RouteObject[] = [
{
  path: "landing",
  element: (
    <LandingLayout>
      {/* <Suspense fallback={<LineLoading />}>
        <Outlet />
      </Suspense> */}
    </LandingLayout>
  ),
  children: [
    { index: true, element: <Navigate to="list" replace /> },
    { path: "list", element: Component("/pages/landing/ResumeAILanding") },
    { path: "list2", element: Component("/pages/landing/ResumeAILanding2") },
    { path: "list3", element: Component("/pages/landing/ResumeAILanding3") },

  ],
}
]