// lib/GroqLLM.js
import { BaseLLM } from "langchain/llms/base";
import axios from "axios";

export class GroqLLM extends BaseLLM {
  constructor(fields) {
    super(fields);
    this.model = fields.model || "llama3-70b-8192";
    this.apiKey = fields.apiKey;
  }

  _llmType() {
    return "groq";
  }

  async _call(prompt, options) {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: this.model,
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: options?.temperature ?? 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );

    return res.data.choices[0].message.content;
  }
}
