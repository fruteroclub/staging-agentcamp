# AgentCamp 2026 — Curriculum (v2.0)

**Final document.** English for internal use. Session names, landing-page copy, and public-facing language in Spanish.

**Revision note (v2.0):** This version replaces v1.0's tiered graduation bar with a single bar for all participants. Identity, payments, and reputation are treated as plug-and-play infrastructure provided by Godínez.AI Studio, not as advanced topics to master. Week 6 removed. Assumes all infrastructure is production-ready by program start.

---

## 0. Executive Summary

**What AgentCamp 2026 is:** a 5-week practical cohort program that teaches participants to build, integrate, and operate AI agents inside Godínez.AI Studio on the OpenClaw runtime, with production-grade infrastructure (identity, payments, reputation) available as plug-and-play services from Week 3 onward.

**Structure:** 5 weeks, 2 sessions per week, 1 portfolio-grade deliverable per week, culminating in Demo Day.

**One graduation bar. Everyone clears it.** Every graduate walks away with an agent that has its own identity, workflows that can transact, and a verifiable track record. This works because Studio provides the infrastructure — participants activate capabilities the way they connect Gmail, not the way they deploy smart contracts.

**The contract between curriculum and product:**

| Capability | What the participant does | What Studio handles |
|---|---|---|
| **Identity** | Activates agent identity in Studio | Wallet provisioning, key management, persistence |
| **Payments** | Defines pricing/payment rules in workflows | x402 protocol, fiat rails, settlement, spend controls |
| **Reputation** | Reviews agent track record before Demo Day | ERC-8004 signals, activity logging, verification, display |

If activating any of these requires a terminal, key management, or protocol-level knowledge from the participant, the curriculum breaks. This is the non-negotiable product contract.

**Sponsor fit is preserved and distributed:** Privy/CDP/Alchemy/PerkOS in Week 3 (identity), Stripe/x402/Base/Monad in Week 4 (payments), Ethereum Foundation/ERC-8004 in Week 5 (reputation). Each sponsor's primitive is taught as core content for every participant — not as an advanced track.

---

## 1. Curriculum structure

### Sequencing

| Week | Theme | Sessions | What everyone walks away with |
|---|---|---|---|
| 1 | **Fundamentos: del prompt al primer agente** | 2 | Agente personal activo resolviendo una tarea real |
| 2 | **Arquitectura de Agentes con OpenClaw** | 2 | Agente con bootstrap, memoria y ≥2 skills funcionales |
| 3 | **Integraciones, herramientas e identidad** | 2 | Agente conectado a herramientas reales con identidad propia activa |
| 4 | **Workflows y economía de agentes** | 2 | Workflow multi-paso con capa económica funcional |
| 5 | **Iteración, reputación y Demo Day** | 2 | Capstone con demo, métricas y track record verificable |

### Session names (Spanish)

**Semana 1 — Fundamentos: del prompt al primer agente**
- S1: *Tu primer agente en 90 minutos*
- S2: *Prompting, contexto y el arte de dar instrucciones*

**Semana 2 — Arquitectura de Agentes con OpenClaw**
- S1: *Anatomía de un agente: bootstrap, contexto y memoria*
- S2: *Skills: cómo tu agente aprende a hacer cosas*

**Semana 3 — Integraciones, herramientas e identidad**
- S1: *Conectando tu agente al mundo: tools, APIs e identidad*
- S2: *Workspaces, proyectos e identidad persistente del agente*

**Semana 4 — Workflows y economía de agentes**
- S1: *Workflows que resuelven problemas reales*
- S2: *Workflows económicos: pagos, pricing y agentes que transaccionan*

**Semana 5 — Iteración, reputación y Demo Day**
- S1: *Iteración, evals y el track record de tu agente*
- S2: *Demo Day: presentación de capstones*

### Sequencing rationale

