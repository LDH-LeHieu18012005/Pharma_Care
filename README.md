# Pharmacy Shop ExpressJS MVC

Dự án website **bán thuốc** xây dựng theo mô hình MVC với ExpressJS.

Cấu trúc: config / constants / middlewares / models / services / controllers / routes / views / public

## Các module chính
- Quản lý **thuốc** (sản phẩm): thêm, sửa, xóa, tìm kiếm
- Quản lý **loại thuốc** (danh mục)
- Quản lý **nhà sản xuất** (brand)
- Quản lý **đơn hàng** và **hóa đơn**
- Quản lý **khuyến mãi**
- Quản lý **người dùng** (admin/staff/khách hàng)
- Nhập kho thuốc
- Thống kê doanh thu

## Cách chạy
1. `npm install`
2. Sao chép `.env.example` thành `.env` và chỉnh lại cấu hình DB
3. `npm run dev`
