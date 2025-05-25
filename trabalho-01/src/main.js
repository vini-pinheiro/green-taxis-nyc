// src/main.js
import { Taxi } from "./taxi";
import { createLineChart } from './plot'; // Importa a função de criação de gráfico de linha

window.onload = async () => {
    const taxi = new Taxi();

    await taxi.init(); // Inicializa o DuckDB

    // Carrega os dados dos táxis verdes para os primeiros 6 meses de 2023 usando o método loadTaxi
    // Este método já lida com os arquivos .parquet da pasta 'green/'
    // Ele criará uma tabela chamada 'taxi_2023' no DuckDB
    console.log("Carregando dados dos táxis verdes (arquivos .parquet para os primeiros 6 meses de 2023)...");
    await taxi.loadTaxi(6); // Carrega 6 meses (Janeiro a Junho)
    console.log("Dados dos táxis verdes carregados na tabela 'taxi_2023'.");

    // --- Pergunta A: Existe alguma diferença entre o padrão de corridas de taxi durante os dias de semana e os dias de fim de semana? ---
    console.log("Executando consulta para Pergunta A...");
    const queryA = `
        SELECT
            strftime(lpep_pickup_datetime, '%H') AS hour_of_day,
            CASE
                WHEN strftime(lpep_pickup_datetime, '%w') IN ('0', '6') THEN 'Weekend' -- 0=Domingo (Sunday), 6=Sábado (Saturday)
                ELSE 'Weekday'
            END AS day_type,
            COUNT(*) AS total_trips
        FROM taxi_2023 -- Usando a tabela 'taxi_2023' criada por taxi.loadTaxi()
        WHERE lpep_pickup_datetime >= '2023-01-01'::DATE AND lpep_pickup_datetime < '2023-07-01'::DATE
        GROUP BY hour_of_day, day_type
        ORDER BY day_type, hour_of_day;
    `;
    const dataA = await taxi.query(queryA);
    console.log("Dados para Pergunta A:", dataA);

    // Chame a função de visualização para a Pergunta A
    createLineChart(
        dataA,
        "#chartA",
        "total_trips",
        "Hora do Dia",
        "Total de Corridas",
        "Padrão de Corridas: Dias de Semana vs. Fim de Semana",
        "day_type" // Coluna para agrupar as linhas (Weekend/Weekday)
    );


    // --- Pergunta B: Existe alguma relação entre o valor da gorjeta (tip_amout) e o horário das corridas? ---
    console.log("Executando consulta para Pergunta B...");
    const queryB = `
        SELECT
            strftime(lpep_pickup_datetime, '%H') AS hour_of_day,
            AVG(tip_amount) AS average_tip
        FROM taxi_2023 -- Usando a tabela 'taxi_2023'
        WHERE lpep_pickup_datetime >= '2023-01-01'::DATE AND lpep_pickup_datetime < '2023-07-01'::DATE
        GROUP BY hour_of_day
        ORDER BY hour_of_day;
    `;
    const dataB = await taxi.query(queryB);
    console.log("Dados para Pergunta B:", dataB);

    // Chame a função de visualização para a Pergunta B
    createLineChart(
        dataB,
        "#chartB",
        "average_tip",
        "Hora do Dia",
        "Média de Gorjeta (USD)",
        "Média de Gorjetas por Hora do Dia"
        // Sem groupAccessor para esta pergunta, pois é uma única linha de média
    );
};