# AgentCamp — Brand Guidelines
**Godínez.AI · Frutero**
Versión 1.0 · Abril 2026

Guía de branding que define lineamientos de uso visual y comunicacional del programa para asegurar coherencia, claridad y accesibilidad en todos sus puntos de contacto y materiales del curso.

Sistema de diseño basado en estudio de contraste WCAG 2.1, regla 60-30-10 y alineación con la identidad de Godínez.AI.

---

## 00 — Criterios de diseño

### Metodología aplicada

Las decisiones de color y tipografía parten de los colores del logo y sitio en producción de Godínez.AI. Se verificó **contraste WCAG 2.1 AA/AAA** para cada combinación texto/fondo, y se aplicó la **regla 60-30-10** para garantizar jerarquía visual sin saturación.

El fondo oscuro grisáceo (no negro puro) es una práctica recomendada: según WCAG y estudios de accesibilidad en modo oscuro, **el uso de fondos grisáceos reduce significativamente la fatiga visual** al disminuir el fenómeno de "halación" (halo effect) que produce el contraste extremo blanco-sobre-negro.

El fondo `#1c1c1e` es el mismo valor de iOS dark mode nativo. El target — profesionales no-técnicos, Web2, LATAM — exige un sistema legible en móvil que no se sienta como herramienta de developer. Cada color tiene un rol único y no intercambiable.

### Regla 60-30-10

| Proporción | Elemento | Descripción |
|---|---|---|
| 60% | Fondos neutros | `#1c1c1e`, `#242427`, `#2a2a2e`, `#323237` — no compiten, descansan la vista |
| 30% | Texto estructural | `#f8f8f8` títulos, `#e8e8e8` body — jerarquía clara y legible |
| 10% | Colores de acento | Rosa, amarillo, morado — rol único y no intercambiable entre sí |

### Contraste WCAG 2.1 (sobre fondo `#1c1c1e`)

| Color | Hex | Ratio | Nivel |
|---|---|---|---|
| Blanco — headlines | `#f8f8f8` | ~15:1 | AAA |
| Gris claro — body | `#e8e8e8` | ~12:1 | AAA |
| Rosa — primario | `#e91e8c` | 4.6:1 | AA |
| Amarillo — secundario | `#ffb800` | 8.1:1 | AAA |
| Morado — terciario | `#8b5cf6` | 5.1:1 | AA |

Mínimo requerido: AA (4.5:1 texto normal, 3:1 texto grande/títulos).

### Selección tipográfica

- **Plus Jakarta Sans** — humanista, alta legibilidad en mobile, amigable para usuarios no-técnicos. Uso: body copy, UI, botones, overlines.
- **Playfair Display italic** — serif elegante. Uso exclusivo: segunda línea del H1. Genera contraste tipográfico sin necesitar más colores.
- El par sans + serif crea jerarquía visual con solo dos fuentes. No se añaden fuentes adicionales al sistema.

---

## 01 — Paleta de colores

### Variables CSS

```css
/* Fondos */
--bg:        #1c1c1e;   /* Fondo principal */
--bg-alt:    #242427;   /* Fondo alternativo / secciones pares */
--surface:   #2a2a2e;   /* Cards, modales, bloques elevados */
--elevated:  #323237;   /* Hover states, tooltips */

/* Colores de acento */
--rosa:      #e91e8c;   /* Primario — CTA y acción */
--amarillo:  #ffb800;   /* Secundario — precios, stats, overlines */
--morado:    #8b5cf6;   /* Terciario — íconos de apoyo, bullets */

/* Texto */
--blanco:    #f8f8f8;   /* Headlines H1/H2/H3 únicamente */
--fore:      #e8e8e8;   /* Body copy — ratio 12:1 AAA */
--muted:     #888888;   /* Texto secundario, captions */
--border:    #38383c;   /* Bordes y divisores */

/* Tipografías */
--font-heading: 'Playfair Display', Georgia, serif;
--font-sans:    'Plus Jakarta Sans', system-ui, sans-serif;
```

### Regla de combinación por fondo

