import React from "react";
import { useForm } from "react-hook-form";
import "./ContactForm.css";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(`Thank you, ${data.name}! Your message has been sent.`);
    reset();
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={errors.name ? "input-error" : ""}
            placeholder="Your Name"
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className={errors.email ? "input-error" : ""}
            placeholder="Your Email"
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            {...register("message", { required: "Message is required" })}
            className={errors.message ? "input-error" : ""}
            placeholder="Your Message"
          />
          {errors.message && <span className="error-message">{errors.message.message}</span>}
        </div>
        <button type="submit" className="submit-btn">Send Message</button>
        {isSubmitSuccessful && <div className="success-message">Message sent successfully!</div>}
      </form>
    </div>
  );
};

export default ContactForm; 