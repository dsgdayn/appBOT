        document.addEventListener('DOMContentLoaded', () => {
            const referralLinkElement = document.getElementById('referral-link');
            const userId = '12345'; // Уникальный идентификатор пользователя
            let referralId = localStorage.getItem('referralId');
            if (!referralId) {
                referralId = userId; // Генерируйте уникальный ID на сервере при регистрации пользователя
                localStorage.setItem('referralId', referralId);
            }

            const referralLink = `https://yourwebsite.com/register?ref=${referralId}`;
            referralLinkElement.value = referralLink;
        });

        function copyReferralLink() {
            const referralLinkElement = document.getElementById('referral-link');
            referralLinkElement.select();
            document.execCommand('copy');
            alert('Реферальная ссылка скопирована в буфер обмена!');
        }