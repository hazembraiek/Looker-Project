import { Suspense, lazy, useEffect, Fragment } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import MainLayout from "./layouts/mainLayout/mainLayout";

export const RenderRoutes = ({ routes = [] }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  //   console.log(process.env.REACT_APP_BASE_NODE_ENV);
  //   if (process.env.REACT_APP_BASE_NODE_ENV != "development") {
  //     console.log = () => {};
  //   }
  useEffect(() => {
    const url = pathname;
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    if (!user && !isAuthenticated && !publicPaths.includes(path))
      navigate("/login");
    else if ((isAuthenticated && publicPaths.includes(path)) || url == "/") {
      navigate("/dashboard");
    }
  }, [user, isAuthenticated, pathname]);

  return (
    <Suspense
      fallback={
        <div className="spinner">
          <p>loading...</p>
        </div>
      }
    >
      <Routes>
        {routes.map((route, i) => {
          const Layout = route.layout ? route.layout : Fragment;
          const Component = route.component;
          return (
            <Route
              key={i}
              path={route.path}
              index={route.index ? route.index : false}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            >
              {route.routes?.length > 0 &&
                route.routes.map((subRoute, j) => {
                  const Component = subRoute.component;
                  return (
                    <Route
                      path={subRoute.path}
                      index
                      element={<Component />}
                      key={j}
                    />
                  );
                })}
            </Route>
          );
        })}
      </Routes>
    </Suspense>
  );
};

const routes = [
  {
    path: "/dashboard",
    layout: MainLayout,
    component: lazy(() => import("./views/home/home")),
  },
  {
    path: "/login",
    component: lazy(() => import("./views/login/Login")),
  },
  {
    path: "/users",
    layout: MainLayout,
    component: lazy(() => import("./views/users/users")),
  },
  {
    path: "/admins",
    layout: MainLayout,
    component: lazy(() => import("./views/admins/admins")),
  },
  {
    path: "/places",
    layout: MainLayout,
    component: lazy(() => import("./views/places/places")),
  },
  {
    path: "/products",
    layout: MainLayout,
    component: lazy(() => import("./views/products/products")),
  },
  {
    path: "/categories",
    layout: MainLayout,
    component: lazy(() => import("./views/categories/categories")),
  },
  {
    path: "*",
    component: lazy(() => import("./views/notFound/notFound")),
  },
  //   {
  //     index: true,
  //     layout: MainLayout,
  //     path: "/admins",
  //     component: lazy(() => import("./views/admins/Admins")),
  //   },
  //   {
  //     path: "/users",
  //     layout: MainLayout,
  //     component: lazy(() => import("./views/users/Users")),
  //   },
];

export default routes;
