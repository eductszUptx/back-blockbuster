DROP DATABASE IF EXISTS blockbuster;
CREATE DATABASE IF NOT EXISTS blockbuster DEFAULT CHARACTER SET utf8mb4 COLLATE utf8bm4_general_ci;
USE blockbuster;

-- CREATE USER IF NOT EXISTS 'blockbuser'@'localhost' IDENTIFIED BY 'blockpass487';
-- GRANT ALL PRIVILEGES ON blockbuster.* TO 'blockbuser'@'localhost';
-- FLUSH PRIVILEGES;

CREATE TABLE roles (
    id_rol INT(3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(30) NOT NULL
)ENGINE=InnoDB;

INSERT INTO roles (id_rol, nombre_rol) VALUES
    (745, 'Admon'),
    (125, 'Operador'),
    (58, 'Cliente');

CREATE TABLE planes (
    id_plan INT(3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estatus_plan TINYINT(1) NULL DEFAULT -1 COMMENT '1-> Habilitado, -1-> Deshabilitado',
    nombre_plan VARCHAR(30) NOT NULL,
    precio_plan decimal(10,2) NOT NULL,
    cantidad_limite_plan TINYINT(1) NOT NULL,
    tipo_plan TINYINT(1) NOT NULL COMMENT '8-> Semanal, 16-> Mensual, 32-> Anual'
)ENGINE=InnoDB;

INSERT INTO planes (id_plan, estatus_plan, nombre_plan, precio_plan, cantidad_limite_plan, tipo_plan) VALUES
    (NULL, '1', "Básico", 99.99, 10, 8),
    (NULL, '1', "Estándar", 199.09, 10, 16),
    (NULL, '1', "Co-Prenium", 398.37, 10, 16),
    (NULL, '1', "Prenium", 1499.99, 10, 32);

CREATE TABLE usuarios (
    id_usuario INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estatus_usuario TINYINT(1) NULL DEFAULT -1 COMMENT '1-> Habilitado, -1-> Deshabilitado',
    nombre_usuario VARCHAR(50) NOT NULL,
    ap_usuario VARCHAR(50) NOT NULL,
    am_usuario VARCHAR(50) NULL DEFAULT NULL,
    sexo_usuario TINYINT(1) NOT NULL COMMENT '0:Femenino, 1: Masculino',
    email_usuario VARCHAR(70) NOT NULL,
    password_usuario VARCHAR(64) NOT NULL,
    imagen_usuario VARCHAR(100) DEFAULT NULL,
    id_rol INT(3) NOT NULL,
    FOREIGN KEY(id_rol) REFERENCES roles (id_rol) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB;

INSERT INTO usuarios (id_usuario, nombre_usuario, ap_usuario, am_usuario, sexo_usuario, email_usuario, password_usuario, id_rol) VALUES
    (NULL, 'Fanni', 'Gutierrez', 'Pacheco', 0, 'fanni@blockbuster.com', SHA2("admon123",256), 745),
    (NULL, 'Marcos Braulio', 'Calva', 'Cervantes', 1, 'marcosbraulio@blockbuster.com', SHA2("operador123",256), 125),
    (NULL, 'Jessica Melina', 'Gutierrez', 'Zempoalteca', 0, 'jessmelina@blockbuster.com', SHA2("cliente123",256), 58);

CREATE TABLE generos (
    id_genero INT(3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estatus_genero TINYINT(1) NULL DEFAULT -1 COMMENT '1-> Habilitado, -1-> Deshabilitado',
    nombre_genero VARCHAR(30) NOT NULL,
    descripcion_genero TEXT NULL DEFAULT 'Sin descripción...' COMMENT ''
)ENGINE=InnoDB;

INSERT INTO generos (id_genero, estatus_genero, nombre_genero, descripcion_genero) VALUES
    (1, 1, 'Acción', 'Escenas de combate, persecuciones y adrenalina.'),
    (2, 1, 'Aventura', 'Historias de exploración y desafíos emocionantes.'),
    (3, 1, 'Ciencia Ficción', 'Futuros distópicos, tecnología avanzada y viajes espaciales.'),
    (4, 1, 'Comedia', 'Situaciones humorísticas y personajes divertidos.'),
    (5, 1, 'Drama', 'Historias emocionales con conflictos personales profundos.'),
    (6, 1, 'Fantasía', 'Mundos mágicos, criaturas míticas y poderes sobrenaturales.'),
    (7, 1, 'Suspenso', 'Intriga, tensión y giros inesperados.'),
    (8, 1, 'Terror', 'Historias de miedo con atmósferas inquietantes.'),
    (9, 1, 'Animación', 'Películas y series animadas en diferentes estilos.'),
    (10, 1, 'Anime', 'Animación japonesa con múltiples subgéneros.'),
    (11, 1, 'Biográfico', 'Historias basadas en la vida de personajes reales.'),
    (12, 1, 'Crimen / Policíaco', 'Investigaciones criminales, mafia y detectives.'),
    (13, 1, 'Deportes', 'Historias centradas en disciplinas deportivas y atletas.'),
    (14, 1, 'Documental', 'Basado en hechos reales con análisis y entrevistas.'),
    (15, 1, 'Guerra / Bélico', 'Historias ambientadas en conflictos militares.'),
    (16, 1, 'Histórico', 'Dramas basados en eventos históricos reales.'),
    (17, 1, 'Musical', 'Películas y series con canciones y coreografías.'),
    (18, 1, 'Romance', 'Historias de amor y relaciones sentimentales.'),
    (19, 1, 'Superhéroes', 'Personajes con habilidades extraordinarias.'),
    (20, 1, 'Western', 'Historias del viejo oeste, vaqueros y forajidos.'),
    (21, 1, 'Comedia Romántica', 'Romance con elementos de humor ligero.'),
    (22, 1, 'Ciberpunk', 'Futuro distópico con tecnología avanzada.'),
    (23, 1, 'Gore / Slasher', 'Terror con violencia extrema y sangre explícita.'),
    (24, 1, 'Noir / Neo-Noir', 'Historias criminales con un tono oscuro y detectives.'),
    (25, 1, 'Survival', 'Personajes enfrentando condiciones extremas para sobrevivir.'),
    (26, 1, 'Utopía / Distopía', 'Mundos futuros ideales o en crisis política y social.');



CREATE TABLE streaming (
    id_streaming INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estatus_streaming TINYINT(1) NULL DEFAULT -1 COMMENT '1-> Habilitado, -1-> Deshabilitado',
    nombre_streaming VARCHAR(50) NOT NULL,
    fecha_lanzamiento_streaming  DATE NOT NULL,
    duracion_streaming TIME NULL COMMENT 'Peliculas',
    temporadas_streaming TINYINT(1) NULL COMMENT 'temporadas',
    caratula_streaming VARCHAR(50) NOT NULL COMMENT 'image_caratula.png',
    trailer_streaming VARCHAR(70) NOT NULL COMMENT 'trailer_streaming.mp3',
    clasificacion_streaming VARCHAR(3) NOT NULL COMMENT 'AA: Infantil, A: Todo Público, B: Mayores de 12, B15: Mayores de 15, C: Solo Mayores 18, D: Exclusiva Adultos',
    sipnosis_streaming TEXT DEFAULT 'Sin descripción por el momento' COMMENT '',
    fecha_estreno_streaming DATE NOT NULL,
    id_genero INT(3) NOT NULL,
    FOREIGN KEY(id_genero) REFERENCES generos (id_genero) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB;

INSERT INTO streaming (id_streaming, estatus_streaming, nombre_streaming, fecha_lanzamiento_streaming, duracion_streaming, caratula_streaming, trailer_streaming, clasificacion_streaming, sipnosis_streaming, fecha_estreno_streaming, id_genero) VALUES
    (NULL, 1, "Mufasa: El Rey León", "2024-12-20", "01:45:00",  "caratula_mufasa.png", "trailer_mufasa.mp4", "AA", "Rafiki, Timón y Pumba le cuentan la leyenda de Mufasa a la joven cachorro de león Kiara, hija de Simba y Nala. La historia se cuenta en flashbacks y presenta a Mufasa como un cachorro huérfano, perdido y solo hasta que conoce a un simpático león llamado Taka, heredero de un linaje real. Este encuentro casual pone en marcha un viaje de un extraordinario grupo de inadaptados que buscan su destino. Y sus vínculos se pondrán a prueba mientras trabajan juntos para escapar de un enemigo amenazador y letal", "2025-03-16", 2);

INSERT INTO streaming(id_streaming, estatus_streaming, nombre_streaming, fecha_lanzamiento_streaming, temporadas_streaming, caratula_streaming, trailer_streaming, clasificacion_streaming, sipnosis_streaming, fecha_estreno_streaming, id_genero) VALUES
    (NULL, 1, "La casa de Papel", "2017-08-12", 5, "caratula_casa_de_papel.png", "trailer_casa_de_papel.png", "B15", "Ocho ladrones toman rehenes en la Fábrica Nacional de Moneda y Timbre de España, mientras el líder de la banda manipula a la policía para cumplir con su plan", "2025-03-16", 7);

CREATE TABLE videos (
    id_video INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estatus_video TINYINT(1) NULL DEFAULT -1 COMMENT '1-> Disponible, -1-> No Disponible',
    video VARCHAR(70) NOT NULL COMMENT 'nombre_video.mp3',
    nombre_temporada VARCHAR(70) NULL COMMENT 'Parte 1, ',
    video_temporada TINYINT(1) NULL COMMENT 'Temporada 1, Temporada 2, Temporada 3',
    capitulo_temporada TINYINT(1) NULL COMMENT 'Capitulo 1, Episodeo 1',
    descripcion_capitulo_temporada TEXT NULL COMMENT 'Descripción...',
    id_streaming INT(3) NOT NULL,
    FOREIGN KEY(id_streaming) REFERENCES streaming (id_streaming) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB;

INSERT INTO videos (id_video, estatus_video, video, id_streaming) VALUES 
    (NULL, 1, "pelicula_mufasa.mp4", 1);

INSERT INTO videos (id_video, estatus_video, video, nombre_temporada, video_temporada, capitulo_temporada, descripcion_capitulo_temporada, id_streaming) VALUES 
    (NULL, 1, "casa_de_papel_temporada_1_capitulo_1.mp4", "PARTE 1", 1, 1, "El Profesor recluta a una joven ladrona y a otros siete criminales para asaltar la Fábrica Nacional de Moneda y Timbre de España.", 2),
    (NULL, 1, "casa_de_papel_temporada_1_capitulo_2.mp4", "PARTE 1", 1, 2, "Raquel, la negociadora, establece un primer contacto con el Profesor. Una de las rehenes es clave para los planes de los ladrones.", 2),
    (NULL, 1, "casa_de_papel_temporada_1_capitulo_3.mp4", "PARTE 1", 1, 3, "La policía obtiene una imagen del rostro de uno de los ladrones. Raquel sospecha de un hombre que conoció en el bar.", 2),
    (NULL, 1, "casa_de_papel_temporada_1_capitulo_4.mp4", "PARTE 1", 1, 4, "Raquel tiene una crisis con su ex. Los rehenes se asustan al oír disparos. Los atracadores discuten entre ellos.", 2);

CREATE TABLE usuarios_planes (
    id_usuario_plan INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_registro_plan DATE NOT NULL COMMENT '',
    fecha_fin_plan DATE NOT NULL COMMENT '',
    id_usuario INT(11) NOT NULL,
    id_plan INT(11) NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_plan) REFERENCES planes (id_plan) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB;

INSERT INTO usuarios_planes (id_usuario_plan, fecha_registro_plan, fecha_fin_plan, id_usuario, id_plan) VALUES
    (NULL, "2025-03-16", "2025-03-23", 3, 1);

CREATE TABLE pagos (
    id_pago INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_registro_pago DATE NOT NULL COMMENT '',
    estatus_pago TINYINT(1) NULL DEFAULT -1 COMMENT '-1: Rechazado, 0: Pendiente, 1: Aceptado',
    monto_pago DECIMAL(10,2) NOT NULL COMMENT '',
    tarjeta_pago VARCHAR(32) NOT NULL COMMENT '',
    id_usuario INT(11) NOT NULL,
    id_plan INT(11) NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_plan) REFERENCES planes (id_plan) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB;

INSERT INTO pagos (id_pago, fecha_registro_pago, estatus_pago, monto_pago, tarjeta_pago, id_usuario, id_plan) VALUES
    (NULL, "2025-03-16", 1, 99.99, "XXXXXXXXXXXXXXXX", 3, 1);

CREATE TABLE alquileres (
    id_alquiler INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_inicio_alquiler DATE NOT NULL COMMENT '',
    fecha_fin_alquiler DATE NOT NULL COMMENT '',
    estatus_alquiler TINYINT(1) NULL DEFAULT -1 COMMENT '-1-> En proceso, 1-> Culminado',
    id_streaming INT(11) NOT NULL,
    id_usuario INT(11) NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_streaming) REFERENCES streaming (id_streaming) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB;

INSERT INTO alquileres (id_alquiler, fecha_inicio_alquiler, fecha_fin_alquiler, id_usuario, id_streaming) VALUES
    (NULL, "2025-03-16", "2025-03-21", 3, 1),
    (NULL, "2025-03-16", "2025-03-21", 3, 2);




