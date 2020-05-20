/* Markovian Markovian 1 */
const mm1 = (a, u) => {
  const ls = a / (u - a); //tiempo promedio
  const ws = 1 / (u - a); //tiempo de una persona
  const lq = (a * a) / (u * (u - a)); //
  const wq = (a * a) / (u * (u - a));
  const d = a / u; // factor de uso del sistema
  const p0 = 1 - d; // cola  vacia

  results = {
    ls,
    ws,
    lq,
    wq,
    p0,
  };
};

/* Example usage */
/* console.log(mm1(4399, 10)); */
