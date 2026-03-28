# Respostas aos Stakeholders — Parte 2

> Respostas refinadas com framing financeiro para o desafio Proesc.

---

## Pergunta 1 — CEO: "Estamos no caminho certo? O que esses números me dizem sobre a saúde do negócio?"

A escola entrega resultado para a maioria — média geral de 6.82, acima do mínimo de aprovação, com tendência de melhora ao longo do ano (6.55 no B1 → 7.09 no B4). 67% dos alunos foram aprovados.

Porém, 33 de 100 alunos reprovaram — taxa de 33%. Para uma escola particular, onde famílias pagam pela promessa de resultado, isso é um sinal de alerta. O impacto financeiro é direto: estimando mensalidade média de R$1.500 e uma taxa conservadora de 30% de churn entre famílias de reprovados, a escola tem R$49.500/mês de receita em risco — potencialmente R$594.000/ano.

A turma 3B concentra o problema: 48.5% de reprovação, quase o triplo da 3A (17.6%). Isso sugere um problema estrutural (metodologia, professor, composição da turma) que precisa de investigação.

O dado mais importante para o negócio: 100% dos alunos que tiraram nota abaixo de 6 no 1º bimestre reprovaram no final. Zero exceções. Isso significa que com um sistema de alerta precoce atuando no B1, a escola poderia identificar e intervir em 100% dos futuros reprovados. A ferramenta de detecção existe nos dados — falta apenas o produto para operacionalizá-la.

A escola não está fora do caminho, mas tem uma vulnerabilidade financeira concentrada na 3B e uma oportunidade clara de reduzir reprovação (e churn) com intervenção precoce no B1.

---

## Pergunta 2 — Diretor de Produto: "Como estruturaria a feature de alerta precoce?"

A análise dos dados revelou um preditor perfeito: nota do 1º bimestre < 6 tem 100% de precisão e 100% de recall para prever reprovação. Dos 33 alunos com B1 < 6, todos os 33 reprovaram. Zero falsos positivos, zero falsos negativos.

Estruturaria a feature com 3 níveis de risco baseados no B1:

**Crítico (B1 < 4) — 6 alunos:** Média final entre 3.5 e 4.0. Ação: alerta imediato ao coordenador + convocação dos pais + plano de recuperação individual obrigatório + acompanhamento semanal.

**Alto (B1 entre 4 e 4.9) — 11 alunos:** Média final entre 4.25 e 4.5. Ação: alerta ao coordenador + reforço escolar obrigatório + monitoramento quinzenal.

**Médio (B1 entre 5 e 5.9) — 16 alunos:** Média final entre 5.0 e 5.5. São os "quase aprovados" — faltaram 0.5 a 1.0 pontos. Ação: alerta ao professor titular + reforço sugerido + acompanhamento bimestral. Estes são os mais resgatáveis com menor esforço.

A reclassificação seria bimestral: a cada novo bimestre, o sistema recalcula o risco com todas as notas disponíveis. O dado mais impactante: se os 16 alunos de risco médio fossem resgatados, a taxa de reprovação cairia de 33% para 17%.

---

## Pergunta 3 — Head de Produto: "Quais 3 KPIs essenciais e por quê?"

**KPI 1: Taxa de Aprovação por Turma (%)**
Mede efetividade do ensino por unidade. Hoje a 3B (51.5%) tem desempenho radicalmente diferente da 3A (82.4%). Sem este KPI, o gestor vê só a média geral (67%) e perde a granularidade. Com ele, pode investigar causas e comparar intervenções.

**KPI 2: Evolução da Média Bimestral por Turma**
Mostra tendência, não foto. A média geral subiu de 6.55 para 7.09 — positivo. Mas a 3B oscilou sem consistência (6.15→6.76→6.21→7.0). Este KPI permite detectar problemas no meio do caminho e agir antes do B3/B4.

**KPI 3: % de Alunos em Zona de Risco (média corrente < 6)**
É um indicador antecedente — prevê o futuro. Os KPIs 1 e 2 medem o que já aconteceu. Este mede o que está prestes a acontecer. Se no B1 temos 33% dos alunos com nota < 6, e a correlação com reprovação é 100%, este KPI é literalmente um previsor de resultado.

Os 3 KPIs formam um triângulo: resultado atual (Taxa de Aprovação) + tendência (Evolução Bimestral) + predição (Zona de Risco). Permitem ao gestor agir no presente, entender a trajetória, e antecipar o futuro.
