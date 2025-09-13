// 1 manipulacion del dom
document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.querySelector("#productos .row");
    productosContainer.innerHTML = "";
    cargarProductos();
  
    const footer = document.querySelector("footer");
    const nuevoParrafo = document.createElement("p");
    nuevoParrafo.textContent = "© 2025 Tienda Gamer - Proyecto académico";
    footer.appendChild(nuevoParrafo);

    configurarEventos();
});
  
// 2 implementacion de eventos
function configurarEventos() {
// evento click en el navbar brand
const brand = document.querySelector(".navbar-brand");
brand.addEventListener("click", () => {
    alert("Bienvenido a la Tienda Gamer 🎮");
});

// evento mouseover en el titulo productos
const titulo = document.querySelector("#productos h2");
titulo.addEventListener("mouseover", () => {
    titulo.style.color = "white";
});
titulo.addEventListener("mouseout", () => {
    titulo.style.color = "";
});

// evento submit en un formulario de contacto
const form = document.querySelector("#form-contacto");
if (form) {
    form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.querySelector("#nombre").value;
    alert(`Gracias por tu mensaje, ${nombre}!`);
    form.reset();
    });
}
}

// 3 uso de fetch api
async function cargarProductos() {
try {
    const respuesta = await fetch("data/productos.json");
    if (!respuesta.ok) throw new Error("Error al cargar productos");

    const productos = await respuesta.json();
    mostrarProductos(productos);
} catch (error) {
    console.error("Hubo un problema:", error);
}
}

// mostrar productos en cards dinámicamente
function mostrarProductos(productos) {
const productosContainer = document.querySelector("#productos .row");

productos.forEach((p) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    col.innerHTML = `
    <div class="card h-100 bg-gris">
        <img src="${p.imagen}" class="card-img-top" alt="${p.titulo}">
        <div class="card-body text-white text-center">
        <h5 class="card-title">${p.titulo}</h5>
        <p class="card-text">${p.descripcion}</p>
        </div>
    </div>
    `;
    productosContainer.appendChild(col);
});
}
  