const fs = require('fs');
const path = require('path');

// ============================================================
// FULLY DETERMINISTIC STUDENT DATA GENERATOR v3
// Every student defined explicitly to match ALL PRD metrics.
// ============================================================

function r1(n) { return Math.round(n * 10) / 10; }
function r2(n) { return Math.round(n * 100) / 100; }

// Names
const nomesMasc = [
  'Lucas', 'Gabriel', 'Matheus', 'Pedro', 'Rafael', 'Gustavo', 'Felipe', 'Bruno',
  'Thiago', 'Leonardo', 'Arthur', 'Henrique', 'Daniel', 'Marcos', 'Vinicius',
  'Igor', 'Caio', 'Diego', 'Rodrigo', 'Andre', 'Eduardo', 'Joao', 'Carlos',
  'Fernando', 'Ricardo', 'Alexandre', 'Guilherme', 'Samuel', 'Nicolas', 'Enzo',
  'Bernardo', 'Davi', 'Miguel', 'Heitor', 'Murilo', 'Lorenzo', 'Otavio',
  'Pietro', 'Cauã', 'Benicio', 'Emanuel', 'Raul', 'Levi', 'Theo', 'Noah',
  'Ian', 'Lucca', 'Joaquim', 'Valentim', 'Ravi'
];
const nomesFem = [
  'Ana', 'Maria', 'Julia', 'Beatriz', 'Larissa', 'Amanda', 'Carolina', 'Isabela',
  'Fernanda', 'Gabriela', 'Leticia', 'Camila', 'Mariana', 'Bruna', 'Patricia',
  'Natalia', 'Vanessa', 'Tatiana', 'Priscila', 'Raquel', 'Renata', 'Aline',
  'Daniela', 'Juliana', 'Helena', 'Alice', 'Sophia', 'Laura', 'Valentina',
  'Manuela', 'Luana', 'Giovanna', 'Isadora', 'Cecilia', 'Lorena', 'Bianca',
  'Clara', 'Rafaela', 'Vitoria', 'Yasmin', 'Nicole', 'Heloisa', 'Melissa',
  'Livia', 'Luna', 'Aurora', 'Elisa', 'Stella', 'Marina', 'Milena'
];
const sobrenomes = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves',
  'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho',
  'Araujo', 'Melo', 'Barbosa', 'Rocha', 'Dias', 'Nascimento', 'Andrade',
  'Moreira', 'Nunes', 'Marques', 'Machado', 'Monteiro', 'Cardoso', 'Correia',
  'Teixeira', 'Vieira', 'Lopes', 'Freitas', 'Castro', 'Campos', 'Moura',
  'Pinto', 'Azevedo', 'Mendes', 'Ramos', 'Fonseca', 'Batista', 'Cunha',
  'Cavalcanti', 'Duarte', 'Medeiros', 'Pires', 'Brito', 'Aguiar', 'Coelho',
  'Farias', 'Tavares', 'Barros', 'Siqueira', 'Bezerra', 'Reis', 'Amorim',
  'Miranda', 'Cruz', 'Sampaio', 'Borges', 'Nogueira', 'Guimaraes', 'Assis',
  'Resende', 'Morais', 'Domingues', 'Leite', 'Amaral', 'Pacheco', 'Xavier',
  'Franco', 'Vasconcelos', 'Soares', 'Dantas', 'Peixoto', 'Rangel', 'Esteves',
  'Magalhaes', 'Figueiredo', 'Coutinho', 'Queiroz', 'Lacerda', 'Sales',
  'Carneiro', 'Leal', 'Mota', 'Paiva', 'Pessoa', 'Vargas', 'Braga',
  'Chaves', 'Diniz', 'Fontes', 'Macedo', 'Prado', 'Senna', 'Viana',
  'Valente', 'Porto', 'Luz', 'Bastos'
];

function generateNames(count) {
  const names = new Set();
  const allFirst = [...nomesMasc, ...nomesFem];
  let i = 0, j = 0;
  while (names.size < count) {
    const name = `${allFirst[i % allFirst.length]} ${sobrenomes[j % sobrenomes.length]}`;
    if (!names.has(name)) names.add(name);
    j++;
    if (j % sobrenomes.length === 0) i++;
  }
  return [...names];
}

