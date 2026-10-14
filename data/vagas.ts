export type Vaga = {
  id: string;
  titulo: string;
  empresa: string;
  empresaSlug: string;
  area: string;
  senioridade: string;
  local: string;
  aceitaIniciante: boolean;
  descricao: string;
};

export const vagas: Vaga[] = [
  {
    "id": "1",
    "titulo": "Pessoa Desenvolvedora Front-end Junior",
    "empresa": "Aurora Tech",
    "empresaSlug": "aurora-tech",
    "area": "Front-end",
    "senioridade": "Junior",
    "local": "Remoto",
    "aceitaIniciante": true,
    "descricao": "Voce vai desenvolver interfaces em React e Next.js ao lado de uma equipe de produto que trabalha com revisao de codigo e entregas semanais. A rotina inclui transformar prototipos em componentes acessiveis, corrigir problemas de usabilidade e conversar com design e backend. Procuramos fundamentos de HTML, CSS e JavaScript, curiosidade para aprender e abertura para pedir ajuda. Experiencia profissional anterior nao e obrigatoria: projetos de estudo bem explicados contam bastante."
  },
  {
    "id": "2",
    "titulo": "Estagio em Desenvolvimento Web",
    "empresa": "Aurora Tech",
    "empresaSlug": "aurora-tech",
    "area": "Front-end",
    "senioridade": "Estagio",
    "local": "Hibrido · Recife",
    "aceitaIniciante": true,
    "descricao": "Nesta vaga de estagio voce participa da construcao de paginas responsivas, acompanha revisoes e aprende a organizar componentes reutilizaveis. O time reserva horas da semana para estudo orientado e oferece tarefas com dificuldade crescente. E importante estar cursando uma formacao relacionada a tecnologia, conhecer o basico de Git e ter vontade de escrever codigo legivel. Nao cobramos experiencia no mercado nem dominio de um framework especifico; queremos ver como voce pensa e aprende."
  },
  {
    "id": "3",
    "titulo": "Pessoa Analista de Dados Junior",
    "empresa": "Nexo Dados",
    "empresaSlug": "nexo-dados",
    "area": "Dados",
    "senioridade": "Junior",
    "local": "Remoto",
    "aceitaIniciante": true,
    "descricao": "A pessoa analista vai apoiar a limpeza de bases, montar consultas SQL e transformar resultados em relatorios claros para equipes nao tecnicas. Voce trabalhara com uma pessoa mentora durante os primeiros meses e tera acesso aos criterios de qualidade das analises. Esperamos raciocinio logico, conhecimento inicial de planilhas e SQL e cuidado ao comunicar limites dos dados. Projetos academicos ou pessoais podem demonstrar tudo o que precisamos para esta oportunidade."
  },
  {
    "id": "4",
    "titulo": "Pessoa Engenheira de Dados Pleno",
    "empresa": "Nexo Dados",
    "empresaSlug": "nexo-dados",
    "area": "Dados",
    "senioridade": "Pleno",
    "local": "Hibrido · Sao Paulo",
    "aceitaIniciante": false,
    "descricao": "Buscamos uma pessoa para manter pipelines de dados, melhorar a observabilidade das cargas e colaborar com analistas na modelagem das informacoes. A funcao envolve Python, SQL, orquestracao e revisao de incidentes com foco em aprendizado. E necessario ter experiencia profissional construindo fluxos de dados e saber discutir custos e confiabilidade. O time documenta decisoes e valoriza solucoes simples, testaveis e faceis de operar antes de adotar novas ferramentas."
  },
  {
    "id": "5",
    "titulo": "Pessoa Desenvolvedora Back-end Junior",
    "empresa": "Ponte Digital",
    "empresaSlug": "ponte-digital",
    "area": "Back-end",
    "senioridade": "Junior",
    "local": "Remoto",
    "aceitaIniciante": true,
    "descricao": "Voce vai colaborar na evolucao de servicos web, escrever testes e acompanhar a investigacao de erros em producao com apoio de pessoas mais experientes. Usamos APIs HTTP, bancos relacionais e integracao continua, mas nao esperamos que voce domine todo o conjunto no primeiro dia. Procuramos base de programacao, compreensao inicial de banco de dados e responsabilidade para comunicar bloqueios. Bootcamps, faculdade e projetos proprios sao experiencias validas para a selecao."
  },
  {
    "id": "6",
    "titulo": "Pessoa Desenvolvedora Java Pleno",
    "empresa": "Ponte Digital",
    "empresaSlug": "ponte-digital",
    "area": "Back-end",
    "senioridade": "Pleno",
    "local": "Presencial · Fortaleza",
    "aceitaIniciante": false,
    "descricao": "A pessoa desenvolvedora sera responsavel por evoluir servicos em Java e Spring, revisar mudancas e apoiar o desenho de contratos entre sistemas. O trabalho inclui testes automatizados, banco de dados relacional e acompanhamento de metricas em producao. Esperamos experiencia anterior com APIs e capacidade de investigar problemas sem perder de vista o impacto para quem usa. Valorizamos documentacao objetiva, colaboracao e disposicao para orientar colegas menos experientes."
  }
];

