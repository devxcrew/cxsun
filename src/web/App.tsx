import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
} from "@tanstack/react-router";
import { Shell } from "./components/Shell";
import { Overview } from "./pages/Overview";
import { Applications } from "./pages/Applications";
const root = createRootRoute({
  component: () => (
    <Shell>
      <Outlet />
    </Shell>
  ),
});
const routes = [
  createRoute({ getParentRoute: () => root, path: "/", component: Overview }),
  createRoute({ getParentRoute: () => root, path: "/applications", component: Applications }),
  createRoute({
    getParentRoute: () => root,
    path: "/packages",
    component: lazyRouteComponent(() => import("./pages/Packages"), "Packages"),
  }),
  createRoute({
    getParentRoute: () => root,
    path: "/workspace",
    component: lazyRouteComponent(() => import("./pages/Workspace"), "Workspace"),
  }),
];
export const router = createRouter({
  routeTree: root.addChildren(routes),
  defaultNotFoundComponent: () => <p>Page not found.</p>,
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
