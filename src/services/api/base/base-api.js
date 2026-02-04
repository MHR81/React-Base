import axios from "axios";
import { store } from "../../../redux/store";
import { showLoading, hideLoading } from "../../../redux/slices/loadingSlice";
import { clearToken } from "../../../redux/slices/authSlice";
import { showToast } from "../../../redux/slices/toastSlice";
import { toastIgnore } from "./toastIgnore";

const BASE_URL = import.meta.env.VITE_API_URL;
const TIMEOUT = 600000;

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = TIMEOUT;

// Helpers
const isMutatingMethod = (method) => ["post", "put", "delete", "patch"].includes(method?.toLowerCase());

const extractMessage = (obj) =>
  obj?.response?.data?.data?.message ||
  obj?.data?.data?.message ||
  obj?.message ||
  obj?.data?.message ||
  obj?.response?.data?.message ||
  obj?.response?.message ||
  "خطایی رخ داده است!";

const getErrorMessageByStatus = (status, data) => {
  switch (status) {
    case 400: return data?.message || "درخواست نامعتبر است";
    case 401: return data?.message || "نشست شما منقضی شده، مجدد وارد شوید";
    case 403: return data?.message || "دسترسی شما محدود شده است";
    case 404: return data?.message || "صفحه یا اطلاعات درخواستی یافت نشد";
    case 422: return data?.message || "اطلاعات ارسالی نامعتبر است";
    case 429: return data?.message || "تعداد درخواست‌ها زیاد است، کمی صبر کنید";
    case 500: return data?.message || "خطای داخلی سرور، لطفاً بعداً تلاش کنید";
    case 502:
    case 503: return data?.message || "سرور در حال حاضر در دسترس نیست";
    case 504: return data?.message || "سرور پاسخ نداد، دوباره تلاش کنید";
    default: return data?.message || `خطای غیرمنتظره (کد: ${status})`;
  }
};

// Request Interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    store.dispatch(showLoading());
    return config;
  },
  (error) => {
    store.dispatch(hideLoading());
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
  (response) => {
    try {
      const method = response.config.method;
      const url = response.config.url;
      if (!toastIgnore.some(u => url.includes(u)) && isMutatingMethod(method)) {
        const message = extractMessage(response) || "عملیات با موفقیت انجام شد";
        store.dispatch(showToast({ type: "success", message }));
      }
    } catch (e) {
      console.error("toast response error:", e);
    } finally {
      store.dispatch(hideLoading());
    }
    return response;
  },
  (error) => {
    store.dispatch(hideLoading());

    if (!error.response) {
      const networkMessage = error.message.includes("Network Error")
        ? "لطفا اتصال اینترنت خود را بررسی کنید"
        : error.message.includes("timeout")
          ? "مهلت زمانی درخواست تمام شد، دوباره تلاش کنید"
          : "خطا در برقراری ارتباط با سرور";

      store.dispatch(showToast({ message: networkMessage, type: "error" }));
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const url = error.config?.url || "";

    if (!toastIgnore.some(u => url.includes(u))) {
      const message = getErrorMessageByStatus(status, data);
      store.dispatch(showToast({ type: "error", message }));
    }

    if ([401, 403].includes(status)) store.dispatch(clearToken());

    return Promise.reject(error);
  }
);

// Request Wrappers
const requests = {
  get: (url) => axios.get(url),
  getByParams: (url, params) => axios.get(url, { params }),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  patch: (url, body) => axios.patch(url, body),
  delete: (url, body) => axios.delete(url, { data: body }),
  postFormData: (url, formData) =>
    axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } }),
  putMedia: (url, body) =>
    axios.put(url, body, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }),
};

export default requests;