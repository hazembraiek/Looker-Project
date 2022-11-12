import React, { useState } from "react";
import logoIcon from "./../../assets/icons/logo2.png";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/authContext";
import Input from "../../components/input/Input";

function Login() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const validate = Yup.object().shape({
    Email: Yup.string().email("Email is invalid").required("Email is required"),
    Password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  // const { showNotif } = useApiErrorContext();
  const LoginUser = async (values) => {
    const { Email: email, Password: password } = values;
    setLoading(true);
    setError(false);
    const res = await login(email, password);
    if (!res) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <div className="login_logo">
        <img src={logoIcon} alt="error" />
      </div>
      <div className="login__container">
        <div className="login__container-header">
          <p className="title">Log into your Account</p>
          <p className="description">
            Welcome to lissene backoffice, where you can manage all language app
            content.
          </p>
        </div>
        <div className="login__container-form">
          <Formik
            initialValues={{
              Email: "",
              Password: "",
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              LoginUser(values);
            }}
          >
            {(formik) => (
              <div className="formContainer">
                <Form>
                  <Input
                    label="Email Address"
                    name="Email"
                    type="email"
                    placeholder="Enter your email adddress"
                    className={error && "is-invalid"}
                  />
                  <Input
                    label="Password"
                    name="Password"
                    type="password"
                    placeholder="Enter your password"
                    className={error && "is-invalid"}
                  />
                  <div className="button">
                    {error && (
                      <span className="error">
                        *your email or password are incorrect, Try again.
                      </span>
                    )}
                    <button type="submit">
                      {loading ? "..." : "Continue"}
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
