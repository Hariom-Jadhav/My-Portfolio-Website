document.documentElement.classList.add("js");

/* 1. Typing effect for the code card (the hero animation) */
const lines = [
  [["public class ", "k"], ["Hariom", "t"], [" {", ""]],
  [["  String ", "t"], ["role = ", ""], ['"Java Backend Developer"', "s"], [";", ""]],
  [["  String[] ", "t"], ["stack = {", ""], ['"Java", "JDBC", "MySQL", "AWS"', "s"], ["};", ""]],
  [["  String ", "t"], ["college = ", ""], ['"CSMSS Chh. Shahu College"', "s"], [";", ""]],
  [["  String ", "t"], ["interests = ", ""], ['"ML, DSA, Cloud"', "s"], [";", ""]],
  [["  boolean ", "k"], ["openToWork = ", ""], ["true", "k"], [";", ""]],
  [["}", ""]],
];

const codeEl = document.getElementById("code");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeCode() {
  const flat = [];
  lines.forEach((line, i) => {
    line.forEach(([text, cls]) => flat.push([text, cls]));
    if (i < lines.length - 1) flat.push(["\n", ""]);
  });

  if (reduceMotion) {
    flat.forEach(([text, cls]) => {
      const s = document.createElement("span");
      s.className = cls; s.textContent = text; codeEl.appendChild(s);
    });
    return;
  }

  let seg = 0, ch = 0, span = null;
  (function tick() {
    if (seg >= flat.length) return;
    const [text, cls] = flat[seg];
    if (ch === 0) {
      span = document.createElement("span");
      span.className = cls;
      codeEl.appendChild(span);
    }
    span.textContent += text[ch++];
    if (ch >= text.length) { seg++; ch = 0; }
    setTimeout(tick, 28);
  })();
}
setTimeout(typeCode, 500);

/* 2. Fade sections in as you scroll */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("show"); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* 3. Scroll progress bar + active nav link */
const progress = document.getElementById("progress");
const navLinks = document.querySelectorAll("nav a");
const sections = [...navLinks].map((a) => document.querySelector(a.getAttribute("href")));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (scrollY / max) * 100 + "%";

  let current = 0;
  sections.forEach((sec, i) => { if (sec.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
  navLinks.forEach((a, i) => a.classList.toggle("active", i === current && scrollY > 200));
}, { passive: true });

/* 4. Mobile menu */
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.forEach((a) => a.addEventListener("click", () => {
  menu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", false);
}));

/* 5. Footer year */
document.getElementById("year").textContent = new Date().getFullYear();