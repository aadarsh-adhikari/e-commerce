import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;
const Createproduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pagenumber, setPageNumber] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallCategory();
  }, []);

  //create product after submit
  const handleCreate =async(e) =>{
    e.preventDefault()
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("author", author);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("pagenumber", pagenumber);
      productData.append("shipping", shipping);
      productData.append("photo", photo);
       const {data} = await axios.post("http://localhost:3000/product/create-product", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
       if(data.success){
        console.log("created product")
        navigate("/dashboard/admin/product")
       }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout title="Dashboard - Create Product">
      <div className="flex">
        <AdminMenu />
        <div className="w-full font-mono">
          <p> Create Product</p>

        <form onSubmit={handleCreate} >
        <Select
            className="w-[40%] ml-3"
            placeholder="select a catogery"
            size="large"
            showSearch
            onChange={(value) => {
              setCategory(value);
            }}
          >
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <div className="my-3 ml-3">
            <label className="cursor-pointer rounded border border-blue-700  px-1 py-1 hover:bg-slate-200">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>

          {photo && (
            <div className="mb-3 ">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                className="object-fit: scale-down; h-48 w-96"
              />
            </div>
          )}
          <div className=" flex flex-col gap-3 flex-wrap w-[50%] ">
            <input
              type="text"
              placeholder="enter product name"
              className=" ml-3 border rounded border-gray-400 bg-gray-200 outline-blue-500 px-1 py-1 "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
             <input
              type="text"
              placeholder="enter author name"
              className=" ml-3 border rounded border-gray-400 bg-gray-200 outline-blue-500 px-1 py-1 "
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <textarea
              placeholder="enter description"
              className=" ml-3 border rounded border-gray-400 bg-gray-200 outline-blue-500 px-1 py-1 "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input
              type="number"
              placeholder="enter price"
              className=" ml-3 border rounded border-gray-400 bg-gray-200 outline-blue-500 px-1 py-1 "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="enter quantity"
              className=" ml-3 border rounded border-gray-400 bg-gray-200 outline-blue-500 px-1 py-1 "
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input
              type="number"
              placeholder="enter pagenumber"
              className=" ml-3 border rounded border-gray-400 bg-gray-200 outline-blue-500 px-1 py-1 "
              value={pagenumber}
              onChange={(e) => setPageNumber(e.target.value)}
            />
            <Select
              placeholder="select shiping"
              className="my-3 ml-3"
              size="large"
              showSearch={false} 
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option value="0">No</Option>
              <Option value="1">yes</Option>
            </Select>
            <div>
              <button type="submit" className="rounded px-2 py-2 ml-3 mb-3 text-white hover:bg-blue-400 bg-blue-500" >Submit</button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </Layout>
  );
};

export default Createproduct;
