import connectToDB from "../db/db.ts";
import User from "../model/User.js";
import type { Request, Response } from "express";
import cloudinary from "../utils/Cloudinary.js";
import Category from "../model/Category.js";
import Product from "../model/Product.js";
import AdminStock from "../model/AdminStock.js";

interface categoryData {
  categoryName: string;
}

interface categoryResponse {
  message: string;
  success: boolean;
}

interface productData {
  name: string;
  description: string;
  categoryId: string;
}

interface productResponse {
  message: string;
  success: boolean;
}

interface adminStockData {
  stock: number;
  purchasePrice: number;
}

interface adminStockResponse {
  message: string;
  success: boolean;
}

{
  /*Salesperson */
}

export const GetAllSalesperson = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const salespersons = await User.find({ role: "salesperson" }).select(
      "-password",
    );

    return res.status(200).json({
      message: "All Salesperson fetched",
      success: true,
      salespersons: salespersons,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching user",
      success: false,
    });
  }
};

export const GetSalesPersonById = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const salesperson = await User.findOne({
      _id: id,
      role: "salesperson",
    }).select("-password");

    if (!salesperson) {
      return res.status(404).json({
        message: "Salesperson not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Salesperson fetched",
      success: true,
      salesperson: salesperson,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching salesperson",
      success: false,
    });
  }
};

export const UpdateSalesPersonById = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { id, name, email } = req.body || {};

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      imageUrl = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        image: imageUrl,
      },
      { new: true },
    );

    return res.status(200).json({
      message: "Salesperson updated",
      success: true,
      user: user,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error updating salesperson",
      success: false,
    });
  }
};

{
  /*Category */
}

export const GetAllCategory = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const categories = await Category.find();

    return res.status(200).json({
      message: "All categories fetched",
      success: true,
      categories: categories,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching categories",
      success: false,
    });
  }
};

export const CreateCategory = async (
  req: Request<{}, {}, categoryData>,
  res: Response<categoryResponse>,
) => {
  try {
    await connectToDB();
    const { categoryName } = req.body;
    const category = await Category.findOne({ categoryName });
    if (category) {
      return res.status(400).json({
        message: "Category already exists",
        success: false,
      });
    }

    const newCategory = new Category({
      categoryName,
    });

    await newCategory.save();

    return res.status(200).json({
      message: "Category Created",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error creating category",
      success: false,
    });
  }
};

export const GetCategoryById = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const category = await Category.findOne({
      _id: id,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category fetched",
      success: true,
      category: category,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching category",
      success: false,
    });
  }
};

export const UpdateCategoryById = async (
  req: Request<{}, {}, categoryData>,
  res: Response<categoryResponse>,
) => {
  try {
    await connectToDB();
    const { id } = req.params;
    const { categoryName } = req.body;
    const category = await Category.findByIdAndUpdate(
      { _id: id },
      {
        categoryName: categoryName,
      },
    );
    if (!category) {
      return res.status(400).json({
        message: "Category does not exists",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Category Updated",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error updating category",
      success: false,
    });
  }
};

export const DeleteCategoryById = async (
  req: Request<{}, {}, categoryData>,
  res: Response<categoryResponse>,
) => {
  try {
    await connectToDB();
    const { id } = req.params;
    const category = await Category.findByIdAndDelete({ _id: id });
    if (!category) {
      return res.status(400).json({
        message: "Category does not exists",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Category Deleted",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error deleting category",
      success: false,
    });
  }
};

{
  /*Product */
}

export const GetAllProduct = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const products = await Product.find().populate("category");

    return res.status(200).json({
      message: "All products fetched",
      success: true,
      products: products,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching products",
      success: false,
    });
  }
};

export const CreateProduct = async (
  req: Request<{}, {}, productData>,
  res: Response<productResponse>,
) => {
  try {
    await connectToDB();

    const { name, description, categoryId } = req.body;

    const product = await Product.findOne({ name });

    if (product) {
      return res.status(400).json({
        message: "Product already exists",
        success: false,
      });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      imageUrl = result.secure_url;
    }

    const newProduct = new Product({
      name,
      description,
      category: categoryId,
      image: imageUrl,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product Created",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error creating product",
      success: false,
    });
  }
};

export const GetProductById = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const product = await Product.findOne({
      _id: id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category fetched",
      success: true,
      product: product,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching product",
      success: false,
    });
  }
};

export const UpdateProductById = async (
  req: Request<{}, {}, productData>,
  res: Response<productResponse>,
) => {
  try {
    await connectToDB();

    const { id } = req.params;
    const { name, description, categoryId } = req.body;

    const updateData: any = {
      name,
      description,
      category: categoryId,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      updateData.image = result.secure_url;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product does not exist",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product Updated",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error updating product",
      success: false,
    });
  }
};

export const DeleteProductById = async (
  req: Request<{}, {}, categoryData>,
  res: Response<categoryResponse>,
) => {
  try {
    await connectToDB();
    const { id } = req.params;
    const product = await Product.findByIdAndDelete({ _id: id });
    if (!product) {
      return res.status(400).json({
        message: "Product does not exists",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product Deleted",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error deleting product",
      success: false,
    });
  }
};

{
  /*Admin Stock */
}

export const CreateAdminStock = async (
  req: Request<{}, {}, adminStockData>,
  res: Response<adminStockResponse>,
) => {
  try {
    await connectToDB();

    const { product, stock, purchasePrice } = req.body;

    const adminStock = await AdminStock.findOne({ product });

    if (adminStock) {
      return res.status(400).json({
        message: "Admin Stock already exists",
        success: false,
      });
    }

    const newAdminStock = new AdminStock({
      product,
      stock,
      purchasePrice,
    });

    await newAdminStock.save();

    return res.status(201).json({
      message: "Admin Stock Created",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error creating admin stock",
      success: false,
    });
  }
};

export const GetAllAdminStock = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const adminstock = await AdminStock.find().populate("product");

    return res.status(200).json({
      message: "All admin stock fetched",
      success: true,
      adminstock: adminstock,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching admin stock",
      success: false,
    });
  }
};

export const DeleteAdminStock = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const adminStock = await AdminStock.findByIdAndDelete(id);

    if (!adminStock) {
      return res.status(404).json({
        message: "Admin stock not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Admin stock deleted successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error deleting admin stock",
      success: false,
    });
  }
};

export const GetAdminStockById = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const adminstock = await AdminStock.findOne({
      _id: id,
    });

    if (!adminstock) {
      return res.status(404).json({
        message: "Admin Stock not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Admin Stock fetched",
      success: true,
      adminstock: adminstock,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching admin stock",
      success: false,
    });
  }
};

export const UpdateAdminStockById = async (
  req: Request<{}, {}, productData>,
  res: Response<productResponse>,
) => {
  try {
    await connectToDB();

    const { id } = req.params;
    const { product, stock, purchasePrice } = req.body;

    const updateData: any = {
      product,
      stock,
      purchasePrice,
    };

    const adminstock = await AdminStock.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!adminstock) {
      return res.status(404).json({
        message: "Admin Stock does not exist",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Admin Stock Updated",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error updating admin stock",
      success: false,
    });
  }
};
