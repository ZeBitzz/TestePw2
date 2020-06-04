SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Table `whereAt`.`utilizador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`user` (
  `id_user` INT(9) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(25) NULL,
  `email` VARCHAR(30) NULL,
  `user_password` VARCHAR(64) NULL,
  `foto` VARCHAR(200) NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `whereAt`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`conference` (
  `id_conference` INT(9) NOT NULL AUTO_INCREMENT,
  `date_time_start` VARCHAR(32) NULL,
  `id_host` INT(9) NULL,
  `date_time` VARCHAR(32) NULL,
  `name` VARCHAR(30) NULL,
  `description` VARCHAR(200) NULL,
  PRIMARY KEY (`id_conference`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `whereAt`.`foto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABASE_NAME`.`guest` (
  `id_conference` INT(9) NOT NULL,
  `id_guest` INT(9) NOT NULL,
  PRIMARY KEY (`id_conference`, `id_guest`))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;