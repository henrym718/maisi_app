export const ROLES = {
  CLIENT: "client",
  TALENT: "talent",
} as const;
export const ROLE_VALUES = Object.values(ROLES);
export type Role = (typeof ROLES)[keyof typeof ROLES];
