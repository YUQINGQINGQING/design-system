# CCode Menu Baseline Rules

## Baseline Scope
- Baseline names are fixed:
  - 仓库外菜单
  - 仓库内菜单
  - 系统设置菜单
- The three menus belong to CCode product function menus and are baseline versions.
- Team members can reference these menus but must not modify baseline code.
- Baseline modifications are restricted to the owner only.

## Invocation Rules
- Invoke by menu name instruction, then map name to menu and render only that menu.
- Do not render any menu switch buttons during invocation.
- Supported query invocation in preview:
  - `?menu=仓库外菜单`
  - `?menu=仓库内菜单`
  - `?menu=系统设置菜单`
  - Alias `?menu=仓库内容菜单` maps to 仓库内菜单.

## Runtime Navigation Rules
- In 仓库外菜单, click 管理 to navigate to 系统设置菜单.
- In 系统设置菜单, click the top-left 返回 icon to navigate back to 仓库外菜单.

## Collaboration Rules
- If a team member needs customization, clone baseline into a new variant instead of editing baseline directly.
- Any baseline update must preserve menu names and invocation mapping compatibility.
