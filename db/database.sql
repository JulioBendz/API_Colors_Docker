-- ESTAS SON ALGUNAS SERIES DE COMANDOS SQL QUE SE USARON
-- Crear la base de datos
CREATE DATABASE colorsdb;

-- Crear tabla en la base de datos
USE colorsdb;

CREATE TABLE colors(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(55), 
    color VARCHAR(7),
    pantone VARCHAR(10) DEFAULT NULL,
    year INT DEFAULT NULL,
    PRIMARY KEY(id)
);

DESCRIBE colors;

-- Insertar datos en la tabla

INSERT INTO colors VALUES
(1,'cerulean', '#98B2D1','15-4020', 2000),
(2,'fuchsia rose', '#C74375','17-2031', 2001),
(3,'true red', '#BF1932','19-1664', 2002);
