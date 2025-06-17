import Button from '../button';

interface GoogleLoginButtonProps {
  onClick?: () => void;
  isLoading: boolean;
}

const GoogleLoginButton = ({ isLoading, onClick }: GoogleLoginButtonProps) => {
  return (
    <Button
      onClick={onClick}
      isLoading={isLoading}
      fullWidth
      className="flex items-center justify-center gap-2"
    >
      <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M12.0003 4.75C13.7703 4.75 15.3553 5.36 16.6053 6.45L20.0303 3.02C17.9502 1.15 15.2353 0 12.0003 0C7.31031 0 3.25531 2.69 1.28931 6.61L5.27031 9.7C6.21531 6.86 8.87031 4.75 12.0003 4.75Z"
          fill="#EA4335"
        />
        <path
          d="M23.49 12.27C23.49 11.48 23.42 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.33 17.25 16.07 18.1L19.93 21.19C22.19 19.09 23.49 15.94 23.49 12.27Z"
          fill="#4285F4"
        />
        <path
          d="M5.27 14.3C5.02 13.57 4.89 12.8 4.89 12C4.89 11.2 5.03 10.43 5.27 9.7L1.29 6.61C0.471 8.24 0 10.06 0 12C0 13.94 0.471 15.76 1.29 17.39L5.27 14.3Z"
          fill="#FBBC05"
        />
        <path
          d="M12.0004 24C15.2404 24 17.9654 22.94 19.9354 21.19L16.0704 18.1C15.0004 18.81 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.2154 17.14 5.2704 14.3L1.2894 17.39C3.2554 21.31 7.3104 24 12.0004 24Z"
          fill="#34A853"
        />
      </svg>
      Entrar com Google
    </Button>
  );
};

export default GoogleLoginButton;
