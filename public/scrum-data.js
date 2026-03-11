/* eslint-disable @typescript-eslint/no-unused-vars */
// ATOMICPOST - Planificacion Scrum del proyecto

// ========================================
// PLANTILLA DE DATOS PARA PROYECTO SCRUM
// ========================================
/*
ESTRUCTURA Y TIPOS DE DATOS:

METADATA:
- name: string - Nombre corto del proyecto
- fullName: string - Nombre completo del proyecto
- description: string - Descripcion del proyecto
- version: string - Version actual
- startDate: string (YYYY-MM-DD) - Fecha de inicio
- client: string - Cliente o usuarios objetivo
- status: string - Estado actual del proyecto
- hourly_rates: object - Tarifas por sprint {sprint_N: number}

EPICAS (epics):
- id: string (EPIC-XXX) - Identificador unico
- title: string - Titulo descriptivo
- description: string - Descripcion detallada
- business_value: string - Valor de negocio descriptivo
- status: string (active|planned|completed) - Estado actual
- owner: string - Responsable

USER STORIES (backlog.items):
- id: string (US-XXX) - Identificador unico
- type: string (user_story) - Tipo de elemento
- epic: string (EPIC-XXX) - Epica asociada
- title: string - Titulo descriptivo
- description: string - Descripcion detallada
- acceptance_criteria: array - Lista de criterios de aceptacion
- business_value: number (1-5) - Valor de negocio (1=Bajo, 3=Medio, 5=Alto)
- story_points: number - Puntos de esfuerzo (Fibonacci)
- billing: string (incluido|facturable) - Tipo de facturacion
- sprint: number|null - Sprint asignado (null = backlog)
- created: string (YYYY-MM-DD) - Fecha de creacion
- completed: string|null (YYYY-MM-DD) - Fecha de completacion
- technical_note: boolean - Indica si es historia tecnica
- technical_notes: string - Notas tecnicas
- dependencies: array - IDs de historias dependientes
- notes: string|array|object - Notas adicionales

TASKS:
- id: string (TASK-XXX) - Identificador unico
- type: string (task) - Tipo de elemento
- parent: string (US-XXX) - User story padre
- title: string - Titulo descriptivo
- description: string - Descripcion detallada
- status: string (to_do|in_progress|done|blocked) - Estado actual
- hours_est: number - Horas estimadas asumiendo desarrollador senior
- hours_actual: number - Horas reales (opcional)

BUGS:
- id: string (BUG-XXX) - Identificador unico
- type: string (bug) - Tipo de elemento
- title: string - Titulo descriptivo
- description: string - Descripcion detallada
- severity: string (critical|high|medium|low) - Severidad
- status: string (open|to_do|in_progress|fixed|done) - Estado actual
- sprint: number|null - Sprint asignado (null = backlog)
- hours_est: number - Horas estimadas asumiendo desarrollador senior
- hours_actual: number - Horas reales (opcional)
- solution: string|null - Solucion implementada
- related_to: array - IDs de user stories relacionadas

SPRINTS:
- number: number - Numero del sprint
- goal: string - Objetivo del sprint
- retrospective: object - Retrospectiva
  - went_well: array - Lo que funciono bien
  - to_improve: array - Lo que mejorar
  - action_items: array - Acciones a tomar
- notes: string - Notas adicionales 50 caracter max

POLITICAS (policies):
- data_structure: object - Estructura de datos
  - description: string - Descripcion de la estructura
  - user_stories: array - Reglas para user stories
  - tasks: array - Reglas para tasks
  - bugs: array - Reglas para bugs
  - scrum_rules: array - Reglas de Scrum
- instructions: array - Instrucciones generales
- definition_of_ready: object - Definicion de Listo
- definition_of_done: object - Definicion de Terminado
- bug_severity_criteria: object - Criterios de severidad
- bug_policy: object - Politicas de bugs
- estimation_guidelines: object - Guias de estimacion

REGLAS DE VALIDACION:
- business_value: Solo valores numericos entre 1 y 5
- story_points: Solo valores de Fibonacci (1,2,3,5,8,13,21)
- sprint: Solo valores numericos o null
- status: Solo valores definidos en los enums anteriores
- severity: Solo valores (critical|high|medium|low)
- billing: Solo valores (incluido|facturable)
- epic_status: Solo valores (active|planned|completed)
- task_status: Solo valores (to_do|in_progress|done|blocked)
- bug_status: Solo valores (open|to_do|in_progress|fixed|done)
- sprint_status: Solo valores (completed|in_progress|planned)
*/

