const lista = document.getElementById('lista-productos');

const modal = document.getElementById('modalEliminar');
const cancelarEliminar = document.getElementById('cancelarEliminar');
const confirmarEliminar = document.getElementById('confirmarEliminar');
const mensajeExito = document.getElementById('mensajeExito');

let productoAEliminar = null;

async function cargarProductos() {

    try {

        const respuesta =
            await fetch('/api/productos');

        const productos =
            await respuesta.json();

        lista.innerHTML = '';

        productos.forEach(producto => {

            const fila =
                document.createElement('tr');

            fila.innerHTML = `
                <td>${producto.id}</td>

                <td>${producto.nombre}</td>

                <td>
                    ${producto.categoria ||
                    producto.categoria_nombre ||
                    'Sin categoría'}
                </td>

                <td>
                    S/ ${producto.precio}
                </td>

                <td>
                    ${producto.stock}
                </td>

                <td>
                    ${
                        producto.disponible
                        ? 'Disponible'
                        : 'No disponible'
                    }
                </td>

                <td>

                    <a
                        href="editar-producto.html?id=${producto.id}"
                        class="btn"
                    >
                        Editar
                    </a>

                    <button
                        class="btn-eliminar-tabla"
                        onclick="abrirModalEliminar(${producto.id})"
                    >
                        Eliminar
                    </button>

                </td>
            `;

            lista.appendChild(fila);
        });

    } catch (error) {

        console.error(
            'Error:',
            error
        );
    }
}

function abrirModalEliminar(id) {

    productoAEliminar = id;

    modal.classList.add('mostrar');
}

cancelarEliminar.addEventListener('click', () => {

    modal.classList.remove('mostrar');

    productoAEliminar = null;
});

confirmarEliminar.addEventListener('click', async () => {

    if (!productoAEliminar) {
        return;
    }

    try {

        const respuesta =
            await fetch(
                `/api/productos/${productoAEliminar}`,
                {
                    method: 'DELETE',

                    headers: {
                        'Authorization':
                            `Bearer ${obtenerToken()}`
                    }
                }
            );

        const resultado =
            await respuesta.json();

        if (respuesta.ok) {

            modal.classList.remove('mostrar');

            mensajeExito.classList.add('mostrar');

            setTimeout(() => {

                mensajeExito.classList.remove('mostrar');

            }, 3000);

            productoAEliminar = null;

            cargarProductos();

        } else {

            alert(
                resultado.mensaje ||
                'No se pudo eliminar el producto.'
            );
        }

    } catch (error) {

        console.error(error);

        alert(
            'Error al conectar con el servidor.'
        );
    }
});

cargarProductos();