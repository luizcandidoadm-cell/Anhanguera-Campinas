// Dados simulados das salas (Você pode futuramente carregar isso de um arquivo JSON ou Banco de Dados)
const dadosSalas = [
    { curso: "Pedagogia", dia: "SEGUNDA-FEIRA", turno: "Noite", serie: "1º Semestre", sala: "Sala 102", mediador: "Prof. Carlos" },
    { curso: "Administração", dia: "SEGUNDA-FEIRA", turno: "Manhã", serie: "2º Semestre", sala: "Lab 01", mediador: "Profa. Maria" },
    { curso: "Análise e Dev. Sistemas", dia: "TERÇA-FEIRA", turno: "Noite", serie: "1º Semestre", sala: "Lab 03", mediador: "Prof. Humberto" },
    { curso: "Educação Física", dia: "QUARTA-FEIRA", turno: "Manhã", serie: "3º Semestre", sala: "Quadra / Sala 05", mediador: "Prof. André" },
    { curso: "Engenharia Civil", dia: "QUINTA-FEIRA", turno: "Noite", serie: "4º Semestre", sala: "Sala 204", mediador: "Profa. Ana" }
];

// Elementos da tela
const searchInput = document.getElementById('searchInput');
const filterDia = document.getElementById('filterDia');
const filterTurno = document.getElementById('filterTurno');
const tableBody = document.getElementById('tableBody');
const noResults = document.getElementById('noResults');

// Função para renderizar a tabela com base nos filtros
function renderTable() {
    const termoBusca = searchInput.value.toLowerCase();
    const diaSelecionado = filterDia.value;
    const turnoSelecionado = filterTurno.value;

    // Filtra os dados
    const resultados = dadosSalas.filter(item => {
        const atendeTexto = 
            item.curso.toLowerCase().includes(termoBusca) ||
            item.sala.toLowerCase().includes(termoBusca) ||
            item.mediador.toLowerCase().includes(termoBusca);

        const atendeDia = diaSelecionado === "" || item.dia === diaSelecionado;
        const atendeTurno = turnoSelecionado === "" || item.turno === turnoSelecionado;

        return atendeTexto && atendeDia && atendeTurno;
    });

    // Monta o HTML das linhas
    tableBody.innerHTML = "";

    if (resultados.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        resultados.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${item.curso}</strong></td>
                <td>${item.dia}</td>
                <td>${item.turno}</td>
                <td>${item.serie}</td>
                <td>${item.sala}</td>
                <td>${item.mediador}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

// Escutadores de eventos (Dispara a busca a cada alteração)
searchInput.addEventListener('input', renderTable);
filterDia.addEventListener('change', renderTable);
filterTurno.addEventListener('change', renderTable);

// Carregamento inicial da página
renderTable();