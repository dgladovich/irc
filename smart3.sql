-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Май 11 2018 г., 09:49
-- Версия сервера: 10.1.26-MariaDB-0+deb9u1
-- Версия PHP: 7.0.27-0+deb9u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `smart3`
--

-- --------------------------------------------------------

--
-- Структура таблицы `smart_alrs`
--

CREATE TABLE `smart_alrs` (
  `id` int(11) NOT NULL,
  `ivan_id` char(128) NOT NULL DEFAULT '0',
  `ctrl` int(11) DEFAULT NULL COMMENT 'Controller ID',
  `dev` int(11) DEFAULT NULL COMMENT 'Device ID',
  `code` int(11) DEFAULT NULL COMMENT 'Error Code Number',
  `stat` tinyint(2) NOT NULL DEFAULT '0' COMMENT 'Device status was',
  `usr_confirm` tinyint(1) DEFAULT '0' COMMENT 'User-confirmer id',
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Creation date',
  `date_confirm` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Confirmation date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Alarms';

-- --------------------------------------------------------

--
-- Структура таблицы `smart_command_queues`
--

CREATE TABLE `smart_command_queues` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `execute_date` datetime DEFAULT NULL,
  `status` char(1) NOT NULL,
  `method` char(1) DEFAULT NULL,
  `uuid` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `smart_ctrls`
--

CREATE TABLE `smart_ctrls` (
  `id` int(11) NOT NULL,
  `typ` int(11) DEFAULT NULL COMMENT 'Type of controller',
  `ip` varchar(16) DEFAULT '' COMMENT 'IP Address',
  `port` int(6) DEFAULT NULL COMMENT 'Port',
  `mac` varchar(20) NOT NULL DEFAULT '',
  `name` varchar(32) NOT NULL,
  `cla` int(11) DEFAULT NULL COMMENT 'Class of controller',
  `plist` int(11) DEFAULT NULL COMMENT 'Picking list',
  `stat` tinyint(1) DEFAULT NULL COMMENT 'Status',
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Controllers';

--
-- Дамп данных таблицы `smart_ctrls`
--

INSERT INTO `smart_ctrls` (`id`, `typ`, `ip`, `port`, `mac`, `name`, `cla`, `plist`, `stat`, `active`) VALUES
(2, 2, '192.168.15.103', 3001, '86:F3:9B:E1:41:42', 'Фильтр', 1, NULL, 6, 1),
(5, 2, '192.168.15.101', 3001, '40:d6:3c:03:04:90', 'Нория', 3, 2, 6, 1),
(6, 2, '192.168.15.102', 3001, '40:d6:3c:03:09:be', 'Конвейер мазковый', 3, NULL, 6, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_ctrl_cameras`
--

CREATE TABLE `smart_ctrl_cameras` (
  `id` int(11) NOT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `ctrl` int(11) DEFAULT NULL COMMENT 'Controller ID',
  `pos` varchar(100) DEFAULT NULL,
  `posx` int(11) DEFAULT '0',
  `posy` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Controller Cameras';

--
-- Дамп данных таблицы `smart_ctrl_cameras`
--

INSERT INTO `smart_ctrl_cameras` (`id`, `ip`, `ctrl`, `pos`, `posx`, `posy`) VALUES
(1, '192.168.3.181', 2, 'top', 0, 0),
(2, '192.168.3.182', 2, 'bottom', 0, 0),
(3, '192.168.3.183', 5, 'top', 30, -165),
(4, '192.168.3.184', 5, 'bottom', -70, 89),
(5, '192.168.3.185', 6, 'top', 0, 0),
(6, '192.168.3.186', 6, 'bottom', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_ctrl_cla`
--

CREATE TABLE `smart_ctrl_cla` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT '',
  `active` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Classes of controller';

--
-- Дамп данных таблицы `smart_ctrl_cla`
--

INSERT INTO `smart_ctrl_cla` (`id`, `name`, `active`) VALUES
(1, 'cla_aspir', 1),
(2, 'cla_weigher', 1),
(3, 'cla_trans', 1),
(4, 'cla_grav', 1),
(5, 'cla_clean', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_ctrl_modules`
--

CREATE TABLE `smart_ctrl_modules` (
  `id` int(11) NOT NULL,
  `ctrl` int(11) DEFAULT NULL,
  `module` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_ctrl_modules`
--

INSERT INTO `smart_ctrl_modules` (`id`, `ctrl`, `module`) VALUES
(21, 5, 2),
(22, 5, 3),
(23, 5, 4),
(97, 6, 5),
(98, 6, 5),
(99, 6, 5),
(100, 2, 10),
(101, 2, 11),
(104, 2, 12),
(106, 2, 13);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_ctrl_module_opts`
--

CREATE TABLE `smart_ctrl_module_opts` (
  `id` int(11) NOT NULL,
  `ctrl_module` int(11) DEFAULT NULL,
  `opt` int(11) DEFAULT NULL,
  `name` varchar(32) NOT NULL DEFAULT '',
  `invers` int(11) NOT NULL DEFAULT '0',
  `antidreb` int(11) NOT NULL DEFAULT '0',
  `i2c_addr` int(11) NOT NULL DEFAULT '0',
  `in_type` int(11) NOT NULL DEFAULT '0',
  `dev_port` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_ctrl_module_opts`
--

INSERT INTO `smart_ctrl_module_opts` (`id`, `ctrl_module`, `opt`, `name`, `invers`, `antidreb`, `i2c_addr`, `in_type`, `dev_port`) VALUES
(142, 21, 48, 'Q1', 1, 0, 2, 1, 41),
(143, 21, 49, 'Q2', 1, 0, 2, 1, 42),
(144, 21, 51, 'Q3', 1, 0, 2, 1, 43),
(145, 21, 52, 'Q4', 1, 0, 2, 1, 44),
(146, 21, 53, 'Q5', 1, 0, 2, 1, 47),
(147, 21, 54, 'Q6', 1, 0, 2, 1, NULL),
(148, 21, 55, 'Q7', 1, 0, 2, 1, NULL),
(149, 22, 56, 'I1', 1, 0, 0, 1, NULL),
(150, 22, 57, 'I2', 1, 0, 0, 1, 30),
(151, 22, 58, 'I3', 1, 0, 0, 1, 31),
(152, 22, 59, 'I4', 1, 0, 0, 1, 32),
(153, 22, 60, 'I5', 1, 0, 0, 1, 49),
(154, 22, 61, 'I6', 2, 0, 0, 1, 33),
(155, 22, 62, 'I7', 1, 0, 0, 1, 46),
(156, 22, 63, 'I8', 1, 0, 0, 1, 39),
(157, 23, 64, 'I9', 1, 0, 1, 1, 38),
(158, 23, 65, 'I10', 1, 0, 1, 1, 37),
(159, 23, 66, 'I11', 1, 0, 1, 1, 36),
(160, 23, 67, 'I12', 1, 0, 1, 1, 35),
(161, 23, 68, 'I13', 1, 0, 1, 1, 34),
(162, 23, 69, 'I14', 1, 0, 1, 1, 48),
(163, 100, 72, 'Q1', 1, 0, 0, 1, 1),
(164, 100, 73, 'Q2', 1, 0, 0, 1, 2),
(165, 100, 74, 'Q3', 1, 0, 0, 1, 3),
(166, 100, 75, 'Q4', 1, 0, 0, 1, 4),
(167, 100, 76, 'Q5', 1, 0, 0, 1, 14),
(168, 100, 77, 'Q6', 1, 0, 0, 1, NULL),
(169, 100, 78, 'Q7', 1, 0, 0, 1, NULL),
(170, 101, 79, 'Q9', 1, 0, 1, 1, 21),
(171, 101, 80, 'Q10', 1, 0, 1, 1, 23),
(172, 101, 81, 'Q11', 1, 0, 1, 1, 25),
(173, 101, 82, 'Q12', 1, 0, 1, 1, 27),
(174, 101, 83, 'Q13', 1, 0, 1, 1, NULL),
(175, 101, 84, 'Q14', 1, 0, 1, 1, NULL),
(176, 101, 85, 'Q15', 1, 0, 1, 1, NULL),
(191, 104, 86, 'I1', 1, 0, 2, 1, 5),
(192, 104, 87, 'I2', 1, 0, 2, 1, 6),
(193, 104, 88, 'I3', 1, 0, 2, 1, 7),
(194, 104, 89, 'I4', 1, 0, 2, 1, 8),
(195, 104, 90, 'I5', 1, 0, 2, 1, 9),
(196, 104, 91, 'I6', 1, 0, 2, 1, 10),
(197, 104, 92, 'I7', 1, 0, 2, 1, 12),
(198, 104, 100, 'I8', 1, 0, 2, 1, 13),
(206, 106, 93, 'I9', 1, 0, 3, 1, 15),
(207, 106, 94, 'I10', 1, 0, 3, 1, 16),
(208, 106, 95, 'I11', 1, 0, 3, 1, 18),
(209, 106, 96, 'I12', 1, 0, 3, 1, 20),
(210, 106, 97, 'I13', 1, 0, 3, 1, 24),
(211, 106, 98, 'I14', 1, 0, 3, 1, 29);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_ctrl_pass`
--

CREATE TABLE `smart_ctrl_pass` (
  `id` int(11) NOT NULL,
  `controll_otk` text NOT NULL,
  `weight` int(11) NOT NULL DEFAULT '0',
  `release_date` date NOT NULL,
  `name` text NOT NULL,
  `fact_number` int(11) NOT NULL,
  `ctrl` int(11) DEFAULT NULL,
  `perfomance` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_ctrl_pass`
--

INSERT INTO `smart_ctrl_pass` (`id`, `controll_otk`, `weight`, `release_date`, `name`, `fact_number`, `ctrl`, `perfomance`) VALUES
(1, '-', 340, '2017-12-01', 'ZEO-FCS-21.20', 1, 2, '1200–1600 м³/час'),
(2, '-', 460, '2017-12-01', 'Конвейер', 2, 6, '150 т/ч'),
(3, '-', 370, '2017-12-01', 'Нория', 3, 5, '20т/ч'),
(10, '', 0, '0000-00-00', 'test1', 0, NULL, ''),
(11, '', 0, '0000-00-00', 'test1', 0, NULL, ''),
(12, '', 0, '0000-00-00', 'test1', 0, NULL, ''),
(13, '', 0, '0000-00-00', 'test1', 0, NULL, ''),
(14, '', 0, '0000-00-00', 'test1', 0, NULL, ''),
(15, '', 0, '0000-00-00', 'test1', 0, NULL, ''),
(16, '', 0, '0000-00-00', 'test1', 0, NULL, '');

-- --------------------------------------------------------

--
-- Структура таблицы `smart_ctrl_types`
--

CREATE TABLE `smart_ctrl_types` (
  `id` int(11) NOT NULL,
  `pas` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Passive mode',
  `ind` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Index',
  `name` varchar(32) NOT NULL DEFAULT '',
  `active` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_ctrl_types`
--

INSERT INTO `smart_ctrl_types` (`id`, `pas`, `ind`, `name`, `active`) VALUES
(1, 2, 2, 'Siemens', 1),
(2, 1, 1, 'ZEO', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_ctypes`
--

CREATE TABLE `smart_ctypes` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Device connection types';

--
-- Дамп данных таблицы `smart_ctypes`
--

INSERT INTO `smart_ctypes` (`id`, `name`, `active`) VALUES
(1, 'TCP', 1),
(2, 'Modbus TCP', 1),
(3, 'I2C', 1),
(4, 'Modbus RTU', 1),
(5, '1Wire', 1),
(6, 'Trigger', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_ctypes_opts`
--

CREATE TABLE `smart_ctypes_opts` (
  `id` int(11) NOT NULL,
  `contyp` int(11) DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `val` varchar(128) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_ctypes_opts`
--

INSERT INTO `smart_ctypes_opts` (`id`, `contyp`, `name`, `val`, `active`) VALUES
(2, 6, 'status:bool', '', 1),
(6, 1, 'description:string', 'this is shit', 0),
(7, 1, 'reg:int', '0', 1),
(8, 1, 'nreg:int', '0', 1),
(9, 1, 'name:string', 'untitled', 1),
(10, 2, 'name:string', 'unnamed', 1),
(11, 2, 'description:string', 'this is mb_tcp shit', 0),
(12, 2, 'reg:int', '0', 1),
(13, 2, 'nreg:int', '0', 1),
(14, 4, 'name', 'unnamed', 1),
(15, 4, 'description', 'this is mb_rtu shit', 0),
(17, 4, 'reg', '0', 1),
(18, 4, 'nreg', '0', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_currencies`
--

CREATE TABLE `smart_currencies` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_currencies`
--

INSERT INTO `smart_currencies` (`id`, `name`, `active`) VALUES
(1, 'tit_grn', 1),
(2, 'tit_eur', 1),
(3, 'tit_dollar', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_device_service_journal`
--

CREATE TABLE `smart_device_service_journal` (
  `id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `status` char(10) NOT NULL DEFAULT 'pending',
  `transfer` int(11) DEFAULT '0',
  `last_service` datetime DEFAULT NULL,
  `description` text,
  `ctrl` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_device_service_journal`
--

INSERT INTO `smart_device_service_journal` (`id`, `service_id`, `expiration_date`, `status`, `transfer`, `last_service`, `description`, `ctrl`) VALUES
(1, 1, NULL, 'pending', 0, '2018-02-19 11:46:01', 'Фильтр цилиндрический ZEO-FCS-10.12<br> <p class=\'service-aligner\'>1.02.2018 13:02:01<br> Выполнено ТО1<br> Работ не выполнено;</p>', 2),
(2, 1, NULL, 'pending', 0, '2018-02-19 11:53:32', 'Фильтр цилиндрический ZEO-FCS-10.12<br> <p class=\'service-aligner\'>1.02.2018 13:02:32<br> Выполнено ТО1<br> Работ не выполнено;</p>', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_devs`
--

CREATE TABLE `smart_devs` (
  `id` int(11) NOT NULL,
  `ctrl` int(11) DEFAULT NULL COMMENT 'Controller id',
  `typ` int(11) DEFAULT NULL COMMENT 'Type of device',
  `contyp` int(11) DEFAULT NULL COMMENT 'Connection type (Modbus, etc...)',
  `grp` int(11) DEFAULT NULL COMMENT 'Device group',
  `name` varchar(64) NOT NULL DEFAULT '',
  `modif` int(11) DEFAULT NULL COMMENT 'Modification',
  `moto` int(11) NOT NULL DEFAULT '0' COMMENT 'Moto hours',
  `body_id` int(11) DEFAULT NULL COMMENT 'ID of body device',
  `parent` int(11) DEFAULT NULL COMMENT 'Parent id device',
  `nomi` int(11) DEFAULT NULL COMMENT 'Nominal structure',
  `cur` int(11) DEFAULT NULL COMMENT 'Current structure',
  `x` int(11) NOT NULL DEFAULT '0',
  `y` int(11) NOT NULL DEFAULT '0',
  `sgrp` int(11) DEFAULT NULL COMMENT 'Status group',
  `stat` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Status',
  `mode` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Mode of operation',
  `ecode` int(11) NOT NULL DEFAULT '0' COMMENT 'Error Code',
  `repairable` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Show in Controll page',
  `visible` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Visible in dispertion',
  `spec_act` int(11) NOT NULL COMMENT 'Device has Special Action button in controll page',
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_devs`
--

INSERT INTO `smart_devs` (`id`, `ctrl`, `typ`, `contyp`, `grp`, `name`, `modif`, `moto`, `body_id`, `parent`, `nomi`, `cur`, `x`, `y`, `sgrp`, `stat`, `mode`, `ecode`, `repairable`, `visible`, `spec_act`, `active`) VALUES
(1, 2, 2, NULL, NULL, 'Фильтр цилиндрический ZEO-FCS-10.12', 56, 0, 2, NULL, 7, NULL, 1, 1, 1, 6, 0, 0, 0, 1, 0, 1),
(2, 2, 3, NULL, NULL, 'Корпус фильтра', NULL, 0, NULL, 1, NULL, NULL, 53, 51, 1, 6, 0, 0, 0, 1, 0, 1),
(3, 2, 12, 6, NULL, 'Датчик люка ревизионного', NULL, 0, NULL, 1, NULL, NULL, 17, 25, 1, 6, 0, 0, 1, 1, 0, 1),
(4, 2, 9, NULL, NULL, 'Привод вентилятора', 1, 0, NULL, 5, 11, NULL, 57, 14, 1, 6, 0, 0, 0, 0, 1, 0),
(5, 2, 1, 2, NULL, 'Вентилятор', NULL, 0, NULL, 1, NULL, NULL, 43, 26, 1, 6, 0, 0, 0, 1, 0, 1),
(6, 2, 9, NULL, NULL, 'Привод затвора шлюзового', 3, 0, NULL, 7, 11, NULL, 41, 83, 1, 6, 0, 0, 0, 1, 0, 0),
(7, 2, 11, 2, NULL, 'Затвор шлюзовый', NULL, 0, NULL, 1, NULL, NULL, 56, 84, 1, 6, 0, 0, 0, 1, 0, 1),
(8, 2, 16, 4, NULL, 'Датчик пыли на выходе', NULL, 0, NULL, 1, 27, NULL, 30, 19, 1, 6, 0, 0, 1, 1, 0, 0),
(9, 2, 13, 6, NULL, 'Конденсатоотводчик', NULL, 0, NULL, 1, NULL, NULL, 93, 40, 1, 6, 0, 0, 1, 1, 0, 0),
(10, 2, 14, 6, NULL, 'Датчик сжатого воздуха', NULL, 0, NULL, 1, 25, NULL, 84, 24, 1, 6, 0, 0, 1, 1, 0, 1),
(11, 2, 19, 6, NULL, 'Датчик панели взрыворазрядителя', NULL, 0, NULL, 1, NULL, NULL, 11, 77, 1, 6, 0, 0, 1, 1, 0, 1),
(12, 2, 15, 3, NULL, 'Датчик дифференциального давления', NULL, 0, NULL, 1, 23, NULL, 71, 16, 1, 6, 0, 0, 1, 1, 0, 1),
(13, 2, 16, 4, NULL, 'Датчик пыли на входе', NULL, 0, NULL, 1, 27, NULL, 26, 82, 1, 6, 0, 0, 1, 1, 0, 0),
(14, 2, 20, 6, NULL, 'Датчик вращения', NULL, 0, NULL, 1, 15, NULL, 69, 84, 1, 6, 0, 0, 1, 1, 0, 1),
(15, 2, 10, 6, 1, 'Электроклапан №1', NULL, 0, NULL, 1, NULL, NULL, 88, 76, 1, 6, 0, 0, 1, 1, 0, 1),
(16, 2, 10, 6, 1, 'Электроклапан №2', NULL, 0, NULL, 1, NULL, NULL, 92, 87, 1, 6, 0, 0, 1, 1, 0, 1),
(17, 2, 10, 6, 1, 'Электроклапан №3', NULL, 0, NULL, 1, NULL, NULL, 85, 87, 1, 6, 0, 0, 1, 1, 0, 1),
(18, 2, 10, 6, NULL, 'Форсунка', NULL, 0, NULL, 1, NULL, NULL, 82, 81, 1, 6, 0, 0, 1, 1, 1, 1),
(19, 2, 23, 6, NULL, 'Кнопка Аварийный Стоп', NULL, 0, NULL, 1, NULL, NULL, 8, 48, 1, 6, 0, 0, 0, 1, 0, 1),
(24, 5, 6, NULL, NULL, 'Нория ZEO-BE-20-2.2м', NULL, 0, 64, NULL, NULL, NULL, 0, 1, 1, 6, 0, 0, 0, 1, 0, 1),
(27, 5, 9, 2, NULL, 'Привод нории', 1, 0, NULL, 24, 11, NULL, 51, 16, 1, 6, 0, 0, 0, 1, 0, 1),
(28, 5, 25, NULL, NULL, 'Редуктор', 8, 0, NULL, 24, 41, NULL, 65, 18, 1, 6, 0, 0, 0, 1, 0, 1),
(29, 5, 21, 6, NULL, 'Датчик схода ленты влево (Голова)', NULL, 0, NULL, 24, 45, NULL, 24, 25, 1, 6, 0, 0, 1, 1, 0, 1),
(30, 5, 20, 6, NULL, 'Датчик скорости', 54, 0, NULL, 24, 15, NULL, 75, 81, 1, 6, 0, 0, 1, 1, 0, 1),
(31, 5, 21, 6, NULL, 'Датчик схода ленты вправо (Голова)', NULL, 0, NULL, 24, 45, NULL, 79, 24, 1, 6, 0, 0, 1, 1, 0, 1),
(32, 5, 21, 6, NULL, 'Датчик схода ленты влево (Башмак)', NULL, 0, NULL, 24, 45, NULL, 30, 78, 1, 6, 0, 0, 1, 1, 0, 1),
(33, 5, 21, 6, NULL, 'Датчик схода ленты вправо (Башмак)', NULL, 0, NULL, 24, 45, NULL, 60, 85, 1, 6, 0, 0, 1, 1, 0, 1),
(34, 5, 27, 6, NULL, 'Датчик подпора (Голова)', 47, 0, NULL, 24, 43, NULL, 88, 67, 1, 6, 0, 0, 1, 1, 0, 1),
(35, 5, 27, 6, NULL, 'Датчик подпора (Башмак)', 47, 0, NULL, 24, 43, NULL, 45, 85, 1, 6, 0, 0, 1, 1, 0, 1),
(40, 5, 30, NULL, 2, 'Подшипниковый узел №1 (Голова)', 6, 0, NULL, 24, NULL, NULL, 29, 49, 1, 6, 0, 0, 1, 1, 0, 1),
(41, 5, 30, NULL, 2, 'Подшипниковый узел №2 (Голова)', 6, 0, NULL, 24, NULL, NULL, 29, 54, 1, 6, 0, 0, 1, 1, 0, 1),
(42, 5, 30, NULL, 2, 'Подшипниковый узел №1 (Башмак)', 6, 0, NULL, 24, NULL, NULL, 26, 49, 1, 6, 0, 0, 1, 1, 0, 1),
(43, 5, 30, NULL, 2, 'Подшипниковый узел №2 (Башмак)', 6, 0, NULL, 24, NULL, NULL, 26, 54, 1, 6, 0, 0, 1, 1, 0, 1),
(44, 5, 18, 4, NULL, 'Датчик вибрации (Голова)', NULL, 0, NULL, 24, 59, NULL, 36, 18, 1, 6, 0, 0, 1, 1, 0, 1),
(45, 5, 18, 4, NULL, 'Датчик вибрации (Башмак)', NULL, 0, NULL, 24, 59, NULL, 18, 65, 1, 6, 0, 0, 1, 1, 0, 1),
(46, 6, 5, NULL, NULL, 'Конвейер скребковый ZEO-DC-150 ', 57, 0, 66, NULL, NULL, NULL, 0, 1, 1, 6, 0, 0, 0, 1, 0, 1),
(49, 6, 27, NULL, NULL, 'Датчик подпора', NULL, 0, NULL, 46, 43, NULL, 21, 42, 1, 6, 0, 0, 1, 1, 0, 1),
(52, 6, 29, NULL, NULL, 'Датчик обрыва цепи', NULL, 0, NULL, 46, NULL, NULL, 79, 42, 1, 6, 0, 0, 1, 1, 0, 1),
(53, 6, 20, NULL, NULL, 'Датчик скорости', NULL, 0, NULL, 46, 15, NULL, 77, 70, 1, 6, 0, 0, 1, 1, 0, 1),
(56, 6, 30, NULL, 3, 'Подшипниковый узел №1 (Приводная)', NULL, 0, NULL, 46, NULL, NULL, 28, 36, 1, 6, 0, 0, 1, 1, 0, 1),
(57, 6, 30, NULL, 3, 'Подшипниковый узел №2 (Приводная)', NULL, 0, NULL, 46, NULL, NULL, 22, 51, 1, 6, 0, 0, 1, 1, 0, 1),
(58, 6, 30, NULL, 3, 'Подшипниковый узел №1 (Натяжная)', NULL, 0, NULL, 46, NULL, NULL, 46, 80, 1, 6, 0, 0, 1, 1, 0, 1),
(59, 6, 30, NULL, 3, 'Подшипниковый узел №2 (Натяжная)', NULL, 0, NULL, 46, NULL, NULL, 72, 66, 1, 6, 0, 0, 1, 1, 0, 1),
(60, 5, 23, 6, NULL, 'Кнопка Аварийный Стоп', NULL, 0, NULL, 24, NULL, NULL, 91, 44, 1, 6, 0, 0, 0, 1, 0, 1),
(61, 6, 23, NULL, NULL, 'Кнопка Аварийный Стоп', NULL, 0, NULL, 46, NULL, NULL, 61, 80, 1, 6, 0, 0, 0, 1, 0, 1),
(62, 6, 9, NULL, NULL, 'Привод', 1, 0, NULL, 46, 11, NULL, 50, 15, 1, 6, 0, 0, 0, 1, 0, 1),
(63, 6, 25, NULL, NULL, 'Редуктор', NULL, 0, NULL, 46, 41, NULL, 68, 22, 1, 6, 0, 0, 0, 1, 0, 1),
(64, 5, 32, NULL, NULL, 'Корпус нории', NULL, 0, NULL, 24, NULL, NULL, 53, 50, 1, 6, 0, 0, 0, 1, 0, 1),
(66, 6, 33, NULL, NULL, 'Корпус', NULL, 0, NULL, 46, NULL, NULL, 50, 46, 1, 6, 0, 0, 0, 1, 0, 1),
(67, 6, 18, NULL, NULL, 'Датчик вибрации (Приводная)', NULL, 0, NULL, 46, NULL, NULL, 23, 69, 1, 6, 0, 0, 1, 1, 0, 1),
(68, 6, 18, NULL, NULL, 'Датчик вибрации (Натяжная)', NULL, 0, NULL, 46, NULL, NULL, 42, 79, 1, 6, 0, 0, 1, 1, 0, 1),
(69, 2, 34, NULL, NULL, 'Фильтр-регулятор', NULL, 0, NULL, 1, NULL, NULL, 0, 0, 1, 6, 0, 0, 1, 0, 0, 0),
(71, 2, 36, NULL, NULL, 'Предохранительный пневмоклапан', NULL, 0, NULL, 1, NULL, NULL, 0, 0, 1, 6, 0, 0, 1, 0, 0, 0),
(72, 2, 37, NULL, NULL, 'Ресивер', NULL, 0, NULL, 1, NULL, NULL, 0, 0, 1, 6, 0, 0, 1, 0, 0, 0),
(73, 5, 38, NULL, NULL, 'Лента нории', NULL, 0, NULL, 24, NULL, NULL, 0, 0, 1, 6, 0, 0, 1, 0, 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_dev_faces`
--

CREATE TABLE `smart_dev_faces` (
  `id` int(11) NOT NULL,
  `dev` int(11) DEFAULT NULL,
  `tardev` int(11) DEFAULT NULL,
  `name` varchar(64) NOT NULL,
  `viewgrp` int(11) DEFAULT NULL COMMENT 'View group',
  `viewtype` int(11) DEFAULT NULL COMMENT 'View type',
  `stat_grp` int(11) DEFAULT NULL COMMENT 'Status group',
  `meas` int(11) DEFAULT NULL COMMENT 'Measurement',
  `min_val` int(11) DEFAULT '0' COMMENT 'Minimal value',
  `max_val` int(11) DEFAULT '0' COMMENT 'Maximum value',
  `def` int(11) DEFAULT '0' COMMENT 'Default value',
  `lim_warning` int(11) DEFAULT '0' COMMENT 'Warning limit',
  `lim_warning_code` int(11) DEFAULT NULL COMMENT 'Warning limit error code',
  `lim_danger` int(11) DEFAULT '0' COMMENT 'Danger limit',
  `lim_danger_code` int(11) DEFAULT NULL COMMENT 'Danger limit code',
  `use_range` tinyint(1) DEFAULT '0' COMMENT 'Use ranges OR NOT',
  `range_warn_min` int(5) DEFAULT '0' COMMENT 'Range warning minimal value',
  `range_warn_min_code` int(11) DEFAULT NULL COMMENT 'Range warning minimal code',
  `range_crit_min` int(5) DEFAULT '0' COMMENT 'Range Critical minimal value',
  `range_crit_min_code` int(11) DEFAULT NULL COMMENT 'Range Critical minimal code',
  `range_warn_max` int(5) DEFAULT '0' COMMENT 'Range warning maximum value	',
  `range_warn_max_code` int(11) DEFAULT NULL,
  `range_crit_max` int(5) DEFAULT '0',
  `range_crit_max_code` int(11) DEFAULT NULL,
  `orde` int(11) NOT NULL DEFAULT '0' COMMENT 'Order',
  `show_scat` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Show in dispersion',
  `visible` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Use on site OR FUCKING NOT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Device value interfaces';

--
-- Дамп данных таблицы `smart_dev_faces`
--

INSERT INTO `smart_dev_faces` (`id`, `dev`, `tardev`, `name`, `viewgrp`, `viewtype`, `stat_grp`, `meas`, `min_val`, `max_val`, `def`, `lim_warning`, `lim_warning_code`, `lim_danger`, `lim_danger_code`, `use_range`, `range_warn_min`, `range_warn_min_code`, `range_crit_min`, `range_crit_min_code`, `range_warn_max`, `range_warn_max_code`, `range_crit_max`, `range_crit_max_code`, `orde`, `show_scat`, `visible`) VALUES
(2, 29, NULL, 'Состояние', NULL, 4, NULL, NULL, 0, 0, 1, 0, NULL, 0, 30, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 1),
(3, 27, NULL, 'Опер. напряжение', NULL, NULL, NULL, NULL, 0, 0, 0, 0, NULL, 0, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 1),
(4, 27, NULL, 'Напряжение', NULL, NULL, NULL, 1, 0, 420, 0, 0, NULL, 0, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 1),
(5, 27, NULL, 'Сила тока', NULL, NULL, NULL, NULL, 0, 0, 0, 0, NULL, 0, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 1),
(6, 27, NULL, 'Мощность', NULL, NULL, NULL, NULL, 0, 0, 0, 0, NULL, 0, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 1),
(7, 27, NULL, 'Частота вращения електродвигателя', NULL, NULL, NULL, NULL, 0, 0, 0, 0, NULL, 0, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 1),
(8, 44, 27, 'Темп. двигателя', NULL, NULL, NULL, NULL, 0, 0, 0, 0, NULL, 0, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 1),
(9, 44, 28, 'Темп. Редуктора', NULL, NULL, NULL, NULL, 0, 0, 0, 0, NULL, 0, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 1),
(10, 44, 40, 'Темп. подшипника 1 (Голова)', NULL, NULL, NULL, NULL, 0, 0, 0, 0, NULL, 0, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 1),
(11, 44, 41, 'Темп. подшипника 2 (Голова)', NULL, NULL, NULL, NULL, 0, 0, 0, 0, NULL, 20, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 1),
(12, 45, 42, 'Темп. подшипника 1 (Башмак)', 7, NULL, NULL, NULL, 0, 0, 0, 0, NULL, 0, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 0),
(13, 45, 42, 'Темп. подшипника 2 (Башмак)', 7, NULL, NULL, NULL, 0, 0, 0, 0, NULL, 0, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 0),
(14, 30, NULL, 'Состояние', NULL, NULL, NULL, NULL, 0, 0, 0, 0, NULL, 0, NULL, 0, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_dev_grps`
--

CREATE TABLE `smart_dev_grps` (
  `id` int(11) NOT NULL,
  `ctrl` int(11) DEFAULT '0',
  `name` varchar(128) NOT NULL,
  `x` int(11) NOT NULL DEFAULT '0',
  `y` int(11) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_dev_grps`
--

INSERT INTO `smart_dev_grps` (`id`, `ctrl`, `name`, `x`, `y`, `active`) VALUES
(1, 2, 'Электроклапана', 5, 13, 1),
(2, 5, 'Датчики температуры', 0, 0, 1),
(3, 6, 'Датчики температуры', 0, 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_dev_items`
--

CREATE TABLE `smart_dev_items` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `smart_dev_logic_ports`
--

CREATE TABLE `smart_dev_logic_ports` (
  `id` int(11) NOT NULL,
  `dev` int(11) DEFAULT NULL,
  `port_type` int(11) NOT NULL DEFAULT '0',
  `port_dir` int(11) NOT NULL DEFAULT '0',
  `port` int(11) NOT NULL DEFAULT '0',
  `name` varchar(32) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_dev_logic_ports`
--

INSERT INTO `smart_dev_logic_ports` (`id`, `dev`, `port_type`, `port_dir`, `port`, `name`) VALUES
(1, 1, 1, 2, 0, 'Индикатор Работы'),
(2, 1, 1, 2, 1, 'Индикатор Предупр'),
(3, 1, 1, 2, 2, 'Индикатор Аварии'),
(4, 1, 1, 2, 3, 'Сирена'),
(5, 1, 1, 1, 4, 'Режим Местный'),
(6, 1, 1, 1, 5, 'Режим Дистанция'),
(7, 1, 1, 1, 6, 'Сервисная Кнопка'),
(8, 3, 1, 1, 0, 'status'),
(9, 4, 1, 1, 0, 'Контр Пускателя'),
(10, 4, 1, 1, 1, 'Контр Опер Напр'),
(11, 4, 1, 2, 2, 'Включ Пускателя'),
(12, 6, 1, 1, 0, 'Контроль пускателя'),
(13, 6, 1, 1, 1, 'Контр Опер Напр'),
(14, 6, 1, 2, 2, 'Включ Пускателя'),
(15, 9, 1, 1, 0, 'status'),
(16, 9, 1, 1, 1, 'state'),
(17, 10, 3, 1, 0, 'status'),
(18, 11, 1, 1, 0, 'status'),
(19, 12, 3, 1, 0, 'Диф Давление'),
(20, 14, 1, 1, 0, 'status'),
(21, 15, 1, 2, 0, 'state'),
(22, 15, 1, 1, 1, 'status'),
(23, 16, 1, 2, 0, 'state'),
(24, 16, 1, 1, 1, 'status'),
(25, 17, 1, 2, 0, 'state'),
(26, 17, 3, 1, 1, 'status'),
(27, 18, 1, 2, 0, 'state'),
(28, 18, 3, 1, 1, 'status'),
(29, 19, 1, 1, 0, 'status'),
(30, 27, 2, 1, 0, 'port_idle'),
(31, 27, 2, 1, 1, 'port_local'),
(32, 27, 2, 1, 2, 'port_auto'),
(33, 60, 2, 1, 0, 'status'),
(34, 29, 1, 1, 0, 'status'),
(35, 31, 2, 1, 0, 'status'),
(36, 32, 2, 1, 0, 'status'),
(37, 33, 2, 1, 0, 'status'),
(38, 34, 2, 1, 0, 'status'),
(39, 35, 2, 1, 0, 'status'),
(40, 53, 2, 1, 0, 'status'),
(41, 64, 2, 2, 0, 'port_green'),
(42, 64, 2, 2, 1, 'port_yellow'),
(43, 64, 2, 2, 2, 'port_red'),
(44, 64, 2, 2, 3, 'port_horn'),
(45, 61, 0, 0, 0, 'Порт'),
(46, 30, 2, 1, 0, 'status'),
(47, 64, 2, 2, 4, 'port_runf'),
(48, 64, 2, 1, 5, 'portbt_serv'),
(49, 64, 2, 1, 6, 'portbt_run');

-- --------------------------------------------------------

--
-- Структура таблицы `smart_dev_modif`
--

CREATE TABLE `smart_dev_modif` (
  `id` int(11) NOT NULL,
  `dev_type` int(11) DEFAULT NULL,
  `name` varchar(32) NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_dev_modif`
--

INSERT INTO `smart_dev_modif` (`id`, `dev_type`, `name`, `active`) VALUES
(1, 9, 'Электропривод ПЧ', 1),
(2, 9, 'Электропривод с током', 1),
(3, 9, 'Электропривод без тока', 1),
(4, 30, 'CRAFT', 1),
(5, 30, 'LFD', 1),
(6, 30, 'SKF', 1),
(7, 30, 'SNR', 1),
(8, 25, 'MOTOVARIO NMRV-P063', 1),
(9, 25, 'MOTOVARIO NMRV-P075', 1),
(10, 25, 'MOTOVARIO NMRV-P090', 1),
(11, 25, 'MOTOVARIO NMRV-P110', 1),
(12, 25, 'MOTOVARIO NMRV-P130', 1),
(13, 25, 'MOTOVARIO B103', 1),
(14, 25, 'MOTOVARIO B123', 1),
(15, 25, 'MOTOVARIO B143', 1),
(16, 25, 'MOTOVARIO B153', 1),
(17, 25, 'MOTOVARIO B163', 1),
(18, 25, 'STM UMI90', 1),
(19, 25, 'STM UMI110', 1),
(20, 25, 'STM OMP112', 1),
(21, 25, 'STM OMP90', 1),
(22, 25, 'STM OMP125', 1),
(23, 25, 'STM OMP140', 1),
(24, 25, 'STM OMP160', 1),
(25, 25, 'STM OMP180', 1),
(26, 25, 'STM OMP200', 1),
(27, 25, 'NORD SK 12063AZR-90S/4', 1),
(28, 25, 'NORD SK 12080AZR-100L/4', 1),
(29, 25, 'NORD SK 32100AZR-100LА/4', 1),
(30, 25, 'NORD SK 42125AZR-132М/4', 1),
(31, 25, 'NORD SK 9032.1AZR-132МА/4', 1),
(32, 25, 'NORD SK 9042.1AZR-160М/4', 1),
(33, 25, 'NORD SK 9052.1AXR-160L/4', 1),
(34, 25, 'NORD SK 9072.1AXR-200L/4', 1),
(35, 25, 'NORD SK 9082.1AXR-250M/4', 1),
(36, 25, 'NORD SK 9086.1AXR-280S/4', 1),
(37, 25, 'NORD SK 9092.1AZR-315S/4', 1),
(38, 25, 'NORD SK 7407 A IEC 3155/4', 1),
(39, 25, 'NORD SK 8407 A IEC 315M/4 R', 1),
(40, 38, 'TK', 1),
(41, 38, 'EP', 1),
(42, 6, 'Нория ZEO-BE(S)', 1),
(43, 20, 'ВБ2.ЧТ.30М.80.15.1.1.В', 1),
(44, 20, 'ВБШ02-204-А121210', 1),
(45, 20, 'XSAV11373EX', 1),
(46, 27, 'СУМ-1', 1),
(47, 27, 'MOLLET MFE-EE 24V AC IP65', 1),
(48, 21, 'ВБИ-Ф60-40К-1111-3', 1),
(49, 21, 'ВБИ-Ф80-40У-2113-3', 1),
(50, 30, 'SKF(SYJ 40 TF)', 1),
(51, 30, 'SKF (FYJ 40 TF)', 1),
(52, 30, 'SKF FYJ 50 TF', 1),
(53, 25, 'Редуктор Motovario B083', 1),
(54, 20, 'Датчик вращения Простой', 1),
(55, 20, 'Датчик вращения Обороты', 1),
(56, 2, 'ZEO-FCS-10.12', 1),
(57, 5, 'ZEO-DC-150_2.4m', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_dev_servs`
--

CREATE TABLE `smart_dev_servs` (
  `id` int(11) NOT NULL,
  `ctrl` int(11) NOT NULL DEFAULT '0',
  `dev` int(11) NOT NULL DEFAULT '0',
  `ser_num` tinyint(2) NOT NULL DEFAULT '0',
  `_lim` bigint(20) NOT NULL DEFAULT '0',
  `_pre` bigint(20) NOT NULL DEFAULT '0',
  `service_id` int(11) NOT NULL,
  `ser_type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_dev_servs`
--

INSERT INTO `smart_dev_servs` (`id`, `ctrl`, `dev`, `ser_num`, `_lim`, `_pre`, `service_id`, `ser_type`) VALUES
(1, 2, 1, 1, 24, 0, 1, 'hourly'),
(2, 2, 1, 2, 168, 0, 2, 'hourly'),
(3, 2, 1, 3, 720, 0, 3, 'hourly'),
(4, 2, 1, 5, 10000, 0, 5, 'hourly'),
(5, 2, 1, 4, 4320, 0, 4, 'hourly'),
(6, 5, 24, 1, 24, 0, 6, 'hourly'),
(7, 5, 24, 3, 720, 0, 8, 'hourly'),
(8, 5, 24, 5, 10000, 0, 10, 'hourly'),
(9, 5, 24, 2, 168, 0, 7, 'hourly'),
(10, 5, 24, 4, 4320, 0, 9, 'hourly'),
(11, 5, 73, 1, 24, 0, 6, 'hourly'),
(12, 5, 73, 3, 720, 0, 8, 'hourly'),
(13, 5, 73, 5, 10000, 0, 10, 'hourly'),
(14, 5, 73, 2, 168, 0, 7, 'hourly'),
(15, 5, 73, 4, 4320, 0, 9, 'hourly'),
(16, 6, 46, 1, 24, 0, 11, 'hourly'),
(17, 6, 46, 2, 168, 0, 12, 'hourly'),
(18, 6, 46, 3, 720, 0, 13, 'hourly'),
(19, 6, 46, 4, 4320, 0, 14, 'hourly'),
(20, 6, 46, 5, 10000, 0, 15, 'hourly');

-- --------------------------------------------------------

--
-- Структура таблицы `smart_dev_serworks`
--

CREATE TABLE `smart_dev_serworks` (
  `id` int(11) NOT NULL,
  `ctrl` int(11) NOT NULL DEFAULT '0',
  `dev` int(11) NOT NULL DEFAULT '0',
  `ser_num` tinyint(4) NOT NULL DEFAULT '0',
  `work` int(11) NOT NULL DEFAULT '0',
  `done` tinyint(1) NOT NULL DEFAULT '0',
  `service_id` int(11) NOT NULL,
  `work_id` int(11) NOT NULL,
  `user_occ` int(11) DEFAULT NULL,
  `perform` int(11) DEFAULT '0',
  `perform_date` datetime DEFAULT NULL,
  `typ` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_dev_serworks`
--

INSERT INTO `smart_dev_serworks` (`id`, `ctrl`, `dev`, `ser_num`, `work`, `done`, `service_id`, `work_id`, `user_occ`, `perform`, `perform_date`, `typ`) VALUES
(1, 2, 1, 1, 0, 0, 1, 1, 6, 0, NULL, 1),
(2, 2, 1, 2, 0, 0, 2, 2, 7, 0, NULL, 10),
(3, 2, 1, 2, 0, 0, 2, 3, 6, 0, NULL, 34),
(4, 2, 1, 2, 0, 0, 2, 4, 6, 0, NULL, 35),
(5, 2, 1, 2, 0, 0, 2, 6, 5, 0, NULL, 14),
(6, 2, 1, 2, 0, 0, 2, 7, 7, 0, NULL, 19),
(7, 2, 1, 2, 0, 0, 2, 8, 7, 0, NULL, 13),
(8, 2, 1, 2, 0, 0, 2, 5, 5, 0, NULL, 15),
(9, 2, 1, 3, 0, 0, 3, 9, 7, 0, NULL, 12),
(10, 2, 1, 3, 0, 0, 3, 10, 7, 0, NULL, 19),
(11, 2, 1, 3, 0, 0, 3, 13, 6, 0, NULL, 37),
(12, 2, 1, 3, 0, 0, 3, 14, 7, 0, NULL, 1),
(13, 2, 1, 3, 0, 0, 3, 15, 7, 0, NULL, 13),
(14, 2, 1, 3, 0, 0, 3, 11, 7, 0, NULL, 20),
(15, 2, 1, 3, 0, 0, 3, 12, 6, 0, NULL, 36),
(16, 2, 1, 4, 0, 0, 5, 16, 7, 0, NULL, 10),
(17, 2, 1, 4, 0, 0, 5, 17, 7, 0, NULL, 16),
(18, 2, 1, 4, 0, 0, 5, 18, 6, 0, NULL, 31),
(19, 2, 1, 4, 0, 0, 5, 19, 7, 0, NULL, 35),
(20, 2, 1, 4, 0, 0, 5, 20, 7, 0, NULL, 15),
(21, 2, 1, 4, 0, 0, 5, 21, 7, 0, NULL, 14),
(22, 2, 1, 4, 0, 0, 5, 22, 7, 0, NULL, 12),
(23, 2, 1, 4, 0, 0, 5, 23, 7, 0, NULL, 1),
(24, 2, 1, 5, 0, 0, 4, 24, 7, 0, NULL, 36),
(25, 2, 1, 5, 0, 0, 4, 25, 7, 0, NULL, 1),
(26, 2, 1, 5, 0, 0, 4, 28, 7, 0, NULL, 19),
(27, 2, 1, 5, 0, 0, 4, 27, 7, 0, NULL, 35),
(28, 2, 1, 5, 0, 0, 4, 26, 7, 0, NULL, 10),
(29, 5, 24, 1, 0, 0, 6, 30, 6, 0, NULL, 6),
(30, 5, 24, 1, 0, 0, 6, 29, 6, 0, NULL, 30),
(31, 5, 24, 3, 0, 0, 7, 33, 6, 0, NULL, 30),
(32, 5, 24, 3, 0, 0, 7, 35, 6, 0, NULL, 20),
(33, 5, 24, 3, 0, 0, 7, 37, 6, 0, NULL, 21),
(34, 5, 24, 3, 0, 0, 7, 36, 6, 0, NULL, 27),
(35, 5, 24, 3, 0, 0, 7, 34, 6, 0, NULL, 39),
(36, 5, 24, 5, 0, 0, 8, 39, 6, 0, NULL, 25),
(37, 5, 24, 2, 0, 0, 9, 32, 6, 0, NULL, 25),
(38, 5, 24, 2, 0, 0, 9, 31, 6, 0, NULL, 38),
(39, 5, 24, 4, 0, 0, 10, 38, 6, 0, NULL, 6),
(40, 5, 73, 1, 0, 0, 11, 30, 6, 0, NULL, 6),
(41, 5, 73, 1, 0, 0, 11, 29, 6, 0, NULL, 30),
(42, 5, 73, 3, 0, 0, 12, 33, 6, 0, NULL, 30),
(43, 5, 73, 3, 0, 0, 12, 35, 6, 0, NULL, 20),
(44, 5, 73, 3, 0, 0, 12, 37, 6, 0, NULL, 21),
(45, 5, 73, 3, 0, 0, 12, 36, 6, 0, NULL, 27),
(46, 5, 73, 3, 0, 0, 12, 34, 6, 0, NULL, 39),
(47, 5, 73, 5, 0, 0, 13, 39, 6, 0, NULL, 25),
(48, 5, 73, 2, 0, 0, 14, 32, 6, 0, NULL, 25),
(49, 5, 73, 2, 0, 0, 14, 31, 6, 0, NULL, 38),
(50, 5, 73, 4, 0, 0, 15, 38, 6, 0, NULL, 6),
(51, 6, 46, 1, 0, 0, 16, 41, 6, 0, NULL, 30),
(52, 6, 46, 2, 0, 0, 17, 42, 6, 1, NULL, 41),
(53, 6, 46, 2, 0, 0, 17, 43, 5, 1, NULL, 25),
(54, 6, 46, 3, 0, 0, 18, 44, 6, 0, NULL, 30),
(55, 6, 46, 4, 0, 0, 19, 45, 6, 0, NULL, 27),
(56, 6, 46, 4, 0, 0, 19, 46, 6, 0, NULL, 29),
(57, 6, 46, 4, 0, 0, 19, 47, 6, 0, NULL, 20),
(58, 6, 46, 5, 0, 0, 20, 48, 6, 0, NULL, 25);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_dev_types`
--

CREATE TABLE `smart_dev_types` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_dev_types`
--

INSERT INTO `smart_dev_types` (`id`, `name`, `active`) VALUES
(1, 'obj_fan', 1),
(2, 'obj_fil', 1),
(3, 'obj_fil_body', 1),
(4, 'obj_convbelt', 1),
(5, 'obj_convchain', 1),
(6, 'obj_convnoria', 1),
(7, 'obj_convscrew', 1),
(8, 'obj_cleanauger', 1),
(9, 'obj_eledrive', 1),
(10, 'obj_elecvalve', 1),
(11, 'obj_gate', 1),
(12, 'obj_insphatch', 1),
(13, 'obj_condtrap', 1),
(14, 'obj_senscompair', 1),
(15, 'obj_sensdifpres', 1),
(16, 'obj_sensdust', 1),
(17, 'obj_senstemp', 1),
(18, 'obj_sensvibr', 1),
(19, 'obj_sensblower', 1),
(20, 'obj_sensrot', 1),
(21, 'obj_sensbeltexit', 1),
(23, 'obj_emerstop', 1),
(25, 'obj_red', 1),
(27, 'obj_senspodp', 1),
(28, 'obj_sysmonitor', 1),
(29, 'obj_senschainbreak', 1),
(30, 'obj_temp2', 1),
(31, 'obj_sensdust2', 1),
(32, 'obj_noriabody', 1),
(33, 'obj_konvbody', 1),
(34, 'Фильтр-регулятор', 1),
(35, 'Фильтровальный Элемент', 1),
(36, 'Предохранительный Пневмоклапан', 1),
(37, 'Ресивер', 1),
(38, 'Лента нории', 1),
(39, 'Ковши нории', 0),
(40, 'Конвейерная лента', 1),
(41, 'Тяговая цепь', 1),
(42, 'Натяжной барабан', 1),
(43, 'Приводной барабан', 1),
(44, 'Муфта сцепления', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_dev_vars`
--

CREATE TABLE `smart_dev_vars` (
  `id` int(11) NOT NULL,
  `dev` int(11) DEFAULT NULL,
  `dface` int(11) DEFAULT NULL,
  `var_id` int(11) DEFAULT NULL,
  `val` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Device variables with values';

--
-- Дамп данных таблицы `smart_dev_vars`
--

INSERT INTO `smart_dev_vars` (`id`, `dev`, `dface`, `var_id`, `val`) VALUES
(5, 45, 12, 14, 'temp'),
(6, 45, 12, 15, 'this is mb_rtu shit'),
(7, 45, 12, 17, '0'),
(8, 45, 12, 18, '0'),
(9, 45, 13, 14, 'temp'),
(10, 45, 13, 15, 'this is mb_rtu shit'),
(11, 45, 13, 17, '0'),
(12, 45, 13, 18, '0'),
(45, 44, 8, 14, 'temp'),
(46, 44, 8, 15, 'this is mb_rtu shit'),
(47, 44, 8, 17, '100'),
(48, 44, 8, 18, '0'),
(49, 44, 9, 14, 'temp'),
(50, 44, 9, 15, 'this is mb_rtu shit'),
(51, 44, 9, 17, '100'),
(52, 44, 9, 18, '1'),
(53, 44, 10, 14, 'temp'),
(54, 44, 10, 15, 'this is mb_rtu shit'),
(55, 44, 10, 17, '100'),
(56, 44, 10, 18, '2'),
(57, 44, 11, 14, 'temp'),
(58, 44, 11, 15, 'this is mb_rtu shit'),
(59, 44, 11, 17, '100'),
(60, 44, 11, 18, '3');

-- --------------------------------------------------------

--
-- Структура таблицы `smart_errcodes`
--

CREATE TABLE `smart_errcodes` (
  `id` int(11) NOT NULL,
  `typ` int(11) DEFAULT NULL,
  `name` varchar(512) NOT NULL,
  `reason` text NOT NULL,
  `solution` text NOT NULL,
  `dtypes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_errcodes`
--

INSERT INTO `smart_errcodes` (`id`, `typ`, `name`, `reason`, `solution`, `dtypes`) VALUES
(0, 0, '', '', '', NULL),
(1, 0, 'Устройство исправно', '', '', NULL),
(2, 0, 'Включен', '', '', NULL),
(3, 0, 'Выключен', '', '', NULL),
(4, 0, 'Выведен в ремонт', '', '', NULL),
(5, 0, 'Выведен из ремонта', '', '', NULL),
(6, 2, 'Отсутствует оперативное напряжение', 'Нет напряжения сети<br>Сработал автомат защиты                 ', 'Обратиться к электротехническому персоналу предприятия', 9),
(7, 2, 'Сработал автомат защиты двигателя', 'Неисправность электропроводки<br>Неисправность электродвигателя', 'Обратиться к технической службе предприятия', 9),
(8, 1, 'Отключён или в местном режиме', 'Самопроизвольное срабатывание (внутреннее повреждение) кнопки<br>Несанкционированное переключение оборудования в местный режим.', 'Оператору или обслуживающему персоналу выяснить переведено ли оборудование в местный режим, или это ложный сигнал<br>В первой ситуации вызвать дежурного электрика', 9),
(9, 2, 'Несанкционированное изменение режима работы', 'Несанкционированное переключение оборудования в местный режим.', 'Оператору узнать причину изменения режима работы и действовать согласно инструкций и правил установленных на предприятии и в соответствии с правилами ТБ', 9),
(10, 2, 'Авария контактора. Нет обратной связи', 'Повреждение контактора<br>Повреждение эл. цепей контактора', 'Обратиться к электротехническому персоналу предприятия', 9),
(11, 2, 'Авария контактора. Отключён в работе', 'Повреждение контактора<br>Повреждение эл. цепей контактора', 'Обратиться к электротехническому персоналу предприятия', 9),
(12, 1, 'Повышенная температура двигателя ', 'Ложное срабатывание<br>Сильное загрязнение электродвигателя<br>Повреждение или отсутствие крыльчатки охлаждения<br>Внутренние повреждения электродвигателя (межвитковое замыкание)', 'Электротехническому персоналу проверить температуру, и если она повышенная найти причины<br>Очистить электродвигатель<br>Заменить крыльчатку<br>Электротехническому персоналу заменить или отремонтировать электродвигатель', 9),
(13, 2, 'Критическая температура двигателя ', 'Ложное срабатывание<br>Повреждение или отсутствие крыльчатки охлаждения<br>Внутренние повреждения электродвигателя (межвитковое замыкание)', 'Остановить норию, поставить в ремонт и определить причину<br>Электротехническому персоналу проверить температуру, и если она повышенная найти причины<br>Заменить крыльчатку<br>Электротехническому персоналу заменить или отремонтировать электродвигатель', 9),
(14, 1, 'Превышено номинальное значение нагрузки на двигатель', 'Превышение или неравномерность подачи продукта<br>Снижение напряжения и аварии в питающей сети<br>Неисправен или не сработал датчик подпора<br>Обратная сыпь продукта в холостую ветвь', 'Проверить равномерность подачи продукта, в случае превышения подачи прикрыть задвижку<br>Остановить транспортер, сообщить дежурному электрику<br>Отремонтировать или заменить датчик<br>Предпринять меры по устранению обратной сыпи', 9),
(15, 2, 'Превышено максимальное значение нагрузки на двигатель', 'Снижение напряжения или авария в питающей сети<br>Перегрузка механизма продуктом<br>Механическая неисправность', 'Остановить транспортер, сообщить дежурному электрику<br>Сообщить техническому персоналу<br>Отремонтировать или заменить датчик <br>Проверить исправность механизмов', 9),
(16, 1, 'Повышенная температура редуктора', 'Ложное срабатывание<br>Низкий уровень масла в корпусе редуктора<br>Внутренние повреждения редуктора', 'Обслуживающему персоналу проверить температуру редуктора, в случае ложного срабатывания вызвать дежурного инженера КиП<br>Омотреть редуктор на наличие подтеканий, устранить и долить трансмиссионное масло<br>Вызвать специалистов сервисной службы', 9),
(17, 2, 'Критическая температура редуктора', 'Ложное срабатывание<br>Низкий уровень масла в корпусе редуктора<br>Необходима замена масла редуктора<br>Внутренние повреждения редуктора', 'Обслуживающему персоналу проверить температуру редуктора, в случае ложного срабатывания вызвать дежурного инженера КиП<br>Омотреть редуктор на наличие подтеканий, устранить и долить трансмиссионное масло<br>Вызвать специалистов сервисной службы', 9),
(18, 1, 'Зажата кнопка \"Аварийный стоп\"', 'Самопроизвольное срабатывание (внутреннее повреждение) кнопки<br>Несанкционированная остановка оборудования', 'Оператору или обслуживающему персоналу выяснить включена кнопка аварийного останова, или это ложный сигнал. В первой ситуации вызвать дежурного электрика', 23),
(19, 2, 'В работе нажата кнопка \"Аварийный стоп\"', 'Самопроизвольное срабатывание (внутреннее повреждение) кнопки<br>Несанкционированная остановка оборудования', 'Оператору или обслуживающему персоналу выяснить причины включения кнопки \"Аварийный стоп\"', 23),
(20, 2, 'Нет контроля скорости', 'Неисправен датчик<br>Не отрегулирован зазор от датчика до лепестков<br>Механизм имеет: повреждение или посторонние предметы, мешающие вращению<br>Механизм перегружен продуктом', 'Заменить датчик<br>Отрегулировать зазор<br>Выяснит причину и устранить<br>Разгрузить механизм', 20),
(21, 1, 'Скорость конвейера на 10% ниже', 'Возможно некачественное электроснабжение или повреждение мотор-редуктора<br>Превышена максимальная подача продукта<br>Избыточная обратная сыпь', 'Электротехническому персоналу проверить электродвигатель и качество подводимого эл. питания<br>Уменьшить подачу продукта<br>Устранить обратную сыпь', 20),
(22, 2, 'Скорость конвейера на 20% ниже', 'Возможно некачественное электроснабжение или повреждение мотор-редуктора<br>Превышена максимальная подача продукта<br>Избыточная обратная сыпь', 'Электротехническому персоналу проверить электродвигатель и качество подводимого тока<br>Уменьшить подачу продукта<br>Устранить обратную сыпь', 20),
(23, 1, 'Превышено время разгон конвейера', 'Конвейер забит продуктом<br>Проскальзывание ленты на барабане головки нории', 'Очистить норию и запустить повторно<br>Натянуть ленту нории', 20),
(24, 2, 'Нет разгона конвейера', 'Конвейер забит продуктом<br>Качество электроснабжения<br>Внутренние повреждения электродвигателя', 'Очистить норию и запустить повторно<br>Электротехническому персоналу проверить качество электроснабжения<br>Вызвать специалистов сервисной службы.', 20),
(25, 2, 'Сработал датчик подпора', 'Забит самотёк на выходе нории<br>Ложное срабатывание', 'Выяснить причину и устранить её<br>Заменить либо отремонтировать датчик', 27),
(26, 1, 'Повышенная температура подшипника', 'Ложное срабатывание<br>Отсутствие или недостаточное количество смазки в подшипниковом узле<br>Внутренние повреждения подшипника', 'Обслуживающему персоналу проверить температуру подшипника, в случае ложного срабатывания вызвать дежурного инженера КиП<br>Выяснить причину отсутствия или недостатка смазки в узле, добавить смазки<br>Заменить подшипник', 30),
(27, 2, 'Критическая температура подшипника', 'Ложное срабатывание<br>Отсутствие или недостаточное количество смазки в подшипниковом узле<br>Внутренние повреждения подшипника', 'Обслуживающему персоналу проверить температуру подшипника, в случае ложного срабатывания вызвать дежурного инженера КиП<br>Выяснить причину отсутствия или недостатка смазки в узле, добавить смазки<br>Заменить подшипник', 30),
(28, 1, 'Повышенная вибрация', 'Разрушение (внутренние повреждения подшипникового узла<br>Налипание продукта на барабан головки нории<br>Разрушение футеровки барабана головки нории', 'Заменить подшипниковый узел<br>Oчистить барабан головки нории<br>Заменить футеровку', 18),
(29, 2, 'Критическая вибрация', 'Разрушение (внутренние повреждения подшипникового узла)<br>Налипание продукта<br>Разрушение футеровки', 'Остановить конвейер и выяснить причину<br>Заменить подшипник<br>Очистить барабан', 18),
(30, 2, 'Сход ленты', 'Сход ленты по причине неравномерного растяжения', 'Отправить тех персонал для регулировки ленты', 21),
(31, 2, 'Нет давления сжатого воздуха.', 'Не работает компрессор<br>В зимний период возможно перемерзание воздухоподводящих трубок<br>Обрыв трассы сжатого воздуха', 'Обратиться к техперсоналу', 14),
(32, 2, 'Давление сжатого воздуха ниже нормы.', 'Недостаточная производительность компрессора<br>Утечка воздуха<br>В зимний период возможно перемерзание воздухоподводящих трубок', 'Обратиться к техперсоналу', 14),
(33, 2, 'Давление сжатого воздуха выше нормы.', 'Неисправен регулятор давления ресивера', 'Отремонтировать либо заменить', 14),
(34, 1, 'Наличие конденсата в системе.', 'Неисправен осушитель', 'Произвести диагностику и вызвать специализированную сервисную службу', 13),
(35, 2, 'Конденсатоотводчик не в норме.', 'Конденсатоотводчик неисправен', 'Заменить, либо отремонтировать', 13),
(36, 2, 'Авария конденсатоотводчика.', 'Конденсатоотводчик неисправен<br>Засорение входного отверстия конденсатоотводчика<br>Образование воздушной пробки в конденсатоотводчике<br>В зимний период возможно примерзание ', 'Заменить, либо отремонтировать<br>Демонтировать конденсатоотводчик. Прочистить либо заменить сетчатый фильтр на входе\n<br>Выполнить принудительный сброс конденсата<br>Oбратиться к техперсоналу', 13),
(37, 2, 'Датчик взрыворазрядителя не в норме.', 'Неисправен датчик<br>Обрыв провода датчика\n  ', 'Устранить неисправность датчика или проводки<br>Обратиться к электротехнической службе предприятия   \n  ', 19),
(38, 2, 'Сработал датчик взрыворазрядителя.', 'Ложное срабатывание<br>Резкий перепад давления в системе воздуховодов вызванный не правильным пуском оборудования<br>Открытие мембраны', 'Устранить неисправность датчика или проводки<br>Заменить взрыворазрядитель<br>Обратиться к руководителю техслужбы', 19),
(39, 2, 'Потеряна связь с датчиком пыли', 'Пропал, или окислился контакт', 'Обратиться к электротехническому персоналу', 16),
(40, 2, 'Авария датчика пыли', 'Неисправен датчик пыли', 'Обратиться к электротехническому персоналу', 16),
(41, 1, 'Повышенный уровень выброса пыли', 'Не корректная регулировка регенерации и других характеристик фильтра<br>Повреждены фильтроэлементы<br>Нарушен герметичность корпуса между камерами чистого и запыленного воздуха. Повреждение уплотнений<br>Нарушена герметизация в посадочных местах фильтровальных элементов<br>Фильтровальный элемент зафиксирован плохо', 'Произвести регулировку фильтра<br>Заменить фильтровальные элементы<br>Проверить затяжку болтов корпуса фильтра. Выполнить герметизацию корпуса<br>Проверить затяжку болтовых соединений каркасов фильтровальных элементов. Целостность уплотнений<br>Проверить целостность пружинного кольца и равномерность прилегания к адаптеру<br>Проверить затяжку хомутов и равномерный обжим фильтровального элемента.', 16),
(42, 2, 'Критический уровень выброса пыли', 'Не корректная регулировка регенерации и других характеристик фильтра<br>Входные параметры в фильтр выше нормы<br>Повреждены фильтроэлементы                              ', 'Произвести регулировку фильтра<br>Уменьшить расход воздуха при помощи шиберной задвижки<br>Заменить фильтровальные элементы                                              ', 16),
(45, 2, 'Несанкционированное открытие люка обслуживания.', 'Ложное срабатывание<br>Тех персонал не закрыл либо несанкционированное открыл люк', 'Устранить неисправность датчика или проводки<br>Обратиться к руководителю техслужбы', 12),
(46, 2, 'Отсутствует механическое срабатывание электроклапана', 'Клапан забит или заклинил<br>Повреждена мембрана', 'Отремонтировать клапан<br>Заменить мембрану', 10),
(47, 2, 'Обрыв эл. цепи электролапана', 'Обрыв эл. цепи электролапана', 'Обратиться к электротехническому персоналу', 10),
(48, 2, 'Короткое замыкания эл. цепи электроклапана', 'Короткое замыкания эл. цепи электроклапана', 'Обратиться к электротехническому персоналу', 10),
(49, 2, 'Ошибка', 'причина1', 'нет', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_errcode_types`
--

CREATE TABLE `smart_errcode_types` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL COMMENT 'Type name',
  `ftclr` varchar(32) NOT NULL COMMENT 'Font color',
  `bgclr` varchar(32) NOT NULL COMMENT 'BG Color'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Alarm Types';

--
-- Дамп данных таблицы `smart_errcode_types`
--

INSERT INTO `smart_errcode_types` (`id`, `name`, `ftclr`, `bgclr`) VALUES
(0, 'info', 'gray', 'darkgray'),
(1, 'warning', 'yellow', 'darkgray'),
(2, 'critical', 'white', 'red');

-- --------------------------------------------------------

--
-- Структура таблицы `smart_informer`
--

CREATE TABLE `smart_informer` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_informer`
--

INSERT INTO `smart_informer` (`id`, `text`, `active`) VALUES
(1, 'Предприятие-изготовитель гарантирует устойчивую работу устройства, его соответствие требованиям технических условий при соблюдении потребителем условий эксплуатации, установленных техническими условиями и эксплуатационными документами.', 1),
(2, 'В случае невозможности установить причину нарушения рабочего режима, проконсультируйтесь в службе сервиса ООО «Зерновая Столица».', 1),
(3, 'Для обеспечения нормальной работы конвейера, периодически, не реже одного раза в месяц, производится тщательный осмотр всех его частей.', 1),
(4, 'Обслуживание оборудования заключается в наблюдении за его работой, в периодическом осмотре, регулированию, смазке и выполнении плановых и срочных ремонтов.', 1),
(5, 'Перед остановкой оборудования необходимо прекратить загрузку и по возможности удалить весь груз.', 1),
(6, 'Проверьте заземление оборудования. Без заземления эксплуатация запрещена!', 1),
(7, 'Запрещается производить ремонт при работе оборудования.', 1),
(8, 'К работе по обслуживанию оборудования допускаются лица, прошедшие инструктаж по технике безопасности, изучившие настоящий паспорт и инструкцию по эксплуатации.', 1),
(9, 'Некоторые говорят, что стакан наполовину полон. Некоторые считают, что стакан наполовину пуст, механики утверждают, что стакан в два раза больше, чем нужно.', 1),
(10, 'Если вам стало резко холодно, то встаньте в угол там 90 градусов.', 1),
(11, 'Если уже окончательно что-то идёт не так, то откройте уже инструкцию.', 1),
(12, 'Человеку не дано постичь три вещи. Бога, Вселенную и людей, которые придумали стену, через которую всё слышно, но гвоздь в неё забить невозможно!', 1),
(13, 'Не суйте пальцы куда попало, их не так много как кажется.', 1),
(14, 'Ничто так не радует глаз… как второй глаз.', 1),
(15, 'Руководить — это значит не мешать хорошим людям работать.', 1),
(16, 'Что бы не ударить  по пальцу молотком, держите его двумя руками.', 1),
(17, 'Если вам кажется, что дела идут нормально и даже хорошо, значит, вы просто чего-то не заметили.', 1),
(18, 'Увеличение числа участников при подготовке опаздывающей задачи только замедляет процесс.', 1),
(19, 'Единственный способ сделать утро хорошим - проспать его.', 1),
(20, 'В начале рабочего дня обойди и проверь, все ли аспирационное оборудование находится на своих местах', 1),
(21, 'Если аспирационное оборудование остановлено, значит настало лучшее время для поиска и устранения утечек сжатого воздуха', 1),
(22, 'Проходя мимо работающего аспирационного оборудования, обрати внимание на то как работает система регенерации', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_langs`
--

CREATE TABLE `smart_langs` (
  `id` int(11) NOT NULL,
  `name` varchar(16) NOT NULL DEFAULT '',
  `sname` varchar(3) NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_langs`
--

INSERT INTO `smart_langs` (`id`, `name`, `sname`, `active`) VALUES
(1, 'Українська', 'ukr', 1),
(2, 'English', 'eng', 1),
(3, 'Русский', 'rus', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_lang_routes`
--

CREATE TABLE `smart_lang_routes` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT '',
  `ukr` varchar(64) NOT NULL DEFAULT '',
  `eng` varchar(64) NOT NULL DEFAULT '',
  `rus` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_lang_routes`
--

INSERT INTO `smart_lang_routes` (`id`, `name`, `ukr`, `eng`, `rus`) VALUES
(1, 'tit_user', '', 'User', 'Пользователь'),
(2, 'tit_usrs', '', 'Users', 'Пользователи'),
(3, 'tit_pass', '', 'Password', 'Пароль'),
(4, 'tit_active', '', 'Active', 'Активен'),
(5, 'tit_occ', '', 'Occupation', 'Деятельность'),
(6, 'tit_occs', '', 'Occupations', 'Деятельности'),
(7, 'tit_lang', '', 'Language', 'Язык'),
(8, 'tit_langs', '', 'Languages', 'Языки'),
(9, 'tit_ctrl', '', 'Controller', 'Контроллер'),
(10, 'tit_ctrls', '', 'Controllers', 'Контроллеры'),
(11, 'tit_name', '', 'Name', 'Название'),
(12, 'tit_title', '', 'Title', 'Наименование'),
(13, 'tit_tran', '', 'Transport', 'Транспорт'),
(14, 'tit_trans', '', 'Transports', 'Транспорты'),
(15, 'tit_num', '', 'Number', 'Номер'),
(16, 'tit_tranname', '', 'Transport name', 'Наименование транспорта'),
(17, 'tit_sname', '', 'Short Name', 'Сокращение'),
(18, 'tit_order', '', 'Order', 'Приказ'),
(19, 'tit_sender', '', 'Sender', 'Отправитель'),
(20, 'tit_senders', '', 'Senders', 'Отправители'),
(21, 'tit_reciever', '', 'Reciever', 'Получатель'),
(22, 'tit_recievers', '', 'Recievers', 'Получатели'),
(23, 'tit_host', '', 'Host', 'Владелец'),
(24, 'tit_hosts', '', 'Hosts', 'Владельцы'),
(25, 'tit_crop', '', 'Crop', 'Культура'),
(26, 'tit_crops', '', 'Crops', 'Культуры'),
(27, 'tit_unloaded', '', 'Unloaded, kg', 'Выгружено по факту, кг'),
(28, 'tit_portions', '', 'Portions, kg', 'Порция, кг'),
(29, 'tit_task', '', 'Task, kg', 'Задание, кг'),
(30, 'tit_tasks', '', 'Tasks', 'Задания'),
(31, 'tit_taskc', '', 'Task', 'Задание'),
(32, 'tit_block', '', 'Block', 'Блокировка'),
(33, 'tit_date', '', 'Date', 'Дата'),
(34, 'tit_time', '', 'Time', 'Время'),
(35, 'tit_brutto', '', 'Brutto', 'Брутто'),
(36, 'tit_tara', '', 'Tara', 'Тара'),
(37, 'tit_netto', '', 'Netto', 'Нетто'),
(38, 'tit_oall', '', 'Overall', 'Всего'),
(39, 'tit_stat', '', 'Status', 'Статус'),
(40, 'tit_stats', '', 'Statuses', 'Статусы'),
(41, 'tit_add_task', '', 'Add new task', 'Добавить новое задание'),
(42, 'tit_edit_task', '', 'Edit task', 'Редактировать задание'),
(43, 'tit_dict', '', 'Dictonary', 'Справочник'),
(44, 'tit_dicts', '', 'Dictonaries', 'Справочники'),
(45, 'tit_ctr', '', 'Controll', 'Управление'),
(46, 'tit_code', '', 'Code', 'Код'),
(47, 'tit_weight', '', 'Weight, kg', 'Вес, кг'),
(48, 'crop_wheat', '', 'Wheat', 'Пшеница'),
(49, 'crop_barley', '', 'Barley', 'Ячмень'),
(50, 'crop_corn', '', 'Corn', 'Кукуруза'),
(52, 'btn_add', '', 'Add', 'Добавить'),
(53, 'btn_edit', '', 'Edit', 'Изменить'),
(54, 'btn_close', '', 'Close', 'Закрыть'),
(55, 'btn_dicts', '', 'Dictonaries', 'Справочники'),
(56, 'btn_del', '', 'Delete', 'Удалить'),
(57, 'btn_logout', '', 'Logout', 'Выйти'),
(58, 'btn_login', '', 'Login', 'Войти'),
(59, 'stat_ready', '', 'Ready', 'Готов'),
(60, 'stat_inwork', '', 'In work', 'В работе'),
(61, 'stat_crash', '', 'Crash', 'Авария'),
(62, 'stat_serv', '', 'Maintgf required', 'Требует ТО'),
(63, 'stat_manu', '', 'Включен по месту', 'Включен по месту'),
(64, 'stat_repa', '', 'Repairing', 'В ремонте'),
(65, 'stat_die', '', 'Shutting down', 'Завершение работы'),
(66, 'stat_nocon', '', 'No connection', 'Нет связи'),
(67, 'stat_absent', '', 'Is absent', 'Отсутствует'),
(68, 'stat_isok', '', 'Is ok', 'В норме'),
(69, 'stat_pushed', '', 'Pushed', 'Нажата'),
(70, 'stat_auto', '', 'Automatic', 'Автоматический'),
(71, 'stat_on', '', 'On', 'Вкл'),
(72, 'stat_off', '', 'Off', 'Выкл'),
(73, 'stat_open', '', 'Opened', 'Открыт'),
(74, 'stat_close', '', 'Closed', 'Закрыт'),
(75, 'stat_exec', '', 'Executing', 'Выполняется'),
(76, 'stat_stand', '', 'Standby', 'В ожидании'),
(77, 'stat_new', '', 'New', 'Новый'),
(78, 'stat_editing', '', 'Editing', 'Редактируется'),
(79, 'stat_stoped', '', 'Stoped', 'Остановлен'),
(80, 'stat_done', '', 'Done', 'Завершен'),
(81, 'stat_wait', '', 'Waiting', 'Ожидание'),
(82, 'stat_empty', '', '', ''),
(83, 'tit_login', '', 'Login', 'Войти в систему'),
(84, 'trans_ship', '', 'Ship', 'Корабль'),
(85, 'trans_rail', '', 'Railway', 'ЖД'),
(86, 'trans_car', '', 'Car', 'Авто'),
(87, 'trans_manu', '', 'Walk', 'Ногами'),
(88, 'occ_admin', '', 'Admin', 'Администратор'),
(89, 'occ_customer', '', 'Customer', 'Заказчик'),
(90, 'occ_operator', '', 'Operator', 'Оператор'),
(91, 'occ_engineer', '', 'Engineer', 'Инженер'),
(92, 'tit_tasknum', '', 'Task number', 'Номер задания'),
(95, 'msg_bad_pass', '', 'Incorrect password', 'Укажите пароль корректно'),
(96, 'msg_empty_lines', '', 'Empty lines', 'Необходимо заполнить поля'),
(97, 'msg_bad_dberror', '', 'Database error', 'Ошибка базы данных'),
(98, 'tit_passive', '', 'Passive', 'Пассивный'),
(99, 'tit_index', '', 'Index', 'Индекс'),
(100, 'tit_mode', '', 'Mode', 'Режим'),
(101, 'tit_ctypes', '', 'Controller types', 'Типы контроллеров'),
(102, 'tit_type', '', 'Type', 'Тип'),
(103, 'tit_class', '', 'Class', 'Класс'),
(105, 'tit_modif', '', 'Modif', 'Модификация'),
(106, 'tit_size', '', 'Size', 'Размер'),
(107, 'tit_host', '', 'Host', 'Владелец'),
(108, 'tit_redir', '', 'Data redirection', 'Перенаправление'),
(109, 'tit_statgrp', '', 'Status group', 'Группа статусов'),
(110, 'tit_invisible', '', 'Invisible', 'Скрыт'),
(111, 'tit_dtypes', '', 'Devices types', 'Типы устройства'),
(112, 'tit_stat_grps', '', 'Status groups', 'Группы статусов'),
(113, 'tit_sgrps_opts', '', 'Status groups options', 'Опции групп статусов'),
(114, 'tit_devs', '', 'Devices', 'Устройства'),
(115, 'tit_id', '', 'ID', 'ID'),
(116, 'tit_yes', '', 'Yes', 'Да'),
(117, 'tit_no', '', 'No', 'Нет'),
(118, 'tit_weigher', '', 'Weigher', 'Весы'),
(119, 'tit_aspir', '', 'Aspiration', 'Аспирация'),
(120, 'tit_dmodif', '', 'Modification', 'Модификация'),
(121, 'btn_save', '', 'Save', 'Сохранить'),
(122, 'tit_notbyindex', '', 'Without indexing', 'Без индексации'),
(124, 'tit_byindex', '', 'By index', 'По индексу'),
(126, 'tit_clas', '', 'Controller classes', 'Классы контроллеров'),
(127, 'tit_dmodifs', '', 'Device modifications', 'Модификации устройств'),
(128, 'tit_strucs', '', 'Data structures', 'Структуры данных'),
(129, 'tit_nomi', '', 'Nominal structure', 'Структура Номинал'),
(130, 'tit_cur', '', 'Current structure', 'Структура Текущих'),
(131, 'tit_not_selected', '', 'Not selected', 'Не выбрано'),
(132, 'tit_lines', '', 'Lines', 'Поля'),
(133, 'tit_meas', '', 'Measurement', 'Единицы измерения'),
(134, 'tit_struc', '', 'Structure', 'Структура'),
(135, 'tit_val', '', 'Value', 'Переменная'),
(136, 'tit_default', '', 'Default', 'По умолчанию'),
(137, 'meas_volt', '', 'V', 'В'),
(138, 'meas_watt', '', 'W', 'Вт'),
(139, 'meas_kwatt', '', 'kW', 'кВт'),
(140, 'meas_amp', '', 'A', 'A'),
(141, 'meas_hour', '', 'h', 'час'),
(142, 'meas_min', '', 'm', 'мин'),
(143, 'meas_sec', '', 's', 'сек'),
(144, 'meas_milisec', '', 'ms', 'мc'),
(145, 'meas_ghz', '', 'Ghz', 'Гц'),
(146, 'meas_cels', '', '°C', '°C'),
(147, 'meas_rpm', '', 'RPM', 'об/мин'),
(148, 'meas_cnt', '', 'SHT', 'ШТ'),
(149, 'meas_g', '', 'g', 'г'),
(150, 'meas_kg', '', 'kg', 'кг'),
(151, 'meas_tonn', '', 't', 'т'),
(152, 'meas_liter', '', 'l', 'л'),
(153, 'meas_kbps', '', 'kbps', 'kbps'),
(154, 'meas_angle', '', '°', '°'),
(155, 'meas_pa', '', 'Pa', 'Па'),
(156, 'meas_bar', '', 'Bar', 'Бар'),
(157, 'meas_proc', '', '%', '%'),
(158, 'tit_adding_dict', '', 'Adding new option', 'Добавление новой записи'),
(159, 'tit_editing_dict', '', 'Editing row', 'Редактирование'),
(160, 'btn_return', '', 'Return', 'Вернуться'),
(161, 'tit_ip', '', 'IP', 'IP'),
(162, 'tit_port', '', 'Port', 'Порт'),
(164, 'tit_auth', '', 'Auth', 'Авторизация'),
(165, 'msg_usr_not_found', '', 'User not found in database', 'Пользователь не найден в базе данных'),
(166, 'tit_modules', '', 'Modules', 'Модули'),
(167, 'tit_ports', '', 'Ports', 'Порты'),
(168, 'tit_module', '', 'Module', 'Модуль'),
(169, 'tit_dest', '', 'Destination', 'Направление'),
(170, 'tit_invers', '', 'Inversion', 'Инверсия'),
(171, 'tit_i2caddr', '', 'I2C Address', 'I2C Адресс'),
(172, 'tit_intype', '', 'In type', 'Тип входа'),
(173, 'tit_income', '', 'Income', 'Входящий'),
(174, 'tit_outcome', '', 'Outcome', 'Исходящий'),
(175, 'tit_bit', '', 'Bit', 'Бит'),
(176, 'tit_word', '', 'Word', 'Word'),
(177, 'tit_dword', '', 'DWord', 'DWord'),
(178, 'tit_dports', '', 'Device ports', 'Порты устройства'),
(179, 'tit_dir', '', 'Directory', 'Направление'),
(180, 'tit_antidreb', '', 'Antidepress', 'Антидребезг'),
(181, 'tit_cmodules', '', 'Controller modules', 'Модули контроллера'),
(182, 'tit_cmodule_opts', '', 'Controller module fields', 'Поля модуля контроллера'),
(183, 'tit_opt', '', 'Option', 'Поле'),
(184, 'tit_devlogport', '', 'Device logic port', 'Порт уст-ва'),
(185, 'stat_default', '', 'Default', 'Стандарт'),
(186, 'tit_grp', '', 'Group', 'Группа'),
(187, 'obj_fan', '', 'Fan', 'Вентилятор'),
(188, 'obj_fil', '', 'Filter', 'Фильтр'),
(189, 'obj_fil_body', '', 'Filter body', 'Корпус фильтра'),
(190, 'obj_convbelt', '', 'Belt conveyer', 'Конвейер ленточный'),
(191, 'obj_convchain', '', 'Chain conveyer', 'Конвейер цепной'),
(192, 'obj_convnoria', '', 'Noria conveyer', 'Нория'),
(193, 'obj_eledrive', '', 'Electrical drive', 'Электропривод'),
(194, 'obj_gate', '', 'Gate', 'Затвор шлюзовый'),
(195, 'obj_insphatch', '', 'Inspection Hatch', 'Люк ревизионный'),
(197, 'obj_sensdust', '', 'Dust sensor', 'Датчик пыли'),
(198, 'obj_senstemp', '', 'Temperature sensor', 'Датчик температуры'),
(199, 'obj_sensvibr', '', 'Vibration sensor', 'Датчик вибрации'),
(200, 'tit_percs', '', 'Contrahens', 'Контрагенты'),
(202, 'tit_tname', '', 'Transport name', 'Название транспорта'),
(203, 'tit_host2', '', 'Host', 'Владелец'),
(204, 'cla_trans', '', 'Transport devices', 'Транспортное оборудование'),
(205, 'cla_aspir', '', 'Aspiration networks', 'Аспирационные сети'),
(206, 'cla_weigher', '', 'Weigher devices', 'Весовое оборудование'),
(207, 'stat_door', '', 'Door statuses', 'Состояния двери'),
(208, 'obj_elecvalve', '', 'Electric Valve', 'Электроклапан'),
(209, 'obj_senscirccut', '', 'Rotation sensor', 'Датчик вращения'),
(210, 'obj_sensdifpres', '', 'Diff Pressure Sensor', 'Датчик диф-давления'),
(211, 'obj_sensblower', '', 'Blower', 'Панель взрыворазрядительная'),
(212, 'stat_wtasks', '', 'Weigher Tasks', 'Задачи Весов'),
(213, 'stat_fanpower', '', 'Eng power status', 'Опера напряжение привода'),
(214, 'obj_emerstop', '', 'Emergency Stop', 'Кнопка \"Аварийный Стоп\"'),
(215, 'obj_condtrap', '', 'Steam Trap', 'Конденсатоотводчик'),
(216, 'obj_senscompair', '', 'Compressed Air Sensor', 'Датчик сжатого воздуха'),
(217, 'tit_taskc', '', 'Task', 'Задание:'),
(218, 'wstat_crash', '', 'Crash', 'Авария'),
(219, 'wstat_startprocdoz', '', 'Starting the dosing process', 'Запуск процесса дозирования'),
(220, 'wstat_pauseweigher', '', 'In pause mode', 'Весы в режиме паузы'),
(221, 'wstat_stopprocdoz', '', 'Stop dosing process', 'Стоп процесса дозирования'),
(222, 'wstat_taskdone', '', 'Task completed successfully', 'Задание выполнено успешно'),
(223, 'wstat_disdone', '', 'Product upload completed', 'Выгрузка продукта завершена'),
(224, 'wstat_wdbwrite', '', 'Writing in database', 'Запись отвеса в БД сервера'),
(225, 'wstat_wdbwriteresp', '', 'Waiting for database', 'Ожидание ответа от сервера после записи в БД'),
(226, 'tit_settings', '', 'Settings', 'Настройки'),
(227, 'btn_starthydro', '', 'Start', 'ПУСК'),
(228, 'btn_stophydro', '', 'Stop', 'СТОП'),
(229, 'btn_startweigher', '', 'Start weigher', 'ПУСК'),
(230, 'btn_stopweigher', '', 'Stop weigher', 'СТОП'),
(231, 'btn_pause', '', 'Pause', 'ПАУЗА'),
(232, 'tit_doneplumbnum', '', 'Done circs num', 'Количество циклов'),
(233, 'tit_productivity', '', 'Productivity', 'Производительность, т/ч'),
(234, 'wstat_startweigher', '', 'Starting the weighing process', 'Запуск процесса взвешивания'),
(235, 'wstat_stopweigher', '', 'Stop weighing process', 'Стоп процесса взвешивания'),
(236, 'wstat_nettotarawei', '', 'Calculation of net tare', 'Расчёт нетто и тары'),
(237, 'wstat_bdwritestart', '', 'Start recording a plumb in the server database', 'Начало записи отвеса в БД сервера'),
(238, 'wstat_bdwritedone', '', 'Record plumb line in the database completed', 'Запись отвеса в БД выполнена'),
(239, 'wstat_taskdone', '', 'Task completed successfully', 'Задание выполнено успешно'),
(240, 'wstat_disproddone', '', 'Product upload completed', 'Выгрузка продукта завершена'),
(241, 'wstat_taskinerror', '', 'Task Entry Error', 'Ошибка ввода задания'),
(242, 'wstat_entertask', '', 'To start, enter the task', 'Для запуска введите задание'),
(243, 'wstat_presstaskstart', '', 'Click the task launch button', 'Нажмите кнопку запуска задания'),
(244, 'wstat_nostarttask', '', 'There is no running task', 'Нет запущенного задания'),
(245, 'wstat_notdonetaskactive', '', 'Not done! Task is active', 'Не выполнено! Задание активно'),
(246, 'wstat_noprodonwei', '', 'There is no product on the scales', 'На весах нет продукта'),
(247, 'wstat_hydroerror', '', 'Problems in the operation of the hydroelectric station', 'Проблемы в работе гидростанции'),
(248, 'wstat_weiloaddodis', '', 'The scales is loaded. Unload', 'Весы загружены. Выполните выгрузку'),
(249, 'wstat_waitprodwei', '', 'Waiting for the product on the scale', 'Ожидание продукта на весах'),
(250, 'wstat_weirlax', '', '', 'Ожидание успокоения'),
(251, 'wstat_waitempty', '', '', 'Ожидание опустошения'),
(252, 'wstat_errorzadtimeoutotk', '', 'Failure of the overhead valve (closing timeout)', 'Авария надвесовой задвижки (тайм-аут закрытия)'),
(253, 'wstat_errnadzadviotk', '', 'Failure of the overhead valve (timeout of opening)', 'Авария надвесовой задвижки (тайм-аут открытия)'),
(254, 'wstat_errpodveszadzak', '', 'Failure of the under valve failure (closing timeout)', 'Авария подвесовой задвижки (тайм-аут закрытия)'),
(255, 'wstat_errpodzadotk', '', 'Failure of the under valve (timeout of opening)', 'Авария подвесовой задвижки (тайм-аут открытия)'),
(256, 'wstat_stoppress', '', 'The emergency stop is pressed', 'Нажат аварийный стоп'),
(257, 'wstat_rectransstoped', '', 'The receiving transport equipment is stopped', 'Принимающее транспортное оборудование остановлено'),
(258, 'wstat_kalib', '', 'Scales in calibration mode', 'Весы в режиме калибровки'),
(259, 'wstat_koncevik1', '', '', 'Одновременная сработка концевиков надвесовой задвижки'),
(260, 'wstat_koncevik2', '', '', 'Одновременная сработка концевиков подвесовой задвижки'),
(261, 'wstat_bunkererr', '', 'Overload of the weigh bin', 'Перегрузка весового бункера'),
(262, 'tit_hydro', '', 'Hydrostation', 'Гидростанция'),
(263, 'btn_weigherfill', '', 'Fill', 'Загрузка'),
(264, 'btn_weigherout', '', 'Out', 'Выгрузка'),
(265, 'stat_hydroerr3', '', 'No oil', 'Нет масла'),
(266, 'stat_hydroerr2', '', 'Low oil temperature', 'Низка температура масла'),
(267, 'stat_hydroerr1', '', 'Starter error', 'Авария пускателя'),
(268, 'stat_turnedoff', '', 'Off', 'Выключена'),
(269, 'btn_sens', '', 'Sensors', 'Датчики'),
(270, 'stat_pause', '', 'Pause', 'Пауза'),
(271, 'stat_unknown', '', 'Unknwon status', 'Статус неизвестен'),
(272, 'stat_offline', '', 'Offline', 'Нет связи'),
(273, 'tit_hold', '', 'Hold', 'Трюм'),
(274, 'tit_holdfact', '', 'Hold weight', 'Загрузка трюма'),
(275, 'wstat_dead', '', 'No connection', 'Нет связи'),
(276, 'wei_hydauto', '', 'In work (Automatic)', 'Включена (Автоматический)'),
(277, 'wei_hydmanu', '', 'In work (Manual)', 'Включена (Ручной)'),
(278, 'tit_graphs', '', 'Graphs', 'Графики'),
(279, 'tit_graphlineal', '', 'Lineal', 'Линейный'),
(280, 'tit_graphbar', '', 'Bar', 'Столбчатый'),
(281, 'tit_graphcirc', '', 'Circle', 'Круговой'),
(282, 'tit_main', '', 'Main', 'Главная'),
(283, 'cla_grav', '', 'Gravity Equipment', 'Самотечное оборудование'),
(284, 'cla_clean', '', 'Cleaning Equipment', 'Очистительное оборудование'),
(285, 'stat_weigher', '', 'Weigher', 'Весы'),
(286, 'stat_hydro', '', 'Hydrostation', 'Гидростанция'),
(287, 'stat_stopbtn', '', 'Stop button', 'Кнопка Стоп'),
(288, 'stat_pushed', '', 'Pushed', 'Нажата'),
(289, 'stat_blowjob', '', 'Blow', 'Панель взрыворазрядительная'),
(290, 'obj_klapgrp', '', 'Valves group', 'Электроклапана'),
(291, 'tit_num', '', 'Number', 'Число'),
(292, 'tit_lineal', '', 'Lineal', 'Линейный'),
(293, 'tit_bar', '', 'Bar', 'Дуга'),
(294, 'tit_viewtype', '', 'View type', 'Тип отображения'),
(295, 'tit_limstruc', '', 'Limit struc', 'Limit struc'),
(296, 'tit_viewtypes', '', 'View types', 'Типы отображения'),
(297, 'tit_alert', '', 'Alert', 'Предупреждение'),
(298, 'tit_warning', '', 'Warning', 'Тревожный'),
(299, 'tit_danger', '', 'Danger', 'Критический'),
(300, 'tit_nomivals', '', 'Nominal Values', 'Номинальные значения'),
(301, 'tit_plists', '', 'Completeness', 'Комплектность'),
(303, 'tit_plist', '', 'Equipment', 'Комплектация'),
(304, 'tit_plistopts', '', 'Equipment', 'Комплектация'),
(305, 'tit_list', '', 'List', 'Список'),
(306, 'tit_desc', '', 'Description', 'Описание'),
(307, 'tit_cnt', '', 'Count', 'Количество'),
(308, 'tit_marks', '', 'Marks', 'Примечание'),
(309, 'obj_red', '', 'Reductor', 'Редуктор'),
(310, 'obj_sensbeltexit', '', 'Sensor of the belt exit', 'Датчик схода ленты'),
(311, 'obj_speedsens', '', 'Speed Sensor', 'Датчик скорости'),
(312, 'obj_senspodp', '', 'Proportional sensor', 'Датчик подпора'),
(313, 'obj_sysmonitor', '', 'Equipment Monitoring System', 'Система мониторинга оборудования'),
(314, 'obj_convscrew', '', 'Conveyor Screw', 'Конвейер шнековый'),
(315, 'obj_cleanauger', '', 'Screw', 'Шнек зачистной'),
(316, 'obj_sensrot', '', 'Rotational sensor', 'Датчик вращения'),
(317, 'tit_outtitle', '', 'Out Title', 'Out Title'),
(318, 'tit_defeng', '', 'Default', 'Default'),
(319, 'tit_viewtypeeng', '', 'View', 'View'),
(320, 'tit_statgrpdef', '', 'Status group', 'Группа статусов'),
(321, 'tit_measeng', '', 'Measure', 'Measure'),
(322, 'tit_air', '', '', 'Воздух'),
(323, 'tit_fire', '', '', 'Огонь'),
(324, 'tit_viewgrp', '', 'View group', 'Группа отображения'),
(325, 'tit_viewgrps', '', '', 'Виды отображения данных'),
(326, 'meas_dustmeas', '', 'мг/м<sup>3</sup>', 'мг/м<sup>3</sup>'),
(327, 'meas_vibro', '', 'м/c<sup>2</sup>', 'м/c<sup>2</sup>'),
(328, 'tit_cfaces', '', 'User interface', 'Пользовательский интерфейс'),
(329, 'tit_dev', '', 'Device', 'Устройство'),
(330, 'tit_cfaces', '', 'Current data interface', 'Интерфейс текущих значений'),
(331, 'obj_body', '', 'Body', 'Корпус'),
(332, 'tit_noriahead', '', 'Noria head', 'Голова нории'),
(333, 'tit_noriafoot', '', 'Noria floor', 'Башмак нории'),
(334, 'obj_senschainbreak', '', '', 'Датчик обрыва цепи'),
(335, 'stat_work_mode', '', 'Work mode', 'Режим работы'),
(336, 'tit_devgrps', '', 'Device groups', 'Группы устройств'),
(337, 'tit_devgrp', '', 'Device group', 'Группа устройств'),
(338, 'obj_temp2', '', '', 'Подшипниковый узел'),
(339, 'tit_dots', '', '', 'Электроклапана'),
(340, 'tit_privod', '', '', 'Приводная станция'),
(341, 'tit_natyazh', '', '', 'Натяжная станция'),
(342, 'tit_devmap', '', 'Devices positions', 'Расположение устройств'),
(343, 'tit_strucopts', '', 'Structure options', 'Параметры структуры'),
(344, 'meas_count', '', 'count', 'Кол-во'),
(345, 'tit_max', '', 'Max', 'Max'),
(346, 'tit_min', '', 'Min', 'Min'),
(347, 'obj_sensdust2', '', 'Dust sensor OUT', 'Датчик пыли на Выходе'),
(348, 'tit_showscat', '', 'Show scat', 'В разлете'),
(349, 'tit_orderr', '', 'Order', 'Сортировка'),
(350, 'obj_konvbody', '', 'Body', 'Корпус скребкового конвейера'),
(351, 'stat_power', '', 'Power', 'Опер Напр'),
(352, 'stat_klap', '', '', 'Клапана'),
(353, 'stat_podp', '', '', 'Датчик подпора'),
(354, 'stat_shod', '', '', 'Сход ленты'),
(355, 'stat_rot', '', '', 'Датчик вращения'),
(356, 'obj_noriabody', '', '', 'Корпус нории'),
(357, 'stat_btn', '', 'Buttons', 'Кнопки'),
(358, 'stat_door', '', '', 'Люк'),
(359, 'stat_blow', '', '', 'Взрыворазрядитель'),
(369, 'stat_closed', '', '', 'Закрыт'),
(370, 'stat_opened', '', '', 'Открыт'),
(373, 'stat_normcrash', '', '', 'Авария/Норма'),
(374, 'stat_offon', '', '', 'Выкл/Вкл'),
(375, 'stat_openclose', '', '', 'Открыт/Закрыт'),
(379, 'tit_dmodels', '', '', 'Модели устройств'),
(380, 'tit_lid', '', 'Local ID', 'Локальный ID'),
(381, 'tit_graph', '', 'Graph', 'Графики'),
(382, 'meas_nothing', '', ' ', ' '),
(383, 'tit_clr', '', 'Colour', 'Цвет'),
(384, 'stat_norm', '', 'Normal', 'Норма'),
(385, 'stat_distrez', '', 'Dist', 'Дистанционный'),
(386, 'tit_materials', '', '', 'ТМЦ'),
(387, 'tit_price', '', '', 'Стоимость'),
(388, 'tit_count', '', '', 'Кол-во'),
(389, 'tit_currency', '', '', 'Валюта'),
(390, 'tit_grn', '', '', 'Грн'),
(391, 'tit_eur', '', 'Euro', 'Евро'),
(392, 'tit_dollar', '', 'Dollar', 'Доллар'),
(393, 'tit_currencies', '', 'Currencies', 'Виды валют'),
(394, 'tit_hourly', '', '', 'Часы'),
(395, 'tit_calendar', '', '', 'Месячно'),
(396, 'tit_sertimetype', '', '', 'Тип работы'),
(397, 'tit_serworkmar', '', '', 'Материалы для работы'),
(398, 'tit_sworks', '', '', 'Работы ТО'),
(399, 'tit_services', '', '', 'Тех обслуживание'),
(400, 'tit_sernum', '', '', 'Номер ТО'),
(401, 'tit_material', '', '', 'Материал'),
(402, 'tit_znach', '', '', 'Значение'),
(403, 'tit_uzel', '', '', 'Узел'),
(404, 'occ_slesar', '', '', 'Слесарь'),
(405, 'occ_elec', '', '', 'Электромеханик'),
(406, 'occ_selselec', '', '', 'Электромеханик, Слесарь'),
(407, 'tit_userocc', '', '', 'Исполнитель'),
(408, 'tit_statistics', '', '', 'Общие данные'),
(409, 'obj_eledrivepch', '', '', 'Электропривод (ПЧ)'),
(410, 'stat_onoff', '', '', 'ВклВыкл'),
(411, 'tit_specact', '', '', 'Спец кнопка'),
(412, 'tit_repairable', '', '', 'Ремонтируем'),
(413, 'tit_visible', '', '', 'В разлете'),
(414, 'tit_type2', '', 'Type', ' '),
(415, 'btn_cfg_upload', '', 'Controlling systems', 'Управление системами'),
(416, 'tit_errcodes', '', 'Error codes', 'Коды ошибок'),
(417, 'tit_reason', '', 'Reason', 'Причина'),
(418, 'tit_solution', '', 'Solution', 'Решение'),
(419, 'tit_msg', '', 'Message', 'Сообщение'),
(420, 'tit_sieid', '', 'Siemens ID', 'Siemens ID'),
(421, 'alr_ayousure', '', 'A you sure?', 'Вы уверены?'),
(422, 'tit_contype', '', 'Connection type', 'Тип подключения'),
(423, 'tit_devtype', '', 'Device type', 'Тип устройства'),
(424, 'stat_mest', '', 'Manual', 'Местный'),
(425, 'stat_turnedoff', '', 'Off', 'Выключен'),
(426, 'stat_distance', '', 'Distance', 'Дистанция'),
(427, 'tit_userange', '', 'Use range', 'Использовать диапазон'),
(428, 'tit_range', '', 'Range', 'Диапазон'),
(429, 'tit_format', '', 'Format', 'Формат'),
(430, 'tit_scheme', '', 'Scheme', 'Схема'),
(431, 'tit_grp', '', 'Group', 'Группа'),
(432, 'tit_sys_speed', '', 'System speed', 'Скорость системы'),
(433, 'tit_alarms', '', 'Messages/Alarms', 'Сообщения/Авариии'),
(434, 'tit_mac', '', 'MAC', 'MAC'),
(435, 'tit_syscontroll', '', 'System controll', 'Управление системой'),
(436, 'tit_warnmin', '', 'Waning min', 'Тревожный минимум'),
(437, 'tit_critmin', '', 'Critical min', 'Критический минимум'),
(438, 'tit_warnmax', '', 'Warning max', 'Тревожный максимум'),
(439, 'tit_critmax', '', 'Critical max', 'Критический максимум'),
(440, 'tit_dcontypes', '', 'Device onnection types', 'Типы связи устройств'),
(441, 'tit_contype', '', 'Connection type', 'Тип связи'),
(442, 'tit_value', '', 'Value', 'Значение'),
(443, 'tit_warnmincode', '', 'Warning min code', 'Тревожный минимум код'),
(444, 'tit_critmincode', '', 'Critical min code', 'Критический минимум код'),
(445, 'tit_warnmaxcode', '', 'Warning max code', 'Тревожный максимум код'),
(446, 'tit_critmaxcode', '', 'Critical max code', 'Критический максимум код'),
(447, 'tit_faces', '', 'Device interfaces', 'Интерфейс устройства'),
(448, 'tit_dcontypes_opts', '', 'Connection type variables', 'Переменные типа связи'),
(449, 'tit_warningcode', '', 'Warning limit code', 'Тревожный код предела'),
(450, 'tit_dangercode', '', 'Critical limit code', 'Критический код предела'),
(451, 'tit_posx', '', 'Position X', 'Позиция X'),
(452, 'tit_posy', '', 'Position Y', 'Позиция Y'),
(453, 'tit_pos', '', 'Position', 'Позиция'),
(454, 'tit_ctrlcams', '', 'Cameras', 'Камеры'),
(455, 'tit_ctrlpass', '', 'Passports', 'Паспорта'),
(456, 'tit_reldate', '', 'Release date', 'Дата выпуска'),
(457, 'tit_perf', '', 'Performance', 'Производительность'),
(458, 'tit_factnumber', '', 'Fact number', 'Фактический номер'),
(459, 'tit_weight', '', 'Weight', 'Вес'),
(460, 'tit_visibleonsite', '', 'Visible on site', 'Виден на сайте'),
(461, 'tit_showservice', '', 'Show service', 'Показывать сервис'),
(462, 'tit_userservice', '', 'Use service', 'Использовать сервис'),
(463, 'tit_usecontroll', '', 'Use system controll', 'Использовать управление'),
(464, 'tit_tardev', '', 'Target device', 'Целевое уст-во'),
(465, 'nomi_vals', '', 'Nominal values', 'Номинальные значения');

-- --------------------------------------------------------

--
-- Структура таблицы `smart_materials`
--

CREATE TABLE `smart_materials` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `cnt` float NOT NULL,
  `meas` int(11) DEFAULT NULL,
  `price` float NOT NULL,
  `curr` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица ТМЦ';

--
-- Дамп данных таблицы `smart_materials`
--

INSERT INTO `smart_materials` (`id`, `name`, `cnt`, `meas`, `price`, `curr`, `active`) VALUES
(1, 'Спирт', 1000, 16, 100, 1, 1),
(2, 'Ветошь', 10000, 16, 5, 1, 1),
(3, 'Щетка с мягким ворсом', 1, 15, 0, NULL, 1),
(4, 'Набор отверток', 1, 15, 0, NULL, 1),
(5, 'Мыльный расствор', 1, 16, 0, NULL, 1),
(6, 'Набор слесарного инструмента', 1, 15, 0, NULL, 1),
(7, ' Виброметр', 1, 15, 0, NULL, 1),
(8, 'Тепловизор', 1, 15, 0, NULL, 1),
(9, 'Смазки LGEP2 SKF', 400, 16, 600, 1, 1),
(10, 'Синтетическое масло ISO VG 320', 10000, 16, 2000, 1, 1),
(11, 'Синтетическое масло TELIUM VSF320', 10000, 16, 2500, 1, 1),
(12, 'Минеральное масло ISO VG220', 10000, 16, 1900, 1, 1),
(13, 'Минеральное масло BLASIA 220', 10000, 16, 2100, 1, 1),
(14, 'Синтетическое масло Shell OMALA S4 WE 320', 10000, 16, 3000, 1, 1),
(15, 'Смазки AVIALITH 2EP', 10000, 16, 2500, 1, 1),
(16, 'Motovario B083', 10000, 16, 3200, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_meas`
--

CREATE TABLE `smart_meas` (
  `id` int(11) NOT NULL,
  `name` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_meas`
--

INSERT INTO `smart_meas` (`id`, `name`) VALUES
(1, 'meas_volt'),
(2, 'meas_watt'),
(3, 'meas_kwatt'),
(4, 'meas_amp'),
(5, 'meas_hour'),
(6, 'meas_min'),
(7, 'meas_sec'),
(8, 'meas_milisec'),
(9, 'meas_ghz'),
(10, 'meas_cels'),
(11, 'meas_pa'),
(12, 'meas_bar'),
(13, 'meas_proc'),
(14, 'meas_rpm'),
(15, 'meas_cnt'),
(16, 'meas_g'),
(17, 'meas_kg'),
(18, 'meas_tonn'),
(19, 'meas_liter'),
(20, 'meas_kbps'),
(21, 'meas_angle'),
(22, 'meas_dustmeas'),
(23, 'meas_vibro'),
(24, 'meas_count'),
(25, 'meas_nothing');

-- --------------------------------------------------------

--
-- Структура таблицы `smart_modules`
--

CREATE TABLE `smart_modules` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_modules`
--

INSERT INTO `smart_modules` (`id`, `name`) VALUES
(1, 'ZEO-IO-01'),
(2, 'C-Noria-O1'),
(3, 'C-Noria-I1'),
(4, 'C-Noria-I2'),
(5, 'C-Scraper-O1'),
(6, 'C-Scraper-I1'),
(7, 'C-Scraper-I2'),
(9, 'test1'),
(10, 'F-Cyclon-O1'),
(11, 'F-Cyclon-O2'),
(12, 'F-Cyclon-I1'),
(13, 'F-Cyclon-I2');

-- --------------------------------------------------------

--
-- Структура таблицы `smart_module_opts`
--

CREATE TABLE `smart_module_opts` (
  `id` int(11) NOT NULL,
  `module` int(11) DEFAULT NULL,
  `port_dir` int(11) NOT NULL DEFAULT '0',
  `port_num` int(11) NOT NULL DEFAULT '0',
  `port_type` int(11) NOT NULL DEFAULT '0',
  `name` varchar(64) NOT NULL DEFAULT '',
  `invers` tinyint(1) NOT NULL DEFAULT '0',
  `antidreb` int(11) NOT NULL DEFAULT '0',
  `i2c_addr` int(11) NOT NULL DEFAULT '0',
  `in_type` tinyint(1) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_module_opts`
--

INSERT INTO `smart_module_opts` (`id`, `module`, `port_dir`, `port_num`, `port_type`, `name`, `invers`, `antidreb`, `i2c_addr`, `in_type`, `active`) VALUES
(1, 1, 1, 1, 1, 'PH11 24v', 2, 100, 0, 1, 1),
(2, 1, 1, 2, 1, 'PH10 24v', 2, 100, 0, 1, 1),
(3, 1, 1, 3, 1, 'PH9 24v', 2, 100, 0, 1, 1),
(4, 1, 1, 4, 1, 'PH6 24v', 2, 100, 0, 1, 1),
(5, 1, 1, 5, 1, 'PG0 24v', 1, 100, 0, 1, 1),
(6, 1, 1, 6, 1, 'PF14 24v', 1, 100, 0, 1, 1),
(7, 1, 1, 7, 1, 'PF12 24v', 1, 100, 0, 1, 1),
(8, 1, 1, 8, 1, 'PF13 24v', 2, 100, 0, 1, 1),
(9, 1, 1, 9, 1, 'PB2 24v', 2, 100, 0, 1, 1),
(10, 1, 1, 10, 1, 'PF11 24v', 2, 100, 0, 1, 1),
(11, 1, 1, 11, 1, 'PA6 24v', 1, 100, 0, 1, 1),
(12, 1, 1, 12, 1, 'PA4 24v', 1, 100, 0, 1, 1),
(13, 1, 1, 13, 1, 'PH3 24v', 1, 100, 0, 1, 1),
(14, 1, 1, 14, 1, 'PH2 24v', 1, 100, 0, 1, 1),
(15, 1, 1, 15, 1, 'PA0 24v', 1, 100, 0, 1, 1),
(16, 1, 1, 16, 1, 'PC3 24v', 1, 100, 0, 1, 1),
(17, 1, 1, 17, 1, 'PG6 CON43 220v', 1, 100, 0, 1, 1),
(18, 1, 1, 18, 1, 'PI0 CON38 220v', 1, 100, 0, 1, 1),
(19, 1, 1, 19, 1, 'PG2 CON41 220v', 1, 100, 0, 1, 1),
(20, 1, 1, 20, 1, 'PG7 CON44 220v', 1, 100, 0, 1, 1),
(21, 1, 2, 1, 1, 'PF15 RELAY CN6', 1, 0, 0, 1, 1),
(22, 1, 2, 2, 1, 'PG1 RELAY CN5', 1, 0, 0, 1, 1),
(23, 1, 2, 3, 1, 'PH14 RELAY CN4', 1, 0, 0, 1, 1),
(24, 1, 2, 4, 1, 'PH13 RELAY CN3', 1, 0, 0, 1, 1),
(25, 1, 2, 5, 1, 'PCA9555 5 бит0 24v', 1, 0, 0, 1, 1),
(26, 1, 2, 6, 1, 'PCA9555 4 бит0 24v', 1, 0, 0, 1, 1),
(27, 1, 2, 7, 1, 'PCA9555 3 бит0 24v', 1, 0, 0, 1, 1),
(28, 1, 2, 8, 1, 'PCA9555 2 бит0 24v', 1, 0, 0, 1, 1),
(29, 1, 2, 9, 1, 'PCA9555 1 бит0 24v', 1, 0, 0, 1, 1),
(30, 1, 2, 10, 1, 'PCA9555 0 бит0 24v', 1, 0, 0, 1, 1),
(31, 1, 2, 11, 1, 'PCA9555 6 бит0 24v', 1, 0, 0, 1, 1),
(32, 1, 2, 12, 1, 'PCA9555 7 бит0 24v', 1, 0, 0, 1, 1),
(33, 1, 2, 13, 1, 'PCA9555 0 бит1 24v', 1, 0, 0, 1, 1),
(34, 1, 2, 14, 1, 'PCA9555 1 бит1 24v', 1, 0, 0, 1, 1),
(35, 1, 2, 15, 1, 'PCA9555 2 бит1 24v', 1, 0, 0, 1, 1),
(36, 1, 2, 16, 1, 'PCA9555 3 бит1 24v', 1, 0, 0, 1, 1),
(37, 1, 2, 17, 1, 'PCA9555 4 бит1 24v', 1, 0, 0, 1, 1),
(38, 1, 2, 18, 1, 'PCA9555 5 бит1 24v', 1, 0, 0, 1, 1),
(39, 1, 1, 1, 3, '1 канал ADS1115 IN AN1', 1, 0, 0, 1, 1),
(40, 1, 1, 2, 3, '0 канал ADS1115 IN AN2', 1, 0, 0, 1, 1),
(41, 1, 1, 3, 3, '2 канал ADS1115 ток клапанов', 1, 0, 0, 1, 1),
(42, 1, 1, 3, 3, '3 канал ADS1115 остальные выходы', 1, 0, 0, 1, 1),
(43, 1, 1, 3, 3, 'npa-700b-10wg 1', 1, 0, 0, 1, 1),
(44, 1, 1, 3, 3, 'npa-700b-10wg 2', 1, 0, 0, 1, 1),
(45, 1, 1, 3, 3, '2 канал ADS1115 ток клапанов', 1, 0, 0, 1, 1),
(46, 1, 1, 3, 3, '2 канал ADS1115 ток клапанов', 1, 0, 0, 1, 1),
(47, 1, 1, 3, 3, '2 канал ADS1115 ток клапанов', 1, 0, 0, 1, 1),
(48, 2, 2, 7, 2, 'Q1', 1, 0, 3, 1, 0),
(49, 2, 2, 6, 2, 'Q2', 2, 0, 3, 1, 0),
(51, 2, 2, 5, 2, 'Q3', 1, 0, 3, 1, 0),
(52, 2, 2, 4, 2, 'Q4', 2, 0, 3, 1, 0),
(53, 2, 2, 3, 2, 'Q5', 2, 0, 3, 1, 0),
(54, 2, 2, 2, 2, 'Q6', 2, 0, 3, 1, 0),
(55, 2, 2, 1, 2, 'Q7', 2, 0, 3, 1, 0),
(56, 3, 1, 0, 2, 'I1', 1, 0, 0, 1, 0),
(57, 3, 1, 1, 2, 'I2', 1, 0, 0, 1, 0),
(58, 3, 1, 2, 2, 'I3', 1, 0, 0, 1, 0),
(59, 3, 1, 3, 2, 'I4', 1, 0, 0, 1, 0),
(60, 3, 1, 4, 2, 'I5', 1, 0, 0, 1, 0),
(61, 3, 1, 5, 2, 'I6', 1, 0, 0, 1, 0),
(62, 3, 1, 6, 2, 'I7', 1, 0, 0, 1, 0),
(63, 3, 1, 7, 2, 'I8', 1, 0, 0, 1, 0),
(64, 4, 1, 0, 2, 'I9', 2, 0, 1, 1, 0),
(65, 4, 1, 1, 2, 'I10', 1, 0, 1, 1, 0),
(66, 4, 1, 3, 2, 'I11', 1, 0, 1, 1, 0),
(67, 4, 1, 2, 2, 'I12', 1, 0, 1, 1, 0),
(68, 4, 1, 5, 2, 'I13', 1, 0, 1, 1, 0),
(69, 4, 1, 4, 2, 'I14', 1, 0, 1, 1, 0),
(70, 2, 2, 0, 2, 'Q8', 2, 0, 3, 1, 0),
(71, 7, 1, 0, 0, '', 2, 0, 0, 0, 0),
(72, 10, 2, 0, 1, 'Q1', 1, 0, 0, 1, 0),
(73, 10, 2, 1, 1, 'Q2', 1, 0, 0, 1, 0),
(74, 10, 2, 2, 1, 'Q3', 1, 0, 0, 1, 0),
(75, 10, 2, 3, 1, 'Q4', 1, 0, 0, 1, 0),
(76, 10, 2, 4, 1, 'Q5', 1, 0, 0, 1, 0),
(77, 10, 2, 5, 1, 'Q6', 1, 0, 0, 1, 0),
(78, 10, 2, 6, 1, 'Q7', 1, 0, 0, 1, 0),
(79, 11, 2, 0, 1, 'Q9', 1, 0, 1, 1, 0),
(80, 11, 2, 1, 1, 'Q10', 1, 0, 1, 1, 0),
(81, 11, 2, 2, 1, 'Q11', 1, 0, 1, 1, 0),
(82, 11, 2, 3, 1, 'Q12', 1, 0, 1, 1, 0),
(83, 11, 2, 4, 1, 'Q13', 1, 0, 1, 1, 0),
(84, 11, 2, 5, 1, 'Q14', 1, 0, 1, 1, 0),
(85, 11, 2, 6, 1, 'Q15', 1, 0, 1, 1, 0),
(86, 12, 1, 0, 1, 'I1', 1, 0, 2, 1, 0),
(87, 12, 1, 1, 1, 'I2', 1, 0, 2, 1, 0),
(88, 12, 1, 2, 1, 'I3', 1, 0, 2, 1, 0),
(89, 12, 1, 3, 1, 'I4', 1, 0, 2, 1, 0),
(90, 12, 1, 4, 1, 'I5', 1, 0, 2, 1, 0),
(91, 12, 1, 5, 1, 'I6', 1, 0, 2, 1, 0),
(92, 12, 1, 6, 1, 'I7', 1, 0, 2, 1, 0),
(93, 13, 1, 0, 1, 'I9', 1, 0, 3, 1, 0),
(94, 13, 1, 1, 1, 'I10', 1, 0, 3, 1, 0),
(95, 13, 1, 2, 1, 'I11', 1, 0, 3, 1, 0),
(96, 13, 1, 3, 1, 'I12', 1, 0, 3, 1, 0),
(97, 13, 1, 4, 1, 'I13', 1, 0, 3, 1, 0),
(98, 13, 1, 5, 1, 'I14', 1, 0, 3, 1, 0),
(100, 12, 1, 7, 1, 'I8', 1, 0, 2, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_picking_lists`
--

CREATE TABLE `smart_picking_lists` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_picking_lists`
--

INSERT INTO `smart_picking_lists` (`id`, `name`, `active`) VALUES
(1, 'Суперфильтр', 1),
(2, 'Супернория', 1),
(3, 'Суперскребковый', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_picking_list_opts`
--

CREATE TABLE `smart_picking_list_opts` (
  `id` int(11) NOT NULL,
  `list` int(11) DEFAULT NULL,
  `des` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL DEFAULT '',
  `cnt` int(11) DEFAULT '0',
  `marks` varchar(256) NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_picking_list_opts`
--

INSERT INTO `smart_picking_list_opts` (`id`, `list`, `des`, `name`, `cnt`, `marks`, `active`) VALUES
(4, 2, 'ZEO-BE-20.1.4.1.80.00.000(Выставка)', 'Головка нории ZEO-BE-20', 1, '0,75кВт', 1),
(5, 2, 'ZEO-BE-20.60.00.000(Выставка)', 'Башмак нории ZEO-BE-20', 1, '', 1),
(6, 2, 'ZEO-BE-20.90.00.000', 'Труба ZEO-BE-20', 2, '800 мм', 1),
(8, 2, 'ZEO-BE-20.00.00.011', 'Ремень норийный 200-EP630/3-2+2', 1, '4625мм', 1),
(9, 2, 'ZEO-BE-50.00.00.002', 'Шайба под норийный болт М8', 60, '', 1),
(11, 2, '', 'Болт M8-6gx25.02 ГОСТ 7798-70', 18, '', 1),
(15, 2, '', 'Болт норийный М8х30 ГОСТ 7785-81', 60, '', 1),
(16, 2, '', 'Ковш полимерный JET 15-140 PE', 30, '', 1),
(17, 2, '', 'Mеханическое зажимное  устройство норийной ленты Supergrip No.2 (800 kN/m)', 3, '', 1),
(19, 3, 'B083 UC39,60 T100LA4_B5 B3', 'Паспорт', 1, '(35,9об/мин 2,2кВт)', 1),
(20, 3, 'ZEO-DC-SP70-150-SD-00.000-01', 'Станция приводная', 1, 'Правая', 1),
(21, 3, 'ZEO-DC-SP70-150-ST-00.000', 'Станция натяжная', 1, '', 1),
(22, 3, 'ZEO-DC-SP70-150-IS-1.1-00.000', 'Секция промежуточная 1.1м', 1, '', 1),
(23, 3, 'М112-1-80-2-300-SP-2,4м', 'Цепь', 1, 'L = 6.08м', 1),
(27, 1, 'ZEO-FC', 'Фильтр цилиндрический ZEO-FCS-10.12	', 1, '', 1),
(28, 1, 'ZEO-FC', 'Затвор шлюзовый ZEO-RW-9', 1, '0,25 кВт', 1),
(29, 1, '', 'Патрубок переходной ZEO-TT-&empty;140-210x180', 1, '5.8 кг', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_services`
--

CREATE TABLE `smart_services` (
  `id` int(11) NOT NULL,
  `ser_num` tinyint(1) NOT NULL DEFAULT '0',
  `typ` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(16) NOT NULL,
  `_set` bigint(20) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `ser_type` varchar(32) NOT NULL DEFAULT 'hourly',
  `device_type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_services`
--

INSERT INTO `smart_services` (`id`, `ser_num`, `typ`, `name`, `_set`, `active`, `ser_type`, `device_type`) VALUES
(1, 1, 0, 'ТО 1', 24, 1, 'hourly', '2'),
(2, 2, 0, 'ТО 2', 168, 1, 'hourly', '2'),
(3, 3, 0, 'ТО 3', 720, 1, 'hourly', '2'),
(4, 4, 0, 'ТО 4', 4320, 1, 'hourly', '2'),
(5, 5, 0, 'ТО 5', 10000, 1, 'hourly', '2'),
(6, 1, 0, 'ТО 1', 24, 1, 'hourly', '6'),
(7, 2, 0, 'ТО 2', 168, 1, 'hourly', '6'),
(8, 3, 0, 'ТО 3', 720, 1, 'hourly', '6'),
(9, 4, 0, 'ТО 4', 4320, 1, 'hourly', '6'),
(10, 5, 0, 'ТО 5', 10000, 1, 'hourly', '6'),
(11, 1, 0, 'ТО 1', 24, 1, 'hourly', '5'),
(12, 2, 0, 'ТО 2', 168, 1, 'hourly', '5'),
(13, 3, 0, 'ТО 3', 720, 1, 'hourly', '5'),
(14, 4, 0, 'ТО 4', 4320, 1, 'hourly', '5'),
(15, 5, 0, 'ТО 5', 10000, 1, 'hourly', '5');

-- --------------------------------------------------------

--
-- Структура таблицы `smart_service_hists`
--

CREATE TABLE `smart_service_hists` (
  `id` int(11) NOT NULL,
  `ctrl` int(11) NOT NULL DEFAULT '0',
  `dev` int(11) NOT NULL DEFAULT '0',
  `txt` varchar(2048) NOT NULL,
  `usr` int(11) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `code` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `smart_service_works`
--

CREATE TABLE `smart_service_works` (
  `id` int(11) NOT NULL,
  `dev` int(11) DEFAULT NULL COMMENT 'WARNING!!!!ACHTUNG!!!!!ОСТОРОЖНО!!!!!!! this is type. Not device id, type',
  `ser_num` tinyint(4) NOT NULL DEFAULT '0',
  `des` varchar(1024) NOT NULL,
  `user_occ` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_service_works`
--

INSERT INTO `smart_service_works` (`id`, `dev`, `ser_num`, `des`, `user_occ`, `active`, `service_id`) VALUES
(1, 1, 1, '1. проверить затяжку болтов;\n2. проверить надежность крепления заземления вентилятора и электродвигателя;\n3. проверить отсутствие посторонних шумов и задеваний вращающихся деталей о неподвижные (оценку уровня вибрации следует производить после значительных выбросов пыли или после работы вентилятора в нештатном режиме) ', 6, 1, 1),
(2, 10, 2, '1. осмотр, очистка корпуса от пыли, проверка срабатывания клапана', 7, 1, 2),
(3, 34, 2, '1. открутить колбу и очистить фильтровальный элемент', 6, 1, 2),
(4, 35, 2, '1. осмотреть и провести очистку фильтровальных элементов через камеру загрязненного воздуха', 6, 1, 2),
(5, 15, 2, '1. Осмотр, проверка эффективности срабатывания', 5, 1, 2),
(6, 14, 2, '1. осмотр, очистка', 5, 1, 2),
(7, 19, 2, '1. проверка датчика взрыворазрядительной панели: надежности соединения крепежных элементов, \nТестирование, (проверка эффективности срабатывания) \n2. Провести осмотр на выявление повреждений и подсоса воздуха', 7, 1, 2),
(8, 13, 2, '1. Осмотр, очистка, проверка герметичности соединений\n2. Провести тест слива конденсата', 7, 1, 2),
(9, 12, 3, '1. Очистка от пыли, осмотр на возможность повреждений ', 7, 1, 3),
(10, 19, 3, '1. проверка датчика взрыворазрядительной панели: надежности соединения крепежных элементов, \nТестирование, (проверка эффективности срабатывания) \n2. Провести осмотр на выявление повреждений и подсоса воздуха', 7, 1, 3),
(11, 20, 3, '1. очистка, тестирование, обжатие крепежных элементов', 7, 1, 3),
(12, 36, 3, '1. Осмотр, проверка герметичности соединения ', 6, 1, 3),
(13, 37, 3, '1. Осмотр, очистка и продувка путем кратковременного открытия запорной арматуры', 6, 1, 3),
(14, 1, 3, '1. операции ЕТО\n2. устранить неисправности болтовых и сварных соединений;\n3. проверить зазоры между рабочим колесом и коллектором вентилятора.', 7, 1, 3),
(15, 13, 3, 'переборка, очистка, тестирование', 7, 1, 3),
(16, 10, 4, 'Переборка и очистка внутренних составляющих от шлака.', 7, 1, 4),
(17, 16, 4, '1. открыть смотровой люк на входе/выходе с фильтра, провести осмотр и очистку от возможного налипания\nПыли\n2. проверка срабатывания датчика пыли', 7, 1, 4),
(18, 31, 4, '1. открыть смотровой люк на входе/выходе с фильтра, провести осмотр и очистку от возможного налипания\nПыли\n2. проверка срабатывания датчика пыли', 6, 1, 4),
(19, 35, 4, 'открыть камеру чистого воздуха и проверить затяжку болтовых соединений каркаса фильтровальных\nЭлементов, проверить на герметичность запорной арматуры, хомутов', 7, 1, 4),
(20, 15, 4, '1. Обжатие электроконтактов, очистка и промывка трубчатых выходов и магистралей\n2. Проверка работоспособности датчиков', 7, 1, 4),
(21, 14, 4, 'обжатие электро контактов и проверка работоспособности (тестирование)', 7, 1, 4),
(22, 12, 4, '1. проверка надежности соединения крепежных элементов, тестирование\n2. проверка эффективности срабатывания датчика', 7, 1, 4),
(23, 1, 4, 'операции ТО-1\n провести внешний осмотр лакокрасочного покрытия;\n очистить корпус вентилятора и рабочее колесо от налипаний и загрязнений; проверка вала на биение; провести тепловой контроль подшипниковых узлов', 7, 1, 4),
(24, 36, 5, 'переборка и тестирование путём ручного воздействия', 7, 1, 5),
(25, 1, 5, 'подготовительные операции – отсоединение входных и выходных воздуховодов;\n поузловая разборка;\n поузловая сборка из новых или заранее отремонтированных узлов;\n заключительные операции после сборки (регулировка, испытание вентилятора и др.);\n проверить смазку в подшипниках двигателя;  очистки лопастей вентилятора от излишнего налипания пыли;   ', 7, 1, 5),
(26, 10, 5, 'переборка и тестирование путём ручного воздействия', 7, 1, 5),
(27, 35, 5, 'полная замена ', 7, 1, 5),
(28, 19, 5, 'полная замена ', 7, 1, 5),
(29, 30, 1, 'Визуальный осмотр, проверка на наличие посторонних шумов подтёков смазочного материала.', 6, 1, 6),
(30, 6, 1, 'Проверить транспортер на наличие посторонних шумов, очистка смотровых окон (если имеются).', 6, 1, 6),
(31, 38, 2, 'Визульный осмотр ленты, проверка движения ленты у приводного и натяжного барабана.', 6, 1, 7),
(32, 25, 2, 'Удалить пыль с поверхности мотор-редуктора, визуальный осмотр, Проверка болтового крепления мотор-редуктора с реактивной тягой/проверка болтового крепления мотор-редуктора с рамой.', 6, 1, 7),
(33, 30, 3, 'Шприцевание', 6, 1, 8),
(34, 39, 3, 'Осмотр износа ковша, ревизия болтовых соединений', 6, 1, 8),
(35, 20, 3, 'Осмотр, очистка', 6, 1, 8),
(36, 27, 3, 'Осмотр, очистка', 6, 1, 8),
(37, 21, 3, 'Осмотр, очистка', 6, 1, 8),
(38, 6, 3, 'осмотр футеровки барабанов, износ, трещины, прочность посадки, признаки напряжения и усталости,горизонтальное смещение на валу, сопротивление вращению\n', 6, 1, 9),
(39, 25, 5, 'замена масла редуктора', 6, 1, 10),
(41, 30, 1, 'Визуальный осмотр, проверка на наличие посторонних шумов подтёков смазочного материала.', 6, 1, 11),
(42, 41, 2, 'Проверка цепи и её натяжения', 6, 1, 12),
(43, 25, 2, 'Удалить пыль с поверхности мотор-редуктора, визуальный осмотр, Проверка болтового крепления мотор-редуктора с реактивной тягой/проверка болтового крепления мотор-редуктора с рамой.', 5, 1, 12),
(44, 30, 3, 'Шприцевание', 6, 1, 13),
(45, 27, 4, 'осмотр и очистка', 6, 1, 14),
(46, 29, 4, 'осмотр и очистка', 6, 1, 14),
(47, 20, 4, 'осмотр и очистка', 6, 1, 14),
(48, 25, 5, 'замена масла редуктора', 6, 1, 15),
(49, 5, 1, 'Проверить транспортер на наличие посторонних шумов, очистка смотровых окон (если имеются)', 6, 1, 11);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_service_works_materials`
--

CREATE TABLE `smart_service_works_materials` (
  `id` int(11) NOT NULL,
  `ser_work` int(11) DEFAULT NULL,
  `material` int(11) DEFAULT NULL,
  `cnt` float NOT NULL DEFAULT '0',
  `modif` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_service_works_materials`
--

INSERT INTO `smart_service_works_materials` (`id`, `ser_work`, `material`, `cnt`, `modif`) VALUES
(1, 1, 6, 1, NULL),
(2, 2, 2, 15, NULL),
(3, 3, 2, 5, NULL),
(4, 4, 3, 1, NULL),
(5, 6, 2, 5, NULL),
(6, 7, 4, 1, NULL),
(7, 7, 2, 5, NULL),
(8, 8, 2, 5, NULL),
(9, 9, 2, 5, NULL),
(10, 10, 4, 1, NULL),
(11, 10, 2, 5, NULL),
(12, 13, 2, 10, NULL),
(13, 14, 6, 1, NULL),
(14, 15, 4, 1, NULL),
(15, 15, 2, 5, NULL),
(16, 15, 1, 10, NULL),
(17, 16, 2, 5, NULL),
(18, 16, 1, 10, NULL),
(19, 17, 2, 10, NULL),
(20, 18, 2, 10, NULL),
(21, 19, 4, 1, NULL),
(22, 19, 6, 1, NULL),
(23, 20, 4, 1, NULL),
(24, 20, 6, 1, NULL),
(25, 20, 2, 5, NULL),
(26, 21, 4, 1, NULL),
(27, 21, 6, 1, NULL),
(28, 21, 2, 1, NULL),
(29, 22, 4, 1, NULL),
(30, 22, 2, 5, NULL),
(31, 23, 7, 1, NULL),
(32, 23, 8, 1, NULL),
(33, 24, 6, 1, NULL),
(34, 25, 6, 1, NULL),
(35, 25, 1, 20, NULL),
(36, 25, 2, 5, NULL),
(37, 25, 4, 1, NULL),
(38, 28, 6, 1, NULL),
(39, 27, 6, 1, NULL),
(40, 30, 2, 20, NULL),
(41, 33, 9, 80, 50),
(42, 35, 2, 5, NULL),
(43, 37, 2, 5, NULL),
(44, 36, 2, 5, NULL),
(45, 39, 10, 330, 8),
(46, 32, 3, 10, 0),
(47, 33, 2, 10, 50),
(48, 33, 9, 80, 51),
(49, 33, 2, 10, 51),
(50, 41, 2, 5, 0),
(51, 43, 2, 15, 0),
(52, 44, 2, 10, 52),
(53, 44, 9, 65, 52),
(54, 45, 2, 5, 0),
(55, 46, 2, 5, 0),
(56, 47, 2, 5, 0),
(57, 48, 12, 6800, 53);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_stat_grps`
--

CREATE TABLE `smart_stat_grps` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_stat_grps`
--

INSERT INTO `smart_stat_grps` (`id`, `name`, `active`) VALUES
(1, 'stat_default', 1),
(2, 'stat_openclose', 1),
(8, 'stat_offon', 1),
(9, 'stat_normcrash', 1),
(10, 'Норма/Авария', 1),
(11, 'Режимы Приводов', 1),
(12, 'stat_onoff', 1),
(13, 'stat_offon', 1),
(14, 'stat_offon', 1),
(15, 'Режимы работы', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_stat_grp_opts`
--

CREATE TABLE `smart_stat_grp_opts` (
  `id` int(11) NOT NULL,
  `num` tinyint(2) NOT NULL DEFAULT '0',
  `grp` int(11) DEFAULT NULL,
  `name` varchar(32) NOT NULL DEFAULT '',
  `clr` varchar(32) NOT NULL,
  `bgclr` varchar(32) NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `dclass` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_stat_grp_opts`
--

INSERT INTO `smart_stat_grp_opts` (`id`, `num`, `grp`, `name`, `clr`, `bgclr`, `active`, `dclass`) VALUES
(1, 0, 1, 'stat_ready', '#c7c7c9', '#545454', 1, ''),
(2, 1, 1, 'stat_inwork', '#0db800', '#043001', 1, 'active'),
(3, 2, 1, 'stat_crash', '#e12c0d', '#330a03', 1, 'danger'),
(4, 3, 1, 'stat_serv', '#ffa200', '#472d00', 1, 'service'),
(5, 4, 1, 'stat_manu', '#00ddda', '#004c4b', 1, 'manual'),
(6, 5, 1, 'stat_repa', '#0072ff', '#001f47', 1, 'repair'),
(7, 6, 1, 'stat_nocon', 'black', 'white', 1, 'die'),
(8, 0, 2, 'stat_close', '#0db800', '', 1, 'active'),
(9, 1, 2, 'stat_open', '#e12c0d', '', 1, 'danger'),
(20, 0, 8, 'stat_off', '#e12c0d', '', 1, 'danger'),
(21, 1, 8, 'stat_on', '#0db800', '', 1, 'active'),
(22, 0, 9, 'stat_crash', '#e12c0d', '', 1, 'danger'),
(23, 1, 9, 'stat_norm', '#0db800', '', 1, 'active'),
(24, 0, 10, 'stat_norm', '#0db800', '', 1, 'active'),
(25, 1, 10, 'stat_crash', '#e12c0d', '', 1, 'danger'),
(26, 0, 11, 'stat_off', '#e12c0d', '', 1, 'danger'),
(27, 1, 11, 'stat_manu', '#e12c0d', '', 1, 'danger'),
(28, 2, 11, 'stat_distrez', '#0db800', '', 1, 'active'),
(29, 0, 12, 'stat_on', '#0db800', '', 1, 'active'),
(30, 1, 12, 'stat_off', '#e12c0d', '', 1, 'danger'),
(32, 0, 13, 'stat_off', '#e12c0d', '', 1, NULL),
(33, 1, 13, 'stat_on', '#0db800', '', 1, NULL),
(34, 0, 14, 'stat_off', '#0db800', '', 1, NULL),
(35, 1, 14, 'stat_on', '#e12c0d', '', 1, NULL),
(36, 0, 15, 'stat_turnedoff', '', '', 1, NULL),
(37, 1, 15, 'stat_distance', '', '', 1, NULL),
(38, 2, 15, 'stat_mest', '', '', 1, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_strucs`
--

CREATE TABLE `smart_strucs` (
  `id` int(11) NOT NULL,
  `dtype` int(11) NOT NULL,
  `name` varchar(64) NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_strucs`
--

INSERT INTO `smart_strucs` (`id`, `dtype`, `name`, `active`) VALUES
(7, 2, 'Фильтр НОМИНАЛЬНЫЕ', 0),
(11, 9, 'Электропривод НОМИНАЛЬНЫЕ', 0),
(15, 20, 'Вращение НОМИНАЛЬНЫЕ', 0),
(23, 15, 'Диф-давление НОМИНАЛЬНЫЕ', 0),
(25, 14, 'Сжатый воздух НОМИНАЛЬНЫЕ', 0),
(27, 16, 'Пыль НОМИНАЛЬНЫЕ', 0),
(41, 25, 'Редуктор НОМИНАЛЬНЫЕ', 0),
(43, 27, 'Подпор НОМИНАЛЬНЫЕ', 0),
(45, 21, 'Сход ленты НОМИНАЛЬНЫЕ', 0),
(59, 18, 'ДатчВибр, НОМ', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_struc_opts`
--

CREATE TABLE `smart_struc_opts` (
  `id` int(11) NOT NULL,
  `struc` int(11) DEFAULT NULL,
  `ind` int(11) NOT NULL DEFAULT '0',
  `meas` int(11) DEFAULT NULL,
  `keyn` varchar(32) NOT NULL DEFAULT '',
  `name` varchar(64) NOT NULL DEFAULT '',
  `def` varchar(16) NOT NULL DEFAULT '0',
  `lim_warning` int(11) NOT NULL,
  `lim_danger` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_struc_opts`
--

INSERT INTO `smart_struc_opts` (`id`, `struc`, `ind`, `meas`, `keyn`, `name`, `def`, `lim_warning`, `lim_danger`, `active`) VALUES
(1, 7, 1, 15, 'valve_cnt', 'Количество клапанов', '0', 0, 0, 1),
(2, 7, 2, 15, 'sleeve_cnt', 'Количество рукавов', '0', 0, 0, 1),
(3, 7, 3, 25, 'nozzle_ispresend', 'Наличие форсунки', '0', 0, 0, 1),
(4, 7, 4, 8, 'imp_len', 'Длительность импульса', '0', 0, 0, 1),
(5, 7, 5, 8, 'imp_period', 'Длительность между импульсами', '0', 0, 0, 1),
(6, 7, 6, 15, 'numof_cicles', 'Количество завершающих циклов', '0', 0, 0, 1),
(11, 11, 4, 1, 'voltage', 'Напряжение', '0', 0, 0, 1),
(14, 11, 7, 14, 'rate', 'Обороты', '0', 0, 0, 1),
(15, 11, 8, NULL, 'start_type', 'Тип пуска', '0', 0, 0, 0),
(34, 15, 4, 7, 'r_wait', 'Ожидание вращения', '0', 0, 0, 1),
(35, 15, 5, 7, 'max_rtime', 'Макс время раскрутки', '0', 0, 0, 1),
(42, 23, 1, 0, 'minots', 'Калибр Мин отсчет', '0', 0, 0, 1),
(43, 23, 2, 0, 'kalibminper', 'Калибр Мин перепад', '0', 0, 0, 1),
(44, 23, 3, 0, 'cmaxots', 'Калибр Макс отсчет', '0', 0, 0, 1),
(45, 23, 4, 0, 'cmaxper', 'Калибр Макс перепад', '0', 0, 0, 1),
(46, 23, 5, 0, 'nullstat', 'Калибр Значение нуля', '0', 0, 0, 1),
(47, 23, 6, 25, 'stepregsta', 'Порог начала регенер', '0', 0, 0, 1),
(48, 23, 7, 25, 'stepregend', 'Порог оконч регенер', '0', 0, 0, 1),
(49, 23, 8, 25, 'maxper', 'Макс перепад', '0', 0, 0, 1),
(50, 23, 9, 25, 'minper', 'Мин перепад', '0', 0, 0, 1),
(54, 25, 1, 0, 'presmax', 'Калиб Давление макс', '0', 0, 0, 1),
(55, 25, 2, 0, 'otsmax', 'Калиб отсчет Макс', '0', 0, 0, 1),
(56, 25, 3, NULL, 'presmin', 'Калиб Давление мин', '0', 0, 0, 1),
(57, 25, 4, 0, 'otsmin', 'Калиб Отсчет мин', '0', 0, 0, 1),
(58, 25, 5, 0, 'nullstat', 'Калиб значение нуля', '0', 0, 0, 1),
(64, 27, 1, 0, 'mindust', 'Калиб Мин Концентр', '0', 0, 0, 1),
(65, 27, 2, 0, 'minots', 'Калиб Мин Отсчет', '0', 0, 0, 1),
(66, 27, 3, 0, 'maxdust', 'Калиб макс Коцентр', '0', 0, 0, 1),
(67, 27, 4, 0, 'maxots', 'Калиб Макс отсчет', '0', 0, 0, 1),
(68, 27, 5, 0, 'nulltype', 'Калиб знач нуля', '0', 0, 0, 1),
(71, 27, 8, 0, 'activfan', 'Порог активации вент', '0', 0, 0, 1),
(178, 41, 1, NULL, 'peredchis', 'Передаточное число', '0', 0, 0, 1),
(268, 59, 0, NULL, 'baud_rate', 'Скорость педедачи', '19200', 0, 0, 1),
(270, 11, 16, NULL, 'ip', 'IP', '192.168.15.140', 0, 0, 1),
(271, 59, 1, NULL, 'parity', 'Паритет', 'N', 0, 0, 1),
(272, 59, 2, NULL, 'size', 'Размер данных', '8', 0, 0, 1),
(273, 59, 3, NULL, 'stop_bit', 'Стоп бит', '1', 0, 0, 1),
(274, 59, 4, NULL, 'mb_addr', 'Modbus адресс', '', 0, 0, 1),
(275, 45, 0, 7, 'filt_false_act', 'Фильтрация ложных срабатываний', '10', 0, 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_usr`
--

CREATE TABLE `smart_usr` (
  `id` int(11) NOT NULL,
  `pass` varchar(64) NOT NULL DEFAULT '',
  `email` varchar(128) NOT NULL DEFAULT '',
  `phone` varchar(16) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT '',
  `grp` int(11) DEFAULT NULL,
  `lang` tinyint(1) NOT NULL DEFAULT '0',
  `home_dir` varchar(100) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_usr`
--

INSERT INTO `smart_usr` (`id`, `pass`, `email`, `phone`, `name`, `grp`, `lang`, `home_dir`, `active`) VALUES
(1, '202cb962ac59075b964b07152d234b70', 'admin@admin', '048432', 'Администратор', 1, 2, 'service', 1),
(2, 'caf1a3dfb505ffed0d024130f58c5cfa', 'service@service', '048123', 'Заказчик', 2, 2, 'wtasks', 0),
(3, '202cb962ac59075b964b07152d234b70', 'unknown@unknown', '048', 'Оператор', 3, 2, 'weigher', 0),
(4, '202cb962ac59075b964b07152d234b70', 'unknown@unknown', '048', 'Инженер', 4, 2, 'weigher', 0),
(5, '88406576c0cad1a1fc4771a2ffa5db87', 'rva@rva', '048', 'Админ', 1, 2, 'service', 1),
(6, '550a141f12de6341fba65b0ad0433500', '', '', 'test111', 1, 0, 'service', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_usr_grps`
--

CREATE TABLE `smart_usr_grps` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT '',
  `show_service` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Show Service page',
  `use_service` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Allow actions on Service page',
  `use_controll` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Allow System Controll',
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_usr_grps`
--

INSERT INTO `smart_usr_grps` (`id`, `name`, `show_service`, `use_service`, `use_controll`, `active`) VALUES
(1, 'occ_admin', 1, 1, 1, 1),
(2, 'occ_customer', 0, 0, 0, 1),
(3, 'occ_operator', 0, 0, 0, 1),
(4, 'occ_engineer', 0, 0, 0, 1),
(5, 'occ_elec', 0, 0, 0, 1),
(6, 'occ_slesar', 0, 0, 0, 1),
(7, 'occ_selselec', 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_vals`
--

CREATE TABLE `smart_vals` (
  `id` int(11) NOT NULL,
  `ctrl` int(11) DEFAULT NULL,
  `dev` int(11) DEFAULT NULL,
  `struc` int(11) DEFAULT NULL,
  `keyn` varchar(64) NOT NULL,
  `val` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_vals`
--

INSERT INTO `smart_vals` (`id`, `ctrl`, `dev`, `struc`, `keyn`, `val`) VALUES
(83, 5, 28, 41, 'peredchis', '7.5'),
(84, 5, 29, 45, 'antidreb', '0'),
(90, 5, 31, 45, 'antidreb', '0'),
(91, 5, 32, 45, 'antidreb', '0'),
(92, 5, 33, 45, 'antidreb', '0'),
(93, 5, 34, 43, 'antidreb', '0'),
(94, 5, 35, 43, 'antidreb', '0'),
(315, 2, 1, 7, 'valve_cnt', '0'),
(316, 2, 1, 7, 'sleeve_cnt', '0'),
(317, 2, 1, 7, 'nozzle_ispresend', '0'),
(318, 2, 1, 7, 'imp_len', '0'),
(319, 2, 1, 7, 'imp_period', '0'),
(320, 2, 1, 7, 'numof_cicles', '0'),
(328, 5, 27, 11, 'voltage', '0'),
(329, 5, 27, 11, 'rate', '0'),
(330, 5, 27, 11, 'start_type', '0'),
(331, 5, 27, 11, 'ip', '192.168.15.140'),
(340, 2, 4, 11, 'voltage', '0'),
(341, 2, 4, 11, 'rate', '0'),
(342, 2, 4, 11, 'start_type', '0'),
(343, 2, 4, 11, 'ip', '192.168.15.140'),
(344, 2, 6, 11, 'voltage', '0'),
(345, 2, 6, 11, 'rate', '0'),
(346, 2, 6, 11, 'start_type', '0'),
(347, 2, 6, 11, 'ip', '192.168.15.140'),
(364, 2, 10, 25, 'presmax', '0'),
(365, 2, 10, 25, 'otsmax', '0'),
(366, 2, 10, 25, 'presmin', '0'),
(367, 2, 10, 25, 'otsmin', '0'),
(368, 2, 10, 25, 'nullstat', '0'),
(369, 2, 12, 23, 'minots', '0'),
(370, 2, 12, 23, 'kalibminper', '0'),
(371, 2, 12, 23, 'cmaxots', '0'),
(372, 2, 12, 23, 'cmaxper', '0'),
(373, 2, 12, 23, 'nullstat', '0'),
(374, 2, 12, 23, 'stepregsta', '0'),
(375, 2, 12, 23, 'stepregend', '0'),
(376, 2, 12, 23, 'maxper', '0'),
(377, 2, 12, 23, 'minper', '0'),
(384, 2, 14, 15, 'sens_type', '0'),
(385, 2, 14, 15, 'tar_cnt', '0'),
(386, 2, 14, 15, 'rate', '0'),
(387, 2, 14, 15, 'r_wait', '0'),
(388, 2, 14, 15, 'max_rtime', '0'),
(389, 5, 30, 15, 'sens_type', '0'),
(390, 5, 30, 15, 'tar_cnt', '0'),
(391, 5, 30, 15, 'rate', '0'),
(392, 5, 30, 15, 'r_wait', '0'),
(393, 5, 30, 15, 'max_rtime', '0'),
(394, 6, 53, 15, 'r_wait', '0'),
(395, 6, 53, 15, 'max_rtime', '0'),
(401, 5, 45, 59, 'baud_rate', '19200'),
(402, 5, 45, 59, 'parity', 'N'),
(403, 5, 45, 59, 'size', '8'),
(404, 5, 45, 59, 'stop_bit', '1'),
(405, 5, 45, 59, 'mb_addr', '30'),
(406, 5, 44, 59, 'baud_rate', '19200'),
(407, 5, 44, 59, 'parity', 'N'),
(408, 5, 44, 59, 'size', '8'),
(409, 5, 44, 59, 'stop_bit', '1'),
(410, 5, 44, 59, 'mb_addr', '0'),
(411, 2, 13, 27, 'mindust', '0'),
(412, 2, 13, 27, 'minots', '0'),
(413, 2, 13, 27, 'maxdust', '0'),
(414, 2, 13, 27, 'maxots', '0'),
(415, 2, 13, 27, 'nulltype', '0'),
(416, 2, 13, 27, 'activfan', '0'),
(417, 2, 8, 27, 'mindust', '0'),
(418, 2, 8, 27, 'minots', '0'),
(419, 2, 8, 27, 'maxdust', '0'),
(420, 2, 8, 27, 'maxots', '0'),
(421, 2, 8, 27, 'nulltype', '0'),
(422, 2, 8, 27, 'activfan', '0');

-- --------------------------------------------------------

--
-- Структура таблицы `smart_viewgrps`
--

CREATE TABLE `smart_viewgrps` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_viewgrps`
--

INSERT INTO `smart_viewgrps` (`id`, `name`, `active`) VALUES
(1, 'tit_air', 1),
(2, 'obj_fan', 1),
(3, 'obj_body', 1),
(4, 'obj_gate', 1),
(5, 'tit_noriahead', 1),
(6, 'obj_body', 1),
(7, 'tit_noriafoot', 1),
(8, 'tit_privod', 1),
(9, 'obj_body', 1),
(10, 'tit_natyazh', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `smart_viewtypes`
--

CREATE TABLE `smart_viewtypes` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `smart_viewtypes`
--

INSERT INTO `smart_viewtypes` (`id`, `name`, `active`) VALUES
(1, 'tit_num', 1),
(2, 'tit_lineal', 1),
(3, 'tit_bar', 1),
(4, 'tit_dots', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `smart_alrs`
--
ALTER TABLE `smart_alrs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Alarms controller` (`ctrl`);

--
-- Индексы таблицы `smart_command_queues`
--
ALTER TABLE `smart_command_queues`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_ctrls`
--
ALTER TABLE `smart_ctrls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cla` (`cla`),
  ADD KEY `plist` (`plist`),
  ADD KEY `typ` (`typ`);

--
-- Индексы таблицы `smart_ctrl_cameras`
--
ALTER TABLE `smart_ctrl_cameras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ctrl` (`ctrl`);

--
-- Индексы таблицы `smart_ctrl_cla`
--
ALTER TABLE `smart_ctrl_cla`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_ctrl_modules`
--
ALTER TABLE `smart_ctrl_modules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ctrl` (`ctrl`),
  ADD KEY `module` (`module`);

--
-- Индексы таблицы `smart_ctrl_module_opts`
--
ALTER TABLE `smart_ctrl_module_opts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `opt` (`opt`),
  ADD KEY `ctrl_module` (`ctrl_module`),
  ADD KEY `ctrl_module_2` (`ctrl_module`),
  ADD KEY `opt_2` (`opt`),
  ADD KEY `dev_port` (`dev_port`);

--
-- Индексы таблицы `smart_ctrl_pass`
--
ALTER TABLE `smart_ctrl_pass`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ctrl` (`ctrl`);

--
-- Индексы таблицы `smart_ctrl_types`
--
ALTER TABLE `smart_ctrl_types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_ctypes`
--
ALTER TABLE `smart_ctypes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_ctypes_opts`
--
ALTER TABLE `smart_ctypes_opts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contyp` (`contyp`);

--
-- Индексы таблицы `smart_currencies`
--
ALTER TABLE `smart_currencies`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_device_service_journal`
--
ALTER TABLE `smart_device_service_journal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`);

--
-- Индексы таблицы `smart_devs`
--
ALTER TABLE `smart_devs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ctrl` (`ctrl`),
  ADD KEY `typ` (`typ`),
  ADD KEY `grp` (`grp`),
  ADD KEY `modif` (`modif`),
  ADD KEY `body_id` (`body_id`),
  ADD KEY `parent` (`parent`),
  ADD KEY `nomi` (`nomi`),
  ADD KEY `cur` (`cur`),
  ADD KEY `sgrp` (`sgrp`),
  ADD KEY `contyp` (`contyp`);

--
-- Индексы таблицы `smart_dev_faces`
--
ALTER TABLE `smart_dev_faces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dev` (`dev`),
  ADD KEY `viewgrp` (`viewgrp`),
  ADD KEY `viewtype` (`viewtype`),
  ADD KEY `stat_grp` (`stat_grp`),
  ADD KEY `meas` (`meas`),
  ADD KEY `lim_warning_code` (`lim_warning_code`),
  ADD KEY `lim_danger_code` (`lim_danger_code`),
  ADD KEY `range_warn_min_code` (`range_warn_min_code`),
  ADD KEY `range_crit_min_code` (`range_crit_min_code`),
  ADD KEY `range_crit_min_code_2` (`range_crit_min_code`),
  ADD KEY `range_warn_max_code` (`range_warn_max_code`),
  ADD KEY `range_crit_max_code` (`range_crit_max_code`),
  ADD KEY `tarder` (`tardev`);

--
-- Индексы таблицы `smart_dev_grps`
--
ALTER TABLE `smart_dev_grps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ctrl` (`ctrl`);

--
-- Индексы таблицы `smart_dev_items`
--
ALTER TABLE `smart_dev_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Индексы таблицы `smart_dev_logic_ports`
--
ALTER TABLE `smart_dev_logic_ports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dev` (`dev`),
  ADD KEY `dev_2` (`dev`);

--
-- Индексы таблицы `smart_dev_modif`
--
ALTER TABLE `smart_dev_modif`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dev_type` (`dev_type`);

--
-- Индексы таблицы `smart_dev_servs`
--
ALTER TABLE `smart_dev_servs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ctrl` (`ctrl`),
  ADD KEY `dev` (`dev`),
  ADD KEY `service_id` (`service_id`);

--
-- Индексы таблицы `smart_dev_serworks`
--
ALTER TABLE `smart_dev_serworks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ctrl` (`ctrl`),
  ADD KEY `dev` (`dev`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `work_id` (`work_id`),
  ADD KEY `user_occ` (`user_occ`);

--
-- Индексы таблицы `smart_dev_types`
--
ALTER TABLE `smart_dev_types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_dev_vars`
--
ALTER TABLE `smart_dev_vars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dev` (`dev`),
  ADD KEY `dface` (`dface`);

--
-- Индексы таблицы `smart_errcodes`
--
ALTER TABLE `smart_errcodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `typ` (`typ`),
  ADD KEY `dtypes` (`dtypes`);

--
-- Индексы таблицы `smart_errcode_types`
--
ALTER TABLE `smart_errcode_types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_informer`
--
ALTER TABLE `smart_informer`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_langs`
--
ALTER TABLE `smart_langs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_lang_routes`
--
ALTER TABLE `smart_lang_routes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name_2` (`name`),
  ADD KEY `name_3` (`name`);

--
-- Индексы таблицы `smart_materials`
--
ALTER TABLE `smart_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meas` (`meas`),
  ADD KEY `curr` (`curr`);

--
-- Индексы таблицы `smart_meas`
--
ALTER TABLE `smart_meas`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_modules`
--
ALTER TABLE `smart_modules`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_module_opts`
--
ALTER TABLE `smart_module_opts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module` (`module`);

--
-- Индексы таблицы `smart_picking_lists`
--
ALTER TABLE `smart_picking_lists`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_picking_list_opts`
--
ALTER TABLE `smart_picking_list_opts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `list` (`list`);

--
-- Индексы таблицы `smart_services`
--
ALTER TABLE `smart_services`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_service_hists`
--
ALTER TABLE `smart_service_hists`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `smart_service_works`
--
ALTER TABLE `smart_service_works`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_service_works_materials`
--
ALTER TABLE `smart_service_works_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ser_work` (`ser_work`),
  ADD KEY `material` (`material`);

--
-- Индексы таблицы `smart_stat_grps`
--
ALTER TABLE `smart_stat_grps`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_stat_grp_opts`
--
ALTER TABLE `smart_stat_grp_opts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grp` (`grp`),
  ADD KEY `grp_2` (`grp`);

--
-- Индексы таблицы `smart_strucs`
--
ALTER TABLE `smart_strucs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Dev types` (`dtype`);

--
-- Индексы таблицы `smart_struc_opts`
--
ALTER TABLE `smart_struc_opts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `struc` (`struc`),
  ADD KEY `meas` (`meas`);

--
-- Индексы таблицы `smart_usr`
--
ALTER TABLE `smart_usr`
  ADD PRIMARY KEY (`id`),
  ADD KEY `occ` (`grp`),
  ADD KEY `grp` (`grp`);

--
-- Индексы таблицы `smart_usr_grps`
--
ALTER TABLE `smart_usr_grps`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_vals`
--
ALTER TABLE `smart_vals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ctrl` (`ctrl`),
  ADD KEY `dev` (`dev`),
  ADD KEY `struc` (`struc`);

--
-- Индексы таблицы `smart_viewgrps`
--
ALTER TABLE `smart_viewgrps`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `smart_viewtypes`
--
ALTER TABLE `smart_viewtypes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `smart_alrs`
--
ALTER TABLE `smart_alrs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `smart_command_queues`
--
ALTER TABLE `smart_command_queues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `smart_ctrls`
--
ALTER TABLE `smart_ctrls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `smart_ctrl_cameras`
--
ALTER TABLE `smart_ctrl_cameras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `smart_ctrl_cla`
--
ALTER TABLE `smart_ctrl_cla`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `smart_ctrl_modules`
--
ALTER TABLE `smart_ctrl_modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
--
-- AUTO_INCREMENT для таблицы `smart_ctrl_module_opts`
--
ALTER TABLE `smart_ctrl_module_opts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;
--
-- AUTO_INCREMENT для таблицы `smart_ctrl_pass`
--
ALTER TABLE `smart_ctrl_pass`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT для таблицы `smart_ctrl_types`
--
ALTER TABLE `smart_ctrl_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `smart_ctypes`
--
ALTER TABLE `smart_ctypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `smart_ctypes_opts`
--
ALTER TABLE `smart_ctypes_opts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT для таблицы `smart_currencies`
--
ALTER TABLE `smart_currencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `smart_device_service_journal`
--
ALTER TABLE `smart_device_service_journal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `smart_devs`
--
ALTER TABLE `smart_devs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT для таблицы `smart_dev_faces`
--
ALTER TABLE `smart_dev_faces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT для таблицы `smart_dev_grps`
--
ALTER TABLE `smart_dev_grps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `smart_dev_items`
--
ALTER TABLE `smart_dev_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `smart_dev_logic_ports`
--
ALTER TABLE `smart_dev_logic_ports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT для таблицы `smart_dev_modif`
--
ALTER TABLE `smart_dev_modif`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT для таблицы `smart_dev_servs`
--
ALTER TABLE `smart_dev_servs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT для таблицы `smart_dev_serworks`
--
ALTER TABLE `smart_dev_serworks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT для таблицы `smart_dev_types`
--
ALTER TABLE `smart_dev_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT для таблицы `smart_dev_vars`
--
ALTER TABLE `smart_dev_vars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT для таблицы `smart_errcodes`
--
ALTER TABLE `smart_errcodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT для таблицы `smart_errcode_types`
--
ALTER TABLE `smart_errcode_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `smart_informer`
--
ALTER TABLE `smart_informer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT для таблицы `smart_langs`
--
ALTER TABLE `smart_langs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `smart_lang_routes`
--
ALTER TABLE `smart_lang_routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=466;
--
-- AUTO_INCREMENT для таблицы `smart_materials`
--
ALTER TABLE `smart_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT для таблицы `smart_meas`
--
ALTER TABLE `smart_meas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT для таблицы `smart_modules`
--
ALTER TABLE `smart_modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT для таблицы `smart_module_opts`
--
ALTER TABLE `smart_module_opts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT для таблицы `smart_picking_lists`
--
ALTER TABLE `smart_picking_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `smart_picking_list_opts`
--
ALTER TABLE `smart_picking_list_opts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT для таблицы `smart_services`
--
ALTER TABLE `smart_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT для таблицы `smart_service_hists`
--
ALTER TABLE `smart_service_hists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `smart_service_works`
--
ALTER TABLE `smart_service_works`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT для таблицы `smart_service_works_materials`
--
ALTER TABLE `smart_service_works_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT для таблицы `smart_stat_grps`
--
ALTER TABLE `smart_stat_grps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT для таблицы `smart_stat_grp_opts`
--
ALTER TABLE `smart_stat_grp_opts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT для таблицы `smart_strucs`
--
ALTER TABLE `smart_strucs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT для таблицы `smart_struc_opts`
--
ALTER TABLE `smart_struc_opts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=276;
--
-- AUTO_INCREMENT для таблицы `smart_usr`
--
ALTER TABLE `smart_usr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `smart_usr_grps`
--
ALTER TABLE `smart_usr_grps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT для таблицы `smart_vals`
--
ALTER TABLE `smart_vals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=423;
--
-- AUTO_INCREMENT для таблицы `smart_viewgrps`
--
ALTER TABLE `smart_viewgrps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT для таблицы `smart_viewtypes`
--
ALTER TABLE `smart_viewtypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `smart_alrs`
--
ALTER TABLE `smart_alrs`
  ADD CONSTRAINT `Alarms controller` FOREIGN KEY (`ctrl`) REFERENCES `smart_ctrls` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_ctrls`
--
ALTER TABLE `smart_ctrls`
  ADD CONSTRAINT `Ctrl class` FOREIGN KEY (`cla`) REFERENCES `smart_ctrl_cla` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `Ctrl picking list` FOREIGN KEY (`plist`) REFERENCES `smart_picking_lists` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `Ctrl type` FOREIGN KEY (`typ`) REFERENCES `smart_ctrl_types` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_ctrl_cameras`
--
ALTER TABLE `smart_ctrl_cameras`
  ADD CONSTRAINT `Fuck3` FOREIGN KEY (`ctrl`) REFERENCES `smart_ctrls` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_ctrl_modules`
--
ALTER TABLE `smart_ctrl_modules`
  ADD CONSTRAINT `Module` FOREIGN KEY (`module`) REFERENCES `smart_modules` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `Module ctrl` FOREIGN KEY (`ctrl`) REFERENCES `smart_ctrls` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_ctrl_module_opts`
--
ALTER TABLE `smart_ctrl_module_opts`
  ADD CONSTRAINT `Ctrl module` FOREIGN KEY (`ctrl_module`) REFERENCES `smart_ctrl_modules` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `Device port` FOREIGN KEY (`dev_port`) REFERENCES `smart_dev_logic_ports` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `Module option` FOREIGN KEY (`opt`) REFERENCES `smart_module_opts` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_ctrl_pass`
--
ALTER TABLE `smart_ctrl_pass`
  ADD CONSTRAINT `Pass ctrl` FOREIGN KEY (`ctrl`) REFERENCES `smart_ctrls` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_ctypes_opts`
--
ALTER TABLE `smart_ctypes_opts`
  ADD CONSTRAINT `smart_ctypes_opts_ibfk_1` FOREIGN KEY (`contyp`) REFERENCES `smart_ctypes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_device_service_journal`
--
ALTER TABLE `smart_device_service_journal`
  ADD CONSTRAINT `Dev service id` FOREIGN KEY (`service_id`) REFERENCES `smart_dev_servs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_devs`
--
ALTER TABLE `smart_devs`
  ADD CONSTRAINT `smart_devs_ibfk_1` FOREIGN KEY (`body_id`) REFERENCES `smart_devs` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_devs_ibfk_10` FOREIGN KEY (`contyp`) REFERENCES `smart_ctypes` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_devs_ibfk_2` FOREIGN KEY (`ctrl`) REFERENCES `smart_ctrls` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_devs_ibfk_3` FOREIGN KEY (`cur`) REFERENCES `smart_strucs` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_devs_ibfk_4` FOREIGN KEY (`grp`) REFERENCES `smart_dev_grps` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_devs_ibfk_5` FOREIGN KEY (`modif`) REFERENCES `smart_dev_modif` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_devs_ibfk_6` FOREIGN KEY (`nomi`) REFERENCES `smart_strucs` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_devs_ibfk_7` FOREIGN KEY (`parent`) REFERENCES `smart_devs` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_devs_ibfk_8` FOREIGN KEY (`typ`) REFERENCES `smart_dev_types` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_devs_ibfk_9` FOREIGN KEY (`sgrp`) REFERENCES `smart_stat_grps` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_dev_faces`
--
ALTER TABLE `smart_dev_faces`
  ADD CONSTRAINT `smart_dev_faces_ibfk_1` FOREIGN KEY (`dev`) REFERENCES `smart_devs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_faces_ibfk_10` FOREIGN KEY (`range_warn_max_code`) REFERENCES `smart_errcodes` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_faces_ibfk_11` FOREIGN KEY (`range_crit_max_code`) REFERENCES `smart_errcodes` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_faces_ibfk_12` FOREIGN KEY (`tardev`) REFERENCES `smart_devs` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_faces_ibfk_2` FOREIGN KEY (`stat_grp`) REFERENCES `smart_stat_grps` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_faces_ibfk_3` FOREIGN KEY (`viewgrp`) REFERENCES `smart_viewgrps` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_faces_ibfk_4` FOREIGN KEY (`viewtype`) REFERENCES `smart_viewtypes` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_faces_ibfk_5` FOREIGN KEY (`meas`) REFERENCES `smart_meas` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_faces_ibfk_6` FOREIGN KEY (`lim_warning_code`) REFERENCES `smart_errcodes` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_faces_ibfk_7` FOREIGN KEY (`lim_danger_code`) REFERENCES `smart_errcodes` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_faces_ibfk_8` FOREIGN KEY (`range_warn_min_code`) REFERENCES `smart_errcodes` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_faces_ibfk_9` FOREIGN KEY (`range_crit_min_code`) REFERENCES `smart_errcodes` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_dev_grps`
--
ALTER TABLE `smart_dev_grps`
  ADD CONSTRAINT `Group ctrl` FOREIGN KEY (`ctrl`) REFERENCES `smart_ctrls` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_dev_items`
--
ALTER TABLE `smart_dev_items`
  ADD CONSTRAINT `It` FOREIGN KEY (`item_id`) REFERENCES `smart_materials` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_dev_logic_ports`
--
ALTER TABLE `smart_dev_logic_ports`
  ADD CONSTRAINT `Dev` FOREIGN KEY (`dev`) REFERENCES `smart_devs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_dev_modif`
--
ALTER TABLE `smart_dev_modif`
  ADD CONSTRAINT `smart_dev_modif_ibfk_1` FOREIGN KEY (`dev_type`) REFERENCES `smart_dev_types` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_dev_servs`
--
ALTER TABLE `smart_dev_servs`
  ADD CONSTRAINT `Ctrl` FOREIGN KEY (`ctrl`) REFERENCES `smart_ctrls` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `Devv` FOREIGN KEY (`dev`) REFERENCES `smart_devs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `Service` FOREIGN KEY (`service_id`) REFERENCES `smart_services` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_dev_vars`
--
ALTER TABLE `smart_dev_vars`
  ADD CONSTRAINT `smart_dev_vars_ibfk_1` FOREIGN KEY (`dev`) REFERENCES `smart_devs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_dev_vars_ibfk_2` FOREIGN KEY (`dface`) REFERENCES `smart_dev_faces` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_errcodes`
--
ALTER TABLE `smart_errcodes`
  ADD CONSTRAINT `smart_errcodes_ibfk_1` FOREIGN KEY (`typ`) REFERENCES `smart_errcode_types` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `smart_errcodes_ibfk_2` FOREIGN KEY (`dtypes`) REFERENCES `smart_dev_types` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_materials`
--
ALTER TABLE `smart_materials`
  ADD CONSTRAINT `Cur` FOREIGN KEY (`curr`) REFERENCES `smart_currencies` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `Mea` FOREIGN KEY (`meas`) REFERENCES `smart_meas` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_module_opts`
--
ALTER TABLE `smart_module_opts`
  ADD CONSTRAINT `Mod` FOREIGN KEY (`module`) REFERENCES `smart_modules` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_picking_list_opts`
--
ALTER TABLE `smart_picking_list_opts`
  ADD CONSTRAINT `List` FOREIGN KEY (`list`) REFERENCES `smart_picking_lists` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_service_works_materials`
--
ALTER TABLE `smart_service_works_materials`
  ADD CONSTRAINT `Mat` FOREIGN KEY (`material`) REFERENCES `smart_materials` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `Serw` FOREIGN KEY (`ser_work`) REFERENCES `smart_service_works` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_stat_grp_opts`
--
ALTER TABLE `smart_stat_grp_opts`
  ADD CONSTRAINT `smart_stat_grp_opts_ibfk_1` FOREIGN KEY (`grp`) REFERENCES `smart_stat_grps` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_strucs`
--
ALTER TABLE `smart_strucs`
  ADD CONSTRAINT `Dev types` FOREIGN KEY (`dtype`) REFERENCES `smart_dev_types` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_struc_opts`
--
ALTER TABLE `smart_struc_opts`
  ADD CONSTRAINT `Stt` FOREIGN KEY (`struc`) REFERENCES `smart_strucs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_usr`
--
ALTER TABLE `smart_usr`
  ADD CONSTRAINT `Group` FOREIGN KEY (`grp`) REFERENCES `smart_usr_grps` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `smart_vals`
--
ALTER TABLE `smart_vals`
  ADD CONSTRAINT `Ctrlc` FOREIGN KEY (`ctrl`) REFERENCES `smart_ctrls` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `Devsss` FOREIGN KEY (`dev`) REFERENCES `smart_devs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `Str` FOREIGN KEY (`struc`) REFERENCES `smart_strucs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
