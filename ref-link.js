document.addEventListener('DOMContentLoaded', () => {
    const referralLinkElement = document.getElementById('referral-link');
    let referralId = localStorage.getItem('referralId');
    
    if (!referralId) {
        referralId = generateRandomReferralId();
        localStorage.setItem('referralId', referralId);
    }

    const referralLink = `https://t.me/tronixpp_bot?start=${referralId}`;
    referralLinkElement.value = referralLink;
});

function copyReferralLink() {
    const referralLinkElement = document.getElementById('referral-link');
    referralLinkElement.select();
    document.execCommand('copy');
}

function generateRandomReferralId() {
    return Math.floor(Math.random() * 1000000).toString();
}