**Fondos primarios `#1c1c1e` y `#242427` — permiten todos los acentos:**
- Rosa `#e91e8c` ✓
- Morado `#8b5cf6` ✓
- Amarillo `#ffb800` ✓
- Blanco `#f8f8f8` ✓

**Fondos elevados `#2a2a2e` y `#323237` — solo amarillo y blanco:**
- Amarillo `#ffb800` ✓
- Blanco/gris claro ✓
- Rosa — NO PERMITIDO (contraste insuficiente)
- Morado — NO PERMITIDO (contraste insuficiente)

### Roles de los colores de acento

**Rosa `#e91e8c` — Primario**
- Rol único: CTA principal, segunda línea del H1, elemento de acción
- Fondos permitidos: `#1c1c1e` y `#242427` únicamente
- Nunca en: body copy, fondos de sección, bordes decorativos
- Contraste: AA 4.6:1 sobre `#1c1c1e`

**Amarillo `#ffb800` — Secundario**
- Rol único: precio, early bird, overlines, stats y datos clave
- Fondos permitidos: todos los fondos del sistema
- Nunca en: CTAs o botones de acción (confunde jerarquía)
- Contraste: AAA 8.1:1 sobre `#1c1c1e`

**Morado `#8b5cf6` — Terciario**
- Rol único: íconos de apoyo, bullets, bordes de nota informativa
- Fondos permitidos: `#1c1c1e` y `#242427` únicamente
- Nunca en: headlines, CTAs, fondos surface o elevated
- Contraste: AA 5.1:1 sobre `#1c1c1e`

---

## 02 — Sistema tipográfico

### Fuentes

```
Plus Jakarta Sans — Google Fonts
Pesos en uso: 400 (regular), 500 (medium), 600 (semibold)
Nota: nunca usar 700 (bold) ni 800 (extrabold) — en tamaños grandes se ven pesados y pierden elegancia.

Playfair Display — Google Fonts
Peso en uso: 700 italic (exclusivo para H1 segunda línea)
```

### Escala tipográfica

| Elemento | Fuente | Tamaño | Peso | Color |
|---|---|---|---|---|
| Overline / kicker | Plus Jakarta Sans | 13–14px | 600 | `#ffb800` |
| H1 — línea 1 | Plus Jakarta Sans | 48–60px | 600 | `#f8f8f8` |
| H1 — línea 2 | Playfair Display italic | 48–60px | 700 | `#e91e8c` |
| H2 — sección | Plus Jakarta Sans | 28–32px | 600 | `#f8f8f8` |
| H3 — subsección | Plus Jakarta Sans | 20–22px | 600 | `#f8f8f8` |
| Body copy | Plus Jakarta Sans | 17px mín | 400 | `#e8e8e8` |
| Stats / números | Plus Jakarta Sans | 40–52px | 600 | `#ffb800` |
| Small / caption | Plus Jakarta Sans | 13–15px | 400 | `#888888` |

### Reglas tipográficas

- `line-height`: 1.7 para body, 1.05–1.1 para H1, 1.25 para H2
- `letter-spacing`: 0.1em para overlines (uppercase), -0.01em para H1 grandes
- Body copy mínimo 17px — nunca menos en materiales digitales
- H1 siempre con la combinación Jakarta 600 (línea 1) + Playfair italic (línea 2)
- Overline amarillo siempre antes del hero headline
- Estadísticas y números: Plus Jakarta Sans 600 en `#ffb800` — nunca Playfair
- **Nunca usar extrabold (800) ni bold (700)** — en tamaños grandes se ven pesados. Semibold (600) es el peso máximo para Jakarta
- Color de texto: `#f8f8f8` para H1/H2/H3, `#e8e8e8` para body (la diferencia genera jerarquía)

---

## 03 — Botones y elementos de UI

### Jerarquía de botones

