document.addEventListener('DOMContentLoaded', () => {
    const boxContainer = document.getElementById('box-container');
    const box = boxContainer.querySelector('.box');
    
    let isOpen = false;

    const sikeOverlay = document.getElementById('sike-overlay');

    boxContainer.addEventListener('click', () => {
        if (!isOpen) {
            box.classList.add('open');
            isOpen = true;
            createConfetti();

            // After 2 seconds, show the sike message
            setTimeout(() => {
                sikeOverlay.classList.add('active');
            }, 2000);
        }
    });

    // Click sike overlay to dismiss
    sikeOverlay.addEventListener('click', () => {
        sikeOverlay.classList.remove('active');
    });

    function createConfetti() {
        const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#fca5a5'];
        
        for (let i = 0; i < 70; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random color
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Determine starting point based on the box
            const boxRect = box.getBoundingClientRect();
            // Start around the center of the box opening
            const startX = boxRect.left + boxRect.width / 2;
            const startY = boxRect.top + 50; 
            
            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;
            
            // Randomize shape sometimes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }

            document.body.appendChild(confetti);
            
            // Random angle and velocity for explosion effect
            const angle = Math.random() * Math.PI * 2;
            // Bias upwards
            const upwardBias = Math.random() * -100 - 50;
            const velocity = 100 + Math.random() * 250;
            
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity + upwardBias; 
            
            confetti.animate([
                { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) rotate(${Math.random() * 1080}deg) scale(1)`, opacity: 1, offset: 0.7 },
                { transform: `translate(${tx}px, ${ty + 150}px) rotate(${Math.random() * 1080}deg) scale(0)`, opacity: 0 }
            ], {
                duration: 1500 + Math.random() * 1500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fill: 'forwards'
            });
            
            // Clean up DOM
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
});
