document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');

    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const balance = urlParams.get('balance');

    if (balance) {
        balanceElement.textContent = decodeURIComponent(balance) + " TRX";
    } else {
        console.log('No balance parameter found.');
    }
});
