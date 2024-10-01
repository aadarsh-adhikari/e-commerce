import React,{useState,useEffect} from 'react'
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const Updateproduct = () => {
    const navigate = useNavigate();
    const params =useParams()
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
    const [id,setId] =useState("")
    
    //get single product
    const getsingleproduct = async()=>{
      try {    
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/get-product/${params.slug}`
        );
        setName(data.product.name)
        setAuthor(data.product.author)
        setId(data.product._id)
        setCategory(data.product.category._id)
        setDescription(data.product.description)
        setPrice(data.product.price)
        setQuantity(data.product.quantity)
        setPageNumber(data.product.pagenumber)

      
      } catch (error) {
      }
    }
    useEffect(()=>{
      getsingleproduct();
    },[])
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
    useEffect(() => {
      getallCategory();
    }, []);
    
    //update product after submit
    const handleUpdate =async(e) =>{
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
        productData.append("shipping", shipping === "1")
        photo && productData.append("photo", photo);
        const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/product/update-product/${id}`, productData, {
           headers: {
            "Content-Type": "multipart/form-data",
          },
        });
         if(data.success){
          navigate("/dashboard/admin/product")
         }
      
      } catch (error) {
        }
    }
    //delete product
    const deleteProduct = async () => {
      try {
       if(window.confirm("are you sure? you want to delete this product"))
      {
           const { data } = await axios.delete(
          `${import.meta.env.VITE_API_URL}/product/delete-product/${id}`
        );
     if(data.success){
      navigate("/dashboard/admin/product")
     }
      }
      } catch (error) {
      }
    };
    return (
    <div>
 <Layout title="Dashboard - update Product">
      <div className="flex">
        <AdminMenu />
        <div className="w-full font-mono">
          <p> update Product</p>

        <form onSubmit={handleUpdate} >
        <Select
            className="w-[40%] ml-3"
            placeholder="select a categery"
            size="large"
            showSearch
            onChange={(value) => {
              setCategory(value);
            }}
            value={category}
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

          {photo ? (
            <div className="mb-3 ">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                className="object-fit: scale-down; h-48 w-96"
              />
            </div>
          ): 
          <div className="mb-3 ">
          <img
            src={`${import.meta.env.VITE_API_URL}/product/product-photo/${id}`}
            alt="product_photo"
            className="object-fit: scale-down; h-48 w-96"
          />
        </div>}

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
              value={shipping ? "1": "0"}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
            <div>
              <button type="submit" className="rounded px-2 py-2 ml-3 mb-3 text-white hover:bg-blue-400 bg-blue-500" >UPDATE PRODUCT</button>
            </div>
            <div>
              <button type="button" onClick={deleteProduct} className="rounded px-2 py-2 ml-3 mb-3 text-white hover:bg-blue-400 bg-blue-500" >DELETE PRODUCT</button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </Layout>
    </div>
  )
}

export default Updateproduct
