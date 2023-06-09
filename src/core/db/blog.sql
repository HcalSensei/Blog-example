-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 09 juin 2023 à 06:50
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blog`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `adminID` int NOT NULL AUTO_INCREMENT,
  `adminNom` varchar(50) NOT NULL,
  `adminMotDePasse` text NOT NULL,
  `niveauAcces` varchar(16) NOT NULL,
  `adminEmail` varchar(150) NOT NULL,
  `adminTypego` int NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  PRIMARY KEY (`adminID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`adminID`, `adminNom`, `adminMotDePasse`, `niveauAcces`, `adminEmail`, `adminTypego`, `dateCreation`, `dateModification`) VALUES
(1, 'test', '$2b$10$m6JY7w4jyb9yPwCzdEfyEei/Ri7Uz1aPG1orKY8mu48c28.Pzjiua', 'c-r-u-d-crud', 'test@test.fr', 0, '2023-06-06 00:36:35', '2023-06-06 00:36:35'),
(2, 'test postman', '$2b$10$KKE4LotvqN/5qFD6gre7x.3/7qNfttLJJWZRuiFHx08pUyb9l0joy', 'c-r-u-d-crud', 'postman@test.fr', 0, '2023-06-06 23:39:10', '2023-06-06 23:39:10');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `categorieId` int NOT NULL AUTO_INCREMENT,
  `categorieLibelle` varchar(150) NOT NULL,
  `statusCategoriedo` int NOT NULL DEFAULT '1',
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  PRIMARY KEY (`categorieId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`categorieId`, `categorieLibelle`, `statusCategoriedo`, `dateCreation`, `dateModification`) VALUES
(1, 'test post', 0, '2023-06-09 00:32:44', '2023-06-09 01:28:30'),
(2, 'test postman', 1, '2023-06-09 00:50:09', '2023-06-09 00:50:09');

-- --------------------------------------------------------

--
-- Structure de la table `commentaires_post`
--

DROP TABLE IF EXISTS `commentaires_post`;
CREATE TABLE IF NOT EXISTS `commentaires_post` (
  `commentaireId` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `utilisateurId` int NOT NULL,
  `contenue` text NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  `niveauCommentaire` int NOT NULL,
  PRIMARY KEY (`commentaireId`),
  KEY `fk_comment_post` (`postId`),
  KEY `fk_comment_user` (`utilisateurId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `like_post`
--

DROP TABLE IF EXISTS `like_post`;
CREATE TABLE IF NOT EXISTS `like_post` (
  `likeId` int NOT NULL AUTO_INCREMENT,
  `utilisateurId` int NOT NULL,
  `postId` int NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  PRIMARY KEY (`likeId`),
  KEY `fk_user_like` (`utilisateurId`),
  KEY `fk_post_like` (`postId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `postId` int NOT NULL AUTO_INCREMENT,
  `postTitre` varchar(255) NOT NULL,
  `postTheme` varchar(255) NOT NULL,
  `postContenu` text NOT NULL,
  `auteurId` int NOT NULL,
  `postMedia` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `postCategorieId` int NOT NULL,
  `typePost` int NOT NULL,
  `statusPostdo` int NOT NULL DEFAULT '1',
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  PRIMARY KEY (`postId`),
  KEY `fk_post_admin` (`auteurId`),
  KEY `fk_post_type` (`typePost`),
  KEY `fk_post_categorie` (`postCategorieId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`postId`, `postTitre`, `postTheme`, `postContenu`, `auteurId`, `postMedia`, `postCategorieId`, `typePost`, `statusPostdo`, `dateCreation`, `dateModification`) VALUES
(1, 'test en dev', 'test', 'Ceci est le premier test en dev.\n Effectuer directement en code\n Ne pas prendre en compte.', 2, NULL, 1, 1, 1, '2023-06-09 02:25:35', '2023-06-09 02:25:35'),
(2, 'test ave postman', 'test', 'Ceci est le premier test en dev avec postman.\n Effectuer directement sur postman\n Ne pas prendre en compte.', 2, NULL, 1, 1, 1, '2023-06-09 02:37:33', '2023-06-09 02:37:33');

-- --------------------------------------------------------

--
-- Structure de la table `type_post`
--

DROP TABLE IF EXISTS `type_post`;
CREATE TABLE IF NOT EXISTS `type_post` (
  `typePostId` int NOT NULL AUTO_INCREMENT,
  `typepostLibelle` varchar(150) NOT NULL,
  `statusTypepostdo` int NOT NULL DEFAULT '1',
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  PRIMARY KEY (`typePostId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `type_post`
--

INSERT INTO `type_post` (`typePostId`, `typepostLibelle`, `statusTypepostdo`, `dateCreation`, `dateModification`) VALUES
(1, 'test modife', 0, '2023-06-08 00:38:04', '2023-06-09 00:11:23'),
(2, 'test postman', 1, '2023-06-08 23:34:44', '2023-06-08 23:34:44');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `utilisateurId` int NOT NULL AUTO_INCREMENT,
  `utilisateurNom` varchar(50) NOT NULL,
  `utilisateurPrenom` varchar(120) NOT NULL,
  `utilisateurMotDePasse` text NOT NULL,
  `utilisateurEmail` varchar(150) NOT NULL,
  `utilisateurTelephone` varchar(15) NOT NULL,
  `utilisateurStatut` int NOT NULL DEFAULT '1',
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  PRIMARY KEY (`utilisateurId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`utilisateurId`, `utilisateurNom`, `utilisateurPrenom`, `utilisateurMotDePasse`, `utilisateurEmail`, `utilisateurTelephone`, `utilisateurStatut`, `dateCreation`, `dateModification`) VALUES
(1, 'test2', 'Postman 1', '$2b$10$qI2YGbTDOCNt4PsPvIEmd.xR2ZmtXrybqI8zSyLQTq8guIMhy5Z7O', 'test@test.fr', '002250707070712', 0, '2023-06-04 17:14:33', '2023-06-07 08:44:21'),
(2, 'post', 'test postman', '$2b$10$5yRIaG16Sb.tBhog9Er/ieGPUq7gRbNkyyK0i3HyR4Y85p19zBWVq', 'postman@test.fr', '002250707070712', 1, '2023-06-04 19:05:32', '2023-06-04 19:05:32'),
(3, 'post 3', 'that is a test of postman', '$2b$10$LJjlZtvCPX3W.cZAr.K.FusjgMDwDOTaOj0V9RnbaQ8ET7prfh9k2', 'postman2@test.fr', '002250707070712', 1, '2023-06-07 08:49:27', '2023-06-07 08:49:27');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaires_post`
--
ALTER TABLE `commentaires_post`
  ADD CONSTRAINT `fk_comment_post` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`),
  ADD CONSTRAINT `fk_comment_user` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`utilisateurId`);

--
-- Contraintes pour la table `like_post`
--
ALTER TABLE `like_post`
  ADD CONSTRAINT `fk_post_like` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`),
  ADD CONSTRAINT `fk_user_like` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`utilisateurId`);

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_post_admin` FOREIGN KEY (`auteurId`) REFERENCES `admin` (`adminID`),
  ADD CONSTRAINT `fk_post_categorie` FOREIGN KEY (`postCategorieId`) REFERENCES `categorie` (`categorieId`),
  ADD CONSTRAINT `fk_post_type` FOREIGN KEY (`typePost`) REFERENCES `type_post` (`typePostId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
