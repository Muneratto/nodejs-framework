-- ----------------------------
-- Table structure for `tbusuario`
-- ----------------------------
DROP TABLE IF EXISTS `tbusuario`;
CREATE TABLE `tbusuario` (
  `cdUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `stNome` varchar(145) DEFAULT NULL,
  `stEmail` varchar(145) DEFAULT NULL,
  `stSenha` varchar(95) DEFAULT NULL,
  `stTelefone` varchar(15) DEFAULT NULL,
  `stCelular` varchar(15) DEFAULT NULL,
  `stStatus` char(1) DEFAULT NULL,
  PRIMARY KEY (`cdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
