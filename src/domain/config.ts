export interface BaseConfig {
  token?: string;
}

export interface PaginatedConfig extends BaseConfig {
  page?: number;
  pageSize?: number;
}
