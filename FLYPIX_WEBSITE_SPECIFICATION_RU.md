# FlyPix AI — полная спецификация маркетингового сайта

**Версия:** 2.0  
**Дата:** 14 июля 2026  
**Статус:** основная спецификация для UX, copywriting, дизайна и разработки  
**Язык сайта:** English  
**Язык документа:** Russian

---

## 1. Назначение

Этот документ описывает сайт FlyPix AI так, как если бы он создавался с нуля. Он является единым blueprint для команды продукта, копирайтера, дизайнера и разработчика.

Документ определяет:

- продуктовую логику сайта;
- полное дерево страниц;
- структуру верхнего меню и footer;
- очередность блоков на каждой странице;
- готовые английские тексты основных экранов;
- CTA и пользовательские переходы;
- шаблоны для отраслевых и use-case страниц;
- поведение desktop и mobile интерфейса;
- требования к анимации, 3D, accessibility, SEO и аналитике;
- связь сайта с отдельной дизайн-системой.

Тексты в фигурных скобках, например `{active_user_count}`, являются управляемыми значениями. Перед публикацией они заменяются подтверждёнными данными из единого источника.

---

## 2. Что представляет собой FlyPix AI

### Категория продукта

FlyPix AI is a no-code geospatial AI platform for detecting, monitoring, inspecting, classifying, and measuring objects and change across satellite, aerial, and drone imagery.

### Продуктовая схема

1. Пользователь загружает или получает geospatial imagery.
2. Выбирает готовую модель или размечает несколько примеров для собственной модели.
3. Запускает detection, segmentation, classification или change analysis.
4. Проверяет результат на интерактивной карте.
5. Измеряет, сравнивает, комментирует и экспортирует georeferenced data.

### Основные аудитории

- GIS and geospatial teams;
- earth observation analysts;
- drone operators and surveyors;
- inspection and operations teams;
- construction, agriculture, energy, mining, port and environmental teams;
- government and public-sector organizations;
- risk and insurance teams;
- enterprise buyers and integration partners;
- researchers and universities.

### Главные конверсии

1. Создать аккаунт и открыть продукт через `Try Now`.
2. Выбрать тариф.
3. Отправить квалифицированную заявку через `Contact Sales` или `Talk to an Expert`.
4. Запросить data sourcing или custom geospatial project.

---

## 3. Отдельная дизайн-система

Дизайн-система является отдельным документом и отдельной Figma library. Она не заменяет эту спецификацию и не дублирует её.

### Разделение ответственности

**Эта спецификация отвечает на вопросы:**

- какие страницы существуют;
- что написано на каждой странице;
- в каком порядке расположены блоки;
- куда ведут CTA;
- как работают меню, формы, фильтры и анимации;
- какой контент нужен для каждого компонента.

**Дизайн-система отвечает на вопросы:**

- какие используются цвета, размеры и отступы;
- как устроена типографика Sora;
- как выглядят кнопки, карточки, меню, формы и состояния;
- какие существуют сетки и responsive rules;
- как применяются иконки, изображения, bounding boxes и 3D;
- какие motion tokens и accessibility rules обязательны.

### Когда нужна дизайн-система

Информационную архитектуру и тексты можно утвердить до дизайн-системы. До начала high-fidelity дизайна и финального кодирования должна существовать хотя бы Design System v0.1.

### Минимальный состав Design System v0.1

#### Foundations

- Color tokens: brand green, graphite, gray scale, white, semantic colors.
- Typography: Sora display, heading, body, label, caption and numeric styles.
- Spacing scale.
- Desktop and mobile grid.
- Breakpoints.
- Border, radius and shadow tokens.
- Iconography rules.
- Imagery treatment.
- Detection overlays: bounding boxes, masks, labels, confidence and change states.
- Motion duration, delay and easing tokens.

#### Components

- Logo and brand lockups.
- Primary, secondary, tertiary and text buttons.
- Header, mega menu, mobile drawer and sticky state.
- Section heading.
- Feature card.
- Use-case card.
- Industry card.
- Metric card.
- Testimonial card.
- Partner/customer logo strip.
- Tabs, filter chips, accordion and sidebar navigation.
- Workflow step.
- Pricing card and comparison table.
- Input, select, textarea, checkbox and form messages.
- Modal and tooltip.
- Blog/article card.
- Breadcrumbs and pagination.
- Footer.
- Cookie consent.

#### States

- default;
- hover;
- focus;
- pressed;
- active;
- selected;
- loading;
- empty;
- success;
- warning;
- error;
- disabled.

Если готовая дизайн-система будет предоставлена отдельно, разработка использует её tokens и components. Если её не будет, Design System v0.1 создаётся как первый этап проекта на основе утверждённых цветов, Sora и Figma-направления.

---

## 4. Глобальная структура сайта

### Верхнее меню

```text
Product
Solutions
Services
Pricing
Resources
Company
                         Log in   [ Try Now ]
```

`Pricing` — самостоятельный пункт первого уровня.  
`Log in` — вход для существующего пользователя.  
`Try Now` — единственный основной продуктовый CTA в header.  
Пункта `Join` в меню нет.

### Product menu

**Overview**

- Platform Overview
- How It Works

**Capabilities**

- Object Detection & Localization
- Custom AI Model Training
- Change & Anomaly Detection
- Segmentation & Classification
- Measurement & Analytics
- Collaboration & Sharing

**Data & Integration**

- Supported Data
- Data Market
- Integrations & API

### Solutions menu

**Use Cases**

- GeoAI Workflows
- Earth Observation
- Drone Mapping
- Asset & Site Inspection
- Change Monitoring
- Geospatial Modeling
- Compliance Reporting

**Industries**

- Government
- Construction
- Renewable Energy
- Agriculture & Farming
- Risk & Insurance
- Oil & Gas
- Forestry & Environment
- Port Operations
- Mining
- Smart Cities
- View All Industries

### Services menu

- Services Overview
- Custom Geospatial Projects
- Data Sourcing & Acquisition

### Resources menu

- Customer Stories
- Blog
- News
- FAQ
- Documentation — только при наличии поддерживаемой документации

### Company menu

- About FlyPix AI
- Partners
- Careers
- Contact

