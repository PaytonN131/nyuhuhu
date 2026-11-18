# Nyuhuhu!!

Abre index.html para ver la web. Para editar, abre Iniciar editor.cmd en la carpeta vecina nyuhuhu-editor.

## Editar un parche

1. Pulsa Editar parche en la lista, o Crear parche.
2. Completa el nombre, portada y fondo de esa ficha.
3. Añade las capturas en el orden que quieras.
4. Escribe un paso de instalación por línea y pega la descarga.
5. Pega el enlace del Google Form exclusivo de ese parche.
6. Pulsa Guardar este parche. Recarga la web para ver el resultado.

La casilla Mostrar este parche en mi web permite ocultarlo. Cada ficha tiene su propio fondo y formulario. Si no eliges fondo, se usa el de la página principal. Si no hay formulario, se muestra un aviso de que estará disponible próximamente.

El fondo general de inicio se conserva en data/config.js. El editor solo gestiona parches. Los datos de cada parche están en data/parches.js y sus imágenes importadas en img/editor/. Cada guardado respalda los datos anteriores en nyuhuhu-editor/backups/. Eliminar una imagen de una ficha no borra su archivo, para evitar afectar otros parches.

## Publicar cuando decidas

Sube solo el contenido de nyuhuhu al repositorio y configura GitHub Pages con main y /(root). No subas nyuhuhu-editor ni sus respaldos. La web no necesita backend ni base de datos. El editor local requiere Node.js y se detiene al cerrar su consola.
