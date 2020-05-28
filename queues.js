const factorial = (n) => {
  let fact = 1;
  for (let i = 1; i < n + 1; i++) {
    fact *= i;
  }
  return fact;
};

const sumatoryA = (a, u, s) => {
  let sum = 0;
  for (let n = 0; n < s; n++) {
    sum += Math.pow(a / u, n) / factorial(n);
  }
  return sum;
};

const sumatoryB = (a, u, s) => {
  let sum = 0;
  for (let n = 0; n < s + 1; n++) {
    sum += Math.pow(a / u, n) / factorial(n);
  }
  return sum;
};

const sumatoryC = (a, u, s, k) => {
  let sum = 0;
  for (let n = s + 1; n < k + 1; n++) {
    sum += Math.pow(a / (s * u), n - s);
  }
  return sum;
};

/*
Esto es lo que quiere Polo para cada uno de los modelos:

ro

p0
pn

lq
l

wq
w

costo promedio del servicio

Hacer validación de lo que el usuario va a meter como input
*/

/* Markovian markovian 1 */

class mm1 {
  constructor(a, u) {
    this.a = a;
    this.u = u;

    this.d = a / u; // factor de uso del sistema, probabilidad de que un cliente tiene que esperar

    this.lq = (a * a) / (u * (u - a)); // cantidad promedio de clientes
    this.ls = this.lq + this.d;

    this.wq = this.lq / a; // tiempo promedio en la cola
    this.ws = 1 / (u - a); //tiempo de una persona

    this.p0 = 1 - this.d; // cola  vacia
  }

  pn = (n) => {
    if (typeof n === "string") n = parseInt(n);

    return (1 - this.d) * Math.pow(this.d, n);
  };

  pnCumulative = (n) => {
    if (typeof n === "string") n = parseInt(n);

    let p = 0;

    for (let i = 0; i <= n; i++) {
      p += this.pn(i);
    }

    return p;
  };

  totalCost = (cW, cS) => {
    return this.lq * cW + cS;
  };

  general = () => {
    return {
      ro: this.d,
      p0: this.p0,
      lq: this.lq,
      l: this.ls,
      wq: this.wq,
      w: this.ws,
    };
  };
}

/* Example usage */
/* const m = new mm1(2, 3);
console.log(m.general());
console.log(m.pn(2));
console.log(m.pnCumulative(2));
console.log(m.totalCost(15, 12)); */

//----------------------------------------------------------
/* Markovian Markovian S*/

class mms {
  constructor(a, u, s) {
    this.a = a;
    this.u = u;
    this.s = s;

    this.d = a / (s * u);

    // p de que no haya unidades en el sistema
    let p0Part1 = sumatoryA(a, u, s);
    let p0Part2 = Math.pow(a / u, s) / factorial(s) / (1 - a / (s * u));
    this.p0 = 1 / (p0Part1 + p0Part2); // cola  vacia

    this.lq =
      ((Math.pow(a / u, s) * (u * a)) /
        (factorial(s - 1) * Math.pow(s * u - a, 2))) *
      this.p0;
    this.ls = this.lq + a / u;
    this.wq = this.lq / a;
    this.ws = this.wq + 1 / u; // factor de uso del sistema, probabilidad de que un cliente tiene que esperar
  }

  pn = (n) => {
    if (typeof n === "string") n = parseInt(n);
    //Probabilidad de haya n unidades en cola
    if (n < this.s) {
      return (Math.pow(this.a / this.u, n) / factorial(n)) * this.p0;
    }

    return (
      (Math.pow(this.a / this.u, n) * this.p0) /
      (factorial(this.s) * Math.pow(this.s, n - this.s))
    );
  };

  pnCumulative = (n) => {
    if (typeof n === "string") n = parseInt(n);

    let p = 0;

    for (let i = 0; i <= n; i++) {
      p += this.pn(i);
    }

    return p;
  };

  totalCost = (cW, cS) => {
    return this.lq * cW + this.s * cS;
  };

