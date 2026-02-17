function enviarWhatsApp() {
    const nome = document.getElementById('nome-cliente').value;
    const meuZap = "5598985170240";
    
    if (!dataSelecionadaGlobal) return alert("Selecione uma data!");
    if (!nome) return alert("Digite seu nome!");

    const dataParaWhats = dataSelecionadaGlobal.split('-').reverse().join('/');

    // --- LÓGICA DO CARDÁPIO ---
    let pedido = "";
    const qtdChurrasco = document.getElementById('item-churrasco').value;
    const qtdBebidas = document.getElementById('item-bebidas').value;
    const temDecoracao = document.getElementById('item-decoracao').checked;

    if (qtdChurrasco > 0) pedido += `%0A- Buffet Churrasco: ${qtdChurrasco} pessoas`;
    if (qtdBebidas > 0) pedido += `%0A- Pacote Bebidas: ${qtdBebidas} pessoas`;
    if (temDecoracao) pedido += `%0A- Decoração Standard: Sim`;

    if (pedido === "") pedido = "%0A- Apenas locação do espaço";

    // --- MENSAGEM FINAL ---
    const mensagem = `*SOLICITAÇÃO ÁREA VIP* 🔱%0A%0A` +
                     `*Cliente:* ${nome}%0A` +
                     `*Data:* ${dataParaWhats}%0A` +
                     `*Horário:* 09h às 21h%0A%0A` +
                     `*SERVIÇOS ESCOLHIDOS:*${pedido}%0A%0A` +
                     `Olá! Gostaria de um orçamento com esses itens!`;
    
    window.open(`https://wa.me/${meuZap}?text=${mensagem}`, '_blank');
}
