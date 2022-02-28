module.exports = {
  root: true,
  extends: [
    'standard-react-ts'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/dot-notation': ['off'],
    'padded-blocks': ['off'],
    '@typescript-eslint/no-base-to-string': ['off'],
    '@typescript-eslint/restrict-plus-operands': ['off'],
    'react-hooks/rules-of-hooks': ['off']
  }
}
