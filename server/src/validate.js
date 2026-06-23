// Middleware genérico de validação com zod.
// Em caso de erro, devolve 400 com a primeira mensagem amigável.
export const validate = (schema, source = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const msg = result.error.issues[0]?.message || 'Dados inválidos.';
    return res.status(400).json({ error: msg });
  }
  // Guarda o resultado validado/normalizado. (req.query é somente-leitura em alguns
  // setups, então usamos req.validatedQuery para esse caso.)
  if (source === 'query') req.validatedQuery = result.data;
  else req[source] = result.data;
  next();
};
