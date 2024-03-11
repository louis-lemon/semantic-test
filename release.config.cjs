const { execSync } = require('child_process');

// module.exports = getCIConfig();

const plugins =  [
    // [
    //     '@semantic-release/exec',
    //     {
    //         prepareCmd: "echo 'next release version=${nextRelease.version} (test)'",
    //     },
    // ],
    // [
    //     'semantic-release-unsquash',
    //     {
    //         commitAnalyzerConfig: {
    //             preset: 'conventionalcommits',
    //             parserOpts: {
    //                 noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
    //             },
    //             releaseRules: [
    //                 { type: "hotfix", release: "patch" },
    //                 { type: "docs", release: "patch" },
    //                 { type: "refactor", release: "patch" },
    //                 { type: "perf", release: "patch" },
    //                 { type: "ci", release: "patch" },
    //                 { type: "chore", release: "patch" },
    //                 { type: "test", release: "patch" },
    //             ],
    //         },
    //         notesGeneratorConfig: {
    //             preset: 'conventionalcommits',
    //             parserOpts: {
    //                 noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
    //             },
    //             writerOpts: {
    //                 commitsSort: ['subject', 'scope'],
    //             },
    //             presetConfig: {
    //                 types: [
    //                     { type: "feat", section: "Features" },
    //                     { type: "chore", section: "Chores" },
    //                     { type: "fix", section: "Bug Fixes" },
    //                     { type: "hotfix", section: "Bug Fixes" },
    //                     { type: "docs", section: "Docs" },
    //                     { type: "refactor", section: "Refactoring" },
    //                     { type: "perf", section: "Performance Improvements" },
    //                     { type: "ci", section: "CI/CD Changes" },
    //                     { type: "test", section: "Tests" },
    //                 ]
    //             }
    //         },
    //     },
    // ],
    // [
    //     'semantic-release-unsquash',
    //     {
    //         commitAnalyzerConfig: {
    //             preset: 'conventionalcommits',
    //             releaseRules: [
    //                 { type: "workflowy", release: false }
    //             ],
    //         },
    //         notesGeneratorConfig: {
    //             preset: 'conventionalcommits',
    //             presetConfig: {
    //                 types: [
    //                     { type: "workflowy", "section": "작업 내역", "hidden": false},
    //                 ]
    //             }
    //         },
    //     },
    // ],
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
        '@semantic-release/changelog',
        {
            changelogFile: 'CHANGELOG.md',
        },
    ],
    [
        '@semantic-release/npm',
        {
            npmPublish: false,
        },
    ],
    // [
    //     "@semantic-release/git",
    //     {
    //         "assets": ["CHANGELOG.md"]
    //     }
    // ]
]

module.exports = isDryRun() ? getDryRunConfig() : getCIConfig();

function getDryRunConfig() {
    return {
        repositoryUrl: getLocalRepoUrl(),
        branches: [getCurrentBranch()],
        plugins
    };
}

function getCIConfig() {
    // contains your normal semantic-release config
    // this will be used on your CI environment
    return {
        repositoryUrl: 'https://github.com/louis-lemon/semantic-test',
        branches: ['main'],
        plugins
    };
}

function isDryRun() {
    return process.argv.includes('--dry-run');
}

function getLocalRepoUrl() {
    const topLevelDir = execSync('git rev-parse --show-toplevel').toString().trim();

    return `file://${topLevelDir}/.git`;
}

function getCurrentBranch() {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
