-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Nov 04. 18:08
-- Kiszolgáló verziója: 10.4.14-MariaDB
-- PHP verzió: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `bank`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bankadat`
--

CREATE TABLE `bankadat` (
  `id` int(255) NOT NULL,
  `uname` varchar(1000) NOT NULL,
  `kartyaszam` int(9) NOT NULL,
  `kartyakod` int(5) NOT NULL,
  `jelszo` varchar(10) NOT NULL,
  `osszeg` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `bankadat`
--

INSERT INTO `bankadat` (`id`, `uname`, `kartyaszam`, `kartyakod`, `jelszo`, `osszeg`) VALUES
(1, 'Default', 762547257, 999, 'kovacs.gez', 541933),
(2, 'Kiss Pista', 125962387, 235, 'kiss.pista', 549450);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bankadat`
--
ALTER TABLE `bankadat`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bankadat`
--
ALTER TABLE `bankadat`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
