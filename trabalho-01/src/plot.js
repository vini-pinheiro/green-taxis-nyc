// src/plot.js
import * as d3 from 'd3';

export function clearChart() {
    d3.selectAll('svg > g').remove();
    d3.selectAll('svg text').remove();
}

export async function createLineChart(data, targetSelector, valueAccessor, labelX, labelY, title, groupAccessor = null) {
    const margin = { top: 40, right: 30, bottom: 60, left: 70 };
    const svgElement = d3.select(targetSelector);

    if (svgElement.empty()) {
        console.error(`SVG element not found for selector: ${targetSelector}`);
        return;
    }
    svgElement.selectAll("*").remove(); // Limpa o SVG existente

    const width = parseFloat(svgElement.style("width")) - margin.left - margin.right;
    const height = parseFloat(svgElement.style("height")) - margin.top - margin.bottom;

    const svg = svgElement.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Adiciona Título ao Gráfico
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(title);

    // Processar dados para múltiplas linhas se houver groupAccessor
    let nestedData;
    if (groupAccessor) {
        nestedData = Array.from(d3.group(data, d => d[groupAccessor]), ([key, value]) => ({ key, values: value }));
    } else {
        nestedData = [{ key: "default", values: data }];
    }

    // Escalas
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => parseInt(d.hour_of_day)))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[valueAccessor]) * 1.05])
        .range([height, 0]);

    // Eixos
    const xAxis = d3.axisBottom(xScale)
        .tickValues(Array.from({length:24},(v,i)=>i))
        .tickFormat(d => `${d}h`);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.bottom - 10)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text(labelX);

    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -height / 2)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text(labelY);

    // Gerador de Linha
    const lineGenerator = d3.line()
        .x(d => xScale(parseInt(d.hour_of_day)))
        .y(d => yScale(d[valueAccessor]))
        .curve(d3.curveMonotoneX);

    // Cores para múltiplas linhas
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(nestedData.map(d => d.key));

    // Desenhar as linhas
    svg.selectAll(".line-group")
        .data(nestedData)
        .enter()
        .append("g")
        .attr("class", "line-group")
        .append("path")
        .attr("class", "line")
        .attr("d", d => lineGenerator(d.values))
        .style("stroke", d => colorScale(d.key))
        .style("fill", "none")
        .style("stroke-width", "2px");

    // Adicionar pontos de dados (opcional)
    nestedData.forEach(group => {
        svg.selectAll(`.dot-${group.key}`)
            .data(group.values)
            .enter().append("circle")
            .attr("class", `dot dot-${group.key}`)
            .attr("cx", d => xScale(parseInt(d.hour_of_day)))
            .attr("cy", d => yScale(d[valueAccessor]))
            .attr("r", 4)
            .style("fill", colorScale(group.key));
    });

    // Adicionar legenda se houver grupos
    if (groupAccessor) {
        const legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(colorScale.domain().slice().reverse())
            .enter().append("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", colorScale);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);
    }
}