# 💊 Pharma Care — Hệ Thống Quản Lý Nhà Thuốc

Phần mềm quản lý nhà thuốc nội bộ chuyên nghiệp, được xây dựng bằng **ExpressJS** (MVC) và **MySQL**.

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy Toàn Bộ (Chi Tiết)

Để ứng dụng hoạt động, bạn cần tuân thủ **tuần tự** các bước sau.

### Bước 1: Khởi động XAMPP (Bật Database)
Hệ thống cần cơ sở dữ liệu MySQL để hoạt động. Nếu MySQL bị tắt, web sẽ báo lỗi 500.

1. Mở phần mềm **XAMPP Control Panel** trên máy tính của bạn (Thường nằm ở `C:\xampp\xampp-control.exe`).
2. Tại dòng **MySQL**, nhấn nút **Start**. 
3. *(Tùy chọn)* Bạn có thể nhấn Start thêm dòng **Apache** nếu muốn dùng giao diện web để quản lý DB (phpMyAdmin).
4. Đợi chữ "MySQL" chuyển sang màu **xanh lá cây** — Vậy là Database đã sẵn sàng!

### Bước 2: Cài đặt thư viện Node.js
Mở terminal/PowerShell tại thư mục chứa dự án `banthuoc` và chạy:
```bash
npm install
```
*(Lệnh này chỉ cần chạy 1 lần duy nhất để tải các thư viện. Mất khoảng 10-20 giây).*

### Bước 3: Nạp Cơ sở dữ liệu (Import Database)
Bạn cần nạp các bảng và dữ liệu mẫu vào MySQL. Chọn **1 trong 2 cách** sau:

**Cách 1: Dùng giao diện phpMyAdmin (Dễ nhất)**
1. Mở trình duyệt web, truy cập: http://localhost/phpmyadmin/
2. Nhấn nút **New** (hoặc Mới) ở cột bên trái để tạo Database.
3. Ô Database name điền: `pharmacy_care` rồi nhấn **Create** (Tạo).
4. Nhấn vào tên database `pharmacy_care` vừa tạo ở cột bên trái.
5. Nhấn vào tab **Import** (Nhập) ở trên cùng.
6. Nhấn nút **Choose File** (Chọn tệp) -> Tìm đến file `database/schema.sql` trong thư mục code của bạn.
7. Cuộn xuống dưới cùng và nhấn **Go** (Thực hiện).
*(Thành công sẽ hiện thông báo màu xanh lá cây).*

**Cách 2: Dùng dòng lệnh (Terminal/PowerShell)**
Mở terminal trong thư mục code và chạy lệnh:
```bash
mysql -u root -p < database/schema.sql
```
*(Hoặc nếu dùng PowerShell chuẩn của Windows: `Get-Content database/schema.sql -Raw | & "C:\xampp\mysql\bin\mysql.exe" -u root`)*

### Bước 4: Khởi chạy Server Node.js
Sau khi Database đã bật và có dữ liệu, hãy chạy ứng dụng:
```bash
npm run dev
```
Terminal sẽ hiện ra dòng chữ: `Server is running at http://localhost:3000`. 
**Lưu ý:** Không tắt cửa sổ Terminal này trong suốt quá trình sử dụng web.

### Bước 5: Đăng nhập và Sử dụng
Mở trình duyệt (Chrome, Cốc Cốc, Edge...) và truy cập:
👉 **http://localhost:3000**

Hệ thống đã chuẩn bị sẵn 2 tài khoản với 2 cấp độ quyền hạn khác nhau để bạn test:

| Quyền Hạn | Username | Password | Ghi chú |
|-----------|----------|----------|---------|
| **Quản lý (Admin)** | `admin` | `admin123` | Thấy toàn bộ menu, thống kê doanh thu, quản lý được nhân viên. |
| **Nhân viên (Staff)**| `staff01` | `admin123` | Chỉ bán hàng, xem kho, quản lý khách. Không xem được thống kê tài chính hay quản lý nhân sự. |

---

## 🛠️ Xử Lý Lỗi Nhanh

* **Lỗi 500 ngay khi vừa đăng nhập:** Do quên chưa bật XAMPP (MySQL). Hãy quay lại Bước 1.
* **Lỗi sai mật khẩu:** Đảm bảo bạn gõ đúng `admin123` (không viết hoa, không dấu cách).
* **Trình duyệt quay vòng vòng:** Kiểm tra lại cửa sổ Terminal chạy `npm run dev` xem có báo lỗi đỏ không.
* **Lỗi 403 (Forbidden):** Bạn đang dùng acc Nhân viên nhưng lại cố truy cập vào đường dẫn/chức năng chỉ dành cho Admin.

---

## 📁 Tính năng chính
* Tự động cộng tồn kho khi **Nhập Lô Hàng**.
* Tự động trừ tồn kho khi **Tạo Hóa Đơn Bán Hàng**.
* Cảnh báo thuốc sắp hết tồn (< 10 hộp) và lô hàng sắp hết hạn (còn < 30 ngày).
* Phân quyền thông minh Admin / Staff trên cùng một hệ thống.
