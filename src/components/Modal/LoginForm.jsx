import React from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/Authcontext";

const LoginForm = () => {
  const { handleLogin } = useAuthContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    handleLogin(data);
  };

  return (
    <div
      className="tab-pane fade show active"
      id="signin"
      role="tabpanel"
      aria-labelledby="signin-tab"
    >
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username or email address"
          required
          errors={errors.email}
          {...register("email", { required: "Please fill in this field" })}
        />
        <Input
          label="Password"
          type="password"
          required
          errors={errors.password}
          {...register("password", { required: "Please fill password" })}
        />
        {/* End .form-group */}
        <div className="form-footer">
          <button type="submit" className="btn btn-outline-primary-2">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </button>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="signin-remember"
            />
            <label className="custom-control-label" htmlFor="signin-remember">
              Remember Me
            </label>
          </div>
          {/* End .custom-checkbox */}
          <a href="#" className="forgot-link">
            Forgot Your Password?
          </a>
        </div>
        {/* End .form-footer */}
      </form>
      <div className="form-choice">
        <p className="text-center">or sign in with</p>
        <div className="row">
          <div className="col-sm-6">
            <a href="#" className="btn btn-login btn-g">
              <i className="icon-google" />
              Login With Google
            </a>
          </div>
          {/* End .col-6 */}
          <div className="col-sm-6">
            <a href="#" className="btn btn-login btn-f">
              <i className="icon-facebook-f" />
              Login With Facebook
            </a>
          </div>
          {/* End .col-6 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .form-choice */}
    </div>
  );
};

export default LoginForm;
