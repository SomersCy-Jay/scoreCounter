CREATE DATABASE  IF NOT EXISTS `voetbaltafel` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `voetbaltafel`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: voetbaltafel
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `speler`
--

DROP TABLE IF EXISTS `speler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `speler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `naam` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speler`
--

LOCK TABLES `speler` WRITE;
/*!40000 ALTER TABLE `speler` DISABLE KEYS */;
INSERT INTO `speler` VALUES (1,'Bertha'),(2,'Frances'),(3,'Xavier'),(4,'Dante'),(5,'Hermione'),(6,'Paki'),(7,'Malcolm'),(8,'Fatima'),(9,'Ferdinand'),(10,'Glenna'),(11,'Alika'),(12,'Asher'),(13,'Gregory'),(14,'Demetria'),(15,'Jayme'),(16,'Ezekiel'),(17,'Brent'),(18,'Kenyon'),(19,'Griffith'),(20,'Alfreda'),(21,'Shaeleigh'),(22,'Barry'),(23,'Cassidy'),(24,'Channing'),(25,'Alden'),(26,'Kathleen'),(27,'Kevin'),(28,'Vaughan'),(29,'Idona'),(30,'Tasha'),(31,'Rinah'),(32,'Oleg'),(33,'Zeus'),(34,'Davis'),(35,'Patricia'),(36,'Erin'),(37,'Winifred'),(38,'Katelyn'),(39,'Chanda'),(40,'Cheryl'),(41,'Britanney'),(42,'Amal'),(43,'Serina'),(44,'Kermit'),(45,'Quynn'),(46,'Kasper'),(47,'Macaulay'),(48,'Ivory'),(49,'Baxter'),(50,'Armando'),(51,'Bianca'),(52,'Trevor'),(53,'Madaline'),(54,'Freya'),(55,'Nehru'),(56,'Alice'),(57,'Phyllis'),(58,'Justin'),(59,'Oscar'),(60,'Guy'),(61,'Walter'),(62,'George'),(63,'Lenore'),(64,'Kieran'),(65,'Mara'),(66,'Renee'),(67,'Naida'),(68,'Kenyon'),(69,'Len'),(70,'Kareem'),(71,'Perry'),(72,'Hayfa'),(73,'Kuame'),(74,'Avram'),(75,'Brenda'),(76,'Brock'),(77,'Rhiannon'),(78,'Lucas'),(79,'Linda'),(80,'Zenia'),(81,'Stacy'),(82,'Phyllis'),(83,'Fulton'),(84,'Daniel'),(85,'Gisela'),(86,'Winter'),(87,'Galvin'),(88,'Sandra'),(89,'Colin'),(90,'Colleen'),(91,'Jennifer'),(92,'Judah'),(93,'Hollee'),(94,'Galena'),(95,'Barry'),(96,'Odette'),(97,'Keane'),(98,'Judith'),(99,'Kelly'),(100,'Chandler');
/*!40000 ALTER TABLE `speler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wedstrijd`
--

DROP TABLE IF EXISTS `wedstrijd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wedstrijd` (
  `idwedstrijd` int NOT NULL AUTO_INCREMENT,
  `speler1` int NOT NULL,
  `speler2` int NOT NULL,
  `datum` date NOT NULL,
  PRIMARY KEY (`idwedstrijd`),
  KEY `fk_wedstrijd_speler1_idx` (`speler1`),
  KEY `fk_wedstrijd_speler2_idx` (`speler2`),
  CONSTRAINT `fk_wedstrijd_speler1` FOREIGN KEY (`speler1`) REFERENCES `speler` (`id`),
  CONSTRAINT `fk_wedstrijd_speler2` FOREIGN KEY (`speler2`) REFERENCES `speler` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedstrijd`
--

