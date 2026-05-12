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
- In 仓库外菜单, click 代码仓库 to navigate to 仓库内菜单.
- In 仓库外菜单, click 管理 to navigate to 系统设置菜单.
- In 系统设置菜单, click the top-left 返回 icon to navigate back to 仓库外菜单.

## Method 1 Standard Operation Steps (High Frequency)
- Purpose: daily development preview and debugging.
- Recommended frequency: around 2 times per day.
- Steps:
  - `cd /Users/better/Downloads/DevOps-AI/CCode/menu-app`
  - `npm --prefix ./menu-app install` (run once after cleanup or dependency changes)
  - `npm run dev`
  - Open `http://127.0.0.1:4173/`
  - Stop with `Ctrl + C` when done.
- Common issue handling:
  - If port is occupied: `lsof -ti tcp:4173 | xargs kill -9`
  - Then start again with `npm run dev`.

## Collaboration Rules
- If a team member needs customization, clone baseline into a new variant instead of editing baseline directly.
- Any baseline update must preserve menu names and invocation mapping compatibility.

## Push Automation Rules
- Remote repository: git@github.com:YUQINGQINGQING/design-system.git
- Default branch: main
- Default push command: git push -u origin main
- Baseline branch policy: always update `main` with rebase-first strategy.

## Lightweight Repository Hygiene Rules
- Keep repository content source-first: only keep code, assets, configs, and required docs.
- Remove generated artifacts before commit when not explicitly required:
  - `menu-app/node_modules/`
  - `menu-app/dist/`
  - `menu-app/node_modules/.vite/`
- Remove system cache files before commit:
  - `.DS_Store`
  - `**/.DS_Store`
- Keep design assets and MCP outputs that are baseline inputs only when they are required for traceability.
- Recommended local cleanup commands:
  - `find . -name '.DS_Store' -type f -delete`
  - `rm -rf menu-app/node_modules menu-app/dist`
- Reinstall and run after cleanup:
  - `npm --prefix ./menu-app install`
  - `npm run dev`

### Authentication Prerequisites
- Preferred protocol: SSH
- Repository SSH command binding:
  - git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_ccode -o IdentitiesOnly=yes"
- Required SSH public key (GitHub account `YUQINGQINGQING`):
  - ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJ/NiypEvmRfXCN8j85gb0Vtil92o4/bqNMfqae2kTv0 YUQINGQINGQING@github

### Conflict Handling Strategy
- If push is rejected with `fetch first`, run:
  - git pull --rebase origin main
- If conflict occurs during rebase, resolve conflict files and continue:
  - git add <resolved_files>
  - GIT_EDITOR=true git rebase --continue
- After rebase completion, push again:
  - git push -u origin main

### Latest Baseline Push Snapshot
- Latest pushed commit: 5c0e43f
- Branch: main
- Remote: origin (git@github.com:YUQINGQINGQING/design-system.git)
- Status: pushed successfully
