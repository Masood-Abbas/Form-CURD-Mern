import { useState } from "react";
import axios from "axios";

const EditForm = ({ onSave, editingData }) => {
  const [item, setItem] = useState(editingData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setItem({ ...item, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:8000/api/signup/${item.id}`, item, 
        { headers: {
        'Content-Type': 'multipart/form-data',
      }});
      console.log(res);
      onSave(item.id, item);
    } catch (error) {
      console.log("Error", error);
      if (error.response) {
        console.log("Server response data:", error.response.data);
      }
    }
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
          value={item.name}
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
          value={item.email}
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
          value={item.password}
          onChange={handleChange}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          name="file"
          onChange={handleFile}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditForm;
