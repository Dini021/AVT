async function fetchData(link) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = link;

    try {
        const response = await fetch(proxyUrl + targetUrl);
        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.statusText}`);
        }

        const data = await response.json();
        const multiplier = data.currentMultiplier;

        if (isNaN(multiplier)) {
            throw new Error('O valor retornado não é um número.');
        }

        historicalData.push(parseFloat(multiplier));
        updateHistory(multiplier);

        const nextPrediction = analyzePatterns(historicalData);
        document.getElementById('analysis').innerText = `Multiplicador atual: ${multiplier}\nPróximo valor previsto: ${nextPrediction}`;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        document.getElementById('analysis').innerText = 'Erro ao buscar dados.';
    }
}
