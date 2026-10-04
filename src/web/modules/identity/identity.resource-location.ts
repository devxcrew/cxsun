export type IdentityResourceLocation = {
  creating: boolean;
  editing: boolean;
  id?: string;
};

export function parseIdentityResourceLocation(
  pathname: string,
  base: string,
  resource: string,
): IdentityResourceLocation | null {
  const prefix = `${base}/${resource}`;
  if (pathname === prefix || pathname === `${prefix}/`) return { creating: false, editing: false };
  if (!pathname.startsWith(`${prefix}/`)) return null;
  const segments = pathname
    .slice(prefix.length + 1)
    .replace(/\/$/, "")
    .split("/");
  if (segments.length === 1 && segments[0] === "create") return { creating: true, editing: false };
  if (segments.length > 2 || (segments.length === 2 && segments[1] !== "edit")) return null;
  try {
    const id = decodeURIComponent(segments[0]);
    if (!id || id.length > 100 || id === "." || id === ".." || /[\/\\\u0000-\u001f\u007f]/.test(id))
      return null;
    return { creating: false, editing: segments.length === 2, id };
  } catch {
    return null;