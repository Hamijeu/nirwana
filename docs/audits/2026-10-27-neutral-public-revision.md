# Public visual corrections

Checkpoint #020 precedes this batch. Local changes only.

The dark-mode solid header used an image filter on every descendant image, turning the preview photograph into a white rectangle. The filter now targets only the brand logo. A browser regression reproduced the incorrect filter before the fix and passed afterwards.

The coverage frame hides its empty result until a location is selected, uses natural result height instead of reserving space for its longest message, and aligns the card to the top. Provider attribution remains accessible from a compact information disclosure. Pin selection, geolocation and district-only WhatsApp drafts remain functional. The original beta assets were not modified.

Public calls to action use white backgrounds and dark text with subtle borders. The closing customer panel uses gray, with a second adjacent soft panel and matching dark-mode variants.

All application routes except the beta receive a short opacity entry transition without transforms that would disturb fixed headers. Route navigation resets scroll immediately, while same-page links retain smooth scrolling. Reduced motion disables route animations.

Validation: 55 Node tests; production build; browser checks for dark/light image rendering, neutral action colors, compact map and attribution disclosure, location selection, mobile 320/390, About navigation/forms/reduced motion, and header scrolling. Map tiles were also visually checked after loading. Beta reference and package data matched checkpoint #020 byte for byte (36 files).
