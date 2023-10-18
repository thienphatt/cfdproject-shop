import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleRegister } from "../../store/reducers/authReducer";
import Input from "../Input";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    if (data) {
      const payload = {
        firstName: data.name || "",
        lastName: "",
        email: data.email,
        password: data.password,
      };
      try {
        dispatch(handleRegister(payload));
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  return (
    <div
      className="tab-pane fade show active"
      id="register"
      role="tabpanel"
      aria-labelledby="register-tab"
    >
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Your email address"
          required
          errors={errors.email}
          {...register("email", { required: " Please fill your email" })}
        />
        <Input
          label="Password"
          required
          type="password"
          errors={errors.password}
          {...register("password", { required: " Please fill your password" })}
        />
        {/* End .form-group */}
        <div className="form-footer">
          <button type="submit" className="btn btn-outline-primary-2">
            <span>SIGN UP</span>
            <i className="icon-long-arrow-right" />
          </button>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="register-policy"
              required
            />
            <label className="custom-control-label" htmlFor="register-policy">
              I agree to the
              <a href="privacy-policy.html">privacy policy</a> *
            </label>
          </div>
          {/* End .custom-checkbox */}
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
            <a href="#" className="btn btn-login  btn-f">
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

export default RegisterForm;