### Mobile menu

- Полноэкранный drawer.
- Product, Solutions, Services, Resources и Company раскрываются как accordion.
- В один момент открыт один accordion.
- `Log in` расположен над основной кнопкой.
- `Try Now` закреплён в нижней части drawer.
- Меню полностью управляется клавиатурой и закрывается клавишей Escape.

### Поведение header

- На верхней позиции header прозрачный или совпадает с Hero background.
- После 80 px прокрутки становится компактнее и получает полупрозрачный фон.
- Header остаётся sticky.
- Открытый mega menu закрывается по Escape, клику за пределами и переходу на страницу.
- Hover не является единственным способом открыть dropdown.

---

## 5. Полное дерево страниц

```text
/
├── /platform/
│   ├── /platform/object-detection/
│   ├── /platform/custom-model-training/
│   ├── /platform/change-detection/
│   ├── /platform/segmentation-classification/
│   ├── /platform/analytics-collaboration/
│   └── /platform/integrations-api/
├── /supported-data/
├── /use-cases/
│   ├── /use-cases/geoai-software/
│   ├── /use-cases/earth-observation-software/
│   ├── /use-cases/drone-mapping-software/
│   ├── /use-cases/asset-site-inspection/
│   ├── /use-cases/change-monitoring/
│   ├── /use-cases/geospatial-modeling-software/
│   └── /use-cases/compliance-reporting-software/
├── /industries/
│   ├── /industries/government/
│   ├── /industries/construction/
│   ├── /industries/renewable-energy/
│   ├── /industries/agriculture/
│   ├── /industries/risk-insurance/
│   ├── /industries/oil-gas/
│   ├── /industries/forestry-environment/
│   ├── /industries/port-operations/
│   ├── /industries/mining/
│   └── /industries/smart-cities/
├── /services/
│   ├── /services/custom-geospatial-projects/
│   └── /services/data-sourcing/
├── /pricing/
│   └── /pricing/credits/
├── /customers/
├── /resources/
│   ├── /blog/
│   ├── /news/
│   └── /faq/
├── /company/
│   ├── /partners/
│   ├── /careers/
│   └── /contact/
└── /legal/
    ├── /privacy-policy/
    ├── /data-privacy/
    ├── /terms/
    └── /imprint/
```

---

## 6. Система CTA

| Задача | CTA | Стиль | Destination |
|---|---|---|---|
| Открыть продукт | `Try Now` | Primary | Registration/product sandbox |
| Войти | `Log in` | Text or secondary | Product login |
| Enterprise-запрос | `Contact Sales` | Secondary | Qualified contact form |
| Обсудить сложный workflow | `Talk to an Expert` | Secondary | Expert contact form |
| Общая связь | `Contact Us` | Secondary | Contact page |
| Изучить продукт | `Explore the Platform` | Text link | Platform page |
| Изучить отрасли | `View All Industries` | Text link | Industries hub |
| Изучить сценарии | `View All Use Cases` | Text link | Use Cases hub |
| Сравнить тарифы | `Compare Plans` | Text link | Pricing |

На одном экране одновременно используются максимум один primary и один secondary CTA.

---

## 7. Главная страница

**URL:** `/`  
**Цель:** объяснить продукт, показать workflow и доказательства, затем направить пользователя в продукт, Pricing, Use Cases или Contact.

### Блок 1. Header

Используется глобальный header из раздела 4.

### Блок 2. Hero

**Eyebrow**  
`GEOSPATIAL AI PLATFORM`

**H1**  
`AI agents for geospatial imagery`

**Supporting text**  
`Detect objects, monitor change, and inspect sites at scale—without building your own AI stack.`

**Primary CTA**  
`Try Now`

**Secondary CTA**  
`Contact Us`

**Подпись рядом с иконками спутника, самолёта и дрона**  
`Built for satellite, aircraft, and drone imagery`

**Metric block**

- Heading: `Fast and precise`
- Value: `{time_saved_percent}`
- Label: `less time spent on repetitive visual review`
- Supporting copy: `AI-assisted detection turns dense imagery and large areas into reviewable results in seconds.`

**User proof card**

- Copy: `Join {active_user_count} geospatial professionals using FlyPix AI.`
- Primary: `Try Now`
- Secondary: `See Customer Stories`

**Visual**

- Светлая 3D Earth.
- Мягкое автоматическое вращение.
- Орбиты и спутники.
- Самолёт и дрон показывают разные уровни съёмки.
- При скролле камера приближается к выбранной территории.
- На следующем этапе поверхность превращается в реальное изображение с bounding boxes или segmentation masks.

### Блок 3. Trust strip

**Label**  
`BACKED BY AND WORKING WITH`

Показываются подтверждённые логотипы. Accelerator/program logos и customer logos визуально разделяются и получают корректные подписи.

### Блок 4. Основная ценность

**Eyebrow**  
`FROM IMAGERY TO INSIGHT`

**H2**  
`See more. Review less. Act faster.`

**Body**  
`FlyPix AI automates repetitive visual analysis so geospatial teams can focus on verification, decisions, and action.`

**Три карточки**

1. **Detect**  
   `Find, outline, locate, and count objects across dense scenes or large areas.`
2. **Monitor**  
   `Compare repeated captures and identify what appeared, moved, disappeared, or changed.`
3. **Inspect**  
   `Review sites and assets remotely, then prioritize where human attention is needed.`

### Блок 5. Интерактивный product workflow

**Eyebrow**  
`ONE CONNECTED WORKFLOW`

**H2**  
`From raw imagery to actionable results`

**Body**  
`Build and run a geospatial AI workflow without writing code, then review, measure, and export the results your team needs.`

**Шаги**

1. **Bring your imagery**  
   `Upload satellite, aerial, or drone data, or source imagery through the FlyPix Data Market.`
2. **Label what matters**  
   `Mark a small set of examples or start with an available FlyPix AI model.`
3. **Train and analyze**  
   `Run detection, segmentation, classification, or change analysis across the full area of interest.`
4. **Review and refine**  
   `Inspect results on an interactive map, validate detections, and improve the model when needed.`
5. **Share and export**  
   `Collaborate with your team and export georeferenced results into downstream workflows.`

