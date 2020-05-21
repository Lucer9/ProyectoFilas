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
/* console.log(mm1(4399, 10)); */


/* Markovian Markovian s<1*/
const mms = (a, u, s, n) => {
  //factor de utilizacion
  const d = a / (s * u);

  // p de que no haya unidades en el sistema
  let p0Part1 = mmsp0(a, u, s);
  let p0Part2 = Math.pow(a / u, s) / factorial(s);
  let p0Part3 = (s * u) / (s * u - a);
  const p0 = 1 / (p0Part1 + p0Part2 * p0Part3);
  let pn;
  //Probabilidad de haya n unidades en cola
  if (n <= s) {
    pn = (Math.pow(a / u, n) / factorial(n)) * p0;
  } else {
    pn = (Math.pow(a / u, n) / factorial(k)) * Math.pow(s, n - s) * p0;
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
  };
};

// Example usage 
// console.log(mms(2, 3, 2, 0));

const mmsp0 = (a, u, s) => {
  let sum = 0;
  for (let n = 0; n < s; n++) {
    sum += Math.pow(a / u, n) / factorial(n);
  }
  return sum;
};

const factorial = (n) => {
  let fact = 1;
  for (let i = 1; i < n + 1; i++) {
    fact *= i;
  }
  return fact;
};

