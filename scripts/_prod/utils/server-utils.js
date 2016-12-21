export function createPage(html, initialState) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Modernise Recruitment | Fatskill</title>  
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
      <link rel="icon" type="image/png" href="/assets/favicon-32x32.png" sizes="32x32">
      <link rel="icon" type="image/png" href="/assets/favicon-16x16.png" sizes="16x16">
      <link rel="manifest" href="/assets/manifest.json">
      <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#5bbad5">
      <link rel="shortcut icon" href="favicon.ico">
      <meta name="msapplication-config" content="/assets/browserconfig.xml">
      <meta name="theme-color" content="#ffffff">
    </head>
    <body>
      <div id="root">${html}</div>
      <script src="/main.js"></script>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
    </body>
  </html>
  `
}