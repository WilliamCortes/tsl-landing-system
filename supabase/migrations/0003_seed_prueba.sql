-- Landing de prueba para validar el flujo en producción
-- Usa el mismo video de prueba que las otras 3 landings y las credenciales
-- Wompi de producción del comercio (mismas que finca-el-eden, etc.).
insert into landing_pages (
  slug, nombre_oferta, subtitulo, video_url, imagenes_carrusel,
  precio_original, precio_oferta_estado1, precio_oferta_estado2,
  wompi_reference, wompi_public_key, wompi_integrity_key, moneda, categoria, beneficios,
  activo, texto_cta, duracion_oferta_minutos
) values (
  'prueba',
  'Landing de prueba',
  'Página de prueba para validar el flujo completo de la landing.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  array[]::text[],
  100000, 49000, 59000,
  'PRUEBA-001', 'pub_prod_N7Y8Z0ukuvnm20Uqu9Y1P0khyot5zFzu', 'prod_integrity_Qcp0KHiR8f9PXM9YYNe7fnG5hnaYhACL', 'COP', 'otro',
  array['Beneficio de prueba 1', 'Beneficio de prueba 2', 'Beneficio de prueba 3'],
  true, null, 15
);
