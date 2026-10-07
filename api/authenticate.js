const DEFAULT_STATUS = 302;

module.exports = (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).send("Method not allowed");
  }

  const targetSetting = process.env.REDIRECT_TARGET_URL;
  if (!targetSetting) {
    return res.status(500).send("REDIRECT_TARGET_URL is not configured");
  }

  let target;
  try {
    target = new URL(targetSetting);
  } catch {
    return res.status(500).send("REDIRECT_TARGET_URL must be a valid absolute URL");
  }

  if (target.protocol !== "https:" || target.username || target.password) {
    return res.status(500).send("REDIRECT_TARGET_URL must be an HTTPS URL without credentials");
  }

  // Forward incoming parameters (including q) while preserving parameters
  // already configured on REDIRECT_TARGET_URL.
  const incoming = new URL(req.url, "https://vercel.invalid").searchParams;
  for (const [key, value] of incoming) {
    target.searchParams.append(key, value);
  }

  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Referrer-Policy", "no-referrer");
  return res.redirect(DEFAULT_STATUS, target.toString());
};
