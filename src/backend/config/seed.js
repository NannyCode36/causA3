const mongoose = require('mongoose');
const Analise8D = require('../models/Analise8D');
const ProjetoA3 = require('../models/ProjetoA3');
const PlanoAcao = require('../models/PlanoAcao');

const seedDatabase = async () => {
  try {
    // Verificar se já existem dados
    const analisesExistentes = await Analise8D.countDocuments();
    if (analisesExistentes > 0) {
      console.log('📊 Dados de seed já existem. Pulando seed...');
      return;
    }

    console.log('🌱 Iniciando seed de dados de teste...');

    // Criar análise 8D de exemplo
    const analise8D = new Analise8D({
      titulo: 'Análise 8D - Defeito em Produto Final',
      descricao:
        'Análise de causa raiz para defeito identificado em produto final durante inspeção de qualidade.',
      responsavel: 'João Silva',
      status: 'em_andamento',

      d1: {
        membros: [
          {
            nome: 'João Silva',
            funcao: 'Líder da Análise',
            responsabilidade: 'Coordenação geral',
          },
          {
            nome: 'Maria Santos',
            funcao: 'Especialista em Qualidade',
            responsabilidade: 'Análise técnica',
          },
          {
            nome: 'Carlos Oliveira',
            funcao: 'Operador',
            responsabilidade: 'Informações operacionais',
          },
        ],
        dataReuniao: new Date('2024-01-15'),
        observacoes:
          'Time formado com representantes de qualidade, produção e engenharia.',
      },

      d2: {
        descricaoProblema:
          'Produto final apresenta rachaduras na superfície após processo de pintura.',
        quandoOcorreu: new Date('2024-01-10'),
        ondeOcorreu: 'Linha de produção - Estação de pintura',
        quemIdentificou: 'Controle de Qualidade',
        impacto: {
          financeiro: 15000,
          operacional: 'Paralisação de 2 horas diárias',
          qualidade: 'Rejeição de 15% dos produtos',
          outros: 'Perda de confiança do cliente',
        },
      },

      d3: {
        acoes: [
          {
            descricao: 'Isolar produtos defeituosos na área de quarentena',
            responsavel: 'Maria Santos',
            prazo: new Date('2024-01-12'),
            status: 'concluida',
            dataConclusao: new Date('2024-01-12'),
            observacoes: '100 unidades isoladas com sucesso.',
          },
          {
            descricao: 'Inspecionar 100% dos produtos em estoque',
            responsavel: 'Carlos Oliveira',
            prazo: new Date('2024-01-14'),
            status: 'concluida',
            dataConclusao: new Date('2024-01-13'),
            observacoes: 'Encontrados 25 produtos com defeito similar.',
          },
        ],
        eficacia: 'alta',
      },

      d4: {
        ferramentas: [
          {
            nome: 'Diagrama de Ishikawa',
            aplicacao: 'Identificação de causas potenciais',
            resultados:
              'Isoladas 3 causas principais: material, processo e equipamento.',
          },
          {
            nome: '5 Porquês',
            aplicacao: 'Análise de causa raiz',
            resultados: 'Causa raiz: Temperatura inadequada no forno de cura.',
          },
        ],
        causaRaiz:
          'Temperatura do forno de cura 20°C abaixo do especificado devido a falha no termostato.',
        fatoresContribuintes: [
          'Manutenção preventiva inadequada do equipamento',
          'Falta de calibração regular dos instrumentos',
          'Ausência de alarmes de temperatura',
        ],
        evidencia:
          'Registros do SCADA mostram temperatura média de 160°C vs. 180°C especificados.',
      },

      d5: {
        acoes: [
          {
            descricao: 'Substituir termostato do forno de cura',
            responsavel: 'João Silva',
            prazo: new Date('2024-01-20'),
            recursosNecessarios: 'Termostato novo + técnico de manutenção',
            custoEstimado: 2000,
            status: 'concluida',
            dataConclusao: new Date('2024-01-18'),
            observacoes: 'Equipamento substituído e calibrado.',
          },
          {
            descricao: 'Implementar sistema de alarme de temperatura',
            responsavel: 'Maria Santos',
            prazo: new Date('2024-01-25'),
            recursosNecessarios: 'Sensores e software SCADA',
            custoEstimado: 5000,
            status: 'em_andamento',
            observacoes: 'Sistema em desenvolvimento.',
          },
        ],
      },

      d6: {
        planoImplementacao:
          'Implementação gradual iniciando pela linha crítica.',
        cronograma: [
          {
            atividade: 'Instalação do novo termostato',
            responsavel: 'João Silva',
            prazo: new Date('2024-01-20'),
            status: 'concluida',
          },
          {
            atividade: 'Testes de validação',
            responsavel: 'Maria Santos',
            prazo: new Date('2024-01-22'),
            status: 'em_andamento',
          },
        ],
        testesValidacao: [
          {
            tipo: 'Teste de temperatura',
            descricao: 'Verificação de estabilidade térmica por 8 horas',
            resultado: 'Temperatura mantida em ±2°C da especificação',
            data: new Date('2024-01-22'),
          },
        ],
        eficaciaImplementacao: 'alta',
      },

      d7: {
        acoes: [
          {
            descricao:
              'Criar procedimento de calibração mensal dos termostatos',
            aplicacao: 'Todas as linhas de produção',
            responsavel: 'Carlos Oliveira',
            prazo: new Date('2024-02-01'),
            status: 'pendente',
          },
          {
            descricao:
              'Treinamento da equipe sobre monitoramento de temperatura',
            aplicacao: 'Operadores e técnicos de manutenção',
            responsavel: 'Maria Santos',
            prazo: new Date('2024-02-15'),
            status: 'pendente',
          },
        ],
        padronizacao:
          'Incluir no manual de procedimentos de manutenção preventiva.',
      },

      d8: {
        reconhecimentos: [
          {
            pessoa: 'Carlos Oliveira',
            contribuicao: 'Identificação rápida do problema na linha',
            reconhecimento: 'Certificado de reconhecimento',
          },
          {
            pessoa: 'Maria Santos',
            contribuicao: 'Análise técnica detalhada da causa raiz',
            reconhecimento: 'Prêmio de qualidade do mês',
          },
        ],
        liçõesAprendidas: [
          'Importância da manutenção preventiva regular',
          'Necessidade de sistemas de monitoramento em tempo real',
          'Valor da análise estruturada para solução de problemas',
        ],
        dataEncerramento: new Date('2024-01-25'),
      },
    });

    await analise8D.save();
    console.log('✅ Análise 8D de exemplo criada');

    // Criar projeto A3 baseado na análise 8D
    const projetoA3 = new ProjetoA3({
      titulo: 'Projeto A3 - Melhoria no Controle de Temperatura',
      descricao:
        'Projeto de melhoria para implementar controle térmico robusto e prevenir defeitos por temperatura inadequada.',
      responsavel: 'João Silva',
      status: 'execucao',
      analise8DOrigem: analise8D._id,

      contexto: {
        problema:
          'Defeitos recorrentes por temperatura inadequada no processo de pintura.',
        impactoAtual: 'Perda de R$ 15.000/mês e 15% de rejeição.',
        objetivoMelhoria:
          'Eliminar defeitos por temperatura e reduzir rejeição para <1%.',
        escopo: 'Linhas de produção de pintura - 3 fornos.',
        stakeholders: [
          {
            nome: 'João Silva',
            interesse: 'Sucesso do projeto',
            influencia: 'alta',
          },
          {
            nome: 'Maria Santos',
            interesse: 'Qualidade do produto',
            influencia: 'alta',
          },
          {
            nome: 'Diretor Industrial',
            interesse: 'ROI do investimento',
            influencia: 'alta',
          },
        ],
      },

      estadoAtual: {
        descricaoSituacao:
          'Controle manual de temperatura com falhas frequentes.',
        metricasAtuais: [
          {
            nome: 'Taxa de rejeição',
            valor: 15,
            unidade: '%',
            data: new Date('2024-01-01'),
          },
          {
            nome: 'Perdas financeiras',
            valor: 15000,
            unidade: 'R$',
            data: new Date('2024-01-01'),
          },
        ],
        pontosFortes: ['Equipe qualificada', 'Equipamentos modernos'],
        pontosFracos: [
          'Controle manual',
          'Falta de alarmes',
          'Manutenção inadequada',
        ],
      },

      meta: {
        descricao:
          'Sistema automatizado de controle térmico com alarmes e manutenção preventiva.',
        metricasAlvo: [
          {
            nome: 'Taxa de rejeição',
            valorAlvo: 1,
            unidade: '%',
            prazo: new Date('2024-03-01'),
          },
          {
            nome: 'Perdas financeiras',
            valorAlvo: 1500,
            unidade: 'R$',
            prazo: new Date('2024-03-01'),
          },
        ],
        criteriosSucesso: [
          'Temperatura mantida em ±2°C da especificação',
          'Alarmes funcionais 100% do tempo',
          'Manutenção preventiva implementada',
        ],
        beneficiosEsperados: {
          financeiro: 13500, // Economia mensal
          operacional: 'Redução de 2h/dia de parada',
          qualidade: 'Melhoria significativa na percepção do cliente',
          outros: 'Redução de retrabalho e aumento de produtividade',
        },
      },

      analise: {
        causaRaiz:
          'Temperatura do forno de cura 20°C abaixo do especificado devido a falha no termostato.',
        fatoresContribuintes: [
          'Manutenção preventiva inadequada',
          'Falta de calibração regular',
          'Ausência de alarmes de temperatura',
        ],
        oportunidadesMelhoria: [
          {
            oportunidade: 'Automatização do controle térmico',
            impacto: 'Eliminação de erros humanos',
            prioridade: 'alta',
          },
          {
            oportunidade: 'Sistema de alarmes em tempo real',
            impacto: 'Detecção imediata de desvios',
            prioridade: 'alta',
          },
        ],
        ferramentasAnalise: ['8D', 'Análise FMEA', 'Brainstorming'],
      },

      planoAcao: [
        {
          atividade: 'Instalar sistema SCADA de controle térmico',
          descricao: 'Implementar software de supervisão e controle',
          responsavel: 'João Silva',
          prazo: new Date('2024-02-15'),
          recursos: 'Software SCADA + treinamento',
          custoEstimado: 15000,
          status: 'em_andamento',
          progresso: 60,
          dataInicio: new Date('2024-01-20'),
        },
        {
          atividade: 'Instalar sensores de temperatura redundantes',
          descricao: 'Adicionar sensores backup em cada forno',
          responsavel: 'Maria Santos',
          prazo: new Date('2024-02-10'),
          recursos: 'Sensores PT100 + cabos',
          custoEstimado: 3000,
          status: 'concluida',
          progresso: 100,
          dataInicio: new Date('2024-01-25'),
          dataConclusao: new Date('2024-02-08'),
        },
        {
          atividade: 'Criar programa de manutenção preventiva',
          descricao: 'Elaborar checklist e cronograma de manutenção',
          responsavel: 'Carlos Oliveira',
          prazo: new Date('2024-02-20'),
          recursos: 'Tempo da equipe de manutenção',
          custoEstimado: 0,
          status: 'pendente',
          progresso: 0,
        },
      ],

      resultado: {
        metricasAlcancadas: [
          {
            nome: 'Taxa de rejeição',
            valorAlcancado: 3,
            valorAlvo: 1,
            unidade: '%',
            data: new Date('2024-02-15'),
            status: 'parcial',
          },
        ],
        liçõesAprendidas: [
          'Importância da redundância de sensores',
          'Necessidade de treinamento da equipe',
          'Valor do monitoramento contínuo',
        ],
        eficaciaGeral: 'media',
      },

      padronizacao: {
        procedimentosPadronizados: [
          {
            nome: 'Manutenção Preventiva - Fornos',
            descricao: 'Procedimento mensal de calibração e verificação',
            documento: '/docs/manutencao-fornos-v1.pdf',
          },
        ],
        treinamentos: [
          {
            tema: 'Controle de Temperatura Automatizado',
            publico: 'Operadores e técnicos',
            data: new Date('2024-02-20'),
            instrutor: 'João Silva',
          },
        ],
        controles: [
          {
            controle: 'Verificação diária de alarmes',
            frequencia: 'Diária',
            responsavel: 'Operador de turno',
          },
          {
            controle: 'Calibração mensal de sensores',
            frequencia: 'Mensal',
            responsavel: 'Técnico de manutenção',
          },
        ],
      },

      dataInicio: new Date('2024-01-20'),
      dataConclusaoPlanejada: new Date('2024-03-01'),
      prioridade: 'alta',
      custoTotal: 18000,
      orcamento: 20000,
    });

    await projetoA3.save();
    console.log('✅ Projeto A3 de exemplo criado');

    // Atualizar referência no 8D
    analise8D.projetoA3Gerado = projetoA3._id;
    await analise8D.save();

    // Criar alguns planos de ação independentes
    const planosAcao = [
      {
        documentoPai: analise8D._id,
        tipoDocumento: 'Analise8D',
        titulo: 'Ação de Contenção - Inspeção Visual',
        descricao: 'Implementar inspeção visual adicional durante o processo',
        categoria: 'contencao',
        responsavel: 'Carlos Oliveira',
        prazo: new Date('2024-01-16'),
        prioridade: 'alta',
        recursosNecessarios: ['Lupa de aumento', 'Iluminação adicional'],
        custoEstimado: 500,
        status: 'concluida',
        dataConclusao: new Date('2024-01-15'),
        resultado: 'Redução de 50% nos defeitos detectados posteriormente',
        eficacia: 'alta',
      },
      {
        documentoPai: projetoA3._id,
        tipoDocumento: 'ProjetoA3',
        titulo: 'Ação Corretiva - Calibração Automática',
        descricao: 'Implementar sistema de auto-calibração dos sensores',
        categoria: 'corretiva',
        responsavel: 'Maria Santos',
        prazo: new Date('2024-02-28'),
        prioridade: 'media',
        recursosNecessarios: [
          'Software de calibração',
          'Técnico especializado',
        ],
        custoEstimado: 2500,
        status: 'pendente',
        progresso: 0,
      },
    ];

    for (const plano of planosAcao) {
      await new PlanoAcao(plano).save();
    }
    console.log('✅ Planos de ação de exemplo criados');

    console.log('🎉 Seed de dados concluído com sucesso!');
    console.log('📊 Dados criados:');
    console.log('   - 1 Análise 8D');
    console.log('   - 1 Projeto A3');
    console.log('   - 2 Planos de Ação');
  } catch (error) {
    console.error('❌ Erro durante seed de dados:', error);
  }
};

module.exports = seedDatabase;
