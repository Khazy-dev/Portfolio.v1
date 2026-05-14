/* 1. FONDO ANIMADO */
(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let stars = [], petals = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    buildStars();
    buildPetals();
  }

  function buildStars() {
    stars = [];
    const n = Math.floor((canvas.width * canvas.height) / 5500);
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() < .1 ? 2 : 1,
        a: Math.random() * .6 + .2,
        p: Math.random() * Math.PI * 2,
        c: ['#ffdde8','#ffb3ce','#e8608a','#c94a72'][Math.floor(Math.random()*4)]
      });
    }
  }

  function buildPetals() {
    petals = [];
    const n = Math.floor(canvas.width / 24);
    for (let i = 0; i < n; i++) petals.push(makePetal(true));
  }

  function makePetal(rndY) {
    return {
      x:  Math.random() * canvas.width,
      y:  rndY ? Math.random() * canvas.height : -8,
      sz: Math.random() < .35 ? 4 : 2,
      vy: Math.random() * .45 + .18,
      vx: (Math.random() - .5) * .35,
      sw: Math.random() * Math.PI * 2,
      ss: Math.random() * .007 + .003,
      a:  Math.random() * .3 + .08,
      c:  ['#ffc8e0','#ffb3ce','#e8608a','#ffdde8','#c94a72'][Math.floor(Math.random()*5)]
    };
  }

  const blobs = [
    { cx:.14, cy:.18, r:.3,  col:'rgba(232,96,138,.06)'  },
    { cx:.82, cy:.12, r:.22, col:'rgba(255,122,173,.045)'},
    { cx:.5,  cy:.52, r:.38, col:'rgba(201,74,114,.05)'  },
    { cx:.08, cy:.72, r:.22, col:'rgba(255,179,206,.04)' },
    { cx:.88, cy:.78, r:.26, col:'rgba(232,96,138,.05)'  },
    { cx:.35, cy:.88, r:.18, col:'rgba(185,60,100,.04)'  },
  ];

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const g = ctx.createLinearGradient(0, 0, canvas.width * .5, canvas.height);
    g.addColorStop(0, '#130810');
    g.addColorStop(1, '#1c0c15');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    blobs.forEach(b => {
      const gr = ctx.createRadialGradient(
        b.cx * canvas.width, b.cy * canvas.height, 0,
        b.cx * canvas.width, b.cy * canvas.height,
        b.r * Math.min(canvas.width, canvas.height)
      );
      gr.addColorStop(0, b.col);
      gr.addColorStop(1, 'transparent');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    stars.forEach(s => {
      ctx.globalAlpha = s.a * (.4 + .6 * Math.sin(t * .0008 + s.p));
      ctx.fillStyle   = s.c;
      ctx.fillRect(Math.round(s.x), Math.round(s.y), s.s, s.s);
    });

    petals.forEach((p, i) => {
      p.sw += p.ss;
      p.x  += p.vx + Math.sin(p.sw) * .5;
      p.y  += p.vy;
      ctx.globalAlpha = p.a;
      ctx.fillStyle   = p.c;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.sz, p.sz);
      if (p.y > canvas.height + 8) petals[i] = makePetal(false);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  requestAnimationFrame(draw);
  window.addEventListener('resize', resize);
})();


/* 2. TYPEWRITER */
(function() {
  const el = document.getElementById('typewriter');
  const phrases = [
    'frontend developer',
    'chill',
    'game fan ♡',
    'code & coffee ☕',
    'Adaptable'
  ];
  let pi=0, ci=0, del=false;

  function type(){
    const cur = phrases[pi];
    if (!del) {
      el.textContent = cur.substring(0, ci+1); ci++;
      if (ci === cur.length){ del=true; setTimeout(type, 1800); return; }
      setTimeout(type, 90);
    } else {
      el.textContent = cur.substring(0, ci-1); ci--;
      if (ci === 0){ del=false; pi=(pi+1)%phrases.length; setTimeout(type, 400); return; }
      setTimeout(type, 50);
    }
  }
  type();
})();


/* 3. TERMINAL */
(function() {
  const out = document.getElementById('terminal-output');
  const lines = [
    { t:'$ whoami',                                          c:'t-prompt',  d:0    },
    { t:'→ Vanesa — frontend dev ',            c:'t-out',     d:600  },
    { t:'&nbsp;',                                            c:'',          d:900  },
    { t:'$ cat contacto.txt',                                c:'t-prompt',  d:1100 },
    { t:'# ¿tienes un proyecto en mente?',                   c:'t-comment', d:1700 },
    { t:'email: <a href="mailto:karla2.dev@gmail.com" class="t-val">karla2.dev@gmail.com</a>', c:'t-out', d:2000 },
   
    { t:'github: <a href="https://github.com/Khazy-dev" target="_blank" rel="noopener" class="t-link">github.com/Khazy-dev</a>', c:'t-out', d:2300 },

    { t:'&nbsp;',                                            c:'',          d:2600 },
    { t:'$ echo "disponible para proyectos"',                c:'t-prompt',  d:2800 },
    { t:'✦ ¡sí! siempre abierta a proyectos ♡',         c:'t-out',     d:3400 },
    { t:'&nbsp;',                                            c:'',          d:3700 },
    { t:'$ _',                                               c:'t-prompt',  d:3900 },
  ];

  lines.forEach(({ t, c, d }) => {
    setTimeout(() => {
      const s = document.createElement('span');
      s.className = `terminal-line ${c}`;
      s.innerHTML = t;
      out.appendChild(s);
      out.scrollTop = out.scrollHeight;
    }, d);
  });
})();


/* 4. SPARKLES — evita disparar sobre cards de proyecto para no interferir con clic */
(function() {
  const sym = ['✦','♡','★','✧','◆','♪','˚','✿'];
  const col = ['#ff7aad','#ffb3ce','#e8608a','#ffdde8','#ff3d85','#c94a72'];

  document.addEventListener('click', e => {
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('div');
      el.className = 'sparkle';
      el.textContent = sym[Math.floor(Math.random() * sym.length)];
      el.style.left  = (e.clientX + (Math.random() - .5) * 44) + 'px';
      el.style.top   = (e.clientY + (Math.random() - .5) * 44) + 'px';
      el.style.color = col[Math.floor(Math.random() * col.length)];
      el.style.animationDuration = (Math.random() * .7 + .7) + 's';
      el.style.animationDelay   = (Math.random() * .15) + 's';
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
  });
})();


/* 5. HAMBURGER */
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.getElementById('nav-menu');

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }
  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
  }

  toggle.addEventListener('click', () => {
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('click', e => {
    if (!e.target.closest('nav')) closeMenu();
  });
})();