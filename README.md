# Portfolio — Oscar Arroyo

Portfolio profesional de Full Stack Web Developer. HTML, CSS y JavaScript puros (sin frameworks ni build).

## Estructura

```
oscar-arroyo-portfolio/
├── index.html              → página principal
├── css/
│   └── style.css           → todos los estilos
├── js/
│   └── script.js           → menú mobile, tabs, animaciones, formulario
└── Oscar_Arroyo_CV.pdf      → CV descargable (enlazado desde los botones "Descargar CV")
```

## Cómo verlo en tu computadora

Abrí `index.html` directamente en el navegador (doble click) o, mejor, serví la carpeta con un servidor local para que las rutas relativas (CSS, JS, CV) funcionen igual que en producción:

```bash
cd oscar-arroyo-portfolio
python3 -m http.server 8000
```

Después entrá a `http://localhost:8000` en el navegador.

## Cómo publicarlo (gratis)

Cualquiera de estas opciones sirve la carpeta tal cual, sin necesidad de build ni instalar dependencias:

- **Vercel**: [vercel.com/new](https://vercel.com/new) → arrastrás la carpeta o conectás el repo de GitHub.
- **Netlify**: [app.netlify.com/drop](https://app.netlify.com/drop) → arrastrás la carpeta directamente.
- **GitHub Pages**: subís la carpeta a un repo de GitHub → Settings → Pages → elegís la rama y listo.

## Pendiente antes de publicar

- [ ] Reemplazar los mockups ilustrativos de los proyectos por capturas reales.
- [ ] Completar los links "Ver proyecto" / "Ver código" de cada tarjeta con las URLs reales de tus repos y demos.
- [ ] Confirmar si "Dashboard administrativo" y "API REST con JWT" son proyectos reales o hay que sacarlos/aclararlos.
- [ ] Revisar los textos de "Sobre mí" y las descripciones de proyectos — hoy son genéricos, conviene reescribirlos con detalles reales.
- [ ] Actualizar los nombres de repos en la sección "Mi código está en GitHub" si no coinciden con los tuyos.

## Notas técnicas

- Los logos de tecnologías en la sección "Mi Stack" se cargan desde `cdn.simpleicons.org` — necesitan conexión a internet para mostrarse (funcionan normal una vez publicado el sitio).
- El formulario de contacto es una demo visual (no envía datos a ningún servidor). Para que funcione de verdad, conectalo a un servicio como [Formspree](https://formspree.io) o a tu propio backend.
