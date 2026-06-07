-- =============================================
-- PHARMACY CARE - DATABASE SCHEMA
-- Dựa theo ERD thiết kế của dự án
-- =============================================

DROP DATABASE IF EXISTS pharmacy_care;
CREATE DATABASE pharmacy_care CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pharmacy_care;

-- =============================================
-- 1. NHÂN VIÊN (Staff)
-- =============================================
CREATE TABLE staff (
    id_staff INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_staff VARCHAR(100) NOT NULL,
    age_staff INT,
    gender_staff ENUM('Nam', 'Nu', 'Khac') DEFAULT 'Nam',
    phone_staff VARCHAR(20),
    address_staff VARCHAR(255),
    gmail_staff VARCHAR(100) UNIQUE,
    start_date DATE,
    permission ENUM('admin', 'staff') DEFAULT 'staff',
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status TINYINT(1) DEFAULT 1 COMMENT '1=active, 0=inactive',
    time_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    images VARCHAR(255)
);

-- =============================================
-- 2. CA LÀM VIỆC (Shifts)
-- =============================================
CREATE TABLE shifts (
    id_shift INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    start_time TIME NOT NULL,
    description VARCHAR(255)
);

-- =============================================
-- 3. PHÂN CÔNG (Assignment)
-- =============================================
CREATE TABLE assignment (
    id_assignment INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_shift INT UNSIGNED NOT NULL,
    id_staff INT UNSIGNED NOT NULL,
    dates DATE NOT NULL,
    time_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_shift) REFERENCES shifts(id_shift),
    FOREIGN KEY (id_staff) REFERENCES staff(id_staff)
);

