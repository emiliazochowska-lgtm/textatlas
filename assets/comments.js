async function loadComments() {
  const path = '/data/comments' + window.location.pathname.replace(/\/$/, '') + '.json';
  try {
    const res = await fetch(path);
    const comments = await res.json();
    document.querySelectorAll('.annotated').forEach(el => {
      const id = el.dataset.comment;
      const text = comments[id];
      el.addEventListener('mouseenter', () => {
        const card = document.createElement('div');
        card.className = 'hover-card';
        card.textContent = text;
        card.dataset.hover = '1';
        el.appendChild(card);
      });
      el.addEventListener('mouseleave', () => {
        const card = el.querySelector('[data-hover="1"]');
        if (card) card.remove();
      });
    });
  } catch(e) {}
}
function savePrivateAnswer(btn){
  const form = btn.closest('form');
  const val = form.querySelector('textarea').value;
  localStorage.setItem('answer:' + form.dataset.textId, val);
  alert('Saved locally. Replace with Firebase sync for private cloud storage.');
}
document.addEventListener('DOMContentLoaded', loadComments);
