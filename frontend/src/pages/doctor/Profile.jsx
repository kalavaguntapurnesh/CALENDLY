import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import Layout from "../../components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useEffect, useState } from "react";
// import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getDoctorInfo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/auth/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [values.timingOne, values.timingTwo],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.status) {
        message.success(res.data.message);
        navigate("/dashboard");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="m-3 text-center font-semibold text-colorThree leading-normal tracking-normal text-lg">
        My Profile
      </h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
            timings: [doctor.timingOne, doctor.timingOne],
          }}
        >
          <h4 className="mt-8 mb-4">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="your website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your experience" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timings" name="timingOne" required>
                <TimePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timings" name="timingTwo" required>
                <TimePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8} className="my-8 ">
              <button
                className="text-white bg-colorThree hover:bg-colorFour duration-1000 ease-in-out transition focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg tracking-wide text-sm w-full sm:w-auto md:px-40 px-24 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
