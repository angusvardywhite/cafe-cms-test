# Bread & Bean CMS test

A static multi-page café website with editable menu and gallery content using Decap CMS and GitHub authentication.

## Files

- Public pages are ordinary HTML files in the repository root.
- Menu and gallery content is stored as JSON in `content/`.
- Decap CMS is configured in `admin/config.yml`.
- Uploaded gallery images are stored in `assets/uploads/`.

## Deploy and enable GitHub login

1. Push this repository to GitHub with `main` as the default branch.
2. In Netlify, choose **Add new project → Import an existing project** and select this repository.
3. Netlify will detect `netlify.toml`; no build command is required and the publish directory is `.`.
4. In GitHub, open **Settings → Developer settings → OAuth Apps** and register a new OAuth application.
5. Use the deployed Netlify URL as the **Homepage URL**.
6. Set the **Authorization callback URL** to `https://api.netlify.com/auth/done`.
7. Copy the generated Client ID and create a Client Secret.
8. In Netlify, open **Project configuration → Access & security → OAuth**.
9. Under **Authentication providers**, install GitHub and enter the Client ID and Client Secret.
10. Visit `https://YOUR-SITE.netlify.app/admin/` and choose **Login with GitHub**.

Edits made in the admin page are committed to the GitHub repository. Netlify then republishes the changed site automatically.

Anyone using the CMS must have a GitHub account with write access to `angusvardywhite/cafe-cms-test`. Add the café owner as a repository collaborator before they try to log in.

## Local preview

Serve the repository through a local web server rather than opening the HTML files directly, because the menu and gallery load JSON files. GitHub authentication and publishing only work after the site is deployed and the GitHub OAuth provider is configured in Netlify.
