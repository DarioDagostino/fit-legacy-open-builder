# 🧠 Neural UI — Modernización del Ecosistema Fit Legacy

Esta documentación detalla la implementación técnica y filosófica de la nueva interfaz **Neural UI** aplicada al `WorkoutBuilder`.

---

## 🚀 Filosofía de Navegación: "Separación de Intenciones"

Hemos pasado de un modelo de "Toggle" confuso a un sistema de **4 Pilares** que separa el descubrimiento de la gestión activa.

### 1. 🔍 EXPLORAR (Catálogo Central)
*   **Propósito:** Descubrimiento y adición de recursos.
*   **Lógica:** Contiene un switch interno para alternar entre **Ejercicios** y **Comidas**. 
*   **UX:** Es el único lugar donde se realizan búsquedas y filtrados por categoría. Al añadir un elemento, el sistema lo deriva automáticamente a su respectiva pestaña de gestión.

### 2. 🥦 NUTRIR (Gestión de Combustible)
*   **Propósito:** Ajuste fino de la nutrición seleccionada.
*   **Features:**
    *   **Macro-Dashboard:** Visualización en tiempo real de Kcal, Proteína, Carbs y Grasas.
    *   **Edición Precisa:** Ajuste de porciones en incrementos de 25g.
    *   **Feedback Visual:** Colores verdes (#28623a) para una asociación rápida con salud y nutrición.

### 3. ⚔️ BUILD (Gestión de Entrenamiento)
*   **Propósito:** Configuración de la batalla (entrenamiento).
*   **Features:**
    *   **Editor de Rutina:** Cambio de nombre de la rutina directamente en el encabezado.
    *   **Parámetros de Fuerza:** Ajuste independiente de Sets, Reps y Peso (Kg).
    *   **Enfoque:** Se eliminó la información nutricional de esta pestaña para maximizar el foco en el rendimiento físico.

### 4. 📤 ENVIAR (Exportación .WIR)
*   **Propósito:** Finalización y compartición.
*   **Lógica:** Previsualización dinámica usando el protocolo `.WIR` para compartir planes legibles por la IA de Fit Legacy.

---

## 🌓 Protocolo Mixto (Entrenamiento + Nutrición)

Cuando el usuario construye un plan que incluye tanto ejercicios como alimentos, el sistema activa automáticamente el **Modo Mixto**.

### Resolución de UI:
1.  **Estética Híbrida:** Se aplica un esquema de color azul eléctrico (`#4ba3ff`) para diferenciarlo de los modos puros.
2.  **Dashboard Triple:** El encabezado muestra simultáneamente el **Volumen de Entrenamiento** (ejercicios), la **Cantidad de Alimentos** y la **Energía Total** (kcal).
3.  **Layout Inteligente:** En pantallas grandes, las listas se dividen en dos columnas para una comparación rápida. En móvil, se apilan manteniendo la jerarquía visual de cada pilar.
4.  **Progreso Consolidado:** La barra de progreso se sincroniza con el total de acciones requeridas en ambos mundos, permitiendo un tracking holístico del legado del día.

---

## 🎨 Principios de Diseño Aplicados

1.  **Contextual Backgrounds:** El fondo del catálogo cambia dinámicamente (`mist` para ejercicios, `forest` para comida) para proporcionar feedback sensorial al usuario.
2.  **Badges Inteligentes:** El FooterNav incluye contadores (`currentRoutine.foods.length` y `currentRoutine.exercises.length`) para que el usuario sepa cuántos elementos tiene en su build sin tener que entrar.
3.  **Neural Motion:** Uso de `AnimatePresence` con modos `wait` para que las transiciones entre pestañas se sientan orgánicas y de alta gama.
4.  **Terminología Directa:** Eliminamos el lenguaje de software ("Sync", "Protocolo") por lenguaje de gimnasio ("Build", "Nutrir", "Nueva Rutina").

---

## 🛠️ Stack Técnico

*   **Estado:** `useWorkoutStore` (Zustand) para persistencia y lógica global.
*   **Animaciones:** `framer-motion` para el sistema de pestañas y feedbacks de interacción.
*   **Gestión de Ciclo de Vida:** Implementación de `keys` dinámicas (`catalog-${builderMode}`) para forzar el remontado completo del catálogo al alternar entre modos, eliminando cualquier residuo visual ("ghosting") de elementos anteriores.
*   **Iconografía:** Mix de `lucide-react` para nutrición e `ICON_MAP` custom para secciones de entrenamiento.
*   **Persistencia:** La configuración de marca (logo/fondo) persiste en `localStorage` bajo la clave `catalog-customize-config`.

> **Estado del Sistema:** ONLINE. Compilación exitosa. Estética Premium validada.
