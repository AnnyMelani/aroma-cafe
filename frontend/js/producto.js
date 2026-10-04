const contenedor =
    document.getElementById('producto-detalle');

const parametros =
    new URLSearchParams(window.location.search);

const id =
    parametros.get('id');

async function cargarProducto() {

    try {

        const respuesta =
            await fetch(`/api/productos/${id}`);

        if (!respuesta.ok) {

            throw new Error(
                'Producto no encontrado'
            );
        }

        const producto =
            await respuesta.json();

        const imagen =
            producto.imagen_url ||
            'img/producto-default.jpg';

        contenedor.innerHTML = `

            <div class="producto-detalle">

                <img
                    src="${imagen}"
                    alt="${producto.nombre}"
                >

                <div>

                    <h1>
                        ${producto.nombre}
                    </h1>

                    <p>
                        ${producto.descripcion}
                    </p>

                    <h2>
                        S/ ${producto.precio}
                    </h2>

                    <p>
                        Categoría:
                        ${producto.categoria}
                    </p>

                    <p>
                        ${
                            producto.disponible
                            ? 'Disponible'
                            : 'No disponible'
                        }
                    </p>

                    <p>
                        Stock:
                        ${producto.stock}
                    </p>

                    <br>

                    <a
                        href="menu.html"
                        class="btn"
                    >
                        Volver al menú
                    </a>

                </div>

            </div>
        `;

    } catch (error) {

        console.error(error);

        contenedor.innerHTML = `
            <p>
                No se pudo encontrar el producto.
            </p>
        `;
    }
}

cargarProducto();