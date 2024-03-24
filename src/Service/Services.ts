import axios from "axios";
import { btoa } from "react-native-quick-base64";
import type {
  Authorization,
  AuthorizationResponse,
  CaptureOrderResponse,
  CreateOrderProps,
  CreateOrderResponse,
  captureOrderProps,
} from "../type";
import { Auth, CONFIRMORDER, CREATEORDER } from "./urls";
type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";
export async function apiReq(
  endPoint = "",
  data = {},
  method: Methods,
  headers = {},
  requestOptions = {}
) {
  return new Promise(async (res, rej) => {
    headers = {
      ...headers,
    };

    if (method === "get" || method === "delete") {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }

    axios[method](endPoint, data, { headers })
      .then((result: any) => {
        const { data } = result;

        if (data.status === false) {
          return rej(data);
        }

        return res(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  });
}

export function apiPost(endPoint = "", data?: any, headers = {}) {
  return apiReq(endPoint, data, "post", headers);
}

export function apiGet(
  endPoint = "",
  data?: any,
  headers = {},
  requestOptions?: any
) {
  return apiReq(endPoint, data, "get", headers, requestOptions);
}

export function apiPut(endPoint = "", data?: any, headers = {}) {
  return apiReq(endPoint, data, "put", headers);
}

//--------api calling ------

export const getAuth = ({ URL, clientId, clientSecret }: Authorization) => {
  //--------coverting to base64
  let auth = btoa(`${clientId}${":"}${clientSecret}`);
  let data = `grant_type=client_credentials`;
  let header = { Authorization: `Basic ${auth}` };

  return new Promise<AuthorizationResponse>((resolve, reject) => {
    apiPost(URL + Auth, data, header)
      .then((res: any) => {
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const createOrder = ({ URL, data, header }: CreateOrderProps) => {
  return new Promise<CreateOrderResponse>((resolve, reject) => {
    apiPost(URL + CREATEORDER, data, header)
      .then((res: any) => {
        return resolve(res);
      })
      .catch((err: any) => {
        return reject(err);
      });
  });
};

export const captureOrder = ({ URL, header, orderId }: captureOrderProps) => {
  return new Promise<CaptureOrderResponse>((resolve, reject) => {
    apiPost(URL + CONFIRMORDER + orderId + "/capture", {}, header)
      .then((res: any) => {
        console.log(res, "Response");
        return resolve(res);
      })
      .catch((err: any) => {
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