  general = () => {
    return {
      ro: this.d,
      p0: this.p0,
      lq: this.lq,
      l: this.ls,
      wq: this.wq,
      w: this.ws,
    };
  };
}

/* Example usage */
// Foto del ejemplo que si sirve: https://ibb.co/RSknMZc

/* const m = new mms(2, 3, 2);
console.log(m.general());
console.log(m.pn(2));
console.log(m.pnCumulative(2));
console.log(m.totalCost(15, 12)); */

//----------------------------------------------------------
/* Markovian Markovian s<1 con limite K de usuarios */
class mmsk {
  constructor(a, u, s, k) {
    this.a = a;
    this.u = u;
    this.s = s;
    this.k = k;

    this.d = a / (s * u);

    // p de que no haya unidades en el sistema
    let p0Part1 = sumatoryB(a, u, s);
    let p0Part2 = Math.pow(a / u, s) / factorial(s);
    let p0Part3 = sumatoryC(a, u, s, k);
    this.p0 = 1 / (p0Part1 + p0Part2 * p0Part3);

    this.lq =
      ((Math.pow(a / u, s) * (u * a)) /
        (factorial(s - 1) * Math.pow(s * u - a, 2))) *
      this.p0 *
      (1 -
        Math.pow(this.d, k - s) -
        (k - s) * Math.pow(this.d, k - s) * (1 - this.d));

    //Tiempo promedio de unidades en cola
    this.ae = a * (1 - this.pn(k));

    //Tiempo promedio que una unidad pasa en la cola
    this.wq = this.lq / this.ae;
    this.ws = this.wq + 1 / u;

    this.ls = this.ae * this.ws;
  }

  pn = (n) => {
    if (typeof n === "string") n = parseInt(n);

    if (n > this.k) {
      return 0;
    }

    //Probabilidad de haya n unidades en cola
    if (n < this.s) {
      return (Math.pow(this.a / this.u, n) / factorial(n)) * this.p0;
    }

    return (
      (Math.pow(this.a / this.u, n) * this.p0) /
      (factorial(this.s) * Math.pow(this.s, n - this.s))
    );
  };

  pnCumulative = (n) => {
    if (typeof n === "string") n = parseInt(n);

    let p = 0;

    for (let i = 0; i <= n; i++) {
      p += this.pn(i);
    }

    return p;
  };

  totalCost = (cW, cS) => {
    return this.lq * cW + this.s * cS;
  };

  general = () => {
    return {
      ro: this.d,
      p0: this.p0,
      ae: this.ae,
      lq: this.lq,
      l: this.ls,
      wq: this.wq,
      w: this.ws,
    };
  };
}

// Example usage
/* const m = new mmsk(2, 3, 1, 3);
console.log(m.general());
console.log(m.pn(3)); */

//----------------------------------------------------------
/* MG1 */

class mg1 {
  constructor(aR, sR, sD) {
    this.ro = aR / sR;
    this.p0 = 1 - this.ro;
    this.lq =
      (Math.pow(aR, 2) * Math.pow(sD, 2) + Math.pow(this.ro, 2)) /
      (2 * (1 - this.ro));
    this.l = this.ro + this.lq;
    this.wq = this.lq / aR;
    this.w = this.wq + 1 / sR;
  }

  pn = (n) => {
    if (typeof n === "string") n = parseInt(n);

    return Math.pow(this.ro, n) * this.p0;
  };

  pnCumulative = (n) => {
    if (typeof n === "string") n = parseInt(n);

    let p = 0;

    for (let i = 0; i <= n; i++) {
      p += this.pn(i);
    }

    return p;
  };

  totalCost = (cW, cS) => {
    return this.lq * cW + 1 * cS;
  };

  general = () => {
    return { ...this, pn: null, pnCumulative: null };
  };
}

/* Example usage */
// alpha, miu, desviacionestandar,
/* const m = new mg1(3, 5, 0.1, 15, 1);
console.log(m.general());
console.log(m.pn(0));
console.log(m.pnCumulative(0));
console.log(m.totalCost(15, 12));
 */
