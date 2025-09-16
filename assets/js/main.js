// manipulacion del dom
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
  
// implementacion de eventos
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

// uso de fetch api
async function cargarProductos() {
try {
    const respuesta = await fetch("assets/data/productos.json");
    if (!respuesta.ok) throw new Error("Error al cargar productos");

    const productos = await respuesta.json();
    mostrarProductos(productos);
} catch (error) {
    console.error("Hubo un problema:", error);
}
}

let carrito = [];

// mostrar productos en cards dinámicamente
function mostrarProductos(productos) {
  const productosContainer = document.querySelector("#productos .row");

  productos.forEach((p, index) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card h-100 bg-gris">
        <img src="${p.imagen}" class="card-img-top" alt="${p.titulo}">
        <div class="card-body text-white text-center">
          <h5 class="card-title">${p.titulo}</h5>
          <p class="card-text">${p.descripcion}</p>
          <p class="fw-bold">$${p.precio}</p>
          <button class="btn btn-primary btn-agregar" data-index="${index}">Agregar al carrito</button>
        </div>
      </div>
    `;
    productosContainer.appendChild(col);
  });

  // eventos click en botones
  document.querySelectorAll(".btn-agregar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      agregarAlCarrito(productos[index]);
    });
  });

  // evento para vaciar carrito
  const btnVaciar = document.querySelector("#vaciar-carrito");
  btnVaciar.addEventListener("click", vaciarCarrito);
}

// agregar producto al carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
  renderCarrito();
}

// renderizar carrito
function renderCarrito() {
  const lista = document.querySelector("#lista-carrito");
  const totalSpan = document.querySelector("#total");

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((p) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = `${p.titulo} - $${p.precio}`;
    lista.appendChild(li);

    total += p.precio;
  });

  totalSpan.textContent = total;
}

// vaciar carrito
function vaciarCarrito() {
  carrito = [];
  renderCarrito();
}


  