LOCK TABLES `wedstrijd` WRITE;
/*!40000 ALTER TABLE `wedstrijd` DISABLE KEYS */;
INSERT INTO `wedstrijd` VALUES (1,1,96,'2021-05-24'),(2,8,62,'2021-05-24'),(3,12,70,'2021-05-24'),(4,50,66,'2021-05-24'),(5,24,79,'2021-05-24'),(6,6,87,'2021-05-24'),(7,20,90,'2021-05-24'),(8,43,56,'2021-05-24'),(9,17,51,'2021-05-24'),(10,15,58,'2021-05-24'),(11,29,73,'2021-05-24'),(12,30,83,'2021-05-24'),(13,31,60,'2021-05-24'),(14,14,57,'2021-05-24'),(15,28,80,'2021-05-24'),(16,46,63,'2021-05-24'),(17,30,80,'2021-05-24'),(18,12,60,'2021-05-24'),(19,14,94,'2021-05-24'),(20,44,81,'2021-05-24'),(21,50,80,'2021-05-24'),(22,31,61,'2021-05-24'),(23,40,64,'2021-05-24'),(24,7,78,'2021-05-24'),(25,26,87,'2021-05-24'),(26,23,59,'2021-05-24'),(27,50,83,'2021-05-24'),(28,17,73,'2021-05-24'),(29,25,62,'2021-05-24'),(30,25,79,'2021-05-24'),(31,40,82,'2021-05-24'),(32,21,68,'2021-05-24'),(33,45,73,'2021-05-24'),(34,31,96,'2021-05-24'),(35,23,66,'2021-05-24'),(36,4,94,'2021-05-24'),(37,50,65,'2021-05-24'),(38,8,93,'2021-05-24'),(39,11,84,'2021-05-24'),(40,46,57,'2021-05-24'),(41,22,84,'2021-05-24'),(42,46,93,'2021-05-24'),(43,25,53,'2021-05-24'),(44,23,59,'2021-05-24'),(45,40,57,'2021-05-24'),(46,18,71,'2021-05-24'),(47,39,76,'2021-05-24'),(48,13,80,'2021-05-24'),(49,38,78,'2021-05-24'),(50,46,64,'2021-05-24'),(51,33,65,'2021-05-24'),(52,1,65,'2021-05-24'),(53,12,55,'2021-05-24'),(54,33,55,'2021-05-24'),(55,22,67,'2021-05-24'),(56,11,93,'2021-05-24'),(57,46,76,'2021-05-24'),(58,41,56,'2021-05-24'),(59,22,88,'2021-05-24'),(60,34,73,'2021-05-24');
/*!40000 ALTER TABLE `wedstrijd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wedstrijdverloop`
--

DROP TABLE IF EXISTS `wedstrijdverloop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wedstrijdverloop` (
  `idwedstrijdVerloop` int NOT NULL AUTO_INCREMENT,
  `idWedstrijd` int NOT NULL,
  `spelerID` int NOT NULL,
  `scoreSpeler1` int NOT NULL,
  `scoreSpeler2` int NOT NULL,
  `tijdstip` time NOT NULL,
  PRIMARY KEY (`idwedstrijdVerloop`),
  KEY `fk_wedstrijdVerloop_wedstrijd_idx` (`idWedstrijd`),
  KEY `fk_wedstrijdVerloop_speler1_idx` (`spelerID`),
  CONSTRAINT `fk_wedstrijdVerloop_speler1` FOREIGN KEY (`spelerID`) REFERENCES `speler` (`id`),
  CONSTRAINT `fk_wedstrijdVerloop_wedstrijd` FOREIGN KEY (`idWedstrijd`) REFERENCES `wedstrijd` (`idwedstrijd`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedstrijdverloop`
--

LOCK TABLES `wedstrijdverloop` WRITE;
/*!40000 ALTER TABLE `wedstrijdverloop` DISABLE KEYS */;
INSERT INTO `wedstrijdverloop` VALUES (1,1,1,1,0,'20:16:00'),(2,1,96,1,1,'20:17:00'),(3,1,96,1,2,'20:18:00'),(4,1,96,1,3,'20:19:00'),(5,1,96,1,4,'20:20:00'),(6,1,1,2,4,'20:21:00'),(7,1,1,3,4,'20:22:00'),(8,1,1,4,4,'20:23:00'),(9,1,96,4,5,'20:24:00'),(10,1,96,4,6,'20:25:00'),(11,1,96,4,7,'20:26:00'),(12,1,96,4,8,'20:27:00'),(13,1,96,4,9,'20:28:00'),(14,1,1,5,9,'20:29:00'),(15,1,96,5,10,'20:30:00'),(16,2,8,1,0,'20:32:00'),(17,2,8,2,0,'20:33:00'),(18,2,8,3,0,'20:34:00'),(19,2,8,4,0,'20:35:00'),(20,2,8,5,0,'20:36:00'),(21,2,8,6,0,'20:37:00'),(22,2,8,7,0,'20:38:00'),(23,2,8,8,0,'20:39:00'),(24,2,8,9,0,'20:40:00'),(25,2,8,10,0,'20:41:00'),(26,3,70,0,1,'20:44:00'),(27,3,70,0,2,'20:45:00'),(28,3,70,0,3,'20:46:00'),(29,3,12,1,3,'20:47:00'),(30,3,12,2,3,'20:48:00'),(31,3,12,3,3,'20:49:00'),(32,3,12,4,3,'20:50:00'),(33,3,12,5,3,'20:51:00'),(34,3,70,5,4,'20:52:00'),(35,3,70,5,5,'20:53:00'),(36,3,70,5,6,'20:54:00'),(37,3,70,5,7,'20:55:00'),(38,3,70,5,8,'20:56:00'),(39,3,12,6,8,'20:57:00'),(40,3,12,7,8,'20:58:00'),(41,3,12,8,8,'20:59:00'),(42,3,12,9,8,'21:00:00'),(43,3,12,10,8,'21:01:00'),(44,4,66,0,1,'21:05:00'),(45,4,66,0,2,'21:06:00'),(46,4,66,0,3,'21:07:00'),(47,4,66,0,4,'21:08:00'),(48,4,66,0,5,'21:09:00'),(49,4,66,0,6,'21:10:00'),(50,4,66,0,7,'21:11:00'),(51,4,50,1,7,'21:12:00'),(52,4,66,1,8,'21:13:00'),(53,4,50,2,8,'21:14:00'),(54,4,50,3,8,'21:15:00'),(55,4,66,3,9,'21:16:00'),(56,4,66,3,10,'21:17:00');
/*!40000 ALTER TABLE `wedstrijdverloop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'voetbaltafel'
--

--
-- Dumping routines for database 'voetbaltafel'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-24 22:11:58
