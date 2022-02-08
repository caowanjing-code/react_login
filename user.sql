-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2021-03-06 15:27:16
-- 服务器版本： 5.7.17-log
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";



--
-- Database: `react-redux-login`
--

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL COMMENT '自增长栏位',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `email` varchar(32) NOT NULL COMMENT '电子邮箱',
  `password` varchar(20) NOT NULL COMMENT '密码',
  `passwordConfirm` varchar(20) NOT NULL COMMENT '确认密码'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `passwordConfirm`) VALUES
(1, 'admin1', 'admin1@qq.com', '111', '111'),
(2, 'admin2', 'admin2@qq.com', '111', '111');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
