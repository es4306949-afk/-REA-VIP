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

function enviarWhatsApp() {
    const nome = document.getElementById('nome-cliente').value;
    
    // SEU NÚMERO CONFIGURADO: (98) 98517-0240
    const meuZap = "5598985170240"; 
    
    if(!nome) return alert("Por favor, digite seu nome completo para continuar!");

    const dataF = dataSelecionada.split('-').reverse().join('/');
    
    // Mensagem personalizada para a ÁREA VIP
    const mensagem = `*SOLICITAÇÃO ÁREA VIP* 🔱%0A%0A` +
                     `*Cliente:* ${nome}%0A` +
                     `*Data:* ${dataF}%0A` +
                     `*Horário:* 09:00 às 21:00h%0A%0A` +
                     `Olá! Vi no site que esta data está livre. Podemos prosseguir com o agendamento?`;
    
    window.open(`https://wa.me/${meuZap}?text=${mensagem}`, '_blank');
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
