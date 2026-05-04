window.onload = function() {
    const svg = document.getElementById('chaos-symbol');
    const labels = document.querySelectorAll('.label');
    const outerCircle = document.getElementById('outer-circle');
    const center = 100;
    let animationStarted = false;

    for (let i = 0; i < 8; i++) {
        const rad = (i * 45 * Math.PI) / 180;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("class", "arrow");
        line.setAttribute("x1", center); line.setAttribute("y1", center);
        line.setAttribute("x2", center + Math.cos(rad) * 60);
        line.setAttribute("y2", center + Math.sin(rad) * 60);
        line.setAttribute("marker-end", "url(#arrowhead)");
        svg.appendChild(line);
    }

    const sections = {
        order: document.getElementById('order-content'),
        chaos: document.getElementById('chaos-content'),
        contact: document.getElementById('contact-content')
    };

    const openSection = (target) => {
        target.classList.add('active');
        document.querySelector('.intro-container').style.display = 'none';
    };

    svg.addEventListener('click', function() {
        if (animationStarted) return;
        animationStarted = true;
        document.querySelectorAll('.arrow').forEach(a => a.classList.add('shrunk'));
        document.querySelector('#arrowhead polygon').style.fill = "#4a148c";
        setTimeout(() => {
            outerCircle.style.opacity = "1";
            outerCircle.classList.add('clickable');
            labels.forEach(l => l.classList.add('visible'));
        }, 5000);
    });

    outerCircle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (outerCircle.classList.contains('clickable')) openSection(sections.contact);
    });

    document.querySelector('.order-label').addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        if (animationStarted) openSection(sections.order);
    });

    document.querySelector('.chaos-label').addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        if (animationStarted) openSection(sections.chaos);
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            Object.values(sections).forEach(s => s.classList.remove('active'));
            document.querySelector('.intro-container').style.display = 'flex';
        });
    });
};
