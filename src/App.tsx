import { useState } from 'react'
import { MenuFramework, type MenuKind } from './components/MenuFramework'
import { RepositoryInternalMenu, type RepositoryInternalKind } from './components/RepositoryInternalMenu'
import { SystemSettingsMenu, type SystemSettingsKind } from './components/SystemSettingsMenu'
import { MENU_TYPES, menuCatalog, type MenuType } from './menus/menuRegistry'
import './App.css'

const MENU_NAME_MAP: Record<string, MenuType> = {
  仓库外菜单: MENU_TYPES.repositoryExternal,
  仓库内菜单: MENU_TYPES.repositoryContent,
  仓库内容菜单: MENU_TYPES.repositoryContent,
  系统设置菜单: MENU_TYPES.systemSettings,
}

function resolveMenuTypeFromInstruction(rawName?: string | null): MenuType {
  if (!rawName) {
    return MENU_TYPES.repositoryExternal
  }
  return MENU_NAME_MAP[rawName.trim()] ?? MENU_TYPES.repositoryExternal
}

function App() {
  const params = new URLSearchParams(window.location.search)
  const menuInstruction = params.get('menu') ?? params.get('menuName')
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState<MenuKind>('代码仓库')
  const [internalSelected, setInternalSelected] = useState<RepositoryInternalKind>('代码')
  const [settingsSelected, setSettingsSelected] = useState<SystemSettingsKind>('用户管理')
  const [activeMenuType, setActiveMenuType] = useState<MenuType>(
    resolveMenuTypeFromInstruction(menuInstruction),
  )
  const activeMenuPlan = menuCatalog[activeMenuType]

  // 展开用logo+bkcode.svg，收起用logo单体.svg
  const logoSrc = collapsed
    ? `${import.meta.env.BASE_URL}SVG/logo单体.svg`
    : `${import.meta.env.BASE_URL}SVG/logo+bkcode.svg`

  return (
    <main className="menu-preview-page" aria-label={`${activeMenuPlan.type}预览`} data-menu-key={activeMenuPlan.key}>
      <section className="menu-only-page">
        {activeMenuType === MENU_TYPES.repositoryExternal ? (
          <MenuFramework
            collapsed={collapsed}
            selected={selected}
            onSelect={setSelected}
            onToggle={() => setCollapsed((v) => !v)}
            onOpenSystemSettings={() => {
              setCollapsed(false)
              setActiveMenuType(MENU_TYPES.systemSettings)
            }}
            logoSrc={logoSrc}
            logoAlt="品牌Logo"
          />
        ) : activeMenuType === MENU_TYPES.repositoryContent ? (
          <RepositoryInternalMenu
            collapsed={collapsed}
            selected={internalSelected}
            onSelect={setInternalSelected}
            onToggle={() => setCollapsed((v) => !v)}
          />
        ) : (
          <SystemSettingsMenu
            selected={settingsSelected}
            onSelect={setSettingsSelected}
            onBackToExternal={() => {
              setCollapsed(false)
              setActiveMenuType(MENU_TYPES.repositoryExternal)
            }}
          />
        )}
      </section>
    </main>
  )
}

export default App
