import type { AuthorizationResponse, CaptureOrderResponse, CreateOrderResponse, dataProps, headerProps, usePaypalProps } from "../type";
declare const usePaypal: (prop?: usePaypalProps) => {
    api: {
        CreateAuth: () => Promise<AuthorizationResponse>;
        createorder: (data: dataProps, header?: headerProps) => Promise<CreateOrderResponse>;
        captureorder: (header?: headerProps, orderID?: string) => Promise<CaptureOrderResponse>;
    };
};
export default usePaypal;
//# sourceMappingURL=usePaypal.d.ts.map