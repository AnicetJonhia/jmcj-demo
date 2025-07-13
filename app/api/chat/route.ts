import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "Cle_gemini_ici"
const GEMINI_MODEL = "gemini-2.5-pro"
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json()

    // Convert local history to Gemini's expected structure
    const contents = history.map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }],
    }))

    // Push the latest user prompt
    contents.push({
      role: "user",
      parts: [{ text: message }],
    })

    const requestBody = {
      contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    }

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`Erreur API Gemini: ${response.status} - ${errText}`)
    }

    const data = await response.json()
    const assistantReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Désolé, je n'ai pas pu générer de réponse."

    return NextResponse.json({ response: assistantReply })
  } catch (error) {
    console.error("Erreur dans l'API chat:", error)
    return NextResponse.json({ error: "Erreur lors du traitement de votre demande" }, { status: 500 })
  }
}
