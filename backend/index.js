import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import Processo from './models/processos.js'



const app = express()

app.use(express.json())
app.use(cors())


//Rotas
app.get('/processos', async function (req, res) {
    try{
        const processos = await Processo.find()
        res.json(processos)
    }catch(error){
        res.status(500).json({error : "Erro ao buscar processos"})
    }
    
})


app.post('/processos', async function (req, res) {
    try {
      const { numero_processo, status, partes, audiencias } = req.body;
  

  
      if (!numero_processo || !status || !partes || partes.length === 0) {
        return res.status(400).json({ error: "Campos obrigatórios faltando: numero_processo, status, ou partes." });
      }
  
      const processo = { numero_processo, status, partes, audiencias };
      const newProcesso = await Processo.create(processo);
      res.status(201).json(newProcesso);
    } catch (error) {
      console.error('Erro ao criar processo', error);
      res.status(400).json({ error: "Erro ao criar Processo" });
    }
  });
  
  


app.put('/processos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        const processoAtualizado = await Processo.findByIdAndUpdate(id, dadosAtualizados, { new: true });

        if (!processoAtualizado) {
            return res.status(404).json({ error: "Processo não encontrado" });
        }

        res.json(processoAtualizado);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar processo" });
    }
});


app.delete('/processos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const processoRemovido = await Processo.findByIdAndDelete(id);

        if (!processoRemovido) {
            return res.status(404).json({ error: "Processo não encontrado" });
        }

        res.json({ message: "Processo removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover processo" });
    }
});



//Conectando ao bando de dados

mongoose.connect('mongodb+srv://dalidyfachini:dalidy01@users.y7nsx.mongodb.net/?retryWrites=true&w=majority&appName=Users').then(() => console.log('banco de dados conectado')).catch(() => console.log("Deu Ruim"))

app.listen(3001)