const deleteBtn = document.querySelectorAll('.deleteButton');

for (const button of deleteBtn) {
  button.addEventListener('click', (e) => {
    fetch(`/ulkomaiset_levyt/levyt`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        aname: e.target.dataset.aname,
        rname: e.target.dataset.rname,
        price: e.target.dataset.price,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(() => {
        window.location.reload();
      });
  });
}