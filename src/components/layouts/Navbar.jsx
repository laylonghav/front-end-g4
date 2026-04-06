import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import { Box, Home, Menu, User } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const nav_item = [
    {
      label: "Home",
      to: "/",
      icon: <Home />,
    },
    {
      label: "Product",
      to: "/product",
      icon: <Box />,
    },
    {
      label: "About",
      to: "/about",
      icon: <Box />,
    },
    {
      label: "Profile",
      to: "/profile",
      icon: <User />,
    },
  ];
  return (
    <div className="bg-gray-300  sticky top-0 z-50">
      <nav className="px-5 py-3  flex  items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-18">
            <img src={logo} alt="" />
          </div>
          <div className="">
            <div className="">ICT Center</div>
            <div className="">Teacher</div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="md:hidden p-2 rounded border hover:text-gray-600 hover:scale-105 cursor-pointer transition-all duration-300"
        >
          <Menu />
        </button>

        <div className="hidden md:flex flex-row gap-3">
          {nav_item.map((item, index) => (
            <NavLink
              className={({ isActive }) =>
                `p-2 rounded-2xl text-xl flex items-center gap-2 ${isActive ? "bg-blue-500" : ""}`
              }
              to={item?.to}
            >
              {item?.icon}
              {item?.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-3 bg-gray-300 fixed left-0 w-full z-50 py-2 flex flex-col gap-3 md:hidden"
          >
            {nav_item.map((item, index) => (
              <NavLink
                className={({ isActive }) =>
                  `p-2 rounded-2xl text-xl flex items-center gap-2 ${isActive ? "bg-blue-500" : ""}`
                }
                to={item?.to}
              >
                {item?.icon}
                {item?.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
