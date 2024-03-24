import { PaypalProvider } from "./Contex/PaypalProvider";
import usePaypal from "./Hooks/usePaypal";
import type {
  AuthorizationResponse,
  CaptureOrderResponse,
  CreateOrderResponse,
} from "./type";

export { PaypalProvider, usePaypal };
export type {
  AuthorizationResponse,
  CaptureOrderResponse,
  CreateOrderResponse,
};
