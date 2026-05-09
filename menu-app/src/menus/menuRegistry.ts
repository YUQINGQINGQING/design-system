export const MENU_TYPES = {
  repositoryExternal: '仓库外菜单',
  repositoryContent: '仓库内容菜单',
  systemSettings: '系统设置菜单',
} as const

export type MenuType = (typeof MENU_TYPES)[keyof typeof MENU_TYPES]

export type MenuPlan = {
  type: MenuType
  key: string
  status: 'ready' | 'planned'
  description: string
}

export const menuCatalog: Record<MenuType, MenuPlan> = {
  仓库外菜单: {
    type: MENU_TYPES.repositoryExternal,
    key: 'repository-external',
    status: 'ready',
    description: '仓库入口与仓库组切换导航',
  },
  仓库内容菜单: {
    type: MENU_TYPES.repositoryContent,
    key: 'repository-content',
    status: 'ready',
    description: '仓库内目录与内容导航',
  },
  系统设置菜单: {
    type: MENU_TYPES.systemSettings,
    key: 'system-settings',
    status: 'ready',
    description: '系统设置相关导航',
  },
}
