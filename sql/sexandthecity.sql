-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 24-09-2026 a las 01:25:25
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sexandthecity`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `episodios`
--

CREATE TABLE `episodios` (
  `id_episodio` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `temporada` int(11) NOT NULL,
  `numero_episodio` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `episodios`
--

INSERT INTO `episodios` (`id_episodio`, `titulo`, `temporada`, `numero_episodio`, `descripcion`) VALUES
(1, 'Sex and the City', 1, 1, 'Carrie reflexiona sobre las relaciones y el amor en Nueva York.'),
(2, 'Models and Mortals', 1, 2, 'Carrie investiga la relación entre los hombres y las modelos.'),
(3, 'Bay of Married Pigs', 1, 3, 'Carrie analiza las diferencias entre la vida de solteros y casados.'),
(4, 'Valley of the Twenty-Something Guys', 1, 4, 'Carrie y sus amigas reflexionan sobre salir con hombres más jóvenes.'),
(5, 'The Power of Female Sex', 1, 5, 'Carrie explora las relaciones, el poder y el dinero.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `tipo_usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contrasena`, `tipo_usuario`) VALUES
(1, 'Carrie Bradshaw', 'carrie@email.com', 'carrie123', 'admin'),
(2, 'Miranda Hobbes', 'miranda@email.com', 'miranda123', 'usuario'),
(3, 'Samantha Jones', 'samantha@email.com', 'samantha123', 'usuario'),
(4, 'Charlotte York', 'charlotte@email.com', 'charlotte123', 'usuario'),
(5, 'Mr Big', 'big@email.com', 'big123', 'usuario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `episodios`
--
ALTER TABLE `episodios`
  ADD PRIMARY KEY (`id_episodio`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `episodios`
--
ALTER TABLE `episodios`
  MODIFY `id_episodio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
