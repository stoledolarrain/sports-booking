# 🏟️ ACE - Sistema de Reservas de Canchas Deportivas

ACE es una plataforma web completa diseñada para la gestión de complejos deportivos (Padel, Fútbol, Tenis, etc.). El sistema permite a los administradores gestionar la infraestructura y los horarios, mientras que los clientes pueden realizar reservas en tiempo real y calificar su experiencia.

##  Características Principales...

###  Panel de Administración
* **Gestión de Canchas:** CRUD completo de canchas físicas.
* **Categorización:** Clasificación por tipos de cancha (Padel, Fútbol 5, Fútbol 7, etc.).
* **Control de Horarios:** Creación dinámica de horarios disponibles mediante ventanas modales.
* **Panel Global de Reservas:** Gestión de estados de reservas (Confirmar, Cancelar o Finalizar servicio).
* **Control de Calidad:** Visualización de todas las reseñas y calificaciones dejadas por los clientes.

###  Experiencia del Cliente
* **Reservas en Tiempo Real:** Interfaz visual para seleccionar canchas y horarios disponibles.
* **Historial Personal:** Listado de "Mis Reservas" con estados actualizados.
* **Sistema de Reseñas:** Posibilidad de calificar con estrellas (1-5) y comentarios una vez finalizado el encuentro.
* **Seguridad:** Registro e inicio de sesión seguro con protección de rutas por roles.

##  Tecnologías Utilizadas

* **Backend:** Node.js & Express.js
* **Base de Datos:** MySQL con **Sequelize ORM**.
* **Frontend:** EJS (Template Engine) & Bootstrap 5 para el diseño responsivo.
* **Sesiones:** Express-session para la gestión de autenticación.

##  Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/stoledolarrain/sports-booking.git
   cd tu-repositorio
