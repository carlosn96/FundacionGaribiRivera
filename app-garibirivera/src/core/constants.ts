/**
 * @fileoverview Central location for application-wide constants.
 * This ensures that critical values are defined in one place for easy maintenance.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL;
export const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_FRONTEND_URL;
export const USER_TOKEN_NAME = process.env.NEXT_PUBLIC_USER_TOKEN_NAME || 'access_token';
export const REFRESH_TOKEN_NAME = process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || 'refresh_token';
export const ALLOWED_BRIDGE_SOURCES = (process.env.ALLOWED_BRIDGE_SOURCES || '').split(',').filter(Boolean);
export const BRIDGE_EXTERNAL_URL = process.env.NEXT_PUBLIC_BRIDGE_EXTERNAL_URL;
export const BRIDGE_EXTERNAL_SOURCE = process.env.NEXT_PUBLIC_BRIDGE_EXTERNAL_SOURCE || ' ';
export const BRIDGE_JWT_SECRET = process.env.BRIDGE_JWT_SECRET;

export function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error('JWT_SECRET_KEY is not set in environment variables');
  }
  return new TextEncoder().encode(secret);
}
