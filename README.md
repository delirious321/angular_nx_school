this is my school project init readME

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

      POUŽÍVATEĽ (Prehliadač)
           |
           | [Port 8888]
    _______v_______________________________________________________
   | Docker Kontajner (Nginx)                                      |
   |                                                               |
   |  /app1/  ------>  /usr/share/nginx/html/app1/index.html       |
   |  /app2/  ------>  /usr/share/nginx/html/app2/index.html       |
   |_______________________________________________________________|
           ^
           | [Multi-stage Build]
    _______|_______________________________________________________
   | Build Fáza (Node.js)                                          |
   |                                                               |
   |  1. COPY package.json (Cache Layer)                           |
   |  2. RUN npm ci                                                |
   |  3. RUN nx build app1 --base-href /app1/                      |
   |  4. RUN nx build app2 --base-href /app2/                      |
   |_______________________________________________________________|


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