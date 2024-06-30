document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const farmProgressElement = document.getElementById('farmProgress');
    const farmRateElement = document.querySelector('.farm-rate');
    const claimButton = document.getElementById('claimButton');
    const gifButton = document.getElementById('gifButton');
    const boostButton = document.getElementById('boostButton');
    const boostModal = document.getElementById('boostModal');
    const trxInput = document.getElementById('trxInput');
    const modalBackButton = boostModal.querySelector('.back-button');
    const modalAddButton = boostModal.querySelector('.add-button');
    const modalMiningPowerValue = boostModal.querySelector('#miningPowerValue');

    let balance = parseFloat(localStorage.getItem('balance')) || 0.0000;
    let farmingProgress = parseFloat(localStorage.getItem('farmingProgress')) || 0.0000;
    let lastUpdateTime = parseFloat(localStorage.getItem('lastUpdateTime')) || Date.now();
    let farmingInterval;
    let miningPower = parseFloat(localStorage.getItem('miningPower')) || 1.0; // Начальная мощность майнинга 1.0 GH/s

    const maxFarmingProgress = 10.0000;

    function startFarming() {
        farmingInterval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - lastUpdateTime) / 1000; // Переводим в секунды
            lastUpdateTime = currentTime;

            const earnedAmount = (miningPower * 0.0001) * elapsedTime;
            farmingProgress += earnedAmount;

            if (farmingProgress >= maxFarmingProgress) {
                farmingProgress = maxFarmingProgress;
                clearInterval(farmingInterval);
                gifButton.disabled = false;
            }

            farmProgressElement.textContent = farmingProgress.toFixed(4) + " TRX";

            updateClaimButton();
            saveDataToLocalStorage();

        }, 100); // Интервал в 100 миллисекунд для обновления

        gifButton.disabled = true; // Отключаем гифку при запуске фарминга

        saveDataToLocalStorage(); // Сохраняем данные в localStorage при запуске фарминга
    }

    function updateClaimButton() {
        claimButton.disabled = farmingProgress < 1.0000;
    }

    function saveDataToLocalStorage() {
        localStorage.setItem('farmingProgress', farmingProgress.toFixed(4));
        localStorage.setItem('lastUpdateTime', lastUpdateTime.toString());
        localStorage.setItem('balance', balance.toFixed(4));
        localStorage.setItem('miningPower', miningPower.toFixed(1)); // Сохраняем мощность майнинга
    }

    claimButton.addEventListener('click', () => {
        balance += farmingProgress;
        balanceElement.textContent = balance.toFixed(4) + " TRX";

        farmingProgress = 0.0000;
        farmProgressElement.textContent = farmingProgress.toFixed(4) + " TRX";

        claimButton.disabled = true;
        gifButton.disabled = false; // Включаем гифку после завершения фарминга

        clearInterval(farmingInterval);

        // Обновляем localStorage с новым балансом
        localStorage.setItem('balance', balance.toFixed(4));
        localStorage.removeItem('farmingProgress');
        localStorage.removeItem('lastUpdateTime');
    });

    gifButton.addEventListener('click', startFarming);

    boostButton.addEventListener('click', () => {
        boostModal.style.display = 'flex';
    });

    modalBackButton.addEventListener('click', () => {
        boostModal.style.display = 'none';
    });

    modalAddButton.addEventListener('click', () => {
        const trxValue = parseFloat(trxInput.value);
        if (trxValue < 100) {
            alert('Минимальная сумма - 100 TRX.');
        } else if (balance < trxValue) {
            alert('Недостаточно средств на балансе.');
        } else {
            balance -= trxValue;
            miningPower += trxValue * 0.1;
            modalMiningPowerValue.textContent = miningPower.toFixed(1) + ' GH/s';
            balanceElement.textContent = balance.toFixed(4) + ' TRX';
            alert(`Вы ввели ${trxValue} TRX. Ваша новая мощность майнинга: ${miningPower.toFixed(1)} GH/s.`);
            boostModal.style.display = 'none';

            saveDataToLocalStorage();

            // Обновляем скорость фарминга при изменении мощности
            farmRateElement.textContent = miningPower.toFixed(1) + ' GH/s ⚡';
        }
    });

    trxInput.addEventListener('input', () => {
        const inputValue = parseFloat(trxInput.value) || 0;
        modalMiningPowerValue.textContent = (inputValue * 0.1).toFixed(1) + ' GH/s';
    });

    // При загрузке страницы, устанавливаем значения из localStorage
    if (localStorage.getItem('lastUpdateTime')) {
        startFarming();

        balanceElement.textContent = balance.toFixed(4) + " TRX";
        farmProgressElement.textContent = farmingProgress.toFixed(4) + " TRX";
        modalMiningPowerValue.textContent = miningPower.toFixed(1) + ' GH/s';
        farmRateElement.textContent = miningPower.toFixed(1) + ' GH/s ⚡';
        updateClaimButton();
    }
});
