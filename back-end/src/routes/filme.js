import { Router } from 'express'
import { prisma } from '../prisma.js'

const router = Router()

// Converte HH:MM:SS para Date
function parseTime(timeString) {
    const [h, m, s] = timeString.split(":");
    return new Date(`1970-01-01T${h}:${m}:${s}Z`);
}

// Criar filme
router.post('/', async (req, res) => {
    try {
        const data = {
            filme: req.body.filme,
            duracao: parseTime(req.body.duracao),
            classe_etaria: req.body.classe_etaria,
            tp_filme: req.body.tp_filme
        };

        const filme = await prisma.tb_filme.create({ data });
        res.status(201).json(filme);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar filmes
router.get('/', async (req, res) => {
    try {
        const filmes = await prisma.tb_filme.findMany();
        res.json(filmes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar filme
router.put('/:cd_filme', async (req, res) => {
    try {
        const id = Number(req.params.cd_filme);

        const data = {
            filme: req.body.filme,
            duracao: parseTime(req.body.duracao),
            classe_etaria: req.body.classe_etaria,
            tp_filme: req.body.tp_filme
        };

        const filme = await prisma.tb_filme.update({
            where: { cd_filme: id },
            data
        });

        res.json(filme);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar filme
router.delete('/:cd_filme', async (req, res) => {
    try {
        const id = Number(req.params.cd_filme);
        await prisma.tb_filme.delete({ where: { cd_filme: id } });
        res.json({ message: "Filme deletado com sucesso" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
