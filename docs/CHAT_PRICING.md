# Pricing and Nira chat prototype

## Scope
Public page: four illustrative home tiers, two fixed-price business tiers, and Business Custom for schools, offices and multi-location needs. Public and Client pages include a typeable Nira AI demo widget. No model, external chat SDK, API request or server-side chat processing is used. Conversations are temporary React state and responses are predefined locally.

Package values in src/plans.js are the shared source for cards and chat replies. All prices and advertised features are fictional design examples, not approved Nirwana offers. Cards label prices as illustrative and exclude tax/installation.

## References consulted
- MyRepublic package presentation: https://www.myrepublic.co.id/
- Biznet product tiers: https://www.biznetnetworks.com/wp-content/uploads/2026/01/Biznet%20Home%20Product%20-%2023%20Apr%202026.pdf
- Contextual Messenger and quick actions: https://www.intercom.com/help/en/articles/6612588-messenger-explained

## Verification
- Automated tests cover shared pricing replies, custom school/business offers, selected home package replies, Client guidance/report action and unknown-message fallback.
- Browser checks: category switching; card opens prefilled draft; typed send and Enter; local reply and follow-up action; Client report route; Escape close; public/Client conversation reset; light/dark styles; mobile at 390px with no page horizontal overflow.
- Screenshots in docs/previews are local review evidence. Existing Figma screens were not changed in this update.
