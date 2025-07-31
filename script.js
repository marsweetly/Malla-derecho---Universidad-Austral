const malla = document.getElementById("malla");

const ramosPorSemestre = [
  {
    nombre: "Semestre 1",
    ramos: [
      { nombre: "Jurisdicción", creditos: 5 },
      { nombre: "Sistema Jurídico", creditos: 7 },
      { nombre: "Historia del Derecho", creditos: 5 },
      { nombre: "Teoría Constitucional", creditos: 7 },
      { nombre: "Educación Física y Salud", creditos: 2 },
      { nombre: "Comunicación Oral y Escrita", creditos: 5 }
    ]
  },
  {
    nombre: "Semestre 2",
    ramos: [
      { nombre: "Razonamiento Jurídico", creditos: 7, prereq: ["Sistema Jurídico"] },
      { nombre: "HIstoria del Derecho Chileno", creditos: 5 },
      { nombre: "Conceptos Fundamentales del Derecho Privado", creditos: 5 },
      { nombre: "Introducción a la Profesión Jurídica", creditos: 5 },
      { nombre: "Derecho Constitucional Orgánico", creditos: 7, prereq: ["Teoría Constitucional"] }
    ]
  },
  {
    nombre: "Semestre 3",
    ramos: [
      { nombre: "Teoría de la Justicia", creditos: 5 },
      { nombre: "Acto Jurídico", creditos: 5, prereq: ["Conceptos Fundamentales del Derecho Privado"] },
      { nombre: "Análisis Jurisprudencional", creditos: 2, prereq: ["Razonamiento Jurídico", "Comunicación Oral y Escrita"] },
      { nombre: "Economía", creditos: 5 },
      { nombre: "Derechos Fundamentales", creditos: 7, prereq: ["Teoría Constitucional"] },
      { nombre: "Proceso Civil Ordinario", creditos: 5 }
    ]
  },
  // ... Continúa el resto de semestres (puedo ayudarte a completarlo si deseas)
];

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.innerText = ramo.nombre;
  const creditos = document.createElement("span");
  creditos.className = "creditos";
  creditos.innerText = `${ramo.creditos} créditos`;
  div.appendChild(creditos);

  const completado = estadoRamos[ramo.nombre];
  if (completado) {
    div.classList.add("completado");
  }

  if (!ramo.prereq || ramo.prereq.every(p => estadoRamos[p])) {
    div.classList.add("activo");
    div.onclick = () => {
      div.classList.toggle("completado");
      estadoRamos[ramo.nombre] = div.classList.contains("completado");
      localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
      renderMalla();
    };
  }

  return div;
}

function renderMalla() {
  malla.innerHTML = "";
  ramosPorSemestre.forEach(semestre => {
    const col = document.createElement("div");
    col.className = "semestre";
    const h2 = document.createElement("h2");
    h2.textContent = semestre.nombre;
    col.appendChild(h2);
    semestre.ramos.forEach(ramo => {
      col.appendChild(crearRamo(ramo));
    });
    malla.appendChild(col);
  });
}

document.getElementById("reiniciar").onclick = () => {
  localStorage.removeItem("estadoRamos");
  location.reload();
};

renderMalla();
