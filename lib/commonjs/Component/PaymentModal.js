"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeWebview = _interopRequireDefault(require("react-native-webview"));
var _PaypalProvider = require("../Contex/PaypalProvider");
var _Services = require("../Service/Services");
var _urls = require("../Service/urls");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PaymentModal = ({
  WebViewStyle
}) => {
  const orderStatusinterval = (0, _react.useRef)();
  const {
    is_Live,
    accessToken,
    OrderID,
    modalOpen,
    setModalOpen,
    webUrl,
    SetPaymentCancel,
    SetPaymentComplete
  } = (0, _react.useContext)(_PaypalProvider.Paypal);
  const LIVEURL = "https://api-m.paypal.com"; //live ----
  const DEVURL = "https://api-m.sandbox.paypal.com"; //dev ----
  let URL = is_Live ? LIVEURL : DEVURL;
  //--------------------checking order status for aproval ---------------
  (0, _react.useEffect)(() => {
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
    (0, _Services.apiGet)(URL + _urls.orderDetails + Data, {}, header).then(res => {
      if (res?.status == "APPROVED") {
        setModalOpen(false);
        SetPaymentComplete(true);
      }
    }).catch(err => {
      console.log(err, "Error");
    });
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: modalOpen,
    onRequestClose: () => {
      setModalOpen(false), SetPaymentCancel(true);
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      ...styles.Container,
      ...(typeof WebViewStyle == "object" && WebViewStyle)
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeWebview.default, {
    source: {
      uri: webUrl[0]?.href
    }
  }))));
};
var _default = exports.default = PaymentModal;
const styles = _reactNative.StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "red"
  },
  title: {},
  btnStyle: {}
});
//# sourceMappingURL=PaymentModal.js.map