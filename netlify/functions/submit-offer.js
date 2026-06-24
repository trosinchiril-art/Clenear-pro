const mysql = require("mysql2/promise");

const ALLOWED_SERVICES = ["residential", "office", "postconstruction", "industrial"];
const ALLOWED_FREQUENCY = ["once", "weekly", "biweekly", "monthly"];

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return json(405, { success: false, message: "Metodă nepermisă." });
  }

  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
    return json(500, {
      success: false,
      message:
        "Baza de date nu este configurată pe Netlify. Adăugați DB_HOST, DB_USER, DB_PASSWORD, DB_NAME în Environment variables.",
    });
  }

  try {
    const body = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body || "";
    const params = new URLSearchParams(body);

    const input = {
      name: (params.get("name") || "").trim(),
      phone: (params.get("phone") || "").trim(),
      email: (params.get("email") || "").trim(),
      serviceType: (params.get("serviceType") || "").trim(),
      area: (params.get("area") || "").trim(),
      frequency: (params.get("frequency") || "").trim(),
      message: (params.get("message") || "").trim(),
    };

    const validationError = validateInput(input);
    if (validationError) {
      return json(400, { success: false, message: validationError });
    }

    const phoneClean = input.phone.replace(/[\s\-()]/g, "");
    const area = parseFloat(input.area);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || "3306", 10),
      connectTimeout: 15000,
    });

    const [result] = await connection.execute(
      `INSERT INTO offer_requests
       (name, phone, email, service_type, area, frequency, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        input.name,
        phoneClean,
        input.email,
        input.serviceType,
        area,
        input.frequency,
        input.message || null,
      ]
    );

    await connection.end();

    return json(200, {
      success: true,
      message: "Cererea a fost salvată cu succes.",
      id: result.insertId,
    });
  } catch (err) {
    console.error("submit-offer error:", err);
    return json(500, {
      success: false,
      message: "Eroare la salvare în baza de date. Verificați conexiunea MySQL și schema.sql.",
    });
  }
};

function validateInput(input) {
  if (!input.name || input.name.length < 2) return "Numele este obligatoriu.";
  if (!/^[a-zA-ZăâîșțĂÂÎȘȚ\s\-']+$/u.test(input.name)) {
    return "Numele conține caractere nevalide.";
  }

  const phoneClean = input.phone.replace(/[\s\-()]/g, "");
  if (!/^\+373[0-9]{8}$/.test(phoneClean)) {
    return "Telefon invalid. Format: +373XXXXXXXX.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    return "Email invalid.";
  }

  if (!ALLOWED_SERVICES.includes(input.serviceType)) {
    return "Tip serviciu invalid.";
  }

  const area = parseFloat(input.area);
  if (isNaN(area) || area <= 0 || area > 10000) {
    return "Suprafață invalidă.";
  }

  if (!ALLOWED_FREQUENCY.includes(input.frequency)) {
    return "Frecvență invalidă.";
  }

  if (input.message.length > 500) {
    return "Mesajul este prea lung.";
  }

  return "";
}

function json(statusCode, data) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(data),
  };
}
