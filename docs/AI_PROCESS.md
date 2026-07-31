# AI_PROCESS.md

# Proceso de desarrollo asistido por IA

## Información general

- **Proyecto:** Dashboard EVM (Earned Value Management)
- **Autor:** Carlos Nova
- **Fecha:** 29/07/2026
- **Repositorio:** https://github.com/Cnova96/trycore-development-challenge.git

---

# Objetivo

Describir cómo se utilizó la Inteligencia Artificial durante el desarrollo del proyecto, las decisiones tomadas, el proceso de aprendizaje del método EVM y las validaciones realizadas antes de implementar la solución.

---

# 1. Herramientas de IA utilizadas

## Herramienta 1

**Nombre**

> ChatGPT (OpenAI)

**Propósito**

- Comprender el método de Valor Ganado (EVM).
- Diseñar la arquitectura del backend.
- Resolver dudas de NestJS.
- Diseñar la estructura del repositorio.
- Documentación técnica.
- Revisión de buenas prácticas.

**Razón de elección**

ChatGPT fue la herramienta de IA principal utilizada durante el desarrollo debido a su versatilidad para abordar consultas relacionadas con diferentes áreas del proyecto, desde conceptos del método de Valor Ganado (EVM) hasta aspectos de arquitectura, diseño, buenas prácticas y resolución de dudas específicas de implementación. Además, es la herramienta con la que tengo mayor experiencia y que utilizo habitualmente en mi trabajo diario, lo que me permitió aprovecharla de manera eficiente.

## Durante el desarrollo, la utilicé principalmente como un asistente técnico para validar ideas, resolver dudas puntuales y contrastar diferentes alternativas de implementación. Mi objetivo no fue delegar el desarrollo del código a la IA, sino utilizarla como apoyo para construir la solución de forma incremental, comprendiendo cada decisión tomada, cómo interactúan los diferentes componentes del sistema y cómo se integran dentro de la arquitectura definida. De esta manera, cada implementación fue analizada y entendida antes de incorporarla al proyecto.

## Herramienta 2

**Nombre**

> Cursor AI

**Propósito**

- Acelerar la implementación del frontend.
- Generación de componentes.
- Refactorización.
- Autocompletado.
- Documentacion markdown

**Razón de elección**

Cursor fue una herramienta nueva para mí durante este ejercicio, ya que no había trabajado previamente con ella. Conocía su existencia por recomendaciones de colegas y tenía una noción general de sus capacidades, pero esta fue mi primera experiencia utilizándola en un proyecto real.

Decidí emplearla principalmente para el desarrollo del frontend, área en la que considero que tengo menos experiencia en comparación con el desarrollo backend. Su uso me permitió agilizar la construcción de la interfaz de usuario, generar componentes de manera más eficiente y reducir el tiempo invertido en tareas repetitivas. Esta decisión también estuvo motivada por la restricción de tiempo del ejercicio, por lo que aprovechar una herramienta especializada me permitió mantener el ritmo de desarrollo sin descuidar la calidad de la solución.

Aun utilizando Cursor como apoyo, revisé y validé el código generado antes de integrarlo al proyecto, realizando los ajustes necesarios para asegurar que cumpliera con los requerimientos funcionales y con la arquitectura definida para la aplicación.

---

# 2. Historial completo de prompts

> **Nota:** Esta sección contiene los prompts enviados a las herramientas de IA en orden cronológico y sin modificaciones.

---

docs/
├── AI_PROCESS.md
└── prompts/
├── 001-evm-learning.md
├── 002-backend-architecture.md
├── 1. sintesis_documento_del_ejericicio.md
├── 2. entener_el_metodo_EVM.md
├── 3. como_se_deben_redactar_promt eficientes.md
├── 4. conversacion_sobre_arquitectura_del_back.md
├── 5. Integracion_Base_de_datos.md
├── 7. Correccion_de_errores.md
├── 8. Desarrollo_de_front
└── 9. Creacion_plantilla_markDown_para_AI_Proc

---

# 3. Proceso de aprendizaje del método EVM

## Objetivo

se utilizo la IA pa reconocer el metodo de manera dummy, ademas de eso se vieron videos academicos en youtube

### Preguntas realizadas

- ¿Qué es el método del Valor Ganado?
- ¿Cómo se calcula el PV?
- ¿Cómo se calcula el EV?
- ¿Qué representa el AC?
- ¿Cómo interpretar el CPI?
- ¿Cómo interpretar el SPI?
- ¿Qué significa un CPI menor que 1?
- ¿Cómo calcular EAC?
- ¿Cómo calcular VAC?

### Validación del aprendizaje

- Se realizaron ejemplos manuales.
- Se compararon los resultados con las fórmulas oficiales.
- Se verificó que las métricas obtenidas fueran coherentes.
- se hicieron intentos de transferir el conocimiento a colegas para validar si se tenia manejo del tema o aun faltaba

---

# 4. Decisiones donde no seguí la sugerencia de la IA

## Decisión 1

### Sugerencia de la IA

Inicialmente solicité orientación para implementar una arquitectura basada en Clean Architecture. La IA propuso una implementación más estricta, con una separación completa entre capas, puertos y adaptadores, generando una estructura considerablemente más compleja para el alcance del ejercicio.

### Decisión tomada

Opté por implementar una arquitectura inspirada en Clean Architecture, manteniendo la separación entre las capas de Dominio, Aplicación e Infraestructura, utilizando casos de uso (Use Cases), interfaces para los repositorios, inyección de dependencias y el patrón Repository, pero evitando agregar niveles de abstracción que no aportaban un beneficio significativo para una prueba técnica de este tamaño.

