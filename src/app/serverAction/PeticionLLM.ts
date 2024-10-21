"use server";

interface ApiResponse {
  inputTextTokenCount: number;
  results: {
    completionReason: string;
    outputText: string;
    tokenCount: number;
  }[];
}

export async function PeticionLLM(ask: string): Promise<string> {
  const key = process.env.API_KEY;

  const response = await fetch(
    `http://127.0.0.1:5000/what?key=${key}&ask=${encodeURIComponent(
      ask
    )}`
  );

  if (!response.ok) {
    throw new Error("Error fetching data from API");
  }

  const data: ApiResponse = await response.json();
  return data.results[0].outputText;
}
