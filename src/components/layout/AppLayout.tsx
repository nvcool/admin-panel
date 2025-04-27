import { Outlet } from "react-router";
import { Header } from "../header/Header";

export const AppLayout = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};
