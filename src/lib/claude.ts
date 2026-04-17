import Anthropic from '@anthropic-ai/sdk';

// Initialize the Anthropic client
// Note: dangerouslyAllowBrowser is set to true because this is a client-side Vite application.
// In a production environment, it is highly recommended to route API calls through a secure backend
// to prevent exposing your API key to the client.
export const claudeClient = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  dangerouslyAllowBrowser: true,
});

/**
 * Streams a response from Claude API.
 */
export async function streamClaudeResponse(
  prompt: string,
  systemPrompt: string,
  onChunk: (text: string) => void,
  onError: (error: any) => void,
  onComplete: () => void
) {
  try {
    const stream = await claudeClient.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        onChunk(chunk.delta.text);
      }
    }
    
    onComplete();
  } catch (error) {
    console.error("Claude API Error:", error);
    onError(error);
  }
}

/**
 * Generates a complete response from Claude API (Non-streaming) for background tasks or tool calling.
 */
export async function generateClaudeResponse(prompt: string, systemPrompt: string, tools?: any[]): Promise<{ text: string, toolCalls?: any[] }> {
  try {
    const params: any = {
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    };

    if (tools && tools.length > 0) {
      params.tools = tools;
    }

    const response = await claudeClient.messages.create(params);
    
    let text = '';
    let toolCalls = [];

    for (const block of response.content) {
      if (block.type === 'text') {
        text += block.text;
      } else if (block.type === 'tool_use') {
        toolCalls.push({
          id: block.id,
          name: block.name,
          input: block.input
        });
      }
    }

    return { text, toolCalls };
  } catch (error) {
    console.error("Claude API Background Error:", error);
    return { text: 'Erro na comunicação com o WINF BRAIN.' };
  }
}

