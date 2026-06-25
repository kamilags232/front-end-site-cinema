package br.com.sgc.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class CinemaDataSeeder implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public CinemaDataSeeder(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        seedFilmes();
        seedSalas();
        seedSessoes();
    }

    private void seedFilmes() {
        Integer total = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM tb_filme", Integer.class);
        if (total != null && total > 0) {
            return;
        }

        List<Object[]> filmes = List.of(
                new Object[]{"Vingadores: Ultimato", "03:01:00", "12", "Acao"},
                new Object[]{"The Batman", "02:56:00", "14", "Acao"},
                new Object[]{"Oppenheimer", "03:00:00", "16", "Drama"},
                new Object[]{"Avatar: O Caminho da Agua", "03:12:00", "12", "Aventura"},
                new Object[]{"Coringa", "02:02:00", "16", "Drama"},
                new Object[]{"Homem-Aranha no Aranhaverso", "01:57:00", "10", "Animacao"},
                new Object[]{"Frozen II", "01:43:00", "Livre", "Animacao"},
                new Object[]{"Barbie", "01:54:00", "12", "Comedia"}
        );

        filmes.forEach(filme -> jdbcTemplate.update(
                "INSERT INTO tb_filme (filme, duracao, classe_etaria, tp_filme) VALUES (?, ?, ?, ?)",
                filme
        ));
    }

    private void seedSalas() {
        Integer total = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM tb_sala", Integer.class);
        if (total != null && total > 0) {
            return;
        }

        List<Object[]> salas = List.of(
                new Object[]{1, 40, "2D", "dub"},
                new Object[]{2, 40, "2D", "leg"},
                new Object[]{3, 40, "3D", "dub"},
                new Object[]{4, 40, "3D", "leg"},
                new Object[]{5, 40, "IMAX", "dub"},
                new Object[]{6, 40, "IMAX", "leg"}
        );

        salas.forEach(sala -> jdbcTemplate.update(
                "INSERT INTO tb_sala (sala, capacidade, tp_sala, dublagem) VALUES (?, ?, ?, ?)",
                sala
        ));
    }

    private void seedSessoes() {
        Integer total = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM tb_sessao", Integer.class);
        if (total != null && total > 0) {
            return;
        }

        for (long filmeId = 1; filmeId <= 8; filmeId++) {
            for (long salaId = 1; salaId <= 6; salaId++) {
                LocalDateTime horario = LocalDateTime.now()
                        .withHour(13 + (int) salaId)
                        .withMinute(0)
                        .withSecond(0)
                        .withNano(0)
                        .plusDays(filmeId % 3);

                jdbcTemplate.update(
                        "INSERT INTO tb_sessao (sessao, data_hora, cd_filme, cd_sala) VALUES (?, ?, ?, ?)",
                        "Sessao " + filmeId + "-" + salaId,
                        horario,
                        filmeId,
                        salaId
                );
            }
        }
    }
}