**CTA**  
`See How the Platform Works`

### Блок 6. Возможности платформы

**Eyebrow**  
`PLATFORM CAPABILITIES`

**H2**  
`One platform for the full analysis workflow`

**Body**  
`Detect what is present, understand how it changes, and turn the result into geospatial data your team can use.`

**Карточки**

1. **Object detection & localization**  
   `Find, outline, count, and locate objects across imagery in a single workflow.`
2. **Custom AI model training**  
   `Train a model for the objects and conditions unique to your project—without writing code.`
3. **Change & anomaly detection**  
   `Compare captures over time and surface meaningful differences automatically.`
4. **Segmentation & classification**  
   `Turn imagery into structured land-cover, surface, asset, or object classes.`
5. **Measurement & analytics**  
   `Calculate counts, areas, sizes, distances, and other properties from detected features.`
6. **Collaboration & export**  
   `Review results together and move georeferenced outputs into existing GIS workflows.`

**CTA**  
`Explore the Platform`

### Блок 7. Supported Data

**Eyebrow**  
`SUPPORTED DATA`

**H2**  
`Work with the imagery your project requires`

**Body**  
`Analyze data captured from space, aircraft, or drones in one consistent workspace.`

**Карточки**

1. **Satellite imagery**  
   `Monitor large or remote areas with repeat coverage and a wide range of spatial resolutions.`
2. **Aerial imagery**  
   `Analyze high-resolution regional and urban captures for mapping, planning, inspection, and risk workflows.`
3. **Drone imagery**  
   `Inspect localized sites and assets with detailed, on-demand captures.`

**Data-type line**  
`RGB · Multispectral · Hyperspectral · LiDAR · SAR`

**CTA**  
`See Supported Data`

### Блок 8. Use Cases

**Eyebrow**  
`USE CASES`

**H2**  
`Start with the outcome, not the model`

**Body**  
`Automate the geospatial tasks that slow down inspection, monitoring, mapping, modeling, and reporting.`

**Карточки**

- Detect and count objects
- Monitor change over time
- Inspect sites and infrastructure
- Classify land cover and surfaces
- Map drone captures
- Build geospatial models
- Create compliance evidence
- Train a custom model

**CTA**  
`View All Use Cases`

### Блок 9. Industries

**Eyebrow**  
`INDUSTRIES`

**H2**  
`Built around the decisions your industry makes`

**Body**  
`Apply the same geospatial AI workflow to the assets, risks, and operating conditions that matter in your sector.`

На главной показываются шесть карточек:

- Construction
- Agriculture & Farming
- Renewable Energy
- Government
- Mining
- Risk & Insurance

**CTA**  
`View All Industries`

### Блок 10. Why FlyPix AI

**Eyebrow**  
`WHY FLYPIX AI`

**H2**  
`Geospatial AI your team can put to work`

**Преимущества**

1. **No code required**  
   `Domain experts can train and run analysis workflows without building an ML stack.`
2. **Built for geospatial data**  
   `Work across satellite, aerial, and drone imagery instead of adapting a generic vision tool.`
3. **Custom to your objects**  
   `Train models for the features, assets, and conditions specific to your operations.`
4. **Designed to scale**  
   `Analyze dense scenes, wide corridors, and large areas of interest with a repeatable workflow.`
5. **Fits existing workflows**  
   `Export georeferenced results and connect them to the tools your team already uses.`

### Блок 11. Customer Stories

**Eyebrow**  
`CUSTOMER STORIES`

**H2**  
`How teams turn imagery into decisions`

**Body**  
`See how organizations use FlyPix AI across industrial, research, environmental, and land-management workflows.`

Показываются три подтверждённых отзыва с именем, ролью, компанией, страной и фотографией/логотипом.

**CTA**  
`Read Customer Stories`

### Блок 12. Services

**Eyebrow**  
`SERVICES`

**H2**  
`More than software when your workflow needs it`

**Body**  
`Use the platform independently, work with our team on a custom geospatial project, or source the imagery required for your analysis.`

**Карточки**

1. **FlyPix AI Platform**  
   `Run no-code geospatial analysis with your own team and data.`
2. **Custom Geospatial Projects**  
   `Build a tailored model, feature, integration, or output with FlyPix specialists.`
3. **Data Sourcing & Acquisition**  
   `Source satellite, aerial, or drone imagery for your resolution, coverage, and licensing needs.`

**CTA**  
`Explore Services`

### Блок 13. Pricing preview

**Eyebrow**  
`PRICING`

**H2**  
`Start with the workload you have today`

**Body**  
`Choose a plan based on processing volume, storage, collaboration, and support—then scale as your projects grow.`

Показываются четыре компактные карточки: Starter, Standard, Advanced, Enterprise. Данные берутся из единого pricing source.

**CTA**  
`Compare Plans`

### Блок 14. Resources

**Eyebrow**  
`RESOURCES`

**H2**  
`Learn what geospatial AI can do in practice`

Показываются три редакционно выбранных материала:

- один product guide;
- один industry/use-case guide;
- одна новость FlyPix AI.

**CTA**  
`Explore Resources`

### Блок 15. FAQ

**H2**  
`Questions about FlyPix AI`

1. `What is FlyPix AI?`
2. `Do I need coding or machine-learning experience?`
3. `What imagery and data types can I use?`
4. `Can I train a model for my own objects?`
5. `Can FlyPix AI compare imagery captured at different times?`
6. `How can I export or share the results?`
7. `How do credits work?`
8. `Can FlyPix AI support an enterprise or custom deployment?`

### Блок 16. Final CTA

**Eyebrow**  
`START YOUR FIRST ANALYSIS`

**H2**  
`Turn your geospatial imagery into actionable results`

**Body**  
`Create an account and explore FlyPix AI with your own data, or talk to our team about a custom workflow.`

**Primary CTA**  
`Try Now`

**Secondary CTA**  
`Talk to an Expert`

### Блок 17. Footer

Используется глобальный footer из раздела 20.

---

## 8. Platform Overview

**URL:** `/platform/`

### Hero

**Eyebrow**  
`FLYPIX AI PLATFORM`

**H1**  
`Turn geospatial imagery into actionable intelligence`

