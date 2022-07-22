import Header from "../../components/EventCreationForm/Header";
import { useForm } from "react-hook-form";
import axios from "axios";
import loginStyles from "./loginStyles.module.css";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addUser = (data) => {
    axios
      .post("/api/auth/login", data)
      .then((res) => {
        reset();
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <div className="EventCreationPage container">
      <Header title={"Login"} />
      <div className="row">
        <div className="col-lg-8">
          <div className="EventCreationForm  my-3 py-4 px-5 border shadow rounded">
            <form className="pt-3" onSubmit={handleSubmit(addUser)}>
              <div className="form-group">
                <label>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control m-3 w-75 ${
                    errors.email ? loginStyles.errorInput : ""
                  }`}
                  {...register("email", { required: "Email is required" })}
                ></input>
                {errors.email && (
                  <span className={`${loginStyles.error} w-75`}>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className={`form-control m-3 w-75 ${
                    errors.email ? loginStyles.errorInput : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                ></input>
                {errors.password && (
                  <span className={`${loginStyles.error} w-75`}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group w-75 text-center">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
