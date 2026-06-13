-- Seed: 3 tipos de cliente
-- IMPORTANTE: reemplazar 'test_integrity_xxxxxxxxxxxx' por las integrity keys
-- reales de prueba de Wompi antes de usar el Sprint 7.
insert into landing_pages (
  slug, nombre_oferta, subtitulo, video_url, imagenes_carrusel,
  precio_original, precio_oferta_estado1, precio_oferta_estado2,
  wompi_reference, wompi_public_key, wompi_integrity_key, moneda, categoria, beneficios,
  activo, texto_cta, duracion_oferta_minutos
) values
(
  'finca-el-eden',
  'Finca El Edén - Escapada Todo Incluido',
  'Un fin de semana de desconexión total a 1h de Bogotá, con piscina privada y desayuno incluido.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  array[
    'https://example.com/finca-el-eden/1.jpg',
    'https://example.com/finca-el-eden/2.jpg',
    'https://example.com/finca-el-eden/3.jpg'
  ],
  450000, 249000, 299000,
  'FINCA-EDEN-001', 'pub_test_xxxxxxxxxxxx', 'test_integrity_xxxxxxxxxxxx', 'COP', 'finca',
  array['Piscina privada', 'Desayuno incluido', 'Zona BBQ', 'Wifi gratis'],
  true, null, 15
),
(
  'bono-exito-cachipay',
  'Bono de $100.000 en Éxito Cachipay',
  'Aprovecha este bono para tu mercado, válido en toda la tienda.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  array[
    'https://example.com/bono-exito/1.jpg',
    'https://example.com/bono-exito/2.jpg'
  ],
  100000, 59000, 75000,
  'BONO-EXITO-001', 'pub_test_xxxxxxxxxxxx', 'test_integrity_xxxxxxxxxxxx', 'COP', 'bono_supermercado',
  array['Válido por 6 meses', 'Sin mínimo de compra', 'Aplica en toda la tienda'],
  true, 'Quiero mi bono', 15
),
(
  'cafe-mirador-anolaima',
  'Café Mirador Anolaima - Combo para 2',
  'Disfruta de un combo de café especial + postre con la mejor vista de Anolaima.',
  null,
  array[
    'https://example.com/cafe-mirador/1.jpg',
    'https://example.com/cafe-mirador/2.jpg',
    'https://example.com/cafe-mirador/3.jpg'
  ],
  60000, 35000, 45000,
  'CAFE-MIRADOR-001', 'pub_test_xxxxxxxxxxxx', 'test_integrity_xxxxxxxxxxxx', 'COP', 'cafeteria',
  array['Combo para 2 personas', 'Vista panorámica', 'Postre incluido'],
  true, null, 15
);
