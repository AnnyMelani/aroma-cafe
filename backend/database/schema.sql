-- ==========================================
-- BASE DE DATOS AROMA CAFÉ
-- ==========================================

-- Tabla de categorías
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    categoria_id INTEGER NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    imagen_url TEXT,
    disponible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE RESTRICT
);

-- Tabla de usuarios administrativos
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(30) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- CATEGORÍAS INICIALES
-- ==========================================

INSERT INTO categorias (nombre, descripcion) VALUES
('Cafés', 'Bebidas calientes a base de café'),
('Bebidas frías', 'Bebidas refrescantes y frías'),
('Pastelería', 'Productos de pastelería'),
('Postres', 'Postres y dulces'),
('Snacks', 'Opciones saladas para acompañar');

-- ==========================================
-- PRODUCTOS INICIALES
-- ==========================================

INSERT INTO productos
(categoria_id, nombre, descripcion, precio, stock, disponible)
VALUES
(1, 'Espresso', 'Café espresso tradicional', 7.00, 20, TRUE),
(1, 'Americano', 'Espresso con agua caliente', 8.00, 20, TRUE),
(1, 'Cappuccino', 'Espresso con leche vaporizada y espuma', 10.00, 15, TRUE),
(1, 'Latte', 'Espresso con leche vaporizada', 10.00, 12, TRUE),
(1, 'Mocha', 'Café con chocolate y leche', 11.00, 10, TRUE),

(2, 'Frappuccino', 'Bebida fría de café', 13.00, 10, TRUE),
(2, 'Iced Latte', 'Latte servido con hielo', 12.00, 12, TRUE),
(2, 'Cold Brew', 'Café preparado en frío', 12.00, 8, TRUE),

(3, 'Croissant', 'Croissant de mantequilla', 8.00, 10, TRUE),
(3, 'Muffin', 'Muffin de chocolate', 7.00, 12, TRUE),
(3, 'Roll de canela', 'Roll de canela glaseado', 9.00, 8, TRUE),

(4, 'Cheesecake', 'Cheesecake clásico', 12.00, 6, TRUE),
(4, 'Brownie', 'Brownie de chocolate', 8.00, 10, TRUE),
(4, 'Torta de chocolate', 'Porción de torta de chocolate', 12.00, 5, TRUE),

(5, 'Sándwich de pollo', 'Sándwich de pollo y vegetales', 13.00, 8, TRUE),
(5, 'Sándwich mixto', 'Sándwich de jamón y queso', 11.00, 10, TRUE),
(5, 'Panini', 'Panini de pollo y queso', 14.00, 7, TRUE);
