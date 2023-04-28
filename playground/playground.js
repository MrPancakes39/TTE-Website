const points = {
  A: { x: null, y: null },
  B: { x: null, y: null },
  C: { x: null, y: null },
};
const O = { x: null, y: null };

const output = document.querySelector("#output");

const inputs = document.querySelectorAll("input");
if (inputs.length !== 6) {
  throw new Error("Wrong Number of Inputs");
}

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9.]/g, "");
    const dotCount = input.value.match(/\./g);
    if (dotCount && dotCount.length > 1) {
      input.value = input.value.slice(0, -1);
    }
  });
});

const getValueFromInput = (input) => {
  const val = parseFloat(input.value);
  const [point, coord] = input.name.split(".");
  points[point][coord] = isNaN(val) ? null : val;
};

const calculateBtn = document.querySelector("#calculate-btn");
calculateBtn.addEventListener("click", calculateEquation);

function calculateEquation() {
  inputs.forEach((input) => getValueFromInput(input));
  for (let point in points) {
    for (let coord in points[point]) {
      if (!points[point][coord]) {
        alert(`The ${coord} component of ${point} is missing.`);
        return;
      }
    }
  }
  if (isCollinear()) {
    alert("The points are collinear and can't form a triangle");
    return;
  }
  calculateIncenter();
  const plain = T();
  const latex = T_latex();
  output.innerHTML = `Plain text:\n${plain}\n\nLaTeX version:\n${latex}`;
}

function isCollinear() {
  const { A, B, C } = points;
  return (B.y - A.y) * (C.x - B.x) - (C.y - B.y) * (B.x - A.x) === 0;
}

function dist(U, V) {
  return Math.sqrt(Math.pow(V.x - U.x, 2) + Math.pow(V.y - U.y, 2));
}

function calculateIncenter() {
  const { A, B, C } = points;
  const AB = dist(A, B),
    BC = dist(B, C),
    AC = dist(A, C);
  const total = AB + BC + AC;
  O.x = (A.x * BC + B.x * AC + C.x * AB) / total;
  O.y = (A.y * BC + B.y * AC + C.y * AB) / total;
}

function phi(V) {
  const sign = (O.y - V.y) / Math.abs(O.y - V.y);
  return sign * Math.acos((O.x - V.x) / dist(O, V));
}

const Cf = (x = "x") => `sqrt(${x}) - sqrt(${x}) + 1`;
const Cf_latex = (x = "x") => `\\sqrt{${x}} - \\sqrt{${x}} + 1`;

const Cref = (P, theta) =>
  Cf(`(y-${P.y})*sin(${theta})+(x-${P.x})*cos(${theta})`);
const Cref_latex = (P, theta) =>
  Cf_latex(`(y-${P.y})*\\sin(${theta})+(x-${P.x})*\\cos(${theta})`);

function L(U, V) {
  const coeff1 = U.x - V.x;
  const coeff2 = V.y - U.y;
  const coeff3 = -coeff1 * U.y - coeff2 * U.x;
  const a = `${coeff2 >= 0 ? "+" : ""}${coeff2}`;
  const b = `${coeff3 >= 0 ? "+" : ""}${coeff3}`;
  return `${coeff1}y ${a}x ${b}`;
}

const T = () => {
  const { A, B, C } = points;
  return `(${L(A, B)})(${L(B, C)})(${L(A, C)})(${Cref(A, phi(A))})(${Cref(
    B,
    phi(B)
  )})(${Cref(C, phi(C))})=0`;
};

const T_latex = () => {
  const { A, B, C } = points;
  return `(${L(A, B)})(${L(B, C)})(${L(A, C)})(${Cref_latex(
    A,
    phi(A)
  )})(${Cref_latex(B, phi(B))})(${Cref_latex(C, phi(C))})=0`;
};

export default {};
