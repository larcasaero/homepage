/* =========================================================
   Interações do website pessoal
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ---------- Menu mobile ----------
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  navToggle.addEventListener("click", () => {
    const aberto = nav.classList.toggle("nav--aberto");
    navToggle.setAttribute("aria-expanded", String(aberto));
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav--aberto");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ---------- Header com sombra ao rolar + barra de progresso ----------
  const header = document.getElementById("header");
  const progressBar = document.getElementById("progressBar");

  function aoRolar() {
    const y = window.scrollY;
    header.classList.toggle("header--ativo", y > 10);

    const alturaDocumento = document.documentElement.scrollHeight - window.innerHeight;
    const progresso = alturaDocumento > 0 ? (y / alturaDocumento) * 100 : 0;
    progressBar.style.width = progresso + "%";
  }

  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  // ---------- Destaque da seção ativa no menu ----------
  const secoes = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav__link");

  const observadorSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        const id = entrada.target.id;
        links.forEach(link => {
          link.classList.toggle(
            "nav__link--ativo",
            link.getAttribute("href") === "#" + id
          );
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  secoes.forEach(secao => observadorSecoes.observe(secao));

  // ---------- Animação reveal ao entrar na viewport ----------
  const elementosReveal = document.querySelectorAll(".reveal");

  const observadorReveal = new IntersectionObserver((entradas, obs) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("reveal--visivel");
        obs.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementosReveal.forEach(el => observadorReveal.observe(el));

  // ---------- Animação das barras de conhecimento ----------
  const barras = document.querySelectorAll(".skill__barra span");

  const observadorBarras = new IntersectionObserver((entradas, obs) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("barra--animada");
        obs.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.5 });

  barras.forEach(barra => observadorBarras.observe(barra));

  // ---------- Imagens ausentes → mostra o fallback (degradê/emoji) ----------
  document.addEventListener("error", (evento) => {
    const alvo = evento.target;
    if (alvo && alvo.tagName === "IMG") {
      alvo.classList.add("img-quebrada");
    }
  }, true);

  // ---------- Light / dark theme ----------
  const themeToggle = document.getElementById("themeToggle");
  const raiz = document.documentElement;

  function atualizarIconeTema() {
    themeToggle.textContent = raiz.getAttribute("data-tema") === "escuro" ? "☀️" : "🌙";
  }

  // Icon follows the theme restored by the inline script in <head>
  atualizarIconeTema();

  themeToggle.addEventListener("click", () => {
    const escuro = raiz.getAttribute("data-tema") === "escuro";
    if (escuro) {
      raiz.removeAttribute("data-tema");
    } else {
      raiz.setAttribute("data-tema", "escuro");
    }
    try {
      localStorage.setItem("tema", escuro ? "claro" : "escuro");
    } catch (e) {}
    atualizarIconeTema();
  });

  // ---------- Ano do rodapé ----------
  document.getElementById("ano").textContent = new Date().getFullYear();
});
