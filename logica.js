// Importante: Estes scripts devem estar no <head> para funcionar:
// <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.js"></script>

let dataSelecionadaGlobal = "";

// GERENCIAMENTO DE DATAS: Adicione ou remova aqui
const datasEventos = [
    { title: 'AGENDADO', start: '2026-02-25', className: 'event-agendado' },
    { title: 'CONFIRMADO', start: '2026-02-28', className: 'event-confirmado' }
];

function mostrarCalendario() {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('sessao-calendario').style.display = 'block';
    renderizarCalendario();
}

function renderizarCalendario() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        events: datasEventos,
        dateClick: function(info) {
            const hoje = new Date().toISOString().split('T')[0];
            if (info.dateStr < hoje) return;

            const ocupada = datasEventos.some(e => e.start === info.dateStr);
            if (ocupada) {
                alert("Data indisponível para novos agendamentos.");
            } else {
                dataSelecionadaGlobal = info.dateStr;
                document.getElementById('form-reserva').style.display = 'block';
                document.getElementById('data-escolhida').innerText = "Data Selecionada: " + info.dateStr.split('-').reverse().join('/');
            }
        }
    });
    calendar.render();
}

function enviarWhats() {
    const nome = document.getElementById('nome-cliente').value;
    const numero = "5511999999999"; // SEU NÚMERO AQUI
    
    if(!nome) return alert("Por favor, digite seu nome.");

    const dataF = dataSelecionadaGlobal.split('-').reverse().join('/');
    const msg = `*SOLICITAÇÃO ÁREA VIP*%0A%0A` +
                `*Cliente:* ${nome}%0A` +
                `*Data:* ${dataF}%0A` +
                `*Horário:* 09h às 21h%0A%0A` +
                `Vi no site que esta data está livre!`;

    window.open(`https://wa.me/${numero}?text=${msg}`);
}
function mostrarCalendario() {
    // 1. Torna a seção visível primeiro
    const sessao = document.getElementById('sessao-calendario');
    const hero = document.getElementById('hero');
    
    hero.style.display = 'none';
    sessao.style.display = 'block';

    // 2. Dá um pequeno tempo (100ms) para o navegador processar o layout antes de desenhar
    setTimeout(() => {
        renderizarCalendario();
    }, 100);
}