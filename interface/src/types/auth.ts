export interface AuthState {
  user: {
    uuid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  } | null;
  error: string | null;
  isLoading: boolean;
}
