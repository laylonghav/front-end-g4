import { AnimatePresence, motion } from "framer-motion";
import { Home, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function Asidebar({ isOpen, setIsOpen, isOpenDesktop, setIsOpenDesktop }) {
  const nav_item = [
    {
      label: "Dashboard",
      to: "/",
      icon: <Home />,
    },
    {
      label: "POS",
      to: "/pos",
      icon: <Home />,
    },

    {
      label: "Supplier",
      to: "/supplier",
      icon: <User />,
    },
    {
      label: "User",
      to: "/user",
      icon: <User />,
    },
  ];
  return (
    <div className="">
      <AnimatePresence>
        {/* Mobile app */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "16rem" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed left-0 h-full w-64 bg-sky-950 z-60"
          >
            <div className="px-5 py-3 border-b border-gray-300 flex justify-end">
              {/* Moblie */}
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="md:hidden p-1 rounded border text-gray-50 hover:text-gray-200 hover:scale-105 cursor-pointer transition-all ease-in duration-300"
              >
                <X />
              </button>
            </div>
            <div className="flex flex-col gap-3 py-2 px-3 text-white">
              {nav_item.map((item, index) => (
                <NavLink
                  className={({ isActive }) =>
                    `p-2 rounded-2xl text-xl flex items-center gap-2 ${isActive ? "bg-blue-500" : ""}`
                  }
                  to={item?.to}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {item?.icon}
                  {item?.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop */}
      <AnimatePresence>
        {isOpenDesktop && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "16rem" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden  fixed left-0 h-full w-64 md:block bg-sky-950"
          >
            <div className="px-5 py-4 border-b text-white border-gray-300 flex justify-center">
              <h1>Admin</h1>
            </div>
            <div className="flex flex-col gap-3 py-2 px-3 text-white">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDesktop, setIsOpenDesktop] = useState(true);

  return (
    <div className=" flex flex-row min-h-screen">
      {/* Asidebar */}
      <Asidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isOpenDesktop={isOpenDesktop}
        setIsOpenDesktop={setIsOpenDesktop}
      />

      {/* Contain */}
      <div
        className={` flex-1 flex flex-col transition-all ease-in duration-300 ${isOpenDesktop ? "md:ml-64" : ""}`}
      >
        <header className="px-5 py-3 bg-gray-400 flex items-center justify-between ">
          {/* Moblie */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className=" z-40 md:hidden p-1 rounded border hover:text-gray-600 hover:scale-105 cursor-pointer transition-all ease-in duration-300"
          >
            <Menu />
          </button>

          {/* Desktop */}
          <button
            onClick={() => {
              setIsOpenDesktop(!isOpenDesktop);
            }}
            className="hidden md:inline-flex p-1  rounded border hover:text-gray-600 hover:scale-105 cursor-pointer transition-all duration-300"
          >
            <Menu />
          </button>

          <h1>Dashboard</h1>
        </header>
        <main className=" flex-1 p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
