const formulario = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value;

    try {
        const respuesta = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mensaje.textContent = datos.mensaje;
            return;
        }

        sessionStorage.setItem('token', datos.token);
        sessionStorage.setItem(
            'usuario',
            JSON.stringify(datos.usuario)
        );

        window.location.href = 'index.html';

    } catch (error) {
        console.error(error);
        mensaje.textContent =
            'No se pudo conectar con el servidor.';
    }
});