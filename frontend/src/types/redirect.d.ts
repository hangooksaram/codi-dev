type RedirectCondition = 'user' | 'profile';

export interface RedirectRoutes {
    allowed: RedirectCondition;
    currentRoute: string;
    redirectRoute: string;
    message: string;
  }