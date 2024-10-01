import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import categoryModel from '../models/categoryModel.js'; 
//create product
export const createProductController = async (req, res) => {
  try {
    const { name,author ,description, price, category, quantity,pagenumber } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
        case !author:
          return res.status(500).send({ error: "Author is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
        case !pagenumber:
        return res.status(500).send({ error: "Pagenumber is Required" });
      case !photo:
        return res.status(500).send({ error: "photo  is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get product
export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success:true,
      countTotal: product.length,
      message:"products",
      product,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error in geting product",
    });
  }
};

//get single product
export const getSingleProduct = async(req,res) =>{
  try {
    const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category');
    res.status(200).send({
      success:true,
      message:"success",
      product,
    })
    
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"error in geting product",
      error,
    })
  }
}
//get photo
export const getProductPhoto = async(req,res)=>{
  try {
    const product = await productModel.findById(req.params.pid).select('photo');
   if(product.photo.data){
    res.set("content-type", product.photo.contentType)
    return res.status(200).send(product.photo.data)
   }   
   else{
    res.status(500).send({
      message:"not found",
    })
   }
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"error getting product photo",
      error,
    })
    
  }
}
//delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
//update product
export const updateProductController = async (req, res) => {
  try {
    const { name,author,description, price, category, quantity ,pagenumber} =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !author:
          return res.status(500).send({ error: "Author is Required" });  
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !pagenumber:
        return res.status(500).send({ error: "pagenumber is Required" });
       case !photo:
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};



// Get products by category
export const getProductsByCategoryController = async (req, res) => {

  const { slug } = req.params;

  try {
    // Find the category by slug
    const category = await categoryModel.findOne({ slug });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find products with the category ID
    const products = await productModel.find({ category: category._id }).populate('category');

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    // Return the products
    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
// get recent products
export const getRecentProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .limit(15) 
      .sort({ createdAt: -1 }); // Sort by creation date in descending order
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "Recent products",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting recent products",
    });
  }
};
const convertSlugToAuthorName = (slug) => slug.replace(/-/g, ' ');

// Get Products by Author
export const getProductsByAuthorController = async (req, res) => {
  const { slug } = req.params;
  try {
    const authorName = convertSlugToAuthorName(slug);
    const products = await productModel.find({ author: new RegExp(`^${authorName}$`, 'i') }).populate('category');
    if (products.length === 0) return res.status(404).json({ message: 'No products found for this author' });
    res.status(200).json({ success: true, message: 'Products retrieved successfully', products });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const getProducBySearchController = async (req, res) => {
  try {
    const { keyword } = req.query; 

    if (!keyword || keyword.length < 2) {
      return res.status(400).json({ message: 'Keyword is required and must be at least 2 characters long' });
    }

   
    const searchQuery = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },      
        { description: { $regex: keyword, $options: 'i' } }
      ]
    }).select('-photo'); 

    res.status(200).json({
      success: true,
      products: searchQuery, 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


