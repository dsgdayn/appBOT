document.addEventListener('DOMContentLoaded', () => {
    const boostButton = document.getElementById('boostButton');
    const boostModal = document.getElementById('boostModal');
    const trxInput = document.getElementById('trxInput');
    const modalBackButton = boostModal.querySelector('.back-button');
    const modalAddButton = boostModal.querySelector('.add-button');
    const modalMiningPowerValue = boostModal.querySelector('#miningPowerValue');

    boostButton.addEventListener('click', () => {
        boostModal.style.display = 'flex';
    });

    modalBackButton.addEventListener('click', () => {
        boostModal.style.display = 'none';
    });

    modalAddButton.addEventListener('click', () => {
        const trxValue = parseFloat(trxInput.value);
        if (trxValue < 100) {
            alert('Minimum amount is 100 TRX.');
        } else {
            // Здесь можно добавить функциональность для обработки введенного значения
            alert(`You have entered ${trxValue} TRX.`);
            // Дополнительная логика может быть добавлена здесь
        }
    });

    trxInput.addEventListener('input', () => {
        const inputValue = parseFloat(trxInput.value) || 0;
        modalMiningPowerValue.textContent = (inputValue * 0.1).toFixed(1) + ' GH/s';
    });
});
