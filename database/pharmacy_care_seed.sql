-- =============================================================
-- SEED DATA: pharmacy_care  (Pharma Care)
-- MySQL 8.0+  |  charset utf8mb4  |  collation utf8mb4_unicode_ci
-- File co the chay lai nhieu lan (re-runnable), khong tat FOREIGN_KEY_CHECKS.
-- =============================================================
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
USE pharmacy_care;

-- ---- 1) XOA DU LIEU CU (thu tu nguoc dependency: con truoc, cha sau) ----
DELETE FROM sales_details;
DELETE FROM purchase_details;
DELETE FROM sales_invoice;
DELETE FROM purchase_invoice;
DELETE FROM assignment;
DELETE FROM batchs;
DELETE FROM rack_link_type;
DELETE FROM shifts;
DELETE FROM customer;
DELETE FROM medicine;
DELETE FROM staff;
DELETE FROM supplier;
DELETE FROM location_rack;
DELETE FROM medicine_type;

-- ---- 2) RESET AUTO_INCREMENT ----
ALTER TABLE medicine_type AUTO_INCREMENT = 1;
ALTER TABLE location_rack AUTO_INCREMENT = 1;
ALTER TABLE supplier AUTO_INCREMENT = 1;
ALTER TABLE staff AUTO_INCREMENT = 1;
ALTER TABLE medicine AUTO_INCREMENT = 1;
ALTER TABLE customer AUTO_INCREMENT = 1;
ALTER TABLE shifts AUTO_INCREMENT = 1;
ALTER TABLE rack_link_type AUTO_INCREMENT = 1;
ALTER TABLE batchs AUTO_INCREMENT = 1;
ALTER TABLE assignment AUTO_INCREMENT = 1;
ALTER TABLE purchase_invoice AUTO_INCREMENT = 1;
ALTER TABLE sales_invoice AUTO_INCREMENT = 1;

