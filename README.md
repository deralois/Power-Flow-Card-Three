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
