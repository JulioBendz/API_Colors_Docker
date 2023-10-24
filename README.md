# Aplicación de Gestión de Colores o Catálogo de Colores

## Introducción

Esta es una aplicación de gestión o catálogo de colores que te permite copiar fácilmente lo colores estandarizados por la empresa para las creaciones digitales. Puedes realizar diversas operaciones con los colores, como crear (guardar), listar (mostrar), actualizar y eliminar colores. La aplicación también admite la paginación de resultados y puede responder en formato JSON o según la preferencia del cliente se le puede agregar la respuesta en formato XML.

## Tecnologías Utilizadas

- Node.js: Entorno de ejecución de JavaScript en el servidor
- Express: Marco de desarrollo de aplicaciones web para Node.js
- MySQL: Sistema de gestión de bases de datos relacional
- xml2js: Biblioteca para convertir objetos JavaScript a XML
- RENDER: Es una plataforma en la nube que ofrece servicios de alojamiento y despliegue de aplicaciones web y sitios web. 
- MySQL by Clever Cloud: Servicio de base de datos gestionada en la nube.
- Otros módulos y paquetes npm para gestionar la lógica de la aplicación y la base de datos.

## Instalación
Para ejecutar este proyecto en tu entorno de desarrollo, sigue estos pasos:

1. Clona el repositorio: `git clone https://github.com/JulioBendz/API_Colores.git`
2. Navega al directorio del proyecto: `cd API_Colores`
3. Instala las dependencias: `npm install`
4. Inicia el servidor: `npm start`

## URL de Producción
Puedes acceder a la aplicación en producción en [ape-colors.onrender.com](https://ape-colors.onrender.com/api/colors/).

## Poblar la Base de Datos
Para cargar datos iniciales en la base de datos, ejecuta el script de semilla:

