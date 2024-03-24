"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactions = exports.orderDetails = exports.captureDetails = exports.CREATEORDER = exports.CONFIRMORDER = exports.Auth = void 0;
const Auth = exports.Auth = '/v1/oauth2/token';
const CREATEORDER = exports.CREATEORDER = '/v2/checkout/orders';
const orderDetails = exports.orderDetails = '/v2/checkout/orders/';
const CONFIRMORDER = exports.CONFIRMORDER = '/v2/checkout/orders/';
const captureDetails = exports.captureDetails = '/v2/payments/captures/';
const transactions = exports.transactions = '/v1/reporting/transactions';
//# sourceMappingURL=urls.js.map