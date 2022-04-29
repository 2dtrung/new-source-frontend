import { initReactQueryAuth } from 'react-query-auth';

import { Spinner } from '@/components/Elements';
import {
  loginWithEmailAndPassword,
  getUser,
  registerWithEmailAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
} from '@/features/auth';
import storage from '@/utils/storage';

async function handleUserResponse(data: UserResponse) {
  const { user } = data;
  storage.setToken(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVkNDhlYWY0YmFmZTAwMWM2M2Y4YzciLCJwYXNzd29yZCI6IiQyYiQxMCRKZkQuQ0tCd1lJVXFoUnNjdEtDWVZlS211QVBLQ2ExNVZULkF5THRpOE5DS1hMS2xUYmM1MiIsImlhdCI6MTY1MDg3MTg0OH0.iOITYE4NX37tmfvCE373RjGoWZed_HHEQ6gYRh1XfX4'
  );
  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
