    const sendModal1 = document.getElementById('sendModal1');
    const sendButton1 = document.querySelector('.send-button1');

    // Открытие окна на кнопку "Send"
    sendButton1.addEventListener('click', function() {
        sendModal1.style.display = 'block';
    });

    // Закрытие  окна  на кнопку "Not yet" или вне окна
    const closeButton1 = sendModal1.querySelector('.back-button');
    closeButton1.addEventListener('click', function() {
        sendModal1.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === sendModal1) {
            sendModal1.style.display = 'none';
        }
    });

    // Обработчик изменений в поле Amount
    const shibaAmountInput = sendModal1.querySelector('#shibaAmountInput');
    const receiveShibaAmount = sendModal1.querySelector('.receive-amount strong');

    shibaAmountInput.addEventListener('input', function() {
        let amount = parseFloat(shibaAmountInput.value);
        if (isNaN(amount)) {
            amount = 0;
        }
        let receive = amount - 30000;
        receive = Math.max(receive, 0); // Не даем получить отрицательное значение
        receiveShibaAmount.textContent = `Receive amount ${receive.toFixed(4)} SHIB`;
    });