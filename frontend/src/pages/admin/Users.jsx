import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status) {
        setUsers(response.data.data);
        // console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Interviewer",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="p-2 font-semibold bg-colorFour text-white rounded-lg">
            Block
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="m-3 text-center font-semibold text-colorThree leading-normal tracking-normal text-lg">All Users</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
