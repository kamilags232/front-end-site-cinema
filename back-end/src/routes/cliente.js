import { Router } from 'express'
import { prisma } from '../prisma.js'

const router = Router()

router.post('/', async (req, res) => {
    const cliente = await prisma.tb_cliente.create({
        data: req.body
    })
    res.json(cliente)
})

router.get('/', async (req, res) => {
    res.json(await prisma.tb_cliente.findMany())
})

router.put('/:cd_cliente', async (req, res) => {
    const id = Number(req.params.cd_cliente)

    const cliente = await prisma.tb_cliente.update({
        where: { cd_cliente: id },
        data: req.body
    })
    res.json(cliente)
})

router.delete('/:cd_cliente', async (req, res) => {
    const id = Number(req.params.cd_cliente)

    await prisma.tb_cliente.delete({
        where: { cd_cliente: id }
    })
    res.json({ message: "Cliente deletado" })
})

export default router
