# Local revision safeguards

Before each future user-requested revision batch, create a numbered ZIP snapshot in ../nirwana-rollbacks, excluding .git, node_modules and dist. Include tracked and untracked project files. Never overwrite previous snapshots. Record timestamp, purpose and SHA256 in the rollback index and tell the user its number before editing. Restore only on explicit request, preferably into a separate folder for review. Keep changes local until the user authorizes Git push. Apply verification-before-completion before claiming completion.

For every future Git push, use GitHub account Hamijeu and verify commit author identity before pushing. Push only when the user requests it.
