// src/access.ts
// 这个文件用于权限管理,属于约定文件,不可随便更改文件名.

export default function access(initialState: { currentUser?: Types.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};

  console.log(currentUser?.access);
  return {
    ...currentUser?.access
  };
}
