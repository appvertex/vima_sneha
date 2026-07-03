const encoder = new TextEncoder();

function base64UrlEncode(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function randomToken(size = 32) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

export async function hashPassword(password, salt = randomToken(16), iterations = 120000) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: base64UrlDecode(salt),
      iterations
    },
    keyMaterial,
    256
  );
  return `pbkdf2_sha256$${iterations}$${salt}$${base64UrlEncode(new Uint8Array(derivedBits))}`;
}

export async function verifyPassword(password, stored) {
  const [scheme, iterationsRaw, salt, expected] = String(stored || '').split('$');
  if (scheme !== 'pbkdf2_sha256' || !iterationsRaw || !salt || !expected) return false;
  const actual = await hashPassword(password, salt, Number(iterationsRaw));
  return timingSafeEqual(actual, stored);
}

function timingSafeEqual(a, b) {
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i += 1) diff |= left[i] ^ right[i];
  return diff === 0;
}

