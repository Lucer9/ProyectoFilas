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
  let form = document.getElementById(type + "Form");
  let m;
  let general;

  switch (type) {
    case "mm1":
      a = parseFloat(form.elements.namedItem("a").value);
      u = parseFloat(form.elements.namedItem("u").value);

      ws = form.elements.namedItem("ws").value;
      wc = form.elements.namedItem("wc").value;

      pn = form.elements.namedItem("pn").value;
      pnc = form.elements.namedItem("pnc").value;

      m = new mm1(a, u);
      general = m.general();
      htmlString += `
      <tr> <td>ρ</td><td>${general.ro.toFixed(5)}</td></tr>
      <tr> <td>P0</td><td>${general.p0.toFixed(5)}</td></tr>
      <tr> <td>Lq</td><td>${general.lq.toFixed(5)}</td></tr>
      <tr> <td>L</td><td>${general.l.toFixed(5)}</td></tr>
      <tr> <td>Wq</td><td>${general.wq.toFixed(5)}</td></tr>
      <tr> <td>W</td><td>${general.w.toFixed(5)}</td></tr>
      `;
      if (ws == "" ? wc != "" : wc == "") {
        alert("Completa ambos campos de servicio");
      } else if (ws != "" && wc != "") {
        const totalCost = m.totalCost(parseFloat(wc), parseFloat(ws));
        htmlString += `<tr><td>Total cost</td><td>${totalCost.toFixed(5)}</td></tr>`;
      }

      if (pn != "") {
        htmlString += `<tr><td>P(${pn})</td><td>${m
          .pn(pn)
          .toFixed(5)}</td></tr>`;
      }
      if (pnc != "") {
        htmlString += `<tr><td>P acc(${pnc})</td><td>${m
          .pnCumulative(pnc)
          .toFixed(5)}</td></tr>`;
      }
      break;

    case "mms":
      a = parseFloat(form.elements.namedItem("a").value);
      u = parseFloat(form.elements.namedItem("u").value);
      s = parseFloat(form.elements.namedItem("s").value);

      ws = form.elements.namedItem("ws").value;
      wc = form.elements.namedItem("wc").value;

      pn = form.elements.namedItem("pn").value;
      pnc = form.elements.namedItem("pnc").value;

      m = new mms(a, u, s);
      general = m.general();
      htmlString += `
          <tr> <td>ρ</td><td>${general.ro.toFixed(5)}</td></tr>
          <tr> <td>P0</td><td>${general.p0.toFixed(5)}</td></tr>
          <tr> <td>Lq</td><td>${general.lq.toFixed(5)}</td></tr>
          <tr> <td>L</td><td>${general.l.toFixed(5)}</td></tr>
          <tr> <td>Wq</td><td>${general.wq.toFixed(5)}</td></tr>
          <tr> <td>W</td><td>${general.w.toFixed(5)}</td></tr>
          `;
      if (ws == "" ? wc != "" : wc == "") {
        alert("Completa ambos campos de servicio");
      } else if (ws != "" && wc != "") {
        const totalCost = m.totalCost(parseFloat(wc), parseFloat(ws));
        htmlString += `<tr><td>Total cost</td><td>${totalCost.toFixed(5)}</td></tr>`;
      }

      if (pn != "") {
        htmlString += `<tr><td>P(${pn})</td><td>${m
          .pn(pn)
          .toFixed(5)}</td></tr>`;
      }
      if (pnc != "") {
        htmlString += `<tr><td>P acc(${pnc})</td><td>${m
          .pnCumulative(pnc)
          .toFixed(5)}</td></tr>`;
      }
      break;
    case "mmsk":
      a = parseFloat(form.elements.namedItem("a").value);
      u = parseFloat(form.elements.namedItem("u").value);
      s = parseFloat(form.elements.namedItem("s").value);
      k = parseFloat(form.elements.namedItem("k").value);

      ws = form.elements.namedItem("ws").value;
      wc = form.elements.namedItem("wc").value;

      pn = form.elements.namedItem("pn").value;
      pnc = form.elements.namedItem("pnc").value;

      m = new mmsk(a, u, s, k);
      general = m.general();
      htmlString += `
          <tr> <td>ρ</td><td>${general.ro.toFixed(5)}</td></tr>
          <tr> <td>P0</td><td>${general.p0.toFixed(5)}</td></tr>
          <tr> <td>Lq</td><td>${general.lq.toFixed(5)}</td></tr>
          <tr> <td>L</td><td>${general.l.toFixed(5)}</td></tr>
          <tr> <td>Wq</td><td>${general.wq.toFixed(5)}</td></tr>
          <tr> <td>W</td><td>${general.w.toFixed(5)}</td></tr>
          `;
      if (ws == "" ? wc != "" : wc == "") {
        alert("Completa ambos campos de servicio");
      } else if (ws != "" && wc != "") {
        const totalCost = m.totalCost(parseFloat(wc), parseFloat(ws));
        htmlString += `<tr><td>Total cost</td><td>${totalCost.toFixed(5)}</td></tr>`;
      }

      if (pn != "") {
        htmlString += `<tr><td>P(${pn})</td><td>${m
          .pn(pn)
          .toFixed(5)}</td></tr>`;
      }
      if (pnc != "") {
        htmlString += `<tr><td>P acc(${pnc})</td><td>${m
          .pnCumulative(pnc)
          .toFixed(5)}</td></tr>`;
      }
      break;
    case "mg1":
      a = parseFloat(form.elements.namedItem("a").value);
      u = parseFloat(form.elements.namedItem("u").value);
      sd = parseFloat(form.elements.namedItem("sd").value);


      ws = form.elements.namedItem("ws").value;
      wc = form.elements.namedItem("wc").value;

      pn = form.elements.namedItem("pn").value;
      pnc = form.elements.namedItem("pnc").value;

      m = new mg1(a, u, sd);
      general = m.general();
      htmlString += `
          <tr> <td>ρ</td><td>${general.ro.toFixed(5)}</td></tr>
          <tr> <td>P0</td><td>${general.p0.toFixed(5)}</td></tr>
          <tr> <td>Lq</td><td>${general.lq.toFixed(5)}</td></tr>
          <tr> <td>L</td><td>${general.l.toFixed(5)}</td></tr>
          <tr> <td>Wq</td><td>${general.wq.toFixed(5)}</td></tr>
          <tr> <td>W</td><td>${general.w.toFixed(5)}</td></tr>
          `;
      if (ws == "" ? wc != "" : wc == "") {
        alert("Completa ambos campos de servicio");
      } else if (ws != "" && wc != "") {
        const totalCost = m.totalCost(parseFloat(wc), parseFloat(ws));
        htmlString += `<tr><td>Total cost</td><td>${totalCost.toFixed(5)}</td></tr>`;
      }

      if (pn != "") {
        htmlString += `<tr><td>P(${pn})</td><td>${m
          .pn(pn)
          .toFixed(5)}</td></tr>`;
      }
      if (pnc != "") {
        htmlString += `<tr><td>P acc(${pnc})</td><td>${m
          .pnCumulative(pnc)
          .toFixed(5)}</td></tr>`;
      }
      break;
  }
  htmlString += "</table>";
  let resultsTable = document.getElementById("resultsTable");
  resultsTable.innerHTML = "";
  resultsTable.innerHTML = htmlString;
  return false;
}
