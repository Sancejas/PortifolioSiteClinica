/**
 * LUMIÈRE SKIN CLINIC - JAVASCRIPT PRINCIPAL
 * Funcionalidades interativas completas para clínica de estética de alto padrão
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlideshow();
  initMobileMenu();
  initCategoryFilters();
  initTreatmentModal();
  initBeforeAfterSlider();
  initSkinQuiz();
  initBookingSystem();
  initClinicTourModal();
  initNewsletter();
  initHeaderScroll();
});

/* --- DADOS DOS PROCEDIMENTOS (CATÁLOGO CLÍNICO COMPLETO) --- */
const TREATMENTS_DATA = {
  'hydrafacial': {
    id: 'hydrafacial',
    name: 'HydraFacial Glow Experience',
    category: 'limpeza',
    price: 380,
    priceFormatted: 'R$ 380',
    duration: '50 minutos',
    downtime: 'Nenhum (Efeito Imediato)',
    discomfort: 'Zero desconforto (Relaxante)',
    image: 'assets/images/treatment-hydrafacial.jpg',
    description: 'Tecnologia patenteada de sucção e infusão que limpa profundamente, esfolia células mortas, extrai impurezas e infunde séruns ricos em antioxidantes, peptídeos e ácido hialurônico.',
    benefits: [
      'Desobstrução instantânea dos poros',
      'Luminosidade e viço no mesmo dia',
      'Hidratação profunda sem oleosidade',
      'Ideal para preparar a pele antes de grandes eventos'
    ]
  },
  'laser': {
    id: 'laser',
    name: 'Rejuvenescimento a Laser Fotona / Fracionado',
    category: 'rejuvenescimento',
    price: 650,
    priceFormatted: 'R$ 650',
    duration: '60 minutos',
    downtime: '1 a 3 dias (Leve rubor)',
    discomfort: 'Leve sensação de calor',
    image: 'assets/images/treatment-laser.jpg',
    description: 'Laser de alta precisão que atua nas camadas profundas da derme estimulando intensa produção de colágeno, refinando a textura e atenuando linhas finas e rugas.',
    benefits: [
      'Remodelamento estrutural de colágeno',
      'Redução de poros e uniformização do relevo',
      'Melhora expressiva da firmeza facial',
      'Tecnologia segura com recuperação controlada'
    ]
  },
  'acne': {
    id: 'acne',
    name: 'Protocolo Acne Control & Clareamento',
    category: 'acne',
    price: 320,
    priceFormatted: 'R$ 320',
    duration: '60 minutos',
    downtime: 'Nenhum a 24 horas',
    discomfort: 'Mínimo / Confortável',
    image: 'assets/images/treatment-acne.jpg',
    description: 'Abordagem dermatológica multifásica que combina higienização ultrassônica, peeling anti-inflamatório de baixa irritabilidade e fototerapia LED azul/vermelha para controle microbiológico.',
    benefits: [
      'Controle efetivo da bactéria causadora da acne',
      'Regulação da glândula sebácea',
      'Prevenção de manchas pós-inflamatórias',
      'Acalma a pele irritada e reduz vermelhidão'
    ]
  },
  'microneedling': {
    id: 'microneedling',
    name: 'Microagulhamento Robótico & Drug Delivery',
    category: 'rejuvenescimento',
    price: 450,
    priceFormatted: 'R$ 450',
    duration: '50 minutos',
    downtime: '24 a 48 horas (Vermelhidão leve)',
    discomfort: 'Totalmente anestesiado (Indolor)',
    image: 'assets/images/treatment-microneedling.jpg',
    description: 'Microperfurações cirúrgicas milimétricas associadas à infusão direta de fatores de crescimento epidérmico e vitaminas estéreis que regeneram a derme de dentro para fora.',
    benefits: [
      'Suavização de cicatrizes de acne e poros abertos',
      'Intenso estímulo de colágeno tipo I e III',
      'Uniformização da textura da pele',
      'Penetração 80% maior dos ativos biológicos'
    ]
  },
  'pigment': {
    id: 'pigment',
    name: 'Terapia para Melasma & Pigmentação',
    category: 'manchas',
    price: 390,
    priceFormatted: 'R$ 390',
    duration: '45 minutos',
    downtime: 'Nenhum (Sem descamação agressiva)',
    discomfort: 'Zero dor',
    image: 'assets/images/treatment-pigment.jpg',
    description: 'Protocolo de modulação de melanina seguro para todos os fototipos. Bloqueia a cascata inflamatória sem gerar efeito rebote, devolvendo tom homogêneo e iluminado.',
    benefits: [
      'Clareamento progressivo e seguro do melasma',
      'Atenuação de manchas solares e sardas',
      'Homogeneização do tom do rosto, colo e pescoço',
      'Blindagem antioxidante contra estresse térmico'
    ]
  },
  'filler': {
    id: 'filler',
    name: 'Harmonização Facial & Preenchimento Dérmico',
    category: 'injetaveis',
    price: 890,
    priceFormatted: 'R$ 890',
    duration: '60 minutos',
    downtime: '1 a 2 dias (Leve inchaço local)',
    discomfort: 'Anestesia local confortável',
    image: 'assets/images/treatment-filler.jpg',
    description: 'Aplicação médica personalizada de ácido hialurônico de alta pureza e bioestimuladores para restabelecer pontos de sustentação, contorno de mandíbula, malar e lábios esculpidos com naturalidade.',
    benefits: [
      'Resultados elegantes e completamente naturais',
      'Restauração de volume em pontos estratégicos de sustentação',
      'Hidratação profunda da matriz extracelular',
      'Executado estritamente por dermatologistas membros da SBD'
    ]
  }
};

