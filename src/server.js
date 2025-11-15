import express from 'express'
import cors from 'cors'
import clienteRoutes from './routes/cliente.js'
import filmeRoutes from './routes/filme.js'
import salaRoutes from './routes/sala.js'
import sessaoRoutes from './routes/sessao.js'
import vendaRoutes from './routes/venda.js'
import ingressoRoutes from './routes/ingresso.js'
import lancheRoutes from './routes/lanche.js'
import vendaLancheRoutes from './routes/venda_lanche.js'
import assentoRoutes from './routes/assento.js';


const app = express()
app.use(cors())
app.use(express.json())

app.use('/cliente', clienteRoutes)
app.use('/filme', filmeRoutes)
app.use('/sala', salaRoutes)
app.use('/sessao', sessaoRoutes)
app.use('/venda', vendaRoutes)
app.use('/ingresso', ingressoRoutes)
app.use('/lanche', lancheRoutes)
app.use('/venda-lanche', vendaLancheRoutes)
app.use('/assento', assentoRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"))
