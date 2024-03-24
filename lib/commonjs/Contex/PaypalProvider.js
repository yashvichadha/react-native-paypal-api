"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaypalProvider = exports.Paypal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _PaymentModal = _interopRequireDefault(require("../Component/PaymentModal"));
var _Services = require("../Service/Services");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const data = {};
const Paypal = exports.Paypal = /*#__PURE__*/(0, _react.createContext)(data);
const PaypalProvider = ({
  children,
  clientId,
  clientSecret,
  isLive = false,
  OnError,
  onSuccess
}) => {
  const [state, setState] = (0, _react.useState)({
    client_Id: clientId,
    client_Secret: clientSecret,
    is_Live: isLive,
    modalOpen: false,
    accessToken: "",
    OrderID: "",
    paymentCancel: false,
    webUrl: "",
    PaymentComplete: false
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
    PaymentComplete
  } = state;
  const updateState = data => setState(prev => ({
    ...prev,
    ...data
  }));
  (0, _react.useEffect)(() => {
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
      updateState({
        client_Id: clientId
      });
    }
    if (client_Secret != clientSecret) {
      updateState({
        client_Secret: clientSecret
      });
    }
    if (is_Live != isLive) {
      updateState({
        is_Live: isLive
      });
    }
  };
  (0, _react.useEffect)(() => {
    CreateAuth();
  }, []);
  (0, _react.useEffect)(() => {
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
    (0, _Services.getAuth)({
      URL,
      clientId,
      clientSecret
    }).then(res => {
      typeof onSuccess == "function" && onSuccess(res);
      updateState({
        accessToken: res.access_token
      });
    }).catch(err => {
      typeof OnError == "function" && OnError(err);
    });
  };
  const PaypalContext = (0, _react.useMemo)(() => ({
    setModalOpen: meta => {
      updateState({
        modalOpen: meta
      });
    },
    setToken: meta => {
      updateState({
        accessToken: meta
      });
    },
    SetOrderID: meta => {
      updateState({
        OrderID: meta
      });
    },
    SetPaymentCancel: meta => {
      updateState({
        paymentCancel: meta
      });
    },
    SetWeburl: meta => {
      updateState({
        webUrl: meta
      });
    },
    SetPaymentComplete: meta => {
      updateState({
        PaymentComplete: meta
      });
    },
    modalOpen: modalOpen,
    accessToken: accessToken,
    OrderID: OrderID,
    paymentCancel: paymentCancel,
    webUrl: webUrl,
    PaymentComplete: PaymentComplete
  }), [state]);
  return /*#__PURE__*/_react.default.createElement(Paypal.Provider, {
    value: PaypalContext
  }, children, /*#__PURE__*/_react.default.createElement(_PaymentModal.default, null));
};
exports.PaypalProvider = PaypalProvider;
//# sourceMappingURL=PaypalProvider.js.map