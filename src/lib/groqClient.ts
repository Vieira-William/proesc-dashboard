import Groq from 'groq-sdk'

const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined

const groq = apiKey
  ? new Groq({ apiKey, dangerouslyAllowBrowser: true })
  : null

const SYSTEM_PROMPT = `Você é um analista educacional especializado em desempenho escolar.
Analise os dados fornecidos e gere insights acionáveis em português brasileiro.
Seja direto, use dados concretos e sugira ações específicas para a gestão escolar.
Estruture a resposta com seções claras usando markdown:
- Diagnóstico Geral
- Padrões Identificados
- Turmas que Precisam de Atenção
- Recomendações Prioritárias
- Alunos para Intervenção Imediata`

export interface MensagemChat {
  role: 'user' | 'assistant'
  content: string
}

export async function* gerarInsights(prompt: string): AsyncGenerator<string> {
  if (!groq) {
    throw new Error('API key do Groq não configurada. Defina VITE_GROQ_API_KEY no arquivo .env')
  }

  const stream = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 2048,
    stream: true,
  })

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content
    if (delta) yield delta
  }
}

const CHAT_SYSTEM_PROMPT = `Você é um analista de dados educacionais respondendo perguntas de um gestor escolar.
Responda em Português Brasileiro, de forma direta e fundamentada nos dados.
Cite números específicos quando possível.
Mantenha as respostas concisas (máximo 200 palavras).
Se a pergunta não puder ser respondida com os dados disponíveis, diga isso claramente.`

export async function* chatComIA(
  mensagens: MensagemChat[],
  contextoDados: string,
): AsyncGenerator<string> {
  if (!groq) {
    throw new Error('API key do Groq não configurada. Defina VITE_GROQ_API_KEY no arquivo .env')
  }

  const stream = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: `${CHAT_SYSTEM_PROMPT}\n\nDados do dashboard:\n${contextoDados}` },
      ...mensagens.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    ],
    temperature: 0.7,
    max_tokens: 1024,
    stream: true,
  })

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content
    if (delta) yield delta
  }
}
