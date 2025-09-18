// Espera o documento estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Animação de entrada para os cards de tiragem
    const cards = document.querySelectorAll('.tiragem-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Configura estado inicial dos cards
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Efeito de brilho nos cards ao passar o mouse
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 50px rgba(106, 13, 173, 0.6), 0 0 30px rgba(181, 131, 240, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(106, 13, 173, 0.2)';
        });
    });

    // Botão "Ver mais / Ver menos" para todas as descrições (sempre visível)
    const descricoes = document.querySelectorAll('.tiragem-card .descricao');
    descricoes.forEach(descricao => {
        const btn = document.createElement('button');
        btn.className = 'btn-toggle-desc';
        btn.type = 'button';

        // Define rótulo inicial com base no overflow atual
        const hasOverflow = descricao.scrollHeight > descricao.clientHeight + 2;
        btn.textContent = hasOverflow ? 'Ver mais' : 'Ver mais'; // padronizado para aparecer sempre

        // Inserir o botão logo após a descrição e antes do preço
        const precoEl = descricao.parentElement.querySelector('.preco');
        if (precoEl) {
            precoEl.parentElement.insertBefore(btn, precoEl);
        } else {
            descricao.parentElement.appendChild(btn);
        }

        btn.addEventListener('click', () => {
            const expanded = descricao.classList.toggle('expandida');
            btn.textContent = expanded ? 'Ver menos' : 'Ver mais';
        });
    });
    
    // Animação para o botão de WhatsApp destaque
    const btnDestaque = document.querySelector('.btn-whatsapp-destaque');
    if (btnDestaque) {
        // Pulsação sutil no botão destaque
        setInterval(() => {
            btnDestaque.style.transform = 'scale(1.02)';
            setTimeout(() => {
                btnDestaque.style.transform = 'scale(1)';
            }, 1000);
        }, 3000);
    }
    
    // Contador de visitas simples (usando localStorage)
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    // Adicionar efeito de digitação ao título principal
    const mainTitle = document.querySelector('header h1');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < text.length) {
                mainTitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Inicia animação após 500ms
        setTimeout(typeWriter, 500);
    }
    
    // Efeito parallax sutil no header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if (header && scrolled < 300) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
            header.style.opacity = 1 - (scrolled / 300);
        }
    });
    
    console.log('🔮 A Bússola do Louco - Site carregado com sucesso!');
    console.log(`📊 Visitas: ${visitCount}`);
});