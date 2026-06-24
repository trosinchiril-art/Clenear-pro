-- Doar tabela (dacă baza cleanpro există deja)
-- În phpMyAdmin: click stânga pe „cleanpro” → Import → acest fișier

CREATE TABLE IF NOT EXISTS offer_requests (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(150) NOT NULL,
  service_type ENUM('residential', 'office', 'postconstruction', 'industrial') NOT NULL,
  area DECIMAL(10, 2) NOT NULL,
  frequency ENUM('once', 'weekly', 'biweekly', 'monthly') NOT NULL,
  message TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
