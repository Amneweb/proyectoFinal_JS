# Proyecto Final curso de JS
## Idea general
Se trata de un moderno complejo de salas de cine en el que se proyectan películas de los años 80 y 90. Cuenta con 3 salas y un local de venta de snacks y golosinas a la entrada (que se pueden comprar de forma anticipada junto con las entradas). 
## Recorrido del usuario
### General
El sitio consta de una sola página dividida en secciones
1. menú superior de navegación con botón para compra de entradas 
1. Sección Hero con imagen inicial y cartel llamador para comprar entradas
1. Sección de películas en cartelera
1. Muestrario de snacks disponibles
1. Información de las salas del complejo
1. Contacto (pendiente de finalización)

Tanto el cartel inicial como el botón del menú superior para comprar entradas abren una sección que se muestra sobre el 90% de la pantalla ocultando el resto (overlay) y en esa sección se realiza todo el proceso de compra de entradas y snacks.

También se puede iniciar la compra de entradas desde la cartelera, en donde se puede elegir la película y se abre el mismo overlay pero con la película en cuestión ya seleccionada.
### Dentro de la sección de compra de entradas
Una vez que se hace click en el botón de compra de entradas y se muestra el overlay 
1. -> Aparece un input select con las opciones de película en cartelera
1. -> Una vez elegida la película, aparecen las opciones de días y horas en que se proyecta la película (funciones) 
1. -> Elegida la función, se muestra un input para ingresar la cantidad de entradas
1. -> Con esos tres datos cargados se envía el formulario y se muestra un layout de la platea para elegir el/los asiento/s. 
1. -> Una vez elegidos los asientos y confirmada la compra de las entradas, se muestra una ‘vidriera’ con opciones de snacks para agregar a la compra.
### Eligiendo snacks y finalizando la compra
* Si no se quiere agregar snacks, el botón verde de pagar dirige al final del simulador.
* Si se quiere agregar snacks, se hace click en el botón **elegir** del snack correspondiente tantas veces como snacks se deseen. Los snacks elegidos se irán mostrando en el ‘carrito’, sumándose su valor al de las entradas. La cantidad se puede disminuir desde el tacho de basura en el carrito donde se muestran los snacks.
* Definidos los snacks, el botón verde de **pagar** nos dirige al final del simulador.
### Datos extra sobre las películas
Desde la cartelera también se puede ver información detallada de cada película haciendo click en el botón **ver más**.
En este caso también se abre un overlay, esta vez con los datos de la película obtenidos desde la API de The Movie Database.
## Info 'técnica' del proyecto
* El Storage se hizo en Session storage porque la venta de entradas y elección de asientos tiene un tiempo límite ya que hay que liberarlos para otros potenciales clientes. Los asientos elegidos tienen una 'vida útil' muy corta y no tiene sentido almacenarlos en local storage. (algunos sitios web tienen un contador para que el usuario sepa que no puede demorarse en la compra)
* La platea se hizo con checkboxes que representan los asientos. La ocupación que se ve en el simulador está generada aleatoriamente con la función random que devuelve 1 o 0 para cada asiento. Los asientos con 1 están ocupados (y las correspondientes checkboxes están en estado disabled) y los 0 libres. Para cambiar el estado de los asientos (libres, ocupados o elegidos) se usan clases (libre o elegido) y estados de los checkboxes (checked, unchecked e indeterminado)
* Al cargar la página, las secciones Cartelera y Snacks se 'dibujan' desde Javascript. Las salas ya están cargadas en el html.
* **IMPORTANTE** La película de cartelera Africa Mía tiene un id erróneo, de manera que cuando se busca la info en la API salta un error, que es 'atrapado' con el catch y la función errorHandler.
## Mejoras pendientes
* Hacer que la página sea responsive
* Finalizar la sección de contactos
* Mejorar detalles de estilos como márgenes, tamaños y colores
* Agregar animaciones para abrir y cerrar pantallas o carteles
* Corregir flechas en carousel, que se hagan transparentes cuando el carousel llega al final
* Generar un PDF con QR al final de la compra

## NOTA sobre esta versión del proyecto
Esta versión se deriva del repositorio proyectoJS, que también se puede visitar haciendo click en el siguiente enlace
https://github.com/Amneweb/proyectoJS

