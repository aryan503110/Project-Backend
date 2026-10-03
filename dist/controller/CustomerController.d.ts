import type { Request, Response } from "express";
export declare const GetAvailableProductsForCustomer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const ViewProductByIdCustomer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const CreateCheckoutSession: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const CreateOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetMyOrdersByCustomerId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=CustomerController.d.ts.map