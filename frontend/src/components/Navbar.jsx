import { Link } from "react-router-dom";

export const Navbar = () => {
  const listOfLinks = [
    { to: "/", displayText: "Home" },
    { to: "/login", displayText: "Login" },
    { to: "/register", displayText: "Register" },
  ];
  return (
    <div>
      {listOfLinks.map((elem) => {
        return (
          <Link key={elem.to} to={elem.to}>
            {elem.displayText}
          </Link>
        );
      })}
    </div>
  );
};