1. **Activation before abstraction.** Week 1 Session 1 produces a working agent in 90 minutes. Motivation compounds; lectures discount it.
2. **Conceptual model second.** Once participants have touched an agent, the architecture (bootstrap, skills, memory) becomes answers to questions they now have.
3. **Integrations + identity together.** An agent connecting to Gmail and an agent getting its own identity are the same class of problem: "how does my agent exist and act in the real world?" Both are one-click activations in Studio.
4. **Reputation starts silently at Week 3.** The moment the agent has identity and begins doing real work, the infrastructure records it. By Week 5, there's a track record to review — not a protocol to learn.
5. **Workflows + payments together.** A workflow that can pay for things and get paid is production-grade. Payments are defined declaratively in workflows; the protocol layer is handled by Studio.
6. **Capstone + Demo Day as the climax.** The track record accumulated over three weeks becomes the evidence presented publicly.

---

## 2. Session-by-session design

### Semana 1 — Fundamentos: del prompt al primer agente

#### S1.1 — *Tu primer agente en 90 minutos*
- **Purpose:** Create the activation moment. Participant ends the session with a real agent answering real questions about their real work.
- **Key concepts:** Qué es un agente vs. un chatbot, el modelo mental de Studio, cómo provisionar un agente.
- **Activity:** Onboarding guiado en Godínez.AI Studio, configuración del primer agente personal, primera conversación con contexto cargado.
- **Artifact:** Agente personal activo en Studio con un caso de uso declarado.
- **Homework:** Usar el agente al menos 3 veces en la semana en tareas reales; documentar qué funcionó y qué no.

#### S1.2 — *Prompting, contexto y el arte de dar instrucciones*
- **Purpose:** Teach prompting as the foundational operating skill.
- **Key concepts:** Estructura de prompts efectivos, contexto dinámico vs. estático, instrucciones de sistema, role prompting, few-shot, failure modes.
- **Activity:** Refactor del prompt base de su agente personal usando técnicas enseñadas. A/B test de dos versiones.
- **Artifact:** Prompt system mejorado + documento corto comparando versiones.
- **Homework:** Identificar 2 tareas recurrentes de su trabajo donde un agente podría ayudar. Traerlas como input para Semana 2.

---

### Semana 2 — Arquitectura de Agentes con OpenClaw

#### S2.1 — *Anatomía de un agente: bootstrap, contexto y memoria*
- **Purpose:** Dar el modelo mental completo de cómo funciona un agente OpenClaw por dentro.
- **Key concepts:** Bootstrap files, capas de contexto, memoria persistente vs. efímera, estado del workspace, cómo Studio orquesta todo esto.
- **Activity:** Walkthrough en vivo de un agente real; participantes configuran su propio bootstrap y definen su capa de memoria.
- **Artifact:** Agente con bootstrap propio, memoria configurada y caso de uso asignado.
- **Homework:** Escribir el bootstrap de un segundo agente especializado (ej. agente de research, agente de soporte).

#### S2.2 — *Skills: cómo tu agente aprende a hacer cosas*
- **Purpose:** Enseñar el patrón de composición que hace a OpenClaw diferente.
- **Key concepts:** Qué es una skill, cuándo crear una skill vs. meterla en el prompt, composición de skills, skills reusables.
- **Activity:** Construir 2 skills desde cero para el agente personal.
- **Artifact:** Agente con ≥2 skills funcionales documentadas.
- **Homework:** Añadir una tercera skill que resuelva una de las tareas recurrentes identificadas en S1.2.

---

### Semana 3 — Integraciones, herramientas e identidad

#### S3.1 — *Conectando tu agente al mundo: tools, APIs e identidad*
- **Purpose:** Salir del sandbox. El agente se conecta a herramientas reales *y* activa su identidad propia — ambas son activaciones de un clic en Studio.
- **Key concepts:** Tool calling, integraciones nativas de Studio (Gmail, Calendar, GitHub, archivos), qué significa que un agente tenga identidad propia, por qué la identidad habilita todo lo que viene después (pagos, reputación, acciones firmadas), cómo Studio abstrae la complejidad de wallets.
- **Activity:** Conectar mínimo 2 integraciones tradicionales + activar la identidad del agente en Studio. Ejecutar primera tarea donde la identidad del agente queda registrada.
- **Artifact:** Agente con 2+ integraciones activas + identidad propia activa. **Reputación empieza a acumularse automáticamente desde este momento.**
- **Homework:** Asegurar que la integración crítica para su caso de uso profesional funciona. Revisar en Studio qué acciones del agente están quedando registradas en su track record.
- **Sponsor fit:** Privy, Coinbase CDP, Alchemy, PerkOS — proveen la capa de identidad que Studio expone como activación simple.

