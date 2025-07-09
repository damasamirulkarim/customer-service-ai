export interface ApiResponse<T> {
  message: string;
  data?: T;
  meta?: {
    total?: number;
    per_page?: number;
    current_page?: number;
    last_page?: number;
  };
  errors?: Record<string, string>;
}

export class ValidationErrorResponse implements ApiResponse<null> {
  message: string;
  errors: Record<string, string>;

  constructor(message: string, errors: Record<string, string>) {
    this.message = message;
    this.errors = errors;
  }
}

export class ErrorResponse implements ApiResponse<null> {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class SuccessResponse<T> implements ApiResponse<T> {
  message: string;
  data: T;

  constructor(message: string, data: T) {
    this.message = message;
    this.data = data;
  }
}

export class PaginatedResponse<T> implements ApiResponse<T[]> {
  message: string;
  data: T[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };

  constructor(
    message: string,
    data: T[],
    total: number,
    perPage: number,
    currentPage: number,
  ) {
    this.message = message;
    this.data = data;
    this.meta = {
      total,
      per_page: perPage,
      current_page: currentPage,
      last_page: Math.ceil(total / perPage),
    };
  }
}
