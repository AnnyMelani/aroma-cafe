const productosContenedor =
    document.getElementById('productos');

const categoriasContenedor =
    document.getElementById('categorias');

let productos = [];
let categoriaSeleccionada = 'todas';


async function cargarDatos() {

    try {

        const respuestaProductos =
            await fetch('/api/productos');

        productos =
            await respuestaProductos.json();


        const respuestaCategorias =
            await fetch('/api/categorias');

        const categorias =
            await respuestaCategorias.json();


        mostrarCategorias(categorias);

        mostrarProductos();

    } catch (error) {

        console.error(error);

        productosContenedor.innerHTML =
            '<p>No se pudieron cargar los productos.</p>';
    }
}


function mostrarCategorias(categorias) {

    categorias.forEach(categoria => {

        const boton =
            document.createElement('button');

        boton.classList.add('btn', 'filtro');

        boton.textContent =
            categoria.nombre;

        boton.dataset.categoria =
            categoria.id;

        boton.addEventListener('click', () => {

            categoriaSeleccionada =
                categoria.id;

            document
                .querySelectorAll('.filtro')
                .forEach(btn =>
                    btn.classList.remove('activo')
                );

            boton.classList.add('activo');

            mostrarProductos();
        });

        categoriasContenedor.appendChild(boton);
    });


    document
        .querySelector('[data-categoria="todas"]')
        .addEventListener('click', () => {

            categoriaSeleccionada = 'todas';

            document
                .querySelectorAll('.filtro')
                .forEach(btn =>
                    btn.classList.remove('activo')
                );

            document
                .querySelector('[data-categoria="todas"]')
                .classList.add('activo');

            mostrarProductos();
        });
}


function mostrarProductos() {

    productosContenedor.innerHTML = '';


    let productosFiltrados;

    if (categoriaSeleccionada === 'todas') {

        productosFiltrados = productos;

    } else {

        productosFiltrados =
            productos.filter(producto =>
                producto.categoria_id ==
                categoriaSeleccionada
            );
    }


    productosFiltrados.forEach(producto => {

        const tarjeta =
            document.createElement('article');

        tarjeta.classList.add('producto-card');


        const imagen =
            producto.imagen_url ||
            'img/producto-default.jpg';


        tarjeta.innerHTML = `

            <img
                src="${imagen}"
                alt="${producto.nombre}"
            >

            <div class="producto-info">

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    ${producto.descripcion}
                </p>

                <p class="precio">
                    S/ ${producto.precio}
                </p>

                <p>
                    ${
                        producto.disponible
                        ? 'Disponible'
                        : 'No disponible'
                    }
                </p>

                <a
                    href="producto.html?id=${producto.id}"
                    class="btn"
                >
                    Ver detalle
                </a>

            </div>
        `;


        productosContenedor.appendChild(tarjeta);
    });


    if (productosFiltrados.length === 0) {

        productosContenedor.innerHTML =
            '<p>No hay productos en esta categoría.</p>';
    }
}


cargarDatos();
