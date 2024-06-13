import { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";

const TableWrapper = () => {
  const [data, setData] = useState([]);
  
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/signup");
      console.log("Get Data", res.data);
      setData(res.data.data.map((item) => ({ ...item, id: String(item.id) })));
    } catch (error) {
      console.log("Fetch Error", error);
    }
  };
  
  useEffect(() => {
    getUser();
  }, []);

  const onDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = async (id, updatedItem) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/signup/${id}`, updatedItem, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedData = res.data.data; 
      setData(prevData => {
        return prevData.map(item => {
          if (item.id === id) {
            return { ...updatedData, id: String(updatedData.id) };
          }
          return item;
        });
      });
      console.log("Data updated successfully:", updatedData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      {data.length > 0 ? (
        <Table data={data} onDelete={onDelete} onEdit={handleEdit} />
      ) : (
        <p>Data is Empty</p>
      )}
    </>
  );
};

export default TableWrapper;