### Motivo

Consideré que una arquitectura más sencilla mantenía las ventajas de desacoplamiento, mantenibilidad y escalabilidad, sin incrementar innecesariamente la complejidad del proyecto. Además, esta aproximación me permitió cumplir con los tiempos establecidos y mantener un código más fácil de entender y mantener.

---

## Decisión 2

### Sugerencia de la IA

En diferentes momentos del desarrollo, la IA generó implementaciones completas de funcionalidades, incluyendo controladores, casos de uso y lógica de negocio.

### Decisión tomada

Preferí utilizar la IA principalmente como un asistente técnico. En lugar de copiar directamente el código generado, desarrollé la mayor parte de las funcionalidades de forma incremental, comprendiendo primero el funcionamiento de cada componente y adaptando las sugerencias a la arquitectura definida para el proyecto.

### Motivo

Mi objetivo principal era comprender el funcionamiento de cada parte de la solución y mantener el control sobre las decisiones técnicas tomadas. Considero que utilizar la IA como apoyo para resolver dudas y validar ideas aporta más valor que delegar completamente el desarrollo, ya que permite fortalecer el aprendizaje y comprender mejor tanto el problema como la solución implementada.

---

# 5. Validación de los cálculos EVM

## Estrategia utilizada

- Cálculos manuales.
- Casos de prueba.
- Comparación entre fórmulas.
- Verificación del significado de cada indicador.
- se le solicito a la IA que analizara una captura de pantalla y me explicara si la entendia

## Caso de prueba

### Datos de entrada

| Campo         | Valor |
| ------------- | ----: |
| BAC           |       |
| % Planificado |       |
| % Ejecutado   |       |
| AC            |       |

### Resultado esperado

| Indicador | Resultado |
| --------- | --------: |
| PV        |           |
| EV        |           |
| CV        |           |
| SV        |           |
| CPI       |           |
| SPI       |           |
| EAC       |           |
| VAC       |           |

### Resultado obtenido

Agregar el resultado generado por la aplicación.

### Conclusión

Explicar si coincide con el cálculo esperado.

---

# 6. Decisión de arquitectura tomada de forma independiente

## Decisión

- Implementar Clean Architecture.
- Separar casos de uso.
- Utilizar Repository Pattern.
- Crear un servicio exclusivo para cálculos EVM como un componente de nest nativo.

## Justificación

Las decisiones de arquitectura adoptadas durante el desarrollo se tomaron buscando un equilibrio entre la simplicidad de implementación y la posibilidad de escalar la solución en el futuro. Se priorizó una estructura que facilitara el desarrollo dentro del tiempo disponible, sin sacrificar la organización del código ni las buenas prácticas de diseño.

Adicionalmente, varias de estas decisiones estuvieron motivadas por el interés de poner en práctica conocimientos relacionados con arquitectura de software, principios de diseño y patrones como Repository Pattern, Dependency Injection y una organización inspirada en Clean Architecture. Esto permitió desarrollar una solución más mantenible, desacoplada y preparada para incorporar nuevas funcionalidades si el proyecto evolucionara más allá del alcance de la prueba técnica.

## Beneficios

- Mejor mantenibilidad.
- Menor acoplamiento.
- Mayor facilidad para realizar pruebas.
- Escalabilidad.

---

# 7. Reflexión final

## Aspectos positivos

¿Qué funcionó bien?

- inicio de aprendizaje de una nueva herramienta de IA
- implementacion de conocimientos adquiridos durante estos años en apap
- documentacion clara en swagger

---

## Aspectos a mejorar

¿Qué cambiarías si volvieras a desarrollar el proyecto?

- mejor aprendizaje de la IA, aunque la use, senti que iba lento trabajando
- me gustaria mejorar mis promts para evitar que la IA haga mas de la cuenta y seguir teniendo dominio de decisiones

---

## Lecciones aprendidas

¿Qué conocimientos nuevos adquiriste durante el ejercicio?

- manejo del metodo EVM
- cursor IA como herramienta de desarrollo
- clean arquitectura
- conocimientos nuevos en front nest

---

# 8. Conclusiones

Considero que las herramientas de Inteligencia Artificial representan un gran apoyo para el desarrollo de software, ya que permiten agilizar tareas, resolver dudas de manera rápida y aumentar la productividad. Sin embargo, desde mi perspectiva, es importante que su uso no sustituya el proceso de aprendizaje ni la comprensión de las soluciones implementadas.

Personalmente, disfruto el proceso de analizar un problema, diseñar una solución e implementarla por mis propios medios. Delegar el desarrollo completo a una herramienta de IA puede reducir esa experiencia y generar una sensación de pérdida de control sobre el trabajo realizado. Además, considero que depender excesivamente de la IA puede limitar oportunidades para adquirir nuevos conocimientos técnicos y profundizar en la comprensión del dominio del negocio.

Por esta razón, durante el desarrollo de este ejercicio procuré utilizar la IA como un asistente técnico y no como un reemplazo del proceso de desarrollo. Mi enfoque consistió en emplearla para validar ideas, resolver dudas puntuales, comparar alternativas de implementación y acelerar tareas específicas, asegurándome siempre de comprender el funcionamiento de cada solución antes de integrarla al proyecto.

En conclusión, considero que la IA es una herramienta que todo desarrollador debería aprender a utilizar, pero de manera consciente y responsable. Su mayor valor no está en desarrollar un proyecto de principio a fin, sino en potenciar las capacidades del desarrollador, permitiéndole tomar mejores decisiones, aprender con mayor rapidez y dedicar más tiempo a resolver problemas de mayor valor.
