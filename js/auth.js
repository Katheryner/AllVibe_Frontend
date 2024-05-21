document.addEventListener('DOMContentLoaded', () => {
    const adminLink = document.getElementById('admin-link');
  
    // Obtener el token del local storage
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const userRole = decodedToken.role;
  
        // Verificar el rol del usuario
        if (userRole !== 'admin') {
          adminLink.style.display = 'none';
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        adminLink.style.display = 'none';
      }
    } else {
      adminLink.style.display = 'none';
    }
  });
  