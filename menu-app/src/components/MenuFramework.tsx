import './MenuFramework.css'

const asset = (name: string) => `${import.meta.env.BASE_URL}SVG/${name}`

export type MenuKind = '代码仓库' | '仓库组'

type MenuFrameworkProps = {
  collapsed: boolean
  selected: MenuKind
  onSelect: (value: MenuKind) => void
  onToggle: () => void
  onOpenRepositoryInternal?: () => void
  onOpenSystemSettings?: () => void
  logoSrc?: string
  logoAlt?: string
}

function RepositoryIcon({ active }: { active: boolean }) {
  // 代码仓库图标
  const src = active ? asset('代码仓库-点击.svg') : asset('代码仓库-静态.svg')
  return <img className="menu-svg-icon nav-icon" src={src} alt="代码仓库" />
}

function GroupIcon({ active }: { active: boolean }) {
  // 仓库组图标
  const src = active ? asset('仓库组-点击.svg') : asset('仓库组-静态.svg')
  return <img className="menu-svg-icon nav-icon" src={src} alt="仓库组" />
}

export function RepositoryExternalMenu({
  collapsed,
  selected,
  onSelect,
  onToggle,
  onOpenRepositoryInternal,
  onOpenSystemSettings,
  logoSrc,
  logoAlt = '品牌 Logo',
}: MenuFrameworkProps) {
  const menuTypeLabel = '仓库外菜单'
  const items: Array<{ key: MenuKind; label: string }> = [
    { key: '代码仓库', label: '代码仓库' },
    { key: '仓库组', label: '仓库组' },
  ]

  return (
    <div className={`menu-layout ${collapsed ? 'collapsed' : ''}`} data-menu-type={menuTypeLabel}>
      <section className={`menu-shell ${collapsed ? 'collapsed' : ''}`} aria-label={menuTypeLabel}>
        <div className="menu-header" data-node-id="17259:16573">
          {logoSrc ? (
            <img className="brand-logo-image" src={logoSrc} alt={logoAlt} />
          ) : (
            <div className="brand-mark placeholder" aria-label="logo 素材待补充" role="img" />
          )}
        </div>

        <nav className="menu-main" aria-label="仓库外菜单导航" data-node-id="17259:16613">
          {items.map((item) => {
            const active = selected === item.key
            return (
              <button
                key={item.key}
                type="button"
                className={`menu-item ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
                aria-label={item.label}
                onClick={() => {
                  onSelect(item.key)
                  if (item.key === '代码仓库') {
                    onOpenRepositoryInternal?.()
                  }
                }}
              >
                {item.key === '代码仓库' ? (
                  <RepositoryIcon active={active} />
                ) : (
                  <GroupIcon active={active} />
                )}
                {!collapsed && <span className="label">{item.label}</span>}
                {!collapsed && active && <span className="active-line" aria-hidden="true" />}
              </button>
            )
          })}
        </nav>

        <div className="menu-footer" data-node-id="17259:16621">
          <button
            type="button"
            className="footer-item"
            aria-label="管理"
            onClick={onOpenSystemSettings}
          >
            <img className="menu-svg-icon manage-icon" src={asset('管理.svg')} alt="管理" />
            {!collapsed && <span>管理</span>}
          </button>

          <button type="button" className="tenant-switch" aria-label="切换租户">
            <span className="avatar" aria-hidden="true">E</span>
            {!collapsed && (
              <>
                <span className="tenant-name">Elnbiora Fie...</span>
                <span className="arrow" aria-hidden="true">▾</span>
              </>
            )}
          </button>
        </div>
      </section>

      <button
        type="button"
        className="menu-toggle"
        aria-label={collapsed ? '展开菜单' : '收起菜单'}
        onClick={onToggle}
      >
        {collapsed ? '◂' : '▸'}
      </button>
    </div>
  )
}

export { RepositoryExternalMenu as MenuFramework }
