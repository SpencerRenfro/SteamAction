function SEO({ title, description, keywords }) {
  const baseTitle = "SteamAction Cleaning Services";
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/SteamAction_Logo.png?v=2" />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />
    </>
  );
}

export default SEO;


