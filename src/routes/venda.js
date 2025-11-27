import { Router } from 'express'
import { prisma } from '../prisma.js'

const router = Router()

// Criar venda
router.post('/', async (req, res) => {
    try {
        const venda = await prisma.tb_venda.create({
            data: req.body
        })
        res.json(venda)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Listar vendas
router.get('/', async (req, res) => {
    const vendas = await prisma.tb_venda.findMany()
    res.json(vendas)
})

// Editar venda
router.put('/:nr_recibo', async (req, res) => {
    const id = Number(req.params.nr_recibo)

    const venda = await prisma.tb_venda.update({
        where: { nr_recibo: id },
        data: req.body
    })

    res.json(venda)
})

// Deletar venda
router.delete('/:nr_recibo', async (req, res) => {
    const id = Number(req.params.nr_recibo)

    await prisma.tb_venda.delete({
        where: { nr_recibo: id }
    })

    res.json({ message: "Venda deletada" })
})


// ⭐ NOVO: Recalcular total da venda (ingressos + lanches)
router.put('/recalcular/:nr_recibo', async (req, res) => {
    const nr = Number(req.params.nr_recibo)

    try {
        // Buscar ingressos da venda
        const ingressos = await prisma.tb_ingresso.findMany({
            where: { nr_recibo: nr }
        })

        // Buscar lanches da venda
        const lanches = await prisma.rl_venda_lanche.findMany({
            where: { nr_recibo: nr }
        })

        // Somar ingressos
        const totalIngressos = ingressos.reduce((soma, item) =>
            soma + Number(item.valor_ingresso), 0
        )

        // Somar lanches
        const totalLanches = lanches.reduce((soma, item) =>
            soma + Number(item.valor_parcial), 0
        )

        // Total final
        const valorTotal = totalIngressos + totalLanches

        // Atualizar venda
        const vendaAtualizada = await prisma.tb_venda.update({
            where: { nr_recibo: nr },
            data: { valor_total: valorTotal }
        })

        res.json({
            mensagem: "Valor total atualizado!",
            ingressos: totalIngressos,
            lanches: totalLanches,
            total: valorTotal,
            venda: vendaAtualizada
        })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Criar venda
router.post('/', ...)

// Listar vendas
router.get('/', ...)

// Editar venda
router.put('/:nr_recibo', ...)

// Deletar venda
router.delete('/:nr_recibo', ...)

export default router
