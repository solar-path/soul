// API Response
export type ApiResponse<T = null> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type User = {
  email: string;
  id: string;
  fullname: string | null;
  avatar: string | null;
};
