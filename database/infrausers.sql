-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2024 at 08:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `infrausers`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(30) DEFAULT NULL,
  `EMAIL` varchar(30) DEFAULT NULL,
  `PASSWORD` varchar(20) DEFAULT NULL,
  `BIRTHDATE` varchar(20) DEFAULT NULL,
  `LOCATION` varchar(20) DEFAULT NULL,
  `CORPORATE` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `USERNAME`, `EMAIL`, `PASSWORD`, `BIRTHDATE`, `LOCATION`, `CORPORATE`) VALUES
(4, 'Livia', 'leave@liv.com', 'kwejhfjnkaowd', '2024-01-04', 'Kenya', 'Individual'),
(15, 'ck chairman', 'chairman@gmail.com', 'iuygbn', '2024-02-24', 'Germany', 'Individual'),
(17, 'Humura', 'humura@gmail.com', 'kiahvfa', '2024-02-14', 'Kenya', 'Individual'),
(18, 'LaurantNyumb', 'laurantnyumb@gmail.com', 'uyghjertbbejhgvbn', '2024-02-23', 'Kenya', 'Individual'),
(19, 'Alvin', 'alvin@gmail.com', 'asfv', '2024-01-12', 'Uganda', 'Individual'),
(20, 'Ngweba', 'ngweba@gmail.com', 'ngweba', '2024-02-01', 'Canada', 'Campany'),
(21, 'Miguel', 'miguel@gmail.com', 'miguel', '2024-02-19', 'Brazil', 'Campany'),
(225, 'Pascy', 'pascy@gmail.com', 'pas', '2024-02-08', 'Canada', 'Individual'),
(226, 'Migisha', 'migisha@gmail.com', 'passwo', '2024-03-16', 'Kenya', 'Campany'),
(232, 'Awet', 'awet@gmail.com', 'jhgbnm', '2024-03-30', 'USA', 'Individual');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`),
  ADD UNIQUE KEY `PASSWORD` (`PASSWORD`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=233;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
