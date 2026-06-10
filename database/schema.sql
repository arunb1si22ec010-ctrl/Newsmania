-- Create Database
CREATE DATABASE IF NOT EXISTS newsmania;
USE newsmania;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description LONGTEXT,
  content LONGTEXT,
  author VARCHAR(255),
  source VARCHAR(255),
  source_url VARCHAR(500),
  image_url VARCHAR(500),
  category VARCHAR(100),
  published_date DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_published_date (published_date)
);

-- Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  article_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_id, article_id),
  INDEX idx_user_id (user_id)
);

-- Bookmarks Table
CREATE TABLE IF NOT EXISTS bookmarks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  article_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Default Categories
INSERT INTO categories (name, description) VALUES
  ('Technology', 'Latest tech news and updates'),
  ('Business', 'Business and finance news'),
  ('Science', 'Science and research news'),
  ('Health', 'Health and medical news'),
  ('Sports', 'Sports news and updates'),
  ('Entertainment', 'Entertainment and celebrity news')
ON DUPLICATE KEY UPDATE name=name;
