"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _PaypalProvider = require("../Contex/PaypalProvider");
var _Services = require("../Service/Services");
const usePaypal = prop => {
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
    SetPaymentCancel
  } = (0, _react.useContext)(_PaypalProvider.Paypal);
  const LIVEURL = "https://api-m.paypal.com"; //live ----
  const DEVURL = "https://api-m.sandbox.paypal.com"; //dev ----
  let URL = is_Live ? LIVEURL : DEVURL;
  let defualtheader = {
    Authorization: `Bearer ${accessToken}`,
    Prefer: "return=representation"
  };
  (0, _react.useEffect)(() => {
    !!PaymentComplete && typeof prop?.OnPaymentSuccess == "function" && prop?.OnPaymentSuccess({
      msg: "Payment success"
    });
    SetPaymentComplete(false);
  }, [PaymentComplete]);
  (0, _react.useEffect)(() => {
    !!paymentCancel && typeof prop?.OnErrors == "function" && prop?.OnErrors({
      msg: "Payment canceled by user"
    });
    SetPaymentCancel(false);
  }, [paymentCancel]);
  const CreateAuth = () => {
    return new Promise((resolve, reject) => {
      (0, _Services.getAuth)({
        URL,
        clientId,
        clientSecret
      }).then(response => {
        return resolve(response);
      }).catch(error => {
        return reject(error);
      });
    });
  };
  const createorder = (data, header) => {
    return new Promise((resolve, reject) => {
      (0, _Services.createOrder)({
        URL,
        data,
        header: {
          ...defualtheader,
          ...header
        }
      }).then(response => {
        SetOrderID(response.id);
        SetWeburl(response?.links.filter(item => item.rel == "approve"));
        setModalOpen(true);
        return resolve(response);
      }).catch(error => {
        return reject(error);
      });
    });
  };
  const captureorder = (header, orderID) => {
    return new Promise((resolve, reject) => {
      (0, _Services.captureOrder)({
        URL,
        header: {
          ...defualtheader,
          ...header
        },
        orderId: orderID ? orderID : OrderID
      }).then(response => {
        return resolve(response);
      }).catch(error => {
        return reject(error);
      });
    });
  };
  const api = {
    CreateAuth,
    createorder,
    captureorder
  };
  return {
    api
  };
};
var _default = exports.default = usePaypal;
//# sourceMappingURL=usePaypal.js.map