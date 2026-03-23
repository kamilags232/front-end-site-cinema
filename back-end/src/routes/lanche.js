import { Router } from 'express'
import { prisma } from '../prisma.js'

const router = Router()

// Criar lanche
router.post('/', async (req, res) => {
    const lanche = await prisma.tb_lanche.create({
        data: req.body
    })
    res.json(lanche)
})

// Listar lanches
router.get('/', async (req, res) => {
    const lanches = await prisma.tb_lanche.findMany()
    res.json(lanches)
})

// Editar lanche
router.put('/:cd_lanche', async (req, res) => {
    const id = Number(req.params.cd_lanche)

    const lanche = await prisma.tb_lanche.update({
        where: { cd_lanche: id },
        data: req.body
    })

    res.json(lanche)
})

// Deletar lanche
router.delete('/:cd_lanche', async (req, res) => {
    const id = Number(req.params.cd_lanche)

    await prisma.tb_lanche.delete({
        where: { cd_lanche: id }
    })

    res.json({ message: "Lanche deletado" })
})

export default router
