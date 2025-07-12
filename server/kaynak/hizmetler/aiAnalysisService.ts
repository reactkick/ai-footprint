import axios from 'axios';

// OpenRouter API'si için istek ve cevap tiplerini tanımlıyoruz. Bu, TypeScript'in gücüdür!
interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices: {
    message: Message;
  }[];
}

const API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Verilen bir metni analiz etmesi için OpenRouter API'sine gönderir.
 * @param text Analiz edilecek metin (örneğin bir haber makalesi).
 * @returns Yapay zekanın ürettiği analiz sonucu.
 */
export async function analyzeTextWithAI(text: string): Promise<string> {
  if (!API_KEY) {
    throw new Error('OpenRouter API anahtarı .env dosyasında bulunamadı.');
  }

  try {
    const response = await axios.post<OpenRouterResponse>(
      API_URL,
      {
        model: 'openai/gpt-3.5-turbo', // Veya 'anthropic/claude-3-haiku', 'google/gemini-flash' gibi başka bir model
        messages: [
          {
            role: 'system',
            content: 'Sen, yapay zekanın çevresel etkileri konusunda uzman bir analizcisin. Sana verilen metindeki su, enerji veya karbon emisyonu tüketimi ile ilgili sayısal verileri ve kaynaklarını JSON formatında çıkarman gerekiyor. Eğer veri yoksa, {"found": false} döndür.'
          },
          {
            role: 'user',
            content: text
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const analysisResult = response.data.choices[0].message.content;
    return analysisResult;

  } catch (error) {
    console.error('OpenRouter API hatası:', error.response?.data || error.message);
    throw new Error('Yapay zeka analizi sırasında bir hata oluştu.');
  }
}
