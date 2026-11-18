# Informe nocturno — 2026-11-18

Sesión autónoma según `VYRO_Prompt_Nocturno.md`. Reglas respetadas: no se compró el dominio, no se inventaron datos legales, no se subió nada a Google Play, no se generó el keystore, no se tocó `master`/`main`, no hay secretos en ningún repositorio, no se activó la recarga de Twilio ni la tarjeta de Fly.

## 1. Hecho

| Tarea | Resultado | Commit / ubicación |
|---|---|---|
| T1 Fuera datos personales y de empresa | Pie centrado solo con VYRO; correo público `contacto@vyrohd.com`; sin Gmail, sin "Desarrollado por", sin `E.I.R.L..` (verificado en vivo, 0 coincidencias) | `a721896` (web) |
| T2 Web rehecha en 7 bloques | Tesis única, un solo acento (#19b8ff, del icono), Bricolage Grotesque + JetBrains Mono, tabla de planes con Mensual recomendado, antes/después marcado "ilustrativo". Publicada en Vercel | `680f44f` (web) |
| T3 Panel de administrador | Contraseña (Argon2id) + TOTP, límite de intentos con bloqueo progresivo, sesión de 2 h, CSRF, interruptor de emergencia, gráfico de 30 días, topes alcanzados, errores sin datos personales. **Desplegado pero inactivo (404) hasta que pongas los secretos** | `1257ce2`, `d3a83be` (servidor) |
| T4 GitHub | `git push origin redesign/v2` correcto. `master` intacta | rama remota `0126c1c` |
| T5 Dominio y correo | Guía con el reenvío de `contacto@vyrohd.com` como paso 1, registros DNS listos y ruta Google Workspace | `0126c1c` (web) |
| T6 Topes por plan | `SubscriptionVerifier` real contra la API de Google Play, apagado (`PLAY_VERIFY_ENABLED=false`, `PLAN_QUOTAS_ENABLED=false`) y falso para pruebas. Topes 3/sem, 20/sem, 100/mes, 70/mes como configuración con nombre | `ed1424b` (servidor) |
| T7 APK de depuración | 112 MB, solo 64 bits, trae la URL de Fly y el número oficial, sin el túnel muerto. Git y Vercel lo ignoran | `D:\dev\vyro-legal\build\vyro-debug-20261118.apk` (SHA-256 empieza por `3070c97e`) |
| T8 Calidad de video | **Banco de pruebas armado y probado**, sin resultados útiles todavía (ver §3) | `D:\dev\vyro\tool\quality_bench.mjs`, `bench\README.md` |

## 2. Decisiones que tomé por ti
1. **Blindé `build/` y `*.apk` en `.gitignore` y `.vercelignore`.** La ruta que pedías para el APK estaba dentro de lo que Vercel sube y git guarda; un APK de 112 MB no puede terminar ahí.
2. **APK sin modo "owner".** Lo que pruebes es lo que vería un usuario real.
3. **Dominio sin cambiar.** La web sigue en `vyro-hd.vercel.app` (canonical, sitemap y Open Graph) hasta que conectes `vyrohd.com`; el correo ya es `contacto@vyrohd.com`. Se cambia con `SITE_URL`.
4. **Google Fonts.** Las tipografías se cargan desde Google, lo que envía la IP del visitante. Se amplió la política de seguridad de la web y se agregó Google Fonts a la política de privacidad para que el texto siga siendo cierto.
5. **El nombre de la empresa solo aparece en las secciones de responsable de los legales** (no en la web ni en el pie). Sin RUC ni dirección.
6. **Los planes se marcan "previstos para el lanzamiento"**, porque la app aún no está en Play.
7. **El antes/después es una maqueta SVG ilustrativa**, nunca una captura real ni una medición. El "-94,6 % de peso" sale de 27.910.871 ÷ 519.096.546 (queda en SITE_FACTS).
8. **Panel (servidor):** Argon2id integrado de Node 24; un solo formulario contraseña + TOTP con un error genérico; cada paso de TOTP se acepta una vez; sesiones, bloqueos y errores en memoria (un despliegue los reinicia); la confirmación de pausa usa un bloque sin JavaScript para mantener la política de seguridad estricta; el panel **no puede deshacer** `DELIVERY_PAUSED=1` puesto en el entorno y lo dice.
9. **Topes por plan:** ventanas móviles de 7 y 30 días; el cupo de un plan pago pertenece a la suscripción (huella del token de compra) y el gratis al número de WhatsApp; **decide Google, no la app**; si Google no responde o está apagado, cae al cupo gratis, no a ilimitado. El token de compra se guarda cifrado (AES-256-GCM), nunca en logs, y se borra al terminar el envío.
10. **Corregí un error real del panel** al probarlo en un navegador: una cabecera `Referrer-Policy` hacía que el login recibiera 403. Ahora es `same-origin`, con prueba.

## 3. No se pudo / límites
- **Los 3 videos difíciles no están en ningún repositorio.** Solo hay videos de marca y tutoriales, y los de tu Escritorio son de otros proyectos (no los toqué). El banco se probó con un tutorial de pantalla (muy fácil de comprimir): las 4 variantes dan VMAF ≈ 95, **así que no sirve para elegir nada**. Falta llenar `D:\dev\vyro\bench\inputs\` y correr `node tool/quality_bench.mjs`.
- **El banco usa libx264 en el PC**; la app usa el codificador del teléfono (Media3). Compara ideas, no predice el archivo exacto.
- **No se pudo ver el panel en una captura:** el navegador integrado agotó el tiempo ("Screenshot timed out after 5s"). Se verificó login, panel y pausa leyendo la página y con JavaScript, con los estilos aplicándose.
- **La verificación contra Google Play nunca se ejecutó con credenciales reales** (no existe la cuenta de servicio). Está probada solo con el verificador falso.
- **La app Flutter no se tocó esta noche.** Las 239 pruebas de la app son del 2026-11-16 y no se repitieron.

## 4. Te toca a ti
1. **Tarjeta en Fly** (https://fly.io/trial). Sin ella la máquina se apaga a los 5 minutos y se vuelve a encender sola con cada mensaje.
2. **Comprar `vyrohd.com`** en Vercel y avisar para conectarlo y publicar con `SITE_URL=https://vyrohd.com`.
3. **Activar el reenvío de `contacto@vyrohd.com`** (paso 1 de `DOMINIO_Y_CORREO_PASO_A_PASO.md`). **Hoy nadie puede escribir ahí**, pero la web ya lo muestra.
4. **Elegir correo:** reenvío gratis o Google Workspace.
5. **Activar el panel:** `npm run admin:setup` en el servidor. Escanea el QR con Google Authenticator, guarda la contraseña, ejecuta el `flyctl secrets set ADMIN_PASSWORD_HASH=… ADMIN_TOTP_SECRET=…` que imprime y limpia la terminal. Hasta entonces el panel da 404.
6. **Keystore de firma de release:** decidir cuándo y dónde guardarlo. La llave es irreversible: si se pierde, la app no se puede volver a actualizar.
7. **Cuenta de servicio de Google Play** (para verificar suscripciones y activar los topes por plan). Además la app tiene que enviar el token de compra: **todavía no lo hace**.
8. **Revisar con el abogado cómo queda identificado el responsable** en los legales (hoy: nombre de la empresa y el correo, sin RUC ni dirección).
9. **Decidir el tope del plan Anual.** Hoy es de 70 al mes, **menos que el Mensual (100)**, aunque el anual es 46 % más barato al año. No lo cambié.
10. **El servidor aún no aplica los topes por plan**, solo el techo general de 10 al día y 100 cada 30 días. Mientras tanto el plan Gratis entrega más de lo que la web anuncia (3 a la semana).
11. **GitHub:** verificación en dos pasos. **Twilio:** recarga automática y alerta de saldo.
12. **El AAB público del 2026-11-16 no lleva la URL de Fly.** Recompilar con `--dart-define=VYRO_API_URL=https://vyro-whatsapp-backend.fly.dev --dart-define=VYRO_WHATSAPP_NUMBER=51977358981` antes de subir nada a Play.

## 5. Pruebas
- **Servidor:** 163 de 163 (las 115 anteriores y 48 nuevas; ninguna silenciada). Repetido por mí al final.
- **Web:** `npm run check` pasa (9 páginas) y e2e con Playwright **453 de 453** a 320, 375, 400, 414, 768, 1024, 1280, 1440 y 1920 px, en local y en vivo.
- **En vivo:** web, 8 URLs con 200; servidor, `/health` ok, `/api/v1/config` con `delivery_enabled:true`, webhook sin firma 403, `/admin*` 404.
- **Nada en rojo.**
