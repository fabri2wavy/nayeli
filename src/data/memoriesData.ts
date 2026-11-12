
export interface DayVideo {
  id: string;
  dayNumber: number; // Del 1 al 11
  date: string;
  title: string;
  shortNote: string;
  driveUrl: string; // Enlace a Drive o video (Parte 1)
  driveUrl2?: string; // Enlace a Drive o video (Parte 2, opcional para días con 2 videos)
  durationHint?: string; // Opcional (informativo, NO corta el video)
  isFinale?: boolean;
}

export interface GalleryPhoto {
  id: string;
  imageUrl: string; // Ruta en /public/photos/... o URL externa
  date: string;
  caption: string; // Texto corto debajo de la foto (frente de la Polaroid)
  backNote: string; // Nota íntima escrita detrás de la Polaroid (al girar en 3D)
  rotation: number; // Ligera inclinación estética en grados (-3 a 3)
}

// 1. CREDENCIALES Y TEXTOS DEL CANDADO (PANTALLA 1)
export const AUTH_CONFIG = {
  recipientName: "Para Nayeli",
  subtitle: "Algunos recuerdos tienen su propia llave",
  expectedUsername: "bebe", // Se valida con .trim().toLowerCase()
  expectedPassword: "25042025", // Nuestra fecha (DDMMAAAA)
  usernamePlaceholder: "Cómo te decía siempre...",
  passwordPlaceholder: "Nuestra fecha (DDMMAAAA)",
  passwordHint: "Pista: Nuestra fecha especial en formato DDMMAAAA (8 dígitos)",
  errorMessage: "Intenta de nuevo, tú sabes cuál es...",
  unlockButtonText: "Abrir cápsula",
  storageKey: "nayeli_capsula_11_dias_unlocked_v1",
};

// 2. CONFIGURACIÓN DE MÚSICA DE FONDO
export const MUSIC_CONFIG = {
  /**
   * Coloca tu archivo MP3 en la carpeta `public/cancion.mp3` de tu proyecto.
   * Si el archivo aún no existe o el navegador bloquea el archivo externo en vista previa,
   * el reproductor incluye un sintetizador acústico cálido de respaldo para que siempre suene.
   */
  audioSrc: "/cancion.mp3",
  defaultVolume: 0.25,
  songTitle: "Nuestra melodía de fondo",
  floatingNotice: "Puedes pausar la música aquí al ver cada video",
};

// 3. TEXTOS DEL PRÓLOGO (PANTALLA 2)
export const PROLOGUE_CONFIG = {
  badge: "Capítulo Final",
  lines: [
    "11 días de contacto cero.",
    "11 días en los que el silencio pesaba, pero nunca dejé de hablar contigo.",
    "Hoy cerramos este capítulo con amor, pero antes quería dejarte lo que viví en cada uno de esos días.",
  ],
  continueButtonText: "Recorrer los 11 días",
};

