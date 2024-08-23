function sortTable(key) {
  const table = document.getElementById("emissionTable");
  const rows = Array.from(table.rows).slice(1);
  const indexMap = {
    'country': 0,
    'company': 1,
    'emissions': 2
  };

  const index = indexMap[key];
  const direction = table.getAttribute("data-sort-direction") === "ascending" ? "descending" : "ascending";

  rows.sort((a, b) => {
    const cellA = a.cells[index].innerText;
    const cellB = b.cells[index].innerText;

    if (key === 'emissions') {
      return direction === "ascending" ? cellA - cellB : cellB - cellA;
    }

    if (cellA < cellB) {
      return direction === "ascending" ? -1 : 1;
    }
    if (cellA > cellB) {
      return direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  table.setAttribute("data-sort-direction", direction);

  const tbody = table.tBodies[0];
  tbody.append(...rows);
}

function filterTable() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const table = document.getElementById('emissionTable');
  const tr = table.getElementsByTagName('tr');

  for (let i = 1; i < tr.length; i++) {
    const tdCountry = tr[i].getElementsByTagName('td')[0];
    const tdCompany = tr[i].getElementsByTagName('td')[1];
    if (tdCountry || tdCompany) {
      const txtValueCountry = tdCountry.textContent || tdCountry.innerText;
      const txtValueCompany = tdCompany.textContent || tdCompany.innerText;
      if (txtValueCountry.toLowerCase().includes(filter) || txtValueCompany.toLowerCase().includes(filter)) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}


function setTextDirection() {
  const htmlElement = document.documentElement;
  const language = navigator.language || navigator.userLanguage;

  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

  if (rtlLanguages.some(lang => language.startsWith(lang))) {
    htmlElement.setAttribute('dir', 'rtl');
  } else {
    htmlElement.setAttribute('dir', 'ltr');
  }
}
window.onload = setTextDirection;