**Body**  
`Detect objects, train custom models, monitor change, and analyze results across satellite, aerial, and drone imagery—without building your own AI infrastructure.`

**CTA**  
`Try Now` / `See How It Works`

### Очередность блоков

1. Hero with real product workspace.
2. Trust strip.
3. `Everything you need to analyze geospatial imagery` — six capability cards.
4. `From data to decision in five steps` — upload, label, train, review, export.
5. `Train for the objects your project actually needs` — custom model section.
6. `Detect change, not just objects` — time comparison visual.
7. `From a dense scene to a wide area of interest` — scale comparison.
8. `Review the result in context` — maps, measurements and dashboards.
9. `Work with the data you already use` — sources and sensors.
10. `Connect insights to your existing workflow` — export/integrations.
11. Customer proof.
12. Related use cases.
13. FAQ.
14. Final CTA.

### Capability cards

Используются тексты блока 6 главной страницы. Каждая карточка ведёт на собственную feature page.

### Workflow copy

**H2**  
`From data to decision in five steps`

**Body**  
`A no-code workflow designed for geospatial experts, operations teams, and decision-makers—not only data scientists.`

Шаги совпадают с product workflow главной страницы, но дополняются реальными UI screenshots.

---

## 9. Feature pages

### Общий порядок блоков

1. Hero.
2. Real product visual.
3. User problem.
4. Key capabilities.
5. How it works.
6. Relevant data.
7. Outputs and export.
8. Related use cases.
9. Customer proof.
10. FAQ.
11. Final CTA.

### Object Detection & Localization

**URL:** `/platform/object-detection/`  
**Eyebrow:** `OBJECT DETECTION`  
**H1:** `Detect and locate the objects that matter`  
**Body:** `Find, outline, classify, count, and geolocate objects across dense imagery or large areas of interest.`

**Capabilities**

- Bounding-box detection
- Object segmentation
- Counting and density analysis
- Geospatial localization
- Object properties and measurements
- Batch analysis across large imagery

### Custom AI Model Training

**URL:** `/platform/custom-model-training/`  
**Eyebrow:** `CUSTOM AI MODELS`  
**H1:** `Train AI models for your own objects`  
**Body:** `Label a small number of examples and build a model tailored to the features, assets, and conditions in your imagery—without writing code.`

**Capabilities**

- Smart annotation
- Private models
- Training metrics
- Model refinement
- Reusable model library
- Team annotation workflows

### Change & Anomaly Detection

**URL:** `/platform/change-detection/`  
**Eyebrow:** `CHANGE DETECTION`  
**H1:** `See what changed between captures`  
**Body:** `Compare imagery from different dates and identify new, moved, damaged, missing, or anomalous features across an area of interest.`

**Capabilities**

- Time-based image comparison
- Object-level change
- Area and land-cover change
- Anomaly highlighting
- Change measurement
- Reviewable change layers

### Segmentation & Classification

**URL:** `/platform/segmentation-classification/`  
**Eyebrow:** `SEGMENTATION & CLASSIFICATION`  
**H1:** `Turn imagery into structured classes`  
**Body:** `Segment land, water, vegetation, surfaces, and assets into consistent categories for mapping, monitoring, and reporting.`

**Capabilities**

- Pixel-level segmentation
- Land-cover classification
- Surface classification
- Custom class definitions
- Area statistics
- Exportable class layers

### Analytics & Collaboration

**URL:** `/platform/analytics-collaboration/`  
**Eyebrow:** `ANALYTICS & COLLABORATION`  
**H1:** `Measure, review, and share geospatial results`  
**Body:** `Turn model outputs into maps, measurements, dashboards, and shared project decisions.`

**Capabilities**

- Interactive maps
- Counts, areas, lengths and distances
- Heatmaps and summaries
- Shared projects
- Roles and access control
- Map and vector export

### Integrations & API

**URL:** `/platform/integrations-api/`  
**Eyebrow:** `INTEGRATIONS & API`  
**H1:** `Move AI results into your existing workflow`  
**Body:** `Connect FlyPix AI outputs to the GIS, analytics, reporting, and operational tools your team already uses.`

Показываются только технически подтверждённые integrations, API methods, export formats и deployment options.

---

## 10. Use Cases Hub

**URL:** `/use-cases/`

### Hero

**Eyebrow**  
`USE CASES`

**H1**  
`Start with the geospatial task you need to automate`

**Body**  
`Explore repeatable workflows for detection, monitoring, inspection, mapping, modeling, and reporting across geospatial imagery.`

### Очередность блоков

1. Hero.
2. Filters: outcome, data source, industry.
3. Use-case card grid.
4. How FlyPix AI works across use cases.
5. Related industries.
6. Customer proof.
7. CTA.

### Карточки

1. **GeoAI Workflows** — `Add an AI layer to geospatial analysis without building a custom ML stack.`
2. **Earth Observation** — `Monitor large areas and repeated acquisitions across remote-sensing sources.`
3. **Drone Mapping** — `Turn detailed UAV captures into maps, measurements, and detected features.`
4. **Asset & Site Inspection** — `Review infrastructure and site conditions remotely and prioritize field work.`
5. **Change Monitoring** — `Surface what appeared, moved, disappeared, or changed between captures.`
6. **Geospatial Modeling** — `Combine detected features and spatial layers into decision-ready models.`
7. **Compliance Reporting** — `Create consistent, georeferenced evidence for review and reporting.`

### Общий шаблон use-case page

1. Hero.
2. Problem statement.
3. Desired outputs.
4. Six capabilities.
5. Four-step workflow.
6. Supported data.
7. Relevant industries.
8. Why FlyPix AI.
9. Customer proof.
10. FAQ.
11. Final CTA.

### Тексты detail pages

