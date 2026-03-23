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

// ⭐ Recalcular total da venda
router.put('/recalcular/:nr_recibo', async (req, res) => {
    const nr = Number(req.params.nr_recibo)

    try {
        const ingressos = await prisma.tb_ingresso.findMany({
            where: { nr_recibo: nr }
        })

        const lanches = await prisma.rl_venda_lanche.findMany({
            where: { nr_recibo: nr }
        })

        const totalIngressos = ingressos.reduce(
            (soma, item) => soma + Number(item.valor_ingresso),
            0
        )

        const totalLanches = lanches.reduce(
            (soma, item) => soma + Number(item.valor_parcial),
            0
        )

        const valorTotal = totalIngressos + totalLanches

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

export default router
