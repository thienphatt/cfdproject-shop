import React from "react";
import { useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../constants/validate";

const ContactForm = ({ submitForm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        submitForm(data);
        reset();
    };
    return (
        <div className="col-lg-6">
            <h2 className="title mb-1">Got Any Questions?</h2>
            <p className="mb-2">
                Use the form below to get in touch with the sales team
            </p>
            <form
                action="#"
                className="contact-form mb-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="row">
                    <div className="col-sm-6">
                        <input
                            className={`form-control ${
                                errors?.name?.message ? "input-error" : ""
                            }`}
                            placeholder="Name"
                            {...register("name", {
                                required: MESSAGE.required,
                            })}
                        />
                        <p className="form-error" style={{ minHeight: 14 }}>
                            {errors?.name?.message}
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <input
                            className={`form-control ${
                                errors?.email?.message ? "input-error" : ""
                            }`}
                            placeholder="Email"
                            {...register("email", {
                                required: MESSAGE.required,
                                pattern: {
                                    message: MESSAGE.email,
                                    value: REGREX.email,
                                },
                            })}
                        />
                        <p className="form-error" style={{ minHeight: 14 }}>
                            {errors?.email?.message}
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <input
                            className={`form-control ${
                                errors?.phone?.message ? "input-error" : ""
                            }`}
                            placeholder="Phone"
                            {...register("phone", {
                                required: MESSAGE.required,
                                pattern: {
                                    message: MESSAGE.phone,
                                    value: REGREX.phone,
                                },
                            })}
                        />
                        <p className="form-error" style={{ minHeight: 14 }}>
                            {errors?.phone?.message}
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <input
                            className={`form-control ${
                                errors?.title?.message ? "input-error" : ""
                            }`}
                            placeholder="Title"
                            {...register("title", {
                                required: MESSAGE.required,
                            })}
                        />
                        <p className="form-error" style={{ minHeight: 14 }}>
                            {errors?.title?.message}
                        </p>
                    </div>
                </div>

                <textarea
                    className={`form-control ${
                        errors?.description?.message ? "input-error" : ""
                    }`}
                    cols={30}
                    rows={4}
                    placeholder="Message"
                    style={{
                        resize: "none",
                    }}
                    {...register("description", {
                        required: MESSAGE.required,
                    })}
                ></textarea>
                <p className="form-error" style={{ minHeight: 14 }}>
                    {errors?.description?.message}
                </p>
                <button
                    type="submit"
                    className="btn btn-outline-primary-2 btn-minwidth-sm"
                >
                    <span>SUBMIT</span>
                    <i className="icon-long-arrow-right" />
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
