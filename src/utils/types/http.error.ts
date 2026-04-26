/**
 * Interface que define a estrutura de um erro detalhado para respostas HTTP
 * 
 * @property type - Categoria/tipo do erro (ex: "validation", "authorization", "business")
 * @property field - Nome do campo específico que gerou o erro (ex: "email", "password")
 * @property description - Mensagem explicativa do erro (ex: "Email já está em uso")
 * @property location - Onde o erro ocorreu (ex: "body", "query", "params", "headers")
 */
interface ErrorDetail {
  type: string;
  field: string;
  description: string;
  location: string;
}
/**
 * Classe personalizada para erros HTTP com suporte a detalhes estruturados
 * 
 * @example
 * // Exemplo de uso com validação de formulário
 * const detalhes = [{
 *   type: "validation",
 *   field: "email", 
 *   description: "Formato de e-mail inválido",
 *   location: "body"
 * }];
 * throw new HTTPError(400, "Erro de validação", detalhes);
 * 
 * @example
 * // Exemplo de uso simples, sem detalhes
 * throw new HTTPError(401, "Token de autenticação não fornecido");
 */
export class HTTPError extends Error {
  public statusCode: number;
  public details?: ErrorDetail[];

  constructor(statusCode: number, reason: string, details?: ErrorDetail[]) {
    super(reason);
    this.statusCode = statusCode;
    this.details = details;
  }
}