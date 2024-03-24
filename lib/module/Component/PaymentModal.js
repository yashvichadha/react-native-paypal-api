import React, { useContext, useEffect, useRef } from "react";
import { Modal, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { Paypal } from "../Contex/PaypalProvider";
import { apiGet } from "../Service/Services";
import { orderDetails } from "../Service/urls";
const PaymentModal = ({
  WebViewStyle
}) => {
  const orderStatusinterval = useRef();
  const {
    is_Live,
    accessToken,
    OrderID,
    modalOpen,
    setModalOpen,
    webUrl,
    SetPaymentCancel,
    SetPaymentComplete
  } = useContext(Paypal);
  const LIVEURL = "https://api-m.paypal.com"; //live ----
  const DEVURL = "https://api-m.sandbox.paypal.com"; //dev ----
  let URL = is_Live ? LIVEURL : DEVURL;
  //--------------------checking order status for aproval ---------------
  useEffect(() => {
    clearInterval(orderStatusinterval.current);
    orderStatusinterval.current = setInterval(() => {
      modalOpen ? getOrderDetails() : clearInterval(orderStatusinterval.current);
    }, 2000);
    return () => clearInterval(orderStatusinterval.current);
  }, [modalOpen]);

  //-----------------------order status function -----------
  const getOrderDetails = () => {
    let Data = OrderID;
    let header = {
      Authorization: `Bearer ${accessToken}`
    };

    ///----------------api for order details--------
    apiGet(URL + orderDetails + Data, {}, header).then(res => {
      if (res?.status == "APPROVED") {
        setModalOpen(false);
        SetPaymentComplete(true);
      }
    }).catch(err => {
      console.log(err, "Error");
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Modal, {
    visible: modalOpen,
    onRequestClose: () => {
      setModalOpen(false), SetPaymentCancel(true);
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      ...styles.Container,
      ...(typeof WebViewStyle == "object" && WebViewStyle)
    }
  }, /*#__PURE__*/React.createElement(WebView, {
    source: {
      uri: webUrl[0]?.href
    }
  }))));
};
export default PaymentModal;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "red"
  },
  title: {},
  btnStyle: {}
});
//# sourceMappingURL=PaymentModal.js.map