// Legal documents. Every factual statement was verified against the app code, the delivery backend
// (D:\dev\vyro-whatsapp-backend: src/db.js, cleanup.js, messagingStore.js, config.js) or the live
// hosting setup on 2026-11-12. If the behaviour changes, change the text here and bump legal.version.

const E = '{email}';

export const privacy = {
  es: {
    h1: 'Política de privacidad',
    lead: 'Qué datos trata VYRO, para qué, durante cuánto tiempo y con qué proveedores. Redactada a partir de la revisión del código y de la configuración reales de la aplicación.',
    sections: [
      { id: 'responsable', h: 'Quién es el responsable', p: [
        `El responsable del tratamiento es <strong>{operator}</strong>, titular de <strong>VYRO HD Video Optimizer</strong> (“VYRO”, paquete Android <code>com.statusmax.statusmax</code>). Contacto y ejercicio de tus derechos: <a href="mailto:${E}">${E}</a>.`] },
      { id: 'resumen', h: 'Resumen en lenguaje claro', ul: [
        'Tus videos y fotos originales se procesan en tu teléfono y no se suben.',
        'Solo si eliges recibir el resultado por WhatsApp, el video <strong>ya optimizado</strong> se sube de forma temporal y cifrada a nuestro servidor para poder enviártelo.',
        'Ese video se elimina al confirmarse la entrega y, como máximo, en aproximadamente una hora.',
        'No pedimos cuenta, nombre ni correo, y no usamos publicidad ni analítica de terceros.',
        'WhatsApp vuelve a comprimir los videos al publicarlos en Estados; VYRO no puede evitarlo.'] },
      { id: 'que-hace', h: 'Qué hace VYRO', p: [
        'VYRO permite elegir o grabar un video o una foto y optimizarlo (ajuste real de resolución y calidad, sin inventar detalle) para compartirlo después, por ejemplo en un Estado de WhatsApp. La optimización se ejecuta en el propio teléfono con los componentes de video de Android. La forma principal de uso es recibir el resultado en un chat de WhatsApp, lo que implica el envío temporal descrito en la sección “Entrega por WhatsApp”.'] },
      { id: 'datos', h: 'Qué datos se tratan', table: {
        head: ['Dato', 'Dónde', 'Para qué'],
        rows: [
          ['Videos y fotos originales', 'Solo tu teléfono', 'Elegir y optimizar el archivo'],
          ['Video optimizado', 'Tu teléfono; y servidor de VYRO si eliges entrega por WhatsApp', 'Entregártelo en el chat'],
          ['Código de un solo uso', 'Servidor de VYRO', 'Identificar qué video entregar'],
          ['Tu número de WhatsApp y el mensaje que envías', 'WhatsApp/Meta y Twilio; el servidor lo recibe pero no lo guarda en su base de datos', 'Saber a quién responder'],
          ['Estado de la suscripción', 'Google Play; un indicador local en tu teléfono', 'Mostrar o no la marca de agua'],
          ['Identificadores técnicos de mensaje y estado de entrega', 'Servidor de VYRO', 'Confirmar la entrega y evitar duplicados'],
        ] } },
      { id: 'finalidades', h: 'Para qué usamos los datos', ul: [
        'Optimizar tu video y entregártelo (ejecución del servicio que solicitas).',
        'Confirmar la entrega, evitar duplicados y proteger el servicio frente a abusos.',
        'Gestionar el acceso PRO con Google Play.',
        'Responder a tus consultas de soporte.'],
        p: ['No usamos los datos para publicidad, perfiles ni venta a terceros.'] },
      { id: 'archivos', h: 'Acceso a tus videos y fotos', p: [
        'VYRO pide acceso a tu galería únicamente para que elijas el archivo a optimizar, y a la cámara y el micrófono únicamente si decides grabar un video nuevo dentro de la app. Los originales se leen y procesan localmente; nunca se suben ni se envían a un servidor de VYRO.'] },
      { id: 'local', h: 'Datos que permanecen solo en tu dispositivo', ul: [
        'Los videos y fotos que optimizas, guardados en el almacenamiento o la galería de tu teléfono.',
        'El progreso de un procesamiento en curso (para mostrarlo si minimizas la app).',
        'Si ya viste la introducción de la app.',
        'Un indicador local del estado de suscripción, solo para mostrar la interfaz correcta al instante; siempre se sobrescribe con lo que informe Google Play.'],
        p: ['Estos datos no salen de tu teléfono ni se comparten con nosotros ni con terceros.'] },
      { id: 'entrega', h: 'Entrega por WhatsApp y servidor de VYRO', p: [
        'Cuando pulsas el botón para recibir el video en WhatsApp, la app envía por HTTPS el video <strong>ya optimizado</strong> (no el original) a un servidor de VYRO alojado en Fly.io, en Estados Unidos, y recibe un código aleatorio de un solo uso válido por 30 minutos. La app abre un chat con el número oficial de WhatsApp Business de VYRO con ese código escrito. Al pulsar ENVIAR, el servidor valida el código y te devuelve el video en ese mismo chat, desde donde puedes reenviarlo a tu Estado.',
        'VYRO no mira, analiza, vende ni reutiliza el contenido de tus videos.'] },
      { id: 'telefono', h: 'Tu número de teléfono y los mensajes', p: [
        'El servidor recibe tu número de WhatsApp y el texto del mensaje (el código) solo para saber a quién responder. VYRO <strong>no guarda tu número</strong> en su base de datos ni lo usa para otro fin; en los registros técnicos del servidor aparece enmascarado. Para aplicar límites de uso y evitar abusos conserva solo una huella irreconocible derivada de tu número (no permite recuperarlo) junto con la fecha de cada envío. La plataforma de Meta y Twilio sí tratan tu número y los datos del mensaje según sus propias políticas.'] },
      { id: 'conservacion', h: 'Cuánto tiempo se conserva', table: {
        head: ['Qué', 'Plazo'],
        rows: [
          ['Código de un solo uso', 'Caduca a los 30 minutos y solo sirve una vez'],
          ['Video optimizado en el servidor', 'Se elimina al confirmarse la entrega y, como máximo, en aproximadamente una hora (30 minutos de validez del código más un margen de limpieza)'],
          ['Enlaces temporales de descarga para Twilio', 'Caducan a los 15 minutos'],
          ['Identificadores técnicos de mensaje y estado de entrega', '7 días'],
          ['Metadatos de un envío finalizado (sin el video)', '30 días'],
          ['Huella irreconocible del remitente y fecha de cada envío (para límites de uso)', '35 días'],
        ] },
        p: ['Un código ya usado o caducado no permite volver a recibir el video.'] },
      { id: 'terceros', h: 'Proveedores que participan', table: {
        head: ['Proveedor', 'Qué hace', 'Datos que trata'],
        rows: [
          ['Meta (WhatsApp Business Platform)', 'Transporta los mensajes de WhatsApp', 'Tu número, fecha y estado de los mensajes, según su política'],
          ['Twilio', 'Proveedor de mensajería que envía y recibe los mensajes de WhatsApp de VYRO', 'Tu número, fecha, estado de entrega y el archivo enviado mientras dura la entrega; puede conservar registros de mensajería según su política'],
          ['Fly.io', 'Aloja el servidor de entrega (Estados Unidos)', 'El video optimizado de forma temporal; registros técnicos como direcciones IP'],
          ['Google Play', 'Distribución y facturación de la suscripción', 'Datos de pago y de tu cuenta de Google; VYRO solo recibe el estado de acceso'],
          ['Vercel', 'Aloja este sitio web', 'Registros técnicos de acceso, como la dirección IP, para operar y proteger el servicio'],
        ] },
        p: ['Cada proveedor trata los datos bajo su propia política de privacidad. VYRO no vende datos personales.'] },
      { id: 'transferencias', h: 'Transferencias internacionales', p: [
        'El servidor de entrega está en Estados Unidos y los proveedores anteriores pueden tratar datos fuera de tu país. Al usar la entrega por WhatsApp aceptas ese tratamiento para el único fin de enviarte tu video.'] },
      { id: 'permisos', h: 'Permisos de Android', table: {
        head: ['Permiso', 'Para qué se usa'],
        rows: [
          ['Fotos y videos (galería)', 'Elegir el archivo que quieres optimizar'],
          ['Cámara y micrófono', 'Solo si grabas un video nuevo desde VYRO'],
          ['Notificaciones', 'Avisarte localmente cuando termina el procesamiento'],
          ['Servicio en primer plano / evitar suspensión', 'Que el procesamiento continúe si minimizas la app o bloqueas la pantalla'],
          ['Facturación de Google Play', 'Comprar y gestionar la suscripción PRO'],
          ['Internet', 'Facturación con Google Play y, si eliges la entrega por WhatsApp, enviar el video optimizado al servidor'],
        ] },
        p: ['Android los solicita cuando hacen falta y puedes revisarlos o revocarlos en Ajustes del sistema.'] },
      { id: 'suscripciones', h: 'Suscripciones y pagos', p: [
        'VYRO PRO se gestiona íntegramente con <strong>Google Play Billing</strong>. Google procesa el pago, la elegibilidad de cualquier prueba gratuita, la renovación, la cancelación y los reembolsos. VYRO no ve ni almacena tu tarjeta ni tus datos de pago: solo recibe de Google Play un estado de acceso (activo o inactivo). “Restaurar compra” se resuelve consultando a Google Play con tu cuenta de Google; VYRO no tiene cuenta ni contraseña propias.'] },
      { id: 'ads', h: 'Publicidad y analítica de terceros', p: [
        'La aplicación no integra SDK de publicidad, rastreo ni analítica de terceros (verificado en el código). No se usan identificadores de publicidad ni se comparte información con redes publicitarias.'] },
      { id: 'web', h: 'Este sitio web y las cookies', p: [
        'Este sitio no usa cookies, no usa herramientas de analítica ni de publicidad y no guarda datos en tu navegador. El proveedor de hosting (Vercel) puede registrar datos técnicos de acceso, como la dirección IP, para operar y proteger el servicio. Si nos escribes por correo, usamos tu mensaje solo para responderte.'] },
      { id: 'seguridad', h: 'Seguridad', p: [
        'La optimización ocurre en tu teléfono, así que la seguridad de tus originales depende de Android y de tu dispositivo. El video enviado para su entrega viaja cifrado (HTTPS), se identifica con un código aleatorio imposible de adivinar y se elimina automáticamente. Ningún sistema es infalible, pero reducimos al mínimo los datos y el tiempo de conservación.'] },
      { id: 'sin-servidor', h: 'Alternativa sin servidor', p: [
        'Si usas la opción de compartir el archivo mediante el menú de Android, VYRO entrega el archivo directamente al sistema operativo y no pasa por ningún servidor de VYRO. En ese caso WhatsApp aplicará su propia compresión al archivo.'] },
      { id: 'menores', h: 'Menores de edad', p: [
        'VYRO es una herramienta de optimización de video de propósito general, no dirigida específicamente a niños, y no recopila intencionalmente datos personales de menores.'] },
      { id: 'derechos', h: 'Tus derechos', p: [
        'Puedes pedir acceso, rectificación o eliminación de los datos que tengamos sobre ti, y oponerte a su tratamiento, en los términos de la normativa aplicable (en Perú, la Ley N.º 29733 de Protección de Datos Personales). Como VYRO no guarda tu número de teléfono ni conserva tus videos más allá de la entrega, normalmente no existe un perfil tuyo que consultar. Los registros que conserven Meta, Twilio o Google se rigen por sus propias políticas y los derechos sobre ellos se ejercen ante cada proveedor.'] },
      { id: 'solicitudes', h: 'Cómo pedir la eliminación de datos', p: [
        `Escribe a <a href="mailto:${E}">${E}</a> indicando el código de entrega o la fecha aproximada del envío. Como los archivos se eliminan automáticamente en aproximadamente una hora, y el resto de los registros se depura en los plazos indicados arriba, es posible que ya no exista nada que borrar. Desinstalar la app elimina sus preferencias locales; tus videos optimizados siguen en la galería hasta que los borres.`] },
      { id: 'independencia', h: 'Independencia de WhatsApp y Meta', p: [
        'VYRO es una aplicación independiente. No está afiliada, respaldada ni patrocinada por WhatsApp LLC ni por Meta Platforms, Inc. WhatsApp es una marca de sus respectivos propietarios.'] },
      { id: 'cambios', h: 'Cambios en esta política', p: [
        'Si esta política cambia, se actualizará en esta página con una nueva fecha de vigencia. Los cambios sustanciales se reflejarán también en la ficha de la app.'] },
      { id: 'contacto', h: 'Contacto', p: [
        `Responsable: {operator}<br>Correo: <a href="mailto:${E}">${E}</a>.`] },
    ],
  },

  en: {
    h1: 'Privacy Policy',
    lead: 'What data VYRO processes, why, for how long and with which providers. Written from a review of the app’s real code and configuration.',
    sections: [
      { id: 'responsable', h: 'Who is responsible', p: [
        `The data controller is <strong>{operator}</strong>, owner of <strong>VYRO HD Video Optimizer</strong> (“VYRO”, Android package <code>com.statusmax.statusmax</code>). Contact and exercise of your rights: <a href="mailto:${E}">${E}</a>.`] },
      { id: 'resumen', h: 'Plain-language summary', ul: [
        'Your original videos and photos are processed on your phone and are not uploaded.',
        'Only if you choose to receive the result on WhatsApp is the <strong>already-optimized</strong> video temporarily uploaded, encrypted, to our server so it can be delivered to you.',
        'That video is deleted once delivery is confirmed and, at most, in about an hour.',
        'We do not ask for an account, name or email, and we do not use third-party advertising or analytics.',
        'WhatsApp compresses videos again when they are posted to Status; VYRO cannot prevent that.'] },
      { id: 'que-hace', h: 'What VYRO does', p: [
        'VYRO lets you pick or record a video or photo and optimize it (a real resolution and quality adjustment, without inventing detail) so you can share it afterwards, for example on a WhatsApp Status. Optimization runs on your phone using Android’s own video components. The main way to use the app is to receive the result in a WhatsApp chat, which involves the temporary upload described in “WhatsApp delivery”.'] },
      { id: 'datos', h: 'What data is processed', table: {
        head: ['Data', 'Where', 'Purpose'],
        rows: [
          ['Original videos and photos', 'Your phone only', 'Picking and optimizing the file'],
          ['Optimized video', 'Your phone; and the VYRO server if you choose WhatsApp delivery', 'Delivering it to you in the chat'],
          ['Single-use code', 'VYRO server', 'Identifying which video to deliver'],
          ['Your WhatsApp number and the message you send', 'WhatsApp/Meta and Twilio; the server receives it but does not store it in its database', 'Knowing whom to reply to'],
          ['Subscription status', 'Google Play; a local hint on your phone', 'Showing or hiding the watermark'],
          ['Technical message identifiers and delivery status', 'VYRO server', 'Confirming delivery and avoiding duplicates'],
        ] } },
      { id: 'finalidades', h: 'What we use data for', ul: [
        'Optimizing your video and delivering it to you (performing the service you request).',
        'Confirming delivery, avoiding duplicates and protecting the service from abuse.',
        'Managing PRO access with Google Play.',
        'Answering your support questions.'],
        p: ['We do not use data for advertising, profiling or selling to third parties.'] },
      { id: 'archivos', h: 'Access to your videos and photos', p: [
        'VYRO asks for gallery access only so you can pick the file to optimize, and for camera and microphone access only if you choose to record a new video inside the app. Originals are read and processed locally; they are never uploaded or sent to a VYRO server.'] },
      { id: 'local', h: 'Data that stays only on your device', ul: [
        'The videos and photos you optimize, saved to your phone’s storage or gallery.',
        'The progress of a job in progress (so it can be shown if you minimize the app).',
        'Whether you have already seen the app’s intro.',
        'A local subscription-status hint, used only to paint the right UI instantly; it is always overwritten by whatever Google Play reports.'],
        p: ['This data does not leave your phone and is not shared with us or any third party.'] },
      { id: 'entrega', h: 'WhatsApp delivery and the VYRO server', p: [
        'When you tap the button to receive the video on WhatsApp, the app sends the <strong>already-optimized</strong> video (not the original) over HTTPS to a VYRO server hosted on Fly.io in the United States and receives a random single-use code valid for 30 minutes. The app opens a chat with VYRO’s official WhatsApp Business number with that code typed in. When you press SEND, the server validates the code and sends the video back to you in that same chat, from where you can forward it to your Status.',
        'VYRO does not view, analyze, sell or reuse the content of your videos.'] },
      { id: 'telefono', h: 'Your phone number and messages', p: [
        'The server receives your WhatsApp number and the message text (the code) only to know whom to reply to. VYRO <strong>does not store your number</strong> in its database or use it for any other purpose; it appears masked in the server’s technical logs. To apply usage limits and prevent abuse it keeps only an irreversible fingerprint derived from your number (it cannot be used to recover it) together with the date of each delivery. Meta’s platform and Twilio do process your number and message data under their own policies.'] },
      { id: 'conservacion', h: 'How long data is kept', table: {
        head: ['What', 'Period'],
        rows: [
          ['Single-use code', 'Expires after 30 minutes and works only once'],
          ['Optimized video on the server', 'Deleted once delivery is confirmed and, at most, in about an hour (30-minute code validity plus a cleanup margin)'],
          ['Temporary download links for Twilio', 'Expire after 15 minutes'],
          ['Technical message identifiers and delivery status', '7 days'],
          ['Metadata of a finished delivery (without the video)', '30 days'],
          ['Irreversible sender fingerprint and date of each delivery (for usage limits)', '35 days'],
        ] },
        p: ['A used or expired code cannot be used to receive the video again.'] },
      { id: 'terceros', h: 'Providers involved', table: {
        head: ['Provider', 'What it does', 'Data it processes'],
        rows: [
          ['Meta (WhatsApp Business Platform)', 'Carries the WhatsApp messages', 'Your number, date and message status, under its policy'],
          ['Twilio', 'Messaging provider that sends and receives VYRO’s WhatsApp messages', 'Your number, date, delivery status and the file sent while delivery lasts; may keep messaging records under its policy'],
          ['Fly.io', 'Hosts the delivery server (United States)', 'The optimized video temporarily; technical logs such as IP addresses'],
          ['Google Play', 'Distribution and subscription billing', 'Payment and Google account data; VYRO only receives the access status'],
          ['Vercel', 'Hosts this website', 'Technical access logs, such as the IP address, to operate and protect the service'],
        ] },
        p: ['Each provider processes data under its own privacy policy. VYRO does not sell personal data.'] },
      { id: 'transferencias', h: 'International transfers', p: [
        'The delivery server is in the United States and the providers above may process data outside your country. By using WhatsApp delivery you accept that processing for the sole purpose of sending you your video.'] },
      { id: 'permisos', h: 'Android permissions', table: {
        head: ['Permission', 'What it is used for'],
        rows: [
          ['Photos and videos (gallery)', 'Choosing the file you want to optimize'],
          ['Camera and microphone', 'Only when you record a new video from VYRO'],
          ['Notifications', 'Telling you locally when processing finishes'],
          ['Foreground service / keep-awake', 'Letting processing continue if you minimize the app or lock the screen'],
          ['Google Play Billing', 'Buying and managing the PRO subscription'],
          ['Internet', 'Google Play billing and, if you choose WhatsApp delivery, sending the optimized video to the server'],
        ] },
        p: ['Android requests them when needed and you can review or revoke them in system Settings.'] },
      { id: 'suscripciones', h: 'Subscriptions and payments', p: [
        'VYRO PRO is handled entirely by <strong>Google Play Billing</strong>. Google processes payment, eligibility for any free trial, renewal, cancellation and refunds. VYRO never sees or stores your card or payment details: it only receives an access status (active or inactive) from Google Play. “Restore purchase” is resolved by asking Google Play with your Google account; VYRO has no account or password of its own.'] },
      { id: 'ads', h: 'Third-party advertising and analytics', p: [
        'The app does not integrate third-party advertising, tracking or analytics SDKs (verified in the code). No advertising identifiers are used and no information is shared with ad networks.'] },
      { id: 'web', h: 'This website and cookies', p: [
        'This site does not use cookies, analytics or advertising tools and does not store data in your browser. The hosting provider (Vercel) may log technical access data, such as the IP address, to operate and protect the service. If you email us, we use your message only to reply to you.'] },
      { id: 'seguridad', h: 'Security', p: [
        'Optimization happens on your phone, so the security of your originals depends on Android and your device. The video sent for delivery travels encrypted (HTTPS), is identified by an unguessable random code and is deleted automatically. No system is infallible, but we keep data and retention time to a minimum.'] },
      { id: 'sin-servidor', h: 'Server-free alternative', p: [
        'If you use the option to share the file through Android’s share menu, VYRO hands the file straight to the operating system and it does not pass through any VYRO server. In that case WhatsApp will apply its own compression to the file.'] },
      { id: 'menores', h: 'Children', p: [
        'VYRO is a general-purpose video optimization tool, not specifically directed at children, and does not intentionally collect personal data from minors.'] },
      { id: 'derechos', h: 'Your rights', p: [
        'You can request access, correction or deletion of the data we hold about you, and object to its processing, under the applicable law (in Peru, Law No. 29733 on Personal Data Protection). Because VYRO does not store your phone number or keep your videos beyond delivery, there is normally no profile of you to access. Records kept by Meta, Twilio or Google are governed by their own policies and rights over them are exercised with each provider.'] },
      { id: 'solicitudes', h: 'How to request data deletion', p: [
        `Write to <a href="mailto:${E}">${E}</a> with the delivery code or the approximate date of the delivery. Because files are deleted automatically in about an hour and the remaining records are purged within the periods above, there may be nothing left to delete. Uninstalling the app removes its local preferences; your optimized videos stay in your gallery until you delete them.`] },
      { id: 'independencia', h: 'Independence from WhatsApp and Meta', p: [
        'VYRO is an independent app. It is not affiliated with, endorsed by or sponsored by WhatsApp LLC or Meta Platforms, Inc. WhatsApp is a trademark of its respective owners.'] },
      { id: 'cambios', h: 'Changes to this policy', p: [
        'If this policy changes, it will be updated on this page with a new effective date. Substantial changes will also be reflected in the app listing.'] },
      { id: 'contacto', h: 'Contact', p: [
        `Controller: {operator}<br>Email: <a href="mailto:${E}">${E}</a>.`] },
    ],
  },
};

