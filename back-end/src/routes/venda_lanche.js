import { Router } from 'express'
import { prisma } from '../prisma.js'

const router = Router()

// Criar relação venda-lanche
router.post('/', async (req, res) => {
    const vendaLanche = await prisma.rl_venda_lanche.create({
        data: req.body
    })
    res.json(vendaLanche)
})

// Listar tudo
router.get('/', async (req, res) => {
    res.json(await prisma.rl_venda_lanche.findMany())
})

// Editar (precisa dos 2 IDs)
router.put('/:nr_recibo/:cd_lanche', async (req, res) => {
    const nr = Number(req.params.nr_recibo)
    const lanche = Number(req.params.cd_lanche)

    const vendaLanche = await prisma.rl_venda_lanche.update({
        where: {
            nr_recibo_cd_lanche: {
                nr_recibo: nr,
                cd_lanche: lanche
            }
        },
        data: req.body
    })

    res.json(vendaLanche)
})

// Deletar
router.delete('/:nr_recibo/:cd_lanche', async (req, res) => {
    const nr = Number(req.params.nr_recibo)
    const lanche = Number(req.params.cd_lanche)

    await prisma.rl_venda_lanche.delete({
        where: {
            nr_recibo_cd_lanche: {
                nr_recibo: nr,
                cd_lanche: lanche
            }
        }
    })

    res.json({ message: "Item removido da venda" })
})

export default router
