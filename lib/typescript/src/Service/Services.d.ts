import type { Authorization, AuthorizationResponse, CaptureOrderResponse, CreateOrderProps, CreateOrderResponse, captureOrderProps } from "../type";
type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";
export declare function apiReq(endPoint: string | undefined, data: {} | undefined, method: Methods, headers?: {}, requestOptions?: {}): Promise<unknown>;
export declare function apiPost(endPoint?: string, data?: any, headers?: {}): Promise<unknown>;
export declare function apiGet(endPoint?: string, data?: any, headers?: {}, requestOptions?: any): Promise<unknown>;
export declare function apiPut(endPoint?: string, data?: any, headers?: {}): Promise<unknown>;
export declare const getAuth: ({ URL, clientId, clientSecret }: Authorization) => Promise<AuthorizationResponse>;
export declare const createOrder: ({ URL, data, header }: CreateOrderProps) => Promise<CreateOrderResponse>;
export declare const captureOrder: ({ URL, header, orderId }: captureOrderProps) => Promise<CaptureOrderResponse>;
export {};
//# sourceMappingURL=Services.d.ts.map