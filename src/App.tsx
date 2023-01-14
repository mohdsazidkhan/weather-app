import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import MyFavourites from "./MyFavourites";
import Search from "./Search";
import './App.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/search" />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/my-favourites",
    element: <MyFavourites />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
