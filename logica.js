<script>
    let dataSelecionadaGlobal = ""; // Variável para guardar a data escolhida

    // BANCO DE DATAS (Onde você gerencia o que está ocupado)
    const meusEventos = [
        { title: 'AGENDADO', start: '2026-02-25', className: 'event-agendado' },
        { title: 'CONFIRMADO', start: '2026-02-28', className: 'event-confirmado' }
    ];

    function abrirAgendamento() {
        document.getElementById('hero').style.display = 'none';
        document.getElementById('sessao-calendario').style.display = 'block';
        
        setTimeout(() => {
            const calendarEl = document.getElementById('calendar');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                locale: 'pt-br',
                events: meusEventos,
                dateClick: function(info) {
                    const hoje = new Date().toISOString().split('T')[0];
                    
                    // Bloqueia datas passadas
                    if (info.dateStr < hoje) return;

                    // Verifica se a data já tem evento
                    const ocupado = meusEventos.some(e => e.start === info.dateStr);
                    
                    if (ocupado) {
                        alert("Esta data já está reservada!");
                    } else {
                        // AQUI ESTÁ O SEGREDO: Salva a data na variável global
                        dataSelecionadaGlobal = info.dateStr;
                        
                        // Formata para mostrar no site (DD/MM/AAAA)
                        const dataBr = info.dateStr.split('-').reverse().join('/');
                        
                        document.getElementById('form-reserva').style.display = 'block';
                        document.getElementById('data-texto').innerText = "Data Selecionada: " + dataBr;
                        
                        // Rola a tela para o formulário
                        window.scrollTo(0, document.body.scrollHeight);
                    }
                }
            });
            calendar.render();
        }, 150);
    }

    function enviarWhatsApp() {
        const nome = document.getElementById('nome-cliente').value;
        const meuZap = "5598985170240"; // Seu número configurado
        
        // Verifica se o cliente escolheu a data e digitou o nome
        if (!dataSelecionadaGlobal) {
            alert("Por favor, selecione uma data no calendário primeiro!");
            return;
        }
        if (!nome) {
            alert("Por favor, digite seu nome!");
            return;
        }

        // Formata a data para a mensagem do WhatsApp (Ex: 20/03/2026)
        const dataParaWhats = dataSelecionadaGlobal.split('-').reverse().join('/');

        // Monta a mensagem final
        const mensagem = `*SOLICITAÇÃO ÁREA VIP* 🔱%0A%0A` +
                         `*Cliente:* ${nome}%0A` +
                         `*Data:* ${dataParaWhats}%0A` +
                         `*Horário:* 09h às 21h%0A%0A` +
                         `Olá! Vi no site que a data *${dataParaWhats}* está disponível e quero reservar!`;
        
        // Abre o WhatsApp
        window.open(`https://wa.me/${meuZap}?text=${mensagem}`, '_blank');
    }
</script>
