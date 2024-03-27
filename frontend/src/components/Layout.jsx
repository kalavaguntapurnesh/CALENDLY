import Sidebar from "../components/Sidebar";
import Profile from "../assets/My_Profile.jpg";
import { IoNotifications } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const location = useLocation();

  return (
    <div className="w-full h-screen flex justify-between items-start">
      <Sidebar />
      <section className="w-4/5 grow bg-white h-screen overflow-y-auto flex flex-col justify-start items-center gap-2 p-4 ">
        <section className="w-full bg-slate-50 lg:h-20 h-fit flex lg:flex-row flex-col justify-between items-center p-4 rounded-xl lg:gap-2 gap-4">
          <div className=" lg:w-1/3">
            <h1 className="text-2xl font-semibold tracking-wide text-colorThree">
              Overview
            </h1>
          </div>

          <div className="flex flex-row gap-6">
            <div className="flex justify-center items-center">
              <img
                src={Profile}
                alt=""
                className="w-12 h-12 rounded-full"
                width={100}
                height={100}
              ></img>
            </div>
            <div className="flex justify-center items-center">
              <Badge
                className="cursor-pointer"
                count={user && user?.notification.length}
                onClick={() => {
                  navigate("/notifications");
                }}
              >
                <IoNotifications count className=" w-8 h-6 text-colorThree" />
              </Badge>
            </div>
            <div className="flex justify-center items-center">
              <h1 className="text-xl font-semibold text-colorThree">
                Hello, {user?.username}
              </h1>
            </div>
          </div>
        </section>

        <div className="w-full p-4 bg-gray-50 overflow-y-auto  rounded-xl h-full">
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