#### S3.2 — *Workspaces, proyectos e identidad persistente del agente*
- **Purpose:** Mostrar el modelo organizacional de Studio y cómo la identidad del agente persiste coherentemente a través de workspaces, proyectos y acciones.
- **Key concepts:** Workspaces, proyectos, gestión de archivos, colaboración, contexto compartido, agentes especializados por proyecto, cómo la identidad del agente se mantiene consistente y cómo el track record se construye silenciosamente.
- **Activity:** Estructurar un workspace para un proyecto real; cargar archivos, definir tareas, asignar agente con identidad persistente. Verificar que las acciones están quedando registradas.
- **Artifact:** Workspace operativo completo con proyecto, archivos, agente con identidad y primeras entradas en su track record.
- **Homework:** Usar el workspace durante la semana en trabajo real. Traer métricas (tiempo ahorrado, tareas resueltas). El track record se acumula en paralelo.

---

### Semana 4 — Workflows y economía de agentes

#### S4.1 — *Workflows que resuelven problemas reales*
- **Purpose:** Pasar de agente reactivo a agente proactivo/orquestado.
- **Key concepts:** Qué es un workflow, triggers, pasos multi-step, condicionales, errores y recuperación, human-in-the-loop.
- **Activity:** Diseñar un workflow para un caso real del participante; implementarlo end-to-end.
- **Artifact:** Workflow funcional resolviendo un caso de uso documentado.
- **Homework:** Correr el workflow mínimo 5 veces; identificar puntos naturales donde un pago o cobro encajaría en el proceso.

#### S4.2 — *Workflows económicos: pagos, pricing y agentes que transaccionan*
- **Purpose:** Añadir la capa económica a los workflows. El participante define dónde y cómo fluye el dinero; Studio maneja la plomería.
- **Key concepts:** Por qué los agentes necesitan transaccionar, cómo declarar pricing y payment rules en un workflow, cuándo un agente paga vs. cobra, controles de gasto, diferencias conceptuales entre rails (x402, Stripe, onchain) — sin necesidad de implementarlos a nivel de protocolo.
- **Activity:** Extender el workflow de S4.1 con una capa económica funcional. El participante declara reglas ("mi agente cobra $X por este output" o "mi agente paga por este servicio"); Studio maneja la ejecución.
- **Artifact:** Workflow con capa económica funcional — pago, cobro o ambos, en producción.
- **Homework:** Preparar draft del capstone — definir problema, métricas de éxito, stakeholder y modelo económico del agente.
- **Sponsor fit:** Stripe, x402 ecosystem, Base, Monad, Coinbase CDP — proveen los rails que Studio expone como configuración declarativa.

---

### Semana 5 — Iteración, reputación y Demo Day

#### S5.1 — *Iteración, evals y el track record de tu agente*
- **Purpose:** Enseñar a iterar agentes con evidencia, usando el track record que ya se acumuló desde Semana 3 como fuente principal de datos.
- **Key concepts:** Evals básicos, logging, tracing, patrones comunes de falla, iteración basada en evidencia, cómo leer el track record del agente (qué ha hecho, qué tan bien, qué señales de reputación acumuló), cómo presentar evidencia verificable.
- **Activity:** Revisar el track record acumulado del capstone, implementar un ciclo de eval básico, iterar el agente basado en evidencia, preparar la presentación del track record para Demo Day.
- **Artifact:** Reporte de evaluación + plan de iteración + track record verificable listo para presentar.
- **Homework:** Iterar el capstone al menos una vez. Preparar demo de 5 minutos.
- **Sponsor fit:** Ethereum Foundation (ERC-8004), reputation infra providers — la capa de reputación ha estado recolectando señales desde Semana 3; esta semana es cuando se revisa.