export const terms = {
  es: {
    h1: 'Términos y condiciones',
    lead: 'Reglas de uso de VYRO HD Video Optimizer. Al usar la aplicación aceptas estos términos.',
    sections: [
      { id: 'quienes', h: 'Quiénes somos', p: [
        `VYRO HD Video Optimizer (“VYRO”, “la aplicación”) es operada por <strong>{operator}</strong>; contacto: <a href="mailto:${E}">${E}</a>.`] },
      { id: 'licencia', h: 'Licencia de uso', p: [
        'Se te concede una licencia personal, no exclusiva y no transferible para usar VYRO en tus dispositivos, únicamente para optimizar contenido de tu propiedad o sobre el que tengas derecho a procesarlo y compartirlo.'] },
      { id: 'planes', h: 'Planes FREE y PRO', ul: [
        '<strong>FREE:</strong> permite optimizar videos sin costo. Los videos incluyen la marca de agua “VYRO FREE” y se dividen en partes de 30 segundos.',
        '<strong>PRO:</strong> suscripción que elimina la marca de agua y habilita partes de 45 y 60 segundos mientras la suscripción esté activa según el estado que informe Google Play. Las partes de 60 segundos se exportan en 720p para mantener el archivo dentro del límite de WhatsApp.',
        '<strong>Límites de uso:</strong> para proteger el servicio, cada plan puede tener un límite razonable de envíos por día, semana o mes. Los límites vigentes se muestran en la aplicación y pueden ajustarse con aviso. Cuando se alcanza un límite, el código sigue vigente y puedes volver a intentarlo cuando se renueve el periodo.'] },
      { id: 'pagos', h: 'Suscripciones, precios y pagos', p: [
        'VYRO PRO se ofrece mediante suscripción gestionada por <strong>Google Play</strong>. Los planes, precios, moneda e impuestos aplicables, así como cualquier prueba gratuita, son los que Google Play muestre en tu país en el momento de la compra y según tu elegibilidad. La activación, renovación, cancelación, facturación y reembolsos se rigen por los términos y políticas de Google Play. VYRO no procesa ni almacena datos de tarjeta o de pago.'] },
      { id: 'renovacion', h: 'Renovación, cancelación y reembolsos', p: [
        'Las suscripciones se renuevan automáticamente según el ciclo elegido hasta que se cancelen. Puedes cancelar en cualquier momento desde Google Play (Pagos y suscripciones); conservas el acceso PRO hasta el final del periodo ya pagado y luego la app vuelve al plan FREE. Las solicitudes de reembolso se tramitan según las políticas de Google Play.'] },
      { id: 'restaurar', h: 'Restauración de compras', p: [
        'Si reinstalas VYRO o cambias de teléfono con la misma cuenta de Google, puedes usar “Restaurar compra” para recuperar tu suscripción activa, verificada directamente con Google Play.'] },
      { id: 'entrega', h: 'Entrega por WhatsApp', p: [
        'Si eliges recibir el video por WhatsApp, el video ya optimizado se envía temporalmente a nuestro servidor y se te entrega mediante un código de un solo uso, tal como describe la <a href="{privacyUrl}">Política de privacidad</a>. Debes ser titular de la cuenta de WhatsApp que uses y cumplir las condiciones de WhatsApp.'] },
      { id: 'uso', h: 'Uso aceptable', p: [
        'No debes usar VYRO para procesar o distribuir contenido que infrinja derechos de autor, sea ilegal o viole los términos de plataformas de terceros. No debes intentar abusar, sobrecargar o eludir el servicio de entrega, ni usarlo para enviar mensajes masivos o no solicitados.'] },
      { id: 'terceros', h: 'Plataformas de terceros', p: [
        'VYRO prepara el archivo de partida, pero WhatsApp aplica su propio procesamiento y compresión al publicar un Estado. VYRO no garantiza que el contenido compartido mediante aplicaciones de terceros conserve una calidad concreta tras ese procesamiento, que está fuera de nuestro control. VYRO es independiente y no está afiliada ni respaldada por WhatsApp LLC ni por Meta Platforms, Inc.'] },
      { id: 'propiedad', h: 'Propiedad intelectual', p: [
        'El nombre “VYRO”, su logotipo, la marca de agua y los demás elementos de marca pertenecen al titular de VYRO. Conservas todos los derechos sobre tu propio contenido; VYRO no reclama ninguna propiedad sobre él.'] },
      { id: 'disponibilidad', h: 'Disponibilidad del servicio', p: [
        'VYRO se ofrece “tal cual”. No garantizamos que la aplicación esté libre de errores ni disponible de forma ininterrumpida; el rendimiento varía según el dispositivo, la versión de Android y las condiciones del teléfono. El servicio de entrega por WhatsApp depende de proveedores externos y puede interrumpirse.'] },
      { id: 'responsabilidad', h: 'Limitación de responsabilidad', p: [
        'En la medida permitida por la ley aplicable, el titular de VYRO no será responsable por daños indirectos, incidentales o consecuentes derivados del uso de VYRO, incluida la pérdida de datos o los resultados de calidad tras el procesamiento de terceros. Nada en estos términos limita derechos irrenunciables del consumidor.'] },
      { id: 'ley', h: 'Ley aplicable', p: [
        'Estos términos se rigen por las leyes de la República del Perú. Para cualquier controversia, las partes se someten a los tribunales competentes de Perú, sin perjuicio de los derechos que la normativa de protección al consumidor te reconozca.'] },
      { id: 'cambios', h: 'Cambios', p: [
        'Podemos actualizar VYRO y estos términos. Los cambios relevantes se reflejarán en esta página con una nueva fecha de vigencia.'] },
      { id: 'contacto', h: 'Contacto', p: [
        `Titular: {operator}<br>Correo: <a href="mailto:${E}">${E}</a>.`] },
    ],
  },
  en: {
    h1: 'Terms & Conditions',
    lead: 'The rules for using VYRO HD Video Optimizer. By using the app you accept these terms.',
    sections: [
      { id: 'quienes', h: 'Who we are', p: [
        `VYRO HD Video Optimizer (“VYRO”, “the app”) is operated by <strong>{operator}</strong>; contact: <a href="mailto:${E}">${E}</a>.`] },
      { id: 'licencia', h: 'License to use', p: [
        'You are granted a personal, non-exclusive, non-transferable license to use VYRO on your devices, solely to optimize content you own or otherwise have the right to process and share.'] },
      { id: 'planes', h: 'FREE and PRO plans', ul: [
        '<strong>FREE:</strong> lets you optimize videos at no cost. Videos include the “VYRO FREE” watermark and are split into 30-second parts.',
        '<strong>PRO:</strong> a subscription that removes the watermark and enables 45- and 60-second parts for as long as the subscription is active according to the status reported by Google Play. 60-second parts are exported at 720p to keep the file within WhatsApp’s limit.',
        '<strong>Usage limits:</strong> to protect the service, each plan may have a reasonable limit on deliveries per day, week or month. The current limits are shown in the app and may be adjusted with notice. When a limit is reached the code stays valid and you can try again when the period renews.'] },
      { id: 'pagos', h: 'Subscriptions, pricing and payment', p: [
        'VYRO PRO is offered as a subscription managed by <strong>Google Play</strong>. The plans, prices, currency, applicable taxes and any free trial are those Google Play shows in your country at the time of purchase and according to your eligibility. Activation, renewal, cancellation, billing and refunds are governed by Google Play’s terms and policies. VYRO does not process or store card or payment data.'] },
      { id: 'renovacion', h: 'Renewal, cancellation and refunds', p: [
        'Subscriptions renew automatically for the chosen cycle until cancelled. You can cancel at any time from Google Play (Payments & subscriptions); you keep PRO access until the end of the already-paid period and the app then returns to the FREE plan. Refund requests are handled under Google Play’s policies.'] },
      { id: 'restaurar', h: 'Restoring purchases', p: [
        'If you reinstall VYRO or switch phones using the same Google account, you can use “Restore purchase” to recover your active subscription, verified directly with Google Play.'] },
      { id: 'entrega', h: 'WhatsApp delivery', p: [
        'If you choose to receive the video on WhatsApp, the already-optimized video is temporarily sent to our server and delivered to you using a single-use code, as described in the <a href="{privacyUrl}">Privacy Policy</a>. You must be the holder of the WhatsApp account you use and comply with WhatsApp’s conditions.'] },
      { id: 'uso', h: 'Acceptable use', p: [
        'You must not use VYRO to process or distribute content that infringes copyright, is unlawful or violates third-party platform terms. You must not try to abuse, overload or circumvent the delivery service, or use it to send bulk or unsolicited messages.'] },
      { id: 'terceros', h: 'Third-party platforms', p: [
        'VYRO prepares the starting file, but WhatsApp applies its own processing and compression when you post a Status. VYRO does not guarantee that content shared through third-party apps keeps a specific quality after that processing, which is outside our control. VYRO is independent and is not affiliated with or endorsed by WhatsApp LLC or Meta Platforms, Inc.'] },
      { id: 'propiedad', h: 'Intellectual property', p: [
        'The name “VYRO”, its logo, the watermark and the other brand elements belong to the owner of VYRO. You keep all rights to your own content; VYRO claims no ownership of it.'] },
      { id: 'disponibilidad', h: 'Service availability', p: [
        'VYRO is provided “as is”. We do not guarantee that the app is error-free or uninterrupted; performance varies with the device, the Android version and the phone’s conditions. WhatsApp delivery depends on external providers and may be interrupted.'] },
      { id: 'responsabilidad', h: 'Limitation of liability', p: [
        'To the extent permitted by applicable law, the owner of VYRO will not be liable for indirect, incidental or consequential damages arising from the use of VYRO, including data loss or quality results after third-party processing. Nothing in these terms limits non-waivable consumer rights.'] },
      { id: 'ley', h: 'Governing law', p: [
        'These terms are governed by the laws of the Republic of Peru. For any dispute, the parties submit to the competent courts of Peru, without prejudice to the rights consumer protection law grants you.'] },
      { id: 'cambios', h: 'Changes', p: [
        'We may update VYRO and these terms. Relevant changes will be reflected on this page with a new effective date.'] },
      { id: 'contacto', h: 'Contact', p: [
        `Owner: {operator}<br>Email: <a href="mailto:${E}">${E}</a>.`] },
    ],
  },
};
