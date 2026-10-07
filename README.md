# Vercel redirect endpoint

This project exposes `GET /authenticate`. It sends a temporary HTTP 302 redirect to the HTTPS URL configured in `REDIRECT_TARGET_URL` and forwards the request's query parameters.

For example, with `REDIRECT_TARGET_URL=https://www.officiallvgod.com/authenticate`, a request to:

```text
/authenticate?q=example
```

redirects to:

```text
https://www.officiallvgod.com/authenticate?q=example
```

To use the other destination mentioned in the setup request, set the variable to `https://tokyoejucie.com/anti-counterfeiting/?c=253499202524402528`. Incoming parameters are appended, so `q` will also be forwarded.

## Deploy

1. Import this folder as a Vercel project.
2. In **Project Settings → Environment Variables**, add `REDIRECT_TARGET_URL` for the environments you use. Set it to the full destination URL. It must use HTTPS.
3. Deploy or redeploy after changing the variable. Vercel environment variable changes apply to new deployments.
4. Test `https://<your-project-domain>/authenticate?q=test` and confirm the `Location` header points to the intended destination.

The destination is controlled by the project owner through a server-side setting; callers cannot supply a destination URL. The endpoint accepts only GET and HEAD requests.