// ============================================================
// ALL 100 STUDENTS DEFINED EXPLICITLY
// Format: [b1, b2, b3, b4, turma, trend_marker]
// trend: I=improved(b4>b1), W=worsened(b4<b1), S=stable(b4==b1)
//
// CONSTRAINTS:
// 3A: 34 students (28 approved, 6 failed)
//   Sums: B1=239.0, B2=248.9, B3=251.9, B4=256.0
//   Trends in approved(28): I=19, W=1, S=8
//   Trends in failed(6): I=3, W=2, S=1
//
// 3B: 33 students (17 approved, 16 failed)
//   Sums: B1=203.0, B2=223.1, B3=204.9, B4=231.0
//   Trends in approved(17): I=11, W=1, S=5
//   Trends in failed(16): I=9, W=3, S=4
//
// 3C: 33 students (22 approved, 11 failed)
//   Sums: B1=212.9, B2=212.9, B3=223.1, B4=222.1
//   Trends in approved(22): I=15, W=0, S=7
//   Trends in failed(11): I=5, W=2, S=4
// ============================================================

// 3A APPROVED (28 students)
// Need sums: B1=211.8, B2=220.9, B3=223.3, B4=227.0
// 8 Stable, 19 Improved, 1 Worsened
const a_appr = [
  // 8 Stable (B4==B1)
  [7.0, 7.5, 7.5, 7.0], // S
  [7.5, 8.0, 8.0, 7.5], // S
  [8.0, 8.5, 8.5, 8.0], // S
  [7.0, 7.5, 7.0, 7.0], // S
  [8.0, 8.0, 8.5, 8.0], // S
  [7.5, 8.0, 8.0, 7.5], // S
  [8.0, 8.0, 8.0, 8.0], // S
  [7.5, 7.5, 8.0, 7.5], // S
  // Stable sums: B1=60.5, B2=63.0, B3=63.5, B4=60.5
  // 19 Improved (B4>B1)
  [7.0, 7.5, 7.5, 8.0], // I
  [7.5, 8.0, 8.0, 8.5], // I
  [7.0, 7.5, 8.0, 8.0], // I +1.0
  [8.0, 8.5, 8.5, 9.0], // I
  [7.5, 8.0, 8.0, 8.5], // I
  [7.0, 7.5, 7.5, 8.0], // I
  [8.0, 8.0, 8.5, 8.5], // I
  [7.5, 8.0, 7.5, 8.0], // I
  [7.5, 8.0, 8.0, 8.5], // I
  [8.0, 8.5, 8.0, 8.5], // I
  [7.0, 7.5, 8.0, 8.0], // I
  [8.0, 8.5, 8.5, 9.0], // I
  [7.5, 7.5, 8.0, 8.0], // I
  [7.0, 8.0, 8.0, 8.5], // I
  [8.0, 8.0, 8.0, 8.5], // I
  [7.5, 8.0, 7.5, 8.0], // I
  [7.0, 7.5, 8.0, 8.0], // I
  [8.0, 8.0, 8.0, 8.5], // I
  // 18 improved so far. Sums of 18: B1=135.0, B2=142.5, B3=145.5, B4=151.5
  // Need improved total: B1=211.8-60.5-8.3=143.0, B2=220.9-63.0-7.4=150.5, B3=223.3-63.5-7.8=152.0, B4=227.0-60.5-8.0=158.5
  // Last improved: B1=143.0-135.0=8.0, B2=150.5-142.5=8.0, B3=152.0-145.5=6.5, B4=158.5-151.5=7.0
  // Wait, need to recalculate. Let me compute the worsened student first.
  // 1 Worsened (B4<B1)
];

// Actually, let me just compute everything precisely using a spreadsheet approach.
// I'll define students, compute sums, and adjust the last one.

// Let me restart with a cleaner approach: define all students for each class,
// compute intermediate sums, and adjust the final student.

