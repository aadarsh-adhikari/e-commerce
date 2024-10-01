import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import CreateForm from "../../components/form/createForm";
const Createcatogory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editMode, SeteditMode]= useState(false)
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(editMode){
        const { data } = await axios.put(`REACT_APP_URL/category/update-category/${currentCategory._id}`, { name });
        if (data.success) {
          SeteditMode(false);
          setCurrentCategory(null);
          setName("");
          getallCategory();
        }

      }
      else{
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/category/create-category`,
        { name }
      );
      if (data.success) {
        getallCategory();
      }
    
  }}catch (error) {
      console.log(error);
    }
  };

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
    }
  };
  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/category/delete-category/${id}`
      );
      if (data.success) {
        getallCategory();
      }
    } catch (error) {
    }
  };
  const editCategory =(c)=>{
    setCurrentCategory(c);
    setName(c.name);
    SeteditMode(true) 
  }
  useEffect(() => {
    getallCategory();
  }, []);
  return (
    <Layout title="Dashboard - Create Catogory">
      <div className="flex min-h-screen bg-gray-100">
        <AdminMenu className="w-1/4 p-4 bg-white shadow-md" />
        <div className="flex-1 p-6">
          <CreateForm
            handleSubmit={handleSubmit}
            value={name}
            setvalue={setName}
          />
          <h1 className="text-2xl font-semibold mb-6">Manage Category</h1>
          <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th scope="col" className="border px-4 py-2 text-left">
                  Name
                </th>
                <th scope="col" className="border px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c._id} className="even:bg-gray-100">
                  <td className="border px-4 py-2">{c.name}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => editCategory(c)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(c._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Createcatogory;
