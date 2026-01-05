function composeHtml(name, sem) {
  return `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; border: 1px solid #ddd;">
        <img src="${sem.thumbnail}" style="width: 100%; height: auto;">
        <div style="padding: 20px;">
          <h2 style="color: #006d5b;">Registration Confirmed!</h2>
          <p>Assalamu Alaikum <b>${name}</b>,</p>
          <p>You are successfully registered for:</p>
          <div style="background: #fdfcf0; padding: 15px; border-radius: 5px; border: 1px solid #e9e3c0;">
            <b>Topic:</b> ${sem.title}<br>
            <b>Speaker:</b> ${sem.speaker}<br>
            <b>Date/Time:</b> ${sem.date} at ${sem.time}
          </div>
          <br>
          <a href="${sem.zoom}" style="background: #006d5b; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">Join Zoom Session</a>
          <p>Join our WhatsApp community for updates:</p>
          <a href="${FIXED_WA_LINK}" style="color: #25D366; font-weight: bold;">WhatsApp Group Link</a>
        </div>
      </div>
    </body>
  </html>`;
}
