/**
 * Newsletter subscribe endpoint. Phase 4 wires the full flow:
 *   1. Validate email
 *   2. Create Subscriber in Payload (status: pending, send verification email)
 *   3. Add to Resend audience for broadcasts (after verification)
 *
 * For now this is a stub that accepts the request and returns success
 * so the UI flows can be built and tested before the email backend is wired.
 */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name, source } = await req.json();
    if (!email || typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    // TODO Phase 4: persist to Payload Subscribers + send verification email via Resend.
    console.log("[subscribe stub]", { email, name, source });

    return NextResponse.json({ ok: true, pending: true });
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}
