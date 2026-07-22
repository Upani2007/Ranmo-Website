import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({ success: false, error: "Telegram not configured" }, { status: 500 });
  }

  const body = await request.json();
  const { name, phone, date, time, party_size, notes } = body;

  const lines = [
    "New reservation request",
    "",
    `Name: ${name || "-"}`,
    `Phone: ${phone || "-"}`,
    `Date: ${date || "-"}`,
    `Time: ${time || "-"}`,
    `Party size: ${party_size || "-"}`,
    `Notes: ${notes || "-"}`,
  ];
  const text = lines.join("\n");

  const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  const telegramData = await telegramRes.json();

  if (!telegramData.ok) {
    return NextResponse.json({ success: false, error: telegramData.description }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
