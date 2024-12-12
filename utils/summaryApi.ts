export const baseURL = "http://localhost:8000";

const SummaryApi = {
  register: {
    url: "/api/v1/register",
    method: "post",
  },
  login: {
    url: "/api/v1/login",
    method: "post",
  },
  forgot_password: {
    url: "/api/v1/forgot-password",
    method: "put",
  },
  forgot_password_otp_verification: {
    url: "api/v1/verify-forgot-password-otp",
    method: "put",
  },
  resetPassword: {
    url: "/api/v1/reset-password",
    method: "put",
  },
  refreshToken: {
    url: "api/v1/refresh-token",
    method: "post",
  },
  userDetails: {
    url: "/api/v1/user-details",
    method: "get",
  },
  logout: {
    url: "/api/v1/logout",
    method: "get",
  },
  uploadAvatar: {
    url: "/api/v1/upload-avatar",
    method: "put",
  },
  updateUserDetails: {
    url: "/api/v1/update-user",
    method: "put",
  },
  addCategory: {
    url: "/api/v1/add-category",
    method: "post",
  },
  uploadImage: {
    url: "/api/v1/upload",
    method: "post",
  },
  getCategory: {
    url: "/api/v1/get-category",
    method: "get",
  },
  updateCategory: {
    url: "/api/v1/update-category",
    method: "put",
  },
  deleteCategory: {
    url: "/api/v1/delete-category",
    method: "delete",
  },
  createSubCategory: {
    url: "/api/v1/create-subCategory",
    method: "post",
  },
  getSubCategory: {
    url: "/api/v1/get-subCategory",
    method: "post",
  },
  updateSubCategory: {
    url: "/api/v1/update-subCategory",
    method: "put",
  },
  deleteSubCategory: {
    url: "/api/v1/delete-subCategory",
    method: "delete",
  },
  createProduct: {
    url: "/api/v1/create-product",
    method: "post",
  },
  getProduct: {
    url: "/api/v1/get-product",
    method: "post",
  },
  getProductByCategory: {
    url: "/api/v1/get-product-by-category",
    method: "post",
  },
  getProductByCategoryAndSubCategory: {
    url: "/api/v1/get-pruduct-by-category-and-subcategory",
    method: "post",
  },
  getProductDetails: {
    url: "/api/v1/get-product-details",
    method: "post",
  },
  updateProductDetails: {
    url: "/api/v1/update-product-details",
    method: "put",
  },
  deleteProduct: {
    url: "/api/v1/delete-product",
    method: "delete",
  },
  searchProduct: {
    url: "/api/v1/search-product",
    method: "post",
  },
  addTocart: {
    url: "/api/v1/create-cart",
    method: "post",
  },
  getCartItem: {
    url: "/api/v1/get-cart",
    method: "get",
  },
  updateCartItemQty: {
    url: "/api/v1/update-qty",
    method: "put",
  },
  deleteCartItem: {
    url: "/api/v1/delete-cart-item",
    method: "delete",
  },
  createAddress: {
    url: "/api/v1/create-address",
    method: "post",
  },
  getAddress: {
    url: "/api/v1/get-address",
    method: "get",
  },
  updateAddress: {
    url: "/api/v1/update-address",
    method: "put",
  },
  disableAddress: {
    url: "/api/v1/disable-address",
    method: "delete",
  },
  CashOnDeliveryOrder: {
    url: "/api/v1/cash-on-delivery",
    method: "post",
  },
  payment_url: {
    url: "/api/v1/checkout-order",
    method: "post",
  },
  getOrderItems: {
    url: "/api/v1/order-list",
    method: "get",
  },
};

export default SummaryApi;
