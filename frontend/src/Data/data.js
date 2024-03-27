import { MdLogout } from "react-icons/md";
import { LiaToolsSolid } from "react-icons/lia";
import { FaHome } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export const adminMenu = [
  {
    name: "Home",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    name: "Interviewers",
    path: "/admin/doctors",
    icon: LiaToolsSolid,
  },
  {
    name: "Candidates",
    path: "/admin/users",
    icon: MdOutlineTimer,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: FaRegUser,
  },
];

export const userMenu = [
  {
    name: "Home",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    name: "Apply as Interviewer",
    path: "/apply-doctor",
    icon: LiaToolsSolid,
  },
  {
    name: "User Profile",
    path: "/profile",
    icon: FaRegUser,
  },
  {
    name: "Appointments ",
    path: "/appointments",
    icon: MdOutlineTimer,
  },
  {
    name: "LogOut",
    path: "/dashboard",
    icon: MdLogout,
  },
];
