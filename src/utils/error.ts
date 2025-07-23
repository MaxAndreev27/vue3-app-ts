interface IError {
    INVALID_LOGIN_CREDENTIALS: string;
    EMAIL_NOT_FOUND: string;
    INVALID_PASSWORD: string;
    auth: string;
}

export const ERROR_CODES: IError = {
    INVALID_LOGIN_CREDENTIALS: 'Невірний логін або пароль',
    EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
    INVALID_PASSWORD: 'Пароль неверный',
    auth: 'Пожалуйста войдите в систему',
};

type codeType = 'INVALID_LOGIN_CREDENTIALS' | 'EMAIL_NOT_FOUND' | 'INVALID_PASSWORD' | 'auth';

export function errorTranslate(code: codeType) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка';
}
