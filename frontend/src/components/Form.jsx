import { useRef, useState } from "react";
import axios from "axios";

const Form = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    file: null,
  });
  const fileField = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setValues({ ...values, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("file", values.file);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error", error);
    }

    setValues({ name: "", email: "", password: "", file: null });
    fileField.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          name="name"
          id="floatingName"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        <label htmlFor="floatingName">Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          name="email"
          id="floatingInput"
          placeholder="name@example.com"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          name="password"
          id="floatingPassword"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          name="file"
          ref={fileField}
          onChange={handleFile}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
