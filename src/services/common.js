import axios from "axios";
import { toast } from "react-toastify";
import dataContext from "../Store/DataContext";
import { useContext } from "react";

export const REACT_APP_IP = "192.168.0.189";
// export const REACT_APP_IP = "192.168.0.116";
// export const REACT_APP_IP = "localhost";

const token = JSON.parse(localStorage.getItem("userData"));

export const onGetTemplateHandler = async () => {
const token = JSON.parse(localStorage.getItem("userData"));

  try {
    const response = await axios.post(
      `http://${REACT_APP_IP}:4000/get/templetes`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllUsersHandler = async () => {
const token = JSON.parse(localStorage.getItem("userData"));

  try {
    const response = await axios.post(
      `http://${REACT_APP_IP}:4000/users/getallusers`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const onGetVerifiedUserHandler = async () => {
const token = JSON.parse(localStorage.getItem("userData"));
  // console.log(token)
  if(token){
    try {
      const response = await axios.post(
        `http://${REACT_APP_IP}:4000/users/getuser`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) { 
      console.log(error)
    }  
  }
};

export const onGetAllTasksHandler = async () => {
const token = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.get(
      `http://${REACT_APP_IP}:4000/get/alltasks`,
      {
        headers: {
          token: token,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    // toast.error(error.message);
  }
};

export const onGetTaskHandler = async (id) => {
const token = JSON.parse(localStorage.getItem("userData"));

  try {
    const response = await axios.get(
      `http://${REACT_APP_IP}:4000/get/task/${id}`,
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

