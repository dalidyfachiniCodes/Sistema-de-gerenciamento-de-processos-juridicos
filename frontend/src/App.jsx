import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// URL base da API para operações de processos
const API_URL = 'http://localhost:3001/processos';

const App = () => {
  // Estados para gerenciar os dados do formulário e da aplicação
  const [processos, setProcessos] = useState([]); // Lista de processos
  const [numeroProcesso, setNumeroProcesso] = useState(''); // Número do processo
  const [status, setStatus] = useState('Em andamento'); // Status do processo
  const [partes, setPartes] = useState([{ nome: '', tipo: '', cpf_cnpj: '' }]); // Partes envolvidas
  const [audiencias, setAudiencias] = useState([{ data_hora: '', local: '' }]); // Audiências
  const [editando, setEditando] = useState(null); // ID do processo em edição
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca

  // Carrega os processos quando o componente é inicializado
  useEffect(() => {
    carregarProcessos();
  }, []);

  // Busca a lista de processos na API
  const carregarProcessos = async () => {
    try {
      const response = await axios.get(API_URL);
      setProcessos(response.data);
    } catch (error) {
      console.error('Erro ao carregar processos:', error);
      alert('Falha ao carregar processos');
    }
  };

  // Manipula o envio do formulário (criação ou atualização de processo)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosProcesso = {
      numero_processo: numeroProcesso,
      status,
      partes,
      audiencias
    };

    try {
      // Verifica se está editando um processo existente ou criando um novo
      if (editando) {
        await axios.put(`${API_URL}/${editando}`, dadosProcesso);
      } else {
        await axios.post(API_URL, dadosProcesso);
      }

      // Recarrega a lista de processos e limpa o formulário
      carregarProcessos();
      limparFormulario();
    } catch (error) {
      console.error('Erro ao salvar processo:', error);
      alert('Falha ao salvar processo');
    }
  };

  // Limpa todos os campos do formulário
  const limparFormulario = () => {
    setNumeroProcesso('');
    setStatus('Em andamento');
    setPartes([{ nome: '', tipo: '', cpf_cnpj: '' }]);
    setAudiencias([{ data_hora: '', local: '' }]);
    setEditando(null);
  };

  // Exclui um processo específico após confirmação
  const excluirProcesso = async (id) => {
    if (window.confirm('Confirma exclusão do processo?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        carregarProcessos();
      } catch (error) {
        console.error('Erro ao excluir processo:', error);
        alert('Falha ao excluir processo');
      }
    }
  };

  // Prepara um processo para edição, preenchendo o formulário com seus dados
  const editarProcesso = (processo) => {
    setNumeroProcesso(processo.numero_processo);
    setStatus(processo.status);
    setPartes(processo.partes);
    setAudiencias(processo.audiencias);
    setEditando(processo._id);
  };

  // Atualiza o termo de busca
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtra processos baseado no número do processo
  const filteredProcessos = processos.filter(processo =>
    processo.numero_processo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Sistema de Processos</h1>

      {/* Formulário para cadastro e edição de processos */}
      <form onSubmit={handleSubmit}>
        {/* Campo para número do processo */}
        <input
          type="text"
          placeholder="Número do Processo"
          value={numeroProcesso}
          onChange={(e) => setNumeroProcesso(e.target.value)}
          required
        />

        {/* Seleção de status do processo */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
          <option value="Arquivado">Arquivado</option>
        </select>

        {/* Seção para adicionar partes do processo */}
        <h2>Partes</h2>
        {partes.map((parte, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Nome"
              value={parte.nome}
              onChange={(e) => {
                const novasPartes = [...partes];
                novasPartes[index].nome = e.target.value;
                setPartes(novasPartes);
              }}
              required
            />
            <select
              value={parte.tipo}
              onChange={(e) => {
                const novasPartes = [...partes];
                novasPartes[index].tipo = e.target.value;
                setPartes(novasPartes);
              }}
              required
            >
              <option value="">Selecione o Tipo</option>
              <option value="Autor">Autor</option>
              <option value="Réu">Réu</option>
              <option value="Advogado">Advogado</option>
              <option value="Juiz">Juiz</option>
            </select>
            <input
              type="text"
              placeholder="CPF/CNPJ"
              value={parte.cpf_cnpj}
              onChange={(e) => {
                const novasPartes = [...partes];
                novasPartes[index].cpf_cnpj = e.target.value;
                setPartes(novasPartes);
              }}
              required
            />
            {/* Botão para remover parte, se houver mais de uma */}
            {partes.length > 1 && (
              <button type="button" onClick={() => setPartes(partes.filter((_, i) => i !== index))}>
                Remover
              </button>
            )}
          </div>
        ))}
        {/* Botão para adicionar nova parte */}
        <button type="button" onClick={() => setPartes([...partes, { nome: '', tipo: '', cpf_cnpj: '' }])}>
          Adicionar Parte
        </button>

        {/* Seção para adicionar audiências */}
        <h2>Audiências</h2>
        {audiencias.map((audiencia, index) => (
          <div key={index}>
            <input
              type="datetime-local"
              value={audiencia.data_hora}
              onChange={(e) => {
                const novasAudiencias = [...audiencias];
                novasAudiencias[index].data_hora = e.target.value;
                setAudiencias(novasAudiencias);
              }}
              required
            />
            <input
              type="text"
              placeholder="Local"
              value={audiencia.local}
              onChange={(e) => {
                const novasAudiencias = [...audiencias];
                novasAudiencias[index].local = e.target.value;
                setAudiencias(novasAudiencias);
              }}
              required
            />
            {/* Botão para remover audiência, se houver mais de uma */}
            {audiencias.length > 1 && (
              <button type="button" onClick={() => setAudiencias(audiencias.filter((_, i) => i !== index))}>
                Remover
              </button>
            )}
          </div>
        ))}
        {/* Botão para adicionar nova audiência */}
        <button type="button" onClick={() => setAudiencias([...audiencias, { data_hora: '', local: '' }])}>
          Adicionar Audiência
        </button>

        {/* Botão de submissão do formulário */}
        <button type="submit">{editando ? 'Atualizar' : 'Salvar'} Processo</button>
      </form>

      {/* Barra de pesquisa de processos */}
      <input
        type="text"
        placeholder="Buscar Processo"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* Listagem dos processos cadastrados */}
      <h2>Processos Cadastrados</h2>
      {filteredProcessos.map((processo) => (
        <div className="processo" key={processo._id}>
          <p>Número: {processo.numero_processo}</p>
          <p>Status: {processo.status}</p>

          <h3>Partes</h3>
          {processo.partes.map((parte, index) => (
            <p key={index}>
              {parte.tipo}: {parte.nome} (CPF/CNPJ: {parte.cpf_cnpj})
            </p>
          ))}

          <h3>Audiências</h3>
          {processo.audiencias.map((audiencia, index) => (
            <p key={index}>
              Data: {new Date(audiencia.data_hora).toLocaleString()} - Local: {audiencia.local}
            </p>
          ))}

          {/* Botões de edição e exclusão */}
          <button onClick={() => editarProcesso(processo)}>Editar</button>
          <button onClick={() => excluirProcesso(processo._id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
};

export default App;