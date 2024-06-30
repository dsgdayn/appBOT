    const sendModal = document.getElementById('sendModal');
    const sendButton = document.querySelector('.send-button');

    // Открытие окна на кнопку "Send"
    sendButton.addEventListener('click', function() {
        sendModal.style.display = 'block';
    });

    // Закрытие окна на кнопку "Not yet" или вне модального окна
    const closeButton = sendModal.querySelector('.back-button');
    closeButton.addEventListener('click', function() {
        sendModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === sendModal) {
            sendModal.style.display = 'none';
        }
    });

    // Обработчик изменений в поле Amount
    const amountInput = sendModal.querySelector('#trxAmountInput');
    const receiveAmount = sendModal.querySelector('.receive-amount strong');

    amountInput.addEventListener('input', function() {
        let amount = parseFloat(amountInput.value);
        if (isNaN(amount)) {
            amount = 0;
        }
        let receive = amount - 2.5;
        receive = Math.max(receive, 0); // Не даем получить отрицательное значение
        receiveAmount.textContent = `Receive amount ${receive.toFixed(2)} TRX`;
    });