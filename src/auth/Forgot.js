import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../core/Layout";
import "react-toastify/dist/ReactToastify.min.css";

const Forgot = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    buttonText: "Request Password Reset Link"
  });

  const { email, buttonText } = values;

  const handleChange = name => event => {
    //
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const clickSubmit = event => {
    //
    event.preventDefault();
    setValues({
      ...values,
      buttonText: "Submitting"
    });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email }
    })
      .then(response => {
        console.log("FORGOT PASSWORD SUCCESS ", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "REQUESTED" });
      })
      .catch(error => {
        console.log("FORGOT PASSWORD Error ", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Request Password Reset Link" });
      });
  };

  const passwordForgotForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          value={email}
          className="form-control"
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5 text-center">Forgot Password</h1>
        {passwordForgotForm()}
      </div>
    </Layout>
  );
};

export default Forgot;
