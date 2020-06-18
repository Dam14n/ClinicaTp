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


## Desarrollo

Para correr la aplicacion solamente utilizar el comando ng-serve

## Requerimientos de la aplicación

“La clínica OnLine, especialista en salud, cuenta
actualmente con consultorios (6 en la actualidad),
dos laboratorios (físicos en la clínica), y una sala
de espera general. Está abierta al público de lunes
a viernes en el horario de 8:00 a 19:00, y los
sábados en el horario de 8:00 a 14:00.
Trabajan en ella profesionales de diversas
especialidades, que ocupan los consultorios acorde a su disponibilidad, y reciben en ellos
pacientes con turno para consulta o tratamiento. Dichos turnos son pedidos por la web
seleccionando el profesional o la especialidad .La duración mínima de un turno es 30 minutos.”
pero los profesionales pueden cambiar la duración según su especialidad. un profesional puede
tener más de una especialidad
Estamos necesitando un sistema para que cada uno de los tipos de usuarios realicen las tareas
que se detallan a continuación.