#### S5.2 — *Demo Day: presentación de capstones*
- **Purpose:** Cerrar con evidencia pública. Cada participante presenta un agente que funciona, con workflows económicos y track record verificable, frente a sponsors, inversionistas y comunidad.
- **Activity:** Demos de 5 minutos + Q&A. Grabación para testimoniales y marketing. Sponsors presentes como jueces.
- **Artifact:** Demo grabada + caso de uso documentado + métricas + track record público + testimonial.

---

## 3. Weekly deliverables

Single column. Everything is required. Every graduate walks away with every item on this list.

| Semana | Deliverable (todos) | Milestone |
|---|---|---|
| 1 | Agente personal activo + prompt system refinado | Primer artefacto funcional |
| 2 | Agente con bootstrap propio + ≥2 skills + memoria configurada | Dominio del modelo arquitectónico |
| 3 | Agente integrado a ≥2 herramientas + identidad propia activa + workspace operativo + track record iniciado | Agente fuera del sandbox con presencia propia |
| 4 | Workflow multi-paso con capa económica funcional | Agente como actor económico |
| 5 | Capstone + demo grabada + métricas + track record verificable + testimonial | Evidencia pública |

---

## 4. Graduation bar

**One bar. Every graduate clears it.**

Every participant who completes AgentCamp 2026 walks away with:

- **1 agente personal** configurado en Godínez.AI Studio con bootstrap, memoria y ≥2 skills funcionales.
- **≥2 integraciones reales** conectadas (Gmail, Calendar, GitHub, archivos u otras relevantes a su caso de uso).
- **1 identidad propia activa** para su agente, provisionada vía Studio.
- **1 workspace operativo** estructurado con proyecto, archivos y agente asignado.
- **1 workflow multi-paso con capa económica** funcional — el agente puede pagar por un servicio, cobrar por un output, o ambos.
- **1 track record verificable** acumulado desde Semana 3 y presentable públicamente.
- **1 capstone presentado en Demo Day** con demo grabada, métricas reales y testimonial propio.

**Principio operativo:** Si algún participante no llega a este bar, el problema no es del participante — es de la infraestructura o de la ejecución del programa. Esto es lo que obliga a Studio a ser verdaderamente plug-and-play.

---

## 5. Infrastructure contract (Frutero → curriculum)

This is the non-negotiable contract between the product team and the curriculum. If any row breaks, the curriculum breaks.

| Capability | Activation UX for participant | What Studio / infrastructure must handle | Ready by |
|---|---|---|---|
| **Agent identity** | One-click activation in Studio (equivalent in friction to connecting Gmail) | Wallet provisioning, key management, persistence across sessions, signing of agent actions | Week 3 start |
| **Integrations** | Click-to-connect for Gmail, Calendar, GitHub, files, etc. | OAuth flows, token management, permission scoping | Week 3 start |
| **Payments** | Declarative in workflow UI ("agent charges $X", "agent pays for Y") | x402 protocol implementation, Stripe integration, spend controls, settlement, reconciliation | Week 4 start |
| **Reputation tracking** | Passive — starts recording automatically once agent has identity | ERC-8004 signal publishing, activity logging, verification, public display | Week 3 start (silent), Week 5 (reviewable) |

**What participants must never have to do:**
- Open a terminal for any infrastructure task
- Manage private keys
- Understand ERC-8004 or x402 at the protocol level
- Deploy smart contracts
- Read blockchain documentation
- Leave Studio to complete any required deliverable

If any of these become necessary, the infrastructure is not ready and the curriculum must be re-scoped before cohort launch.

---

## 6. Learning progression

### Pedagogical logic

The program follows a **compounding concreteness** curve: each week, the artifact becomes more real, more connected, more operational, more economically complete. Theory is always justified by a problem the participant already has.

