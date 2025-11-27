import { Router } from 'express'
import { prisma } from '../prisma.js'

const router = Router()

/* Criar assento */
router.post("/", async (req, res) => {
  try {
    const novoAssento = await prisma.tb_assento.create({
      data: {
        numero_assento: req.body.numero_assento,
        ocupado: req.body.ocupado ?? false,
        cd_sessao: req.body.cd_sessao
      },
    });

    res.status(201).json(novoAssento);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar assento", details: error.message });
  }
});

/* Listar todos os assentos */
router.get("/", async (req, res) => {
  try {
    const assentos = await prisma.tb_assento.findMany();
    res.status(200).json(assentos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* Listar assentos por sessão */
router.get("/sessao/:cd_sessao", async (req, res) => {
  const cd_sessao = parseInt(req.params.cd_sessao);

  try {
    const assentos = await prisma.tb_assento.findMany({
      where: { cd_sessao },
    });

    res.status(200).json(assentos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* Atualizar assento (ocupar/liberar/mudar número) */
router.put("/:cd_assento", async (req, res) => {
  const cd_assento = parseInt(req.params.cd_assento);

  try {
    const assentoAtualizado = await prisma.tb_assento.update({
      where: { cd_assento },
      data: {
        numero_assento: req.body.numero_assento,
        ocupado: req.body.ocupado,
        cd_sessao: req.body.cd_sessao
      },
    });

    res.status(200).json(assentoAtualizado);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar assento", details: error.message });
  }
});

/* Deletar assento */
router.delete("/:cd_assento", async (req, res) => {
  const cd_assento = parseInt(req.params.cd_assento);

  try {
    await prisma.tb_assento.delete({
      where: { cd_assento },
    });

    res.status(200).json({ message: "Assento deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar assento", details: error.message });
  }
});

export default router;