| Page | H1 | Supporting text |
|---|---|---|
| GeoAI Workflows | `Put AI inside your geospatial workflow` | `Train detection, segmentation, and change models in the browser, then move decision-ready results into your GIS.` |
| Earth Observation | `Monitor the Earth from global to local` | `Combine satellite, aerial, and drone imagery to detect features and track change across every area of interest.` |
| Drone Mapping | `Turn every flight into actionable data` | `Analyze UAV captures to detect, classify, count, measure, and compare the features your mission cares about.` |
| Asset & Site Inspection | `Inspect every site from above` | `Use aerial and satellite imagery to identify visible damage, risk, change, and maintenance priorities across distributed assets.` |
| Change Monitoring | `Know what changed—and where` | `Compare repeated captures and turn visual differences into georeferenced change layers your team can review and act on.` |
| Geospatial Modeling | `Model the world as a living map` | `Combine imagery, detected features, and spatial layers into models for planning, risk, suitability, and scenario analysis.` |
| Compliance Reporting | `Turn imagery into audit-ready evidence` | `Run consistent visual checks across sites and organize georeferenced findings for review, reporting, and audit workflows.` |

---

## 11. Industries Hub

**URL:** `/industries/`

### Hero

**Eyebrow**  
`INDUSTRIES`

**H1**  
`Geospatial AI built for the way your industry works`

**Body**  
`Use satellite, aerial, and drone imagery to monitor assets, identify change, reduce manual inspection, and make faster operational decisions.`

**CTA**  
`Try Now` / `Talk to an Expert`

### Desktop layout

- Sticky sidebar 240–280 px.
- Все отрасли отображаются в одной последовательной странице.
- Active item меняется при прокрутке.
- У каждой секции собственный hash.
- В конце секции расположена ссылка `Explore [Industry]`.

### Mobile layout

- Sidebar заменяется sticky select `Choose an industry`.
- Все отраслевые секции остаются в HTML.
- Переход к секции учитывает высоту sticky header.

### Sidebar items

1. Government
2. Construction
3. Renewable Energy
4. Agriculture & Farming
5. Risk & Insurance
6. Oil & Gas
7. Forestry & Environment
8. Port Operations
9. Mining
10. Smart Cities

### Industry sections

#### Government

`Use geospatial imagery to monitor public assets, assess environmental conditions, support emergency response, and prioritize field operations across large territories.`

- Waste and debris detection
- Road and pavement inspection
- Urban planning and infrastructure monitoring
- Disaster assessment and emergency response
- Environmental compliance and land-use monitoring
- Public asset oversight

#### Construction

`Track site progress, inspect materials and assets, identify safety risks, and compare changing site conditions without relying only on manual field visits.`

- Remote site inspection
- Progress tracking
- Material and equipment detection
- Safety and hazard identification
- Quality and defect review
- Asset utilization monitoring

#### Renewable Energy

`Monitor solar, wind, grid, and corridor assets; identify visible damage or change; and support site selection and environmental assessment.`

- Solar panel and wind-turbine monitoring
- Power-line and corridor inspection
- Damage and anomaly detection
- Site selection
- Vegetation and land-use monitoring
- Environmental impact assessment

#### Agriculture & Farming

`Analyze crops, fields, soil conditions, and livestock from above to focus scouting and treatment where they are needed most.`

- Crop scouting and counting
- Weed, pest, and disease mapping
- Crop-health and stress monitoring
- Soil moisture and nutrient assessment
- Yield and harvest planning
- Livestock detection and monitoring

#### Risk & Insurance

`Turn aerial and satellite imagery into consistent property and infrastructure evidence for inspection, exposure assessment, and claims workflows.`

- Roof condition and material assessment
- Property exposure mapping
- Natural-disaster risk assessment
- Post-event damage review
- Infrastructure risk monitoring
- Portfolio and supply-chain monitoring

#### Oil & Gas

`Monitor distributed assets and corridors, identify visible signs of spills or damage, and track environmental change across operating areas.`

- Pipeline and corridor monitoring
- Leak and spill detection
- Rig, refinery, and storage inspection
- Unauthorized activity detection
- Environmental compliance monitoring
- Exploration and site assessment

#### Forestry & Environment

`Monitor forest cover, habitats, wildlife, water, and pollution across repeated captures and large conservation areas.`

- Tree counting and classification
- Deforestation and illegal-logging detection
- Wildlife detection and population monitoring
- Waste and pollution mapping
- Biodiversity and wetland monitoring
- Climate and land-cover assessment

#### Port Operations

`Use overhead imagery to understand vessel, container, equipment, security, and infrastructure conditions across complex port environments.`

- Vessel detection and traffic monitoring
- Container and cargo tracking
- Yard utilization analysis
- Restricted-zone and security monitoring
- Pier, crane, and warehouse inspection
- Change and maintenance monitoring

#### Mining

`Monitor pits, haul roads, stockpiles, equipment, and environmental change while reducing the need for manual inspection in hazardous areas.`

- Open-pit and bench monitoring
- Haul-road condition detection
- Stockpile and excavation measurement
- Equipment and activity tracking
- Safety and compliance monitoring
- Environmental impact assessment

#### Smart Cities

`Convert city-scale imagery into structured information for planning, maintenance, mobility, environmental services, and public-asset management.`

- Building and land-use mapping
- Waste and debris detection
- Road and infrastructure monitoring
- Traffic and mobility analysis
- Urban change detection
- Energy and sustainability monitoring

---

## 12. Industry detail pages

### Общий порядок блоков

1. Industry eyebrow.
2. Outcome-led H1 and supporting copy.
3. `Try Now` / `Talk to an Expert`.
4. Three key outcomes.
5. Industry-specific visual.
6. Four to six workflows.
7. Relevant platform capabilities.
8. Relevant data sources.
9. Five-step FlyPix workflow.
10. Customer story.
11. Related use cases.
12. FAQ.
13. Final CTA.

### Hero texts