const projectYAML = `
# ========================================
# ATOMICPOST - PLANIFICACION SCRUM
# ========================================

metadata:
  name: AtomicPost
  fullName: Treasury Settlement Workspace
  description: Prototipo funcional en Next.js para una plataforma operativa de settlement postal con USD-ST sobre XRPL. El proyecto ya tiene PRD, sitemap UX, shell compartido, dashboard, lista de ciclos y detalle inicial; la siguiente fase convierte ese prototipo en un MVP operativo alineado con el PRD.
  version: 0.2.0
  startDate: 2026-03-04
  client: Treasury and Settlement Manager
  status: in_progress
  hourly_rates:
    sprint_1: 55
    sprint_2: 55
    sprint_3: 60
    sprint_4: 60
    sprint_5: 65

epics:
  - id: EPIC-001
    title: Product discovery and agile foundation
    description: Consolidar PRD, journey, wireframes y marco Scrum para que el producto tenga alcance, lenguaje comun y roadmap ejecutable.
    business_value: Reduce ambiguedad, acelera decisiones y evita retrabajo.
    status: active
    owner: Product and Delivery
  - id: EPIC-002
    title: Workspace shell and design system
    description: Construir la base visual y estructural del workspace para soportar la experiencia operativa del MVP.
    business_value: Permite escalar pantallas coherentes y consistentes sin redisenar cada flujo.
    status: active
    owner: Frontend
  - id: EPIC-003
    title: Operational dashboards and cycle triage
    description: Facilitar visibilidad inmediata del portfolio y acceso rapido a los ciclos que requieren accion.
    business_value: Reduce tiempo de decision y mejora priorizacion operativa.
    status: active
    owner: Frontend
  - id: EPIC-004
    title: Cycle detail as operational cockpit
    description: Convertir el detalle del ciclo en el centro del MVP con issuance, settlement, reconciliation, exceptions y close en una sola vista.
    business_value: Minimiza cambio de contexto y alinea la UI con la forma real de trabajar del usuario.
    status: active
    owner: Product and Frontend
  - id: EPIC-005
    title: Settlement domain and control rules
    description: Modelar entidades, estados, validaciones y flujos transaccionales del settlement para pasar de mock a producto real.
    business_value: Asegura trazabilidad, control y comportamiento confiable del sistema.
    status: planned
    owner: Full Stack
  - id: EPIC-006
    title: XRPL operations and reconciliation
    description: Implementar issuance, pagos, memos, reconciliacion deterministica y manejo de excepciones.
    business_value: Entrega el valor principal del PoC al sustituir settlement bancario lento por un flujo XRPL auditable.
    status: planned
    owner: Full Stack
  - id: EPIC-007
    title: Closure, reporting and compliance evidence
    description: Habilitar redemption, cierre de ciclos, audit trail y reportes exportables del PoC.
    business_value: Permite evaluacion ejecutiva, revision de auditoria y cierre operativo confiable.
    status: planned
    owner: Product and Full Stack

backlog:
  items:
    - id: US-001
      type: user_story
      epic: EPIC-001
      title: Documentar el producto y el journey operativo
      description: Como equipo de producto, queremos un PRD y journey completos para construir el MVP con criterios de negocio y de UX claros.
      acceptance_criteria:
        - PRD completo con objetivos, requisitos funcionales, reglas de negocio, estados y metricas.
        - Journey y acceptance criteria disponibles como referencia del flujo operativo.
        - El equipo puede derivar backlog y roadmap sin depender de supuestos tacitos.
      business_value: 5
      story_points: 5
      billing: incluido
      sprint: 1
      created: 2026-03-04
      completed: 2026-03-05
      technical_note: false
      technical_notes: Base documental ya creada en docs/prd.md y docs/User Journey simplified with acceptance criteria (3).md.
      dependencies: []
      notes: Evidencia completada en documentacion del repo.
    - id: US-002
      type: user_story
      epic: EPIC-001
      title: Definir arquitectura UX MVP y decision de consolidacion
      description: Como Product Designer, quiero un sitemap y wireframes que definan la arquitectura MVP para que el equipo priorice las pantallas correctas.
      acceptance_criteria:
        - Sitemap MVP con Dashboard, Settlement Cycles y Cycle Detail.
        - Wireframes base para las pantallas principales.
        - Decision explicita de consolidar modulos operativos dentro de Cycle Detail.
      business_value: 5
      story_points: 3
      billing: incluido
      sprint: 1
      created: 2026-03-04
      completed: 2026-03-05
      technical_note: false
      technical_notes: Documentado en docs/ux-sitemap-and-wireframes.md.
      dependencies: [US-001]
      notes: La implementacion actual aun no cumple del todo la decision de consolidacion.
    - id: US-003
      type: user_story
      epic: EPIC-002
      title: Construir shell compartido y base visual del workspace
      description: Como Treasury and Settlement Manager, quiero una estructura de navegacion y layout consistente para moverme por el producto sin friccion.
      acceptance_criteria:
        - Layout raiz con tipografias y estilos globales.
        - Shell con sidebar, top bar, busqueda y area principal.
        - Componentes UI reutilizables listos para el resto del MVP.
      business_value: 4
      story_points: 5
      billing: incluido
      sprint: 1
      created: 2026-03-05
      completed: 2026-03-07
      technical_note: false
      technical_notes: Implementado en src/app/layout.tsx, src/app/globals.css, src/components/app-shell.tsx y componentes UI base. Decisiones validadas en prototipo: breadcrumb removido por redundante, perfil fijado al fondo del sidebar, contexto operativo reducido a indicadores discretos encima del perfil, y paleta centralizada en tokens globales desde globals.css.
      dependencies: [US-002]
      notes: Shell mas limpio y contextual; siguiente paso es refinar responsive behavior y conectar busqueda real.
    - id: US-004
      type: user_story
      epic: EPIC-003
      title: Crear dashboard ejecutivo-operativo del workspace
      description: Como Treasury and Settlement Manager, quiero un dashboard que priorice acciones y visibilidad del portfolio para decidir rapido que ciclo atender.
      acceptance_criteria:
        - KPI cards, priority queue y reserve snapshot visibles.
        - Estados y next actions entendibles en la primera pantalla.
        - El dashboard se siente como command center y no como reporte pasivo.
      business_value: 4
      story_points: 5
      billing: incluido
      sprint: 1
      created: 2026-03-05
      completed: 2026-03-08
      technical_note: false
      technical_notes: Dashboard navegable implementado con datos mock en src/app/(workspace)/page.tsx. Decisiones UX validadas: command center compacto, priority queue limitada a 3 ciclos maximos, KPI strip resumido, reserve snapshot y exceptions como modulos secundarios, y CTA hacia la lista completa de triage cuando se requiere mayor exploracion.
      dependencies: [US-003]
      notes: Falta conectar datos reales y hacer que cada CTA continue el workflow verdadero del ciclo.
    - id: US-005
      type: user_story
      epic: EPIC-003
      title: Crear lista de settlement cycles orientada a triage
      description: Como Treasury and Settlement Manager, quiero una lista de ciclos con estado, direccion y next action para abrir primero el caso correcto.
      acceptance_criteria:
        - Listado de ciclos con columnas clave del PRD.
        - Navegacion al detalle del ciclo desde la lista.
        - Tono visual claro para estados, direccion y excepciones.
      business_value: 4
      story_points: 5
      billing: incluido
      sprint: 1
      created: 2026-03-06
      completed: 2026-03-08
      technical_note: false
      technical_notes: Implementado en src/app/(workspace)/settlement-cycles/page.tsx con dataset mock tipado. Decision UX validada: esta pantalla es master list de triage y no debe duplicar el rol del dashboard; por eso se redujeron resumenes y se priorizo la lista filtrable.
      dependencies: [US-003]
      notes: La UI existe pero busqueda, filtros y orden siguen siendo de presentacion; debe mantenerse list-first y no volver a crecer como dashboard secundario.
    - id: US-006
      type: user_story
      epic: EPIC-004
      title: Construir detalle inicial del ciclo con resumen y evidencia
      description: Como Treasury and Settlement Manager, quiero abrir un ciclo y entender su contexto, estado y siguiente accion sin revisar varias vistas.
      acceptance_criteria:
        - Vista detalle por ciclo accesible desde el listado.
        - Header con direction, status, amount, counterparty y next action.
        - Bloques base de timeline, resumen operacional y evidencia.
      business_value: 5
      story_points: 8
      billing: incluido
      sprint: 2
      created: 2026-03-08
      completed: null
      technical_note: false
      technical_notes: Implementacion inicial en src/app/(workspace)/settlement-cycles/[cycleId]/page.tsx. Decision UX validada: el detalle debe priorizar next action, timeline y evidencia contextual antes que tabs fragmentadas o modulos separados.
      dependencies: [US-005]
      notes: Hecho parcialmente. Aun faltan bloques operativos embebidos del MVP, confirmaciones de acciones de riesgo y evidencia real en lugar de placeholders.
    - id: US-007
      type: user_story
      epic: EPIC-004
      title: Consolidar issuance, monitoring, payments y reconciliation dentro de Cycle Detail
      description: Como Treasury and Settlement Manager, quiero trabajar todo el ciclo en una sola pantalla para reducir cambios de contexto y errores operativos.
      acceptance_criteria:
        - Cycle Detail incorpora issuance, settlement, reconciliation, exceptions, redemption y close como bloques internos.
        - Las pantallas placeholder dejan de ser la arquitectura principal del MVP.
        - La estructura final queda alineada con docs/ux-sitemap-and-wireframes.md.
      business_value: 5
      story_points: 13
      billing: incluido
      sprint: 2
      created: 2026-03-09
      completed: null
      technical_note: false
      technical_notes: Hoy existen paginas scaffolded separadas que deben migrarse conceptualmente al detalle del ciclo. Decision UX validada: Cycle Detail debe funcionar como cockpit unico con progressive disclosure de evidencia tecnica para no competir con la pregunta operativa principal.
      dependencies: [US-002, US-006]
      notes: Historia critica para alinear implementacion y UX MVP; aqui debe resolverse tambien la separacion clara entre flujo Receivable y flujo Payable.
    - id: US-008
      type: user_story
      epic: EPIC-005
      title: Modelar el dominio real de settlement y sus estados
      description: Como equipo tecnico, queremos entidades y estados alineados con el PRD para dejar de depender de mocks ad hoc.
      acceptance_criteria:
        - Modelos para clearing package, settlement cycle, authorization, payment instruction, redemption y exception.
        - Estados del PRD representados de forma consistente en codigo.
        - Validaciones basicas de transicion y relaciones entre entidades.
      business_value: 5
      story_points: 8
      billing: incluido
      sprint: 2
      created: 2026-03-09
      completed: null
      technical_note: true
      technical_notes: El archivo src/lib/settlement-cycles.ts es un inicio, pero no cubre Closed, authorization states ni redemption. El prototipo tambien evidencio que settlement cycle no debe mezclar en un solo objeto issuance authorization, payment instruction, redemption y exception record.
      dependencies: [US-001]
      notes: Enabler tecnico centrado en dominio y maquina de estados; necesario para que la UI deje de apoyarse en simplificaciones de prototipo.
    - id: US-016
      type: user_story
      epic: EPIC-005
      title: Preparar base de datos y capa de persistencia inicial
      description: Como equipo tecnico, queremos una base de datos y una capa de acceso a datos para soportar el MVP con informacion real y trazable.
      acceptance_criteria:
        - Esquema inicial para entidades core del settlement.
        - Estrategia de persistencia y repositorios definida e implementada.
        - Seed o dataset inicial disponible para desarrollo y demo.
      business_value: 5
      story_points: 8
      billing: incluido
      sprint: 2
      created: 2026-03-10
      completed: null
      technical_note: true
      technical_notes: Enabler explicito para base de datos, persistencia, seeds y acceso a datos del MVP.
      dependencies: [US-008]
      notes: Enabler critico; sin esta historia no hay salto real de prototipo a producto funcional.
    - id: US-009
      type: user_story
      epic: EPIC-005
      title: Ingerir clearing packages aprobados y crear settlement cycles
      description: Como Treasury and Settlement Manager, quiero registrar paquetes aprobados para iniciar settlement sin rehacer clearing logic.
      acceptance_criteria:
        - Registro de clearing package con ClearingCycleID, CounterpartyID, Amount, Currency y estado Clearing_Agreed.
        - Timestamp de ingreso y validacion de moneda soportada.
        - Creacion automatica del settlement cycle con direccion y estado inicial.
      business_value: 5
      story_points: 8
      billing: incluido
      sprint: 3
      created: 2026-03-10
      completed: null
      technical_note: false
      technical_notes: Debe incluir capa de persistencia y validaciones de BR-01 a BR-05.
      dependencies: [US-008, US-016]
      notes: Primer incremento funcional real del flujo.
    - id: US-010
      type: user_story
      epic: EPIC-005
      title: Gestionar reservas y authorizations de issuance
      description: Como Treasury and Settlement Manager, quiero ver backing, supply y capacidad para emitir USD-ST sin romper reglas de control.
      acceptance_criteria:
        - Reserve dashboard con backing confirmado, issued supply y capacidad restante.
        - Creacion y seguimiento de issuance authorizations por ciclo o batch.
        - Bloqueo de issuance si falla backing, authorization o trustline.
      business_value: 5
      story_points: 8
      billing: incluido
      sprint: 3
      created: 2026-03-10
      completed: null
      technical_note: false
      technical_notes: Debe cubrir FR-06 a FR-13 y BR-06 a BR-10.
      dependencies: [US-008, US-016, US-009]
      notes: Necesario para todos los casos Payable.
    - id: US-011
      type: user_story
      epic: EPIC-006
      title: Ejecutar settlement inbound y outbound con control explicito
      description: Como Treasury and Settlement Manager, quiero monitorear receivables y ejecutar payables con confirmacion y memos obligatorios.
      acceptance_criteria:
        - Flujo outbound con PaymentInstructionID, validaciones y confirmacion final.
        - Flujo inbound con notificacion, estados de recepcion y notas operativas.
        - Soporte de pagos parciales con recalculo de remanente.
      business_value: 5
      story_points: 13
      billing: incluido
      sprint: 4
      created: 2026-03-10
      completed: null
      technical_note: false
      technical_notes: Debe cubrir FR-14 a FR-24 y BR-11 a BR-15.
      dependencies: [US-010]
      notes: Flujo core del MVP operativo.
    - id: US-012
      type: user_story
      epic: EPIC-006
      title: Reconciliar transacciones XRPL y manejar exceptions
      description: Como Treasury and Settlement Manager, quiero reconciliar transacciones automaticamente y aislar los casos que requieren investigacion manual.
      acceptance_criteria:
        - Matching deterministico por hash, amount, sender, receiver y memo.
        - Creacion de exception records con reason code y action log.
        - Vistas de reconciliation y exceptions integradas en el cockpit del ciclo.
      business_value: 5
      story_points: 8
      billing: incluido
      sprint: 4
      created: 2026-03-10
      completed: null
      technical_note: false
      technical_notes: Debe cubrir FR-28 a FR-31 y BR-16 a BR-19.
      dependencies: [US-011]
      notes: Define la auditabilidad del PoC.
    - id: US-013
      type: user_story
      epic: EPIC-007
      title: Registrar redemption y cerrar settlement cycles
      description: Como Treasury and Settlement Manager, quiero cerrar ciclos solo cuando settlement y redemption esten realmente completos.
      acceptance_criteria:
        - Registro de redemption con reference y evidencia.
        - Actualizacion de outstanding supply y backing availability.
        - Cierre bloqueado si quedan obligaciones o tokens abiertos.
      business_value: 5
      story_points: 5
      billing: incluido
      sprint: 5
      created: 2026-03-10
      completed: null
      technical_note: false
      technical_notes: Debe cubrir FR-24 a FR-27 y BR-18.
      dependencies: [US-012]
      notes: Necesario para demostrar el ciclo completo del PoC.
    - id: US-014
      type: user_story
      epic: EPIC-007
      title: Exportar reportes y evidencia de auditoria del PoC
      description: Como stakeholder de finance, audit y compliance, quiero reportes reproducibles y evidencia exportable para evaluar el resultado del PoC.
      acceptance_criteria:
        - Reportes para supply, settlement time, completion rate, partial frequency y exceptions.
        - Filtro por ClearingCycleID.
        - Audit trail exportable y reproducible.
      business_value: 4
      story_points: 8
      billing: incluido
      sprint: 5
      created: 2026-03-10
      completed: null
      technical_note: false
      technical_notes: Debe cubrir FR-32 a FR-34 y BR-20.
      dependencies: [US-012, US-016]
      notes: Entregable clave para stakeholders no operativos.
    - id: US-015
      type: user_story
      epic: EPIC-007
      title: Endurecer el MVP con autenticacion, validaciones y calidad
      description: Como sponsor del PoC, quiero que el MVP tenga controles basicos de seguridad, calidad y confiabilidad antes de la demo final.
      acceptance_criteria:
        - Control de acceso para usuario Treasury and Settlement Manager.
        - Prevencion de doble ejecucion y validaciones de acciones de alto riesgo.
        - Cobertura minima de pruebas sobre reglas criticas y estados principales.
      business_value: 4
      story_points: 8
      billing: incluido
      sprint: 5
      created: 2026-03-10
      completed: null
      technical_note: true
      technical_notes: Cubre varios NFR del PRD y reduce riesgo de demo.
      dependencies: [US-009, US-010, US-011, US-012, US-016]
      notes: Debe cerrar deuda tecnica del prototipo inicial.

    - id: TASK-001
      type: task
      parent: US-001
      title: Redactar executive summary, goals y scope del producto
      description: Convertir la vision del producto en una base ejecutiva compartida.
      status: done
      hours_est: 1
      hours_actual: 1
    - id: TASK-002
      type: task
      parent: US-001
      title: Documentar requisitos funcionales y reglas de negocio
      description: Bajar a detalle FR, BR, NFR y estados principales.
      status: done
      hours_est: 1
      hours_actual: 1
    - id: TASK-003
      type: task
      parent: US-001
      title: Consolidar user journey y acceptance criteria fuente
      description: Alinear el PRD con el journey operativo de referencia.
      status: done
      hours_est: 1
      hours_actual: 1

    - id: TASK-004
      type: task
      parent: US-002
      title: Disenar sitemap MVP y reglas de navegacion
      description: Definir arquitectura de informacion minima del producto.
      status: done
      hours_est: 1
      hours_actual: 1
    - id: TASK-005
      type: task
      parent: US-002
      title: Crear wireframes de Dashboard, Cycles y Cycle Detail
      description: Bosquejar la experiencia operativa base de las tres vistas centrales.
      status: done
      hours_est: 1
      hours_actual: 1

    - id: TASK-006
      type: task
      parent: US-003
      title: Configurar layout raiz y fuentes del producto
      description: Crear estructura base del App Router y branding tipografico.
      status: done
      hours_est: 1
      hours_actual: 1
    - id: TASK-007
      type: task
      parent: US-003
      title: Implementar app shell con sidebar y top bar
      description: Construir el contenedor compartido del workspace.
      status: done
      hours_est: 2
      hours_actual: 2
    - id: TASK-008
      type: task
      parent: US-003
      title: Crear componentes UI reutilizables base
      description: Preparar badge, card, input y separator para las pantallas iniciales.
      status: done
      hours_est: 1
      hours_actual: 1

    - id: TASK-009
      type: task
      parent: US-004
      title: Maquetar KPI cards y bloque principal del dashboard
      description: Construir el resumen operativo principal del home.
      status: done
      hours_est: 1
      hours_actual: 1
    - id: TASK-010
      type: task
      parent: US-004
      title: Crear priority queue y exception watch
      description: Destacar ciclos que requieren accion inmediata.
      status: done
      hours_est: 1
      hours_actual: 1
    - id: TASK-011
      type: task
      parent: US-004
      title: Integrar reserve snapshot y actividad reciente mock
      description: Completar el command center inicial con datos de contexto.
      status: done
      hours_est: 1
      hours_actual: 1

    - id: TASK-012
      type: task
      parent: US-005
      title: Definir dataset mock tipado de settlement cycles
      description: Crear ciclos de ejemplo con estados, checks y next actions.
      status: done
      hours_est: 0.5
      hours_actual: 0.5
    - id: TASK-013
      type: task
      parent: US-005
      title: Construir tabla de triage y row actions
      description: Implementar la pantalla lista de ciclos y acceso al detalle.
      status: done
      hours_est: 1
      hours_actual: 1
    - id: TASK-014
      type: task
      parent: US-005
      title: Aplicar tonos visuales por status y direction
      description: Hacer legible el listado con indicadores visuales claros.
      status: done
      hours_est: 1
      hours_actual: 1

    - id: TASK-015
      type: task
      parent: US-006
      title: Implementar ruta dinamica de Cycle Detail
      description: Permitir abrir un ciclo individual desde el listado.
      status: done
      hours_est: 4
      hours_actual: 4
    - id: TASK-016
      type: task
      parent: US-006
      title: Construir header de estado y next action panel
      description: Mostrar decision operativa principal arriba del fold.
      status: done
      hours_est: 5
      hours_actual: 5
    - id: TASK-017
      type: task
      parent: US-006
      title: Anadir timeline y resumen operacional inicial
      description: Incluir contexto basico del ciclo y su evidencia resumida.
      status: in_progress
      hours_est: 6
      hours_actual: 4
    - id: TASK-018
      type: task
      parent: US-006
      title: Incorporar drawer o panel de evidencia mas completo
      description: Mostrar wallets, memos, hashes y audit snippets con mas profundidad.
      status: to_do
      hours_est: 6

    - id: TASK-019
      type: task
      parent: US-007
      title: Redisenar Cycle Detail como cockpit unico del MVP
      description: Reestructurar el detalle para absorber todos los modulos operativos.
      status: in_progress
      hours_est: 8
      hours_actual: 3
    - id: TASK-020
      type: task
      parent: US-007
      title: Migrar issuance, monitoring y payments desde placeholders
      description: Convertir las vistas scaffolded en bloques integrados del detalle.
      status: to_do
      hours_est: 8
    - id: TASK-021
      type: task
      parent: US-007
      title: Integrar reconciliation, exceptions y redemption en el detalle
      description: Completar la arquitectura MVP definida en UX.
      status: to_do
      hours_est: 8

    - id: TASK-022
      type: task
      parent: US-008
      title: Definir tipos y estados completos del dominio
      description: Extender los modelos para cubrir estados y entidades faltantes del PRD.
      status: in_progress
      hours_est: 8
      hours_actual: 3
    - id: TASK-023
      type: task
      parent: US-016
      title: Disenar esquema inicial de base de datos
      description: Definir entidades core, relaciones y campos criticos del MVP.
      status: to_do
      hours_est: 8
    - id: TASK-024
      type: task
      parent: US-016
      title: Implementar capa de persistencia y repositorios
      description: Preparar lectura y escritura para settlement cycles y entidades relacionadas.
      status: to_do
      hours_est: 8
    - id: TASK-025
      type: task
      parent: US-016
      title: Crear seeds y dataset inicial de desarrollo
      description: Permitir demos y desarrollo con datos consistentes y repetibles.
      status: to_do
      hours_est: 5
    - id: TASK-026
      type: task
      parent: US-008
      title: Implementar reglas de transicion y validaciones basicas
      description: Asegurar consistencia de estados y acciones criticas.
      status: to_do
      hours_est: 8

    - id: TASK-027
      type: task
      parent: US-009
      title: Disenar flujo de ingreso de clearing packages
      description: Modelar entrada manual o batch del handover aprobado.
      status: to_do
      hours_est: 6
    - id: TASK-028
      type: task
      parent: US-009
      title: Implementar validaciones de paquete y moneda soportada
      description: Aplicar BR-01 a BR-03 antes de crear ciclos.
      status: to_do
      hours_est: 6
    - id: TASK-029
      type: task
      parent: US-009
      title: Crear settlement cycle automatico con direction inicial
      description: Generar el registro operativo listo para trabajar.
      status: to_do
      hours_est: 8

    - id: TASK-030
      type: task
      parent: US-010
      title: Implementar reserve dashboard conectado a datos reales
      description: Mostrar backing, issued supply, capacidad y utilizacion.
      status: to_do
      hours_est: 8
    - id: TASK-031
      type: task
      parent: US-010
      title: Crear issuance authorization con estados y limites
      description: Habilitar autorizaciones activas y consumibles por ciclo.
      status: to_do
      hours_est: 8
    - id: TASK-032
      type: task
      parent: US-010
      title: Bloquear issuance por backing, authorization o trustline
      description: Implementar controles previos obligatorios para emitir.
      status: to_do
      hours_est: 8

    - id: TASK-033
      type: task
      parent: US-011
      title: Crear payment instructions y confirmacion outbound
      description: Construir el flujo de pago payable con control explicito.
      status: to_do
      hours_est: 8
    - id: TASK-034
      type: task
      parent: US-011
      title: Implementar monitoreo inbound y estados de recepcion
      description: Soportar expected receipt, in transit, received y exception.
      status: to_do
      hours_est: 8
    - id: TASK-035
      type: task
      parent: US-011
      title: Soportar partial settlement y recalculo del remanente
      description: Permitir continuidad operativa cuando no hay liquidez total.
      status: to_do
      hours_est: 8

    - id: TASK-036
      type: task
      parent: US-012
      title: Implementar matching deterministico de transacciones
      description: Conciliar hash, amount, sender, receiver y memo.
      status: to_do
      hours_est: 8
    - id: TASK-037
      type: task
      parent: US-012
      title: Crear exception records y action log
      description: Registrar mismatches y decisiones manuales con trazabilidad.
      status: to_do
      hours_est: 6
    - id: TASK-038
      type: task
      parent: US-012
      title: Exponer reconciliation y exceptions en la UI operativa
      description: Integrar la resolucion dentro del cockpit del ciclo.
      status: to_do
      hours_est: 8

    - id: TASK-039
      type: task
      parent: US-013
      title: Registrar redemption y burn off-ledger
      description: Capturar el retorno de USD-ST y su impacto en supply.
      status: to_do
      hours_est: 6
    - id: TASK-040
      type: task
      parent: US-013
      title: Actualizar backing capacity despues del redemption
      description: Reflejar la liberacion de capacidad de emision.
      status: to_do
      hours_est: 5
    - id: TASK-041
      type: task
      parent: US-013
      title: Implementar checklist y bloqueo de cierre del ciclo
      description: Evitar cierres incorrectos cuando quedan obligaciones abiertas.
      status: to_do
      hours_est: 6

    - id: TASK-042
      type: task
      parent: US-014
      title: Disenar dataset de reportes del PoC
      description: Definir indicadores, filtros y campos de export.
      status: to_do
      hours_est: 6
    - id: TASK-043
      type: task
      parent: US-014
      title: Implementar export por ClearingCycleID y portfolio
      description: Permitir salidas reutilizables para stakeholders.
      status: to_do
      hours_est: 8
    - id: TASK-044
      type: task
      parent: US-014
      title: Construir audit trail exportable y reproducible
      description: Unificar evidencia para audit y compliance.
      status: to_do
      hours_est: 8

    - id: TASK-045
      type: task
      parent: US-015
      title: Implementar autenticacion basica del usuario treasury
      description: Restringir acciones criticas al actor autorizado.
      status: to_do
      hours_est: 8
    - id: TASK-046
      type: task
      parent: US-015
      title: Prevenir doble ejecucion y acciones de alto riesgo
      description: Anadir locks, confirmaciones y validaciones defensivas.
      status: to_do
      hours_est: 8
    - id: TASK-047
      type: task
      parent: US-015
      title: Crear smoke tests y pruebas sobre reglas criticas
      description: Validar journey principal y reglas de negocio sensibles.
      status: to_do
      hours_est: 8

    - id: BUG-001
      type: bug
      title: Breadcrumb y heading del app shell no reflejan la ruta actual
      description: El shell muestra Home y Overview dashboard de forma fija incluso cuando el usuario navega a otras pantallas.
      severity: medium
      status: to_do
      sprint: 2
      hours_est: 3
      hours_actual: null
      solution: null
      related_to: [US-003, US-006]
    - id: BUG-002
      type: bug
      title: Arquitectura implementada no esta alineada con la consolidacion MVP definida en UX
      description: Existen pantallas separadas scaffolded para modulos que el sitemap MVP define como bloques internos de Cycle Detail.
      severity: high
      status: in_progress
      sprint: 2
      hours_est: 6
      hours_actual: 2
      solution: Migrar la arquitectura hacia un cockpit unico por ciclo y dejar los placeholders como referencia interna o eliminarlos.
      related_to: [US-007]

sprints:
  - number: 1
    status: completed
    goal: Alinear producto y UX, y dejar un prototipo navegable con shell, dashboard y lista de ciclos.
    retrospective:
      went_well:
        - El cliente entrego gran parte de la base documental y de definicion ya resuelta.
        - PRD y documentacion de UX quedaron muy por delante del nivel de ambiguedad inicial.
        - Se construyo rapido una base visual consistente en Next.js.
        - El proyecto ya tiene una narrativa clara para demos tempranas.
      to_improve:
        - La implementacion se fue antes a la maqueta que al dominio real.
        - El README y la higiene general del repo no reflejan el estado del producto.
        - No se prepararon pruebas ni criterios tecnicos de integracion desde el inicio.
      action_items:
        - Convertir el PRD en backlog ejecutable y visible.
        - Priorizar arquitectura real del MVP antes de sumar nuevas pantallas.
        - Definir modelo de datos y estados canonicamente.
    notes: Cliente aporto insumos clave ya listos.
  - number: 2
    status: in_progress
    goal: Convertir Cycle Detail en el cockpit del MVP y alinear la implementacion con la arquitectura UX definida.
    retrospective:
      went_well:
        - Ya existe la ruta dinamica del detalle y parte del contexto del ciclo.
        - El mock de settlement cycles sirve para testear decisiones de UX.
      to_improve:
        - Persisten placeholders separados que fragmentan la experiencia.
        - Faltan estados del dominio y evidencia operativa mas profunda.
      action_items:
        - Integrar modulos operativos dentro de Cycle Detail.
        - Resolver la inconsistencia de navegacion del shell.
        - Completar el modelado del dominio base.
    notes: Sprint activo centrado en cockpit y dominio.
  - number: 3
    status: planned
    goal: Pasar de prototipo a flujo funcional con clearing intake, reserva y issuance controlada.
    retrospective:
      went_well: []
      to_improve: []
      action_items:
        - Implementar persistencia y alta de ciclos.
        - Conectar reserve snapshot con datos reales.
        - Habilitar issuance authorization y sus validaciones.
    notes: Primer sprint de funcionalidad real.
  - number: 4
    status: planned
    goal: Ejecutar settlement XRPL end to end con pagos, parciales, reconciliacion y manejo de exceptions.
    retrospective:
      went_well: []
      to_improve: []
      action_items:
        - Implementar inbound y outbound payments.
        - Construir matching deterministico.
        - Integrar resolution workflow de exceptions.
    notes: Sprint core del PoC.
  - number: 5
    status: planned
    goal: Cerrar el PoC con redemption, reporting, auditabilidad y hardening del MVP.
    retrospective:
      went_well: []
      to_improve: []
      action_items:
        - Implementar close seguro del ciclo.
        - Exportar reportes y evidencia audit.
        - Agregar autenticacion y pruebas minimas.
    notes: Sprint de cierre y demo final.

metrics:
  release_target: MVP PoC en 5 sprints
  current_focus: Alinear arquitectura MVP y dejar el dominio listo para dejar atras los mocks
  risks:
    - La UX y el PRD estan mas maduros que la logica funcional real.
    - No existe backend, persistencia ni integracion XRPL todavia.
    - La arquitectura actual dispersa modulos que deberian vivir en Cycle Detail.
  success_indicators:
    - Dashboard, list y detail navegan sin friccion.
    - Cycle Detail se convierte en el centro real del MVP.
    - El flujo clearing a close puede demostrarse de punta a punta.
    - Las reglas criticas del PRD quedan implementadas y testeadas.

policies:
  data_structure:
    description: Guia para mantener la planificacion Scrum consistente con el estado real del proyecto.
    user_stories:
      - Campo obligatorio id con formato US-XXX.
      - Cada story debe tener sprint o null para backlog.
      - El estado de la story se deriva de sus tasks.
      - Las historias mayores a 13 puntos deben dividirse.
    tasks:
      - Campo obligatorio id con formato TASK-XXX.
      - Todas las tasks deben tener parent valido.
      - Cada task debe estimarse en 8 horas o menos.
      - El sprint se hereda de la user story padre.
    bugs:
      - Campo obligatorio id con formato BUG-XXX.
      - Los bugs high entran al sprint activo si afectan el MVP.
      - Los bugs medium se priorizan sin romper el objetivo del sprint salvo riesgo de demo.
    scrum_rules:
      - La fuente de verdad funcional es el PRD mas evidencia en codigo.
      - No contar un placeholder como feature terminada.
      - No abrir nuevas pantallas si el MVP pide consolidacion en Cycle Detail.
      - Todo cambio de alcance debe reflejarse en backlog, sprint y criterios de aceptacion.
  instructions:
    - Revisar PRD y UX antes de crear nuevas historias.
    - Mantener trazabilidad entre historias, codigo y riesgos detectados.
    - Favorecer incrementos verticales que cierren un flujo operativo real.
    - Tratar la deuda de arquitectura MVP como prioridad de producto, no como detalle cosmetico.
  definition_of_ready:
    - Historia con problema, valor y usuario explicitos.
    - Criterios de aceptacion verificables.
    - Dependencias identificadas.
    - Datos o mocks necesarios disponibles.
    - Diseno tecnico acordado si supera 8 puntos.
  definition_of_done:
    - Criterios de aceptacion cumplidos.
    - UI o logica alineada con el PRD y el sitemap MVP.
      - Sin placeholders enganiosos para marcar una historia como terminada.
    - Codigo integrado y revisado en el repo.
    - Riesgos y deuda residual documentados si aplican.
  bug_severity_criteria:
    critical: Caida del sistema, perdida de datos o riesgo de seguridad.
    high: Rompe flujo MVP principal o contradice una regla critica del PRD.
    medium: Deteriora UX, navegacion o consistencia operativa con workaround.
    low: Ajuste visual o copy sin impacto funcional relevante.
  bug_policy:
    critical: immediate_hotfix_no_sprint_planning
    high: enters_current_sprint_removes_story_if_needed
    medium: next_sprint_or_current_if_blocks_demo
    low: backlog_prioritized_with_stories
  estimation_guidelines:
    story_points: Fibonacci 1 2 3 5 8 13 21
    reference: 5 puntos equivale a una semana de trabajo de una persona senior
    max_story_size: 13
    task_hours: Maximo 8 horas por task
`;

// Note: projectData is parsed in scrum-report.html from projectYAML
// This file only exports the raw YAML string
