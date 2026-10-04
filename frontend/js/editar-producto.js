const formulario = document.getElementById('productoForm');
const categoria = document.getElementById('categoria');
const mensaje = document.getElementById('mensaje');

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

async function cargarProducto() {

    const respuesta = await fetch(`/api/productos/${id}`);
    const producto = await respuesta.json();

    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('stock').value = producto.stock;

    document.getElementById('imagen_url').value =
        producto.imagen_url || '';

    await cargarCategorias(producto.categoria_id);
}

async function cargarCategorias(categoriaActual) {

    const respuesta = await fetch('/api/categorias');
    const categorias = await respuesta.json();

    categorias.forEach(cat => {

        const opcion = document.createElement('option');

        opcion.value = cat.id;
        opcion.textContent = cat.nombre;

        if (cat.id === categoriaActual) {
            opcion.selected = true;
        }

        categoria.appendChild(opcion);
    });
}

formulario.addEventListener('submit', async (event) => {

    event.preventDefault();

    const datos = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value),
        categoria_id: parseInt(categoria.value),
        imagen_url: document.getElementById('imagen_url').value || null,
        disponible: true
    };

    try {

        const respuesta = await fetch(`/api/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${obtenerToken()}`
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {

            mensaje.textContent =
                'Producto actualizado correctamente.';

            setTimeout(() => {
                window.location.href = 'productos.html';
            }, 1000);

        } else {

            mensaje.textContent =
                resultado.mensaje || 'No se pudo actualizar.';
        }

    } catch (error) {

        console.error(error);

        mensaje.textContent =
            'Error al conectar con el servidor.';
    }
});

cargarProducto();