const textPhrases = document.getElementById("text-phrases");
const statisticsText = document.querySelectorAll(".statistics-text");

async function getCatFact() {
    try {
        const response = await fetch("https://catfact.ninja/fact");
        if (!response.ok) { // Verifica si la respuesta es correcta
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        textPhrases.innerText = data.fact; // Muestra el hecho sobre gatos
    } catch (error) {
        console.error("Error al obtener el dato sobre gatos:", error);
        textPhrases.innerText = "No se pudo obtener un dato sobre gatos.";
    }
}

// Obtener un dato cuando se carga la página
getCatFact();


const repos = [
    { owner: 'nohel1aSof1', repo: 'AppContacts' }, 
    { owner: 'nohel1aSof1', repo: 'nohel1aSof1.github.io' }  
];

async function getLanguageStats(repo) {
    const response = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}/languages`);
    if (!response.ok) {
        throw new Error(`Error al obtener datos del repositorio ${repo.repo}: ${response.status}`);
    }
    return await response.json();
}

async function aggregateLanguageStats() {
    const totalStats = {};

    for (const repo of repos) {
        try {
            const stats = await getLanguageStats(repo);
            for (const [language, lines] of Object.entries(stats)) {
                if (!totalStats[language]) {
                    totalStats[language] = 0;
                }
                totalStats[language] += lines; // Sumar las líneas por lenguaje
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Calcular el total de líneas para calcular porcentajes
    const totalLines = Object.values(totalStats).reduce((sum, lines) => sum + lines, 0);

    // Actualizar el HTML con los resultados
    statisticsText.forEach(stat => {
        const language = stat.innerText.split(":")[0]; // Obtiene el lenguaje (HTML, CSS, JS)
        const lines = totalStats[language] || 0; // Obtiene las líneas del lenguaje o 0 si no existe
        const percentage = totalLines > 0 ? ((lines / totalLines) * 100).toFixed(2) : 0; // Calcula el porcentaje
        stat.innerText = `${language}: ${percentage}%`;
    });
}

// Obtener las estadísticas al cargar la página
aggregateLanguageStats();
