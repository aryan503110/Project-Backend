import type { Request, Response } from "express";
interface SalespersonStockData {
    salesperson: string;
    product: string;
    stock: number;
}
interface SalespersonStockResponse {
    message: string;
    success: boolean;
}
export declare const GetAllSalespersonStockRequests: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetAllSalespersonStockRequestsById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const CreateSalespersonStockRequests: (req: Request<{}, {}, SalespersonStockData>, res: Response<SalespersonStockResponse>) => Promise<Response<SalespersonStockResponse, Record<string, any>>>;
export declare const ApproveSalespersonStockRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const RejectSalespersonStockRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const MyStockForSalesperson: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const MyStockForSalespersonById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const UpdateMyStockSalespersonById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetMyOrdersBySalespersonId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const ChangeStatusOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetSalespersonDashboard: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetSalespersonTopProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetSalespersonOrderStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetSalespersonMonthlyRevenue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=SalespersonController.d.ts.map