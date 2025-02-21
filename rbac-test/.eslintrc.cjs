module.exports = {
  // 指定了root为true，eslint只检查当前项目目录
  root: true,
  // 指定脚本运行的环境，可以是浏览器、Node.js或ES6等。这些环境会提供一组预定义的全局变量
  env: { browser: true, es2020: true, node: true },
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'react-hooks'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json', 'tsconfig.node.json'],
    // project: true,
    tsconfigRootDir: __dirname,
  },
  // 定制化配置，例如React的版本和import配置
  settings: {
    react: {
      version: 'detect', // 自动检测React版本
    },
  },
  // 配置规则，规则的格式为：'rule-name': [2, { options: [] }]， 0是忽略，1是警告，2是报错
  rules: {
    'react/function-component-definition': 0,
    'react/prop-types': 0,
    'react/display-name': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/react-in-jsx-scope': 0, // React17后不需要在jsx中主动引入react
    'import/prefer-default-export': 0,
    'react-hooks/exhaustive-deps': 1,
    'jsx-a11y/no-static-element-interactions': 'off', // 关闭非交互元素加事件必须加 role
    'jsx-a11y/click-events-have-key-events': 'off', // 关闭click事件要求有对应键盘事件
    'prettier/prettier': 'off',
    'import/extensions': 'off', // 关闭m没有后缀的告警
    '@typescript-eslint/no-explicit-any': 'off',
    // eqeqeq: 2, // 必须使用 === 和 !==
    // "no-unused-vars": 2, // 禁止出现未使用过的变量
    // "no-var": 2, // 要求使用 let 或 const 而不是 var,
    // "space-in-parens": 2, // 强制在圆括号内使用一致的空格
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': [
      'error',
      {
        // 对导入模块进行分组
        groups: [
          'builtin',
          'external',
          ['internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'unknown',
        ],
        // 通过路径自定义分组
        pathGroups: [
          {
            // pattern：当前组中模块的最短路径匹配
            pattern: '../**', // 在规定的组中选其一，index、sibling、parent、internal、external、builtin、object、type、unknown
            group: 'external',
            // 定义组的位置，after、before
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        // newlines-between 不同组之间是否进行换行
        'newlines-between': 'always',
        // alphabetize 根据字母顺序对每个组内的顺序进行排序
        // alphabetize: {
        //   order: 'asc',
        //   caseInsensitive: true
        // }
      },
    ],
  },
};