function buildClassData() {
  // ============ 3A FAILED (6 students) ============
  // 1 critico, 2 alto, 3 medio
  // Trends: I=3, W=2, S=1
  const a_fail = [
    [3.0, 3.5, 3.8, 4.5], // critico I, media=3.7
    [4.2, 4.5, 4.3, 5.0], // alto I, media=4.5
    [4.5, 4.0, 4.5, 4.0], // alto W, media=4.25
    [5.0, 5.5, 5.0, 5.5], // medio I, media=5.25
    [5.5, 5.0, 5.5, 5.0], // medio W, media=5.25
    [5.0, 5.5, 5.5, 5.0], // medio S, media=5.25
  ];
  // a_fail sums: B1=27.2, B2=28.0, B3=28.6, B4=29.0

  // ============ 3B FAILED (16 students) ============
  // 3 critico, 6 alto, 7 medio
  // Trends: I=9, W=3, S=4
  const b_fail = [
    [2.5, 3.0, 3.5, 5.0], // critico I
    [3.5, 4.0, 3.5, 5.0], // critico I
    [3.0, 4.0, 3.5, 4.5], // critico I
    [4.0, 4.5, 4.0, 5.5], // alto I
    [4.5, 4.5, 4.5, 4.5], // alto S
    [4.0, 5.0, 4.0, 5.0], // alto I
    [4.5, 4.0, 4.5, 5.0], // alto I
    [4.0, 4.5, 4.5, 4.0], // alto S
    [4.5, 4.0, 4.5, 4.0], // alto W
    [5.0, 5.5, 5.0, 5.5], // medio I
    [5.5, 5.0, 5.5, 5.0], // medio W
    [5.0, 5.0, 5.5, 5.5], // medio I
    [5.5, 5.5, 5.0, 5.0], // medio W
    [5.0, 5.5, 5.5, 5.0], // medio S
    [5.5, 5.0, 5.0, 5.5], // medio S
    [5.0, 5.5, 5.0, 5.5], // medio I
  ];
  // b_fail sums: B1=71.0, B2=74.5, B3=73.0, B4=79.5
  // Wait, let me recount: 2.5+3.5+3.0+4.0+4.5+4.0+4.5+4.0+4.5+5.0+5.5+5.0+5.5+5.0+5.5+5.0
  // = 2.5+3.5=6, +3.0=9, +4.0=13, +4.5=17.5, +4.0=21.5, +4.5=26, +4.0=30, +4.5=34.5,
  //   +5.0=39.5, +5.5=45, +5.0=50, +5.5=55.5, +5.0=60.5, +5.5=66, +5.0=71
  // B1=71.0 ✓

  // ============ 3C FAILED (11 students) ============
  // 2 critico, 3 alto, 6 medio
  // Trends: I=5, W=2, S=4
  const c_fail = [
    [3.5, 3.5, 4.0, 4.0], // critico I
    [3.0, 3.5, 4.0, 4.5], // critico I
    [4.0, 4.5, 4.0, 5.5], // alto I
    [4.5, 4.5, 4.5, 4.5], // alto S
    [4.0, 4.0, 4.5, 5.5], // alto I
    [5.0, 5.5, 5.5, 5.0], // medio S
    [5.5, 5.0, 5.5, 5.0], // medio W
    [5.0, 5.5, 5.0, 5.5], // medio I
    [5.5, 5.5, 5.0, 5.0], // medio W
    [5.0, 5.0, 5.5, 5.5], // medio I (not S since 5.5>5.0)
    [5.5, 5.0, 5.0, 5.5], // medio S
  ];
  // c_fail sums: B1=50.5, B2=51.5, B3=52.5, B4=55.5

  // Now compute fail sums
  const sum = (arr, idx) => r1(arr.reduce((s, n) => s + n[idx], 0));

  const afB1 = sum(a_fail, 0), afB2 = sum(a_fail, 1), afB3 = sum(a_fail, 2), afB4 = sum(a_fail, 3);
  const bfB1 = sum(b_fail, 0), bfB2 = sum(b_fail, 1), bfB3 = sum(b_fail, 2), bfB4 = sum(b_fail, 3);
  const cfB1 = sum(c_fail, 0), cfB2 = sum(c_fail, 1), cfB3 = sum(c_fail, 2), cfB4 = sum(c_fail, 3);

  console.log(`3A fail sums: B1=${afB1} B2=${afB2} B3=${afB3} B4=${afB4}`);
  console.log(`3B fail sums: B1=${bfB1} B2=${bfB2} B3=${bfB3} B4=${bfB4}`);
  console.log(`3C fail sums: B1=${cfB1} B2=${cfB2} B3=${cfB3} B4=${cfB4}`);

  // Approved targets
  const aT = { b1: r1(239.0-afB1), b2: r1(248.9-afB2), b3: r1(251.9-afB3), b4: r1(256.0-afB4) };
  const bT = { b1: r1(203.0-bfB1), b2: r1(223.1-bfB2), b3: r1(204.9-bfB3), b4: r1(231.0-bfB4) };
  const cT = { b1: r1(212.9-cfB1), b2: r1(212.9-cfB2), b3: r1(223.1-cfB3), b4: r1(222.1-cfB4) };

  console.log(`3A approved targets (28): B1=${aT.b1} B2=${aT.b2} B3=${aT.b3} B4=${aT.b4}`);
  console.log(`3B approved targets (17): B1=${bT.b1} B2=${bT.b2} B3=${bT.b3} B4=${bT.b4}`);
  console.log(`3C approved targets (22): B1=${cT.b1} B2=${cT.b2} B3=${cT.b3} B4=${cT.b4}`);

  // ============ 3A APPROVED (28) ============
  // Targets: B1=211.8, B2=220.9, B3=223.3, B4=227.0
  // Trends: S=8, I=19, W=1 (total approved trends for 3A)

  // I'll define 27 students, then compute the 28th to hit exact sums.
  // The 28th will be an improved student.

  const a_appr_27 = [
    // 8 Stable
    [7.0, 7.5, 7.5, 7.0],
    [7.5, 8.0, 8.0, 7.5],
    [8.0, 8.5, 8.5, 8.0],
    [7.0, 7.5, 7.0, 7.0],
    [8.0, 8.0, 8.5, 8.0],
    [7.5, 8.0, 8.0, 7.5],
    [8.0, 8.0, 8.0, 8.0],
    [7.5, 7.5, 8.0, 7.5],
    // 1 Worsened
    [8.0, 7.5, 8.0, 7.5],
    // 18 Improved (need 19 total, last one is the fixer)
    [7.0, 7.5, 7.5, 8.0],
    [7.5, 8.0, 8.0, 8.5],
    [7.0, 7.5, 8.0, 8.0],
    [8.0, 8.5, 8.5, 9.0],
    [7.5, 8.0, 8.0, 8.5],
    [7.0, 7.5, 7.5, 8.0],
    [8.0, 8.0, 8.5, 8.5],
    [7.5, 8.0, 7.5, 8.0],
    [7.5, 8.0, 8.0, 8.5],
    [8.0, 8.5, 8.0, 8.5],
    [7.0, 7.5, 8.0, 8.0],
    [8.0, 8.5, 8.5, 9.0],
    [7.5, 7.5, 8.0, 8.0],
    [7.0, 8.0, 8.0, 8.5],
    [8.0, 8.0, 8.0, 8.5],
    [7.5, 8.0, 7.5, 8.0],
    [7.0, 7.5, 8.0, 8.0],
    [8.0, 8.0, 8.0, 8.5],
  ];

  const a27B1 = sum(a_appr_27, 0), a27B2 = sum(a_appr_27, 1), a27B3 = sum(a_appr_27, 2), a27B4 = sum(a_appr_27, 3);
  const a28 = [r1(aT.b1-a27B1), r1(aT.b2-a27B2), r1(aT.b3-a27B3), r1(aT.b4-a27B4)];
  console.log(`3A 28th student (improved): ${a28}, b4>b1: ${a28[3]>a28[0]}, b1>=6: ${a28[0]>=6}, media: ${r2((a28[0]+a28[1]+a28[2]+a28[3])/4)}`);

  const a_appr = [...a_appr_27, a28];

  // ============ 3B APPROVED (17) ============
  // Targets: B1=132.0, B2=148.6, B3=131.9, B4=151.5
  // Trends: S=5, I=11, W=1

  const b_appr_16 = [
    // 5 Stable
    [7.5, 8.5, 7.5, 7.5],
    [8.0, 9.0, 8.0, 8.0],
    [8.0, 8.5, 7.5, 8.0],
    [8.0, 9.0, 8.0, 8.0],
    [8.0, 8.5, 8.0, 8.0],
    // 1 Worsened
    [8.5, 8.5, 8.0, 8.0],
    // 10 Improved (need 11, last is fixer)
    [7.5, 8.5, 7.5, 9.0],
    [8.0, 9.0, 8.0, 9.5],
    [7.5, 8.5, 7.5, 9.5],
    [8.0, 9.0, 8.0, 9.5],
    [8.0, 8.5, 7.5, 9.5],
    [7.5, 9.0, 8.0, 9.5],
    [8.0, 8.5, 8.0, 9.5],
    [8.0, 9.0, 7.5, 9.5],
    [8.0, 9.0, 8.0, 9.5],
    [8.0, 8.5, 8.0, 10.0],
  ];

  const b16B1 = sum(b_appr_16, 0), b16B2 = sum(b_appr_16, 1), b16B3 = sum(b_appr_16, 2), b16B4 = sum(b_appr_16, 3);
  const b17 = [r1(bT.b1-b16B1), r1(bT.b2-b16B2), r1(bT.b3-b16B3), r1(bT.b4-b16B4)];
  console.log(`3B 17th student (improved): ${b17}, b4>b1: ${b17[3]>b17[0]}, b1>=6: ${b17[0]>=6}, media: ${r2((b17[0]+b17[1]+b17[2]+b17[3])/4)}`);

  const b_appr = [...b_appr_16, b17];

  // ============ 3C APPROVED (22) ============
  // Targets: B1=162.4, B2=161.4, B3=170.6, B4=166.6
  // Trends: S=7, I=15, W=0

  const c_appr_21 = [
    // 7 Stable
    [7.0, 7.0, 7.5, 7.0],
    [7.5, 7.0, 8.0, 7.5],
    [7.5, 7.5, 7.5, 7.5],
    [7.0, 7.0, 7.5, 7.0],
    [8.0, 7.5, 8.0, 8.0],
    [7.5, 7.5, 8.0, 7.5],
    [7.5, 7.5, 7.5, 7.5],
    // 14 Improved (need 15, last is fixer)
    [7.0, 7.0, 7.5, 7.5],
    [7.5, 7.5, 8.0, 8.0],
    [7.0, 7.0, 7.5, 7.5],
    [7.5, 7.5, 8.0, 8.0],
    [7.0, 7.0, 7.5, 7.5],
    [7.5, 7.5, 8.0, 8.0],
    [7.5, 7.5, 7.5, 8.0],
    [7.0, 7.0, 7.5, 7.5],
    [7.5, 7.5, 8.0, 7.6],
    [7.5, 7.5, 8.0, 7.6],
    [7.0, 7.0, 7.5, 7.5],
    [7.5, 7.5, 8.0, 7.6],
    [8.0, 8.0, 8.0, 8.5],
    [7.5, 7.5, 8.0, 7.6],
  ];

  const c21B1 = sum(c_appr_21, 0), c21B2 = sum(c_appr_21, 1), c21B3 = sum(c_appr_21, 2), c21B4 = sum(c_appr_21, 3);
  const c22 = [r1(cT.b1-c21B1), r1(cT.b2-c21B2), r1(cT.b3-c21B3), r1(cT.b4-c21B4)];
  console.log(`3C 22nd student (improved): ${c22}, b4>b1: ${c22[3]>c22[0]}, b1>=6: ${c22[0]>=6}, media: ${r2((c22[0]+c22[1]+c22[2]+c22[3])/4)}`);

  const c_appr = [...c_appr_21, c22];

  // Assemble
  return {
    a_appr, a_fail,
    b_appr, b_fail,
    c_appr, c_fail
  };
}

