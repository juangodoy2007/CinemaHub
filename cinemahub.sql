-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2025 a las 20:52:00
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cinemahub`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` varchar(300) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `apellido` varchar(250) NOT NULL,
  `cedula` varchar(11) NOT NULL,
  `telefono` varchar(18) DEFAULT NULL,
  `activa` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `apellido`, `cedula`, `telefono`, `activa`) VALUES
('123', 'Ricardo', 'Briceño', 'V-28445397', '04247503420', 1),
('1de36001-c91b-4701-ad43-0cfd5b2b422d', 'Daniel', 'Coronado', 'E-28445397', '04247504320', 1),
('22d84c37-f47a-444c-a311-d5939c31cc49', 'Ramiro', 'Altuve', 'V-284453972', '04247504320', 1),
('6fb01e09-de37-480f-a610-e0717af7320b', 'JUAN', 'GODOY', 'V-32123990', '04247504320', 1),
('999190f6-220e-4d03-87ba-552cddcd11ea', 'R', 'Prueba', 'V-112', '04247504320', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id_detalle` varchar(300) NOT NULL,
  `tipo` enum('entrada','producto') NOT NULL,
  `precio` double NOT NULL,
  `cantidad` int(11) NOT NULL,
  `total` double NOT NULL,
  `id_prod` varchar(300) DEFAULT NULL,
  `id_entrada` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entradas`
--

CREATE TABLE `entradas` (
  `id_entrada` varchar(300) NOT NULL,
  `precio` double NOT NULL,
  `id_funcion` varchar(300) NOT NULL,
  `activa` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entradas`
--

INSERT INTO `entradas` (`id_entrada`, `precio`, `id_funcion`, `activa`) VALUES
('41a7e753-c19c-404f-a0a7-e71967d19b8d', 6, '40c6238e-ca93-4390-9c63-53836d27ff72', 1),
('8605b494-e206-4759-9f61-52329e0f67c4', 5, '89949a27-df98-4ce7-9209-cfd5bd0ae699', 1),
('ce766c70-a48d-4e89-b21c-47dc6e3adf37', 4, '111871ac-534d-4d62-a6d3-de8bfc11f297', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funciones`
--

CREATE TABLE `funciones` (
  `id_funcion` varchar(300) NOT NULL,
  `id_pelicula` varchar(300) NOT NULL,
  `id_sala` varchar(300) NOT NULL,
  `asientos` int(11) NOT NULL,
  `asientos_total` int(11) NOT NULL,
  `hora` time NOT NULL,
  `precio` double NOT NULL,
  `activa` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `funciones`
--

INSERT INTO `funciones` (`id_funcion`, `id_pelicula`, `id_sala`, `asientos`, `asientos_total`, `hora`, `precio`, `activa`) VALUES
('111871ac-534d-4d62-a6d3-de8bfc11f297', '6138375f-d14c-4cf0-b362-09ce7ae65352', '42d00470-b983-41f8-ae42-187c559ca572', 124, 0, '00:00:00', 5, 1),
('40c6238e-ca93-4390-9c63-53836d27ff72', '6138375f-d14c-4cf0-b362-09ce7ae65352', '42d00470-b983-41f8-ae42-187c559ca572', 124, 0, '00:00:00', 5, 1),
('89949a27-df98-4ce7-9209-cfd5bd0ae699', '6138375f-d14c-4cf0-b362-09ce7ae65352', '42d00470-b983-41f8-ae42-187c559ca572', 124, 0, '00:00:00', 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `id_pelicula` varchar(300) NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `sinopsis` varchar(250) DEFAULT NULL,
  `duracion_minutos` int(11) DEFAULT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `clasificacion` varchar(50) DEFAULT NULL,
  `fecha_estreno` date DEFAULT NULL,
  `cartelera` varchar(200) NOT NULL,
  `activa` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`id_pelicula`, `titulo`, `sinopsis`, `duracion_minutos`, `genero`, `clasificacion`, `fecha_estreno`, `cartelera`, `activa`) VALUES
('059e8562-48b2-4b1a-8e6c-33b38ebcddfa', 'prueba aa', '1312awda', 123, 'Accion', 'R (Restringida)', '2025-10-08', '1761831990893-719939407-image.jpeg', 0),
('2c79b210-10a5-4c21-9260-af8b24486406', 'Barcelona el mejor equipo del mundo', 'Cada noche, Los Ángeles es testigo de alguna carrera de coches. Últimamente ha aparecido un nuevo corredor, todos saben que es duro y que es rápido, pero lo que no saben es que es un detective con la determinación de salir victorioso.', 90, 'Accion', 'PG (Se Sugiere Orientación Paternal)', '2025-10-08', '1761828448696-723379266-image.jpeg', 0),
('37d57f91-a65f-43cd-a164-642eb7239a09', 'Barcelona el mejor equipo del mundo', 'Cada noche, Los Ángeles es testigo de alguna carrera de coches. Últimamente ha aparecido un nuevo corredor, todos saben que es duro y que es rápido, pero lo que no saben es que es un detective con la determinación de salir victorioso.', 90, 'Accion', 'PG (Se Sugiere Orientación Paternal)', '2025-10-08', '1761828448055-895363763-image.jpeg', 0),
('51013e66-fd44-48ae-bffb-ee00270cbed3', 'Barcelona el mejor equipo del mundo', 'Cada noche, Los Ángeles es testigo de alguna carrera de coches. Últimamente ha aparecido un nuevo corredor, todos saben que es duro y que es rápido, pero lo que no saben es que es un detective con la determinación de salir victorioso.', 90, 'Accion', 'G (Público General)', '2025-10-08', '1761832016103-194247873-image.png', 1),
('6138375f-d14c-4cf0-b362-09ce7ae65352', 'da', 'awddaw', 12, 'Terror', 'G (Público General)', '2025-10-29', '1761827188342-686450673-image.jpeg', 1),
('68f523bd-11cc-4fc2-a3fd-45648cda1736', 'rapido y furiosos sinopsis', 'Cada noche, Los Ángeles es testigo de alguna carrera de coches. Últimamente ha aparecido un nuevo corredor, todos saben que es duro y que es rápido, pero lo que no saben es que es un detective con la determinación de salir victorioso.', 120, 'Accion', 'G (Público General)', '2025-10-30', '1761827188342-686450673-image.jpeg', 1),
('cb02bdce-378e-4738-9976-fcfd32097391', 'prueba 11q', 'eqwe', 123, 'Terror', 'G (Público General)', '2025-10-16', '1761849615154-551773082-image.jpeg', 0),
('f07075fe-0b79-4855-a689-85ce292e931d', 'prueba 11', '123', 132, 'Terror', 'PG (Se Sugiere Orientación Paternal)', '2025-10-02', '1761839271489-103298397-image.jpeg', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_prod` varchar(300) NOT NULL,
  `precio` double NOT NULL,
  `nombre` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `id_sala` varchar(300) NOT NULL,
  `numero_sala` int(11) NOT NULL,
  `asientos` int(11) NOT NULL,
  `tipo_sala` enum('2D','3D','VIP') NOT NULL,
  `activa` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id_sala`, `numero_sala`, `asientos`, `tipo_sala`, `activa`) VALUES
('42d00470-b983-41f8-ae42-187c559ca572', 231, 124, '2D', 1),
('769c3d3e-bd56-42db-869b-5b76a44528a1', 334, 100, '3D', 1),
('8053abbe-851a-496a-9ebc-11808b12ead6', 3312, 70, '2D', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usu` varchar(300) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `apellido` varchar(250) NOT NULL,
  `usuario` varchar(250) NOT NULL,
  `clave` varchar(300) NOT NULL,
  `fecha_registro` date NOT NULL,
  `activa` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` varchar(300) NOT NULL,
  `id_det` varchar(300) NOT NULL,
  `id_cliente` varchar(300) NOT NULL,
  `total` double NOT NULL,
  `metodo_pago` enum('efectivo','tarjeta','transferencia','pago movil') NOT NULL,
  `activa` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_prod` (`id_prod`),
  ADD KEY `id_entrada` (`id_entrada`);

--
-- Indices de la tabla `entradas`
--
ALTER TABLE `entradas`
  ADD PRIMARY KEY (`id_entrada`),
  ADD KEY `id_funcion` (`id_funcion`);

--
-- Indices de la tabla `funciones`
--
ALTER TABLE `funciones`
  ADD PRIMARY KEY (`id_funcion`),
  ADD KEY `id_pelicula` (`id_pelicula`),
  ADD KEY `id_sala` (`id_sala`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id_pelicula`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_prod`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id_sala`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usu`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`id_prod`) REFERENCES `productos` (`id_prod`),
  ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_entrada`) REFERENCES `entradas` (`id_entrada`);

--
-- Filtros para la tabla `entradas`
--
ALTER TABLE `entradas`
  ADD CONSTRAINT `entradas_ibfk_1` FOREIGN KEY (`id_funcion`) REFERENCES `funciones` (`id_funcion`);

--
-- Filtros para la tabla `funciones`
--
ALTER TABLE `funciones`
  ADD CONSTRAINT `funciones_ibfk_1` FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id_pelicula`),
  ADD CONSTRAINT `funciones_ibfk_2` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id_sala`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_det`) REFERENCES `detalle_venta` (`id_detalle`),
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