- **End of Week 1:** "I have an agent that actually helps me." (Motivation locked in.)
- **End of Week 2:** "I understand *why* it works and I can configure a new one." (Transferable model.)
- **End of Week 3:** "My agent exists in the world as itself, with its own identity, and its work is being recorded." (Presence + silent proof.)
- **End of Week 4:** "My agent runs without me and participates in real economic exchange." (Autonomy + economic agency.)
- **End of Week 5:** "I have proof — a demo, metrics, and a verifiable track record — that I can show to anyone." (Portfolio + cryptographic proof.)

### Aha moments — designed, not accidental

- **Week 1 S1 (90 minutes in):** First real response from their own agent on their own data.
- **Week 2 S2:** First skill they built themselves executes correctly.
- **Week 3 S1:** First action signed by the agent's identity — and the realization that a track record just started building.
- **Week 4 S2:** First transaction completes — their agent just paid for something or got paid.
- **Week 5 S1:** Reviewing the track record — three weeks of accumulated evidence, all verifiable.
- **Week 5 S2:** Demo Day — public validation in front of sponsors and community.

### Avoiding overwhelm

- No session introduces more than 2 new major concepts.
- Every session produces *something* by the end — no purely conceptual sessions.
- Homework is always tied to the next session's activity, not extra load.
- Office hours between sessions (async + 1 live) for unblocking.
- Infrastructure complexity is absorbed by Studio, never by the participant.

---

## 7. Landing page messaging

### Tone principles

- Concrete over abstract. "Construye" over "Aprende sobre".
- Outcome-first. Lead with what the participant walks away with — all of it, no asterisks.
- Product-native but not product-pitch. Studio is the environment.
- One promise, one bar. No stretch, no tiers, no "if you're ready."

### "How it works" section

1. **Activa** (Semana 1): Tu primer agente funcionando desde el día uno.
2. **Arquitecta** (Semana 2): Entiende cómo piensa tu agente y enséñale habilidades nuevas.
3. **Conecta** (Semana 3): Tu agente se conecta al mundo y recibe su propia identidad.
4. **Automatiza** (Semana 4): Workflows que corren sin ti — y que transaccionan.
5. **Lanza** (Semana 5): Demo pública con evidencia real y track record verificable.

---

## 8. Curriculum section copy (Spanish, landing-ready)

---

### **AgentCamp 2026**

## Construye, integra y lanza tu propio agente de IA en 5 semanas.

No es un curso. Es un cohort práctico donde sales con un agente funcionando, con su propia identidad, ejecutando workflows que transaccionan y con un track record verificable. Todo esto. Para todos.

---

### Cómo funciona

**5 semanas. 2 sesiones por semana. 1 artefacto real cada semana.**

Aprendes construyendo dentro de Godínez.AI Studio, el entorno nativo de agentes potenciado por OpenClaw. Cada sesión termina con algo que puedes usar, mostrar o monetizar.

---

### Currículum

**Semana 1 — Del prompt al primer agente**
En la primera sesión configuras tu agente personal y lo pones a trabajar en una tarea real. En la segunda aprendes a instruirlo como un profesional: prompts, contexto y el arte de dirigir inteligencia.
**Sales con:** Un agente personal activo resolviendo una tarea real.

**Semana 2 — Arquitectura de agentes con OpenClaw**
Abrimos el motor. Entiendes cómo funcionan los bootstrap files, la memoria, el contexto y las skills — las piezas que distinguen un agente de verdad de un chatbot disfrazado.
**Sales con:** Un agente con arquitectura propia, memoria configurada y skills funcionales.

**Semana 3 — Integraciones, herramientas e identidad**
Tu agente deja el sandbox. Se conecta a Gmail, Calendar, GitHub, tus archivos, tu stack — y activa su propia identidad persistente. Desde este momento, cada cosa que hace queda registrada en su track record.
**Sales con:** Un agente integrado a tus herramientas, con identidad propia y un workspace operativo.

**Semana 4 — Workflows y economía de agentes**
Diseñas workflows que corren sin ti. Defines cómo tu agente cobra por sus outputs o paga por servicios — Studio maneja la plomería. De tareas aisladas a procesos completos que transaccionan.
**Sales con:** Un workflow profesional con capa económica funcional.

