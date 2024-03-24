import type { StyleProp, ViewStyle } from "react-native";

export interface Provider {
  children?: any;
  clientId: string;
  clientSecret: string;
  isLive?: boolean;
  PaymentModalProps?: PaymentModalProps;
  OnError?: ((event: any) => void) | undefined;
  onSuccess?: ((event: any) => void) | undefined;
}
export interface ProviderState {
  clientId: string;
  clientSecret: string;
  isLive?: boolean;
  modalOpen?: boolean;
  accessToken?: string;
  OrderID?: string;
  paymentCancel: boolean;
  webUrl: string;
}

export interface PaymentModalProps {
  WebViewStyle?: StyleProp<ViewStyle> | undefined;
}

export interface Authorization {
  URL: string;
  clientId: string;
  clientSecret: string;
}

export interface DynamicProps {
  [key: string]: any;
}

export interface headerProps extends DynamicProps {
  Authorization?: string;
  Prefer?: "return=minimal" | "return=representation";
}

export interface dataProps extends DynamicProps {
  intent: "AUTHORIZE" | "CAPTURE";
  purchase_units: DynamicProps[];
}
export interface CreateOrderProps {
  URL: string;
  header: headerProps;
  data: dataProps;
}

export interface captureOrderProps {
  URL: string;
  header: headerProps;
  orderId: string;
}
export interface authorizeOrderProps {
  header: headerProps;
  orderId: string;
}

export interface usePaypalProps {
  OnPaymentSuccess?: ((event: any) => void) | undefined;
  OnErrors?: ((event: any) => void) | undefined;
}

//response type

export interface AuthorizationResponse {
  scope?: string;
  access_token?: string;
  token_type?: string;
  app_id?: string;
  expires_in?: string;
  nonce?: string;
}
export interface CreateOrderResponse {
  create_time?: string;
  id?: string;
  intent?: string;
  links?: DynamicProps[];
  purchase_units?: DynamicProps[];
  status?: string;
}
export interface CaptureOrderResponse {
  id: string;
  intent: string;
  status: string;
  payment_source: object;
  purchase_units: DynamicProps[];
  payer: object;
  create_time: string;
  update_time: string;
  links: DynamicProps[];
}