const data = buildClassData();

// Check for issues with fixer students and adjust if needed
// Then assemble all students

const allNames = generateNames(100);
let nameIdx = 0;
let id = 1;
const alunos = [];

// 3A
for (const n of data.a_appr) {
  alunos.push({ id: id++, nome: allNames[nameIdx++], turma: '3A', notas: { b1: n[0], b2: n[1], b3: n[2], b4: n[3] } });
}
for (const n of data.a_fail) {
  alunos.push({ id: id++, nome: allNames[nameIdx++], turma: '3A', notas: { b1: n[0], b2: n[1], b3: n[2], b4: n[3] } });
}
// 3B
for (const n of data.b_appr) {
  alunos.push({ id: id++, nome: allNames[nameIdx++], turma: '3B', notas: { b1: n[0], b2: n[1], b3: n[2], b4: n[3] } });
}
for (const n of data.b_fail) {
  alunos.push({ id: id++, nome: allNames[nameIdx++], turma: '3B', notas: { b1: n[0], b2: n[1], b3: n[2], b4: n[3] } });
}
// 3C
for (const n of data.c_appr) {
  alunos.push({ id: id++, nome: allNames[nameIdx++], turma: '3C', notas: { b1: n[0], b2: n[1], b3: n[2], b4: n[3] } });
}
for (const n of data.c_fail) {
  alunos.push({ id: id++, nome: allNames[nameIdx++], turma: '3C', notas: { b1: n[0], b2: n[1], b3: n[2], b4: n[3] } });
}

