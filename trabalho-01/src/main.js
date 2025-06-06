// src/main.js
import { Taxi } from "./taxi";
import { createLineChart } from './plot';

window.onload = async () => {
    const taxi = new Taxi();
    await taxi.init();
    console.log("Carregando dados dos táxis verdes (arquivos .parquet para os primeiros 6 meses de 2023)...");
    await taxi.loadTaxi(6);
    console.log("Dados dos táxis verdes carregados na tabela 'taxi_2023'.");

    // --- Pergunta A ---
    const queryA = `
        SELECT
            strftime(lpep_pickup_datetime, '%H') AS hour_of_day,
            CASE
                WHEN strftime(lpep_pickup_datetime, '%w') IN ('0', '6') THEN 'Dia Útil'
                ELSE 'Final de Semana'
            END AS day_type,
            COUNT(*) AS total_trips
        FROM taxi_2023
        WHERE lpep_pickup_datetime >= '2023-01-01'::DATE AND lpep_pickup_datetime < '2023-07-01'::DATE
        GROUP BY hour_of_day, day_type
        ORDER BY day_type, hour_of_day;
    `;
    const rawDataA = await taxi.query(queryA);
    // CONVERSÃO PARA NUMBER AQUI
    const dataA = rawDataA.map(d => ({
        hour_of_day: Number(d.hour_of_day),
        day_type: d.day_type,
        total_trips: Number(d.total_trips)
    }));
    console.log("Dados para Pergunta A (convertidos):", dataA);
    createLineChart(dataA, "#chartA", "total_trips", "Hora do Dia", "Total de Corridas", "Total de Corridas: Dias de Semana vs. Fim de Semana", "day_type");


    // --- Pergunta B ---
    const queryB = `
        SELECT
            strftime(lpep_pickup_datetime, '%H') AS hour_of_day,
            AVG(tip_amount) AS average_tip
        FROM taxi_2023
        WHERE lpep_pickup_datetime >= '2023-01-01'::DATE AND lpep_pickup_datetime < '2023-07-01'::DATE
        GROUP BY hour_of_day
        ORDER BY hour_of_day;
    `;
    const rawDataB = await taxi.query(queryB);
    // CONVERSÃO PARA NUMBER AQUI
    const dataB = rawDataB.map(d => ({
        hour_of_day: Number(d.hour_of_day),
        average_tip: Number(d.average_tip)
    }));
    console.log("Dados para Pergunta B (convertidos):", dataB);
    createLineChart(dataB, "#chartB", "average_tip", "Hora do Dia", "Média de Gorjeta (USD)", "Média de Gorjetas por Hora do Dia");
};