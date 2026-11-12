// Help-center content. Each answer describes behaviour that exists in the app today.
const E = '{email}';

export const help = {
  es: {
    h1: 'Centro de ayuda',
    lead: 'Respuestas sobre cómo usar VYRO, la entrega por WhatsApp, los planes y la privacidad.',
    searchLabel: 'Buscar en el centro de ayuda',
    searchPlaceholder: 'Escribe una palabra: código, marca de agua, cancelar…',
    noResults: 'No encontramos artículos para esa búsqueda. Prueba con otra palabra o escríbenos.',
    count: ['resultado', 'resultados'],
    cats: {
      start: 'Primeros pasos',
      whatsapp: 'Entrega por WhatsApp',
      quality: 'Calidad y partes',
      plans: 'Planes y pagos',
      privacy: 'Privacidad y permisos',
      issues: 'Problemas frecuentes',
    },
    contactH: '¿No encuentras tu respuesta?',
    contactP: `Escríbenos a <a href="mailto:${E}">${E}</a> y te responderemos lo antes posible. No ofrecemos tiempos de respuesta garantizados. Si puedes, indica el modelo de tu teléfono y la versión de Android.`,
    articles: [
      { id: 'que-es', cat: 'start', q: '¿Qué es VYRO y qué hace?', a: ['VYRO es una app para Android que optimiza tus videos para que lleguen a tus Estados de WhatsApp en la mejor forma posible: los deja en Full HD vertical, con un peso adecuado y, si son largos, los divide en partes.', 'La optimización ocurre en tu teléfono. Después puedes recibir el resultado en un chat de WhatsApp y reenviarlo a tu Estado.'] },
      { id: 'como-usar', cat: 'start', q: '¿Cómo uso VYRO paso a paso?', ol: ['Abre VYRO y elige un video de tu galería o grábalo desde la app.', 'Ajusta, si quieres, el recorte, el texto, la música o el audio.', 'Pulsa para optimizar y espera a que termine; puedes minimizar la app.', 'Pulsa el botón para enviar a WhatsApp. Se abrirá el chat de VYRO con un código ya escrito.', 'Envía ese mensaje. En unos instantes recibirás el video optimizado en el chat.', 'Reenvía el video desde ese chat a “Mi estado”.'] },
      { id: 'iphone', cat: 'start', q: '¿Hay versión para iPhone?', a: ['No. Hoy VYRO es una aplicación solo para Android y no existe ficha en el App Store.'] },
      { id: 'donde-descargar', cat: 'start', q: '¿Dónde descargo VYRO?', a: ['VYRO todavía no está publicada en Google Play. Cuando lo esté, el botón oficial aparecerá en la página principal. Desconfía de archivos o enlaces que se presenten como VYRO en otros sitios.'] },

      { id: 'codigo', cat: 'whatsapp', q: '¿Qué es el código que aparece en el chat de WhatsApp?', a: ['Es un código aleatorio de un solo uso, válido por 30 minutos. Le indica a VYRO qué video entregarte y a quién. No lo compartas ni lo edites: simplemente envía el mensaje tal como aparece.'] },
      { id: 'codigo-caducado', cat: 'whatsapp', q: 'El código caducó o no recibo el video', a: ['Los códigos caducan a los 30 minutos y solo sirven una vez. Si pasó ese tiempo, o ya lo usaste, vuelve a pulsar el botón de enviar a WhatsApp en la app para generar uno nuevo.', 'Comprueba también que enviaste el mensaje desde el WhatsApp (o WhatsApp Business) que elegiste en la app y que tu teléfono tiene conexión a internet.'] },
      { id: 'business', cat: 'whatsapp', q: '¿Funciona con WhatsApp Business?', a: ['Sí. Si tienes WhatsApp y WhatsApp Business instalados, VYRO te pregunta en cuál quieres recibir el video.'] },
      { id: 'reenviar', cat: 'whatsapp', q: '¿Cómo publico el video en mi Estado?', a: ['Cuando el video llegue al chat de VYRO, mantén pulsado el mensaje, elige reenviar y selecciona “Mi estado”. Si el video se dividió en partes, publica cada parte como un Estado seguido.'] },
      { id: 'sin-servidor', cat: 'whatsapp', q: '¿Puedo compartir sin usar el servidor?', a: ['Sí. La app incluye una opción de compartir mediante el menú de Android, que entrega el archivo directamente a WhatsApp sin pasar por ningún servidor de VYRO. En ese caso WhatsApp volverá a comprimir el archivo al enviarlo.'] },

      { id: 'calidad-estado', cat: 'quality', q: '¿Por qué mi Estado se ve distinto del video optimizado?', a: ['WhatsApp aplica su propia compresión cuando publicas un video en Estados. VYRO no puede eliminarla ni evitarla; lo que hace es darle un archivo de partida bien preparado: Full HD vertical, a 30 fps y con una estructura adecuada.', 'El resultado final depende del video, de tu teléfono y de lo que haga WhatsApp en ese momento.'] },
      { id: 'partes', cat: 'quality', q: '¿Por qué mi video se divide en partes?', a: ['Los Estados de WhatsApp tienen una duración máxima por publicación, así que VYRO reparte los videos largos en partes iguales. En el plan FREE las partes son de 30 segundos; en PRO puedes elegir partes de 45 o de 60 segundos.', 'Las partes de 60 segundos se exportan en 720p para mantener el archivo dentro del límite de peso de WhatsApp; las de 45 segundos mantienen 1080p.'] },
      { id: 'resolucion', cat: 'quality', q: '¿Qué resolución obtengo?', a: ['Hasta 1080 × 1920 (Full HD vertical) cuando tu video de origen tiene esa resolución o mayor. VYRO no inventa detalle: si el original es de menor resolución, no se amplía artificialmente.'] },
      { id: 'lento', cat: 'quality', q: 'El procesamiento tarda mucho o parece detenido', a: ['El tiempo depende del tamaño y la duración del video y de tu teléfono. En una prueba con un video 4K de 57 segundos en un Galaxy S25 Ultra tardó unos 42 segundos.', 'Si minimizas la app el proceso continúa en segundo plano y recibirás una notificación al terminar. Evita forzar el cierre de la app mientras procesa.'] },

      { id: 'marca-agua', cat: 'plans', q: '¿Cómo funciona la marca de agua “VYRO FREE”?', a: ['Los videos del plan FREE incluyen una marca de agua discreta “VYRO FREE”. Con una suscripción PRO activa, los videos se procesan sin marca de agua.'] },
      { id: 'suscribirse', cat: 'plans', q: '¿Cómo me suscribo a VYRO PRO y qué incluye?', a: ['Desde la pantalla PRO de la app verás los planes disponibles con el precio, la moneda y las condiciones que Google Play muestra para tu cuenta, incluida cualquier prueba gratuita si eres elegible.', 'PRO quita la marca de agua y habilita partes de 45 y 60 segundos mientras la suscripción esté activa.'] },
      { id: 'restaurar', cat: 'plans', q: '¿Cómo restauro mi compra?', a: ['En la pantalla PRO pulsa “Restaurar compra”. VYRO consulta a Google Play con tu cuenta de Google y reactiva tu suscripción si sigue vigente. Debes usar la misma cuenta de Google con la que compraste.'] },
      { id: 'cancelar', cat: 'plans', q: '¿Cómo cancelo mi suscripción?', a: ['Las suscripciones se cancelan desde Google Play, no desde la app: abre Play Store, toca tu foto de perfil, entra en Pagos y suscripciones, luego Suscripciones, elige VYRO PRO y pulsa Cancelar suscripción. Conservas el acceso PRO hasta el final del periodo ya pagado.'] },
      { id: 'reembolso', cat: 'plans', q: '¿Cómo pido un reembolso?', a: ['Los reembolsos los gestiona Google Play según sus políticas. Puedes solicitarlo desde tu historial de pedidos de Google Play. VYRO no tiene acceso a tus datos de pago.'] },

      { id: 'subida', cat: 'privacy', q: '¿Se suben mis videos a un servidor?', a: ['Tus originales no se suben nunca: se procesan en tu teléfono. Solo si eliges recibir el resultado por WhatsApp, el video ya optimizado se sube de forma temporal y cifrada, y se elimina al confirmarse la entrega y, como máximo, en aproximadamente una hora.', 'Los detalles completos están en la <a href="{privacyUrl}">Política de privacidad</a>.'] },
      { id: 'permisos', cat: 'privacy', q: '¿Por qué pide permiso de galería, cámara o notificaciones?', a: ['Galería: para elegir el video o la foto a optimizar. Cámara y micrófono: solo si grabas un video nuevo desde la app. Notificaciones: para avisarte cuando termina el procesamiento. Puedes revisarlos o revocarlos en los ajustes de Android.'] },
      { id: 'borrar-datos', cat: 'privacy', q: '¿Cómo elimino mis datos?', a: [`VYRO no guarda tu número ni tus videos más allá de la entrega. Si quieres pedir la eliminación de algo asociado a un código, escríbenos a <a href="mailto:${E}">${E}</a>. Tus videos optimizados siguen en tu galería hasta que los borres.`] },

      { id: 'sonido', cat: 'issues', q: 'No escucho el sonido de la notificación al terminar', a: ['Es un caso conocido en algunos dispositivos: el procesamiento termina correctamente y la notificación aparece, pero el sonido puede no reproducirse según la configuración de sonido de tu teléfono. Revisa que las notificaciones de VYRO tengan sonido habilitado en Ajustes, Apps, VYRO, Notificaciones.'] },
      { id: 'sin-conexion', cat: 'issues', q: 'La app dice que no hay conexión con el servidor', a: ['Comprueba que tu teléfono tiene internet y vuelve a intentarlo: la primera conexión tras un rato de inactividad puede tardar. Si el problema continúa, usa la opción de compartir mediante el menú de Android o escríbenos.'] },
    ],
  },

  en: {
    h1: 'Help center',
    lead: 'Answers about using VYRO, WhatsApp delivery, plans and privacy.',
    searchLabel: 'Search the help center',
    searchPlaceholder: 'Type a word: code, watermark, cancel…',
    noResults: 'We found no articles for that search. Try another word or write to us.',
    count: ['result', 'results'],
    cats: {
      start: 'Getting started',
      whatsapp: 'WhatsApp delivery',
      quality: 'Quality and parts',
      plans: 'Plans and payments',
      privacy: 'Privacy and permissions',
      issues: 'Common issues',
    },
    contactH: 'Can’t find your answer?',
    contactP: `Write to <a href="mailto:${E}">${E}</a> and we will reply as soon as possible. We do not offer guaranteed response times. If you can, include your phone model and Android version.`,
    articles: [
      { id: 'que-es', cat: 'start', q: 'What is VYRO and what does it do?', a: ['VYRO is an Android app that optimizes your videos so they reach your WhatsApp Status in the best possible shape: it turns them into vertical Full HD with a suitable size and, if they are long, splits them into parts.', 'Optimization happens on your phone. Afterwards you can receive the result in a WhatsApp chat and forward it to your Status.'] },
      { id: 'como-usar', cat: 'start', q: 'How do I use VYRO step by step?', ol: ['Open VYRO and pick a video from your gallery or record one in the app.', 'Optionally adjust trim, text, music or audio.', 'Tap to optimize and wait for it to finish; you can minimize the app.', 'Tap the button to send to WhatsApp. The VYRO chat opens with a code already typed in.', 'Send that message. A moment later you will receive the optimized video in the chat.', 'Forward the video from that chat to “My status”.'] },
      { id: 'iphone', cat: 'start', q: 'Is there an iPhone version?', a: ['No. Today VYRO is an Android-only app and there is no App Store listing.'] },
      { id: 'donde-descargar', cat: 'start', q: 'Where do I download VYRO?', a: ['VYRO is not yet published on Google Play. When it is, the official button will appear on the home page. Be wary of files or links presented as VYRO on other sites.'] },

      { id: 'codigo', cat: 'whatsapp', q: 'What is the code that appears in the WhatsApp chat?', a: ['It is a random single-use code valid for 30 minutes. It tells VYRO which video to deliver and to whom. Do not share or edit it: just send the message as it appears.'] },
      { id: 'codigo-caducado', cat: 'whatsapp', q: 'The code expired or I don’t receive the video', a: ['Codes expire after 30 minutes and work only once. If that time has passed, or you already used it, tap the send-to-WhatsApp button in the app again to generate a new one.', 'Also check that you sent the message from the WhatsApp (or WhatsApp Business) you chose in the app and that your phone has an internet connection.'] },
      { id: 'business', cat: 'whatsapp', q: 'Does it work with WhatsApp Business?', a: ['Yes. If you have both WhatsApp and WhatsApp Business installed, VYRO asks which one you want to receive the video in.'] },
      { id: 'reenviar', cat: 'whatsapp', q: 'How do I post the video to my Status?', a: ['When the video arrives in the VYRO chat, long-press the message, choose forward and select “My status”. If the video was split into parts, post each part as consecutive Statuses.'] },
      { id: 'sin-servidor', cat: 'whatsapp', q: 'Can I share without using the server?', a: ['Yes. The app includes a share option through Android’s share menu that hands the file directly to WhatsApp without passing through any VYRO server. In that case WhatsApp will compress the file again when sending it.'] },

      { id: 'calidad-estado', cat: 'quality', q: 'Why does my Status look different from the optimized video?', a: ['WhatsApp applies its own compression when you post a video to Status. VYRO cannot remove or avoid it; what it does is give WhatsApp a well-prepared starting file: vertical Full HD, 30 fps and a suitable structure.', 'The final result depends on the video, your phone and what WhatsApp does at that moment.'] },
      { id: 'partes', cat: 'quality', q: 'Why is my video split into parts?', a: ['WhatsApp Status has a maximum duration per post, so VYRO splits long videos into equal parts. On FREE the parts are 30 seconds; on PRO you can choose 45- or 60-second parts.', '60-second parts are exported at 720p to keep the file within WhatsApp’s size limit; 45-second parts keep 1080p.'] },
      { id: 'resolucion', cat: 'quality', q: 'What resolution do I get?', a: ['Up to 1080 × 1920 (vertical Full HD) when your source video has that resolution or higher. VYRO does not invent detail: if the original has a lower resolution it is not artificially enlarged.'] },
      { id: 'lento', cat: 'quality', q: 'Processing is slow or looks stuck', a: ['Time depends on the video’s size and length and on your phone. In a test with a 57-second 4K video on a Galaxy S25 Ultra it took about 42 seconds.', 'If you minimize the app, processing continues in the background and you will get a notification when it finishes. Avoid force-closing the app while it processes.'] },

      { id: 'marca-agua', cat: 'plans', q: 'How does the “VYRO FREE” watermark work?', a: ['Videos on the FREE plan include a discreet “VYRO FREE” watermark. With an active PRO subscription, videos are processed without the watermark.'] },
      { id: 'suscribirse', cat: 'plans', q: 'How do I subscribe to VYRO PRO and what does it include?', a: ['From the PRO screen in the app you will see the available plans with the price, currency and conditions Google Play shows for your account, including any free trial if you are eligible.', 'PRO removes the watermark and enables 45- and 60-second parts while the subscription is active.'] },
      { id: 'restaurar', cat: 'plans', q: 'How do I restore my purchase?', a: ['On the PRO screen tap “Restore purchase”. VYRO asks Google Play with your Google account and reactivates your subscription if it is still valid. You must use the same Google account you bought with.'] },
      { id: 'cancelar', cat: 'plans', q: 'How do I cancel my subscription?', a: ['Subscriptions are cancelled from Google Play, not from the app: open Play Store, tap your profile picture, go to Payments & subscriptions, then Subscriptions, choose VYRO PRO and tap Cancel subscription. You keep PRO access until the end of the already-paid period.'] },
      { id: 'reembolso', cat: 'plans', q: 'How do I request a refund?', a: ['Refunds are handled by Google Play under its policies. You can request one from your Google Play order history. VYRO has no access to your payment data.'] },

      { id: 'subida', cat: 'privacy', q: 'Are my videos uploaded to a server?', a: ['Your originals are never uploaded: they are processed on your phone. Only if you choose to receive the result on WhatsApp is the already-optimized video uploaded, temporarily and encrypted, and it is deleted once delivery is confirmed and, at most, in about an hour.', 'Full details are in the <a href="{privacyUrl}">Privacy Policy</a>.'] },
      { id: 'permisos', cat: 'privacy', q: 'Why does it ask for gallery, camera or notification permissions?', a: ['Gallery: to pick the video or photo to optimize. Camera and microphone: only if you record a new video in the app. Notifications: to tell you when processing finishes. You can review or revoke them in Android settings.'] },
      { id: 'borrar-datos', cat: 'privacy', q: 'How do I delete my data?', a: [`VYRO does not keep your number or your videos beyond delivery. If you want to request deletion of anything tied to a code, write to <a href="mailto:${E}">${E}</a>. Your optimized videos stay in your gallery until you delete them.`] },

      { id: 'sonido', cat: 'issues', q: 'I don’t hear the completion notification sound', a: ['This is a known case on some devices: processing finishes correctly and the notification appears, but the sound may not play depending on your phone’s sound settings. Check that VYRO’s notifications have sound enabled under Settings, Apps, VYRO, Notifications.'] },
      { id: 'sin-conexion', cat: 'issues', q: 'The app says there is no connection to the server', a: ['Check that your phone has internet and try again: the first connection after a period of inactivity can take a while. If it continues, use the share option through Android’s share menu or write to us.'] },
    ],
  },
};
