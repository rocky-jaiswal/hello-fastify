export class BadRequestError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BadRequestError'
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export const statusCodeFor = (err: Error) => {
  if (err instanceof BadRequestError) return 400
  if (err instanceof NotFoundError) return 404
  return 500
}
