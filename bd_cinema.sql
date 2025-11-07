create database bd_cinema;

use bd_cinema;

create table tb_cliente
(cd_cliente int not null primary key,
cpf char(14),
cliente char(50),
telefone char(12),
email char (50));

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
valor_total decimal(4,2),
cd_cliente int not null);

create table tb_ingresso
(cd_ingresso int not null primary key,
valor_ingresso decimal(2,2),
assento char(3),
tp_ingresso char(10),
cd_sessao int not null,
nr_recibo int not null);

create table tb_lanche
(cd_lanche int not null primary key,
lanche char(10),
valor_lanche decimal(3,2));

create table rl_venda_lanche
(nr_recibo int not null,
cd_lanche int not null,
quantidade int,
valor_parcial decimal(3,2));

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