/* --- 0. HERO SLIDESHOW (5 IMAGENS COM TRANSIÇÃO EM FADE A CADA 5 SEGUNDOS) --- */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let currentIndex = 0;
  const slideDuration = 5000; // Exatamente 5 segundos por imagem

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    currentIndex = index;
  }

  function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  // Inicializa o primeiro slide e transiciona continuamente a cada 5s
  showSlide(0);
  setInterval(nextSlide, slideDuration);
}

/* --- 1. HEADER SCROLL & NAVEGAÇÃO --- */
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 10px 30px rgba(34, 29, 24, 0.08)';
      header.style.background = 'rgba(252, 250, 247, 0.98)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(252, 250, 247, 0.95)';
    }
  });
}

/* --- 2. MENU MOBILE --- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const spans = toggleBtn.querySelectorAll('span');
    if (navMenu.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const spans = toggleBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

/* --- 3. FILTROS DE CATEGORIA DE TRATAMENTOS --- */
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.treatment-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'todos' || filter === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 4. MODAL DE DETALHES DO TRATAMENTO --- */
function initTreatmentModal() {
  const modal = document.getElementById('treatment-modal');
  const closeBtn = document.getElementById('close-treatment-modal');
  const viewDetailBtns = document.querySelectorAll('.view-treatment-btn');

  if (!modal) return;

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const treatId = btn.getAttribute('data-treatment-id');
      const data = TREATMENTS_DATA[treatId];
      if (!data) return;

      document.getElementById('modal-treat-img').src = data.image;
      document.getElementById('modal-treat-img').alt = data.name;
      document.getElementById('modal-treat-title').textContent = data.name;
      document.getElementById('modal-treat-desc').textContent = data.description;
      document.getElementById('modal-treat-duration').textContent = data.duration;
      document.getElementById('modal-treat-downtime').textContent = data.downtime;
      document.getElementById('modal-treat-discomfort').textContent = data.discomfort;

      const benefitsList = document.getElementById('modal-treat-benefits');
      benefitsList.innerHTML = '';
      data.benefits.forEach(b => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '8px';
        li.style.marginBottom = '6px';
        li.style.fontSize = '0.88rem';
        li.style.color = '#5F564D';
        li.innerHTML = `<span style="color: #B88B4A; font-weight: bold;">✓</span> ${b}`;
        benefitsList.appendChild(li);
      });

      const bookBtn = document.getElementById('modal-treat-book-btn');
      bookBtn.setAttribute('data-preselect', treatId);

      openModal(modal);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });

  // Botão dentro do modal de detalhes para abrir o agendamento
  const bookFromDetailBtn = document.getElementById('modal-treat-book-btn');
  if (bookFromDetailBtn) {
    bookFromDetailBtn.addEventListener('click', () => {
      const treatId = bookFromDetailBtn.getAttribute('data-preselect');
      closeModal(modal);
      openBookingModal(treatId);
    });
  }
}

