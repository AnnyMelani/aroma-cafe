const formulario = document.getElementById('productoForm');
const categoria = document.getElementById('categoria');
const mensaje = document.getElementById('mensaje');

async function cargarCategorias() {
    const respuesta = await fetch('/api/categorias');
    const categorias = await respuesta.json();

    categorias.forEach(cat => {
        const opcion = document.createElement('option');

        opcion.value = cat.id;
        opcion.textContent = cat.nombre;

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
        const respuesta = await fetch('/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${obtenerToken()}`
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            mensaje.textContent = 'Producto creado correctamente.';

            setTimeout(() => {
                window.location.href = 'productos.html';
            }, 1000);

        } else {
            mensaje.textContent =
                resultado.mensaje || 'No se pudo crear el producto.';
        }

    } catch (error) {
        console.error(error);

        mensaje.textContent =
            'Error al conectar con el servidor.';
    }
});

cargarCategorias();