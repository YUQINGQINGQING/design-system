import type { CSSProperties } from 'react'
import './SystemSettingsMenu.css'

const asset = (name: string) => `${import.meta.env.BASE_URL}SVG/SVG-系统设置菜单/${name}`

export type SystemSettingsKind =
  | '用户管理'
  | 'systeamhook'
  | '权限管理'
  | '仓库规范'
  | 'IP白名单'

type SystemSettingsMenuProps = {
  selected: SystemSettingsKind
  onSelect: (value: SystemSettingsKind) => void
  onBackToExternal: () => void
}

function SettingsIcon({ assetName }: { assetName: string }) {
  return (
    <span
      className="settings-item-icon"
      aria-hidden="true"
      style={{ '--icon-url': `url(${asset(assetName)})` } as CSSProperties}
    />
  )
}

export function SystemSettingsMenu({ selected, onSelect, onBackToExternal }: SystemSettingsMenuProps) {
  const items: Array<{ key: SystemSettingsKind; assetName: string }> = [
    { key: '用户管理', assetName: '用户管理.svg' },
    { key: 'systeamhook', assetName: 'systeamhook.svg' },
    { key: '权限管理', assetName: '权限管理.svg' },
    { key: '仓库规范', assetName: '仓库规范.svg' },
    { key: 'IP白名单', assetName: 'IP白名单.svg' },
  ]

  return (
    <div className="settings-menu-layout" data-menu-type="系统设置菜单">
      <section className="settings-menu-shell" aria-label="系统设置菜单">
        <header className="settings-menu-header">
          <button
            type="button"
            className="settings-back-btn"
            aria-label="返回仓库外菜单"
            onClick={onBackToExternal}
          >
            <SettingsIcon assetName="返回.svg" />
          </button>
          <h2 className="settings-title">系统设置</h2>
        </header>

        <nav className="settings-menu-main" aria-label="系统设置导航">
          {items.map((item) => {
            const active = selected === item.key
            return (
              <button
                key={item.key}
                type="button"
                className={`settings-menu-item ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => onSelect(item.key)}
              >
                <SettingsIcon assetName={item.assetName} />
                <span className="settings-item-label">{item.key}</span>
              </button>
            )
          })}
        </nav>

        <footer className="settings-menu-footer">
          <button type="button" className="settings-tenant-switch" aria-label="切换租户">
            <span className="settings-avatar" aria-hidden="true">E</span>
            <span className="settings-tenant-name">Elnbiora Fie...</span>
            <span className="settings-arrow" aria-hidden="true">▾</span>
          </button>
        </footer>
      </section>
    </div>
  )
}
