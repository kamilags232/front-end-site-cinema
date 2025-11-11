create database bd_cinema;

use bd_cinema;

create table tb_cliente
(cd_cliente int not null primary key,
cliente char(50),
email char (50),
cpf char(14));

create table tb_sala
(cd_sala int not null primary key,
sala int,
capacidade int,
tp_sala char(5));

create table tb_filme
(cd_filme int not null primary key,
filme char(50),
duração time,
classe_etária char(2),
tp_filme char(10));

create table tb_sessao
(cd_sessao int not null primary key,
sessao char(50),
data_hora datetime,
cd_filme int not null,
cd_sala int not null);

create table tb_venda
(nr_recibo int not null primary key,
dt_hr_venda datetime,
valor_total decimal(6,2),
cd_cliente int not null);

create table tb_ingresso
(cd_ingresso int not null primary key,
valor_ingresso decimal(4,2),
assento char(3),
tp_ingresso char(10),
cd_sessao int not null,
nr_recibo int not null);

create table tb_lanche
(cd_lanche int not null primary key,
lanche char(10),
valor_lanche decimal(5,2));

create table rl_venda_lanche
(nr_recibo int not null,
cd_lanche int not null,
quantidade int,
valor_parcial decimal(5,2));

ALTER TABLE tb_cliente 
MODIFY cd_cliente INT NOT NULL AUTO_INCREMENT;

ALTER TABLE tb_venda 
MODIFY nr_recibo INT NOT NULL AUTO_INCREMENT;

ALTER TABLE tb_ingresso 
MODIFY cd_ingresso INT NOT NULL AUTO_INCREMENT;

ALTER TABLE tb_sala
MODIFY cd_sala INT NOT NULL AUTO_INCREMENT;

ALTER TABLE tb_filme
MODIFY cd_filme INT NOT NULL AUTO_INCREMENT;

ALTER TABLE tb_sessao
MODIFY cd_sessao INT NOT NULL AUTO_INCREMENT;

ALTER TABLE tb_lanche
MODIFY cd_lanche INT NOT NULL AUTO_INCREMENT;

alter table tb_sessao
add constraint fk_filme foreign key (cd_filme)
references tb_filme (cd_filme);

alter table tb_sessao
add constraint fk_sala foreign key (cd_sala)
references tb_sala (cd_sala);

alter table tb_ingresso
add constraint fk_sessao foreign key (cd_sessao)
references tb_sessao (cd_sessao);

alter table tb_ingresso
add constraint fk_venda_ingresso foreign key (nr_recibo)
references tb_venda (nr_recibo);

alter table tb_venda
add constraint fk_cliente foreign key (cd_cliente)
references tb_cliente (cd_cliente);

alter table rl_venda_lanche
add constraint fk_venda foreign key (nr_recibo)
references tb_venda (nr_recibo);

alter table rl_venda_lanche
add constraint fk_lanche foreign key (cd_lanche)
references tb_lanche (cd_lanche);

INSERT INTO tb_filme (cd_filme, filme, duração, classe_etária, tp_filme)
VALUES (1, 'Vingadores: A Última Batalha', '03:02:00', '12', 'Ação'),
       (2, 'Interestelar', '02:49:00', '10', 'Ficção'),
       (3, 'Oppenheimer', '03:00:00', '16', 'Suspense'),
       (4, 'Duna 2', '02:46:00', '14', 'Ficção');

INSERT INTO tb_sala (sala, capacidade, tp_sala)
VALUES
(1, 100, '2D'),
(2, 120, '2D'),
(3, 110, '3D'),
(4, 130, '3D'),
(5, 90,  '2D'),
(6, 140, 'IMAX'),
(7, 80,  '2D'),
(8, 70,  'VIP');

INSERT INTO tb_sessao (sessao, data_hora, cd_filme, cd_sala)
VALUES ('Sessão 14h', '2025-01-20 14:00:00', 1, 1),
       ('Sessão 16h30', '2025-01-20 16:30:00', 1, 1),
       ('Sessão 19h', '2025-01-20 19:00:00', 1, 2),
       ('Sessão 21h30', '2025-01-20 21:30:00', 1, 2),
       ('Sessão 14h', '2025-01-20 14:00:00', 2, 3),
       ('Sessão 16h30', '2025-01-20 16:30:00', 2, 3),
       ('Sessão 19h', '2025-01-20 19:00:00', 2, 4),
       ('Sessão 21h30', '2025-01-20 21:30:00', 2, 4),
       ('Sessão 14h', '2025-01-20 14:00:00', 3, 5),
       ('Sessão 16h30', '2025-01-20 16:30:00', 3, 5),
       ('Sessão 19h', '2025-01-20 19:00:00', 3, 6),
       ('Sessão 21h30', '2025-01-20 21:30:00', 3, 6),
       ('Sessão 14h', '2025-01-20 14:00:00', 4, 7),
       ('Sessão 16h30', '2025-01-20 16:30:00', 4, 7),
       ('Sessão 19h', '2025-01-20 19:00:00', 4, 8),
       ('Sessão 21h30', '2025-01-20 21:30:00', 4, 8);

SELECT * FROM tb_cliente;
