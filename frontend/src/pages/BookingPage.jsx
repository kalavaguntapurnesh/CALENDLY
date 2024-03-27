import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { DatePicker, TimePicker, message } from "antd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
// import moment from "moment";

const BookingPage = () => {
  const [doctor, setDoctor] = useState([]);
  const params = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/getSingleDoctor",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status) {
        setDoctor(response.data.data);
        // message.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8080/auth/booking-availability",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.status) {
        setIsAvailable(true);
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date and Time Required");
      }
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8080/auth/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.status) {
        message.success(response.data.message);
        navigate("/dashboard");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="m-3 text-center font-semibold text-colorFour leading-normal tracking-normal text-lg">
        Booking Page
      </h1>
      <div className=" flex flex-col items-center justify-center">
        {doctor && (
          <div>
            <div className="flex justify-center items-center mt-2">
              <h1 className="text-center font-bold text-xl text-colorThree">
                {doctor.firstName} {doctor.lastName}
              </h1>
            </div>
            <div className="flex justify-center items-center mt-2">
              <p className="text-md font-semibold text-colorThree">
                {doctor.email}
              </p>
            </div>
            <div className="flex justify-center items-center mt-2">
              <h1 className="text-md font-semibold text-colorThree">
                <span className="font-semibold">Available Timings: </span>{" "}
                {doctor.timingOne} - {doctor.timingTwo}
              </h1>
            </div>
            <div className="flex flex-col">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setIsAvailable(false);
                  setDate(value);
                  console.log(value);
                }}
              />
              {/* <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) => setTimeOne(value)}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) => setTimeTwo(value)}
              /> */}

              <TimePicker
                aria-required={"true"}
                format="HH:mm a"
                className="mx-2"
                onChange={(value) => {
                  var d = new Date(value);
                  setIsAvailable(false);
                  setTime(d.toLocaleTimeString());
                }}
              />
            </div>
            <div className="flex items-center justify-center mt-2">
              <button
                className="p-2 bg-colorThree text-white text-center font-medium rounded-lg w-full m-2"
                onClick={handleAvailability}
              >
                Check Availablity
              </button>
            </div>

            {!isAvailable && (
              <div className="flex items-center justify-center mt-2">
                <button
                  className="p-2 bg-colorThree text-white text-center font-medium rounded-lg w-full m-2"
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
