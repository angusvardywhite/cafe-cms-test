# Bread & Bean CMS test

A static multi-page café website with editable menu and gallery content using Decap CMS, Netlify Identity and Git Gateway.

## Files

- Public pages are ordinary HTML files in the repository root.
- Menu and gallery content is stored as JSON in `content/`.
- Decap CMS is configured in `admin/config.yml`.
- Uploaded gallery images are stored in `assets/uploads/`.

## Deploy and enable the login

1. Push this repository to GitHub with `main` as the default branch.
2. In Netlify, choose **Add new project → Import an existing project** and select this repository.
3. Netlify will detect `netlify.toml`; no build command is required and the publish directory is `.`.
4. In Netlify, open **Integrations → Identity**, enable Netlify Identity and set registration to **Invite only**.
5. Under Identity services, enable **Git Gateway**.
6. Invite your email address from the Identity user list.
7. Open the invitation email, set your password, then visit `https://YOUR-SITE.netlify.app/admin/`.

Edits made in the admin page are committed to the GitHub repository. Netlify then republishes the changed site automatically.

## Local preview

Serve the repository through a local web server rather than opening the HTML files directly, because the menu and gallery load JSON files. Authentication and publishing only work on the deployed Netlify site after Identity and Git Gateway are enabled.
