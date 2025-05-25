# Análise de Dados: Green Taxis de NYC (D3.js)

Este repositório contém o trabalho final da disciplina de Visualização de Informações, focado na análise dos dados de Green Taxis da cidade de Nova York. Utilizamos a biblioteca D3.js para a construção de visualizações interativas que respondem a perguntas específicas sobre o comportamento das corridas.

---

## Integrantes do Grupo

* **Roger Egito Martins da Silva** - rogeregito@id.uff.br
* **Guilherme Moura Sartorio** - guilhermemoura@id.uff.br
* **Vinicius Rocha Pinheiro** - viniciuspinheiro@id.uff.br

---

## Sobre o Projeto

Este projeto tem como objetivo explorar e visualizar padrões nos dados de Green Taxis de NYC para responder a duas perguntas chave, conforme solicitado:

1.  **Existe alguma diferença entre o padrão de corridas de taxi durante os dias de semana e os dias de fim de semana?**
2.  **Existe alguma relação entre o valor da gorjeta (tip_amount) e o horário das corridas?**

Para cada pergunta, apresentamos uma visualização desenvolvida em D3.js, acompanhada de uma discussão sobre a escolha da visualização e uma análise das informações que podem ser extraídas da mesma.

---

## Estrutura do Repositório

```
trabalho-vis/
├── 00 - data
│   ├── green
│   ├── taxi.json
│   └── yellow
├── README.md
└── trabalho-01
    ├── index.css
    ├── index.html
    ├── package.json
    ├── src
    │   ├── config.js
    │   ├── main.js
    │   ├── plot.js
    │   └── taxi.js
    └── vite.config.js
```

---

## Como Executar o Projeto Localmente

Para configurar e visualizar o projeto em seu ambiente de desenvolvimento, siga os passos abaixo:

1.  **Pré-requisito: Instalar Node.js**
    Este projeto utiliza ferramentas do ecossistema Node.js (npm, Vite). Certifique-se de ter o **Node.js (que inclui o npm - Node Package Manager)** instalado em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2.  **Clone o repositório:**
    ```bash
    git clone https://github.com/vini-pinheiro/green-taxis-nyc.git
    cd trabalho-vis
    ```
    *(**Nota:** Certifique-se de que a estrutura de pastas está correta após o clone ou ajuste o caminho do `cd` para a pasta raiz do seu trabalho, que contém o `package.json`.)*

3.  **Instale as dependências:**
    Navegue até o diretório raiz do projeto (onde está o `package.json`) e execute:
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    Com todas as dependências instaladas, você pode iniciar o servidor de desenvolvimento do Vite:
    ```bash
    npm run dev
    ```
    Após executar este comando, o Vite iniciará um servidor local (geralmente em `http://localhost:5173` ou uma porta similar) e abrirá automaticamente seu navegador para a visualização do projeto. Qualquer alteração nos arquivos `.js` ou `.css` resultará em uma atualização instantânea no navegador (Hot Module Replacement).

---

## Carregamento dos Dados (DuckDB)

Conforme as instruções do trabalho, os dados dos Green Taxis são carregados utilizando **@duckdb/duckdb-wasm**. Devido ao grande volume de dados, optamos por carregar apenas os **seis primeiros meses do ano de 2023** para fins de análise e desenvolvimento local.

A lógica de carregamento e processamento dos dados está implementada dentro dos arquivos JavaScript (`src/*.js`) e utiliza as capacidades do DuckDB para consulta eficiente dos datasets diretamente no navegador.

---

## Tecnologias Utilizadas

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **D3.js v7** (para visualização de dados)
* **DuckDB-WASM** (para carregamento e consulta de dados)
* **Vite** (como ferramenta de *bundling* e servidor de desenvolvimento)
* **Node.js** (ambiente de execução para ferramentas de desenvolvimento)

---
