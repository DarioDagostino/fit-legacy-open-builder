-- Insert Academy Lessons
INSERT INTO public.academy_lessons_v2 (
  id, numero, title, subtitle, content, pillar, difficulty, modulo, 
  duration_minutes, is_premium, coin_reward, xp_reward, 
  key_takeaways, quiz, ejercicios, author, quote, tips, 
  required_league_points, legacy_category
) VALUES
(
  'leccion-1', 1, 'Fundamentos del Entrenamiento', 'Sobrecarga progresiva y estoicismo', '# Fundamentos del Entrenamiento

## Principio de Sobrecarga Progresiva
La sobrecarga progresiva es el núcleo del crecimiento muscular y la fuerza. 
El principio de especificidad dicta que tu cuerpo se adapta a lo que hace (1-5 reps fuerza, 8-12 hipertrofia, 15+ resistencia). Para seguir creciendo debes aumentar el estímulo progresivamente mediante más peso, reps o menos descanso.

## La Recuperación 
El crecimiento real ocurre durante la regeneración celular. Tus músculos necesitan entre 48 y 72h entre grupos musculares, y debes apuntar a dormir de 7 a 9 horas diarias.
Recuerda: **Consistencia > Intensidad**.

## 5 Movimientos Fundamentales
Para una base sólida, enfócate en ejecutar estos patrones de movimiento perfectos:
1. Push (Empuje)
2. Pull (Tracción)
3. Squat (Sentadilla)
4. Hinge (Bisagra de cadera)
5. Core (Base)

## Filosofía Estoica del Entrenamiento
Tú controlas tu esfuerzo, no tu genética. Tú controlas tu dieta, no tu somatotipo base. Aplica la dicotomía del control en cada sesión al fallo.
', 'cuerpo', 'principiante', 1,
  15, false, 50, 100,
  '[]', '[{"question":"¿Qué pilar fundamental dicta el aumento gradual de peso/esfuerzo?","options":["TUT (Time under tension)","Sobrecarga Progresiva","Cardio LISS","Entrenamiento HIIT"],"correctAnswer":1,"explanation":"La sobrecarga progresiva es la base obligatoria de todo aumento de fuerza y masa."},{"question":"¿Qué aspecto de tu entrenamiento SÍ está bajo tu control según el estoicismo?","options":["Tu biotipo genético","La genética de tus pantorrillas","Tu esfuerzo y consistencia","El tamaño inicial de tus músculos"],"correctAnswer":2,"explanation":"La dicotomía del control estoica señala que tu esfuerzo es lo único 100% bajo tu control."}]', '[{"statement":"Debes aumentar el peso cada sesión sin excepción para crecer.","isCorrect":false},{"statement":"La consistencia vence a la intensidad aleatoria a largo plazo.","isCorrect":true},{"statement":"15+ repeticiones son óptimas para ganar máxima fuerza bruta.","isCorrect":false},{"statement":"El músculo necesita 48-72h de recuperación entre sesiones.","isCorrect":true},{"statement":"Empuje y tracción son patrones de movimiento fundamentales.","isCorrect":true},{"statement":"La genética determina si puedes o no aplicar sobrecarga progresiva.","isCorrect":false},{"statement":"Controlas tu esfuerzo diario en el gimnasio.","isCorrect":true},{"statement":"Entrenar todos los días el mismo músculo es la mejor técnica.","isCorrect":false}]', 'Marco Aurelio', 'El impedimento para la acción avanza la acción. Lo que se interpone en el camino se convierte en el camino.', 'Registra tus pesos esta semana. Añadir 1 repetición o 1kg es triunfo.',
  0, 'fuerza'
),
(
  'leccion-2', 2, 'Macronutrientes Esenciales', 'La ciencia de la nutrición vital', '# Macronutrientes Esenciales

## Proteínas (4 cal/g)
Son los bloques constructores del cuerpo. Para un atleta, necesitas entre `1.6g y 2.2g por kg de peso`. Si pesas 80kg, apuntas a ~160g diarios distribuidos en comidas (20-40g por porción).

## Carbohidratos (4 cal/g)
La fuente primaria de energía del sistema nervioso central y muscular. Existen simples (rápida absorción, ideales post-entreno) y complejos (lenta, sostenidos durante el día).

## Grasas Saludables (9 cal/g)
Vitales para la producción hormonal, particularmente la testosterona. Deben componer entre el 20% y 35% de tus calorías totales.

## El TMB y el Factor de Actividad
Tu Tasa Metabólica Basal (la energía que gastas solo existiendo) se altera por un Factor de Actividad (1.2 a 1.9). Según tus metas:
- **Volumen Muscular**: +300 a +500 calorías.
- **Déficit (Pérdida de grasa)**: -300 a -500 calorías.

## Séneca y la Disciplina Nutricional
Séneca practicaba días de escasez intencional, alimentándose con agua y pan duro. El ayuno voluntario enseña a no ser esclavos del confort alimenticio.
', 'cuerpo', 'principiante', 1,
  15, false, 50, 100,
  '[]', '[{"question":"¿Cuánta proteína por KG de peso corporal es recomendable para un deportista?","options":["0.5g","1.6 - 2.2g","5.0g","10g"],"correctAnswer":1,"explanation":"1.6 a 2.2g asegura la correcta reparación y síntesis proteica muscular post ejercicio."},{"question":"¿Cuántas calorías por gramo aportan las grasas?","options":["4 cal","9 cal","7 cal","12 cal"],"correctAnswer":1,"explanation":"Las grasas son las más densas, aportando 9 kcal/g, necesarias para el equilibrio hormonal."}]', '[{"statement":"La proteína aporta 9 calorías por gramo.","isCorrect":false},{"statement":"Las grasas son fundamentales para la regulación hormonal.","isCorrect":true},{"statement":"Un déficit de 500 calorías es ideal para ganar volumen muscular.","isCorrect":false},{"statement":"1.6g a 2.2g de proteína por kilo son recomendables para atletas.","isCorrect":true},{"statement":"Todos los carbohidratos se absorben a la misma velocidad.","isCorrect":false},{"statement":"Las calorías bases más tu factor de actividad conforman tu gasto total.","isCorrect":true},{"statement":"Un atleta debe consumir la menor cantidad de proteína posible.","isCorrect":false},{"statement":"Séneca practicaba el ayuno esporádico como ejercicio de disciplina.","isCorrect":true}]', 'Tony Kushner', 'El cuerpo es el jardín del alma.', 'Apunta a 20-40g de proteína por comida para maximizar síntesis proteica.',
  0, 'nutricion'
),
(
  'leccion-3', 3, 'Sabiduría Antigua', 'Filosofía para la acción en la Stoa', '# Sabiduría Antigua (Estoicismo)

## Contexto Histórico: Platón y Atletas
¿Sabías que Platón fue campeón de lucha (Pancracio)? El origen de la filosofía occidental está ligado a la perfección física. La frase *Mens sana in corpore sano* resume que el entrenamiento intelectual necesita de un soporte biológico fuerte.

## Pilares Estoicos Base
1. **Dicotomía del Control** (Epicteto): Solo concéntrate en lo que dominas.
2. **Amor Fati**: Ama tu destino. Abraza los reveses como entrenamiento.
3. **Memento Mori**: Recuerda que morirás. La urgencia elimina la procrastinación.
4. **Praemeditatio Malorum**: Visualiza los peores escenarios (ej: cerró tu gimnasio) para estar siempre listo (entrenarás en casa).

## Las Virtudes Cardinales
- Sabiduría (Sophia): Saber qué hacer y por qué.
- Templanza (Sophrosyne): Disciplina y moderación.
- Coraje (Andreia): Enfrentar la adversidad.
- Justicia (Dikaiosyne): Hacer lo correcto.

Mantén un **Diario Estoico** como las *Meditaciones* de Marco Aurelio. Escribe de noche tus fallas y aciertos del día.
', 'mente', 'principiante', 1,
  20, false, 75, 150,
  '[]', '[{"question":"¿Cuál es el concepto central de la Dicotomía del Control?","options":["Controlar las emociones de los demás","Separar lo que depende de ti de lo que no","Evitar sentir dolor en el entrenamiento","Vivir aislado del mundo social"],"correctAnswer":1,"explanation":"La dicotomía nos libera al enseñar que la paz mental reside en enfocarse solo en nuestras decisiones (locus de control interno)."},{"question":"¿Qué representa Amor Fati?","options":["Destino amoroso","Amar y aceptar con entusiasmo lo que te toca enfrentar","Resignación pasiva ante el dolor","El amor entre filósofos"],"correctAnswer":1,"explanation":"Más que resignación, es un abrazo activo al caos reconociéndolo como tu campo de entrenamiento."}]', '[{"statement":"Platón consideraba que solo la mente importaba, despreciando el cuerpo.","isCorrect":false},{"statement":"La Dicotomía del Control nos pide preocuparnos por las opiniones de todos.","isCorrect":false},{"statement":"Amor Fati significa amar incluso los eventos adversos.","isCorrect":true},{"statement":"Praemeditatio Malorum es una técnica de visualización pesimista que genera depresión.","isCorrect":false},{"statement":"Las cuatro virtudes son: sabiduría, coraje, justicia y templanza.","isCorrect":true},{"statement":"Epicteto fue un emperador que escribió Meditaciones.","isCorrect":false},{"statement":"Mantener un diario es una recomendación clave de la práctica estoica.","isCorrect":true},{"statement":"La frase ''Mementi Mori'' nos impulsa a la acción valorando nuestro tiempo.","isCorrect":true}]', 'Epicteto', 'Lo que nos perturba no son las cosas, sino las opiniones que tenemos sobre ellas.', 'Si mantienes un diario de tus fracasos, dominarás el arte de reescribir tu éxito futuro.',
  0, 'filosofiaEstoica'
),
(
  'leccion-4', 4, 'El Ritual Matutino', 'Logro del Despertar', '# El Ritual Matutino

## Logro del Despertar
Tu vida se resume a los hábitos de tus primeras 2 horas diarias. La victoria matutina condiciona tu fisiología para tomar decisiones ganadoras durante 18 horas más.

## Protocolo de 60 Minutos
1. **Despertar inmediato**: Cero botón de snooze.
2. **Hidratación**: 500ml de agua para rehidratar el cerebro.
3. **Meditación estoica** (5m): Praemeditatio Malorum.
4. **Movimiento ligero** (15m): Cardio o movilidad para elevar frecuencia.
5. **Estudio** (10m): Lectura filosófica o journaling.
6. **Nutrición** (Desayuno proteico).

## Reglas Inquebrantables
- **Sin teléfono los primeros 30 minutos**.
- Consistencia > motivación. Te levantarás odiando el momento, pero programarás a tu cerebro para la acción.

## Ciencia del Sueño (Hackea tu Noche para ganar el Día)
El adulto necesita de 7 a 9 horas estructuradas en ciclos de 90 minutos. 
Duerme en una habitación oscura y fresca (16-19°C), absorbe luz solar apenas despiertes para regular tu reloj circadiano y suplementa con citrato/bisglicinato de Magnesio si tu sueño carece de profundidad.
', 'mente', 'intermedio', 2,
  15, false, 60, 125,
  '[]', '[{"question":"¿Por qué se desaconseja totalmente el botón de ''snooze'' (posponer alarma)?","options":["Rompe tu ritmo y debilita tu palabra","Ayuda a descansar músculos","Es una estrategia estoica","Da calor corporal"],"correctAnswer":0,"explanation":"Ceder al snooze es tu primera derrota del día; rompe tu voluntad y genera inercia del sueño."},{"question":"¿Cuál de estas acciones NO es recomendada en los primeros 30 minutos del día?","options":["Movimiento ligero","Hidratación","Toma de sol","Abrir Instagram"],"correctAnswer":3,"explanation":"El bombardeo inmediato de dopamina y cortisol vía redes sociales destruye la concentración matutina."}]', '[{"statement":"El botón de snooze ayuda a despertar más enérgico.","isCorrect":false},{"statement":"La exposición matutina a la luz regula el reloj circadiano.","isCorrect":true},{"statement":"Debes leer correos ni bien abres los ojos para ser productivo.","isCorrect":false},{"statement":"La temperatura ideal para dormir es fresca, entre 16-19°C.","isCorrect":true},{"statement":"Un despertar inmediato forja resistencia mental.","isCorrect":true},{"statement":"Beber 500ml de agua al despertar no afecta al sistema.","isCorrect":false},{"statement":"El ritual matutino establece un tono proactivo para el resto del día.","isCorrect":true},{"statement":"Los ciclos de sueño suelen durar unas 3-4 horas cada uno.","isCorrect":false}]', 'Marco Aurelio', 'Al amanecer, cuando tengas ganas de seguir durmiendo, piensa: Me levanto para hacer el trabajo de un ser humano.', 'Configura tu teléfono fuera del dormitorio para evitar el botón de snooze.',
  200, 'mentalidad'
),
(
  'leccion-5', 5, 'Historia - Arnold', 'La mente construye el cuerpo', '# Historia - Arnold Schwarzenegger

## Un Legado Intercontinental
Nacido en Austria en 1947 en una familia humilde de posguerra, Arnold visualizó a los 15 años que llegaría a América mediante el culturismo.

## Los 6 Principios del Éxito de Arnold
1. **VISIÓN CLARA**: ¿A dónde vas? Sin GPS mental no hay destino.
2. **TRABAJO INSACIABLE**: En su apogeo, entrenaba 5 a 6 horas diarias (double split), trabajaba albañilería e iba a la universidad.
3. **VISUALIZACIÓN**: Mentalizar la meta como si ya fuera real. (El Músculo de la Mente).
4. **SIN PLAN B**: Un plan de contingencia fomenta el fracaso.
5. **VENDERSE A SÍ MISMO**: Tienes que creer genuinamente en tu producto o tu imagen.
6. **AYUDAR A OTROS**: Tu legado se define por la mano que tiendes a los que suben detrás de ti.

## De Mister Olympia a Gobernador
Esa misma determinación que usó para forjar el máximo físico posible y ganar 7x Mister Olympia la aplicó a la actuación y luego a la política en California. Arnold probó que la disciplina forjada en el acero puede ser exportada a cualquier disciplina humana.
', 'mente', 'intermedio', 2,
  12, false, 50, 100,
  '[]', '[{"question":"¿Por qué el ''Plan B'' es desaconsejado en la filosofía extrema de Arnold?","options":["Cuesta dinero desarrollarlo","Significa que mentalmente te preparas para el fracaso (red de seguridad) limitando tu esfuerzo en el Plan A","Da mala imagen política","Genera sobreentrenamiento muscular"],"correctAnswer":1,"explanation":"Tener Plan B es reconfortante mentalmente, y a nivel élite, ese confort roba porcentaje vital del enfoque que necesita tu Plan A para salir victorioso en la adversidad."},{"question":"¿Cuántas veces ganó M. Olympia, un récord absoluto de su tiempo?","options":["3","5","7","10"],"correctAnswer":2,"explanation":"Ganó 7 estatuillas de Mr Olympia."}]', '[{"statement":"El Plan B asegura el camino y hace al atleta más fuerte mentalmente.","isCorrect":false},{"statement":"Arnold no confiaba en la visualización, solo en repeticiones vacías.","isCorrect":false},{"statement":"Tener una visión es el primer paso según los principios de Arnold.","isCorrect":true},{"statement":"Ayudar a los demás también forma parte del ciclo exitoso de Arnold.","isCorrect":true},{"statement":"El trabajo insaciable es la capacidad de obviar el cansancio e invertir horas.","isCorrect":true},{"statement":"La fuerza, según Arnold, viene de las victorias fáciles.","isCorrect":false},{"statement":"Schwarzenegger demostró que el éxito del culturismo es transferible a nivel corporativo.","isCorrect":true},{"statement":"Nació en una familia millonaria de california.","isCorrect":false}]', 'Arnold Schwarzenegger', 'Strength does not come from winning. Your struggles develop your strengths.', 'Ten siempre una visión cristalina. Si no puedes visualizar el éxito, no podrás ejecutarlo.',
  300, 'mentalidad'
),
(
  'leccion-6', 6, 'Progresión de Carga', 'Periodización científica para crecer sin estancarte', '# Progresión de Carga

## El Problema del Estancamiento
La mayoría abandona el progreso por entrenar igual durante meses. El cuerpo se adapta a lo que hace.

## Periodización Lineal
Aumenta peso/reps semana a semana. Incrementos del **2.5–5% semanal** son el rango óptimo. Funciona bien en principiantes e intermedios.

## DUP — Periodización Ondulante Diaria
Variá el estímulo dentro de la semana:
- **Lunes**: Fuerza (3-5 reps, 85–90% 1RM)
- **Miércoles**: Hipertrofia (8-12 reps, 70–75%)
- **Viernes**: Resistencia (12-15 reps, 60–65%)

Esto previene la habituación al estímulo.

## Cálculo de 1RM
> **1RM ≈ Peso × (1 + reps/30)** — Fórmula Epley

Si haces 100 kg × 5 reps: 1RM ≈ 117 kg.

## Block Periodization
Macrociclo de 12–16 semanas dividido en:
1. **Acumulación** — volumen alto, intensidad baja
2. **Transmutación** — volumen medio, intensidad alta
3. **Realización** — volumen mínimo, intensidad máxima

## El Deload: Necesidad, No Debilidad
Cada 4–6 semanas reduce volumen un 40–50%. Recupera SNC, articulaciones y previene sobreentrenamiento.', 'cuerpo', 'intermedio', 3,
  18, false, 75, 150,
  '[]', '[{"question":"¿Qué significa DUP en periodización?","options":["Doble Úlcera Post-esfuerzo","Periodización Ondulante Diaria","División de Unidades Progresivas","Duración Uniforme por Plan"],"correctAnswer":1,"explanation":"DUP varía el tipo de estímulo (fuerza, hipertrofia, resistencia) dentro de la semana para maximizar adaptaciones."}]', '[{"statement":"La periodización lineal aumenta el estímulo de forma gradual.","isCorrect":true},{"statement":"El deload implica entrenar al máximo para compensar.","isCorrect":false},{"statement":"DUP varía entre fuerza, hipertrofia y resistencia cada semana.","isCorrect":true},{"statement":"El cálculo de 1RM no tiene utilidad práctica.","isCorrect":false},{"statement":"Incrementos del 2.5–5% semanal son óptimos.","isCorrect":true},{"statement":"El bloque de realización tiene el mayor volumen.","isCorrect":false},{"statement":"Llevar un diario de entreno permite rastrear el progreso real.","isCorrect":true},{"statement":"El cuerpo no se adapta si el esfuerzo es constante.","isCorrect":false}]', 'Marco Aurelio', 'No cuánto haces, sino lo que haces con intención.', 'Lleva un diario de entrenamiento con peso, series y reps. Lo que no registras, no crece.',
  500, 'fuerza'
),
(
  'leccion-7', 7, 'Constancia Estoica', 'El 1% diario y la fuerza de los sistemas', '# Constancia Estoica: El 1% Diario

## La Matemática del Progreso Invisible
**1.01³⁶⁵ = 37.78** — Mejoras 1% al día y eres 37× mejor al año. Empeoras 1% diario y quedas en 0.03.

## Sistemas vs. Metas
| Meta (frágil) | Sistema (robusto) |
|---|---|
| "Quiero correr 10K" | "Salgo 20 min cada mañana" |
| "Quiero marcar abdomen" | "Registro macros 6/7 días" |

Las metas son el destino. Los sistemas son el automóvil que te lleva.

## Habit Stacking
Anclá el hábito nuevo al existente:
- Después de despertar → beber 500ml de agua.
- Después del café → 5 min de movilidad.
- Antes de duchar → leer 2 páginas de filosofía.

## La Regla de "Nunca Fallar 2 Veces"
Fallar un día es humano. Dos días seguidos es un nuevo hábito negativo.

## Entorno > Motivación
Diseñá el ambiente para que el hábito sea inevitable:
- Ropa de gym lista la noche anterior.
- El libro en la mesita.
- El teléfono fuera del dormitorio.

La motivación fluctúa. El entorno permanece.', 'mente', 'intermedio', 3,
  15, false, 65, 125,
  '[]', '[{"question":"¿Cuánto crece quien mejora un 1% cada día durante 365 días?","options":["3.65 veces","10 veces","37 veces","100 veces"],"correctAnswer":2,"explanation":"1.01^365 ≈ 37.78. El crecimiento compuesto exponencial es contraintuitivo pero matemáticamente verificable."}]', '[{"statement":"Mejorar 1% al día genera una mejora de 37× en un año.","isCorrect":true},{"statement":"La motivación es más confiable que los sistemas a largo plazo.","isCorrect":false},{"statement":"Habit stacking añade un hábito nuevo a uno ya existente.","isCorrect":true},{"statement":"Fallar dos días seguidos es equivalente a fallar uno.","isCorrect":false},{"statement":"El entorno facilita la constancia más que la fuerza de voluntad.","isCorrect":true},{"statement":"Las metas concretas son más poderosas que los sistemas.","isCorrect":false},{"statement":"Aristóteles definía la excelencia como hábito repetido.","isCorrect":true},{"statement":"Empeorar 1% diario te deja al final del año igual.","isCorrect":false}]', 'Aristóteles', 'Somos lo que hacemos repetidamente. La excelencia no es un acto sino un hábito.', 'Habit stacking: ancla un hábito nuevo a uno existente. Después del café → 10 min de movilidad.',
  700, 'habitos'
),
(
  'leccion-8', 8, 'Logro de Disciplina', 'Disciplina es libertad. Sistemas sobre motivación.', '# Logro de Disciplina

## La Paradoja de la Libertad
Jocko Willink: **Discipline equals freedom.** El hombre sin disciplina es esclavo de sus impulsos. El disciplinado elige cuándo come, entrena y duerme. Esa es la libertad real.

## Implementation Intentions
Gollwitzer (1999): quienes usan formato **"si-entonces"** tienen 2-3× más probabilidad de completar sus metas:
- "Si termino de trabajar, entonces voy directo al gym."
- "Si me siento sin energía, entonces hago al menos 20 minutos."

## El Autocontrato
> "Yo, [nombre], me comprometo a entrenar [N días/semana] durante [los próximos 3 meses]..."

Fírmalo. La psicología del compromiso escrito es poderosa.

## Eliminar la Fricción
Gym a 5 min: alta adherencia. A 45 min: baja. Cada paso extra entre tú y el hábito reduce la probabilidad.

## Accountability
Epicteto tenía discípulos. Marco Aurelio escribía sus Meditaciones. Tus versiones:
- Compañero de entreno.
- Grupo en WhatsApp.
- Coach o mentor.', 'mente', 'avanzado', 3,
  20, false, 85, 175,
  '[]', '[{"question":"Según Jocko Willink y los estoicos, ¿cuál es la relación entre disciplina y libertad?","options":["Son opuestas","La disciplina genera libertad real","La libertad elimina la necesidad de disciplina","No tienen relación"],"correctAnswer":1,"explanation":"La disciplina libera al hombre de los impulsos y del caos reactivo. Es la forma más alta de autonomía personal."}]', '[{"statement":"Las Implementation Intentions aumentan la probabilidad de completar una meta.","isCorrect":true},{"statement":"Disciplina y libertad son conceptos opuestos incompatibles.","isCorrect":false},{"statement":"Un autocontrato escrito activa compromiso psicológico real.","isCorrect":true},{"statement":"Reducir fricción del hábito baja la adherencia.","isCorrect":false},{"statement":"Sophrosyne es la virtud estoica del autocontrol.","isCorrect":true},{"statement":"La distancia al gym no afecta la adherencia.","isCorrect":false},{"statement":"Un sistema de accountability externo refuerza la disciplina.","isCorrect":true},{"statement":"La motivación es más sostenible que los sistemas.","isCorrect":false}]', 'Abraham Lincoln', 'La disciplina es elegir entre lo que quieres ahora y lo que quieres más.', 'Escribe un autocontrato: qué harás, cuándo, dónde. Fírmalo. La firma activa el compromiso psicológico.',
  900, 'habitos'
),
(
  'leccion-9', 9, 'Periodización Avanzada', 'DUP, Block y Conjugate para atletas intermedios-avanzados', '# Periodización Avanzada

## DUP — Periodización Ondulante Diaria
| Día | Reps | Intensidad | Objetivo |
|---|---|---|---|
| Lunes | 3-5 | 85–90% | Fuerza |
| Miércoles | 8-12 | 70–75% | Hipertrofia |
| Viernes | 12-15 | 60–65% | Resistencia |

Ventaja: no te habitúas a ningún estímulo.

## Block Periodization
1. **Acumulación** (4-6 sem) — volumen alto, intensidad baja.
2. **Transmutación** (3-4 sem) — volumen moderado, intensidad alta.
3. **Realización** (2-3 sem) — volumen mínimo, intensidad máxima.

## Método Conjugado (Westside)
- **ME (Max Effort)**: levantamiento pesado al fallo.
- **DE (Dynamic Effort)**: pesos moderados con máxima velocidad.

## Deload: Protocolo, No Opción
Cada 4–6 semanas, reduce volumen un 40–60%. Recupera SNC y tejidos conjuntivos. Tu rendimiento en el siguiente bloque **supera** al previo.', 'cuerpo', 'avanzado', 4,
  25, false, 100, 200,
  '[]', '[{"question":"¿Qué significa DUP en el contexto de periodización del entrenamiento?","options":["Doble Unidad de Progresión","Periodización Ondulante Diaria","División Uniforme de Pesos","Duración Universal de Periodos"],"correctAnswer":1,"explanation":"Daily Undulating Periodization — varía fuerza, hipertrofia y resistencia varios días por semana para maximizar adaptaciones."}]', '[{"statement":"El Método Conjugado trabaja max effort y dynamic effort simultáneamente.","isCorrect":true},{"statement":"El bloque de realización tiene el mayor volumen del macrociclo.","isCorrect":false},{"statement":"DUP cambia el tipo de estímulo cada día de la semana.","isCorrect":true},{"statement":"El deload muestra falta de compromiso con el entrenamiento.","isCorrect":false},{"statement":"El Block Periodization tiene 3 fases: acumulación, transmutación y realización.","isCorrect":true},{"statement":"La periodización lineal es igualmente efectiva para atletas avanzados.","isCorrect":false},{"statement":"El deload protege el sistema nervioso central de la fatiga acumulada.","isCorrect":true},{"statement":"El bloque de acumulación tiene pocas repeticiones y alta intensidad.","isCorrect":false}]', 'Epicteto', 'Desea que lo que suceda sea como es, y serás feliz.', 'Diseña un macrociclo de 12 semanas con 3 fases antes de empezar el primer día.',
  1100, 'fuerza'
),
(
  'leccion-10', 10, 'Nutrición Avanzada', 'Timing, carb cycling y suplementación inteligente', '# Nutrición Avanzada

## Nutrient Timing
El timing importa menos que el total diario, pero tiene efectos marginales:
- **Pre-entreno (1-2h)**: 60-80g carbos complejos + 20-30g proteína.
- **Post-entreno (<90min)**: 40-60g carbos simples + 30-40g whey.

## Carb Cycling
| Tipo de Día | Carbos | Cuándo |
|---|---|---|
| Alto | 300-400g | Día de pierna/espalda |
| Moderado | 150-200g | Tren sup/inf medio |
| Bajo | 50-100g | Días de descanso |

Máximo anabolismo cuando el cuerpo más lo necesita.

## Refeed Days
Cada 7-14 días en déficit, come al mantenimiento:
- Restaura leptina (hormona de saciedad).
- Previene adaptación metabólica.
- Mejora adherencia psicológica.

## Suplementos
**Tier 1 (evidencia sólida)**: Creatina monohidrato (3-5g/día), Cafeína (3-6mg/kg), Vitamina D3.
**Tier 2 (beneficio marginal)**: Beta-Alanina, Ashwagandha, Omega-3.
**Tier 3 (marketing > ciencia)**: BCAAs innecesarios, quemadores, pre-workouts propietarios.', 'cuerpo', 'avanzado', 4,
  22, false, 100, 200,
  '[]', '[{"question":"¿Qué es el carb cycling?","options":["Montar bicicleta para quemar carbos","Variar la ingesta de carbohidratos según el tipo de día/entrenamiento","Rotar fuentes de carbohidratos cada semana","Comer carbos solo los fines de semana"],"correctAnswer":1,"explanation":"Carb cycling ajusta la cantidad de carbohidratos según si es día de alto volumen o descanso, optimizando composición corporal y rendimiento."}]', '[{"statement":"La creatina monohidrato tiene evidencia sólida para mejorar el rendimiento.","isCorrect":true},{"statement":"El timing nutricional es más importante que el total calórico diario.","isCorrect":false},{"statement":"Un refeed day puede restaurar la leptina durante un déficit.","isCorrect":true},{"statement":"Los BCAAs son imprescindibles si ya consumes proteína suficiente.","isCorrect":false},{"statement":"Los días de alto carb idealmente coinciden con los de mayor volumen.","isCorrect":true},{"statement":"La ventana anabólica post-entreno es de solo 10 minutos.","isCorrect":false},{"statement":"La cafeína tiene respaldo científico como ergogénico.","isCorrect":true},{"statement":"Los quemadores de grasa tienen evidencia comparable a la creatina.","isCorrect":false}]', 'Anónimo Fitness', 'Abs are made in the kitchen.', 'No cambies más de una variable nutricional por vez. Prueba carb cycling 2 semanas antes de evaluar.',
  1500, 'nutricion'
),
(
  'leccion-11', 11, 'Legado Eterno', 'Construir algo que trascienda tu propio tiempo', '# Legado Eterno

## ¿Qué es un Legado?
No es fama ni fortuna. Es la **alteración positiva** que tu existencia produce en otras existencias.

Marco Aurelio gobernó el Imperio Romano. Sus *Meditaciones* — escritas solo para él — son el libro de filosofía más vendido 2000 años después. Sócrates no escribió nada. Platón sí. El mundo occidental cambió.

## Memento Mori, Aplicado
> "¿Qué le queda al mundo cuando tú te vayas?"

Esta pregunta no paraliza. Moviliza. Actúa como si tu tiempo fuera limitado porque lo es.

## Construir > Consumir
- **Consumir**: series, scrolleo, compras sin intención.
- **Construir**: entrenar, leer, escribir, enseñar, crear.

El ratio Construir/Consumir de tu día predice tu legado.

## El Diario como Acto Filosófico
Método Marco Aurelio:
- **Registro**: qué levantaste, cómo te sentiste.
- **Reflexión**: qué aprendiste de ese fallo.
- **Proyección**: qué hará diferente mañana.

## Enseñar como Maestría Final
El nivel más alto de comprensión es poder explicar algo con claridad (Técnica Feynman):
- Explícale a alguien cómo calcular sus macros.
- Escribe sobre por qué Epicteto cambió tu forma de entrenar.
Eso es legado activo.', 'alma', 'avanzado', 4,
  18, false, 90, 175,
  '[]', '[{"question":"¿Cuál es la forma más alta de demostrar maestría según este enfoque?","options":["Tener el mayor 1RM del gym","Enseñar lo aprendido con claridad","Ganar más seguidores en redes","Leer más libros que nadie"],"correctAnswer":1,"explanation":"Enseñar con claridad revela comprensión profunda. Es el método Feynman y el legado del estoico: transformar a quien te rodea."}]', '[{"statement":"Un legado se construye principalmente acumulando riqueza material.","isCorrect":false},{"statement":"Memento Mori nos impulsa a actuar con urgencia y propósito.","isCorrect":true},{"statement":"Construir y consumir tienen el mismo valor en la economía del legado.","isCorrect":false},{"statement":"Marco Aurelio escribió las Meditaciones para publicarlas y ser famoso.","isCorrect":false},{"statement":"Enseñar con claridad indica un dominio profundo del tema.","isCorrect":true},{"statement":"Documentar el proceso de entrenamiento tiene valor filosófico y práctico.","isCorrect":true},{"statement":"Sócrates dejó extensos escritos que fundaron la filosofía occidental.","isCorrect":false},{"statement":"El ratio entre construir y consumir refleja la dirección de tu vida.","isCorrect":true}]', 'Sócrates', 'La vida sin examen no merece ser vivida.', 'Esta semana, documenta tu progreso de forma que otra persona pueda aprender de él en el futuro.',
  1800, 'filosofiaEstoica'
),
(
  'leccion-12', 12, 'Historia - Bruce Lee', 'Sé agua. La filosofía de la adaptabilidad', '# Historia: Bruce Lee

## Más Que un Artista Marcial
Bruce Lee (1940-1973) fue un **filósofo del movimiento**. Nació en San Francisco, creció en Hong Kong y enfrentó el rechazo institucional por enseñar artes marciales a no-chinos. Su respuesta fue crear algo nuevo.

## Jeet Kune Do — Filosofía Hecha Arte Marcial
> "Absorbe lo útil. Descarta lo inútil. Añade lo que es únicamente tuyo."

- Sin dogmas, sin kata obligatorio.
- Funcionalidad sobre tradición.
- Evolución constante.

Esto es exactamente lo que el estoicismo propone: la virtud se adapta al contexto. No hay virtud rígida, sino principio flexible.

## "Be Water, My Friend"
Raíces taoístas: el agua toma cualquier forma sin perder su esencia. No tiene fuerza pero rompe la roca.

Aplicado al entrenamiento:
- Sin gym → parque, casa, escaleras.
- Sin energía → reduce intensidad, sigue el sistema.
- Con lesión → entrena lo que puedes.

**La rigidez rompe. La fluidez persiste.**

## Legado
Murió a los 32 años. Pero cada fighter de MMA, cada gym de artes marciales mixtas debe su existencia a lo que Bruce Lee demostró que era posible.', 'mente', 'intermedio', 5,
  15, false, 75, 150,
  '[]', '[{"question":"¿Qué representa la metáfora del agua en la filosofía de Bruce Lee?","options":["Debilidad y pasividad","Adaptabilidad, fluidez y persistencia sin forma rígida","La importancia de hidratarse al entrenar","Un estilo marcial acuático"],"correctAnswer":1,"explanation":"El agua toma cualquier forma sin perder su esencia. Bruce Lee usaba esto para enseñar adaptabilidad filosófica y marcial."}]', '[{"statement":"Jeet Kune Do es un estilo rígido con kata obligatorios.","isCorrect":false},{"statement":"Bruce Lee usaba métodos avanzados de entrenamiento para su época.","isCorrect":true},{"statement":"''Be water'' implica rendirse ante los obstáculos.","isCorrect":false},{"statement":"La adaptabilidad es el eje filosófico central de Bruce Lee.","isCorrect":true},{"statement":"Bruce Lee rechazó las influencias taoístas en su pensamiento.","isCorrect":false},{"statement":"Bruce Lee entrenaba con frecuencia en doble sesión diaria.","isCorrect":true},{"statement":"JKD invita a conservar lo útil y descartar lo que no funciona.","isCorrect":true},{"statement":"La rigidez filosófica es más valiosa que la flexibilidad según Bruce Lee.","isCorrect":false}]', 'Bruce Lee', 'Be water, my friend.', 'Adapta tu entrenamiento a las circunstancias sin excusas. ¿Sin equipo? Entrena con tu cuerpo.',
  2100, 'mentalidad'
),
(
  'leccion-13', 13, 'Historia - David Goggins', 'La regla del 40% y encallecer la mente', '# Historia: David Goggins

## De 300 Libras a Navy SEAL
Goggins nació en pobreza extrema, sufrió abuso infantil y llegó a pesar 135 kg trabajando como exterminador. A los 24 decidió convertirse en Navy SEAL. Los médicos le dijeron que no podría hacerlo. Lo intentó tres veces. La tercera, con los pies sangrando, pasó.

## La Regla del 40%
> "Cuando el cuerpo dice que quiere parar, la mente solo ha usado el 40% de su capacidad."

El primer impulso de rendirse es el primer gobernador mental. Puedes ignorarlo. Y cuando lo ignoras repetidamente, construyes reservas que el promedio no tiene.

## Callusing the Mind
"La mente es como las manos. Con uso repetido del dolor, desarrolla callos."
- Duchas de agua fría.
- Entrenar en días de lluvia.
- Hacerlo cuando no quieres.

Cada vez que lo hacés en condiciones adversas, **el umbral de dolor mental sube**.

## Cookie Jar Technique
Cuando estés por rendirte, abrí mentalmente tu "jar de victorias":
- Recordá cada vez que superaste algo difícil.
- Usá esos recuerdos como combustible presente.

## El Estoicismo de Goggins
- **Amor Fati**: abrazó el dolor de su infancia como combustible.
- **Memento Mori**: vive como si cada día fuera el último reto.
- **Dicotomía del control**: no puede cambiar su pasado, sí puede controlar el esfuerzo de hoy.', 'mente', 'avanzado', 5,
  20, false, 100, 200,
  '[]', '[{"question":"¿Qué afirma la Regla del 40% de David Goggins?","options":["Solo debes usar el 40% de tu fuerza máxima","Cuando crees estar al límite, solo has usado el 40% de tu capacidad real","Descansa el 40% del tiempo","El 40% del entreno debe ser cardio"],"correctAnswer":1,"explanation":"El primer impulso de rendirse es solo el gobernador mental del 40%. El 60% restante está disponible con voluntad entrenada."}]', '[{"statement":"La Regla del 40% dice que el cuerpo aún tiene capacidad cuando quiere parar.","isCorrect":true},{"statement":"Goggins recomienda buscar la máxima comodidad para rendir mejor.","isCorrect":false},{"statement":"Encallecer la mente implica exponerse regularmente a condiciones adversas.","isCorrect":true},{"statement":"La Cookie Jar Technique usa victorias pasadas como motivación presente.","isCorrect":true},{"statement":"Goggins pasó la selección SEAL al primer intento.","isCorrect":false},{"statement":"Goggins aplica principios estoicos aunque no use ese nombre.","isCorrect":true},{"statement":"El primer impulso de parar representa el límite real del cuerpo.","isCorrect":false},{"statement":"Amor Fati y Memento Mori están presentes en la filosofía de vida de Goggins.","isCorrect":true}]', 'David Goggins', 'When you think you''re done, you''re only 40% done.', 'La próxima vez que quieras parar en un entrenamiento, haz 10 repeticiones más. Solo 10.',
  2400, 'mentalidad'
),
(
  'leccion-14', 14, 'Fisiología del Músculo', 'Fibras, mTOR y la ciencia del crecimiento', '# Fisiología del Músculo

## Tipos de Fibras Musculares

### Tipo I — Oxidativas / Lentas
- Alta resistencia a la fatiga. Baja fuerza, alta eficiencia aeróbica.
- Ricas en mitocondrias. Ideales en corredores, ciclistas.
- Estimuladas por reps altas (15+) y cardio sostenido.

### Tipo IIa — Mixtas
- Híbrido fuerza + resistencia. Domina en deportes de equipo y artes marciales.

### Tipo IIb/IIx — Glucolíticas / Rápidas
- Máxima potencia, baja resistencia. Domina en velocistas y powerlifters.
- Estimuladas por reps bajas (1-5) y movimientos explosivos.

## La Vía mTOR — El Interruptor del Crecimiento
**mTOR (mechanistic Target Of Rapamycin)** activa la síntesis proteica muscular al detectar:
1. **Tensión mecánica** — el peso bajo carga.
2. **Estrés metabólico** — el "pump", el lactato acumulado.
3. **Daño muscular controlado** — microroturas que estimulan reparación.

## Time Under Tension (TUT)
- Excéntrica lenta (2-3 seg): mayor daño muscular.
- Pausa isométrica en el punto de máximo estiramiento: máxima tensión mecánica.

## Síntesis Proteica Muscular
El proceso de construir tejido dura 24-48h post-estímulo:
- Necesitás **1.6g proteína/kg/día** como mínimo para maximizarla.
- **Leucina (~3g por comida)** actúa como disparador directo de mTOR.

## La Sabiduría (Sophia) Aplicada
Conocer la fisiología no es pedantería: es la virtud estoica de actuar con intención y fundamento. El entrenamiento informado produce resultados 2-3× superiores al intuitivo.', 'cuerpo', 'experto', 6,
  25, true, 125, 250,
  '[]', '[{"question":"¿Cuál es la función de las fibras musculares Tipo I?","options":["Máxima potencia y velocidad explosiva","Alta resistencia aeróbica para esfuerzos prolongados","Producción de lactato máxima","Activarse solo en reps de 1-3"],"correctAnswer":1,"explanation":"Las fibras Tipo I son oxidativas y lentas, ideales para resistencia prolongada. Se activan con cardio y altas repeticiones."}]', '[{"statement":"Las fibras tipo I tienen alta resistencia a la fatiga.","isCorrect":true},{"statement":"mTOR es la proteína que activa la síntesis muscular.","isCorrect":true},{"statement":"El músculo crece durante el entrenamiento, no en la recuperación.","isCorrect":false},{"statement":"Las fibras tipo IIb son ideales para esfuerzos de resistencia prolongada.","isCorrect":false},{"statement":"La leucina actúa como disparador directo de mTOR.","isCorrect":true},{"statement":"El Time Under Tension no influye en la hipertrofia.","isCorrect":false},{"statement":"La excéntrica lenta genera mayor daño muscular beneficioso.","isCorrect":true},{"statement":"La síntesis proteica dura hasta 6 horas post-estímulo.","isCorrect":false}]', 'Ciencia del Ejercicio', 'El músculo no crece en el gym. Crece cuando descansas. El gym es solo el estímulo.', 'Para hipertrofia óptima: 3-4 series, 6-15 reps, 2-3 RIR por serie, 60-90 seg de descanso.',
  3000, 'fuerza'
),
(
  'leccion-15', 15, 'Recuperación Óptima', 'Sueño, hielo, sauna y la ciencia del descanso', '# Recuperación Óptima

## Por Qué la Recuperación es el Entrenamiento Real
Entrenas para crear el estímulo. Recuperas para materializar la adaptación. Sin recuperación, solo acumulas fatiga.

## Fases del Sueño
- **Sueño Ligero (N1-N2)**: transición, consolidación de memoria.
- **Sueño Profundo (N3)**: liberación de GH, reparación muscular y tisular. **El más importante para el atleta.**
- **REM**: consolidación emocional y cognitiva, creatividad.

Necesitás 4-5 ciclos de 90 min por noche (7-9h) para que todas las fases ocurran.

## Ice Baths (Baños de Hielo)
- 10-15 min a 10-15°C tras sesiones de alta intensidad.
- Reduce inflamación aguda y DOMS (dolor muscular post-ejercicio).
- Activa el SNS, libera norepinefrina → alertness, foco y bienestar.
- **Precaución**: no usar inmediatamente post-fuerza si tu objetivo es hipertrofia (puede amortiguar adaptaciones inflamatorias necesarias).

## Sauna
- 15-20 min a 80-100°C, 3-4 veces por semana.
- Aumenta GH hasta un 500% en sesiones prolongadas.
- Mejora resistencia cardiovascular (efecto de choque de calor).
- Reduce riesgo cardiovascular en estudios a largo plazo.

## Recuperación Activa
- Caminar 20-30 min: aumenta flujo sanguíneo sin estímulo adicional.
- Foam rolling: mejora movilidad articular y reduce adherencias fasicales.
- Yoga/movilidad: preserva rango de movimiento.

## El Estoico que Duerme
Marco Aurelio se despertaba al amanecer pero también documentó la importancia de la mente descansada para gobernar con justicia. Privarte de sueño no es disciplina: es obstaculizar tu rendimiento.', 'cuerpo', 'avanzado', 6,
  20, true, 90, 175,
  '[]', '[{"question":"¿Qué fase del sueño es crítica para la recuperación y reparación muscular del atleta?","options":["Sueño REM","Sueño Ligero N1","Sueño Profundo N3","Fase de transición N2"],"correctAnswer":2,"explanation":"El sueño profundo (N3) es cuando se libera la hormona de crecimiento y ocurre la reparación tisular real."}]', '[{"statement":"El sueño profundo (N3) es la fase más importante para la reparación muscular.","isCorrect":true},{"statement":"Los ice baths son beneficiosos inmediatamente después de entrenar fuerza para hipertrofia.","isCorrect":false},{"statement":"El sauna puede aumentar significativamente la hormona de crecimiento.","isCorrect":true},{"statement":"La recuperación activa consiste en no hacer nada en absoluto.","isCorrect":false},{"statement":"Se necesitan 4-5 ciclos de sueño de 90 minutos para optimizar la recuperación.","isCorrect":true},{"statement":"Privarse de sueño es una forma válida de disciplina estoica.","isCorrect":false},{"statement":"El foam rolling mejora la movilidad articular.","isCorrect":true},{"statement":"El sueño REM es la fase principal de reparación muscular.","isCorrect":false}]', 'John Lubbock', 'Rest is not idleness.', 'Prioriza el sueño sobre cualquier suplemento. Ningún pre-workout compensa 5h de sueño.',
  3500, 'habitos'
),
(
  'leccion-16', 16, 'Biohacking Básico', 'Mide, no adivines. Optimización con ciencia', '# Biohacking Básico

## La Filosofía del N=1
Biohacking es la experimentación personal con base científica. No confundas con pseudociencia: el objetivo es **medir, analizar y ajustar** en tu propio cuerpo.

Epicteto habría sido biohacker: "Conoce qué depende de ti." Conocer tu HRV depende de ti.

## HRV — Heart Rate Variability
La variabilidad de frecuencia cardíaca es el indicador más poderoso de recuperación del SNC:
- **HRV alto**: sistema nervioso recuperado → entrena intenso.
- **HRV bajo**: sistema nervioso fatigado → entrena suave o descansa.

App recomendadas: HRV4Training, Elite HRV. Medir cada mañana al despertar, mismo horario.

## Sleep Tracking
Plataformas como Oura Ring, Garmin o Whoop rastrean:
- Tiempo en sueño profundo y REM.
- Variabilidad cardíaca nocturna.
- Temperatura corporal (indicador de enfermedad precoz).

## Ayuno Intermitente 16:8
- Come en ventana de 8h (ej: 12pm-8pm).
- Ayunas 16h (incluye sueño).
- Beneficios: autofagia, sensibilidad a insulina, claridad mental.
- **No obligatorio**: si tu rendimiento y músculo se mantienen, es una herramienta útil.

## Nootropics (Lo Que Funciona)
- **Cafeína + L-Teanina**: foco sin ansiedad. Ratio 1:2.
- **Creatina**: beneficios cognitivos además de musculares.
- **Omega-3 (EPA/DHA)**: función cerebral y antiinflamatorio.

## La Experimentación Estoica
Séneca ayunaba voluntariamente. No por moda: para conocer sus límites y no ser esclavo del confort. El biohacking moderno hace lo mismo con datos.', 'cuerpo', 'experto', 6,
  22, true, 100, 200,
  '[]', '[{"question":"¿Qué indica un HRV (Heart Rate Variability) elevado?","options":["Fatiga del sistema nervioso central","Sistema nervioso recuperado y listo para entrenamiento intenso","Que debes descansar obligatoriamente","Problema cardíaco"],"correctAnswer":1,"explanation":"HRV alto refleja que el SNC está bien recuperado. Es el indicador más preciso para tomar decisiones de entrenamiento."}]', '[{"statement":"HRV alto indica que el sistema nervioso está bien recuperado.","isCorrect":true},{"statement":"El biohacking es pseudociencia sin base experimental.","isCorrect":false},{"statement":"El ayuno 16:8 puede mejorar la sensibilidad a la insulina.","isCorrect":true},{"statement":"La combinación cafeína + L-Teanina reduce la ansiedad de la cafeína sola.","isCorrect":true},{"statement":"Medir el sueño no aporta información útil para el entrenamiento.","isCorrect":false},{"statement":"El biohacking personal (N=1) busca medir, analizar y ajustar.","isCorrect":true},{"statement":"Un HRV bajo indica que debes entrenar al máximo ese día.","isCorrect":false},{"statement":"La creatina también tiene beneficios cognitivos documentados.","isCorrect":true}]', 'Tim Ferriss', 'Optimize relentlessly.', 'Comienza midiendo solo HRV y sueño por 4 semanas antes de agregar más variables.',
  4000, 'habitos'
),
(
  'leccion-17', 17, 'Liderazgo Estoico', 'Liderar desde el frente: la virtud como ejemplo', '# Liderazgo Estoico

## Marco Aurelio: El Filósofo-Rey
Marco Aurelio (121-180 d.C.) gobernó el mayor Imperio del mundo durante la plaga Antonina, guerras constantes y traiciones internas. Sus *Meditaciones* no son un libro de autoayuda: son el diario privado de un hombre que se exigía a sí mismo a diario en el poder máximo.

Su modelo de liderazgo: **Servant Leadership** antes de que tuviera nombre.

## Principios del Liderazgo Estoico

### 1. Acciones > Palabras
El estoico no proclama sus valores: los encarna. La virtud visible inspira más que cualquier discurso.

### 2. Liderar desde el Frente
Marco Aurelio dormía en el campo de batalla. No enviaba al ejército: lo acompañaba. **El líder no pide lo que no está dispuesto a hacer.**

### 3. Respuesta al Conflicto
> "The best answer to anger is silence." — Marco Aurelio

No reactivo. No impulsivo. El silencio le da tiempo a la razón para superar a la emoción.

### 4. Servant Leadership
Liderar es servir. El poder es un instrumento al servicio del bien común, no del ego del líder.

## Aplicado al Gym y la Vida
- Como atleta: liderás tu propio cuerpo con coherencia (entrenas como hablas).
- Como compañero: el que más levanta no es el que más grita.
- Como mentor: tu progreso inspira; tu honestidad enseña.

## El Líder Estoico en la Crisis
Antes de reaccionar, practica la **Dicotomía del Control**:
- ¿Esto depende de mí? → actúo.
- ¿No depende de mí? → lo acepto y hago lo que sí puedo.', 'alma', 'avanzado', 7,
  18, true, 90, 175,
  '[]', '[{"question":"¿Qué tipo de liderazgo practicaba Marco Aurelio según su filosofía estoica?","options":["Autoritario y centralizado","Servant Leadership (liderazgo al servicio de los demás)","Laissez-faire sin intervención","Liderazgo por miedo"],"correctAnswer":1,"explanation":"Marco Aurelio gobernó desde la virtud y el servicio al bien común, acompañando personalmente a su ejército y escribiendo reflexiones privadas de autoevaluación."}]', '[{"statement":"Marco Aurelio practicaba un modelo de liderazgo de servicio al bien común.","isCorrect":true},{"statement":"El liderazgo estoico prioriza los discursos sobre las acciones.","isCorrect":false},{"statement":"El silencio ante la ira permite que la razón supere a la emoción.","isCorrect":true},{"statement":"Marco Aurelio enviaba al ejército sin acompañarlo al campo.","isCorrect":false},{"statement":"El líder estoico pide esfuerzo que él mismo está dispuesto a hacer.","isCorrect":true},{"statement":"La virtud visible en acciones inspira más que un discurso.","isCorrect":true},{"statement":"La Dicotomía del Control no tiene aplicación en el liderazgo.","isCorrect":false},{"statement":"Servant Leadership significa que el líder prioriza el bien común sobre su ego.","isCorrect":true}]', 'Marco Aurelio', 'The best answer to anger is silence.', 'Esta semana, lidera con acciones. Silencia una queja y reemplázala con una solución.',
  5000, 'filosofiaEstoica'
),
(
  'leccion-18', 18, 'Construir tu Legado', 'Ikigai, valores core y tu manifiesto personal', '# Construir tu Legado

## "Know Thyself" — La Base de Todo
El Oráculo de Delfos tenía una sola inscripción: *Gnothi Seauton* — "Conócete a ti mismo."

Sócrates pasó su vida preguntando en lugar de afirmando, porque sabía que el autoengaño es el mayor obstáculo para el crecimiento real.

## Ikigai: Tu Razón de Ser
Concepto japonés que identifica el punto donde convergen cuatro dimensiones:
1. **Lo que amas** (pasión).
2. **Lo que haces bien** (vocación).
3. **Lo que el mundo necesita** (misión).
4. **Por lo que te pagarían** (profesión).

El **Ikigai** es la intersección de las cuatro. Quien lo encuentra levanta con propósito. Quien no, sobrevive.

## Tus 5 Valores Core
Herramienta de claridad: define los 5 valores que son no-negociables en tu vida:
- Honestidad. Disciplina. Familia. Creación. Salud.
- Evalúa semanalmente: ¿tus decisiones reflejaron estos valores?

## El Manifiesto Personal
Marco Aurelio escribía sus Meditaciones. Tu manifiesto es tu versión:
1. Quién eres (identidad).
2. Qué valoras por encima de todo.
3. Cómo quieres ser recordado.
4. Qué estás construyendo.
5. Qué reglas no romperás jamás.

Revisalo anualmente. Ajústalo cuando crezcas.

## La Filosofía Personal como Brújula
Sin una filosofía personal explícita, tomarás decisiones reactivas ante la presión del momento. Con ella, tenés una brújula que funciona incluso en la oscuridad.', 'alma', 'experto', 7,
  25, true, 125, 250,
  '[]', '[{"question":"¿Qué es el Ikigai?","options":["Una técnica de meditación budista","La intersección de lo que amás, hacés bien, necesita el mundo y te pagan","Un sistema de entrenamiento japonés","Un tipo de dieta oriental"],"correctAnswer":1,"explanation":"Ikigai es el concepto japonés de la razón de ser: el punto donde convergen pasión, vocación, misión y profesión."}]', '[{"statement":"El Ikigai es la intersección de lo que amás, hacés bien, el mundo necesita y te pagan.","isCorrect":true},{"statement":"Definir valores core es un ejercicio puramente teórico sin impacto en decisiones.","isCorrect":false},{"statement":"Sócrates creía que el autoconocimiento era la base del crecimiento personal.","isCorrect":true},{"statement":"El manifiesto personal debe escribirse una sola vez y nunca revisarse.","isCorrect":false},{"statement":"Una filosofía personal actúa como brújula en momentos de presión.","isCorrect":true},{"statement":"La pasión sola es suficiente para definir el Ikigai.","isCorrect":false},{"statement":"Los 5 valores core deben ser evaluados regularmente con las decisiones reales.","isCorrect":true},{"statement":"El Ikigai es un concepto de origen estoico griego.","isCorrect":false}]', 'Sócrates', 'Know thyself.', 'Escribe tus 5 valores core esta semana. Luego evalúa si tus últimas 7 decisiones los reflejaron.',
  6000, 'filosofiaEstoica'
),
(
  'leccion-19', 19, 'Enseñar es Aprender', 'La técnica Feynman y el poder de dar sin esperar retorno', '# Enseñar es Aprender

## La Técnica Feynman
Richard Feynman, Premio Nobel de Física, tenía un método para saber si realmente entendía algo:

1. **Toma un concepto** que quieras dominar.
2. **Explícalo como si se lo dijeras a un niño de 12 años.**
3. **Identificá dónde te trabas** o usás jerga sin comprenderla.
4. **Volvé a la fuente** a rellenar esos huecos.
5. **Simplificá** hasta que la explicación fluya sin términos técnicos innecesarios.

Si no podés explicarlo simple, no lo entendés.

## Por Qué Enseñar Consolida
Cuando enseñas:
- Organizás el conocimiento en tu mente.
- Identificás gaps que no veías al solo leer.
- El conocimiento se consolida en memoria a largo plazo (efecto de recuperación activa).
- Creás impacto en otro ser humano.

## Mentoría como Práctica Estoica
Epicteto fue esclavo. Zeno de Citio aprendió de Crates el Cínico. La cadena se extiende:
- Recibiste conocimiento. Transmitilo.
- No para verte bueno: para cerrar el ciclo del aprendizaje.

## Dar sin Esperar Retorno
*"Nusquam est qui ubique est."* — Quien está en todas partes no está en ninguna. Cuando enseñas por ego o expectativa de retorno, la calidad cae. Cuando enseñas para genuinamente transferir valor, la calidad sube.

El estoico da porque hacerlo es virtuoso en sí mismo. La respuesta del destinatario no está bajo su control.', 'alma', 'avanzado', 7,
  15, true, 90, 175,
  '[]', '[{"question":"¿De qué trata la Técnica Feynman?","options":["Memorizar fórmulas físicas con tarjetas","Explicar un concepto con lenguaje simple para identificar huecos en tu comprensión","Un método de entrenamiento de alta intensidad","Una técnica de meditación trascendental"],"correctAnswer":1,"explanation":"Feynman descubrió que la capacidad de explicar algo con simplicidad es el verdadero marcador de comprensión profunda."}]', '[{"statement":"La Técnica Feynman consiste en explicar un concepto como si hablaras con un niño.","isCorrect":true},{"statement":"Enseñar debilita el propio conocimiento al distribuirlo.","isCorrect":false},{"statement":"Identificar donde te trabas al explicar revela huecos reales en tu comprensión.","isCorrect":true},{"statement":"La mentoría en el estoicismo era rara porque cada sabio aprendía solo.","isCorrect":false},{"statement":"Enseñar consolida el conocimiento en la memoria a largo plazo.","isCorrect":true},{"statement":"Enseñar por ego produce mayor calidad pedagógica.","isCorrect":false},{"statement":"El ciclo del aprendizaje se completa al transmitir lo recibido.","isCorrect":true},{"statement":"Si podés explicarlo con jerga técnica, es señal de máximo dominio.","isCorrect":false}]', 'Joseph Joubert', 'Enseñar es aprender dos veces.', 'Explícale la sobrecarga progresiva a alguien que recién empieza. Si no podés hacerlo simple, aún no lo dominas.',
  7000, 'mentalidad'
),
(
  'leccion-20', 20, 'El Atleta Filósofo', 'El examen final es tu vida', '# El Atleta Filósofo

## La Síntesis Final
Has llegado al pináculo. La integración de Cuerpo, Mente y Espíritu.
Repasemos:
- Has estudiado ciencia del entrenamiento (sobrecarga, fibras).
- Asimilaste la nutrición y recuperación extrema.
- Forjaste hábitos de acero y liderazgo.

## Tres Dimensiones
1. **Cuerpo Fuerte**: Entrena consistente y levanta la carga del mundo.
2. **Mente Clara**: Meditación, dictomia, visualización. No dejes que las emociones te paralicen.
3. **Espíritu Elevado**: Legado, virtudes, servicio. Ikigai inquebrantable.

## El Examen Final es la Vida Misma
El fin de esta academia es el día uno del resto de tu existencia virtuosa. 
Terminemos con *Memento Mori*: Cada segundo cuenta.
Demuestra ser un Atleta del Espíritu.
', 'cuerpo', 'experto', 8,
  30, true, 250, 500,
  '[]', '[{"question":"¿Cuál es el verdadero examen final tras toda lección filosófica y de esfuerzo?","options":["Resolver todo en 10 minutos","La propia vida (El día a día de tus acciones y respuestas)","Ganar un torneo","Desarrollar fuerza irreal"],"correctAnswer":1,"explanation":"La filosofía estoica real no vive en papel, vive en tus acciones. Cómo reaccionaste hoy en la adversidad fue tu prueba actual."},{"question":"¿Cuándo termina el sendero del aprendizaje físico y estoico?","options":["A la graduación","A los 3 años","Cuando se sube la liga","Nunca (hasta la muerte constante entrenamiento y pulido)"],"correctAnswer":3,"explanation":"Mientras vivas, eres un estudiante. Siempre habrá una tentación más que resistir y un miedo nuevo ante el cual aplicar coraje."}]', '[{"statement":"El entrenamiento termina tras cursar la Academia.","isCorrect":false},{"statement":"El conocimiento es inútil si la vida y las acciones no lo reflejan.","isCorrect":true},{"statement":"El Atleta Filósofo solo requiere tener masa muscular.","isCorrect":false},{"statement":"Memento Mori nos recuerda emplear bien el tiempo.","isCorrect":true},{"statement":"La mente clara implica que nunca enfrentes problemas.","isCorrect":false},{"statement":"Sintetizar cuerpo, mente y alma fue el objetivo principal de los griegos clásicos.","isCorrect":true},{"statement":"La dicotomía del control se abordó en los fundamentos.","isCorrect":true},{"statement":"Las 3 dimensiones son sólo teoría inaplicable en el gym.","isCorrect":false}]', 'Epicteto / Sénceca', 'No lo que nos pasa, sino lo que hacemos con lo que nos pasa.', 'El verdadero aprendizaje empieza cuando la academia termina.',
  7000, 'filosofiaEstoica'
)
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  content = EXCLUDED.content,
  pillar = EXCLUDED.pillar,
  difficulty = EXCLUDED.difficulty,
  modulo = EXCLUDED.modulo,
  duration_minutes = EXCLUDED.duration_minutes,
  is_premium = EXCLUDED.is_premium,
  coin_reward = EXCLUDED.coin_reward,
  xp_reward = EXCLUDED.xp_reward,
  key_takeaways = EXCLUDED.key_takeaways,
  quiz = EXCLUDED.quiz,
  ejercicios = EXCLUDED.ejercicios,
  author = EXCLUDED.author,
  quote = EXCLUDED.quote,
  tips = EXCLUDED.tips,
  required_league_points = EXCLUDED.required_league_points,
  legacy_category = EXCLUDED.legacy_category;