| Nivel | Estilo | Uso |
|---|---|---|
| Primario | Fondo sólido rosa `#e91e8c`, texto blanco | CTA principal — uno por sección |
| Secundario | Outline rosa, fondo `rgba(233,30,140,0.10)` | CTA alternativo o confirmación |
| Terciario | Ghost — borde `#38383c`, texto `#e8e8e8` | Acción informativa |
| Navegación | Outline morado, fondo `rgba(139,92,246,0.10)` | Links internos, exploración |

### Especificaciones de botones

```css
/* CTA principal */
background: #e91e8c;
color: #f8f8f8;
font-family: var(--font-sans);
font-weight: 600;
font-size: 17px;
padding: 14–15px 28–30px;
border-radius: 10px;
border: none;

/* CTA secundario */
background: rgba(233,30,140,0.10);
color: #e91e8c;
border: 1px solid rgba(233,30,140,0.35);
border-radius: 10px;
```

### Tags y badges

| Tipo | Uso | Color de texto | Fondo |
|---|---|---|---|
| Tag amarillo | Early Bird, urgencia, precio especial | `#ffb800` | `rgba(255,184,0,0.12)` |
| Tag rosa | Cupo limitado, exclusividad | `#e91e8c` | `rgba(233,30,140,0.12)` |
| Tag morado | Categoría, datos informativos | `#8b5cf6` | `rgba(139,92,246,0.12)` |

### Early Bird

El bloque de Early Bird es información importante — debe tener peso visual acorde:
- Ícono SVG de candado de línea (`stroke: #ffb800`, no emoji)
- Precio: 18–19px, `font-weight: 600`, color `#ffb800`
- Nota secundaria: 14–15px, color `#888888`
- Fondo: `#242427` o `#2a2a2e` con padding generoso

### Estadísticas (stats block)

- Número: Plus Jakarta Sans 600, 44–52px, `#ffb800`
- Texto descriptivo: Plus Jakarta Sans 500, 15–16px, `#e8e8e8`
- Centrado horizontal y vertical en su contenedor
- Contenedores: cards con `background: #2a2a2e`, `border: 1px solid #38383c`, `border-radius: 12px`
- Sin recuadros en la versión de landing si se muestran en grid de 4 columnas

---

## 04 — Íconos

- Usar siempre íconos SVG de línea (stroke, no fill)
- `stroke-width: 1.8–2px`
- `stroke-linecap: round`, `stroke-linejoin: round`
- Color según el elemento que acompañen (amarillo para Early Bird, muted para neutros)
- **Nunca emojis** en materiales oficiales del programa

---

## 05 — Reglas de uso

### Siempre

- Rosa = acción. Un solo CTA rosa por sección
- Amarillo = dato importante, precio, urgencia, stats
- Morado = soporte visual, nunca protagonista
- H1: Jakarta 600 línea 1 + Playfair italic línea 2 en rosa
- Headlines siempre semibold (600), nunca bold ni extrabold
- Botones: font-size 17px consistente en todos los CTAs principales
- Overline amarillo antes del hero headline
- Body copy: 17px mínimo, `#e8e8e8`, line-height 1.7
- Headlines: `#f8f8f8` para diferencia de jerarquía respecto al body
- Íconos SVG de línea, no emojis
- Early Bird: texto 18px+ prominente con ícono SVG candado
- Logo Frutero en todo material externo

### Nunca

- Rosa o morado sobre fondos `#2a2a2e` o `#323237`
- Amarillo como botón de acción o CTA
- Morado como color principal de un headline
- Texto rosa en body copy o párrafos largos
- Playfair Display para estadísticas o números
- Cambiar el orden del H1 (siempre Jakarta primero, Playfair italic segundo)
- Los 3 colores de acento en un mismo componente
- Fondos blancos o claros en materiales digitales del curso
- Emojis en ningún material oficial
- Early Bird como nota pequeña o texto secundario
- `font-weight: 700` (bold) o `800` (extrabold) en Plus Jakarta Sans — el peso máximo es 600 (semibold)
- Tamaños de fuente inconsistentes entre botones CTA del mismo nivel

---

*AgentCamp · Godínez.AI · Frutero · Brand Guidelines v1.0 · Abril 2026*
*Para uso interno del equipo y como contexto para agentes e IAs en producción.*
