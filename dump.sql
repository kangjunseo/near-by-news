-- MySQL dump 10.19  Distrib 10.3.29-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: gg_ch
-- ------------------------------------------------------
-- Server version	10.3.29-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dummy`
--

DROP TABLE IF EXISTS `dummy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dummy` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `coordinate` varchar(255) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `checks_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=10001 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dummy`
--

LOCK TABLES `dummy` WRITE;
/*!40000 ALTER TABLE `dummy` DISABLE KEYS */;
/*!40000 ALTER TABLE `dummy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dummy_2`
--

DROP TABLE IF EXISTS `dummy_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dummy_2` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `serial_post_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=5001 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dummy_2`
--

LOCK TABLES `dummy_2` WRITE;
/*!40000 ALTER TABLE `dummy_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `dummy_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `serial_post_id` varchar(255) DEFAULT NULL,
  `user_profile` varchar(255) DEFAULT 'default.png',
  `user_name` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `place` longtext DEFAULT NULL,
  `coordinate` varchar(255) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `picture` longtext DEFAULT NULL,
  `checks_count` int(11) DEFAULT 0,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'/tqjdccHr8otXX0jqlhgb/fihmyAEemcsnb7R9RTbW14zShohZaymZVnAoigOQNnZk+//B42FII2E0/B3ZFxgQ==','default.png','test','test','2022-02-16 21:53:57','가뭄','대한민국 서울특별시 성동구 왕십리로 222','{\"lat\":37.5571759,\"lng\":127.0454092}',37.5571759,127.0458908,'Test Uploads','[\"default.png\"]',124427);
INSERT INTO `posts` VALUES (2,'/tqjdccHr8otXX0jqlhgb/fihmyAEemcsnb7R9RTbW14zShohZaymZVnAoigOQNnZk+//B42FII2E0/B3ZFxgQ==','default.png','test','test','2022-02-16 21:53:57','가뭄','대한민국 서울특별시 성동구 왕십리로 222','{\"lat\":37.5571759,\"lng\":127.0454092}',37.5571759,127.0458908,'Test Uploads','[\"default.png\"]',124427);
INSERT INTO `posts` VALUES (3,'/tqjdccHr8otXX0jqlhgb/fihmyAEemcsnb7R9RTbW14zShohZaymZVnAoigOQNnZk+//B42FII2E0/B3ZFxgQ==','default.png','test','test','2022-02-16 21:53:57','가뭄','대한민국 서울특별시 성동구 왕십리로 222','{\"lat\":37.5571759,\"lng\":127.0454092}',37.5571759,127.0458908,'Test Uploads','[\"default.png\"]',124427);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts_checks`
--

DROP TABLE IF EXISTS `posts_checks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts_checks` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `serial_post_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts_checks`
--

LOCK TABLES `posts_checks` WRITE;
/*!40000 ALTER TABLE `posts_checks` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts_checks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_info` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `user_profile` varchar(255) DEFAULT 'default.png',
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `user_address` longtext DEFAULT NULL,
  `user_interest_areas` longtext DEFAULT NULL,
  `user_pwd` varchar(255) DEFAULT NULL,
  `user_salt` longtext DEFAULT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-30  0:27:58
