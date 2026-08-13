import { ExecutePromptOptions } from '../dtos/google-ai';

export interface IAIService {
  /**
    * Ejecuta un prompt enviándolo a la API de Gemini
    * @param prompt El texto o instrucción principal enviado por el usuario/sistema
    * @param options Opciones de configuración adicionales (model, temperature, systemInstruction, etc.)
    * @returns La respuesta generada por el modelo
    */
  executePrompt(prompt: string, options?: ExecutePromptOptions): Promise<string>;
}