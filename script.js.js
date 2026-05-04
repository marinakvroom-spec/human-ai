window.onload = function() {
    const svg = document.getElementById('chaos-symbol');
    const labels = document.querySelectorAll('.label');
    const outerCircle = document.getElementById('outer-circle');
    let animationStarted = false;

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
        setTimeout(() => {
            outerCircle.style.opacity = "1";
            outerCircle.classList.add('clickable');
            labels.forEach(l => l.classList.add('visible'));
        }, 1000); // Для тесту поставив 1 секунду
    });

    outerCircle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (outerCircle.classList.contains('clickable')) openSection(sections.contact);
    });

    document.querySelector('.order-label').onclick = () => openSection(sections.order);
    document.querySelector('.chaos-label').onclick = () => openSection(sections.chaos);

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.onclick = () => {
            Object.values(sections).forEach(s => s.classList.remove('active'));
            document.querySelector('.intro-container').style.display = 'flex';
        };
    });
};