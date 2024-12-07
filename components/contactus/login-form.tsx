"use client";
import { FC, useState } from "react";

interface Props {
  classes?: string;
}

const LoginForm: FC<Props> = ({ classes }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneno: "",
    message: "",
  });
  const inputs = [
    {
      title: "Name",
      placeholder: "Enter Your Name",
      type: "string",
      classes: "",
    },
    {
      title: "Email",
      placeholder: "sample@gmail.com",
      type: "email",
      classes: "",
    },
    {
      title: "Phone",
      placeholder: "Enter Your Contact Number",
      type: "number",
      classes: "",
    },
    {
      title: "Message",
      placeholder: "Drop In Your Enquiries",
      type: "string",
      classes: "",
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("form", form);
    // submit form here...
  };

  return (
    <section className="z-10 w-full py-40 bg-black ">
      <div className="mx-auto flex w-full flex-col items-center justify-center">
        <div
          className={`mx-12 w-full rounded-md  bg-zinc-900 text-white shadow-lg md:w-[480px] ${classes}`}
        >
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {inputs.map(({ title, type, placeholder, classes }) => (
                <div key={title}>
                  <label
                    htmlFor={title}
                    className="mb-2 block text-sm font-medium"
                  >
                    {title}
                  </label>
                  <input
                    autoComplete="false"
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    type={type || "text"}
                    //name must be equal to form key
                    name={title}
                    id={title}
                    className={`block w-full rounded-md border border-gray-300 bg-gray-100 p-2.5 text-black outline-none placeholder:text-black/40 focus:ring focus:ring-emerald-400 dark:border-gray-500 dark:bg-gray-300 sm:text-sm ${classes}`}
                    placeholder={placeholder}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full rounded-md bg-emerald-400 px-5 py-2.5 text-center text-sm font-medium text-black outline-none focus:ring focus:ring-gray-800 dark:bg-emerald-600 dark:focus:ring-gray-200"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
