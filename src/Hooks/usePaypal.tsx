import { useContext, useEffect } from "react";
import { Paypal } from "../Contex/PaypalProvider";
import { captureOrder, createOrder, getAuth } from "../Service/Services";
import type {
  AuthorizationResponse,
  CaptureOrderResponse,
  CreateOrderResponse,
  dataProps,
  headerProps,
  usePaypalProps,
} from "../type";

const usePaypal = (prop?: usePaypalProps) => {
  const {
    is_Live,
    clientId,
    clientSecret,
    OrderID,
    accessToken,
    SetWeburl,
    SetOrderID,
    setModalOpen,
    SetPaymentComplete,
    PaymentComplete,
    paymentCancel,
    SetPaymentCancel,
  } = useContext(Paypal);

  const LIVEURL = "https://api-m.paypal.com"; //live ----
  const DEVURL = "https://api-m.sandbox.paypal.com"; //dev ----
  let URL = is_Live ? LIVEURL : DEVURL;

  let defualtheader: headerProps = {
    Authorization: `Bearer ${accessToken}`,
    Prefer: "return=representation",
  };

  useEffect(() => {
    !!PaymentComplete &&
      typeof prop?.OnPaymentSuccess == "function" &&
      prop?.OnPaymentSuccess({ msg: "Payment success" });
    SetPaymentComplete(false);
  }, [PaymentComplete]);

  useEffect(() => {
    !!paymentCancel &&
      typeof prop?.OnErrors == "function" &&
      prop?.OnErrors({ msg: "Payment canceled by user" });
    SetPaymentCancel(false);
  }, [paymentCancel]);

  const CreateAuth = () => {
    return new Promise<AuthorizationResponse>((resolve, reject) => {
      getAuth({ URL, clientId, clientSecret })
        .then((response: any) => {
          return resolve(response);
        })
        .catch((error: any) => {
          return reject(error);
        });
    });
  };

  const createorder = (data: dataProps, header?: headerProps) => {
    return new Promise<CreateOrderResponse>((resolve, reject) => {
      createOrder({ URL, data, header: { ...defualtheader, ...header } })
        .then((response: any) => {
          SetOrderID(response.id);
          SetWeburl(
            response?.links.filter(
              (item: { rel: string }) => item.rel == "approve"
            )
          );
          setModalOpen(true);
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  };

  const captureorder = (header?: headerProps, orderID?: string) => {
    return new Promise<CaptureOrderResponse>((resolve, reject) => {
      captureOrder({
        URL,
        header: { ...defualtheader, ...header },
        orderId: orderID ? orderID : OrderID,
      })
        .then((response: any) => {
          return resolve(response);
        })
        .catch((error: any) => {
          return reject(error);
        });
    });
  };

  const api = {
    CreateAuth,
    createorder,
    captureorder,
  };

  return { api };
};

export default usePaypal;
