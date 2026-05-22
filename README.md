A full-stack Angular Nx school project where I progressively built a monorepo from scratch — setting up the Nx workspace, creating shared UI libraries with reusable components (cards, navigation bar), connecting an Angular frontend to a FastAPI backend via signals, containerizing both with Docker, learning Tailwind CSS, and now working toward a product detail page with routing.

## Project Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Nx Monorepo                                  │
│                    angular_nx_school/                               │
│                                                                     │
│  ┌──────────────────────────┐   ┌───────────────────────────────┐  │
│  │        apps/             │   │          libs/                │  │
│  │                          │   │                               │  │
│  │  ┌────────────────────┐  │   │  ┌─────────────────────────┐ │  │
│  │  │       app1         │  │   │  │       shared-ui          │ │  │
│  │  │   (Angular SPA)    │  │   │  │                         │ │  │
│  │  │                    │  │   │  │  komponenty/            │ │  │
│  │  │  Routes:           │  │   │  │  ├── horna_lista        │ │  │
│  │  │  /         → Shop  │──┼───┼──│  ├── karta              │ │  │
│  │  │  /profil   → Profil│  │   │  │  ├── shop               │ │  │
│  │  │  /produkt  → Detail│  │   │  │  ├── produkt_detail     │ │  │
│  │  │                    │  │   │  │  ├── profil              │ │  │
│  │  │  Tailwind CSS      │  │   │  │  └── login              │ │  │
│  │  │  PrimeNG + Aura    │  │   │  │                         │ │  │
│  │  └────────────────────┘  │   │  │  Interfaces:            │ │  │
│  │                          │   │  │  ├── Produkt             │ │  │
│  │  ┌────────────────────┐  │   │  │  └── Pouzivatel          │ │  │
│  │  │       app2         │  │   │  └─────────────────────────┘ │  │
│  │  │   (Angular SPA)    │  │   └───────────────────────────────┘  │
│  │  └────────────────────┘  │                                      │
│  │                          │                                      │
│  │  ┌────────────────────┐  │                                      │
│  │  │       api          │  │                                      │
│  │  │  (Python FastAPI)  │  │                                      │
│  │  │                    │  │                                      │
│  │  │  main.py           │  │                                      │
│  │  │  data/             │  │                                      │
│  │  │  ├── obchod.json   │  │                                      │
│  │  │  └── pouzivatelia  │  │                                      │
│  │  │      .json         │  │                                      │
│  │  └────────────────────┘  │                                      │
│  └──────────────────────────┘                                      │
└─────────────────────────────────────────────────────────────────────┘

                         HTTP (signals)
        app1  ◄──────────────────────────────►  api
              GET /products   GET /user