| Industry | H1 | Supporting text |
|---|---|---|
| Government | `Monitor public assets and territories at scale` | `Turn satellite, aerial, and drone imagery into consistent evidence for infrastructure, environment, planning, and emergency-response workflows.` |
| Construction | `See site progress and risk from above` | `Detect materials, assets, hazards, defects, and visible change across construction sites without relying only on manual inspections.` |
| Renewable Energy | `Monitor renewable-energy assets across every site` | `Inspect solar, wind, grid, and corridor infrastructure, track visible change, and support better maintenance and site decisions.` |
| Agriculture | `Turn field imagery into focused action` | `Detect crops, weeds, disease signals, livestock, and field variation so teams can prioritize scouting and treatment.` |
| Risk & Insurance | `Build consistent property and exposure insight` | `Use aerial and satellite imagery to assess roofs, assets, hazards, and post-event conditions across individual sites or portfolios.` |
| Oil & Gas | `Monitor distributed energy assets from above` | `Track pipelines, facilities, spills, visible damage, unauthorized activity, and environmental change across operating areas.` |
| Forestry & Environment | `Monitor ecosystems across space and time` | `Detect forest loss, classify vegetation, count wildlife, and track water, waste, pollution, and habitat change.` |
| Port Operations | `Understand movement and condition across the port` | `Detect vessels, containers, equipment, restricted-zone activity, and infrastructure change across complex port environments.` |
| Mining | `Inspect the whole operation from above` | `Monitor pits, haul roads, stockpiles, equipment, hazards, and environmental change across the mining lifecycle.` |
| Smart Cities | `Turn city imagery into operational insight` | `Map buildings and land use, monitor infrastructure and waste, and identify urban change across large municipal areas.` |

---

## 13. Services

**URL:** `/services/`

### Hero

**Eyebrow**  
`SERVICES`

**H1**  
`Geospatial AI support for the workflow you need`

**Body**  
`Use FlyPix AI independently, work with our team on a custom analysis project, or source imagery matched to your coverage and resolution requirements.`

**CTA**  
`Contact Us` / `Try Now`

### Очередность блоков

1. Hero.
2. Three service options.
3. Who each service is for.
4. Engagement process.
5. Example deliverables.
6. Customer proof.
7. FAQ.
8. Final contact CTA.

### Service options

#### FlyPix AI Platform

`Build and run no-code geospatial analysis workflows with your own data, models, team, and outputs.`

CTA: `Explore the Platform`

#### Custom Geospatial Projects

`Work with FlyPix specialists on custom model training, feature development, tailored analytics, integration, reporting, or deployment.`

CTA: `Discuss Your Project`

#### Data Sourcing & Acquisition

`Source satellite, aerial, or drone imagery selected for the required area, resolution, revisit frequency, quality, and license.`

CTA: `Source Imagery`

### Engagement process

1. **Discover** — `Define the operational question, area, data, and expected output.`
2. **Scope** — `Confirm the workflow, technical requirements, deliverables, timeline, and responsibilities.`
3. **Deliver** — `Configure the platform, source data, train models, or build the required solution.`
4. **Operate** — `Run, review, improve, and scale the workflow with the required level of support.`

---

## 14. Pricing

**URL:** `/pricing/`

### Hero

**Eyebrow**  
`PRICING`

**H1**  
`Plans that scale with your geospatial workload`

**Body**  
`Choose the processing, storage, collaboration, and support level your team needs. Add credits or move to a larger plan as your projects grow.`

### Очередность блоков

1. Hero.
2. Billing toggle, если применимо.
3. Four plan cards.
4. Feature comparison.
5. Credits explainer.
6. Processing calculator.
7. Enterprise section.
8. FAQ.
9. Final CTA.

### Plan positioning

#### Starter

**For:** `Individuals and small projects starting with geospatial AI.`  
**CTA:** `Try Now`

#### Standard

**For:** `Teams running recurring analysis and collaborative projects.`  
**CTA:** `Choose Standard`

#### Advanced

**For:** `Organizations with larger workloads, advanced controls, and integration needs.`  
**CTA:** `Choose Advanced`

#### Enterprise

**For:** `Organizations requiring custom scale, support, security, deployment, or commercial terms.`  
**CTA:** `Contact Sales`

### Данные plan card

- price;
- billing period;
- seats;
- storage;
- credits;
- approximate gigapixels;
- analytics features;
- sharing and access;
- export and API;
- support;
- included AI tools.

Все тарифные значения поступают из одного data object и не копируются вручную между страницами.

### Credits explainer

**H2**  
`Understand what your credits can process`

**Body**  
`Credits are used for AI processing. The ground area represented by the same number of pixels changes with image resolution, so processing capacity is shown in pixels first and estimated square kilometers second.`

Калькулятор принимает:

- imagery source;
- resolution;
- area or pixel count;
- selected workflow;
- estimated number of runs.

Результат помечается как estimate.

---

## 15. Supported Data

**URL:** `/supported-data/`

### Hero

**Eyebrow**  
`SUPPORTED DATA`

**H1**  
`Bring the right view of every area`

**Body**  
`Analyze satellite, aerial, and drone imagery across a range of resolutions, sensors, and coverage needs.`

### Очередность блоков

1. Hero.
2. Satellite / Aerial / Drone cards.
3. Source comparison table.
4. RGB / Multispectral / Hyperspectral / LiDAR / SAR.
5. File formats and technical limits.
6. Georeferencing and coordinate systems.
7. Data Market.
8. Real data examples.
9. Data selection guide.
10. FAQ.
11. CTA.

### Source comparison labels

| Source | Positioning | Typical workflows |
|---|---|---|
| Satellite | Global and repeat coverage | Earth observation, agriculture, environment, energy, urban monitoring |
| Aerial | Regional high-resolution coverage | Mapping, planning, construction, property and risk assessment |
| Drone | Localized on-demand capture | Inspection, measurement, agriculture, construction and mining |

### Data Market

**H2**  
`Source imagery without leaving the workflow`

**Body**  
`Define the area, resolution, timing, and sensor requirements for your project, then review suitable imagery options from available providers.`

**CTA**  
`Explore the Data Market`

---

## 16. Customer Stories

**URL:** `/customers/`

### Hero

**Eyebrow**  
`CUSTOMER STORIES`

**H1**  
`Geospatial teams moving from imagery to action`

**Body**  
`Explore how organizations use FlyPix AI across industrial, research, environmental, and land-management workflows.`

### Очередность блоков

1. Hero.
2. Featured case study.
3. Filters: industry, use case, data source.
4. Customer story grid.
5. Review quotes.
6. Partner/customer logo section with relationship labels.
7. Final CTA.

### Case-study template

1. Customer and context.
2. Challenge.
3. Data source.
4. FlyPix workflow.
5. Result.
6. Quantified outcome.
7. Customer quote.
8. Related capability/use case.

---

## 17. Resources

### Resources Hub

