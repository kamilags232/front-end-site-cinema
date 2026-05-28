package br.com.sgc.service;

import br.com.sgc.dto.CinemaAssentoDto;
import br.com.sgc.dto.CinemaIngressoDto;
import br.com.sgc.dto.CinemaSessaoDto;
import br.com.sgc.dto.CinemaVendaDto;
import br.com.sgc.dto.CinemaVendaLancheDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CinemaJdbcService {

    private final JdbcTemplate jdbcTemplate;

    public CinemaJdbcService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<CinemaSessaoDto> listarSessoes() {
        String sql = "SELECT cd_sessao, sessao, data_hora, cd_filme, cd_sala FROM tb_sessao";
        return jdbcTemplate.query(sql, this::mapSessao);
    }

    public List<CinemaAssentoDto> listarAssentosPorSessao(Long sessaoId) {
        String sql = "SELECT cd_assento, numero_assento, ocupado, cd_sessao FROM tb_assento WHERE cd_sessao = ?";
        return jdbcTemplate.query(sql, this::mapAssento, sessaoId);
    }

    public CinemaAssentoDto criarAssento(CinemaAssentoDto dto) {
        String sql = "INSERT INTO tb_assento (numero_assento, ocupado, cd_sessao) VALUES (?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, dto.getNumeroAssento());
            ps.setBoolean(2, Boolean.TRUE.equals(dto.getOcupado()));
            ps.setLong(3, dto.getCdSessao());
            return ps;
        }, keyHolder);
        dto.setCdAssento(keyHolder.getKey().longValue());
        return dto;
    }

    public CinemaAssentoDto atualizarAssento(Long id, CinemaAssentoDto dto) {
        String sql = "UPDATE tb_assento SET numero_assento = ?, ocupado = ?, cd_sessao = ? WHERE cd_assento = ?";
        jdbcTemplate.update(sql, dto.getNumeroAssento(), Boolean.TRUE.equals(dto.getOcupado()), dto.getCdSessao(), id);
        dto.setCdAssento(id);
        return dto;
    }

    public CinemaVendaDto criarVenda(CinemaVendaDto dto) {
        String sql = "INSERT INTO tb_venda (dt_hr_venda, valor_total, cd_cliente, tp_pagamento) VALUES (?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        LocalDateTime vendaHora = dto.getDtHrVenda() != null ? dto.getDtHrVenda() : LocalDateTime.now();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setTimestamp(1, Timestamp.valueOf(vendaHora));
            ps.setBigDecimal(2, dto.getValorTotal() != null ? dto.getValorTotal() : BigDecimal.ZERO);
            ps.setLong(3, dto.getCdCliente());
            ps.setString(4, dto.getTpPagamento());
            return ps;
        }, keyHolder);
        dto.setNrRecibo(keyHolder.getKey().longValue());
        dto.setDtHrVenda(vendaHora);
        return dto;
    }

    public CinemaVendaDto recalcularVenda(Long nrRecibo) {
        String sql = "SELECT COALESCE(SUM(valor_ingresso), 0) + COALESCE((SELECT SUM(valor_parcial) FROM rl_venda_lanche WHERE nr_recibo = ?), 0) AS total " +
                "FROM tb_ingresso WHERE nr_recibo = ?";
        BigDecimal total = jdbcTemplate.queryForObject(sql, BigDecimal.class, nrRecibo, nrRecibo);
        String updateSql = "UPDATE tb_venda SET valor_total = ? WHERE nr_recibo = ?";
        jdbcTemplate.update(updateSql, total, nrRecibo);
        return buscarVenda(nrRecibo);
    }

    public CinemaVendaDto buscarVenda(Long nrRecibo) {
        String sql = "SELECT nr_recibo, dt_hr_venda, valor_total, cd_cliente, tp_pagamento FROM tb_venda WHERE nr_recibo = ?";
        return jdbcTemplate.queryForObject(sql, this::mapVenda, nrRecibo);
    }

    public CinemaIngressoDto criarIngresso(CinemaIngressoDto dto) {
        String sql = "INSERT INTO tb_ingresso (valor_ingresso, tp_ingresso, cd_sessao, cd_assento, nr_recibo) VALUES (?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setBigDecimal(1, dto.getValorIngresso());
            ps.setString(2, dto.getTpIngresso());
            ps.setLong(3, dto.getCdSessao());
            ps.setLong(4, dto.getCdAssento());
            ps.setLong(5, dto.getNrRecibo());
            return ps;
        }, keyHolder);
        dto.setCdIngresso(keyHolder.getKey().longValue());
        return dto;
    }

    public CinemaVendaLancheDto criarVendaLanche(CinemaVendaLancheDto dto) {
        String sql = "INSERT INTO rl_venda_lanche (nr_recibo, cd_lanche, quantidade, valor_parcial) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, dto.getNrRecibo(), dto.getCdLanche(), dto.getQuantidade(), dto.getValorParcial());
        return dto;
    }

    public List<CinemaFilmeDto> listarFilmes() {
        String sql = "SELECT cd_filme, filme, duracao, classe_etaria, tp_filme FROM tb_filme";
        return jdbcTemplate.query(sql, this::mapFilme);
    }

    public List<CinemaSalaDto> listarSalas() {
        String sql = "SELECT cd_sala, sala, capacidade, tp_sala, dublagem FROM tb_sala";
        return jdbcTemplate.query(sql, this::mapSala);
    }

    private CinemaFilmeDto mapFilme(ResultSet rs, int rowNum) throws SQLException {
        CinemaFilmeDto dto = new CinemaFilmeDto();
        dto.setCdFilme(rs.getLong("cd_filme"));
        dto.setFilme(rs.getString("filme"));
        dto.setDuracao(rs.getTime("duracao").toLocalTime());
        dto.setClasseEtaria(rs.getString("classe_etaria"));
        dto.setTpFilme(rs.getString("tp_filme"));
        return dto;
    }

    private CinemaSalaDto mapSala(ResultSet rs, int rowNum) throws SQLException {
        CinemaSalaDto dto = new CinemaSalaDto();
        dto.setCdSala(rs.getLong("cd_sala"));
        dto.setSala(rs.getInt("sala"));
        dto.setCapacidade(rs.getInt("capacidade"));
        dto.setTpSala(rs.getString("tp_sala"));
        dto.setDublagem(rs.getString("dublagem"));
        return dto;
    }

    private CinemaAssentoDto mapAssento(ResultSet rs, int rowNum) throws SQLException {
        CinemaAssentoDto dto = new CinemaAssentoDto();
        dto.setCdAssento(rs.getLong("cd_assento"));
        dto.setNumeroAssento(rs.getString("numero_assento"));
        dto.setOcupado(rs.getBoolean("ocupado"));
        dto.setCdSessao(rs.getLong("cd_sessao"));
        return dto;
    }

    private CinemaSessaoDto mapSessao(ResultSet rs, int rowNum) throws SQLException {
        CinemaSessaoDto dto = new CinemaSessaoDto();
        dto.setCdSessao(rs.getLong("cd_sessao"));
        dto.setSessao(rs.getString("sessao"));
        Timestamp ts = rs.getTimestamp("data_hora");
        dto.setDataHora(ts != null ? ts.toLocalDateTime() : null);
        dto.setCdFilme(rs.getLong("cd_filme"));
        dto.setCdSala(rs.getLong("cd_sala"));
        return dto;
    }

    private CinemaVendaDto mapVenda(ResultSet rs, int rowNum) throws SQLException {
        CinemaVendaDto dto = new CinemaVendaDto();
        dto.setNrRecibo(rs.getLong("nr_recibo"));
        Timestamp ts = rs.getTimestamp("dt_hr_venda");
        dto.setDtHrVenda(ts != null ? ts.toLocalDateTime() : null);
        dto.setValorTotal(rs.getBigDecimal("valor_total"));
        dto.setCdCliente(rs.getLong("cd_cliente"));
        dto.setTpPagamento(rs.getString("tp_pagamento"));
        return dto;
    }
}
