function selectTab(tab) {
  let resultsTable = document.getElementById("resultsTable");
  resultsTable.innerHTML = "";

  let options = document.getElementsByClassName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove("active");
  }

  let inputs = document.getElementsByClassName("inputs");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("active");
  }

  let activeTab = document.getElementById(tab);
  activeTab.classList.add("active");

  let activeForm = document.getElementById(tab + "Form");
  activeForm.classList.add("active");
}

function queue(type) {
  let htmlString = "<table> <th colspan='2'> Resultados </th>";
  switch (type) {
    case "mm1":
      let form = document.getElementById(type + "Form");
      a = parseFloat(form.elements.namedItem("a").value);
      u = parseFloat(form.elements.namedItem("u").value);

      ws = form.elements.namedItem("ws").value;
      wc = form.elements.namedItem("wc").value;
      
      pn = form.elements.namedItem("pn").value;
      pnc = form.elements.namedItem("pnc").value;

      const m = new mm1(a, u);
      let general = m.general();
      htmlString += `
      <tr> <td>ρ</td><td>${general.ro.toFixed(5)}</td></tr>
      <tr> <td>p0</td><td>${general.p0.toFixed(5)}</td></tr>
      <tr> <td>lq</td><td>${general.lq.toFixed(5)}</td></tr>
      <tr> <td>l</td><td>${general.l.toFixed(5)}</td></tr>
      <tr> <td>wq</td><td>${general.wq.toFixed(5)}</td></tr>
      <tr> <td>w</td><td>${general.w.toFixed(5)}</td></tr>
      `;
      if (ws == "" ? wc != "" : wc == "") {
        alert("Completa ambos campos de servicio");
      } else if (ws != "" && wc != "") {
        const totalCost = m.totalCost(parseFloat(wc), parseFloat(ws));
        htmlString += `<tr><td>Cost</td><td>${totalCost.toFixed(5)}</td></tr>`;
      }

      if(pn!=""){
        htmlString += `<tr><td>p(${pn})</td><td>${m.pn(pn).toFixed(5)}</td></tr>`;
      }
      if(pnc!=""){
        htmlString += `<tr><td>p acc(${pnc})</td><td>${m.pnCumulative(pnc).toFixed(5)}</td></tr>`;
      }
      break;

  }
  htmlString += "</table>";
  let resultsTable = document.getElementById("resultsTable");
  resultsTable.innerHTML = "";
  resultsTable.innerHTML = htmlString;
  return false;
}
