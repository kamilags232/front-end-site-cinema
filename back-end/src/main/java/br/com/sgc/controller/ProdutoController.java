package br.com.sgc.controller;

import br.com.sgc.domain.model.Produto;
import br.com.sgc.dto.ProdutoDTO;
import br.com.sgc.service.ProdutoService;
import br.com.sgc.util.MapperUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody @Valid ProdutoDTO dto) {
        Produto produto = MapperUtil.toEntity(dto);
        return ResponseEntity.ok(service.criar(produto));
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id,
                                             @RequestBody ProdutoDTO dto) {
        Produto produto = MapperUtil.toEntity(dto);
        return ResponseEntity.ok(service.atualizar(id, produto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}