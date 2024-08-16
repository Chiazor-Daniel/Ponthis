import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {
  let theme = "light";

  useEffect(() => {
    // Retrieve theme preference from localStorage, default to "light"
    const storedTheme = localStorage.getItem("theme") || "light";
    theme = storedTheme;
    // Set theme attribute on HTML element
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, []);

  return (
    <Html lang="en" data-bs-theme={theme}>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Telugu:wght@100;200;300;400;500;600;700;800&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/logo2.png" type="image/png" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
