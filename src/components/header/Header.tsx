import { NavLink } from "react-router";
import admin from "../../assets/headerImages/admin-img.svg";
import todo from "../../assets/headerImages/todo-img.svg";
import posts from "../../assets/headerImages/pages-img.svg";
import users from "../../assets/headerImages/users-img.svg";

const links = [
  { label: "admin", link: "/", images: admin },
  { label: "todo", link: "todo", images: todo },
  { label: "posts", link: "posts", images: posts },
  { label: "users", link: "users", images: users },
];

export const Header = () => {
  return (
    <header className="text-xl mb-10 pt-5">
      <nav className="">
        <ul className="flex gap-20 mx-auto bg-white px-10 rounded-xl py-4 w-fit">
          {links.map((link) => {
            return (
              <li
                key={link.link}
                className=" hover:opacity-50 transition-all ease-in ">
                <NavLink className="flex items-center gap-2" to={link.link}>
                  <img src={link.images} alt="" />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
