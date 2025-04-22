import mongoose from "mongoose";

const ParteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: {
    type: String, enum: ["Autor", "Réu", "Advogado",
      "Juiz"], required: true
  },
  cpf_cnpj: { type: String, required: true }
});

const AudienciaSchema = new mongoose.Schema({
  data_hora: Date,
  local: String
});

const ProcessoSchema = new mongoose.Schema({
  numero_processo: { type: String, unique: true, required: true },
  status: {
    type: String, enum: ["Em andamento", "Concluído",
      "Arquivado"], required: true
  },
  partes: { type: [ParteSchema], required: true },
  audiencias: [AudienciaSchema]
});

export default mongoose.model('Processo', ProcessoSchema);