-- =============================================
-- 4. KHÁCH HÀNG (Customer)
-- =============================================
CREATE TABLE customer (
    id_customer INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_customer VARCHAR(100) NOT NULL,
    age_customer INT,
    gender_customer ENUM('Nam', 'Nu', 'Khac') DEFAULT 'Nam',
    phone_customer VARCHAR(20),
    address_customer VARCHAR(255),
    time_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- 5. LOẠI THUỐC (Medicine type)
-- =============================================
CREATE TABLE medicine_type (
    id_type INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_type VARCHAR(100) NOT NULL UNIQUE,
    descriptions TEXT,
    time_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- 6. KỆ THUỐC (Location rack)
-- =============================================
CREATE TABLE location_rack (
    id_rack INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_rack VARCHAR(100) NOT NULL,
    status TINYINT(1) DEFAULT 1 COMMENT '1=active, 0=inactive',
    time_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    descriptions TEXT
);

-- =============================================
-- 7. LIÊN KẾT KỆ - LOẠI THUỐC (Rack Link Type)
-- =============================================
CREATE TABLE rack_link_type (
    id_medicine_location INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_type INT UNSIGNED NOT NULL,
    id_rack INT UNSIGNED NOT NULL,
    time_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_type) REFERENCES medicine_type(id_type),
    FOREIGN KEY (id_rack) REFERENCES location_rack(id_rack)
);

-- =============================================
-- 8. THUỐC (Medicine)
-- =============================================
CREATE TABLE medicine (
    id_medicine INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_medicine VARCHAR(255) NOT NULL,
    quantity_total INT UNSIGNED DEFAULT 0,
    price DECIMAL(15,2) UNSIGNED NOT NULL,
    medicine_status ENUM('con_hang', 'het_hang', 'ngung_kinh_doanh') DEFAULT 'con_hang',
    id_type INT UNSIGNED NOT NULL,
    id_rack INT UNSIGNED,
    manufacturing_date DATE,
    expiry_date DATE,
    descriptions TEXT,
    time_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    images VARCHAR(255),
    FOREIGN KEY (id_type) REFERENCES medicine_type(id_type),
    FOREIGN KEY (id_rack) REFERENCES location_rack(id_rack)
);

-- =============================================
-- 9. NHÀ CUNG CẤP (Supplier)
-- =============================================
CREATE TABLE supplier (
    id_supplier INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_supplier VARCHAR(255) NOT NULL,
    phone_supplier VARCHAR(20),
    gmail_supplier VARCHAR(100),
    address_supplier VARCHAR(255),
    status TINYINT(1) DEFAULT 1 COMMENT '1=active, 0=inactive',
    time_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- 10. LÔ HÀNG (Batchs)
-- =============================================
CREATE TABLE batchs (
    id_batch INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_medicine INT UNSIGNED NOT NULL,
    quantity_in_batch INT UNSIGNED NOT NULL DEFAULT 0,
    entry_price DECIMAL(15,2) UNSIGNED NOT NULL,
    manufacturing_date DATE,
    expiry_date DATE,
    status ENUM('con_hang', 'het_hang', 'het_han') DEFAULT 'con_hang',
    quantity_shortage INT UNSIGNED DEFAULT 0,
    reason TEXT,
    FOREIGN KEY (id_medicine) REFERENCES medicine(id_medicine)
);

-- =============================================
-- 11. HÓA ĐƠN NHẬP (Purchase invoice)
-- =============================================
CREATE TABLE purchase_invoice (
    id_purchase INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    date_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_supplier INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_supplier) REFERENCES supplier(id_supplier)
);

-- =============================================
-- 12. CHI TIẾT NHẬP (Purchase details)
-- =============================================
CREATE TABLE purchase_details (
    id_purchase INT UNSIGNED NOT NULL,
    id_batch INT UNSIGNED NOT NULL,
    PRIMARY KEY (id_purchase, id_batch),
    FOREIGN KEY (id_purchase) REFERENCES purchase_invoice(id_purchase),
    FOREIGN KEY (id_batch) REFERENCES batchs(id_batch)
);

-- =============================================
-- 13. HÓA ĐƠN BÁN (Sales invoice)
-- =============================================
CREATE TABLE sales_invoice (
    id_sales INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    date_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_staff INT UNSIGNED NOT NULL,
    id_customer INT UNSIGNED NOT NULL,
    status ENUM('cho_xu_ly', 'da_thanh_toan', 'da_huy') DEFAULT 'cho_xu_ly',
    prescription_image VARCHAR(255),
    FOREIGN KEY (id_staff) REFERENCES staff(id_staff),
    FOREIGN KEY (id_customer) REFERENCES customer(id_customer)
);

-- =============================================
-- 14. CHI TIẾT BÁN (Sales details)
-- =============================================
CREATE TABLE sales_details (
    id_sales INT UNSIGNED NOT NULL,
    id_medicine INT UNSIGNED NOT NULL,
    quantity_sales INT UNSIGNED NOT NULL,
    price DECIMAL(15,2) UNSIGNED NOT NULL,
    PRIMARY KEY (id_sales, id_medicine),
    FOREIGN KEY (id_sales) REFERENCES sales_invoice(id_sales),
    FOREIGN KEY (id_medicine) REFERENCES medicine(id_medicine)
);

-- =============================================
-- DỮ LIỆU MẪU BAN ĐẦU
-- =============================================

-- Tài khoản admin mặc định (password: admin123 - đã hash bằng bcrypt)
INSERT INTO staff (name_staff, age_staff, gender_staff, phone_staff, address_staff, gmail_staff, start_date, permission, username, password, status)
VALUES ('Admin', 30, 'Nam', '0901234567', 'TP.HCM', 'admin@pharmacare.com', CURDATE(), 'admin', 'admin', '$2a$10$X7UrE3GnM5XITIM5jZbCleJjQLdq3ql/TnVfGJ6fEHZJQl3WsZ/qK', 1);

-- Tài khoản nhân viên mẫu (password: staff123)
INSERT INTO staff (name_staff, age_staff, gender_staff, phone_staff, address_staff, gmail_staff, start_date, permission, username, password, status)
VALUES ('Nguyen Van A', 25, 'Nam', '0912345678', 'Ha Noi', 'nva@pharmacare.com', CURDATE(), 'staff', 'staff01', '$2a$10$X7UrE3GnM5XITIM5jZbCleJjQLdq3ql/TnVfGJ6fEHZJQl3WsZ/qK', 1);

-- Ca làm việc mẫu
INSERT INTO shifts (start_time, description) VALUES
('07:00:00', 'Ca sáng (07:00 - 14:00)'),
('14:00:00', 'Ca chiều (14:00 - 21:00)'),
('21:00:00', 'Ca tối (21:00 - 07:00)');

-- Loại thuốc mẫu
INSERT INTO medicine_type (name_type, descriptions) VALUES
('Thuốc giảm đau', 'Nhóm thuốc giảm đau, hạ sốt'),
('Thuốc kháng sinh', 'Nhóm thuốc kháng sinh'),
('Thuốc ho', 'Nhóm thuốc trị ho, cảm cúm'),
('Vitamin & Khoáng chất', 'Nhóm vitamin và khoáng chất bổ sung'),
('Thuốc tiêu hóa', 'Nhóm thuốc hỗ trợ tiêu hóa'),
('Thuốc da liễu', 'Nhóm thuốc trị bệnh ngoài da');

-- Kệ thuốc mẫu
INSERT INTO location_rack (name_rack, status, descriptions) VALUES
('Kệ A1', 1, 'Kệ thuốc giảm đau - tầng 1'),
('Kệ A2', 1, 'Kệ thuốc kháng sinh - tầng 1'),
('Kệ B1', 1, 'Kệ thuốc ho - tầng 2'),
('Kệ B2', 1, 'Kệ vitamin - tầng 2'),
('Kệ C1', 1, 'Kệ thuốc tiêu hóa - tầng 3');

-- Liên kết kệ - loại thuốc
INSERT INTO rack_link_type (id_type, id_rack) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5);

