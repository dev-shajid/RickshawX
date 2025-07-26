export enum UserType {
  PATIENT = "patient",
  DOCTOR = "doctor",
  SYSTEM_ADMIN = "system_admin"
}

export enum BloodGroup {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-"
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  PREFER_NOT_TO_SAY = "prefer_not_to_say"
}

export interface User {
  _id: string;
  email: string;
  role?: string; // Optional role field
}

export interface UserWithToken extends User {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface TokenData {
  user_id?: string;
  email?: string;
        role?: string;
  user_type?: string;
}

export interface BaseRegisterRequest {
  email: string;
  password: string;
  role: string;
}
