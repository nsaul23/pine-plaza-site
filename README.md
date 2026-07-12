# Pine Plaza Website V3

Upload these files to the root of your GitHub repository.

Editable JSON files:
- data/site-content.json
- data/tenants.json
- data/parking.json
- data/events.json

Allowed tenant categories:
- Dining
- Health & Wellness
- Professional Services
- Entertainment
- Community & Nonprofit

Common edits:
- Core positioning: data/site-content.json
- Tenant directory: data/tenants.json
- Parking form/payment links: data/parking.json
- Events and banquet cards: data/events.json
- Hero image: styles.css, CTRL+F: HERO IMAGE


Checked updates included:
- Tenant category values were normalized so Health & Wellness filters correctly (6 entries updated).
- Google Maps link is generated from data/site-content.json address instead of hard-coded 170 Broad Avenue.
- Tenant phone and website fields now display on tenant cards when provided.