-- Nhà cung cấp mẫu
INSERT INTO supplier (name_supplier, phone_supplier, gmail_supplier, address_supplier) VALUES
('Công ty Dược phẩm Hậu Giang', '0291 3891 433', 'info@dhg.com.vn', 'Cần Thơ'),
('Công ty Dược phẩm Traphaco', '024 3853 0764', 'info@traphaco.com.vn', 'Hà Nội'),
('Công ty Dược phẩm Imexpharm', '0277 3822 100', 'info@imexpharm.com', 'Đồng Tháp');

-- Thuốc mẫu
INSERT INTO medicine (name_medicine, quantity_total, price, medicine_status, id_type, id_rack, manufacturing_date, expiry_date, descriptions) VALUES
('Paracetamol 500mg', 200, 5000, 'con_hang', 1, 1, '2025-01-01', '2027-01-01', 'Thuốc giảm đau, hạ sốt'),
('Amoxicillin 500mg', 150, 8000, 'con_hang', 2, 2, '2025-02-01', '2027-02-01', 'Kháng sinh nhóm penicillin'),
('Dextromethorphan 15mg', 100, 12000, 'con_hang', 3, 3, '2025-03-01', '2027-03-01', 'Thuốc trị ho'),
('Vitamin C 1000mg', 300, 15000, 'con_hang', 4, 4, '2025-01-15', '2027-01-15', 'Vitamin C liều cao'),
('Omeprazol 20mg', 180, 10000, 'con_hang', 5, 5, '2025-04-01', '2027-04-01', 'Thuốc trị trào ngược dạ dày'),
('Cetirizine 10mg', 120, 7000, 'con_hang', 1, 1, '2025-05-01', '2027-05-01', 'Thuốc chống dị ứng'),
('Ibuprofen 400mg', 250, 6000, 'con_hang', 1, 1, '2025-03-15', '2027-03-15', 'Thuốc giảm đau, kháng viêm'),
('Azithromycin 250mg', 80, 25000, 'con_hang', 2, 2, '2025-06-01', '2027-06-01', 'Kháng sinh nhóm macrolid');

-- Khách hàng mẫu
INSERT INTO customer (name_customer, age_customer, gender_customer, phone_customer, address_customer) VALUES
('Tran Thi B', 35, 'Nu', '0987654321', 'TP.HCM'),
('Le Van C', 45, 'Nam', '0976543210', 'Ha Noi'),
('Pham Thi D', 28, 'Nu', '0965432109', 'Da Nang');
