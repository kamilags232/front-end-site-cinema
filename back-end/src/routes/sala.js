import { Router } from 'express'
import { prisma } from '../prisma.js'

const router = Router()

router.post('/', async (req, res) => {
    res.json(await prisma.tb_sala.create({ data: req.body }))
})

router.get('/', async (req, res) => {
    res.json(await prisma.tb_sala.findMany())
})

router.put('/:cd_sala', async (req, res) => {
    const id = Number(req.params.cd_sala)
    res.json(await prisma.tb_sala.update({
        where: { cd_sala: id },
        data: req.body
    }))
})

router.delete('/:cd_sala', async (req, res) => {
    const id = Number(req.params.cd_sala)
    await prisma.tb_sala.delete({ where: { cd_sala: id } })
    res.json({ message: "Sala deletada" })
})

export default router
