import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
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
          <Input
            label="name"
            placeholder="Name"
            errors={errors}
            {...register("name", { required: "Please fill name" })}
          />
          <Input
            label="Email"
            placeholder="Email"
            errors={errors}
            {...register("Email", { required: "Please fill Email" })}
          />
        </div>
        <div className="row">
          <div className="col-sm-6">
            <input
              label="phone"
              className="form-control"
              placeholder="Phone1"
              errors={errors}
              {...register("phone", { required: true })}
            />
            {/* {errors.phone && <span>This field is required</span>} */}
          </div>
          <div className="col-sm-6">
            <label htmlFor="csubject" className="sr-only">
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              id="csubject"
              placeholder="Subject"
            />
          </div>
        </div>
        <label htmlFor="cmessage" className="sr-only">
          Message
        </label>
        <textarea
          className="form-control"
          cols={30}
          rows={4}
          id="cmessage"
          required
          placeholder="Message *"
          defaultValue={""}
        />
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
