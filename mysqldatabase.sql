-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: booking_system
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time_slot` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`,`time_slot`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John Doe','johndoe@example.com','$2b$10$bGR95afzsSIzkQ4ZCaJx4eBIv3UMIMPUwUurZc5numVRQcZezw32C','admin','2025-03-05 14:59:15'),(2,'Test User','testuser@example.com','$2b$10$rFUH0LHdA0aWYNAuIZxYHus55UKDgEEnxyFqqCsRgRw0IocoimcjC','user','2025-03-05 15:34:09'),(3,'stephen','stehen@gmail.com','$2b$10$R/rLUFpLmiZF5z8bNGVmnORwv7iay2a8KOzUshLEYN1IUv5MeRO4W','user','2025-03-06 19:47:04'),(4,'stepeh','tett@gmail.com','$2b$10$GrrzO.s9g.OtirOvGukNCeqOGT4aUv5/F//1KqhEv0QzenT8bhijO','user','2025-03-06 19:59:01'),(5,'test','test@gmail.com','$2b$10$zLFkJNzZ5h0BpFDhY/V1JeH2Di36WVGQzLHeDkW1jNGfMGfs2paYW','admin','2025-03-06 19:59:28'),(6,'ayo','ayo@gmail.com','$2b$10$yQMtfYFp5C5u40fLZt6sdu9g8DPHp3oEFWRh4fMeLDvRc9AYRXcHS','admin','2025-03-06 20:11:23'),(7,'steg','ste@gmail.com','$2b$10$.GXXyplgcqvn2bGKA8nCDeIaSOCn34Tq9vpfOgCSTdZ/QSx9ZHnLu','admin','2025-03-06 20:20:36'),(8,'John Doe','step@gmail.com','$2b$10$DxKLAfD/.9v/W5qwrrpJE.6kxGNZ2uDzTlnCU00qaQICx5uuhFhPC','admin','2025-03-06 20:26:13'),(9,'Lotanna','lotanna@gmail.com','$2b$10$c053oX6IDkADgNJQKmebiOdIo5oX3yEByUBaDGB3hB30sHQGxOH82','user','2025-03-07 10:35:48'),(10,'Lotanna','lota@gmail.com','$2b$10$f9zALbZjUWQNpVssZ0kDJ.YeJxYvG.949hVWyRi0liSYrcyLFKiXq','user','2025-03-07 10:37:12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'booking_system'
--

--
-- Dumping routines for database 'booking_system'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-07 13:41:20
