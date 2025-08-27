document.addEventListener('DOMContentLoaded', () => {

    const prices = [
        { name: '50 kr', color: '#e74c3c' },
        { name: '100 kr', color: '#3498db' },
        { name: 'Vinstlott', color: '#2ecc71' },
        { name: '200 kr', color: '#f1c40f' },
        { name: 'T-shirt', color: '#9b59b6' },
        { name: 'Ingen vinst', color: '#34495e' },
        { name: '500 kr', color: '#1abc9c' },
        { name: 'Gratis kaffe', color: '#e67e22' }
    ];

    const wheel = document.querySelector('.wheel');
    const spinBtn = document.getElementById('spin-button');
    const resultText = document.getElementById('result-text');

    const numSegments = prices.length;
    const degPerSegment = 360 / numSegments;

    // Skapa segmenten dynamiskt
    prices.forEach((price, index) => {
        const segment = document.createElement('div');
        segment.className = 'segment';
        segment.style.transform = `rotate(${index * degPerSegment}deg) skewY(45deg)`;
        segment.style.backgroundColor = price.color;

        const innerSegment = document.createElement('div');
        innerSegment.className = 'segment-inner';
        innerSegment.style.backgroundColor = price.color;

        const text = document.createElement('span');
        text.className = 'segment-text';
        text.textContent = price.name;

        innerSegment.appendChild(text);
        segment.appendChild(innerSegment);
        wheel.appendChild(segment);
    });

    spinBtn.addEventListener('click', () => {
        spinBtn.disabled = true;
        resultText.textContent = '';

        // Räkna ut ett slumpmässigt segment att landa på
        const randomIndex = Math.floor(Math.random() * numSegments);
        const randomPrice = prices[randomIndex];

        // Snurrvinkel: ett antal hela varv + vinkeln för att landa på rätt segment
        const spinAngle = (360 * 5) + (360 - (randomIndex * degPerSegment) - (degPerSegment / 2));

        // Starta animationen
        wheel.style.transition = 'transform 4s cubic-bezier(0.1, 0.7, 1.0, 0.1)';
        wheel.style.transform = `rotate(${spinAngle}deg)`;

        // Vänta tills animationen är klar
        setTimeout(() => {
            wheel.style.transition = 'none';
            resultText.textContent = `Du vann: ${randomPrice.name}!`;
            spinBtn.disabled = false;
        }, 4000); // 4000ms = 4s, samma som CSS-animationen
    });

});
