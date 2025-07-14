import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash"; 
const MAX_OUTPUT_TOKENS = 512;
const TEMPERATURE = 0.7;
const TOP_P = 0.95;
const TOP_K = 40;

const SYSTEM_INSTRUCTION =
  "Tu es un assistant d’orientation professionnelle. " +
  "Tu aides l’utilisateur à explorer ses options de carrière, " +
  "à analyser ses compétences et à formuler des conseils clairs. " +
  "**Si une question n'est pas directement liée à l'orientation professionnelle, tu dois gentiment l'indiquer et inviter l'utilisateur à se concentrer sur ce sujet.**";

// Safety settings for the Gemini model.
const SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },

];

// --- API Route Handler ---
export async function POST(req: NextRequest) {
  // 1. API Key Validation
  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set.");
    return NextResponse.json(
      { error: "Configuration Error: GEMINI_API_KEY is missing." },
      { status: 500 }
    );
  }

  try {
    const { message, history = [] } = await req.json();

    // 2. Input Validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: "The 'message' field is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Get the generative model with defined settings
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION,
      safetySettings: SAFETY_SETTINGS,
    });

    // 3. Prepare Chat History

    const chatHistory = history.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // 4. Validate and Sanitize Chat History for Gemini API Requirements
    let validHistory = chatHistory;
    const firstUserIndex = chatHistory.findIndex(msg => msg.role === 'user');

    if (firstUserIndex > 0) {
      // If model messages appear before the first user message, slice them off.
      validHistory = chatHistory.slice(firstUserIndex);
    } else if (firstUserIndex === -1 && chatHistory.length > 0) {
      // If history contains only model messages, it's invalid for starting a new chat.
      // In this case, we clear the history to avoid API errors.
      validHistory = [];
      console.warn("Chat history contains only 'model' messages. Clearing history for a fresh start.");
    }


    // 5. Start Chat Session
    const chat = model.startChat({
      history: validHistory,
      generationConfig: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: TEMPERATURE,
        topP: TOP_P,
        topK: TOP_K,
      },
    });

    // console.log("➡️ Sending message to Gemini API:", message);

    // 6. Send Message and Get Response
    const result = await chat.sendMessage(message);
    const response = result.response;

    // console.log("⬅️ Received response from Gemini API:", JSON.stringify(response, null, 2));

    const assistantReply = response.text().trim();

    // 7. Return Success Response
    return NextResponse.json({ response: assistantReply });

  } catch (error: any) {
    // 8. Centralized Error Handling
    console.error("Detailed error in chat API:", error);
    // Provide a more generic error message to the client, but log the specific error.
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again." },
      { status: 500 }
    );
  }
}