"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiGet = apiGet;
exports.apiPost = apiPost;
exports.apiPut = apiPut;
exports.apiReq = apiReq;
exports.getAuth = exports.createOrder = exports.captureOrder = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _reactNativeQuickBase = require("react-native-quick-base64");
var _urls = require("./urls");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function apiReq(endPoint = "", data = {}, method, headers = {}, requestOptions = {}) {
  return new Promise(async (res, rej) => {
    headers = {
      ...headers
    };
    if (method === "get" || method === "delete") {
      data = {
        ...requestOptions,
        ...data,
        headers
      };
    }
    _axios.default[method](endPoint, data, {
      headers
    }).then(result => {
      const {
        data
      } = result;
      if (data.status === false) {
        return rej(data);
      }
      return res(data);
    }).catch(error => {
      console.log(error);
    });
  });
}
function apiPost(endPoint = "", data, headers = {}) {
  return apiReq(endPoint, data, "post", headers);
}
function apiGet(endPoint = "", data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, "get", headers, requestOptions);
}
function apiPut(endPoint = "", data, headers = {}) {
  return apiReq(endPoint, data, "put", headers);
}

//--------api calling ------

const getAuth = ({
  URL,
  clientId,
  clientSecret
}) => {
  //--------coverting to base64
  let auth = (0, _reactNativeQuickBase.btoa)(`${clientId}${":"}${clientSecret}`);
  let data = `grant_type=client_credentials`;
  let header = {
    Authorization: `Basic ${auth}`
  };
  return new Promise((resolve, reject) => {
    apiPost(URL + _urls.Auth, data, header).then(res => {
      return resolve(res);
    }).catch(err => {
      return reject(err);
    });
  });
};
exports.getAuth = getAuth;
const createOrder = ({
  URL,
  data,
  header
}) => {
  return new Promise((resolve, reject) => {
    apiPost(URL + _urls.CREATEORDER, data, header).then(res => {
      return resolve(res);
    }).catch(err => {
      return reject(err);
    });
  });
};
exports.createOrder = createOrder;
const captureOrder = ({
  URL,
  header,
  orderId
}) => {
  return new Promise((resolve, reject) => {
    apiPost(URL + _urls.CONFIRMORDER + orderId + "/capture", {}, header).then(res => {
      console.log(res, "Response");
      return resolve(res);
    }).catch(err => {
      console.log(err, "Error");
      return reject(err);
    });
  });
};

// export const authorizeOrder = ({orderId, header}: authorizeOrderProps) => {
//   return new Promise<CreateOrderResponse>((resolve, reject) => {
//     apiPost(CONFIRMORDER + orderId + '/authorize', {}, header)
//       .then((res: any) => {
//         console.log(res, 'Response');
//         return resolve(res);
//       })
//       .catch((err: any) => {
//         console.log(err, 'Error');
//         return reject(err);
//       });
//   });
// };
exports.captureOrder = captureOrder;
//# sourceMappingURL=Services.js.map