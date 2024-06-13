import axios from "axios";
import EditForm from "./EditForm";
import { useState } from "react";

const Table = ({ data, onDelete, onEdit }) => {
  const [editData, setEditData] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/signup/${id}`);
      onDelete(id);
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  const handleEdit = (id) => {
    const rowData = data.find(item => item.id === id);
    setEditData(rowData);
  };

  const handleSave = (id, updatedItem) => {
    onEdit(id, updatedItem);
    setEditData(null);
  };

  return (
    <div className="mt-4">
      <h2>Submitted Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((curElem, index) => (
            <tr key={index}>
              <td>{curElem.id}</td>
              <td>{curElem.name}</td>
              <td>{curElem.email}</td>
              <td>{curElem.password}</td>
              <td>
                {curElem.file && (
                  <img
                    src={`http://localhost:8000/uploads/${curElem.file}`}
                    alt="uploaded file"
                    height="60px"
                    width="60px"
                    style={{borderRadius:"50%"}}
                  />
                )}
              </td>
              <td>
                <button className="button-edit" onClick={() => handleEdit(curElem.id)}>Edit</button>
                <button className="button-delete" onClick={() => handleDelete(curElem.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editData && (
        <EditForm
          editingData={editData}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Table;
