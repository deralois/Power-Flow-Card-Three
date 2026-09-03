# Power Flow Card Three

Ein Fork von [flixlix/power-flow-card-plus](https://github.com/flixlix/power-flow-card-plus)
(Quelle aktuell im Monorepo [flixlix/flixlix-cards](https://github.com/flixlix/flixlix-cards)),
einer Lovelace-Karte für Home Assistant, die den Energiefluss zwischen Netz, Haus,
Solaranlage und Batterie visualisiert.

## Ziel dieses Forks

Das Original unterstützt jeweils **eine** PV-Anlage und **eine** Batterie. Dieser Fork
erweitert die Karte um eine **zweite PV-Anlage** und eine **zweite Batterie**, sodass
z. B. getrennte Wechselrichter oder Speichersysteme gleichzeitig dargestellt werden können.

## Installation

Die Karte registriert sich unter dem Custom-Element `power-flow-card-three` und dem
Kartentyp `custom:power-flow-card-three`, damit sie parallel zum Original
`power-flow-card-plus` installiert werden kann, ohne zu kollidieren.

### Über HACS (benutzerdefiniertes Repository)

Dieses Repo ist nicht im offiziellen HACS-Store gelistet, kann aber als
benutzerdefiniertes Repository hinzugefügt werden:

1. HACS öffnen → Menü (⋮) oben rechts → **Benutzerdefinierte Repositories**
2. URL `https://github.com/deralois/Power-Flow-Card-Three` eintragen,
   Kategorie **Dashboard**
3. Karte installieren, HA neu laden
4. Karte mit `type: custom:power-flow-card-three` in einem Dashboard verwenden

Der Build unter `dist/power-flow-card-three.js` im Repo-Root wird bei jedem Push
auf `master` automatisch über GitHub Actions aktualisiert
(`.github/workflows/build-and-publish.yml`) — HACS findet ihn dort ohne
zusätzliche Releases.

Wichtig: HACS-Repos müssen **öffentlich** sein — dieses Repo ist es (siehe Abschnitt
„Lizenz und Attribution" unten für die rechtlichen Implikationen davon).

### Manuell

1. `dist/power-flow-card-three.js` nach `<HA-Konfig>/www/power-flow-card-three.js`
   kopieren
2. Einstellungen → Dashboards → Ressourcen → Ressource hinzufügen:
   URL `/local/power-flow-card-three.js`, Typ „JavaScript-Modul"
3. Karte mit `type: custom:power-flow-card-three` verwenden

## Konfiguration: zweite PV-Anlage und zweite Batterie

Zusätzlich zu den bestehenden `entities.solar` und `entities.battery` (unverändert,
bestehende Configs funktionieren ohne Anpassung weiter) gibt es jetzt optional
`entities.solar2` und `entities.battery2` mit demselben Feld-Set:

```yaml
type: custom:power-flow-card-three
entities:
  grid:
    entity: sensor.netz_leistung
  solar:
    entity: sensor.pv1_leistung
  solar2:
    entity: sensor.pv2_leistung
  battery:
    entity: sensor.batterie1_leistung
    state_of_charge: sensor.batterie1_ladezustand
  battery2:
    entity: sensor.batterie2_leistung
    state_of_charge: sensor.batterie2_ladezustand
```

Im UI-Editor erscheinen „Solar 2" und „Batterie 2" als eigene Unterseiten, sobald
das Repo aktualisiert ist — keine Migration nötig, die Felder sind rein additiv.

Beide zusätzlichen Quellen bekommen ein eigenes Icon mit eigenem Ladezustand/eigener
Leistungsanzeige (direkt vom jeweiligen Sensor, keine Näherung). Für die Fluss-Pfeile
zu Haus und Netz gilt: Da elektrisch nicht unterscheidbar ist, welche der beiden
PV-Anlagen bzw. Batterien welchen Verbraucher konkret speist, werden die kombinierten
Gesamtwerte proportional nach Erzeugungs- bzw. Entladeanteil auf die beiden Pfeile
aufgeteilt — die Summe stimmt immer, die Aufteilung ist eine plausible Näherung. Der
Ladefluss **zur** Batterie bleibt ein einzelner, gemeinsamer Pfeil (keine Unterscheidung,
welche PV-Anlage welche Batterie lädt).

## Struktur

Dieses Repository ist ein schlankes pnpm-Workspace, das nur die für
`power-flow-card-plus` benötigten Teile aus dem `flixlix-cards`-Monorepo enthält:

```
packages/
  flixlix-cards/
    power-flow-card-plus/   Kartencode (Paketname jetzt: power-flow-card-three)
  shared/                   @flixlix-cards/shared – gemeinsame Komponenten, i18n, Helfer
  tooling/
    bundler/                Rollup-Konfiguration (@flixlix-cards/bundler)
    typescript-config/      Gemeinsame tsconfig-Basis
```

Turborepo, die Web-App, ungenutzte Karten sowie CI-Workflows des Originals wurden
nicht übernommen.

## Entwicklung

```
pnpm install
pnpm --filter power-flow-card-three build
```

Das Ergebnis liegt danach in
`packages/flixlix-cards/power-flow-card-plus/dist/power-flow-card-three.js`.

## Lizenz und Attribution

Der Originalcode stammt von [flixlix](https://github.com/flixlix). Im Upstream-Repository
ist **keine explizite LICENSE-Datei** vorhanden — das ist beim Weiterverwenden/Veröffentlichen
zu beachten und ggf. mit dem Original-Autor zu klären, bevor dieser Fork öffentlich
vertrieben wird (z. B. über HACS).
