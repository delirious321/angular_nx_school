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