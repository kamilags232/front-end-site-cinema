import { Router } from 'express'
import { prisma } from '../prisma.js'

const router = Router()

router.post('/', async (req, res) => {
    res.json(await prisma.tb_sessao.create({ data: req.body }))
})

router.get('/', async (req, res) => {
    res.json(await prisma.tb_sessao.findMany())
})

router.put('/:cd_sessao', async (req, res) => {
    const id = Number(req.params.cd_sessao)
    res.json(await prisma.tb_sessao.update({
        where: { cd_sessao: id },
        data: req.body
    }))
})

router.delete('/:cd_sessao', async (req, res) => {
    const id = Number(req.params.cd_sessao)
    await prisma.tb_sessao.delete({ where: { cd_sessao: id } })
    res.json({ message: "Sessão deletada" })
})

export default router
