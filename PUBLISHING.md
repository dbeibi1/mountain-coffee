# Publish Mountain Coffee on GitHub Pages

The approved destination is the public repository `dbeibi1/mountain-coffee`, with a Pages site at the expected address `https://dbeibi1.github.io/mountain-coffee/`. These addresses must be verified after publication; they are not evidence of an already-live site.

## Account access

Use an authenticated GitHub browser session for the `dbeibi1` account to manage this repository and its Pages settings.

## Browser upload

1. Sign in as `dbeibi1`. Check whether `mountain-coffee` already exists. If it exists, inspect its contents before adding this project; do not overwrite unrelated work.
2. If absent, create a new **public** repository named `mountain-coffee`. Use `main` as its default branch.
3. Extract the prepared `MountainCoffee-submission.zip`. Upload the **contents** of its project folder into the repository root, keeping the `assets`, `scripts`, and `evidence` folders intact. `index.html` must be at the root, not nested inside another project folder. If the browser cannot upload folders directly, use staged commits: upload root files first, create each subfolder with a small `.gitkeep` file, then upload the files within that folder. Keep Pages disabled throughout these staging steps.
4. Include `.nojekyll` and `.gitignore`. Never upload the original assignment PDF or the ZIP itself.
5. Commit the files to `main` with a message such as `Build responsive Mountain Coffee landing page`.
6. Verify that `index.html`, `styles.css`, `script.js`, all eleven files in `assets`, the three scripts, and all evidence files are present at the correct paths. Only then, in repository **Settings → Pages**, choose **Deploy from a branch**, then **main** and **/(root)**. Save the setting.
7. Wait for GitHub's Pages deployment to succeed. Open the published URL shown by GitHub and confirm the site loads.

GitHub documents the supported workflow in [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Finish the submission evidence

- Check the published homepage, all images, navigation links, and the sample form. The form must still state that no request was sent.
- Confirm that the website works beneath the `/mountain-coffee/` path. All application assets use relative URLs.
- Run the browser checks against the published URL, if the development tools are available. In PowerShell:

```powershell
$env:MOUNTAIN_COFFEE_URL = 'https://dbeibi1.github.io/mountain-coffee/'
node scripts/check.mjs
```

- Update README publication status with the **verified** repository and live website links.
- Update the testing record to distinguish the original local checks from the completed live-host checks. Do not mark a check passed before it runs.
- Commit updated documentation and evidence. Submit the two URLs and the required screenshots according to the course instructions.

No paid hosting, custom domain, backend, or build pipeline is required.
