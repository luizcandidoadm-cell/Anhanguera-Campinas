// Altere para a URL CSV da sua planilha do Google Sheets, se estiver usando uma
const URL_PLANILHA = ""; 

let dadosSalas = [
    { curso: "ENFERMAGEM", dia: "Quarta", turno: "Manhã", serie: "5 e 6º", sala: "Bl. F / Sala 88", mediador: "ISABELLE" },
    { curso: "ED. FÍSICA", dia: "Quarta", turno: "Manhã", serie: "1 e 2º", sala: "Bl. F / Sala 90", mediador: "LUCIENE" },
    { curso: "ADMINISTRAÇÃO", dia: "Quarta", turno: "Noite", serie: "5 e 6º", sala: "Bl. F / Sala 93", mediador: "FERNANDO MOLEZ" },
    { curso: "ADMINISTRAÇÃO", dia: "Quarta", turno: "Noite", serie: "1 e 2º", sala: "Bl. F / Sala 95", mediador: "GERSON" },
    { curso: "ARQUITETURA", dia: "Quarta", turno: "Noite", serie: "7 e 8º", sala: "Bl. F / Sala 83", mediador: "TATIANE" },
    { curso: "BIOMEDICINA", dia: "Quarta", turno: "Noite", serie: "3 e 4º", sala: "Bl. F / Sala 92", mediador: "NAYARA GASTALDO" },
    { curso: "CIÊNCIAS CONTÁBEIS", dia: "Quarta", turno: "Noite", serie: "1 e 2º", sala: "Bl. F / Sala 95", mediador: "GERSON" },
    { curso: "CIÊNCIAS CONTÁBEIS", dia: "Quarta", turno: "Noite", serie: "5 e 6º", sala: "Bl. F / Sala 94", mediador: "JOYCE" }
];

// Elementos
const searchInput = document.getElementById('searchInput');
const filterDia = document.getElementById('filterDia');
const filterTurno = document.getElementById('filterTurno');
const tableBody = document.getElementById('tableBody');
const counter = document.getElementById('counter');
const btnClear = document.getElementById('btnClear');
const noResults = document.getElementById('noResults');

function renderTable() {
    const termo = searchInput.value.toLowerCase().trim();
    const dia = filterDia.value.toLowerCase();
    const turno = filterTurno.value.toLowerCase();

    const filtrados = dadosSalas.filter(item => {
        const matchTexto = (item.curso || "").toLowerCase().includes(termo) ||
                           (item.sala || "").toLowerCase().includes(termo) ||
                           (item.mediador || "").toLowerCase().includes(termo);

        const matchDia = dia === "" || (item.dia || "").toLowerCase() === dia;
        const matchTurno = turno === "" || (item.turno || "").toLowerCase() === turno;

        return matchTexto && matchDia && matchTurno;
    });

    counter.textContent = `${filtrados.length} sala(s) encontrada(s)`;
    tableBody.innerHTML = "";

    if (filtrados.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        filtrados.forEach(item => {
            const tr = document.createElement('tr');
            
            const isManha = (item.turno || "").toLowerCase().includes("manhã");
            const dotClass = isManha ? "dot-manha" : "dot-noite";

            tr.innerHTML = `
                <td class="curso-nome">${item.curso}</td>
                <td><span class="tag-dia">${item.dia}</span></td>
                <td><span class="dot-turno ${dotClass}"></span>${item.turno}</td>
                <td>${item.serie}</td>
                <td><span class="tag-sala">${item.sala}</span></td>
                <td class="mediador-nome">${item.mediador}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

// Botão Limpar Filtros
btnClear.addEventListener('click', () => {
    searchInput.value = "";
    filterDia.value = "";
    filterTurno.value = "";
    renderTable();
});

// Eventos de entrada
searchInput.addEventListener('input', renderTable);
filterDia.addEventListener('change', renderTable);
filterTurno.addEventListener('change', renderTable);

// Inicialização
renderTable();