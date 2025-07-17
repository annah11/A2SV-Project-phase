import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import "./ContactForm.css";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(`Thanks ${data.name}, message sent! 🌸`);
    console.log(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="contact-container sakura-bg"
    >
      <h2 className="form-title">📮 Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Your Name"
            className="glow-input"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Your Email"
            className="glow-input"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Your Message"
            className="glow-input"
          />
          {errors.message && <p className="error">{errors.message.message}</p>}
        </div>

        <motion.button whileTap={{ scale: 0.95 }} className="submit-button">
          Send ✉️
        </motion.button>
      </form>
    </motion.div>
  );
}
