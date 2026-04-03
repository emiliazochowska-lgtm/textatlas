function searchInText(q){
  const body = document.getElementById('readingBody');
  const text = body.innerText.toLowerCase();
  console.log('search', q, text.includes(q.toLowerCase()));
}
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight))*100;
  const bar = document.getElementById('readingProgress');
  if (bar) bar.value = pct;
});
function exportCSV(){
  const rows = [];
  for (let i=0;i<localStorage.length;i++){
    const k = localStorage.key(i);
    if(k.startsWith('answer:')) rows.push([k, localStorage.getItem(k)]);
  }
  let csv = 'key,value\n' + rows.map(r=>r.map(x=> `"${x.replaceAll('"','""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'answers.csv';
  a.click();
}
