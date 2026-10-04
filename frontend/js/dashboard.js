function obtenerToken() {
    return sessionStorage.getItem('token');
}

function cerrarSesion() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');

    window.location.href = 'login.html';
}


// Obtener resumen del dashboard
async function cargarResumen() {

    const authToken = obtenerToken();

    if (!authToken) {
        return;
    }

    try {

        const respuesta = await fetch('/api/dashboard/resumen', {
            method: 'GET',

            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            console.error(
                'Error al obtener resumen:',
                datos.mensaje
            );

            if (respuesta.status === 401) {

                sessionStorage.removeItem('token');
                sessionStorage.removeItem('usuario');

                window.location.href = 'login.html';
            }

            return;
        }

        document.getElementById('totalProductos').textContent =
            datos.totalProductos;

        document.getElementById('productosDisponibles').textContent =
            datos.productosDisponibles;

        document.getElementById('productosStockBajo').textContent =
            datos.productosStockBajo;

        document.getElementById('totalCategorias').textContent =
            datos.totalCategorias;

    } catch (error) {

        console.error(
            'Error al conectar con el servidor:',
            error
        );
    }
}

cargarResumen();