import {
  isValidDescripcion,
  isValidEmail,
  isValidLatitud,
  isValidLongitud,
  isValidPassword,
  MIN_DESCRIPCION_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../index';

describe('validaciones de auth', () => {
  it('valida email con formato correcto', () => {
    expect(isValidEmail('ana@potawatch.com')).toBe(true);
    expect(isValidEmail('correo-invalido')).toBe(false);
  });

  it('valida contraseña con longitud mínima', () => {
    expect(isValidPassword('Test1234!')).toBe(true);
    expect(isValidPassword('abc')).toBe(false);
    expect('Test1234!'.length).toBeGreaterThanOrEqual(MIN_PASSWORD_LENGTH);
  });
});

describe('validaciones de puesto', () => {
  it('valida latitud dentro del rango permitido', () => {
    expect(isValidLatitud(-12.046374)).toBe(true);
    expect(isValidLatitud(91)).toBe(false);
  });

  it('valida longitud dentro del rango permitido', () => {
    expect(isValidLongitud(-77.042793)).toBe(true);
    expect(isValidLongitud(-181)).toBe(false);
  });
});

describe('validaciones de reporte', () => {
  it('valida descripción con mínimo de caracteres', () => {
    expect(isValidDescripcion('a'.repeat(MIN_DESCRIPCION_LENGTH))).toBe(true);
    expect(isValidDescripcion('corta')).toBe(false);
  });
});