/* --- 5. COMPARADOR ANTES E DEPOIS INTERATIVO --- */
function initBeforeAfterSlider() {
  const viewer = document.getElementById('ba-viewer');
  const afterWrap = document.getElementById('ba-after-wrap');
  const afterImg = document.getElementById('ba-after-img');
  const handle = document.getElementById('ba-handle');

  if (!viewer || !afterWrap || !afterImg || !handle) return;

  let isDragging = false;

  function updateSlider(xPos) {
    const rect = viewer.getBoundingClientRect();
    let offsetX = xPos - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    afterWrap.style.width = `${percentage}%`;
    afterImg.style.width = `${rect.width}px`;
    handle.style.left = `${percentage}%`;
  }

  function resizeImage() {
    const rect = viewer.getBoundingClientRect();
    afterImg.style.width = `${rect.width}px`;
  }

  window.addEventListener('resize', resizeImage);
  resizeImage();

  viewer.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // Suporte a Touch em Smartphones
  viewer.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  // Abas de Casos Clínicos
  const tabBtns = document.querySelectorAll('.ba-tab-btn');
  const casesData = {
    'melasma': {
      before: 'assets/images/before-after-before.jpg',
      after: 'assets/images/before-after-after.jpg',
      caption: 'Caso 1: Clareamento de Melasma & Pigmentação Solar após 4 sessões de Terapia Lumière.'
    },
    'laser': {
      before: 'assets/images/treatment-laser.jpg',
      after: 'assets/images/hero-model.jpg',
      caption: 'Caso 2: Rejuvenescimento a Laser e Melhora do Relevo Cutâneo após 3 sessões.'
    },
    'acne': {
      before: 'assets/images/treatment-acne.jpg',
      after: 'assets/images/testimonial-2.jpg',
      caption: 'Caso 3: Controle de Acne Ativa e Cicatrizes com Protocolo Acne Control.'
    }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const caseKey = btn.getAttribute('data-case');
      const caseItem = casesData[caseKey];
      if (caseItem) {
        document.getElementById('ba-before-img').src = caseItem.before;
        document.getElementById('ba-after-img').src = caseItem.after;
        document.getElementById('ba-caption-text').textContent = caseItem.caption;
        resizeImage();
      }
    });
  });
}

/* --- 6. QUIZ DE DIAGNÓSTICO DIGITAL DE PELE --- */
function initSkinQuiz() {
  const quizSteps = document.querySelectorAll('.quiz-step');
  const progressFill = document.getElementById('quiz-progress-fill');
  const answers = { goal: '', skinType: '', intensity: '' };

  if (!quizSteps.length) return;

  function goToStep(stepIndex) {
    quizSteps.forEach(step => step.classList.remove('active'));
    quizSteps[stepIndex].classList.add('active');
    
    // Atualiza barra de progresso
    const percent = ((stepIndex + 1) / quizSteps.length) * 100;
    if (progressFill) progressFill.style.width = `${percent}%`;
  }

  // Opções do Passo 1
  document.querySelectorAll('.quiz-step[data-step="1"] .quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-step[data-step="1"] .quiz-option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      answers.goal = btn.getAttribute('data-value');
      setTimeout(() => goToStep(1), 250);
    });
  });

  // Opções do Passo 2
  document.querySelectorAll('.quiz-step[data-step="2"] .quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-step[data-step="2"] .quiz-option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      answers.skinType = btn.getAttribute('data-value');
      setTimeout(() => goToStep(2), 250);
    });
  });

  // Opções do Passo 3
  document.querySelectorAll('.quiz-step[data-step="3"] .quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-step[data-step="3"] .quiz-option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      answers.intensity = btn.getAttribute('data-value');
      
      calculateQuizResult(answers);
      setTimeout(() => goToStep(3), 250);
    });
  });

  // Botões de Voltar
  document.querySelectorAll('.quiz-back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = parseInt(btn.getAttribute('data-to-step'), 10);
      goToStep(current);
    });
  });

  // Reiniciar Quiz
  const restartBtn = document.getElementById('quiz-restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
      goToStep(0);
    });
  }
}

function calculateQuizResult(answers) {
  let recKey = 'hydrafacial';

  if (answers.goal === 'manchas') {
    recKey = 'pigment';
  } else if (answers.goal === 'acne') {
    recKey = 'acne';
  } else if (answers.goal === 'linhas') {
    recKey = answers.intensity === 'avancada' ? 'filler' : 'laser';
  } else {
    recKey = 'hydrafacial';
  }

  const rec = TREATMENTS_DATA[recKey];
  const titleElem = document.getElementById('quiz-result-title');
  const descElem = document.getElementById('quiz-result-desc');
  const recImg = document.getElementById('quiz-rec-img');
  const recName = document.getElementById('quiz-rec-name');
  const recDesc = document.getElementById('quiz-rec-desc');
  const recBtn = document.getElementById('quiz-rec-book-btn');

  if (titleElem) titleElem.textContent = `Protocolo Personalizado: ${rec.name}`;
  if (descElem) descElem.textContent = `Com base nas suas respostas para foco em ${answers.goal} e pele ${answers.skinType}, este é o tratamento de maior eficácia e conforto indicado pela equipe Lumière.`;
  if (recImg) recImg.src = rec.image;
  if (recName) recName.textContent = rec.name;
  if (recDesc) recDesc.textContent = rec.description;
  if (recBtn) {
    recBtn.onclick = () => openBookingModal(recKey);
  }
}

