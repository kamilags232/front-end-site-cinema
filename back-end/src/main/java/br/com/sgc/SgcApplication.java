package br.com.sgc;

import br.com.sgc.domain.model.Cliente;
import br.com.sgc.domain.model.Produto;
import br.com.sgc.dto.ItemVendaDTO;
import br.com.sgc.dto.VendaDTO;
import br.com.sgc.service.ClienteService;
import br.com.sgc.service.ProdutoService;
import br.com.sgc.service.VendaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class SgcApplication implements CommandLineRunner {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private VendaService vendaService;

    public static void main(String[] args) {
        SpringApplication.run(SgcApplication.class, args);
    }

    @Override
    public void run(String... args) {

        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n===== MENU =====");
            System.out.println("1. Listar clientes");
            System.out.println("2. Criar cliente");
            System.out.println("3. Listar produtos");
            System.out.println("4. Criar produto");
            System.out.println("5. Criar venda");
            System.out.println("6. Sair");
            System.out.print("Escolha: ");

            int opcao = scanner.nextInt();
            scanner.nextLine();

            switch (opcao) {

                case 1:
                    clienteService.listar()
                            .forEach(c -> System.out.println(c.getId() + " - " + c.getNome()));
                    break;

                case 2:
                    Cliente cliente = new Cliente();

                    System.out.print("Nome: ");
                    cliente.setNome(scanner.nextLine());

                    System.out.print("Email: ");
                    cliente.setEmail(scanner.nextLine());

                    System.out.print("CPF: ");
                    cliente.setCpf(scanner.nextLine());

                    System.out.print("Telefone: ");
                    cliente.setTelefone(scanner.nextLine());

                    System.out.print("Endereço: ");
                    cliente.setEndereco(scanner.nextLine());

                    clienteService.criar(cliente);
                    System.out.println("Cliente criado!");
                    break;

                case 3:
                    produtoService.listar()
                            .forEach(p -> System.out.println(p.getId() + " - " + p.getNome() + " - " + p.getPreco()));
                    break;

                case 4:
                    Produto produto = new Produto();

                    System.out.print("Nome: ");
                    produto.setNome(scanner.nextLine());

                    System.out.print("Preço: ");
                    produto.setPreco(scanner.nextBigDecimal());

                    System.out.print("Estoque: ");
                    produto.setEstoque(scanner.nextInt());
                    scanner.nextLine();

                    produto.setTipoProduto("EXTRA");

                    produtoService.criar(produto);
                    System.out.println("Produto criado!");
                    break;

                case 5:
                    VendaDTO vendaDTO = new VendaDTO();

                    System.out.print("ID do cliente: ");
                    vendaDTO.setClienteId(scanner.nextLong());

                    System.out.print("ID do usuario: ");
                    vendaDTO.setUsuarioId(scanner.nextLong());
                    scanner.nextLine();

                    vendaDTO.setTipoPagamento("PIX");

                    List<ItemVendaDTO> itens = new ArrayList<>();

                    while (true) {
                        ItemVendaDTO item = new ItemVendaDTO();

                        System.out.print("ID do produto: ");
                        item.setProdutoId(scanner.nextLong());

                        System.out.print("Quantidade: ");
                        item.setQuantidade(scanner.nextInt());
                        scanner.nextLine();

                        itens.add(item);

                        System.out.print("Adicionar mais itens? (s/n): ");
                        String resp = scanner.nextLine();

                        if (!resp.equalsIgnoreCase("s")) break;
                    }

                    vendaDTO.setItens(itens);

                    vendaService.criar(vendaDTO);

                    System.out.println("Venda realizada!");
                    break;

                case 6:
                    System.exit(0);
                    break;

                default:
                    System.out.println("Opção inválida");
            }
        }
    }
}