**URL:** `/resources/`  
**Eyebrow:** `RESOURCES`  
**H1:** `Resources for turning geospatial data into decisions`  
**Body:** `Explore practical guides, use cases, industry insights, customer stories, and FlyPix AI news.`

Порядок:

1. Featured resource.
2. Browse by topic.
3. Product guides.
4. Industry and use-case guides.
5. Customer Stories.
6. Latest news.
7. Newsletter.

### Blog

**URL:** `/blog/`  
**H1:** `Geospatial AI insights and practical guides`

Функции:

- search;
- category filters;
- industry/use-case/data-source filters;
- featured article;
- article cards;
- pagination;
- newsletter CTA.

### News

**URL:** `/news/`  
**H1:** `FlyPix AI news`

Контент:

- product launches;
- partnerships;
- events;
- awards;
- research;
- company announcements.

### FAQ

**URL:** `/faq/`  
**H1:** `FlyPix AI questions, answered`

Категории:

- Platform
- Data
- Models and analysis
- Pricing and credits
- Collaboration and export
- Enterprise and security
- Services and data sourcing

---

## 18. Company pages

### About FlyPix AI

**URL:** `/company/`  
**Eyebrow:** `ABOUT FLYPIX AI`  
**H1:** `Building practical AI for geospatial work`  
**Body:** `FlyPix AI helps teams turn remote-sensing imagery into structured, actionable information without building their own computer-vision infrastructure.`

Порядок:

1. Hero.
2. Mission.
3. Product/company story.
4. Leadership.
5. Principles.
6. Milestones.
7. Location.
8. Partners.
9. Careers CTA.
10. Contact CTA.

### Partners

**URL:** `/partners/`  
**Eyebrow:** `PARTNERS`  
**H1:** `Building the geospatial AI ecosystem together`  
**Body:** `FlyPix AI works with technology programs, data providers, research organizations, and solution partners to make geospatial analysis more accessible and effective.`

Категории:

- Technology and ecosystem programs
- Data partners
- Solution and integration partners
- Research and institutional partners

### Careers

**URL:** `/careers/`  
**Eyebrow:** `CAREERS`  
**H1:** `Build the future of geospatial AI with us`  
**Body:** `Join a team working at the intersection of artificial intelligence, earth observation, and real-world operations.`

Порядок:

1. Hero.
2. Mission and work.
3. Team principles.
4. Benefits.
5. Hiring process.
6. Open roles.
7. General application.

### Contact

**URL:** `/contact/`  
**Eyebrow:** `CONTACT`  
**H1:** `Tell us what you need to analyze`  
**Body:** `Share your data source, area, and desired outcome. We’ll route your request to the right product, data, or geospatial specialist.`

Форма:

- First name
- Last name
- Work email
- Company or organization
- Role
- What would you like to analyze?
- Data source
- Estimated area or processing volume — optional
- Message
- Privacy consent

CTA: `Send Request`

После отправки:

**Heading:** `Thank you. Your request has been received.`  
**Body:** `A FlyPix AI specialist will review the details and contact you at the email address provided.`

---

## 19. Legal pages

Обязательные маршруты:

- `/privacy-policy/`
- `/data-privacy/`
- `/terms/`
- `/imprint/`
- cookie settings.

Legal content предоставляется юристом. Общий page shell, typography, table of contents, updated date и print styles входят в дизайн сайта.

---

## 20. Footer

### Product

- Platform Overview
- Object Detection
- Custom Model Training
- Change Detection
- Supported Data
- Integrations & API

### Solutions

- Use Cases
- Industries
- Services
- Customer Stories
- Pricing

### Resources

- Blog
- News
- FAQ
- Documentation
- How Credits Work

### Company

- About
- Partners
- Careers
- Contact
- LinkedIn

### Bottom row

- `© {current_year} FlyPix AI GmbH`
- Privacy Policy
- Data Privacy
- Terms of Service
- Imprint
- Cookie Settings

### Company information

- `{company_address}`
- `{company_phone}`
- `{company_email}`

Контактные данные хранятся глобально и не вводятся вручную на каждой странице.

---

## 21. Content variables

Следующие значения управляются централизованно:

- `{try_now_url}`
- `{login_url}`
- `{active_user_count}`
- `{time_saved_percent}`
- `{benchmark_manual_time}`
- `{benchmark_ai_time}`
- `{company_address}`
- `{company_phone}`
- `{company_email}`
- plan names, prices, seats, credits and storage;
- partner and customer relationships;
- supported formats and technical limits;
- security and deployment facts.

Числовые утверждения имеют:

- source;
- methodology;
- measurement date;
- content owner;
- approval status;
- next review date.

---

## 22. UX-writing rules

- Использовать `FlyPix AI` во всех текстах.
- Основной термин: `satellite, aerial, and drone imagery`.
- `aircraft` используется для подписи иконки самолёта.
- `geospatial imagery` используется для изображения; `geospatial data` — для более широкого набора данных.
- `AI agents` применяется для многошагового workflow; конкретные функции называются object detection, segmentation, classification и change detection.
- Сначала описывается пользовательский результат, затем технология.
- Один section heading — одна идея.
- Не использовать `cutting-edge`, `revolutionary`, `unparalleled` и `game-changing` без доказательства.
- Не обещать real-time, accuracy или unlimited capacity без технического подтверждения.
- Не писать, что AI полностью заменяет human review.
- Button labels начинаются с действия и точно описывают следующий экран.

---

## 23. Motion и 3D

### Scroll reveal

- Начальное смещение по вертикали: 16–32 px.
- Одновременное изменение opacity.
- Stagger соседних элементов: 80–140 ms.
- Reveal выполняется один раз.
- Текст доступен до завершения анимации.
- `prefers-reduced-motion` отключает reveal.

### 3D Earth sequence

1. Earth вращается в Hero.
2. Спутник проходит по орбите.
3. При скролле камера приближается к выбранному региону.
4. Поверхность переходит в satellite/aerial capture.
5. Появляются detection boxes или masks.
6. Объекты получают labels.
7. Scene переходит в product interface/map.

### Fallbacks

- Static image при недоступном WebGL.
- Упрощённая mobile animation.
- 3D загружается после H1 и CTA.
- Canvas скрыт от screen reader как decorative.

