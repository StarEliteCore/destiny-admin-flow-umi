import { reloadAuthorized } from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString = typeof str === 'undefined' && localStorage ? localStorage.getItem('smart-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority: string | string[] = [];
  try {
    if (authorityString) authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString ? authorityString : '';
  }
  if (typeof authority === 'string') return [authority];
  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('smart-authority', JSON.stringify(proAuthority));
  // auto reload
  reloadAuthorized();
}
