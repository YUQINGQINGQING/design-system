import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import './RepositoryInternalMenu.css'

const asset = (name: string) => `${import.meta.env.BASE_URL}SVG/SVG-仓库内菜单/${name}`

export type RepositoryInternalKind =
  | '代码'
  | '提交'
  | '分支'
  | 'Tags'
  | '对比'
  | '合并请求'
  | '议题'
  | '里程碑'
  | '成员'
  | '设置'

type RepositoryInternalMenuProps = {
  collapsed: boolean
  selected: RepositoryInternalKind
  onSelect: (value: RepositoryInternalKind) => void
  onToggle: () => void
  onBackToExternal?: () => void // 新增返回外部菜单回调
}

function InnerIcon({ assetName }: { assetName: string }) {
  return (
    <span
      className="inner-item-icon"
      aria-hidden="true"
      style={{ '--icon-url': `url(${asset(assetName)})` } as CSSProperties}
    />
  )
}

export function RepositoryInternalMenu({
  collapsed,
  selected,
  onSelect,
  onToggle,
  onBackToExternal,
}: RepositoryInternalMenuProps) {
  const [repoDropdownOpen, setRepoDropdownOpen] = useState(false)
  const [currentRepo, setCurrentRepo] = useState('BK1/khh1-...')
  const repoSelectorWrapRef = useRef<HTMLDivElement | null>(null)
  const items: Array<{ key: RepositoryInternalKind; assetName: string }> = [
    { key: '代码', assetName: '代码.svg' },
    { key: '提交', assetName: '提交.svg' },
    { key: '分支', assetName: '分支.svg' },
    { key: 'Tags', assetName: 'tags.svg' },
    { key: '对比', assetName: '对比.svg' },
    { key: '合并请求', assetName: '合并请求.svg' },
    { key: '议题', assetName: '议题.svg' },
    { key: '里程碑', assetName: '里程碑.svg' },
    { key: '成员', assetName: '成员.svg' },
    { key: '设置', assetName: '设置.svg' },
  ]
  const repoOptions = ['BK1/khh1-...', 'BK1/khh2-...', 'BK1/design-system']

  useEffect(() => {
    if (!repoDropdownOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (repoSelectorWrapRef.current && !repoSelectorWrapRef.current.contains(target)) {
        setRepoDropdownOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setRepoDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [repoDropdownOpen])

  // ...existing code...

  return (
    <div className={`inner-menu-layout ${collapsed ? 'collapsed' : ''}`} data-menu-type="仓库内菜单">
      <section className={`inner-menu-shell ${collapsed ? 'collapsed' : ''}`} aria-label="仓库内菜单">
        <header className="inner-menu-header">
          {onBackToExternal && (
            <button
              type="button"
              className="inner-menu-back-btn"
              aria-label="返回外部菜单"
              style={{ marginRight: 8 }}
              onClick={onBackToExternal}
            >
              ← 返回
            </button>
          )}
          <div ref={repoSelectorWrapRef} className={`repo-selector-wrap ${repoDropdownOpen ? 'active' : ''}`}> 
            <button
              type="button"
              className={`repo-selector ${repoDropdownOpen ? 'active' : ''}`}
              aria-label="当前仓库"
              aria-expanded={repoDropdownOpen}
              onClick={() => setRepoDropdownOpen((value) => !value)}
            >
              {collapsed ? (
                <span className="repo-selector-collapsed-mark" aria-hidden="true">
                  ▼
                </span>
              ) : (
                <>
                  <span className="repo-name">{currentRepo}</span>
                  <span className="repo-arrow" aria-hidden="true">
                    ▼
                  </span>
                </>
              )}
            </button>
            {!collapsed && repoDropdownOpen && (
              <div className="repo-dropdown-panel" role="listbox" aria-label="仓库列表">
                {repoOptions.map((repo) => {
                  const active = repo === currentRepo
                  return (
                    <button
                      key={repo}
                      type="button"
                      className={`repo-dropdown-option ${active ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentRepo(repo)
                        setRepoDropdownOpen(false)
                      }}
                    >
                      {repo}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </header>

        <nav className="inner-menu-main" aria-label="仓库内导航">
          {items.map((item) => {
            const active = selected === item.key
            return (
              <button
                key={item.key}
                type="button"
                className={`inner-menu-item ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
                aria-label={item.key}
                title={collapsed ? item.key : undefined}
                data-item-key={item.key}
                onClick={() => onSelect(item.key)}
              >
                <InnerIcon assetName={item.assetName} />
                {!collapsed && <span className="inner-item-label">{item.key}</span>}
              </button>
            )
          })}
        </nav>
        <button
          type="button"
          className="inner-menu-toggle"
          aria-label={collapsed ? '展开菜单' : '收起菜单'}
          onClick={onToggle}
        >
          {collapsed ? '◂' : '▸'}
        </button>
      </section>
    </div>
  )
}