// ============================================================
// FULL VALIDATION
// ============================================================
function validate(alunos) {
  console.log('\n=== VALIDATION ===\n');
  let allOk = true;
  function check(label, actual, expected) {
    const ok = actual === expected;
    if (!ok) allOk = false;
    console.log(`${ok ? 'OK' : 'FAIL'} ${label}: ${actual} (expected: ${expected})`);
    return ok;
  }

  const mediaFinal = (a) => r2((a.notas.b1 + a.notas.b2 + a.notas.b3 + a.notas.b4) / 4);

  check('Total alunos', alunos.length, 100);

  const t3A = alunos.filter(a => a.turma === '3A');
  const t3B = alunos.filter(a => a.turma === '3B');
  const t3C = alunos.filter(a => a.turma === '3C');
  check('3A count', t3A.length, 34);
  check('3B count', t3B.length, 33);
  check('3C count', t3C.length, 33);

  const sumMedias = r2(alunos.reduce((s, a) => s + mediaFinal(a), 0));
  const avgMedia = r2(sumMedias / 100);
  check('Media geral', avgMedia, 6.82);
  console.log(`  Sum medias: ${sumMedias}`);

  const aprov = alunos.filter(a => mediaFinal(a) >= 6.0).length;
  const reprov = alunos.filter(a => mediaFinal(a) < 6.0).length;
  check('Aprovados', aprov, 67);
  check('Reprovados', reprov, 33);

  for (const [name, turma, expMedia, expAprov, expReprov, expB] of [
    ['3A', t3A, 7.32, 28, 6, [7.03, 7.32, 7.41, 7.53]],
    ['3B', t3B, 6.53, 17, 16, [6.15, 6.76, 6.21, 7.00]],
    ['3C', t3C, 6.60, 22, 11, [6.45, 6.45, 6.76, 6.73]],
  ]) {
    console.log(`\n--- ${name} ---`);
    const medias = turma.map(mediaFinal);
    const avg = r2(medias.reduce((s, m) => s + m, 0) / turma.length);
    check(`${name} media`, avg, expMedia);
    check(`${name} aprovados`, turma.filter(a => mediaFinal(a) >= 6.0).length, expAprov);
    check(`${name} reprovados`, turma.filter(a => mediaFinal(a) < 6.0).length, expReprov);

    const aB1 = r2(turma.reduce((s, a) => s + a.notas.b1, 0) / turma.length);
    const aB2 = r2(turma.reduce((s, a) => s + a.notas.b2, 0) / turma.length);
    const aB3 = r2(turma.reduce((s, a) => s + a.notas.b3, 0) / turma.length);
    const aB4 = r2(turma.reduce((s, a) => s + a.notas.b4, 0) / turma.length);
    check(`${name} B1`, aB1, expB[0]);
    check(`${name} B2`, aB2, expB[1]);
    check(`${name} B3`, aB3, expB[2]);
    check(`${name} B4`, aB4, expB[3]);
  }

  console.log('\n--- Bimestral geral ---');
  check('B1 geral', r2(alunos.reduce((s, a) => s + a.notas.b1, 0) / 100), 6.55);
  check('B2 geral', r2(alunos.reduce((s, a) => s + a.notas.b2, 0) / 100), 6.85);
  check('B3 geral', r2(alunos.reduce((s, a) => s + a.notas.b3, 0) / 100), 6.80);
  check('B4 geral', r2(alunos.reduce((s, a) => s + a.notas.b4, 0) / 100), 7.09);

  console.log('\n--- Sistema de Risco ---');
  const critico = alunos.filter(a => a.notas.b1 < 4.0);
  const alto = alunos.filter(a => a.notas.b1 >= 4.0 && a.notas.b1 <= 4.9);
  const medio = alunos.filter(a => a.notas.b1 >= 5.0 && a.notas.b1 <= 5.9);
  const baixo = alunos.filter(a => a.notas.b1 >= 6.0);
  check('Critico', critico.length, 6);
  check('Alto', alto.length, 11);
  check('Medio', medio.length, 16);
  check('Baixo', baixo.length, 67);
  check('Critico all failed', critico.filter(a => mediaFinal(a) < 6.0).length, 6);
  check('Alto all failed', alto.filter(a => mediaFinal(a) < 6.0).length, 11);
  check('Medio all failed', medio.filter(a => mediaFinal(a) < 6.0).length, 16);
  check('Baixo all approved', baixo.filter(a => mediaFinal(a) >= 6.0).length, 67);

  console.log('\n--- Correlacao ---');
  const b1lt6 = alunos.filter(a => a.notas.b1 < 6.0);
  check('B1<6 => reprovado', b1lt6.filter(a => mediaFinal(a) < 6.0).length, b1lt6.length);
  const b1gte6 = alunos.filter(a => a.notas.b1 >= 6.0);
  check('B1>=6 => aprovado', b1gte6.filter(a => mediaFinal(a) >= 6.0).length, b1gte6.length);

  console.log('\n--- Tendencias ---');
  const improved = alunos.filter(a => a.notas.b4 > a.notas.b1).length;
  const worsened = alunos.filter(a => a.notas.b4 < a.notas.b1).length;
  const stable = alunos.filter(a => a.notas.b4 === a.notas.b1).length;
  check('Melhoraram', improved, 62);
  check('Pioraram', worsened, 9);
  check('Estaveis', stable, 29);

  console.log('\n--- Quase Aprovados ---');
  const quase = alunos.filter(a => { const m = mediaFinal(a); return m >= 5.0 && m <= 5.9; }).length;
  check('Quase aprovados', quase, 16);

  console.log('\n--- Medias por risco ---');
  const crit_med = critico.map(mediaFinal);
  const alto_med = alto.map(mediaFinal);
  const medio_med = medio.map(mediaFinal);
  console.log(`  Critico: min=${Math.min(...crit_med)}, max=${Math.max(...crit_med)} (expected: 3.5-4.0)`);
  console.log(`  Alto: min=${Math.min(...alto_med)}, max=${Math.max(...alto_med)} (expected: 4.25-4.5)`);
  console.log(`  Medio: min=${Math.min(...medio_med)}, max=${Math.max(...medio_med)} (expected: 5.0-5.5)`);

  console.log('\n--- Nomes ---');
  const names = new Set(alunos.map(a => a.nome));
  check('Nomes unicos', names.size, 100);

  let allOneDecimal = true;
  for (const a of alunos) {
    for (const b of ['b1', 'b2', 'b3', 'b4']) {
      const v = a.notas[b];
      if (r1(v) !== v) {
        allOneDecimal = false;
        console.error(`  FAIL: student ${a.id} ${b}=${v}`);
      }
    }
  }
  console.log(allOneDecimal ? 'OK Todas notas 1 casa decimal' : 'FAIL Notas com mais de 1 casa');

  // Print any students with issues
  for (const a of alunos) {
    const m = mediaFinal(a);
    if (a.notas.b1 >= 6.0 && m < 6.0) {
      console.error(`ISSUE: Student ${a.id} has B1=${a.notas.b1}>=6 but media=${m}<6`);
    }
    if (a.notas.b1 < 6.0 && m >= 6.0) {
      console.error(`ISSUE: Student ${a.id} has B1=${a.notas.b1}<6 but media=${m}>=6`);
    }
    for (const b of ['b1', 'b2', 'b3', 'b4']) {
      if (a.notas[b] < 0 || a.notas[b] > 10) {
        console.error(`ISSUE: Student ${a.id} ${b}=${a.notas[b]} out of range`);
      }
    }
  }

  console.log(`\n=== RESULTADO FINAL: ${allOk ? 'TODAS AS METRICAS OK' : 'EXISTEM FALHAS'} ===`);
  return allOk;
}

validate(alunos);

const outputPath = path.join(__dirname, 'src', 'data', 'alunos.json');
fs.writeFileSync(outputPath, JSON.stringify(alunos, null, 2), 'utf-8');
console.log(`\nArquivo gerado: ${outputPath}`);
