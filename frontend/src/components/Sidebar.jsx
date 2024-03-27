import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { adminMenu, userMenu } from "../Data/data";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const variants = {
  expanded: { width: "20%" },
  nonExpanded: { width: "5%" },
};

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  // console.log(user?.isDoctor);

  const doctorMenu = [
    {
      name: "Home",
      path: "/dashboard",
      icon: FaHome,
    },
    {
      name: "My Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: FaRegUser,
    },
    {
      name: "Appointments ",
      path: "/doctor/appointments",
      icon: MdOutlineTimer,
    },
    {
      name: "LogOut",
      path: "/dashboard",
      icon: MdLogout,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    console.log("Logout Successfully!!!");
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <motion.section
      animate={isExpanded ? "expanded" : "nonExpanded"}
      variants={variants}
      className={
        "w-1/5 bg-slate-50 h-screen gap-10 items-center relative flex flex-col justify-between " +
        (isExpanded ? "py-8 px-6 " : "px-8 py-6")
      }
    >
      <div className="flex flex-col justify-center items-center gap-8 ">
        {isExpanded ? (
          <div id="logo-box">
            <h1 className="text-colorFour lg:text-4xl text-2xl font-bold">
              CALENDLY.
              {/* DEBUG <span className="italic text-yellow-600">ENTITY</span> */}
            </h1>
            <div className="bg-gray-400 w-full h-[0.5px] mt-3"></div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-colorFour font-bold text-3xl">C</h1>
            <span className=" text-colorFour text-3xl">D.</span>
          </div>
        )}

        <div
          id="navlinks-box"
          className="flex flex-col justify-center items-start gap-5 w-full mt-2"
        >
          {SidebarMenu.map((item, index) => (
            <Link
              to={item.path}
              key={item.name}
              id="link-box"
              className={
                "flex items-center gap-4 w-full cursor-pointer lg:justify-start justify-center rounded-xl " +
                (activeNavIndex === index ? " text-black" : "text-colorThree") +
                (isExpanded ? "px-6 py-2" : "p-2")
              }
              onClick={() => setActiveNavIndex(index)}
            >
              <div className="bg-white text-black p-2 rounded-full flex justify-center items-center">
                <item.icon className="md:w-6 w-4 h-4 md:h-6 text-colorThree " />
              </div>

              <div>
                {isExpanded ? (
                  <span className="font-semibold hover:text-colorOne transition duration-1000 ease-in-out text-colorThree">
                    {item?.name}
                  </span>
                ) : (
                  <span className="hidden"></span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div
        id="expanded-icon"
        className="bg-colorThree text-white p-2 rounded-full cursor-pointer absolute -right-4 bottom-20 md:bottom-40 md:flex hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FaArrowRight />
      </div>

      <div
        id="logout-box"
        className="w-full flex flex-col justify-start items-center gap-4 cursor-pointer"
      >
        <div className="bg-gray-700 w-full h-[0.5px]"></div>
        {/* <div className="flex justify-center items-center gap-2">
          <MdLogout className="h-6 w-6 text-black" />
          <span
            className={"text-white text-lg" + (isExpanded ? "flex" : "hidden")}
          >
            LogOut
          </span>
        </div> */}
      </div>
    </motion.section>
  );
};

export default Sidebar;
