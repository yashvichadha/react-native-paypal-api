import React, { createContext, useEffect, useMemo, useState } from "react";
import PaymentModal from "../Component/PaymentModal";
import { getAuth } from "../Service/Services";
import type { Provider } from "../type";

const data: any = {};
export const Paypal = createContext(data);

export const PaypalProvider = ({
  children,
  clientId,
  clientSecret,
  isLive = false,
  OnError,
  onSuccess,
}: Provider) => {
  const [state, setState] = useState({
    client_Id: clientId,
    client_Secret: clientSecret,
    is_Live: isLive,
    modalOpen: false,
    accessToken: "",
    OrderID: "",
    paymentCancel: false,
    webUrl: "",
    PaymentComplete: false,
  });
  const {
    client_Id,
    client_Secret,
    is_Live,
    modalOpen,
    accessToken,
    OrderID,
    paymentCancel,
    webUrl,
    PaymentComplete,
  } = state;
  const updateState = (data: any) => setState((prev) => ({ ...prev, ...data }));

  useEffect(() => {
    CheckData();
  }, [clientId, clientSecret]);

  const CheckData = () => {
    if (clientId.trim().length == 0) {
      console.warn("Client id is required ");
    }
    if (clientSecret.trim().length == 0) {
      console.warn("Client secret is required ");
    }
  };

  const DataUpdate = () => {
    if (client_Id != clientId) {
      updateState({ client_Id: clientId });
    }
    if (client_Secret != clientSecret) {
      updateState({ client_Secret: clientSecret });
    }
    if (is_Live != isLive) {
      updateState({ is_Live: isLive });
    }
  };

  useEffect(() => {
    CreateAuth();
  }, []);

  useEffect(() => {
    DataUpdate();
  }, [clientSecret, clientId, isLive]);

  // useEffect(() => {
  //   !!paymentCancel &&
  //     typeof OnError == 'function' &&
  //     OnError({msg: 'Payment canceled by user'});
  //   updateState({paymentCancel: false});
  // }, [paymentCancel]);

  const LIVEURL = "https://api-m.paypal.com"; //live ----
  const DEVURL = "https://api-m.sandbox.paypal.com"; //dev ----
  let URL = !!is_Live ? LIVEURL : DEVURL;

  const CreateAuth = () => {
    getAuth({ URL, clientId, clientSecret })
      .then((res) => {
        typeof onSuccess == "function" && onSuccess(res);
        updateState({ accessToken: res.access_token });
      })
      .catch((err) => {
        typeof OnError == "function" && OnError(err);
      });
  };

  const PaypalContext = useMemo(
    () => ({
      setModalOpen: (meta: any) => {
        updateState({ modalOpen: meta });
      },
      setToken: (meta: any) => {
        updateState({ accessToken: meta });
      },
      SetOrderID: (meta: any) => {
        updateState({ OrderID: meta });
      },
      SetPaymentCancel: (meta: any) => {
        updateState({ paymentCancel: meta });
      },
      SetWeburl: (meta: any) => {
        updateState({ webUrl: meta });
      },
      SetPaymentComplete: (meta: any) => {
        updateState({ PaymentComplete: meta });
      },

      modalOpen: modalOpen,
      accessToken: accessToken,
      OrderID: OrderID,
      paymentCancel: paymentCancel,
      webUrl: webUrl,
      PaymentComplete: PaymentComplete,
    }),
    [state]
  );
  return (
    <Paypal.Provider value={PaypalContext}>
      {children}
      <PaymentModal />
    </Paypal.Provider>
  );
};
