-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Lun 09 Janvier 2017 à 18:59
-- Version du serveur :  5.7.14
-- Version de PHP :  5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `x_project`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `caId` int(50) NOT NULL,
  `caLibelle` varchar(50) NOT NULL,
  `caImage` varchar(50) NOT NULL,
  `raId` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `categorie`
--

INSERT INTO `categorie` (`caId`, `caLibelle`, `caImage`, `raId`) VALUES
(1, 'Boucherie', 'images/rayons/ray1.png', 1),
(2, 'Volailles', 'images/rayons/ray1.png', 1),
(3, 'Poisonnerie', 'images/rayons/ray1.png', 1),
(4, 'Légumes', 'images/rayons/ray2.png', 2),
(5, 'Jus', 'images/rayons/ray2.png', 2),
(6, 'Fruits', 'images/rayons/ray2.png', 2),
(7, 'Pains et Pâtisseries', 'images/rayons/ray3.png', 3),
(8, 'Pain de mie', 'images/rayons/ray3.png', 3),
(9, 'Pains grillés', 'images/rayons/ray3.png', 3),
(10, 'Pâtisseries moelleuses', 'images/rayons/ray3.png', 3),
(11, 'Laits et Oeufs', 'images/rayons/ray4.png', 4),
(12, 'Beurres et Crèmes', 'images/rayons/ray4.png', 4),
(13, 'Fromage', 'images/rayons/ray4.png', 4),
(14, 'Charcuteries', 'images/rayons/ray4.png', 4),
(15, 'Traiteur', 'images/rayons/ray4.png', 4),
(16, 'Yaourts', 'images/rayons/ray4.png', 4),
(17, 'Apéritifs', 'images/rayons/ray5.png', 5),
(18, 'Plats au four', 'images/rayons/ray5.png', 5),
(19, 'Viandes et Poissons', 'images/rayons/ray5.png', 5),
(20, 'Légumes et Frites', 'images/rayons/ray5.png', 5),
(21, 'Desserts glacés', 'images/rayons/ray5.png', 5),
(22, 'Sirop', 'images/rayons/ray6.png', 6),
(23, 'Jus de fruits légumes', 'images/rayons/ray6.png', 6),
(24, 'Lait', 'images/rayons/ray6.png', 6),
(25, 'Eau', 'images/rayons/ray6.png', 6),
(26, 'Boissons gazeuses', 'images/rayons/ray6.png', 6),
(27, 'Bières', 'images/rayons/ray6.png', 6),
(28, 'Vins rouges', 'images/rayons/ray6.png', 6),
(29, 'Vins blancs', 'images/rayons/ray6.png', 6),
(30, 'Rosés', 'images/rayons/ray6.png', 6),
(31, 'Champagnes et Cidres', 'images/rayons/ray6.png', 6),
(32, 'Pâtes et Riz', 'images/rayons/ray7.png', 7),
(33, 'Conserves', 'images/rayons/ray7.png', 7),
(34, 'Plats cuisinés', 'images/rayons/ray7.png', 7),
(35, 'Apéritifs', 'images/rayons/ray7.png', 7),
(36, 'Soupes', 'images/rayons/ray7.png', 7),
(37, 'Epices et Assaisonnements', 'images/rayons/ray7.png', 7),
(38, 'Boissons chaudes', 'images/rayons/ray8.png', 8),
(39, 'Céréales', 'images/rayons/ray8.png', 8),
(40, 'Biscuits', 'images/rayons/ray8.png', 8),
(41, 'Chocolats', 'images/rayons/ray8.png', 8),
(42, 'Confiseries', 'images/rayons/ray8.png', 8),
(43, 'Sucre et Farine', 'images/rayons/ray8.png', 8),
(44, 'Desserts', 'images/rayons/ray8.png', 8);

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `clId` int(50) NOT NULL,
  `clNom` varchar(50) NOT NULL,
  `clPrenom` varchar(50) NOT NULL,
  `clAdresse` varchar(50) NOT NULL,
  `clMail` varchar(320) NOT NULL,
  `clMdp` varchar(50) NOT NULL,
  `clTelFixe` int(50) NOT NULL,
  `clTelPort` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `epicerie`
--

CREATE TABLE `epicerie` (
  `epId` int(50) NOT NULL,
  `epSiret` int(50) NOT NULL,
  `epDenomination` varchar(50) NOT NULL,
  `epNomProp` varchar(50) NOT NULL,
  `epPrenomProp` varchar(50) NOT NULL,
  `epMdp` varchar(50) NOT NULL,
  `epAdresse` varchar(50) NOT NULL,
  `epTel` int(10) NOT NULL,
  `epMail` varchar(320) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `prId` int(50) NOT NULL,
  `prQuantite` int(10) NOT NULL,
  `clId` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `prId` int(50) NOT NULL,
  `prLibelle` varchar(50) NOT NULL,
  `prPrixUnitaireHT` decimal(5,2) NOT NULL,
  `prPortion` varchar(50) NOT NULL,
  `prPrixHT` decimal(5,2) DEFAULT NULL,
  `prImage` varchar(50) NOT NULL,
  `caId` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `produit`
--

INSERT INTO `produit` (`prId`, `prLibelle`, `prPrixUnitaireHT`, `prPortion`, `prPrixHT`, `prImage`, `caId`) VALUES
(1, 'Pomme1', '2.75', 'la barquette de 500 g', '5.50', 'images/produits/pomme1.jpg', 6),
(2, 'Banane1', '1.25', 'l\'unité', '1.25', 'images/produits/banane1.jpg', 6),
(3, 'Banane2', '2.99', 'le kg', '2.99', 'images/produits/banane1.jpg', 6),
(4, 'fraise1', '1.18', 'la barquette de 100g', '17.99', 'images/produits/fraise1.jpg', 6),
(5, 'fraise2', '0.08', 'l\'unite', '0.08', 'images/produits/fraise1.jpg', 6);

-- --------------------------------------------------------

--
-- Structure de la table `rayon`
--

CREATE TABLE `rayon` (
  `raId` int(50) NOT NULL,
  `raLibelle` varchar(50) NOT NULL,
  `raImage` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `rayon`
--

INSERT INTO `rayon` (`raId`, `raLibelle`, `raImage`) VALUES
(1, 'Viandes Poissons', 'images/rayons/ray1.png'),
(2, 'Fruits Légumes', 'images/rayons/ray2.png'),
(3, 'Pains Pâtisseries', 'images/rayons/ray3.png'),
(4, 'Produits Frais', 'images/rayons/ray4.png'),
(5, 'Surgelés', 'images/rayons/ray5.png'),
(6, 'Boissons', 'images/rayons/ray6.png'),
(7, 'Epicerie salée', 'images/rayons/ray7.png'),
(8, 'Epicerie sucrée', 'images/rayons/ray8.png'),
(9, 'Divers', 'images/rayons/ray1.png');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`caId`),
  ADD KEY `raId` (`raId`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`clId`);

--
-- Index pour la table `epicerie`
--
ALTER TABLE `epicerie`
  ADD PRIMARY KEY (`epId`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`prId`),
  ADD KEY `caId` (`caId`);

--
-- Index pour la table `rayon`
--
ALTER TABLE `rayon`
  ADD PRIMARY KEY (`raId`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `caId` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `clId` int(50) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `epicerie`
--
ALTER TABLE `epicerie`
  MODIFY `epId` int(50) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `prId` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `rayon`
--
ALTER TABLE `rayon`
  MODIFY `raId` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
