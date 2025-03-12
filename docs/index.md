---
layout: home
hero:
  name: TS to JSON Schema
  text: Convert TypeScript types to JSON Schema
  tagline: Choose your language / Escolha seu idioma / Elija su idioma
  actions:
    - theme: brand
      text: English
      link: /en/
    - theme: alt
      text: Português (Brasil)
      link: /pt-BR/
    - theme: alt
      text: Español
      link: /es/
---

<script>
// Redirect to the user's preferred language only in browser environment
if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  const userLang = navigator.language || navigator.userLanguage;
  const supportedLangs = {
    'en': '/ts-to-json-schema/en/',
    'pt-BR': '/ts-to-json-schema/pt-BR/',
    'es': '/ts-to-json-schema/es/'
  };

  if (userLang.startsWith('pt')) {
    window.location.href = supportedLangs['pt-BR'];
  } else if (userLang.startsWith('es')) {
    window.location.href = supportedLangs['es'];
  } else {
    window.location.href = supportedLangs['en'];
  }
}
</script> 