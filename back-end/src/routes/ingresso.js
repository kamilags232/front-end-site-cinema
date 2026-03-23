import { Router } from 'express'
import { prisma } from '../prisma.js'

const router = Router()

// Criar ingresso
router.post('/', async (req, res) => {
    const ingresso = await prisma.tb_ingresso.create({
        data: req.body
    })
    res.json(ingresso)
})

// Listar ingressos
router.get('/', async (req, res) => {
    const ingressos = await prisma.tb_ingresso.findMany()
    res.json(ingressos)
})

// Editar ingresso
router.put('/:cd_ingresso', async (req, res) => {
    const id = Number(req.params.cd_ingresso)

    const ingresso = await prisma.tb_ingresso.update({
        where: { cd_ingresso: id },
        data: req.body
    })

    res.json(ingresso)
})

// Deletar ingresso
router.delete('/:cd_ingresso', async (req, res) => {
    const id = Number(req.params.cd_ingresso)

    await prisma.tb_ingresso.delete({
        where: { cd_ingresso: id }
    })

    res.json({ message: "Ingresso deletado" })
})

export default router
