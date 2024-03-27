import { Tabs, message } from "antd";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8080/auth/getNotifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.status) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8080/auth/deleteNotifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.status) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <h1 className="m-3 text-center font-semibold text-colorThree leading-normal tracking-normal text-lg">
        Notifications
      </h1>

      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="flex justify-end">
            <h1
              className="p-2 bg-colorThree cursor-pointer font-normal rounded-md text-center text-white hover:bg-colorOne transition ease-in-out duration-1000"
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </h1>
          </div>

          {user?.notification.map((item) => (
            <div
              className=" flex justify-center items-center text-[16px] mt-2 "
              key={item.message}
            >
              <div onClick={() => navigate(item.onClickPath)}>
                {item.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="flex justify-end mb-2">
            <h1
              className="p-2 bg-colorOne cursor-pointer font-normal rounded-md text-center text-white hover:bg-colorThree transition ease-in-out duration-1000"
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h1>
          </div>
          {user?.seenNotification.map((item) => (
            <div
              className=" flex justify-center items-center text-[16px] mt-2 "
              key={item.message}
            >
              <div onClick={() => navigate(item.onClickPath)}>
                {item.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;
