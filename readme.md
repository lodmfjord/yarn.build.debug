# yarn-plugin-build-debug

Simple tools to help debug yarn.build.


## Install

Copy file ``dist.js`` to ``.yarn/plugins/@yarnpkg/plugin-build-debug.js``.

Add:

```yaml
  - path: .yarn/plugins/@yarnpkg/plugin-build-debug.js
```

to your ``.yarnrc``.

## diagram

```sh
yarn reon diagram
```

responds with a url to a diagram of the current build

## report

```sh
yarn reon report
```

responds with top packages and circular dependencies.

