import { transactions } from "../data/store.js";

export const createCheckout = async (req, res) => {
  const { title, price, isMerch, itemId } = req.body;

  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!title || !price) {
    return res.status(400).json({
      error: "Título y precio son obligatorios"
    });
  }

  const preferenceData = {
    items: [
      {
        id: itemId || "cinematic-item",
        title,
        quantity: 1,
        currency_id: "ARS",
        unit_price: Number(price)
      }
    ],
    back_urls: {
      success: `${
        process.env.APP_URL || "http://localhost:3000"
      }/success?item=${encodeURIComponent(title)}&price=${price}`,

      failure: `${process.env.APP_URL || "http://localhost:3000"}/failure`,

      pending: `${process.env.APP_URL || "http://localhost:3000"}/pending`
    },

    notification_url: `${
      process.env.APP_URL || "http://localhost:3000"
    }/api/checkout/webhook`,

    auto_return: "approved"
  };

  if (!accessToken || accessToken === "TU_TOKEN") {
    const simulatedPreferenceId = `pref_sandbox_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const newTx = {
      id: simulatedPreferenceId,
      title,
      price,
      isMerch,
      itemId,
      status: "pending",
      date: new Date().toISOString()
    };

    transactions.push(newTx);

    return res.json({
      id: simulatedPreferenceId,
      init_point: `/checkout-sandbox?pref=${simulatedPreferenceId}&title=${encodeURIComponent(
        title
      )}&price=${price}`,
      realMercadoPago: false
    });
  }

  try {
    const mpResponse = await fetch(
      "https://api.mercadopago.com/v1/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(preferenceData)
      }
    );

    const mpData = await mpResponse.json();

    return res.json({
      id: mpData.id,
      init_point: mpData.init_point,
      realMercadoPago: true
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Checkout error"
    });
  }
};

export const webhook = (req, res) => {
  const data = req.body;

  console.log("🔔 Webhook:", data);

  transactions.push({
    id: `notif_${Date.now()}`,
    payload: data,
    date: new Date().toISOString(),
    status: "verified"
  });

  res.json({
    received: true
  });
};