export const STRINGS = {
  // Common
  common: {
    ok: 'OK',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    save: 'Lưu',
    delete: 'Xóa',
    edit: 'Sửa',
    close: 'Đóng',
    loading: 'Đang tải...',
    error: 'Có lỗi xảy ra',
    success: 'Thành công',
    retry: 'Thử lại',
    noData: 'Không có dữ liệu',
  },

  // Home Screen
  home: {
    title: 'Trang chủ',
    searchPlaceholder: 'Tìm kiếm sản phẩm...',
    loading: 'Đang tải sản phẩm...',
    loadingMore: 'Đang tải thêm sản phẩm...',
    noProducts: 'Không có sản phẩm nào',
    errorLoadingProducts: 'Lỗi khi tải danh sách sản phẩm',
    hotProduct: '🔥 Đang bán chạy',
    sold: 'Đã bán',
  },

  // Product
  product: {
    detail: 'Chi tiết sản phẩm',
    price: 'Giá',
    quantity: 'Số lượng',
    addToCart: 'Thêm vào giỏ hàng',
    buyNow: 'Mua ngay',
    description: 'Mô tả',
    reviews: 'Đánh giá',
    specifications: 'Thông số',
  },

  // Cart
  cart: {
    title: 'Giỏ hàng',
    empty: 'Giỏ hàng trống',
    total: 'Tổng cộng',
    checkout: 'Thanh toán',
    remove: 'Xóa khỏi giỏ hàng',
    update: 'Cập nhật',
  },

  // Profile
  profile: {
    title: 'Tài khoản',
    myOrders: 'Đơn hàng của tôi',
    settings: 'Cài đặt',
    logout: 'Đăng xuất',
    editProfile: 'Chỉnh sửa thông tin',
  },

  // Auth
  auth: {
    login: 'Đăng nhập',
    register: 'Đăng ký',
    logout: 'Đăng xuất',
    email: 'Email',
    password: 'Mật khẩu',
    forgotPassword: 'Quên mật khẩu?',
    dontHaveAccount: 'Chưa có tài khoản?',
    alreadyHaveAccount: 'Đã có tài khoản?',
  },

  // Errors
  errors: {
    network: 'Không có kết nối mạng',
    server: 'Lỗi server. Vui lòng thử lại sau',
    unauthorized: 'Phiên đăng nhập hết hạn',
    forbidden: 'Bạn không có quyền truy cập',
    notFound: 'Không tìm thấy dữ liệu',
    validation: 'Vui lòng kiểm tra lại thông tin',
    unknown: 'Có lỗi xảy ra. Vui lòng thử lại',
  },

  // Validation
  validation: {
    required: 'Trường này là bắt buộc',
    email: 'Email không hợp lệ',
    phone: 'Số điện thoại không hợp lệ',
    password: 'Mật khẩu phải có ít nhất 6 ký tự',
    passwordMatch: 'Mật khẩu không khớp',
    min: (min: number) => `Tối thiểu ${min} ký tự`,
    max: (max: number) => `Tối đa ${max} ký tự`,
  },
};

export default STRINGS;
