import type { Request, Response } from "express";
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
    product: string;
    stock: number;
    purchasePrice: number;
}
interface adminStockResponse {
    message: string;
    success: boolean;
}
export declare const GetAllSalesperson: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetSalesPersonById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const UpdateSalesPersonById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetAllCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const CreateCategory: (req: Request<{}, {}, categoryData>, res: Response<categoryResponse>) => Promise<Response<categoryResponse, Record<string, any>>>;
export declare const GetCategoryById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const UpdateCategoryById: (req: Request<{}, {}, categoryData>, res: Response<categoryResponse>) => Promise<Response<categoryResponse, Record<string, any>>>;
export declare const DeleteCategoryById: (req: Request<{}, {}, categoryData>, res: Response<categoryResponse>) => Promise<Response<categoryResponse, Record<string, any>>>;
export declare const GetAllProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const CreateProduct: (req: Request<{}, {}, productData>, res: Response<productResponse>) => Promise<Response<productResponse, Record<string, any>>>;
export declare const GetProductById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const UpdateProductById: (req: Request<{}, {}, productData>, res: Response<productResponse>) => Promise<Response<productResponse, Record<string, any>>>;
export declare const DeleteProductById: (req: Request<{}, {}, categoryData>, res: Response<categoryResponse>) => Promise<Response<categoryResponse, Record<string, any>>>;
export declare const CreateAdminStock: (req: Request<{}, {}, adminStockData>, res: Response<adminStockResponse>) => Promise<Response<adminStockResponse, Record<string, any>>>;
export declare const GetAllAdminStock: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const DeleteAdminStock: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetAdminStockById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const UpdateAdminStockById: (req: Request<{}, {}, adminStockData>, res: Response<adminStockResponse>) => Promise<Response<adminStockResponse, Record<string, any>>>;
export declare const GetAdminDashboard: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetMonthlyRevenue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetOrderStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetTopSellingProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=AdminController.d.ts.map