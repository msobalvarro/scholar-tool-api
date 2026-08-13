import { ExecutePromptOptions, GeminiModel } from '@/core/interfaces/dtos/google-ai';
import { IAIService } from '@/core/interfaces/repositories/google-ai';
import { environments } from '@/utils/constanst';
import { GoogleGenAI, GenerateContentParameters } from '@google/genai';
import { Service } from 'typedi';


@Service()
export class GeminiService implements IAIService {
  private ai!: GoogleGenAI;
  private readonly defaultModel: GeminiModel = 'gemini-2.5-flash';

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: environments.GOOGLE_API_KEY });
  }

  async executePrompt(prompt: string, options: ExecutePromptOptions = {}): Promise<string> {
    const {
      model = this.defaultModel,
      systemInstruction,
      temperature,
      topP,
      maxOutputTokens,
    } = options;

    const params: GenerateContentParameters = {
      model,
      contents: prompt,
      config: {
        ...(systemInstruction && { systemInstruction }),
        ...(temperature !== undefined && { temperature }),
        ...(topP !== undefined && { topP }),
        ...(maxOutputTokens !== undefined && { maxOutputTokens }),
      },
    };

    try {
      const response = await this.ai.models.generateContent(params);
      return response.text ?? '';
    } catch (error) {
      console.error('[GeminiService Error]:', error);
      throw new Error('Error al procesar la solicitud con Gemini API');
    }
  }
}