---

## 24. Responsive и accessibility

Проверяемые ширины:

- 360 px
- 390 px
- 768 px
- 1024 px
- 1280 px
- 1440 px
- 1920 px

Требования:

- WCAG 2.2 AA target;
- keyboard navigation;
- visible focus;
- skip link;
- semantic heading order;
- sufficient contrast;
- reduced motion;
- accessible mega menu;
- alt text для информативных изображений;
- form labels and error descriptions;
- minimum touch target 44×44 px;
- content remains usable without 3D and JavaScript animation.

---

## 25. Performance

- LCP target: below 2.5 s.
- CLS target: below 0.1.
- INP target: below 200 ms.
- Hero text and CTA render before 3D.
- Responsive images with explicit dimensions.
- Lazy loading below the fold.
- Video uses poster and user-controlled playback.
- Heavy animation code loads only on pages where needed.
- Static fallback is available for low-power devices.

---

## 26. SEO

Для каждой страницы:

- unique title;
- unique meta description;
- one H1;
- canonical URL;
- Open Graph metadata;
- social image;
- breadcrumbs on nested pages;
- structured data appropriate to actual content;
- internal links to related capabilities, industries and use cases.

Общие требования:

- XML sitemap by content type;
- robots.txt;
- SoftwareApplication schema;
- Organization schema;
- Article schema for Blog and News;
- FAQ schema only when visible FAQ content exists;
- hreflang only for complete translations.

---

## 27. Analytics

### Events

- `try_now_click`
- `login_click`
- `contact_sales_click`
- `contact_form_start`
- `contact_form_submit`
- `pricing_plan_view`
- `pricing_plan_select`
- `credits_calculate`
- `industry_select`
- `use_case_select`
- `customer_story_open`
- `supported_data_select`
- `scroll_story_complete`
- `faq_open`
- `outbound_app_open`

### Parameters

- page path;
- page type;
- section;
- CTA label;
- destination;
- industry;
- use case;
- plan;
- device category.

Registration success передаётся из приложения; обычный click по `Try Now` не считается завершённой регистрацией.

---

## 28. Контентные модели

### Industry

- name;
- slug;
- hero copy;
- short description;
- outcomes;
- workflows;
- capabilities;
- data sources;
- customer proof;
- FAQ;
- SEO fields.

### Use Case

- name;
- slug;
- problem;
- desired output;
- workflow;
- capabilities;
- data sources;
- industries;
- proof;
- FAQ;
- SEO fields.

### Pricing Plan

- name;
- audience;
- price;
- billing period;
- seats;
- storage;
- credits;
- processing estimate;
- feature groups;
- support;
- CTA;
- effective date.

### Proof Item

- type;
- statement;
- source;
- permission;
- date verified;
- applicable pages;
- review date.

---

## 29. Материалы, необходимые для производства сайта

### Design System

- Figma library or tokens;
- Sora font source;
- color styles;
- grid and breakpoints;
- component states;
- motion rules;
- icon system.

### Brand

- logo SVG;
- monochrome logo;
- reversed logo;
- favicon;
- approved partner/customer logo files.

### Product visuals

- upload workflow;
- annotation UI;
- model training UI;
- object detection results;
- segmentation masks;
- change comparison;
- maps and dashboards;
- measurements;
- team sharing;
- exports.

### Imagery

- satellite examples;
- aerial examples;
- drone examples;
- before/after pairs;
- bounding-box scenes;
- multispectral/SAR/LiDAR examples where applicable;
- publication rights and attribution.

### Product facts

- pricing data;
- credits logic;
- supported formats;
- benchmark methodology;
- integration/API information;
- security and deployment facts;
- approved customer quotes;
- legal copy.

---

## 30. Порядок производства

### Stage 1 — Foundation

1. Утвердить эту спецификацию.
2. Получить или создать Design System v0.1.
3. Подтвердить content variables and product facts.
4. Подготовить brand and product assets.

### Stage 2 — Core website

1. Global header and footer.
2. Home.
3. Platform.
4. Pricing.
5. Services.
6. Supported Data.
7. Industries Hub.
8. Contact.

### Stage 3 — Content depth

1. Feature pages.
2. Use Cases Hub and detail pages.
3. Ten industry pages.
4. Customer Stories.
5. Resources, Blog and News.
6. Company pages.

### Stage 4 — QA and launch

1. Content QA.
2. Responsive QA.
3. Accessibility QA.
4. Browser and device QA.
5. Performance optimization.
6. SEO validation.
7. Analytics validation.
8. Production deployment.

---

## 31. Критерии готовности

- Все страницы из дерева существуют.
- Header, mega menus и mobile drawer работают по спецификации.
- Pricing находится на первом уровне меню.
- `Try Now` и `Log in` ведут в разные пользовательские сценарии.
- Home содержит все 17 блоков в указанном порядке.
- Industries Hub содержит sticky sidebar и десять отраслей.
- Use Cases и Industries отвечают на разные пользовательские вопросы и связаны внутренними ссылками.
- Product pages используют реальные UI visuals.
- Тарифы поступают из одного источника.
- Все числовые утверждения подтверждены.
- Все partner/customer relationships подписаны корректно.
- 3D Hero имеет mobile, reduced-motion и static fallbacks.
- Формы имеют loading, success and error states.
- Keyboard, focus, contrast and screen-reader behavior проверены.
- Metadata, canonical, sitemap and structured data валидированы.
- Analytics events проверены на staging.
- English copy прошёл финальную редактуру.
- Legal copy утверждён.

---

## 32. Итоговая логика сайта

Сайт последовательно объясняет:

1. FlyPix AI анализирует geospatial imagery.
2. Платформа работает со спутниковыми, воздушными и дроновыми изображениями.
3. Пользователь может использовать готовые или собственные AI models.
4. Система detects, segments, classifies, monitors and measures.
5. Результаты проверяются в географическом контексте и экспортируются.
6. Возможности применяются к конкретным use cases и industries.
7. Пользователь начинает самостоятельно через `Try Now` или обращается к FlyPix AI за custom project, enterprise support или data sourcing.

Это является единой продуктовой историей для навигации, текстов, дизайна, анимации и разработки.