// 4. ARRAY DE LOS 11 VIDEOS (PANTALLA 3)
export const TWELVE_DAYS_VIDEOS: DayVideo[] = [
  {
    id: "dia-1",
    dayNumber: 1,
    date: "Día 01 • El primer silencio",
    title: "Intentar alejarme",
    shortNote:
      "El primer día fue el más fuerte. Tome la decision de irme pero, decidí grabar esto en lugar de romper tu espacio.",
    driveUrl: "https://drive.google.com/file/d/1_R8dro1Pc6BawiOWC31yTU21cYFPc8d3/view?usp=sharing",
  },
  {
    id: "dia-2",
    dayNumber: 2,
    date: "Día 02 • Las pequeñas cosas",
    title: "Aceptar mi error",
    shortNote:
      "Hoy me escribiste para que actue maduramente, y acepte mi error, pero me costo trabajo entenderte",
    driveUrl: "https://drive.google.com/file/d/1XGolP921AJBYWZM_ajxljXmgQM_pKNXT/view?usp=sharing",
  },

  {
    id: "dia-3",
    dayNumber: 3,
    date: "Día 03 • Lindo recuerdo en GYA",
    title: "Todo tiene tu nombre en la ciudad",
    shortNote:
      "Hoy fui por donde nos sacamos una foto cuando vinimos a gya, no se guardan en un cajón de un día para otro.",
    driveUrl: "https://drive.google.com/file/d/15vlPvbreqfeXuSho_nGJz3SRC1eQwZo1/view?usp=sharing",
  },
  {
    id: "dia-4",
    dayNumber: 4,
    date: "Día 04 • Perder todo",
    title: "577 dias de racha",
    shortNote:
      "Perdimos la racha de tiktok, de 577 videos, 30% amor, 20% comedia y 50% comida, hahaha",
    driveUrl: "https://drive.google.com/file/d/1fjm_BZtOMl8Ohx-Mo_L1-RKjdlgv4x55/view?usp=sharing",
  },
  {
    id: "dia-5",
    dayNumber: 5,
    date: "Día 05 • Mitad del camino",
    title: "Los sueños pesan mucho",
    shortNote:
      "Hay silencios que pesan más a medianoche. Este día grabé pensando en tu risa y en la paz que me dabas, estas en mis sueños.",
    driveUrl: "https://drive.google.com/file/d/1T3Sdos4yQhnp9P3o6tYc-jzJ_YjWpMFI/view?usp=sharing",
  },
  {
    id: "dia-6",
    dayNumber: 6,
    date: "Día 06 • Conectar (2 partes)",
    title: "Abri mi corazon a la naturalez",
    shortNote:
      "Conocerte tan bien Nayeli, desde basicas, se que no volveras, sera para despedirte. Y que lindo atardecer me regalo Dios",
    driveUrl: "https://drive.google.com/file/d/1GHt3rbkNgyf1PvoX9dJGYGriUKOfYMKh/view?usp=sharing",
    driveUrl2: "https://drive.google.com/file/d/1dBpO1fb663e6e3-rY8nwl0UfrM1MgWRI/view?usp=sharing",
  },
  {
    id: "dia-7",
    dayNumber: 7,
    date: "Día 07 • 24hrs de viaje",
    title: "Un largo viaje y en todas las 24hrs te pienso",
    shortNote:
      "Una semana entera sin saber de ti. Decidi mandarte flores por tu actuacion de Danzart, no te vi, pero se que estuviste muy linda",
    driveUrl: "https://drive.google.com/file/d/1m64AxqK4sVXqlABh6kOuv_3V2nZBBf9h/view?usp=sharing",
  },
  {
    id: "dia-8",
    dayNumber: 8,
    date: "Día 08 • Desearte lo mejor",
    title: "Contacto cero, no significa que no pueda enviarte flores",
    shortNote:
      "Espere todo el dia tu mensaje del ramo de flores, no fue tan buena idea?",
    driveUrl: "https://drive.google.com/file/d/1Gqv15pGWhpwhpDicYV_Chqi7gdBPeu1o/view?usp=sharing",
  },
  {
    id: "dia-9",
    dayNumber: 9,
    date: "Día 09 • Soltar con ternura (2 partes)",
    title: "Querer también es saber despedirse",
    shortNote:
      "Entendí que amar no siempre significa aferrarse. A veces el acto más grande de amor es desearle paz a la otra persona, aunque ya no sea a tu lado.",
    driveUrl: "https://drive.google.com/file/d/1B7jEfs7oedXAmXYr6VtpGF-vyA6KI1C5/view?usp=sharing",
    driveUrl2: "https://drive.google.com/file/d/1IOThg_2YTrWuaTUICMg6r5JbtJAF8csg/view?usp=sharing",
  },
  {
    id: "dia-10",
    dayNumber: 10,
    date: "Día 10 • El detalle que preparé (2 partes)",
    title: "Por qué elegí este anillo para ti",
    shortNote:
      "Hoy fui a buscar algo que pudiera quedarse contigo cuando las palabras se acaben. En este video te muestro el momento en que pensé en este regalo.",
    driveUrl: "https://drive.google.com/file/d/1CaDVYNJBEOSg9NtnjTFdf_J84KLGkPlW/view?usp=sharing",
    driveUrl2: "https://drive.google.com/file/d/1DvxSsvyI-cJxovErrQL4E1KZcID0qCDp/view?usp=sharing",
  },
  {
    id: "dia-11",
    dayNumber: 11,
    date: "Día 11 • 11:11 Pide un deseo • Nuestro cierre",
    title: "Gracias por amarme, mi bebe",
    shortNote:
      "Dicen que a las 11:11 se pide un deseo... el mío siempre fue tu felicidad, aunque hoy nuestros caminos tomen rumbos distintos. El final de estos 11 días de silencio y el cierre más sincero que puedo darte. Míralo con el anillo en tus manos. Gracias por todo lo que fuimos.",
    driveUrl: "https://drive.google.com/file/d/1oHc-ncdudO90ubBHoG6ccx8RW7AnCe1z/view?usp=sharing",
    isFinale: true,
  },
];

// Alias para mantener compatibilidad o usar el término de 11 días
export const ELEVEN_DAYS_VIDEOS = TWELVE_DAYS_VIDEOS;

