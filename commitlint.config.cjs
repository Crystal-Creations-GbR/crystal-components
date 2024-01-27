module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "scope-enum": [2, "always", ["deps", "deps-dev"]],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "ci",
        "docs",
        "feat",
        "fix",
        "lang",
        "perf",
        "refactor",
        "release",
        "test",
      ],
    ],
    "header-max-length": [2, "always", 72],
    "body-max-line-length": [2, "always", "Infinity"],
    // Disable max footer length because of too many false positives (body with issue reference, footer with BREAKING CHANGES). See also conventional-changelog/commitlint#3364
    "footer-max-line-length": [2, "always", "Infinity"],
  },
};