/* --- 7. SISTEMA DE AGENDAMENTO INTELIGENTE --- */
function initBookingSystem() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('close-booking-modal');
  const openButtons = document.querySelectorAll('.open-booking-modal');
  const selectTreatment = document.getElementById('booking-select-treatment');
  const summaryOriginalPrice = document.getElementById('summary-original-price');
  const summaryFinalPrice = document.getElementById('summary-final-price');
  const dateInput = document.getElementById('booking-date');
  const bookingForm = document.getElementById('booking-form');

  if (!modal) return;

  // Define data mínima como hoje
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselect = btn.getAttribute('data-preselect') || 'hydrafacial';
      openBookingModal(preselect);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });

  if (selectTreatment) {
    selectTreatment.addEventListener('change', () => {
      updateBookingPricing();
    });
  }

  function updateBookingPricing() {
    const val = selectTreatment.value;
    const item = TREATMENTS_DATA[val];
    if (item && summaryOriginalPrice && summaryFinalPrice) {
      const orig = item.price;
      const discounted = Math.round(orig * 0.8); // 20% OFF
      summaryOriginalPrice.textContent = `R$ ${orig}`;
      summaryFinalPrice.textContent = `R$ ${discounted}`;
    }
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const treatKey = selectTreatment.value;
      const item = TREATMENTS_DATA[treatKey];
      const patientName = document.getElementById('booking-name').value;
      const patientPhone = document.getElementById('booking-phone').value;
      const patientDate = document.getElementById('booking-date').value;
      const patientTime = document.getElementById('booking-time').value;
      const specialist = document.getElementById('booking-specialist').value;

      closeModal(modal);

      // Exibir modal de confirmação
      showBookingConfirmation({
        name: patientName,
        phone: patientPhone,
        date: patientDate,
        time: patientTime,
        treatment: item ? item.name : 'Procedimento Lumière',
        specialist: specialist,
        price: item ? Math.round(item.price * 0.8) : 300
      });
    });
  }
}

function openBookingModal(preselectedKey = 'hydrafacial') {
  const modal = document.getElementById('booking-modal');
  const select = document.getElementById('booking-select-treatment');
  if (select && preselectedKey) {
    select.value = preselectedKey;
    const event = new Event('change');
    select.dispatchEvent(event);
  }
  openModal(modal);
}

function showBookingConfirmation(data) {
  const confirmModal = document.getElementById('confirmation-modal');
  if (!confirmModal) return;

  const code = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('confirm-code').textContent = code;
  document.getElementById('confirm-patient').textContent = data.name;
  document.getElementById('confirm-treatment').textContent = data.treatment;
  document.getElementById('confirm-datetime').textContent = `${formatDateBR(data.date)} às ${data.time}`;
  document.getElementById('confirm-price').textContent = `R$ ${data.price} (com 20% OFF)`;
  document.getElementById('confirm-specialist').textContent = data.specialist;

  // Botão para enviar WhatsApp
  const waBtn = document.getElementById('confirm-whatsapp-btn');
  if (waBtn) {
    const textMsg = encodeURIComponent(
      `Olá, Lumière Skin Clinic! Gostaria de confirmar meu agendamento código ${code}:\n` +
      `Paciente: ${data.name}\n` +
      `Procedimento: ${data.treatment}\n` +
      `Data: ${formatDateBR(data.date)} às ${data.time}\n` +
      `Especialista: ${data.specialist}\n` +
      `Valor com desconto de boas-vindas: R$ ${data.price}`
    );
    waBtn.href = `https://wa.me/5511987654321?text=${textMsg}`;
  }

  openModal(confirmModal);

  const closeConfirm = document.getElementById('close-confirmation-modal');
  if (closeConfirm) {
    closeConfirm.onclick = () => closeModal(confirmModal);
  }
  confirmModal.onclick = (e) => {
    if (e.target === confirmModal) closeModal(confirmModal);
  };
}

/* --- 8. TOUR VIRTUAL / VÍDEO DA CLÍNICA --- */
function initClinicTourModal() {
  const tourModal = document.getElementById('tour-modal');
  const openTourBtn = document.getElementById('open-tour-modal');
  const closeTourBtn = document.getElementById('close-tour-modal');

  if (!tourModal || !openTourBtn) return;

  openTourBtn.addEventListener('click', () => {
    openModal(tourModal);
  });

  if (closeTourBtn) {
    closeTourBtn.addEventListener('click', () => closeModal(tourModal));
  }

  tourModal.addEventListener('click', (e) => {
    if (e.target === tourModal) closeModal(tourModal);
  });
}

/* --- 9. NEWSLETTER & NOTIFICAÇÕES TOAST --- */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value.trim()) {
      showToast('✨ Inscrição confirmada com sucesso! Você receberá novidades e mimos exclusivos.');
      input.value = '';
    }
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* --- HELPERS DE MODAL --- */
function openModal(modal) {
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function formatDateBR(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}
