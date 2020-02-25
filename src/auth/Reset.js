import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../core/Layout";
import "react-toastify/dist/ReactToastify.min.css";

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset Password"
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = values;

  const handleChange = event => {
    //
    setValues({
      ...values,
      newPassword: event.target.value
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
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token }
    })
      .then(response => {
        console.log("RESET PASSWORD SUCCESS ", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Done" });
      })
      .catch(error => {
        console.log("RESET PASSWORD Error ", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Reset Password" });
      });
  };

  const passwordResetForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange}
          type="password"
          value={newPassword}
          className="form-control"
          placeholder="Type new Password."
          required
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
        <h1 className="p-5 text-center">Hey {name}, Type your new Password.</h1>
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

export default Reset;
