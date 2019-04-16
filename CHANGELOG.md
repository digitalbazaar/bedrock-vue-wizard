# bedrock-vue-wizard ChangeLog

## 3.1.0 - 2019-04-15

## Changed
- Disable navigation buttons until await completes.

## 3.0.0 - 2019-04-09

### Changed
- Upgrade to bedrock-quasar version 3.0.

### Added
- Add babel-eslint to parse dynamic imports.
- Add sample step for testing purposes.
- Add 320px mobile support.

### Removed
- Remove babel-eslint from root ESLint config.

## 2.0.0 - 2019-02-27

### Changed
- **BREAKING**: Remove `steps` props for `br-wizard`.
- **BREAKING**: Require `total-steps` and `current-step-index` as props for
  `br-wizard`.
- **BREAKING**: Require the use of `br-wizard-step` with `br-wizard` to display
   steps.
- Move CSS rules to the components they apply to.
- Decouple the wizard navigator and wizard step from the main wizard component.

## 1.0.1 - 2019-02-14

### Fixed
- Remove debug logging.

## 1.0.0 - 2019-02-14

### Fixed
- Fix CSS issues and remove dependence on background.

### Added
- Add options to block back and finish buttons.

## 0.1.0 - 2019-02-11

### Added
- Add core files.

- See git history for changes previous to this release.
