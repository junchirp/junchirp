import { Role } from "@/components/RoleConfirmation/RoleConfirmation.types";

export interface customError {
  status?: number;
  data?: any;
}

export interface CustomError {
  status: number;
  data: {
    message: string;
  };
}

export interface IUser {
  userName: string | null;
  email: string | null;
  id?: number | null;
  accessToken?: string | null;
  isConfirmed?: boolean;
  photo: string | null;
  token?: string | null;
  role?: Role | null;
}

export interface IAuthState {
  user: IUser;
}

export interface SearchParams {
  searchParams: {
    userName: string | null;
    email: string | null;
    photo: string | null;
    token: string | null;
  };
}
