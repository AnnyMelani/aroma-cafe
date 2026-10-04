const contenedor = document.getElementById('productos-destacados');

async function cargarProductos() {

    try {

        const respuesta = await fetch(
            '/api/productos'
        );

        const productos = await respuesta.json();

        contenedor.innerHTML = '';

        const destacados = productos.slice(0, 6);

        destacados.forEach(producto => {

            const tarjeta = document.createElement('article');

            tarjeta.classList.add('producto-card');

            const imagen = producto.imagen_url
                ? producto.imagen_url
                : 'img/producto-default.jpg';

            tarjeta.innerHTML = `
                <img src="${imagen}" alt="${producto.nombre}">

                <div class="producto-info">

                    <h3>${producto.nombre}</h3>

                    <p>
                        ${producto.descripcion}
                    </p>

                    <p class="precio">
                        S/ ${producto.precio}
                    </p>

                    <a
                        href="producto.html?id=${producto.id}"
                        class="btn"
                    >
                        Ver producto
                    </a>

                </div>
            `;

            contenedor.appendChild(tarjeta);

        });

    } catch (error) {

        console.error('Error:', error);

        contenedor.innerHTML = `
            <p>
                No se pudieron cargar los productos.
            </p>
        `;
    }
}

cargarProductos();
