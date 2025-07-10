export class ChatCompletionDto {
  readonly messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  readonly model?: string;
  readonly temperature?: number;
  readonly max_tokens?: number;
}

export class ChatResponseDto {
  readonly id: string;
  readonly object: string;
  readonly created: number;
  readonly choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }>;
  readonly usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