**Semana 5 — Iteración, reputación y Demo Day**
Revisas el track record que tu agente ha estado construyendo desde Semana 3. Iteras con evidencia real. Cerramos con Demo Day: presentas tu capstone frente a sponsors, inversionistas y la comunidad.
**Sales con:** Capstone demostrable, métricas reales, track record verificable y demo grabada.

---

### Lo que te llevas

- 1 agente personal con identidad propia
- 1 workspace operativo estructurado
- 1 workflow profesional con capa económica
- 1 capstone con métricas y demo pública
- 1 track record verificable de tu agente
- 1 caso de uso listo para tu portafolio, tu equipo o tus clientes

Todo esto. Para todos los graduados. No hay tiers, no hay "si llegas."

---

## 9. Risks and recommendations

### What could make the curriculum fail

1. **Infrastructure not ready.** This is the single biggest risk. The one-bar promise depends entirely on identity/payments/reputation being plug-and-play by cohort start. If they're not, either the curriculum has to re-scope (accept tiers) or the landing page has to pull back promises. There is no middle option.
2. **Front-loading theory in Week 1.** Non-negotiable: working agent by end of S1.1.
3. **Overloading Week 2.** OpenClaw architecture is dense. Two sessions minimum.
4. **Integrations that break live.** Weeks 3 and 4 depend on external services working. Have fallback paths ready; never demo a flaky integration.
5. **Letting capstones drift.** Capstone scoping must start by end of Week 4, not Week 5.
6. **Product overreach in sessions.** Instructors teach concepts; Studio is the classroom. Do not pitch product features.
7. **Sponsor overreach.** Teach the concept; sponsor primitives are how the concept is implemented, not the subject of the lesson.

### What to simplify

- Week 1 does not teach "AI fundamentals." Assume participants have seen ChatGPT.
- Prompt engineering integrated across weeks, not as a standalone technique library.
- Onchain content always framed as "your agent has an identity / can transact / has a track record" — never as crypto education. Participants should not need to know they're touching crypto infrastructure.

### Sponsor engagement

- **Named sessions** teaching sponsor primitives as core content for every participant (Privy/CDP in W3, Stripe/x402/Base/Monad in W4, EF/ERC-8004 in W5).
- **Office hours with sponsor DevRel** between sessions — high-value touchpoint.
- **Demo Day sponsor judges** — top-of-funnel moment for sponsors to meet builders.
- **Post-program bounties and grants** — the honest home for the "earning" narrative, funded by sponsors, pursued by graduates who want to go deeper.
- **No separate sponsor challenges as tiers.** Folded naturally into Demo Day.

---

## 10. Final recommendation

**Ship the 5-week structure with these non-negotiables:**

1. **Week 1 Session 1 produces a working agent within 90 minutes.** Move kickoff logistics to async/pre-work.

2. **Identity, payments, and reputation are plug-and-play services from Studio.** Not advanced topics. Not stretch goals. Not tiers. One bar, everyone clears it.

3. **Reputation starts accumulating in Week 3.** Silently, passively, as a byproduct of the agent doing real work with its own identity. Week 5 is where participants review and present it — not where they learn to configure it.

4. **Five weeks. No Week 6.** The program knows what it is.

5. **Every week ends with a portfolio-grade deliverable.** Single column, no stretch, everything required.

6. **Infrastructure contract is enforced.** If any capability requires a terminal, key management, or protocol knowledge from the participant, the curriculum breaks. Studio must absorb the complexity.

7. **Demo Day as the climax.** The track record accumulated over three weeks becomes public evidence. Testimonials, metrics, case studies, sponsor visibility, and next-cohort marketing all born here.

### One-line positioning

> *Cinco semanas. Un agente con identidad propia. Workflows que transaccionan. Track record verificable. Para todos los graduados.*

### The one question that decides everything

**Is the infrastructure contract (Section 5) deliverable by cohort start?**

If yes → ship v2.0 as written. One bar. One promise. Landing page holds.

If no → the curriculum must be re-scoped honestly and the landing page adjusted to match. Tiers are not a valid workaround for infrastructure gaps.

The current document assumes yes.
