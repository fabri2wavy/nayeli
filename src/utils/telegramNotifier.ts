/**
 * Servicio de notificación silenciosa a Telegram
 * Notifica cuando alguien visita la cápsula o interactúa con ella
 */

const TELEGRAM_CONFIG = {
  botToken: "9233150471:AAGOiDv1yx1qKwACPycLm0N-fQj-uXpfA50",
  chatId: "1924450402",
};

export async function sendTelegramNotification(action: string, details?: string) {
  try {
    const now = new Date();
    // Formatear hora de Bolivia (UTC-4)
    const timeString = now.toLocaleString("es-BO", {
      timeZone: "America/La_Paz",
      dateStyle: "short",
      timeStyle: "medium",
    });

    const text = [
      `🔔 *Notificación de la Cápsula*`,
      `📅 Fecha/Hora: \`${timeString}\``,
      `✨ Evento: *${action}*`,
      details ? `📝 Detalle: _${details}_` : "",
      `📱 Dispositivo: ${navigator.userAgent.includes("Mobile") ? "Celular" : "Computadora"}`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.chatId,
        text: text,
        parse_mode: "Markdown",
      }),
    });
  } catch (error) {
    // Falla silenciosa: si hay adblock o falla de red, la página sigue funcionando normal
    console.debug("Telemetry error:", error);
  }
}
