import type { Request, Response } from "express";
type Role = "" | "admin" | "salesperson" | "customer";
interface SignUpData {
    name: string;
    email: string;
    password: string;
    role: Role;
}
interface SignUpResponse {
    message: string;
    success: boolean;
}
interface LoginData {
    email: string;
    password: string;
}
interface LoginResponse {
    message: string;
    success: boolean;
    role?: string;
}
interface ForgotPaswordData {
    email: string;
}
interface ForgotPasswordResponse {
    message: string;
    success: boolean;
}
interface VerifyOTPData {
    email: string;
    otp: number;
}
interface VerifyOTPResponse {
    message: string;
    success: boolean;
}
interface ResetPasswordData {
    email: string;
    newPassword: string;
}
interface ResetPassworResponse {
    message: string;
    success: boolean;
}
export declare const SignUp: (req: Request<{}, {}, SignUpData>, res: Response<SignUpResponse>) => Promise<Response<SignUpResponse, Record<string, any>>>;
export declare const Login: (req: Request<{}, {}, LoginData>, res: Response<LoginResponse>) => Promise<Response<LoginResponse, Record<string, any>>>;
export declare const GetUserById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const UpdateUserById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const Logout: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const ForgotPassword: (req: Request<{}, {}, ForgotPaswordData>, res: Response<ForgotPasswordResponse>) => Promise<Response<ForgotPasswordResponse, Record<string, any>>>;
export declare const VerifyOTP: (req: Request<{}, {}, VerifyOTPData>, res: Response<VerifyOTPResponse>) => Promise<Response<VerifyOTPResponse, Record<string, any>>>;
export declare const ResetPassword: (req: Request<{}, {}, ResetPasswordData>, res: Response<ResetPassworResponse>) => Promise<Response<ResetPassworResponse, Record<string, any>>>;
export declare const CreatePremiumCheckoutSession: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const ActivatePremium: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=UserController.d.ts.map