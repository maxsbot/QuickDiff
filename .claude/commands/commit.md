Fluxo:
1. Execute internamente `git diff --staged`.
2. Analise a saída.
3. Mostre a visualização dentro de um markdown da mensagem antes de aplicar o comando.
4. Gere e aplique o comando `git commit` diretamente.

Formato do commit:

git commit -m "<tipo>[optional (<escopo>)]: <descrição curta>[optional (#issue)]

- <bullet 1>
- <bullet 2>
- <bullet 3>
- <bullet 4>"

Regras:
- Sempre em português do Brasil.
- Tipos permitidos: 
  -feat: nova funcionalidade
  -fix: correção de bug
  -refactor: refatoração de código
  -docs: documentação
  -style: formatação/estilo
  -test: testes
  -chore: tarefas de manutenção
  -perf: melhoria de performance/desempenho
- Em regra 4 bullets no presente do indicativo, mas exepcionalmente 2 bullets se o diff for muito pequeno.
- Referência à issue só se o diff contiver explicitamente `#<n>`.
- Nunca incluir **footer** de qualquer tipo (ex.: "Resolve #...", "Co-Authored-By", "🤖 Generated with ...").
- Nenhuma explicação, saída extra ou marcação fora do comando.
- O commit é executado automaticamente, sem pedir confirmação.