-- ---- 3) INSERT medicine_type (10) ----
INSERT INTO medicine_type (id_type, name_type, descriptions, time_create, time_update) VALUES
(1, 'Thuốc giảm đau - hạ sốt', 'Các thuốc giảm đau, hạ sốt thông dụng không kê đơn', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(2, 'Thuốc kháng sinh', 'Các kháng sinh điều trị nhiễm khuẩn, cần thận trọng khi sử dụng', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(3, 'Thuốc ho - cảm cúm', 'Thuốc trị ho, long đờm, giảm triệu chứng cảm cúm', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(4, 'Vitamin & Khoáng chất', 'Thực phẩm bổ sung vitamin và khoáng chất, tăng sức đề kháng', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(5, 'Thuốc tiêu hóa', 'Thuốc điều trị dạ dày, tiêu chảy, men vi sinh, hỗ trợ tiêu hóa', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(6, 'Thuốc tim mạch - huyết áp', 'Thuốc điều trị tăng huyết áp, mỡ máu và bệnh tim mạch', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(7, 'Thuốc dị ứng - chống viêm', 'Thuốc kháng histamin, chống dị ứng và chống viêm', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(8, 'Thuốc thần kinh - an thần', 'Thuốc an thần, hỗ trợ giấc ngủ và hệ thần kinh', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(9, 'Thuốc da liễu (kem bôi, thuốc mỡ)', 'Kem bôi, thuốc mỡ điều trị các bệnh ngoài da', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(10, 'Dụng cụ y tế & vật tư tiêu hao', 'Khẩu trang, băng gạc, cồn sát khuẩn, nhiệt kế và vật tư y tế', '2025-06-01 09:00:00', '2025-06-01 09:00:00');

-- ---- 4) INSERT location_rack (8) ----
INSERT INTO location_rack (id_rack, name_rack, status, descriptions, time_create, time_update) VALUES
(1, 'Kệ A1', 1, 'Khu A - Tầng 1: Thuốc giảm đau, hạ sốt', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(2, 'Kệ A2', 1, 'Khu A - Tầng 2: Thuốc kháng sinh', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(3, 'Kệ B1', 1, 'Khu B - Tầng 1: Thuốc ho, cảm cúm', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(4, 'Kệ B2', 1, 'Khu B - Tầng 2: Vitamin và khoáng chất', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(5, 'Kệ C1', 1, 'Khu C - Tầng 1: Thuốc tiêu hóa, dạ dày', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(6, 'Kệ C2', 1, 'Khu C - Tầng 2: Thuốc tim mạch, huyết áp', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(7, 'Kệ D1', 1, 'Khu D - Tầng 1: Thuốc dị ứng và thần kinh - an thần', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(8, 'Kệ D2', 1, 'Khu D - Tầng 2: Thuốc da liễu và dụng cụ y tế', '2025-06-01 09:00:00', '2025-06-01 09:00:00');

-- ---- 5) INSERT supplier (6) ----
INSERT INTO supplier (id_supplier, name_supplier, phone_supplier, gmail_supplier, address_supplier, status, time_create, time_update) VALUES
(1, 'Công ty Cổ phần Dược Hậu Giang (DHG Pharma)', '02923891433', 'info@dhgpharma.com.vn', '288 Bis Nguyễn Văn Cừ, P. An Hòa, Q. Ninh Kiều, TP. Cần Thơ', 1, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(2, 'Công ty Cổ phần Traphaco', '02435430752', 'info@traphaco.com.vn', '75 Yên Ninh, P. Trúc Bạch, Q. Ba Đình, TP. Hà Nội', 1, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(3, 'Công ty Cổ phần Dược phẩm Imexpharm', '02773853310', 'imexpharm@imexpharm.com', '04 Đường 30/4, P. 1, TP. Cao Lãnh, Tỉnh Đồng Tháp', 1, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(4, 'Công ty TNHH Sanofi Việt Nam', '02838291526', 'contact@sanofi.com.vn', 'Lô I-8-2 Đường D2, KCN Cao, P. Tăng Nhơn Phú B, TP. Thủ Đức, TP. HCM', 1, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(5, 'Công ty Cổ phần Dược Đồng Nai (Donapharm)', '02513822480', 'donapharm@donapharm.vn', '221B Phạm Văn Thuận, P. Tân Tiến, TP. Biên Hòa, Tỉnh Đồng Nai', 1, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(6, 'Công ty Cổ phần OPC Pharmaceutical', '02838752288', 'info@opcpharma.com', '1017 Hồng Bàng, P. 12, Q. 6, TP. Hồ Chí Minh', 1, '2025-06-01 09:00:00', '2025-06-01 09:00:00');

-- ---- 6) INSERT staff (1 admin + 4 staff) | password = bcrypt("123456") ----
INSERT INTO staff (id_staff, name_staff, age_staff, gender_staff, phone_staff, address_staff, gmail_staff, start_date, permission, username, password, status, images, time_create, time_update) VALUES
(1, 'Nguyễn Văn An', 38, 'Nam', '0912345678', '12 Lê Lợi, Q. Hoàn Kiếm, TP. Hà Nội', 'an.nguyen@pharmacare.vn', '2022-01-10', 'admin', 'admin', '$2a$10$yLlWPUZULFEt9M66cdA27.9zwDrMsb1OVYIopaH1gRMzaB5hQwQKy', 1, NULL, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(2, 'Trần Thị Bình', 29, 'Nu', '0987654321', '45 Trần Phú, Q. Hải Châu, TP. Đà Nẵng', 'binh.tran@pharmacare.vn', '2023-03-05', 'staff', 'binhtt', '$2a$10$yLlWPUZULFEt9M66cdA27.9zwDrMsb1OVYIopaH1gRMzaB5hQwQKy', 1, NULL, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(3, 'Lê Hoàng Long', 26, 'Nam', '0978112233', '78 Nguyễn Trãi, Q. Thanh Xuân, TP. Hà Nội', 'long.le@pharmacare.vn', '2023-06-15', 'staff', 'longlh', '$2a$10$yLlWPUZULFEt9M66cdA27.9zwDrMsb1OVYIopaH1gRMzaB5hQwQKy', 1, NULL, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(4, 'Phạm Thị Hương', 33, 'Nu', '0909223344', '102 Hai Bà Trưng, Q. 1, TP. Hồ Chí Minh', 'huong.pham@pharmacare.vn', '2024-01-08', 'staff', 'huongpt', '$2a$10$yLlWPUZULFEt9M66cdA27.9zwDrMsb1OVYIopaH1gRMzaB5hQwQKy', 1, NULL, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(5, 'Võ Minh Tuấn', 31, 'Nam', '0356778899', '210 Lê Hồng Phong, Q. Ngô Quyền, TP. Hải Phòng', 'tuan.vo@pharmacare.vn', '2024-04-20', 'staff', 'tuanvm', '$2a$10$yLlWPUZULFEt9M66cdA27.9zwDrMsb1OVYIopaH1gRMzaB5hQwQKy', 1, NULL, '2025-06-01 09:00:00', '2025-06-01 09:00:00');

-- ---- 7) INSERT medicine (40) | quantity_total = tong lo nhap - so da ban (don da thanh toan/cho xu ly) ----
INSERT INTO medicine (id_medicine, name_medicine, quantity_total, price, medicine_status, id_type, id_rack, manufacturing_date, expiry_date, descriptions, images, time_create, time_update) VALUES
(1, 'Panadol Extra (vỉ 12 viên)', 122, 25000.00, 'con_hang', 1, 1, '2023-01-24', '2026-01-24', 'Giảm đau, hạ sốt nhanh; chứa paracetamol và caffeine.', '/images/products/panadol-extra.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(2, 'Hapacol 650 (hộp 100 viên)', 141, 95000.00, 'con_hang', 1, 1, '2023-04-05', '2025-04-05', 'Paracetamol 650mg giảm đau, hạ sốt cho người lớn.', '/images/products/hapacol-650.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(3, 'Efferalgan 500mg (viên sủi)', 90, 42000.00, 'con_hang', 1, 1, '2023-10-14', '2025-10-14', 'Hạ sốt, giảm đau dạng sủi, dễ hấp thu.', '/images/products/efferalgan-500mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(4, 'Paracetamol Stada 500mg', 190, 12000.00, 'con_hang', 1, 1, '2023-02-07', '2025-02-07', 'Giảm đau, hạ sốt thông thường, không kê đơn.', '/images/products/paracetamol-stada-500mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(5, 'Amoxicillin Stada 500mg', 128, 45000.00, 'con_hang', 2, 2, '2023-09-07', '2026-09-07', 'Kháng sinh nhóm penicillin điều trị nhiễm khuẩn hô hấp.', '/images/products/amoxicillin-stada-500mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(6, 'Augmentin 625mg', 152, 145000.00, 'con_hang', 2, 2, '2023-08-19', '2026-08-19', 'Kháng sinh phối hợp amoxicillin và acid clavulanic.', '/images/products/augmentin-625mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(7, 'Zinnat 500mg (Cefuroxim)', 190, 210000.00, 'con_hang', 2, 2, '2023-03-23', '2026-03-23', 'Kháng sinh cephalosporin thế hệ 2.', '/images/products/zinnat-500mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(8, 'Ciprofloxacin 500mg', 123, 38000.00, 'con_hang', 2, 2, '2024-05-05', '2026-05-05', 'Kháng sinh nhóm quinolon điều trị nhiễm khuẩn tiết niệu.', '/images/products/ciprofloxacin-500mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(9, 'Prospan siro ho 100ml', 253, 95000.00, 'con_hang', 3, 3, '2024-02-03', '2027-02-03', 'Siro ho thảo dược chiết xuất lá thường xuân.', '/images/products/prospan-siro-ho.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(10, 'Bổ phế Nam Hà chỉ khái lộ', 174, 32000.00, 'con_hang', 3, 3, '2023-06-28', '2026-06-28', 'Siro bổ phế trị ho, đau rát họng, khản tiếng.', '/images/products/bo-phe-nam-ha.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(11, 'Decolgen ND (vỉ 4 viên)', 327, 28000.00, 'con_hang', 3, 3, '2024-01-24', '2027-01-24', 'Giảm triệu chứng cảm cúm, nghẹt mũi, sổ mũi.', '/images/products/decolgen-nd.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(12, 'Terpin Codein', 44, 35000.00, 'con_hang', 3, 3, '2023-07-03', '2026-07-03', 'Thuốc giảm ho, long đờm.', '/images/products/terpin-codein.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(13, 'Vitamin C 1000mg (ống sủi)', 48, 55000.00, 'con_hang', 4, 4, '2024-10-07', '2026-10-07', 'Bổ sung vitamin C, tăng sức đề kháng.', '/images/products/vitamin-c-1000mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(14, 'Calcium Corbiere (ống uống)', 200, 88000.00, 'con_hang', 4, 4, '2023-11-08', '2026-11-08', 'Bổ sung canxi dạng ống uống cho mọi lứa tuổi.', '/images/products/calcium-corbiere.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(15, 'Berocca (viên sủi)', 39, 165000.00, 'con_hang', 4, 4, '2023-04-28', '2025-04-28', 'Bổ sung vitamin nhóm B và C dạng sủi.', '/images/products/berocca.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(16, 'Centrum Adults', 95, 320000.00, 'con_hang', 4, 4, '2024-05-15', '2027-05-15', 'Viên đa vitamin và khoáng chất cho người lớn.', '/images/products/centrum-adults.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(17, 'Omeprazol 20mg Stada', 267, 42000.00, 'con_hang', 5, 5, '2023-06-12', '2025-06-12', 'Điều trị viêm loét dạ dày - tá tràng, trào ngược.', '/images/products/omeprazol-20mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(18, 'Smecta hương cam', 92, 68000.00, 'con_hang', 5, 5, '2024-12-22', '2026-12-22', 'Điều trị tiêu chảy cấp và mạn tính.', '/images/products/smecta.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(19, 'Enterogermina (ống uống)', 57, 110000.00, 'con_hang', 5, 5, '2023-09-24', '2025-09-24', 'Men vi sinh cân bằng hệ vi khuẩn đường ruột.', '/images/products/enterogermina.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(20, 'Motilium-M (Domperidon 10mg)', 317, 52000.00, 'con_hang', 5, 5, '2023-08-13', '2026-08-13', 'Điều trị buồn nôn, đầy hơi, khó tiêu.', '/images/products/motilium-m.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(21, 'Amlodipin 5mg Stada', 132, 35000.00, 'con_hang', 6, 6, '2023-11-11', '2025-11-11', 'Điều trị tăng huyết áp và đau thắt ngực.', '/images/products/amlodipin-5mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(22, 'Concor 5mg (Bisoprolol)', 106, 125000.00, 'con_hang', 6, 6, '2023-01-26', '2026-01-26', 'Thuốc chẹn beta điều trị tăng huyết áp, suy tim.', '/images/products/concor-5mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(23, 'Coversyl 5mg (Perindopril)', 234, 175000.00, 'con_hang', 6, 6, '2024-05-03', '2026-05-03', 'Điều trị tăng huyết áp và suy tim mạn tính.', '/images/products/coversyl-5mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(24, 'Lipitor 10mg (Atorvastatin)', 89, 230000.00, 'con_hang', 6, 6, '2024-04-21', '2027-04-21', 'Hạ mỡ máu, giảm cholesterol xấu.', '/images/products/lipitor-10mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(25, 'Telfor 60mg (Fexofenadin)', 151, 48000.00, 'con_hang', 7, 7, '2024-11-15', '2026-11-15', 'Điều trị viêm mũi dị ứng, mày đay.', '/images/products/telfor-60mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(26, 'Zyrtec 10mg (Cetirizin)', 153, 72000.00, 'con_hang', 7, 7, '2024-03-08', '2027-03-08', 'Thuốc chống dị ứng, giảm ngứa, hắt hơi.', '/images/products/zyrtec-10mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(27, 'Loratadin Stada 10mg', 263, 25000.00, 'con_hang', 7, 7, '2024-10-13', '2027-10-13', 'Thuốc kháng histamin điều trị dị ứng.', '/images/products/loratadin-10mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(28, 'Colchicine 1mg', 406, 95000.00, 'con_hang', 7, 7, '2023-03-17', '2026-03-17', 'Điều trị cơn gút cấp và dự phòng gút.', '/images/products/colchicine-1mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(29, 'Magnesi-B6 Corbiere', 180, 60000.00, 'con_hang', 8, 7, '2023-01-28', '2025-01-28', 'Bổ sung magie và vitamin B6, giảm căng thẳng.', '/images/products/magnesi-b6.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(30, 'Rotunda 30mg', 93, 45000.00, 'con_hang', 8, 7, '2023-11-06', '2026-11-06', 'An thần nhẹ, hỗ trợ giấc ngủ.', '/images/products/rotunda-30mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(31, 'Stilnox 10mg (Zolpidem)', 84, 165000.00, 'con_hang', 8, 7, '2023-07-13', '2026-07-13', 'Điều trị mất ngủ ngắn hạn (thuốc kê đơn).', '/images/products/stilnox-10mg.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(32, 'Mimosa (an thần thảo dược)', 362, 38000.00, 'con_hang', 8, 7, '2024-09-28', '2026-09-28', 'Viên an thần thảo dược hỗ trợ giấc ngủ.', '/images/products/mimosa.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(33, 'Gentrisone cream 10g', 56, 42000.00, 'con_hang', 9, 8, '2023-11-18', '2026-11-18', 'Kem bôi điều trị viêm da, nấm da, dị ứng.', '/images/products/gentrisone.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(34, 'Fucidin cream 5g', 161, 78000.00, 'con_hang', 9, 8, '2024-02-10', '2027-02-10', 'Kem kháng khuẩn điều trị nhiễm khuẩn ngoài da.', '/images/products/fucidin.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(35, 'Acyclovir Stada cream 5g', 371, 28000.00, 'con_hang', 9, 8, '2023-08-01', '2026-08-01', 'Kem bôi điều trị mụn rộp do herpes.', '/images/products/acyclovir.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(36, 'Nizoral cream (Ketoconazol) 5g', 203, 65000.00, 'con_hang', 9, 8, '2023-09-04', '2026-09-04', 'Kem trị nấm da, lang ben.', '/images/products/nizoral.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(37, 'Khẩu trang y tế 4 lớp (hộp 50 cái)', 198, 45000.00, 'con_hang', 10, 8, '2023-03-12', '2025-03-12', 'Khẩu trang y tế kháng khuẩn 4 lớp.', '/images/products/khau-trang-y-te.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(38, 'Băng cá nhân Urgo (hộp 100 miếng)', 68, 38000.00, 'con_hang', 10, 8, '2023-10-11', '2026-10-11', 'Băng cá nhân vô trùng băng vết thương nhỏ.', '/images/products/bang-urgo.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(39, 'Cồn 70 độ 60ml', 348, 12000.00, 'con_hang', 10, 8, '2023-02-12', '2026-02-12', 'Cồn sát khuẩn ngoài da.', '/images/products/con-70-do.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(40, 'Nhiệt kế điện tử Microlife', 99, 145000.00, 'con_hang', 10, 8, '2023-01-08', '2025-01-08', 'Nhiệt kế điện tử đo nhiệt độ cơ thể nhanh.', '/images/products/nhiet-ke-microlife.jpg', '2025-06-01 09:00:00', '2025-06-01 09:00:00');

-- ---- 8) INSERT customer (20) ----
INSERT INTO customer (id_customer, name_customer, age_customer, gender_customer, phone_customer, address_customer, time_create, time_update) VALUES
(1, 'Hoàng Văn Hùng', 45, 'Nam', '0905112233', '23 Bạch Đằng, Q. Hải Châu, TP. Đà Nẵng', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(2, 'Nguyễn Thị Lan', 32, 'Nu', '0912334455', '56 Nguyễn Huệ, Q. 1, TP. Hồ Chí Minh', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(3, 'Trần Quốc Bảo', 28, 'Nam', '0788556677', '12 Lý Thường Kiệt, Q. Hoàn Kiếm, TP. Hà Nội', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(4, 'Lê Thị Mai', 60, 'Nu', '0367889900', '89 Trần Hưng Đạo, TP. Nam Định, Tỉnh Nam Định', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(5, 'Phạm Minh Quân', 19, 'Nam', '0934221100', '34 Lê Duẩn, TP. Buôn Ma Thuột, Tỉnh Đắk Lắk', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(6, 'Vũ Thị Hồng', 52, 'Nu', '0901445566', '78 Quang Trung, Q. Hà Đông, TP. Hà Nội', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(7, 'Đặng Văn Thành', 41, 'Nam', '0823667788', '45 Hùng Vương, TP. Huế, Tỉnh Thừa Thiên Huế', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(8, 'Bùi Thị Thu', 35, 'Nu', '0978990011', '67 Phan Đình Phùng, TP. Nha Trang, Tỉnh Khánh Hòa', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(9, 'Đỗ Hoàng Nam', 67, 'Nam', '0356112244', '90 Lê Lợi, Q. Ngô Quyền, TP. Hải Phòng', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(10, 'Ngô Thị Kim', 24, 'Nu', '0911778899', '11 Cách Mạng Tháng 8, Q. 3, TP. Hồ Chí Minh', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(11, 'Dương Văn Tài', 38, 'Nam', '0707334466', '22 Nguyễn Văn Linh, Q. Cái Răng, TP. Cần Thơ', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(12, 'Lý Thị Ngọc', 29, 'Nu', '0902556688', '33 Hai Bà Trưng, TP. Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(13, 'Phan Văn Đức', 55, 'Nam', '0388223355', '44 Lê Thánh Tông, TP. Hạ Long, Tỉnh Quảng Ninh', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(14, 'Trương Thị Hà', 48, 'Nu', '0966112233', '55 Trần Phú, TP. Quy Nhơn, Tỉnh Bình Định', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(15, 'Đinh Quang Huy', 22, 'Nam', '0833445566', '66 Nguyễn Trãi, TP. Thanh Hóa, Tỉnh Thanh Hóa', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(16, 'Cao Thị Yến', 71, 'Nu', '0905998877', '77 Hùng Vương, TP. Pleiku, Tỉnh Gia Lai', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(17, 'Tô Văn Lâm', 33, 'Nam', '0917665544', '88 Lê Lợi, TP. Vinh, Tỉnh Nghệ An', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(18, 'Hồ Thị Bích', 26, 'Nu', '0792334411', '99 Phạm Ngũ Lão, Q. 1, TP. Hồ Chí Minh', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(19, 'Mai Văn Sơn', 44, 'Nam', '0344556677', '100 Nguyễn Du, TP. Biên Hòa, Tỉnh Đồng Nai', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(20, 'Lương Thị Diệu', 75, 'Nu', '0908223344', '101 Trần Quốc Toản, TP. Đà Lạt, Tỉnh Lâm Đồng', '2025-06-01 09:00:00', '2025-06-01 09:00:00');

-- ---- 9) INSERT shifts (3) ----
INSERT INTO shifts (id_shift, start_time, description) VALUES
(1, '07:00:00', 'Ca sáng (07:00 - 13:00)'),
(2, '13:00:00', 'Ca chiều (13:00 - 18:00)'),
(3, '18:00:00', 'Ca tối (18:00 - 22:00)');

-- ---- 10) INSERT rack_link_type (kệ liên kết loại thuốc) ----
INSERT INTO rack_link_type (id_medicine_location, id_type, id_rack, time_create, time_update) VALUES
(1, 1, 1, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(2, 2, 2, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(3, 3, 3, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(4, 4, 4, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(5, 5, 5, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(6, 6, 6, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(7, 7, 7, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(8, 8, 7, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(9, 9, 8, '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(10, 10, 8, '2025-06-01 09:00:00', '2025-06-01 09:00:00');

-- ---- 11) INSERT batchs (60 lô) | entry_price thấp hơn giá bán 20-35% ----
INSERT INTO batchs (id_batch, id_medicine, quantity_in_batch, entry_price, manufacturing_date, expiry_date, status, quantity_shortage, reason) VALUES
(1, 1, 142, 16268.19, '2023-03-06', '2026-03-06', 'con_hang', 0, NULL),
(2, 2, 152, 63180.50, '2023-05-03', '2025-05-03', 'het_han', 0, NULL),
(3, 3, 103, 32184.41, '2023-11-04', '2025-11-04', 'con_hang', 0, NULL),
(4, 4, 190, 8602.94, '2023-03-16', '2025-03-16', 'het_han', 0, NULL),
(5, 5, 41, 35520.80, '2023-10-17', '2025-10-17', 'con_hang', 0, NULL),
(6, 5, 98, 35545.05, '2023-09-09', '2026-09-09', 'con_hang', 0, NULL),
(7, 6, 58, 104817.10, '2023-09-05', '2026-09-05', 'con_hang', 0, NULL),
(8, 6, 94, 104271.66, '2023-10-04', '2026-10-04', 'con_hang', 0, NULL),
(9, 7, 102, 143284.49, '2023-05-13', '2026-05-13', 'con_hang', 0, NULL),
(10, 7, 88, 165028.74, '2023-05-04', '2026-05-04', 'con_hang', 0, NULL),
(11, 8, 130, 27985.60, '2024-06-03', '2026-06-03', 'con_hang', 0, NULL),
(12, 9, 212, 66688.26, '2024-03-15', '2026-03-15', 'con_hang', 0, NULL),
(13, 9, 55, 70262.65, '2024-02-24', '2026-02-24', 'con_hang', 0, NULL),
(14, 10, 103, 24680.37, '2023-08-01', '2026-08-01', 'con_hang', 0, NULL),
(15, 10, 75, 23574.97, '2023-07-15', '2026-07-15', 'con_hang', 0, NULL),
(16, 11, 103, 18727.16, '2024-01-28', '2027-01-28', 'con_hang', 0, NULL),
(17, 11, 246, 18782.33, '2024-02-28', '2026-02-28', 'con_hang', 0, NULL),
(18, 12, 52, 24576.24, '2023-08-06', '2025-08-06', 'con_hang', 0, NULL),
(19, 13, 63, 36357.47, '2024-11-30', '2026-11-28', 'con_hang', 0, NULL),
(20, 14, 82, 65035.33, '2023-12-08', '2025-12-08', 'con_hang', 0, NULL),
(21, 14, 142, 58487.75, '2023-11-18', '2026-11-18', 'con_hang', 0, NULL),
(22, 15, 40, 107613.61, '2023-05-14', '2026-05-14', 'con_hang', 0, NULL),
(23, 16, 113, 235695.64, '2024-06-30', '2027-06-28', 'con_hang', 0, NULL),
(24, 17, 79, 32403.64, '2023-06-25', '2025-06-25', 'con_hang', 0, NULL),
(25, 17, 188, 28964.86, '2023-06-15', '2026-06-15', 'con_hang', 0, NULL),
(26, 18, 54, 53888.55, '2025-01-21', '2027-01-21', 'con_hang', 0, NULL),
(27, 18, 54, 44600.06, '2024-12-27', '2026-12-27', 'con_hang', 0, NULL),
(28, 19, 57, 78181.92, '2023-11-06', '2025-11-06', 'con_hang', 0, NULL),
(29, 20, 143, 40664.88, '2023-10-08', '2025-10-08', 'con_hang', 0, NULL),
(30, 20, 188, 36962.75, '2023-09-21', '2025-09-21', 'con_hang', 0, NULL),
(31, 21, 147, 24548.79, '2023-12-17', '2026-12-17', 'con_hang', 0, NULL),
(32, 22, 106, 96170.14, '2023-03-12', '2026-03-12', 'con_hang', 0, NULL),
(33, 23, 101, 133027.62, '2024-05-11', '2027-05-11', 'con_hang', 0, NULL),
(34, 23, 157, 131700.35, '2024-06-20', '2026-06-20', 'con_hang', 0, NULL),
(35, 24, 42, 168189.15, '2024-05-27', '2026-05-27', 'con_hang', 0, NULL),
(36, 24, 58, 165451.61, '2024-05-23', '2027-05-23', 'con_hang', 0, NULL),
(37, 25, 73, 31680.53, '2025-01-10', '2027-01-10', 'con_hang', 0, NULL),
(38, 25, 102, 35739.40, '2024-11-25', '2027-11-25', 'con_hang', 0, NULL),
(39, 26, 179, 50001.77, '2024-04-16', '2026-04-16', 'con_hang', 0, NULL),
(40, 27, 210, 16935.86, '2024-11-01', '2026-11-01', 'con_hang', 0, NULL),
(41, 27, 74, 19008.25, '2024-12-08', '2026-12-08', 'con_hang', 0, NULL),
(42, 28, 230, 68116.56, '2023-04-03', '2026-04-03', 'con_hang', 0, NULL),
(43, 28, 194, 72998.53, '2023-04-07', '2025-04-07', 'het_han', 0, NULL),
(44, 29, 215, 42291.86, '2023-02-13', '2026-02-13', 'con_hang', 0, NULL),
(45, 30, 104, 29888.98, '2023-12-30', '2025-12-28', 'con_hang', 0, NULL),
(46, 31, 63, 116301.46, '2023-09-04', '2026-09-04', 'con_hang', 0, NULL),
(47, 31, 51, 131912.24, '2023-08-31', '2025-08-28', 'con_hang', 0, NULL),
(48, 32, 203, 24815.15, '2024-10-08', '2027-10-08', 'con_hang', 0, NULL),
(49, 32, 181, 26377.70, '2024-11-02', '2026-11-02', 'con_hang', 0, NULL),
(50, 33, 68, 33125.96, '2024-01-13', '2026-01-13', 'con_hang', 0, NULL),
(51, 34, 179, 61978.47, '2024-03-04', '2026-03-04', 'con_hang', 0, NULL),
(52, 35, 150, 21864.73, '2023-08-20', '2026-08-20', 'con_hang', 0, NULL),
(53, 35, 243, 18316.78, '2023-08-03', '2026-08-03', 'con_hang', 0, NULL),
(54, 36, 93, 45349.85, '2023-10-16', '2025-10-16', 'con_hang', 0, NULL),
(55, 36, 130, 44393.87, '2023-10-30', '2026-10-28', 'con_hang', 0, NULL),
(56, 37, 198, 30941.03, '2023-05-10', '2025-05-10', 'het_han', 0, NULL),
(57, 38, 81, 24835.63, '2023-12-01', '2025-12-01', 'con_hang', 0, NULL),
(58, 39, 145, 9555.38, '2023-03-31', '2026-03-28', 'con_hang', 0, NULL),
(59, 39, 240, 7924.53, '2023-04-04', '2025-04-04', 'het_han', 0, NULL),
(60, 40, 108, 112537.45, '2023-02-21', '2025-02-21', 'het_han', 0, NULL);

-- ---- 12) INSERT assignment (30 phân công) | tháng 5-6/2025 ----
INSERT INTO assignment (id_assignment, id_shift, id_staff, dates, time_create, time_update) VALUES
(1, 2, 5, '2025-05-01', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(2, 3, 3, '2025-05-01', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(3, 1, 3, '2025-05-03', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(4, 1, 5, '2025-05-03', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(5, 1, 1, '2025-05-04', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(6, 1, 2, '2025-05-04', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(7, 1, 5, '2025-05-06', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(8, 1, 3, '2025-05-06', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(9, 1, 3, '2025-05-08', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(10, 1, 5, '2025-05-10', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(11, 3, 1, '2025-05-12', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(12, 1, 4, '2025-05-14', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(13, 2, 4, '2025-05-15', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(14, 2, 5, '2025-05-15', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(15, 2, 3, '2025-05-16', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(16, 2, 4, '2025-05-17', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(17, 1, 2, '2025-05-18', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(18, 1, 2, '2025-05-20', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(19, 2, 5, '2025-05-22', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(20, 2, 3, '2025-05-24', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(21, 3, 4, '2025-05-24', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(22, 3, 2, '2025-05-25', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(23, 1, 1, '2025-05-26', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(24, 1, 2, '2025-05-26', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(25, 2, 1, '2025-05-27', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(26, 1, 3, '2025-05-29', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(27, 2, 1, '2025-05-29', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(28, 2, 1, '2025-05-31', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(29, 3, 2, '2025-05-31', '2025-06-01 09:00:00', '2025-06-01 09:00:00'),
(30, 3, 1, '2025-06-01', '2025-06-01 09:00:00', '2025-06-01 09:00:00');

-- ---- 13) INSERT purchase_invoice (15 hóa đơn nhập) | tháng 1-6/2025 ----
INSERT INTO purchase_invoice (id_purchase, date_create, id_supplier) VALUES
(1, '2025-01-14 11:30:00', 5),
(2, '2025-02-03 12:30:00', 6),
(3, '2025-05-05 09:00:00', 6),
(4, '2025-03-03 10:30:00', 5),
(5, '2025-01-04 16:30:00', 1),
(6, '2025-02-27 09:30:00', 1),
(7, '2025-02-09 15:30:00', 5),
(8, '2025-03-11 14:30:00', 4),
(9, '2025-03-04 15:00:00', 4),
(10, '2025-02-18 17:00:00', 1),
(11, '2025-03-12 14:30:00', 5),
(12, '2025-03-10 08:30:00', 6),
(13, '2025-03-18 17:30:00', 2),
(14, '2025-04-25 16:30:00', 3),
(15, '2025-03-27 16:30:00', 4);

-- ---- 14) INSERT purchase_details (liên kết hóa đơn nhập <-> lô hàng) ----
INSERT INTO purchase_details (id_purchase, id_batch) VALUES
(1, 36),
(1, 43),
(1, 39),
(1, 17),
(1, 47),
(2, 5),
(2, 45),
(2, 41),
(2, 33),
(3, 8),
(3, 26),
(3, 24),
(3, 1),
(4, 19),
(4, 30),
(4, 25),
(4, 4),
(4, 20),
(5, 9),
(5, 46),
(6, 52),
(6, 15),
(6, 58),
(7, 56),
(7, 13),
(7, 35),
(7, 10),
(8, 16),
(8, 55),
(8, 14),
(8, 40),
(8, 11),
(9, 7),
(9, 21),
(9, 22),
(9, 27),
(9, 23),
(10, 48),
(10, 6),
(10, 32),
(10, 28),
(11, 59),
(11, 50),
(11, 54),
(12, 29),
(12, 42),
(12, 34),
(12, 31),
(12, 12),
(13, 51),
(13, 57),
(13, 3),
(14, 60),
(14, 18),
(14, 53),
(14, 44),
(14, 49),
(15, 2),
(15, 38),
(15, 37);

-- ---- 15) INSERT sales_invoice (30 hóa đơn bán) | tháng 3-6/2025 ----
INSERT INTO sales_invoice (id_sales, date_create, id_staff, id_customer, status, prescription_image) VALUES
(1, '2025-03-05 09:45:00', 3, 11, 'da_thanh_toan', NULL),
(2, '2025-03-06 19:45:00', 1, 17, 'da_thanh_toan', NULL),
(3, '2025-04-12 17:30:00', 1, 10, 'da_thanh_toan', NULL),
(4, '2025-03-17 11:45:00', 4, 6, 'da_thanh_toan', NULL),
(5, '2025-04-25 20:30:00', 4, 15, 'da_thanh_toan', NULL),
(6, '2025-05-24 18:30:00', 1, 8, 'da_thanh_toan', NULL),
(7, '2025-04-30 17:00:00', 4, 14, 'da_thanh_toan', NULL),
(8, '2025-03-19 18:00:00', 1, 14, 'cho_xu_ly', NULL),
(9, '2025-05-11 11:00:00', 4, 5, 'da_thanh_toan', NULL),
(10, '2025-06-01 16:45:00', 5, 15, 'da_thanh_toan', NULL),
(11, '2025-04-01 18:30:00', 5, 16, 'da_thanh_toan', NULL),
(12, '2025-04-06 11:30:00', 3, 11, 'da_thanh_toan', NULL),
(13, '2025-03-30 14:15:00', 2, 3, 'da_huy', NULL),
(14, '2025-04-19 20:00:00', 5, 13, 'da_thanh_toan', NULL),
(15, '2025-05-08 19:15:00', 4, 8, 'da_thanh_toan', NULL),
(16, '2025-05-26 20:45:00', 2, 15, 'da_thanh_toan', NULL),
(17, '2025-04-20 17:00:00', 1, 14, 'da_huy', NULL),
(18, '2025-04-18 13:15:00', 4, 11, 'cho_xu_ly', NULL),
(19, '2025-04-30 08:00:00', 3, 8, 'da_thanh_toan', NULL),
(20, '2025-03-04 11:15:00', 1, 20, 'da_thanh_toan', NULL),
(21, '2025-03-15 17:15:00', 4, 9, 'cho_xu_ly', NULL),
(22, '2025-04-09 09:00:00', 3, 19, 'da_thanh_toan', NULL),
(23, '2025-03-14 19:30:00', 5, 4, 'da_thanh_toan', NULL),
(24, '2025-04-24 18:30:00', 1, 17, 'da_thanh_toan', NULL),
(25, '2025-05-21 15:15:00', 4, 6, 'da_thanh_toan', NULL),
(26, '2025-05-15 12:30:00', 2, 3, 'da_thanh_toan', NULL),
(27, '2025-04-18 13:00:00', 4, 11, 'da_thanh_toan', NULL),
(28, '2025-04-03 13:30:00', 5, 9, 'da_thanh_toan', NULL),
(29, '2025-03-11 11:45:00', 4, 18, 'da_huy', NULL),
(30, '2025-03-12 12:15:00', 4, 8, 'da_thanh_toan', NULL);

-- ---- 16) INSERT sales_details (chi tiết bán) | price = medicine.price ----
INSERT INTO sales_details (id_sales, id_medicine, quantity_sales, price) VALUES
(1, 39, 15, 12000.00),
(1, 33, 10, 42000.00),
(1, 8, 4, 38000.00),
(1, 25, 5, 48000.00),
(2, 24, 2, 230000.00),
(2, 28, 11, 95000.00),
(3, 27, 12, 25000.00),
(3, 21, 5, 35000.00),
(3, 26, 9, 72000.00),
(4, 26, 5, 72000.00),
(4, 36, 5, 65000.00),
(4, 1, 4, 25000.00),
(5, 14, 11, 88000.00),
(5, 33, 2, 42000.00),
(5, 31, 5, 165000.00),
(5, 11, 9, 28000.00),
(6, 15, 1, 165000.00),
(6, 13, 1, 55000.00),
(6, 10, 4, 32000.00),
(7, 25, 7, 48000.00),
(7, 32, 4, 38000.00),
(8, 12, 8, 35000.00),
(8, 34, 1, 78000.00),
(9, 34, 13, 78000.00),
(9, 36, 15, 65000.00),
(9, 39, 8, 12000.00),
(9, 21, 10, 35000.00),
(10, 31, 5, 165000.00),
(10, 29, 13, 60000.00),
(11, 18, 2, 68000.00),
(11, 29, 12, 60000.00),
(12, 9, 3, 95000.00),
(13, 27, 7, 25000.00),
(13, 22, 1, 125000.00),
(13, 35, 4, 28000.00),
(13, 30, 7, 45000.00),
(14, 1, 14, 25000.00),
(14, 23, 15, 175000.00),
(14, 20, 14, 52000.00),
(14, 25, 7, 48000.00),
(15, 28, 7, 95000.00),
(15, 32, 6, 38000.00),
(15, 2, 11, 95000.00),
(16, 40, 1, 145000.00),
(16, 35, 15, 28000.00),
(17, 30, 1, 45000.00),
(17, 12, 5, 35000.00),
(18, 25, 5, 48000.00),
(18, 18, 14, 68000.00),
(18, 27, 2, 25000.00),
(19, 3, 13, 42000.00),
(20, 16, 8, 320000.00),
(20, 9, 11, 95000.00),
(21, 11, 13, 28000.00),
(21, 39, 14, 12000.00),
(21, 8, 3, 38000.00),
(22, 26, 12, 72000.00),
(22, 13, 14, 55000.00),
(22, 5, 11, 45000.00),
(22, 38, 4, 38000.00),
(23, 23, 9, 175000.00),
(24, 1, 2, 25000.00),
(24, 27, 7, 25000.00),
(24, 32, 6, 38000.00),
(25, 40, 8, 145000.00),
(25, 35, 7, 28000.00),
(25, 31, 14, 165000.00),
(26, 29, 10, 60000.00),
(26, 16, 10, 320000.00),
(26, 30, 11, 45000.00),
(27, 32, 6, 38000.00),
(27, 14, 13, 88000.00),
(28, 34, 4, 78000.00),
(29, 31, 8, 165000.00),
(29, 32, 1, 38000.00),
(30, 38, 9, 38000.00),
(30, 24, 9, 230000.00),
(30, 31, 6, 165000.00);

-- =============================== END ===============================