┌─────────────────────────────────────────────────────────────────────┐
│                        Docker Compose                               │
│                                                                     │
│   ┌──────────────────────┐       ┌──────────────────────────────┐  │
│   │  Frontend Container  │       │     Backend Container        │  │
│   │  Nginx :8888         │       │     FastAPI :8000            │  │
│   │                      │       │                              │  │
│   │  /app1/  → app1/     │       │  /docs  → Swagger UI         │  │
│   │  /app2/  → app2/     │       │  /api/* → endpoints          │  │
│   └──────────────────────┘       └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Goal & Reflection

My goal was to build an Nx monorepo with Angular and genuinely learn how the framework works. Along the way I had to overcome real problems — switching the backend from a conventional language to Python FastAPI, getting the Nx monorepo structure to behave correctly, finding my way around the file layout, managing TypeScript code, understanding how to inject and manipulate components, and wiring up HTTP calls on both ends. One particularly frustrating one was Tailwind — I spent a lot of time debugging it before finding out that the Angular builder in my repo didn't support Tailwind v4, so I had to downgrade to v3 to get it working. I worked through all of it. I feel like I've got a solid grasp of Angular now, and the bigger long-term goal is to be able to build apps efficiently from this foundation going forward.

### Denník práce (SK)

| Deň   | Hodiny      | Efektivita | Čo sa robilo                                                              |
|-------|-------------|------------|---------------------------------------------------------------------------|
| 05/11 | —           | 20%        | Zorientoval som sa v projekte cez NxWelcome demo.                         |
| 05/12 | —           | 25%        | Pokračoval som v spoznávaní toho, ako Angular a Nx fungujú spolu.         |
| 05/13 | 12:28–14:09 | 95%        | Postavil som celý základ — repo, workspace, aplikácie, zdieľaná knižnica. |
| 05/14 | 09:00–15:21 | 55%        | Upratаl som štruktúru monorepa a rozbehol obe aplikácie.                  |
| 05/15 | 09:21–12:21 | 85%        | Prvé reálne funkcie — karta produktu, horná lišta, signál z backendu.    |
| 05/18 | 13:48       | 70%        | Rozbehol som celú vec v Dockeri.                                          |
| 05/19 | 13:37       | 40%        | Bojoval som s Tailwindom, väčšinou prieskum a orientácia.                 |
| 05/20 | —           | 35%        | Študoval som ako Tailwind funguje a skúšal som ho implementovať.          |
| 05/21 | 11:43–13:51 | 75%        | Shop grid funguje, pridané routovanie na detail produktu a profil.        |

---

## What's Next — If You Were to Continue This

| Priority | Area | Problem | What to Do |
|----------|------|---------|------------|
| High | Auth | Login component exists but isn't wired to anything — no route, no auth logic, both fields share one `value` variable | Add `/login` route, wire form to a real auth service, separate username/password bindings |
| High | Product Detail | Detail page reads product from router navigation state — breaks on page refresh | Fetch product by `id` from the API on component init instead of relying on state |
| High | Backend Security | `allow_origins=['*']` in CORS — completely open | Restrict to known frontend origins only |
| High | Database | JSON files used as a database | Replace with a real DB (SQLite to start, then PostgreSQL) using SQLAlchemy |
| Medium | Profil Page | Just renders `<p>profil works!</p>` | Build it out — show user info pulled from `PouzivatelService` |
| Medium | Cart | "Do košíka" button exists but does nothing | Implement a cart service with Angular signals to track items |
| Medium | app2 | Completely empty and unused | Either give it a purpose or remove it |
| Medium | Error Handling | No error handling on HTTP calls in either frontend or backend | Add error states to services, show user-facing feedback on failures |
| Low | Tests | Spec files exist for every component but are likely just the generated default | Write real unit tests covering component inputs and service calls |
| Low | Environment Config | API URL is likely hardcoded | Move to Angular environment files (`environment.ts` / `environment.prod.ts`) |

---

## Issues Faced

| Issue | Time Lost | Root Cause | Resolution |
|-------|-----------|------------|------------|
| Angular beginner orientation | High | No prior Angular experience — getting lost in the framework's concepts, file structure, and conventions from the start | Spent 05/11–05/12 purely researching and navigating the codebase until things started clicking |
| Tailwind not working | High | Installed Tailwind v4 which Angular's builder doesn't support yet | Downgraded to v3, added dummy `tailwind.config.js` to trigger Angular's detector |
| Nx monorepo structure | Medium | `app1-e2e` placed in root instead of `apps/` causing config conflicts | Migrated to correct structure, fixed all relative paths, reset Nx cache |
| File/code orientation | Medium | Unfamiliar with Angular's file layout, module system, and TypeScript patterns | Hands-on exploration through NxWelcome demo and reading generated code |
| Backend language choice | Low | Initial backend stack not suitable for future AI integration goals | Switched to Python FastAPI — better ecosystem fit for ML/AI work |

---

## Work Log

### Effectivity Method

Effectivity is scored as a percentage based on three factors: **commits per active hour** (output density), **complexity of what was shipped** (setup, migrations, and integrations score higher than exploration), and **whether concrete working code landed** (research-only days are capped low regardless of time spent). The three factors are weighted and normalized to a 0–100% scale per day.

| Day   | Hours       | Effectivity | Shipped                                                              |
|-------|-------------|-------------|----------------------------------------------------------------------|
| 05/11 | —           | 20%         | Got familiar with the project by poking around the NxWelcome demo.  |
| 05/12 | —           | 25%         | Continued figuring out how Angular and Nx fit together.              |
| 05/13 | 12:28–14:09 | 95%         | Built the whole foundation — repo, workspace, apps, shared lib.      |
| 05/14 | 09:00–15:21 | 55%         | Cleaned up the monorepo structure and got both apps running.         |
| 05/15 | 09:21–12:21 | 85%         | First real features — product card, top bar, backend signal working. |
| 05/18 | 13:48       | 70%         | Got the whole thing running in Docker.                               |
| 05/19 | 13:37       | 40%         | Fought with Tailwind, mostly exploring and getting oriented.         |
| 05/20 | —           | 35%         | Studied how Tailwind works and tried to implement it.                |
| 05/21 | 11:43–13:51 | 75%         | Shop grid working, routing to product detail and profile added.      |

---

komandy na generovanie:
npx nx g @nx/angular:app app2 --directory=app2 --standalone

# Architectural Decision Record

## Title: Exploring Nx Workspace Projects

## Status: Accepted

## Context
Today, I explored the Nx workspace to understand the available projects.

## Decision
Ran \`npx nx show projects\` to list the projects: shared-ui, app1-e2e, app1.

## Consequences
Gained awareness of the project structure in the angular_nx_school workspace." > adr_today.md



## 14.5
ADR 0001: Reštrukturalizácia Monorepa a Voľba Backend Stacku

* **Status:** Schválené (Approved)
* **Dátum:** 2026-05-14
* **Autor:** Kubo
* **Kontext:** Architektúra projektu `kubova-apka`

---

1. Kontext (Context)
Pôvodná štruktúra projektu bola v nekonzistentnom stave. E2E testovacia aplikácia (`app1-e2e`) sa nachádzala priamo v roote projektu, čo spôsobovalo konflikty v konfigurácii Nx grafu, TypeScriptu a lintovania, keďže Nx Playwright plugin očakával štandardné umiestnenie v priečinku pre aplikácie.

Zároveň bolo potrebné určiť technologický stack pre backendovú časť (API), ktorá bude obsluhovať Angular frontend (`app1`). Keďže prioritou do budúcna je integrácia umelej inteligencie (AI), spracovanie dát a strojové učenie, backend musel byť zvolený s ohľadom na tento cieľ.

---

2. Rozhodnutia (Decisions)

Rozhodnutie A: Migrácia na striktnú Nx Monorepo štruktúru
Presunuli sme aplikáciu `app1-e2e` z rootu do dedikovaného priečinka `apps/app1-e2e`. V dôsledku toho sme upravili všetky relatívne cesty na koreňové konfigurácie o jednu úroveň hlbšie (`../` zmenené na `../../`).

* **`apps/app1-e2e/project.json`**: Upravená schéma na `../../node_modules/nx/schemas/project-schema.json`. `targets` boli dočasne vyčistené pre elimináciu chýb.
* **`apps/app1-e2e/tsconfig.json`**: Upravené dedenie na `"extends": "../../tsconfig.base.json"` a výstupný adresár na `"outDir": "../../dist/out-tsc"`.
* **Priečinok `dist/`**: Bol striktne definovaný ako automaticky generovaný výstup (build artifact) a zakázalo sa manuálne presúvanie skompilovaných súborov do priečinka `apps/`.
* **Korekcia `nx.json`**: Koreňová konfigurácia bola ponechaná s relatívnou cestou `./node_modules/...`, keďže sa nachádza priamo v roote.

### Rozhodnutie B: Voľba Python (FastAPI) pre Backend API
Pre vývoj aplikačného rozhrania bol zvolený **Python** s asynchrónnym frameworkom **FastAPI** namiesto Node.js. Aplikácia bude izolovaná v `apps/api` pomocou lokálneho virtuálneho prostredia (`.venv`) a závislosti budú spravované cez `requirements.txt`.

---

## 3. Odôvodnenie (Justification)

1. **Oprava Nx Grafu:** Presunom E2E aplikácie do `apps/` a resetovaním cache (`npx nx reset`) sa úspešne rozbehol `npx nx graph` na zeleno. Nx teraz správne mapuje závislosti.
2. **AI a Data Science pripravenosť:** Python disponuje najsilnejším ekosystémom pre umelú inteligenciu (PyTorch, TensorFlow, Hugging Face). Keďže autor študuje AI, integrácia modelov bude natívna bez nutnosti prepájania rôznych jazykov cez sub-procesy.
3. **Výkon bez kompromisov:** FastAPI využíva asynchrónne programovanie (`async/await`), vďaka čomu dosahuje rýchlosť porovnateľnú s Node.js (Express/NestJS) a bez problémov obslúži tisíce požiadaviek za sekundu pri I/O operáciách (databáza, sieť).
4. **Typová bezpečnosť na oboch stranách:** FastAPI natívne využíva knižnicu Pydantic pre validáciu dát, čo perfektne ladí so striktne typovaným Angular frontendom (TypeScript).

---

## 4. Dôsledky (Consequences)

* **Pozitívne:**
    * Čistá, predvídateľná a škálovateľná architektúra monorepa.
    * Rýchly feedback loop pri vývoji backendu vďaka automatickej Swagger dokumentácii na `http://localhost:8000/docs`.
    * Pripravené prostredie pre bezproblémovú kontajnerizáciu (Docker) oboch aplikácií v ďalšom kroku.
* **Negatívne/Výzvy:**
    * Monorepo kombinuje dva odlišné svety ekosystémov (NPM pre JS/TS a PIP pre Python). Správa balíkov pre API sa musí robiť výhradne vnútri aktivovaného `.venv` v priečinku `apps/api`.

---

## 5. Nasledujúce kroky (Next Steps)
1. Spustiť overovací build frontendu (`npx nx serve app1`).
2. Úspešne aktivovať `.venv` v Git Bash/PowerShell a overiť lokálny beh FastAPI servera cez `uvicorn main:app --reload`.
3. Prepojiť Angular `ApiService` na lokálny endpoint `http://localhost:8000/api/items`.
4. Implementovať Docker a Docker Compose pre orchestráciu oboch služieb.


================================================================================
          ADR Dockerizácia Angular Nx Monorepa s Nginx Proxy
================================================================================

STAV: V procese implementácie
AUTOR: Jakub & Gemini
DÁTUM: 15. Máj 2026

1. KONTEXT (Problém)
--------------------
Potrebujeme nasadiť dve Angular aplikácie (app1, app2) z Nx monorepa do jedného
Docker kontajnera pomocou Nginxu. Aplikácie musia byť dostupné na:
- http://localhost:8888/app1/
- http://localhost:8888/app2/

Výzvou bolo rozdielne nastavenie "outputPath" v project.json a potreba 
rýchleho buildu bez neustáleho 'npm install'.

2. ARCHITEKTÚRA (ASCII Diagram)
-------------------------------

```
        POUŽÍVATEĽ (Prehliadač)
               |
               | [Port 8888]
               v
  ┌────────────────────────────────────────────┐
  │         Docker Kontajner (Nginx)           │
  │                                            │
  │  /app1/  ──►  /usr/share/nginx/html/app1/  │
  │  /app2/  ──►  /usr/share/nginx/html/app2/  │
  └────────────────────────────────────────────┘
               ^
               │  [Multi-stage Build]
  ┌────────────────────────────────────────────┐
  │           Build Fáza (Node.js)             │
  │                                            │
  │  1. COPY package.json   (Cache Layer)      │
  │  2. RUN npm ci                             │
  │  3. RUN nx build app1 --base-href /app1/   │
  │  4. RUN nx build app2 --base-href /app2/   │
  └────────────────────────────────────────────┘
```


3. ROZHODNUTIA
--------------

A. Multi-stage Build: 
   Rozdelili sme Dockerfile na 'builder' (kde sa kompiluje kód) a finálny 
   obraz (iba ľahký Nginx so statickými súbormi). Tým sme zmenšili výsledný obraz.

B. Base-Href Smerovanie:
   Aplikácie buildíme s príznakom `--base-href /appX/`. Toto opravuje "bielu 
   stránku", pretože Angular vie, že má hľadať skripty v podpriečinku.

C. Nginx Aliasy:
   V nginx.conf používame `alias` namiesto `root`, aby cesty v URL presne
   sedeli s fyzickými priečinkami v kontajneri.

D. Optimalizácia Cache:
   Najprv kopírujeme package.json a inštalujeme závislosti. Až potom zvyšok kódu.
   Vďaka tomu zmena HTML nespúšťa 7-minútový npm install.

4. DÔSLEDKY
-----------
- (+) Rýchly vývoj (build po zmene kódu trvá sekundy).
- (+) Obe aplikácie bežia pod jedným portom.
- (-) Nutnosť manuálne pridávať lomku "/" na koniec URL (localhost:8888/app1/).
- (-) Každá nová appka vyžaduje úpravu v nginx.conf a Dockerfile.

================================================================================


21.5.26 /
Fixed Tailwind v3 + Angular 21 in Nx monorepo — needed dummy tailwind.config.js to trigger Angular's detector, then downgraded from v4 to v3 since Angular's builder doesn't support v4 yet
PrimeNG with Aura theme + CSS layers configured
Shared UI library (libs/shared-ui)

lib-karta — product card component with karta_info = input.required<Produkt>(), shows name, category, rating stars, stock tag, price, add to cart button. Navigates to /produkt on click passing product data via router state
lib-horna-lista — top navbar with PrimeNG menubar, search input, user avatar, welcome message pulling from PouzivatelService
App1

app-shop — grid layout grid-cols-2 md:grid-cols-4 iterating through products with @for
app-produkt-detail — detail page reading product from router navigation state, shows image placeholder, name, category, rating, description, price, stock, add to cart button
app-profil — empty for now, route /profil linked from avatar
Services

PouzivatelService — holds pouzivatelZbackend writable signal with user data from HTTP
ShopGridService — fetches product grid from backend HTTP
Interfaces

Produkt — id, meno_produktu, oddiel_produktu, hodnotenie, na_sklade, cena, popis
Pouzivatel — user data with meno
