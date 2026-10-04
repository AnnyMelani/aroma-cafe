const token = sessionStorage.getItem('token');

if (!token) {
    window.location.href = 'login.html';
}

function obtenerToken() {
    return sessionStorage.getItem('token');
}

function cerrarSesion() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');

    window.location.href = 'login.html';
}