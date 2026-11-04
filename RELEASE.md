# Release procedure

Releases use signed Git tags and npm staged publishing. The workflow stages an
exact package, but a maintainer must approve that package with two-factor
authentication (2FA) before npm makes it public.

Do not create or move a release tag manually. Do not run `npm publish` from a
workstation.

## Prepare the release

1. Add the release notes to `CHANGELOG.md` on `main`, under a heading that
   names the version bump from the consumer-visible change:
   `## [Unreleased (patch)]`, `## [Unreleased (minor)]`, or
   `## [Unreleased (major)]`. The release workflow renames it to
   `## [X.Y.Z] - YYYY-MM-DD`, and those notes become the GitHub release notes.
2. Push the completed changes and wait for the ordinary `main` build to pass.
3. Confirm that `main` has not moved to a different commit.

## Stage the package

1. Open **Build & Prepare Release** in GitHub Actions.
2. Select **Run workflow** on `main`.
3. Wait for **Build & Prepare Release** to finish. If the `CHANGELOG.md`
   heading does not name a bump, its **Read the version bump from
   CHANGELOG.md** job fails without waiting for the tests and explains how to
   fix the heading.
4. In the tag-bound **Stage npm Release** workflow, wait for the **Stage
   package on npm** job to finish. Leave the workflow running: its **Create
   immutable GitHub release** job waits for your npm approval.

## How the release works

- `build.yml` (**Build & Prepare Release**) reads the version bump from the
  `## [Unreleased (patch|minor|major)]` heading in `CHANGELOG.md` while the
  test matrix runs, and fails with instructions if that heading is missing,
  names no bump, or has no notes under it. Once both pass, it bumps the
  version, renames the heading to `## [X.Y.Z] - YYYY-MM-DD` with a new empty
  `## [Unreleased]` above it, adds the version's `[X.Y.Z]: <url>` link
  definition, pushes a signed release commit and annotated tag, and starts
  `publish.yaml` at that tag.
  [`photostructure/changelog-release-action`](https://github.com/photostructure/changelog-release-action)
  does the `CHANGELOG.md` work and the npm wait below.
- `publish.yaml` (**Stage npm Release**) validates the tag, builds and verifies
  the exact tarball, and stages it with `npm stage publish`. npm trusts only
  this workflow file, by name, to stage the package, so renaming it means
  changing the package's trusted-publisher settings on npmjs.com.
- npm validates a staged package, which takes 5 to 20 minutes, then holds it
  until a maintainer approves it with 2FA.
- The **Create immutable GitHub release** job checks npm 10, 20, 35 and 55
  minutes after staging, then every 30 minutes, for up to 5 hours 25 minutes.
  Any npm error other than "not found" (E404) ends the job early. Once npm
  serves the version, it re-verifies the signed tag and creates the immutable
  GitHub release. Its notes are the version's `CHANGELOG.md` section, followed
  by GitHub's generated notes. GitHub emails the release to the repository's
  watchers at that moment, so the email always announces a version they can
  install.

## Approve the npm stage

1. Open **Staged Packages** from the npm user menu.
2. Confirm the package name, version, file list, metadata, checksum evidence,
   and provenance.
3. Confirm that the provenance identifies this repository, `publish.yaml`, the
   release tag, and the signed tag commit.
4. Approve the staged package with 2FA.
5. Confirm that npm lists the version publicly.
6. Wait for the **Create immutable GitHub release** job to finish, then confirm
   that the GitHub release exists, is immutable, and has the version's
   `CHANGELOG.md` section at the top of its notes.

## Recover from a failed release

- If the pre-tag test fails, fix `main` and start a new release run.
- If the tag push succeeds but publisher dispatch fails, rerun only the
  dispatch job or start `publish.yaml` manually at the existing signed tag.
- If the tagged workflow is defective, fix `main` and release a new version.
  Never move the existing tag.
- If the staged contents are wrong, reject the stage and release a new version.
  The rejected run's **Create immutable GitHub release** job then runs out of
  checks and fails without creating a release. Cancel that run, or ignore its
  failure, and do not re-run it.
- If the **Create immutable GitHub release** job fails before it creates the
  release (its checks ran out before you approved the stage, or `npm view`
  failed with an error other than E404), approve the stage if you have not,
  then use **Re-run failed jobs** on that **Stage npm Release** run. GitHub
  allows re-runs for 30 days. Do not start a new release.
- If npm publishes a bad release, deprecate it or publish a corrected version.
  Never overwrite a published version.

## Local development

Dependency resolution requires npm 11.10.0 or newer. Run `make preflight`
before opening a release pull request. To regenerate tags from the complete
ExifTool sample corpus, run `npm run mktags ../test-images` before preflight.

`.npmrc` sets `ignore-scripts`, so no lifecycle script runs during an install:
`npm install` will not build the project, and every `pre`/`post` hook is
inert. Run `npm run compile` after installing. Scripts here spell out their own
prerequisites rather than relying on hooks.
