SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Table `whereAt`.`codigo_postal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`codigo_postal` (
  `cod_postal` CHAR(10) NOT NULL,
  `localidade` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_postal`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whereAt`.`restaurante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`restaurante` (
  `id_restaurante` INT(7) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `password` VARCHAR(64) NULL,
  `foto_perfil` VARCHAR(80) NULL,
  `informacao` VARCHAR(1000) NULL,
  `morada` VARCHAR(45) NULL,
  `aprovacao` TINYINT NULL,
  `cod_postal` CHAR(10) NOT NULL,
  `disponibilidade` TINYINT NULL,
  `email` VARCHAR(30) NULL,
  PRIMARY KEY (`id_restaurante`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whereAt`.`utilizador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`utilizador` (
  `id_utilizador` INT(9) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(25) NULL,
  `email` VARCHAR(30) NULL,
  `password` VARCHAR(64) NULL,
  `administrador` TINYINT NULL,
  `foto` VARCHAR(200) NULL,
  `numero_tel` INT(9) NULL,
  PRIMARY KEY (`id_utilizador`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whereAt`.`comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`comentario` (
  `id_restaurante` INT(7) NOT NULL,
  `id_utilizador` INT(9) NOT NULL,
  `txt_comentario` VARCHAR(501) NULL,
  `rating` INT(1) NULL,
  `data` VARCHAR(32) NULL,
  PRIMARY KEY (`id_restaurante`, `id_utilizador`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whereAt`.`mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`mesa` (
  `id_mesa` INT(3) NOT NULL AUTO_INCREMENT,
  `id_restaurante` INT(16) NOT NULL,
  `n_cadeiras` INT(3) NULL,
  PRIMARY KEY (`id_mesa`, `id_restaurante`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whereAt`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`reserva` (
  `data_hora_reservada` VARCHAR(32) NOT NULL,
  `id_utilizador` INT(9) NOT NULL,
  `id_restaurante` INT(7) NOT NULL,
  `id_mesa` INT(3) NOT NULL,
  `data_hora` VARCHAR(32) NULL,
  `confirmacao` CHAR(1) NULL,
  `presenca` TINYINT NULL,
  PRIMARY KEY (`data_hora_reservada`, `id_utilizador`, `id_restaurante`, `id_mesa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whereAt`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`tag` (
  `id_tag` INT(12) NOT NULL AUTO_INCREMENT,
  `desc_tag` VARCHAR(20) NULL,
  PRIMARY KEY (`id_tag`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whereAt`.`restaurante_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`restaurante_tag` (
  `id_restaurante` INT(7) NOT NULL,
  `id_tag` INT(12) NOT NULL,
  `tag_principal` TINYINT NULL,
  PRIMARY KEY (`id_restaurante`, `id_tag`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whereAt`.`foto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`foto` (
  `id_foto` INT(7) NOT NULL AUTO_INCREMENT,
  `id_restaurante` INT(7) NOT NULL,
  `link_foto` VARCHAR(256) NULL,
  PRIMARY KEY (`id_foto`, `id_restaurante`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whereAt`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`categoria` (
  `id_categoria` INT(7) NOT NULL AUTO_INCREMENT,
  `desc_categoria` VARCHAR(45) NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whereAt`.`prato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`prato` (
  `id_prato` INT(12) NOT NULL AUTO_INCREMENT,
  `id_restaurante` INT(7) NOT NULL,
  `preco` DOUBLE NULL,
  `desc_prato` VARCHAR(45) NULL,
  `id_categoria` INT(7) NOT NULL,
  PRIMARY KEY (`id_prato`, `id_restaurante`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whereAt`.`utilizador_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`utilizador_tag` (
  `id_utilizador` INT(9) NOT NULL,
  `id_tag` INT(12) NOT NULL,
  PRIMARY KEY (`id_utilizador`, `id_tag`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;