// 5. ARRAY DE LAS 6 FOTOS DE LA GALERÍA POLAROID (PANTALLA 4)
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "foto-1",
    imageUrl: "/photos/foto-1.jpg",
    date: "18 • 05 • 2024 • Donde nació todo",
    caption: "Una pizza y la primera vez que te vi diferente",
    backNote:
      "Estábamos rodeados de amigos y dos cajas de pizza, pero ese 18 de mayo fue la primera vez que te miré con ojos de amor. Recuerdo sentir ese cosquilleo en el pecho y darme cuenta, en medio de las risas, de que empezabas a gustarme como nadie más.",
    rotation: -2.2,
  },
  {
    id: "foto-2",
    imageUrl: "/photos/foto-2.jpg",
    date: "Un abrazo de otra vida",
    caption: "Si nos hubiéramos conocido de niños",
    backNote:
      "Siempre me encantó esta foto. Me hace pensar que si nos hubiéramos cruzado desde pequeños, nos habríamos querido con esa misma inocencia: tu risa traviesa, el gorrito de fiesta y ese abrazo apretado que siempre se sintió como refugio.",
    rotation: 1.8,
  },
  {
    id: "foto-3",
    imageUrl: "/photos/foto-3.jpg",
    date: "25 • 07 • 2025 • Anillo de promesa",
    caption: "Tus lágrimas con las flores y una promesa",
    backNote:
      "Ese día puse la cajita de Pandora, las flores y una carta escrita sobre la mesa. Jamás voy a olvidar cómo brillaban tus ojos ni esas lágrimas de emoción al ver el detalle. Te prometí quererte y cuidarte con todo el corazón.",
    rotation: -1.5,
  },
  {
    id: "foto-4",
    imageUrl: "/photos/foto-4.jpg",
    date: "25 • 04 • 2025 • Nuestro inicio",
    caption: "¿Puedo ser tu novio? en el parque",
    backNote:
      "Pintar ese cuadro con letras hechas a mano y corazones rojos fue de los momentos más nerviosos y bonitos de mi vida. Sentados sobre el pasto del parque con las mochilas al lado, esperando ese 'sí' que iluminó todo.",
    rotation: 2.4,
  },
  {
    id: "foto-5",
    imageUrl: "/photos/foto-5.jpg",
    date: "Kilómetros que se hicieron nada",
    caption: "Cuando cruzaste el mapa por nosotros",
    backNote:
      "Viajaste tantos kilómetros solo para llegar hasta mi pueblo, verme y compartir con mi familia. Parados en ese muelle sobre el agua, con ese beso suave, entendí la inmensidad y la generosidad de tu amor.",
    rotation: -2.0,
  },
  {
    id: "foto-6",
    imageUrl: "/photos/foto-6.jpg",
    date: "25 • 10 • 2026 • Nuestro último recuerdo",
    caption: "Tu sonrisa y un helado Dolce",
    backNote:
      "Nuestra última foto juntos. Fuimos por tu helado favorito de Dolce y, viéndote sonreír así a mi lado, me quedé con tu imagen más pura y luminosa. Gracias por haberme regalado momentos tan dulces que voy a atesorar siempre.",
    rotation: 1.5,
  },
];

// 6. LA CARTA FINAL Y EL ANILLO (PANTALLA 5)
export const FINAL_LETTER_CONFIG = {
  sectionTag: "Epílogo • El Anillo",
  title: "El significado de lo que hoy tienes en tus manos",
  salutation: "Querida Nayeli,",
  paragraphs: [
    "Si llegaste hasta aquí, significa que recorriste conmigo estos 11 días de silencio. Sé que las despedidas nunca son fáciles, sobre todo cuando detrás hay muchos momentos llenos de vida, de aprendizajes, de risas que todavía resuenan y de sueños que construimos con el corazón en la mano.",
    "Muchos piensan que un anillo solo se entrega cuando una historia comienza o cuando promete no terminar jamás. Pero yo quería romper esa regla contigo. Quería entregarte este anillo hoy, en nuestro cierre, porque lo que vivimos durante este tiempo merece ser honrado con la misma grandeza con la que nos quisimos.",
    "Cuando mires este anillo, no quiero que sientas nostalgia triste ni peso alguno. Quiero que recuerdes que lo nuestro fue real, que fue limpio, que fue bonito y que nos marcó para bien. Que sepas que hubo alguien que en 11 días de silencio te siguió cuidando en sus pensamientos y que a las 11:11 siempre pedirá un deseo por tu felicidad. Hoy te suelto con amor, deseándote la vida más luminosa del mundo.",
    "Úsalo cuando quieras recordar lo valiosa que eres, o guárdalo en tu cajita de recuerdos como el símbolo de un capítulo que cerró en paz. Gracias por cada día desde aquel 25 de abril. Gracias por haber sido tú.",
  ],
  closingQuote: "Con todo el cariño y la gratitud de estos dos años,",
  signature: "Siempre deseándote lo mejor",
  postScript:
    "P.D.: Esta cápsula quedará aquí para cuando quieras volver a escuchar o recordar que lo que fuimos valió cada segundo.",
};
