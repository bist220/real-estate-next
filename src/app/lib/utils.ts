export function isNullOrEmptyObject(obj: unknown): boolean {
  if (obj === null || obj === undefined) {
    return true;
  }
  if (typeof obj !== 'object') {
    return false; // Not an object, so not "empty object"
  }
  return Object.keys(obj).length === 0;
}

export function getNumberEnv(variableName: string, defaultValue: number): number {
  const envValue = process.env[variableName];

  if (envValue === undefined || envValue.trim() === '') {
    return defaultValue;
  }

  const parsedValue = parseInt(envValue, 10);

  if (isNaN(parsedValue)) {
    console.warn(`Warning: Environment variable "${variableName}" is not a valid number. Using default value ${defaultValue}.`);
    return defaultValue;
  }

  return parsedValue;
}