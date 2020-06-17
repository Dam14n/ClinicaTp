# Clinica

Este es un trabajo practico para la UTN-FRA el cual consiste en generar una atencion para un consultorio. En donde van a existir 3 tipos de usuarios: ADMINISTRADORES, PACIENTES Y PROFESIONALES.

## Usuarios
ADMINISTRADOR: tiene acceso a todas las funciones del sistema y ademas puede ser un paciente pero no puede atender

PACIENTE: va a tener 2 imagenes en el momento de la alta

PROFESIONAL: puede tener mas de 1 especialidad y va a tener que ser aprobado por un ADMINISTRADOR para poder recibir turnos. Ademas una vez aprobado va a tener que configurar sus horarios y dias de atencion.

## Turnos
Segun el tipo de usuario que este logueado, el mismo va a poder ver solo los turnos que le pertencen a el mismo. Si es un profesional va a ver todos los turnos que puede confirmar o rechazar. Si es un paciente o administrador va a ver todos los turnos que realizo.

Todos los usuarios pueden cancelar un turno pero solamente el profesional puede confirmar uno.

Cuando el turno se realiza, el profesional puede cargar datos extras del paciente y dar una breve resenia de la atencion.

De la misma forma luego de ser atendido el paciente puede hacer una devolucion para el profesional.


## Development

Para correr la aplicacion solamente utilizar el comando ng-serve