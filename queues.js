const factorial = (n) => {
  let fact = 1;
  for (let i = 1; i < n + 1; i++) {
    fact *= i;
  }
  return fact;
};

/* Markovian Markovian s=1*/
const mm1 = (a, u) => {
  const ws = 1 / (u - a); //tiempo de una persona
  const lq = (a * a) / (u * (u - a)); // cantidad promedio de clientes
  const wq = lq / a; // tiempo promedio en la cola
  const d = a / u; // factor de uso del sistema, probabilidad de que un cliente tiene que esperar
  const pn = Math.pow(d, n) * p0; //probilidad de nclientes
  const p0 = 1 - d; // cola  vacia

  return {
    d,
    p0,
    pn,
    lq,
    ls,
    wq,
    ws,
  };
};

/* Example usage */
/* console.log(mm1(2, 3)); */

//----------------------------------------------------------
/* Markovian Markovian s<1*/
const mms = (a, u, s) => {
  //factor de utilizacion
  const d = a / (s * u);
  let n = 0;
  // p de que no haya unidades en el sistema
  let p0Part1 = mmsp0(a, u, s);
  let p0Part2 = Math.pow(a / u, s) / factorial(s);
  let p0Part3 = (s * u) / (s * u - a);
  const p0 = 1 / (p0Part1 + p0Part2 * p0Part3);

  //Probabilidad de haya n unidades en cola
  let pn;
  if (n <= s) {
    pn = (Math.pow(a / u, n) / factorial(n)) * p0;
  } else {
    pn = (Math.pow(a / u, n) / factorial(s)) * Math.pow(s, n - s) * p0;
  }

  //Ni la menor idea que sea Cn, pero viene en la presentacion de bolo
  let cn;
  if (n <= s) {
    cn = Math.pow(a / u, n) / factorial(n);
  } else {
    cn = (Math.pow(a / u, n) / factorial(s)) * Math.pow(s, n - s);
  }

  //Tiempo promedio de unidades en cola
  const lq =
    ((Math.pow(a / u, s) * (u * a)) /
      (factorial(s - 1) * Math.pow(s * u - a, 2))) *
    p0;

  //Tiempo promedio de unidades en el sistema
  const ls = lq + a / u;

  //Tiempo promedio que una unidad pasa en la cola
  const wq = lq / a;

  //Tiempo promoedio que una unidad pasa en el sistema
  const ws = wq + 1 / u;

  //Probabilidad de que una unidad que llega tenga que esperar por el servicio
  const pw = (Math.pow(a / u, s) / factorial(s)) * ((s * u) / (s * u - a)) * p0;

  return {
    d,
    p0,
    pn,
    lq,
    ls,
    wq,
    ws,
    pw,
  };
};

const mmsp0 = (a, u, s) => {
  let sum = 0;
  for (let n = 0; n < s+1; n++) {
    sum += Math.pow(a / u, n) / factorial(n);
  }
  return sum;
};

// Example usage
// console.log(mms(2, 3, 2));
// Foto del ejemplo que si sirve: https://ibb.co/RSknMZc

//----------------------------------------------------------
/* Markovian Markovian s<1 con limite K de usuarios */
const mmsk = (a, u, s, k) => {
  let n = 0;

  //factor de utilizacion
  const d = a / (s * u);

  // p de que no haya unidades en el sistema
  let p0Part1 = mmsp03(a, u, s);
  let p0Part2 = Math.pow(a / u, s) / factorial(s);
  let p0Part3 = mmsp02(a, u, s, k);
  const p0 = 1 / (p0Part1 + (p0Part2 * p0Part3));
  //Probabilidad de haya n unidades en cola
  let pn;
  if (n <= s) {
    pn = (Math.pow(a / u, n) / factorial(n)) * p0;
  } else {
    pn = (Math.pow(a / u, n) / factorial(s)) * Math.pow(s, n - s) * p0;
  }
  if (n > k) {
    pn = 0;
  }

  //Ni la menor idea que sea Cn, pero viene en la presentacion de bolo
  let cn;
  if (n <= s) {
    cn = Math.pow(a / u, n) / factorial(n);
  } else {
    cn = (Math.pow(a / u, n) / factorial(s)) * Math.pow(s, n - s);
  }

  if (n > k) {
    cn = 0;
  }

  //Tiempo promedio de unidades en cola
  const lq =
    ((Math.pow(a / u, s) * (u * a)) /
      (factorial(s - 1) * Math.pow(s * u - a, 2))) *
    p0 *
    (1 - Math.pow(d, k - s) - (k - s) * Math.pow(d, k - s) * (1 - d));

  const pk = (Math.pow(a / u, k) / factorial(s)) * Math.pow(s, k - s) * p0;
  const ae = a * (1 - pk);

  //Tiempo promedio que una unidad pasa en la cola
  const wq = lq / ae;

  //Tiempo promoedio que una unidad pasa en el sistema
  const ws = wq + 1 / u;

  //Tiempo promedio de unidades en el sistema
  const ls = ae * ws;

  //Probabilidad de que una unidad que llega tenga que esperar por el servicio
  const pw = (Math.pow(a / u, s) / factorial(s)) * ((s * u) / (s * u - a)) * p0;

  return {
    d,
    pk,
    ae,
    p0,
    pn,
    lq,
    ls,
    wq,
    ws,
    pw,
  };
};

const mmsp02 = (a, u, s, k) => {
  let sum = 0;
  for (let n = s + 1; n < k + 1; n++) {
    sum += Math.pow(a / (s * u), n - s);
  }
  return sum;
};

const mmsp03 = (a, u, s) => {
  let sum = 0;
  for (let n = 0; n < s+1; n++) {
    sum += Math.pow(a / u, n) / factorial(n);
  }
  return sum;
};


// Example usage
console.log(mmsk(2, 3, 1, 3));
// Foto del ejemplo que si sirve: https://ibb.co/RSknMZc
