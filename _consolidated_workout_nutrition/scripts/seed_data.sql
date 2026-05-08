-- SEED DATA

-- Insert Academy Modules
INSERT INTO public.academy_modules (id, numero, titulo, descripcion, icon, color, required_league_points, lessons)
VALUES ('modulo-1', 1, 'Fundamentos del Atleta Estoico', 'Bases del entrenamiento, nutrición y filosofía estoica. Introduce los conceptos de sobrecarga progresiva, macronutrientes, dicotomía del control, Amor Fati, Memento Mori y Praemeditatio Malorum.', '🏛️', '#2A2A2A', 0, '["leccion-1","leccion-2","leccion-3"]')
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  titulo = EXCLUDED.titulo,
  descripcion = EXCLUDED.descripcion,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  required_league_points = EXCLUDED.required_league_points,
  lessons = EXCLUDED.lessons;
INSERT INTO public.academy_modules (id, numero, titulo, descripcion, icon, color, required_league_points, lessons)
VALUES ('modulo-2', 2, 'Disciplina y Hábitos', 'Construye rutinas inquebrantables y mentalidad ganadora. Incluye el Ritual Estoico Matutino y la historia de Arnold Schwarzenegger.', '💪', '#EF4444', 200, '["leccion-4","leccion-5"]')
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  titulo = EXCLUDED.titulo,
  descripcion = EXCLUDED.descripcion,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  required_league_points = EXCLUDED.required_league_points,
  lessons = EXCLUDED.lessons;
INSERT INTO public.academy_modules (id, numero, titulo, descripcion, icon, color, required_league_points, lessons)
VALUES ('modulo-3', 3, 'Entrenamiento Avanzado', 'Periodización, progresión y sistemas de entrenamiento. Temas: sobrecarga progresiva científica, el poder del 1% diario, sistemas sobre motivación.', '🏋️', '#F97316', 500, '["leccion-6","leccion-7","leccion-8"]')
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  titulo = EXCLUDED.titulo,
  descripcion = EXCLUDED.descripcion,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  required_league_points = EXCLUDED.required_league_points,
  lessons = EXCLUDED.lessons;
INSERT INTO public.academy_modules (id, numero, titulo, descripcion, icon, color, required_league_points, lessons)
VALUES ('modulo-4', 4, 'Nutrición Profunda', 'Nutrición avanzada, timing y legado. Incluye periodización avanzada, nutrient timing, carb cycling, y la reflexión sobre construir un legado eterno.', '🥗', '#22C55E', 1100, '["leccion-9","leccion-10","leccion-11"]')
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  titulo = EXCLUDED.titulo,
  descripcion = EXCLUDED.descripcion,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  required_league_points = EXCLUDED.required_league_points,
  lessons = EXCLUDED.lessons;
INSERT INTO public.academy_modules (id, numero, titulo, descripcion, icon, color, required_league_points, lessons)
VALUES ('modulo-5', 5, 'Historias de Legado', 'Aprende de los grandes: Bruce Lee (filosofía del agua, adaptabilidad, Jeet Kune Do) y David Goggins (la regla del 40%, callusing the mind).', '🏆', '#FFD700', 1500, '["leccion-12","leccion-13"]')
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  titulo = EXCLUDED.titulo,
  descripcion = EXCLUDED.descripcion,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  required_league_points = EXCLUDED.required_league_points,
  lessons = EXCLUDED.lessons;
INSERT INTO public.academy_modules (id, numero, titulo, descripcion, icon, color, required_league_points, lessons)
VALUES ('modulo-6', 6, 'Ciencia del Rendimiento', 'Fisiología muscular, recuperación óptima (sueño REM vs profundo, ice baths, sauna), y biohacking básico.', '🔬', '#3B82F6', 3000, '["leccion-14","leccion-15","leccion-16"]')
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  titulo = EXCLUDED.titulo,
  descripcion = EXCLUDED.descripcion,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  required_league_points = EXCLUDED.required_league_points,
  lessons = EXCLUDED.lessons;
INSERT INTO public.academy_modules (id, numero, titulo, descripcion, icon, color, required_league_points, lessons)
VALUES ('modulo-7', 7, 'Comunidad y Legado', 'Liderazgo estoico, construir filosofía personal (ikigai, valores core, manifiesto), y enseñar como forma suprema de aprendizaje.', '🌍', '#8B5CF6', 5000, '["leccion-17","leccion-18","leccion-19"]')
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  titulo = EXCLUDED.titulo,
  descripcion = EXCLUDED.descripcion,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  required_league_points = EXCLUDED.required_league_points,
  lessons = EXCLUDED.lessons;
INSERT INTO public.academy_modules (id, numero, titulo, descripcion, icon, color, required_league_points, lessons)
VALUES ('modulo-8', 8, 'Maestría Estoica', 'Lección final integradora: "El Atleta Filósofo". Síntesis de todo lo aprendido. El examen final es la vida misma.', '✨', '#D4AF37', 7000, '["leccion-20"]')
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  titulo = EXCLUDED.titulo,
  descripcion = EXCLUDED.descripcion,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  required_league_points = EXCLUDED.required_league_points,
  lessons = EXCLUDED.lessons;
INSERT INTO public.academy_modules (id, numero, titulo, descripcion, icon, color, required_league_points, lessons)
VALUES ('modulo-9', 9, 'El Templo del Cuerpo', 'Profundización en la fisiología del guerrero: Ley de Milon, Heavy Duty de Mentzer y bioquímica del esfuerzo.', '🏛️', '#3B82F6', 9000, '["leccion-21","leccion-22","leccion-23","leccion-24","leccion-25"]')
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  titulo = EXCLUDED.titulo,
  descripcion = EXCLUDED.descripcion,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  required_league_points = EXCLUDED.required_league_points,
  lessons = EXCLUDED.lessons;
INSERT INTO public.academy_modules (id, numero, titulo, descripcion, icon, color, required_league_points, lessons)
VALUES ('modulo-10', 10, 'Fortaleza Mental Suprema', 'Dominio de la atención y la voluntad: Deep Work, Dicotomía del Control y el arte de la disciplina absoluta.', '🧠', '#8B5CF6', 12000, '["leccion-26","leccion-27","leccion-28","leccion-29","leccion-30","leccion-31"]')
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  titulo = EXCLUDED.titulo,
  descripcion = EXCLUDED.descripcion,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  required_league_points = EXCLUDED.required_league_points,
  lessons = EXCLUDED.lessons;
INSERT INTO public.academy_modules (id, numero, titulo, descripcion, icon, color, required_league_points, lessons)
VALUES ('modulo-11', 11, 'El Camino del Legado', 'Trascendencia y propósito: Liderazgo por el ejemplo y la construcción de sistemas de valores generacionales.', '🌳', '#D4AF37', 15000, '["leccion-32","leccion-33","leccion-34"]')
ON CONFLICT (id) DO UPDATE SET
  numero = EXCLUDED.numero,
  titulo = EXCLUDED.titulo,
  descripcion = EXCLUDED.descripcion,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  required_league_points = EXCLUDED.required_league_points,
  lessons = EXCLUDED.lessons;

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

INSERT INTO public.academy_lessons_v2 (
  id, numero, title, subtitle, content, pillar, difficulty, modulo, 
  duration_minutes, is_premium, coin_reward, xp_reward, 
  key_takeaways, quiz, ejercicios, author, quote, tips, 
  required_league_points, legacy_category
) VALUES
(
  'leccion-21', 21, 'El Templo del Guerrero', 'Tu cuerpo es tu primera responsabilidad', '# El Templo del Guerrero

## La Filosofía del Cuerpo

Marco Aurelio entrenaba cada día al amanecer. No porque fuera emperador — sino porque entendía una verdad fundamental:

**Tu cuerpo es tu primer proyecto.**

### Los 4 Pilares Físicos

1. **Fuerza** — La capacidad de mover el mundo.
2. **Resistencia** — La capacidad de no rendirte.
3. **Flexibilidad** — La capacidad de adaptarte.
4. **Potencia** — La capacidad de explosionar cuando importa.

## El Entrenamiento Estoico

Los estoicos entrenaban para estar preparados para cualquier desafío:
- **Séneca** nadaba en aguas frías.
- **Epicteto** caminaba kilómetros diarios.
- **Catón** entrenaba wrestling y lucha.

> "Ningún ciudadano tiene derecho a ser aficionado en el entrenamiento físico." — Sócrates

### Los 5 Movimientos Fundamentales
**Push** (Empuje), **Pull** (Tracción), **Squat** (Sentadilla), **Hinge** (Bisagra), **Core**.

Domina estos cinco y dominas el movimiento humano.

## El Principio del 1%

No necesitas ser perfecto. Solo necesitas ser 1% mejor cada día.
En 365 días, serás 37 veces mejor que hoy.', 'cuerpo', 'principiante', 9,
  5, false, 50, 100,
  '["Tu cuerpo es el único hogar que habitarás toda tu vida","El entrenamiento físico fortalece también la mente","La disciplina en el gimnasio se transfiere a la vida","No necesitas un gimnasio perfecto, solo consistencia"]', '[{"question":"¿Cuál era la práctica de entrenamiento de Séneca?","options":["Correr maratones","Nadar en aguas frías","Levantar pesas","Yoga"],"correctAnswer":1,"explanation":"Séneca practicaba nadar en aguas frías como ejercicio de resistencia física y mental."},{"question":"¿Cuáles son los 4 pilares físicos del guerrero estoico?","options":["Cardio, pesas, yoga, natación","Fuerza, resistencia, flexibilidad, potencia","Correr, saltar, lanzar, trepar","Push, pull, legs, core"],"correctAnswer":1,"explanation":"Los 4 pilares físicos son: Fuerza, Resistencia, Flexibilidad y Potencia."}]', '[{"statement":"El entrenamiento físico también fortalece la mente.","isCorrect":true},{"statement":"Séneca nadaba en aguas frías como práctica de disciplina.","isCorrect":true},{"statement":"La potencia es la capacidad de no rendirte.","isCorrect":false},{"statement":"Los 5 movimientos fundamentales incluyen Push, Pull, Squat, Hinge y Core.","isCorrect":true},{"statement":"El principio del 1% diario genera 37x mejora en un año.","isCorrect":true},{"statement":"Solo el gym de calidad produce resultados, no la consistencia.","isCorrect":false},{"statement":"Marco Aurelio entrenaba cada mañana a pesar de ser emperador.","isCorrect":true},{"statement":"La flexibilidad no forma parte de los pilares físicos.","isCorrect":false}]', 'Marco Aurelio', 'Tienes poder sobre tu mente, no sobre los eventos externos. Date cuenta de esto y encontrarás fuerza.', 'Esta semana entrena 3 días con intención. No importa qué hagas, solo hazlo conscientemente.',
  0, 'fuerza'
),
(
  'leccion-22', 22, 'La Ley de la Sobrecarga', 'El secreto de Milón de Crotona', '# La Ley de la Sobrecarga

## La Leyenda de Milón
Milón de Crotona, el atleta más famoso de la Grecia antigua, entrenaba cargando un ternero sobre sus hombros cada día. A medida que el ternero crecía y se convertía en un buey, Milón se volvía más fuerte.

**Eso es la Sobrecarga Progresiva.**

### Los 3 Pilares del Crecimiento Muscular
1. **Tensión Mecánica**: El peso que levantas genera microroturas que la recuperación repara más fuertes.
2. **Estrés Metabólico**: El "quemazón" (acumulación de metabolitos como el lactato).
3. **Daño Muscular**: Microdesgarros controlados que se reparan más gruesos y fuertes.

### El Poder de las Micro-cargas
No necesitas añadir 10 kg cada semana. Añadir **0.5 kg o 1 repetición más** es suficiente para enviarle la señal a tu cuerpo de que debe adaptarse.

> "Si no hay progresión, no hay transformación."

### Forma sobre Ego
Más peso con mala técnica no es progreso: es una lesión programada. El estoico no entrena para impresionar — entrena para mejorar.', 'cuerpo', 'principiante', 9,
  7, false, 50, 100,
  '["La sobrecarga progresiva es el motor del crecimiento","Micro-cargas: el poder de lo pequeño","Tensión mecánica vs Fatiga metabólica","Registrar tus pesos es obligatorio"]', '[{"question":"¿Quién fue el atleta griego que ilustra la sobrecarga progresiva?","options":["Hércules","Milón de Crotona","Aquiles","Leónidas"],"correctAnswer":1,"explanation":"Milón de Crotona cargaba un buey que crecía con él, ilustrando perfectamente la progresión gradual del estímulo."}]', '[{"statement":"La sobrecarga progresiva es el motor principal del crecimiento muscular.","isCorrect":true},{"statement":"El estrés metabólico es irrelevante para la hipertrofia.","isCorrect":false},{"statement":"Añadir 0.5 kg por semana es suficiente para el progreso.","isCorrect":true},{"statement":"El daño muscular controlado lleva a fibras más fuertes tras la recuperación.","isCorrect":true},{"statement":"Milón de Crotona representaba el principio de sobrecarga progresiva.","isCorrect":true},{"statement":"La forma técnica importa menos que el peso levantado.","isCorrect":false},{"statement":"El registro de pesos es innecesario si entrenas con alta intensidad.","isCorrect":false},{"statement":"La tensión mecánica es uno de los 3 pilares del crecimiento muscular.","isCorrect":true}]', 'Milón de Crotona', 'Lo que no te mata te hace más fuerte, siempre que aumentes la dosis gradualmente.', 'Compra un cuaderno o usa una app para anotar tus pesos. Tu única meta: superar los números de la semana pasada.',
  0, 'fuerza'
),
(
  'leccion-23', 23, 'Heavy Duty e Intensidad', 'La filosofía de Mike Mentzer — menos es más', '# Heavy Duty: Intensidad Absoluta

## El Error del Alto Volumen
Muchos entrenan 2 horas al día, 6 días a la semana y no ven resultados. Mike Mentzer demostró que esto a menudo lleva al sobreentrenamiento.

### El Sistema Heavy Duty
1. **Intensidad Máxima**: Cada serie como si tu progreso dependiera de ella.
2. **Bajo Volumen**: 1-2 series de alta calidad superan a 20 mediocres.
3. **Recuperación Extendida**: El cuerpo necesita tiempo para supercompensar.

### La Falla Real
La falla muscular no es cuando "te cansas". Es cuando, a pesar de tu máximo esfuerzo, la barra no se mueve.
**Ese es el momento en que el cuerpo decide crecer.**

Técnicas de intensidad avanzada:
- **Drop Sets**: Reducir el peso al fallo y continuar.
- **Rest-Pause**: Pausas de 10 seg entre minisets al fallo.
- **Forced Reps**: Con ayuda de un compañero cuando ya no puedes solo.

### La Filosofía Estoica de la Calidad
Epicteto sobre la acción: no la cantidad de palabras, sino el peso de cada palabra. Mentzer aplicó esto al hierro: no la cantidad de series, sino el peso de cada repetición.', 'cuerpo', 'intermedio', 9,
  10, false, 60, 120,
  '["Menos es más si la intensidad es máxima","La Falla Muscular es el interruptor del crecimiento","La recuperación es donde ocurre el músculo","Calidad sobre cantidad absoluta"]', '[{"question":"¿Cuál es el pilar fundamental del sistema Heavy Duty de Mike Mentzer?","options":["Entrenar 3 horas diarias","La intensidad máxima con bajo volumen","Comer poco","Hacer mucho cardio"],"correctAnswer":1,"explanation":"La intensidad absoluta con pocas series de máxima calidad diferencia al sistema Mentzer del entrenamiento de alto volumen tradicional."}]', '[{"statement":"El sistema Heavy Duty prioriza la intensidad sobre el volumen.","isCorrect":true},{"statement":"Entrenar 6 días a la semana siempre produce mejores resultados.","isCorrect":false},{"statement":"La falla muscular real ocurre cuando no puedes mover la barra con máximo esfuerzo.","isCorrect":true},{"statement":"Los Drop Sets reducen el peso al fallo para continuar el set.","isCorrect":true},{"statement":"Mike Mentzer recomendaba 20+ series por grupo muscular.","isCorrect":false},{"statement":"La recuperación extendida permite la supercompensación muscular.","isCorrect":true},{"statement":"Rest-Pause usa pausas de 10 segundos entre minisets al fallo.","isCorrect":true},{"statement":"La calidad de cada repetición importa menos que el número total.","isCorrect":false}]', 'Mike Mentzer', 'No es cuánto tiempo pasas en el gimnasio, sino qué haces mientras estás allí.', 'En tu próximo entrenamiento, elige UN ejercicio y llévalo a la falla absoluta. Siente la diferencia.',
  0, 'fuerza'
),
(
  'leccion-24', 24, 'La Era Dorada', 'Arnold, Ronnie y el Legado del Hierro', '# La Era Dorada del Hierro

## Arnold: El Roble Austriaco
Arnold Schwarzenegger no solo levantaba pesas — esculpía su cuerpo como una estatua griega. Su secreto mayor era la **Visualización**: imaginaba sus bíceps como montañas antes de ejecutar cada curl.

### La Mentalidad de Campeón de Arnold
- Entrenaba hasta 5-6 horas diarias, incluyendo sábado y domingo.
- Nunca faltaba, sin importar el dolor o el cansancio.
- **"Si sangra, puede morir. Si puedo levantar, puedo ganar."**

### Ronnie Coleman: Fuerza Bruta y Arte
*"Everybody wants to be a bodybuilder, but nobody wants to lift no heavy-ass weights."*

Ronnie trajo una densidad muscular nunca antes vista: 800 libras de sentadilla y un físico que parecía esculpido en mármol.

### La Lección Filosófica
La Era Dorada (Gold''s Gym, Venice Beach, 1970s) fue única porque los atletas no entrenaban para redes sociales — entrenaban para la maestría.

El estoico reconoce esta diferencia: **entrenas para ser, no para parecer.**', 'cuerpo', 'intermedio', 9,
  12, false, 75, 150,
  '["Aesthetics: Proporción y simetría","La disciplina de los campeones","Ronnie Coleman: \"Light Weight Baby\"","Visualización de la victoria"]', '[{"question":"¿Qué técnica mental usaba Arnold para mejorar su físico?","options":["Meditación zen","Visualización creativa","Hipnosis","Lectura rápida"],"correctAnswer":1,"explanation":"Arnold visualizaba sus músculos creciendo y alcanzando formas específicas durante el entrenamiento."}]', '[{"statement":"Arnold usaba la visualización como herramienta de entrenamiento mental.","isCorrect":true},{"statement":"Ronnie Coleman ganó 8 títulos de Mr. Olympia.","isCorrect":true},{"statement":"La Era Dorada se asocia principalmente con el gym de Nueva York.","isCorrect":false},{"statement":"Arnold entrenaba hasta 5-6 horas diarias en su etapa competitiva.","isCorrect":true},{"statement":"La visualización es una técnica sin base científica.","isCorrect":false},{"statement":"El estoico entrena para ser, no para parecer.","isCorrect":true},{"statement":"La frase ''Light Weight Baby'' es de Arnold Schwarzenegger.","isCorrect":false},{"statement":"Gold''s Gym en Venice Beach fue el epicentro de la Era Dorada.","isCorrect":true}]', 'Arnold Schwarzenegger', 'La mente es la que construye el cuerpo. El primer paso es visualizarlo.', 'Antes de tu próximo entrenamiento, dedica 3 minutos a visualizar exactamente cómo lo ejecutarás.',
  0, 'mentalidad'
),
(
  'leccion-25', 25, 'Bioquímica del Guerrero', 'Lactato, fatiga y la ciencia del esfuerzo', '# Bioquímica del Esfuerzo

## El Mito del Ácido Láctico
Durante años se pensó que el lactato causaba el dolor muscular (DOMS). **Falso.** El lactato es una moneda energética que tu cuerpo usa cuando el oxígeno escasea.

### El Umbral de Lactato
Es el punto donde tu cuerpo produce más lactato del que puede reciclar. Entrar en este umbral y sostenerlo es lo que forja la resistencia de élite.

### Fatiga Central vs Fatiga Periférica
- **Fatiga Periférica**: El músculo en sí se agota (local).
- **Fatiga Central**: El cerebro reduce el reclutamiento de fibras como mecanismo de protección.

Goggins explotó esto: puedes convencer a tu cerebro de reclinar ese gobernador.

### Las Hormonas del Éxito
El entrenamiento pesado libera:
- **Testosterona**: Para la fuerza y el carácter.
- **Hormona de Crecimiento (GH)**: Para la reparación celular.
- **Endorfinas**: El analgésico natural del cuerpo.
- **BDNF (Brain-Derived Neurotrophic Factor)**: Literalmente crece nuevas neuronas.', 'cuerpo', 'experto', 9,
  15, false, 100, 200,
  '["El ácido láctico es energía reciclable","La fatiga central vs fatiga periférica","Hormonas del crecimiento y testosterona","El umbral de lactato determina tu resistencia"]', '[{"question":"¿Qué es realmente el lactato?","options":["Veneno muscular que causa agujetas","Residuo de grasa","Combustible de alta densidad energética reutilizable","Agua residual del músculo"],"correctAnswer":2,"explanation":"El lactato es transportado a otros órganos para ser usado como energía rápida, no es un desecho."}]', '[{"statement":"El lactato es una fuente de energía, no un desecho.","isCorrect":true},{"statement":"La fatiga central ocurre cuando el cerebro reduce el reclutamiento de fibras.","isCorrect":true},{"statement":"El DOMS es causado por el ácido láctico.","isCorrect":false},{"statement":"El BDNF promueve el crecimiento de nuevas neuronas.","isCorrect":true},{"statement":"El umbral de lactato indica el punto de máxima eficiencia aeróbica.","isCorrect":false},{"statement":"La testosterona aumenta tras el entrenamiento intenso.","isCorrect":true},{"statement":"La fatiga periférica implica que el cerebro protege al cuerpo.","isCorrect":false},{"statement":"El entrenamiento intenso libera endorfinas que actúan como analgésicos naturales.","isCorrect":true}]', 'Dr. George Brooks', 'El lactato no es un desecho; es el combustible de alta intensidad del cerebro y el corazón.', 'La próxima vez que sientas el ''quemazón'', recuerda: es combustible fluyendo por tus venas, no basura.',
  0, 'fuerza'
),
(
  'leccion-26', 26, 'La Fortaleza Inquebrantable', 'Construye una mente de acero', '# La Fortaleza Inquebrantable

## El Poder de la Perspectiva
Epicteto fue esclavo. Sin embargo, se convirtió en uno de los filósofos más influyentes de la historia. ¿Cómo? Dominó su mente.

### La Dicotomía del Control

**✅ Lo que depende de vos:**
- Tus pensamientos, acciones, valores, esfuerzo, actitud.

**❌ Lo que NO depende de vos:**
- El pasado, opiniones de otros, el clima, la genética, la economía.

> "Si te enfocas en lo que no controlas, serás esclavo. Si te enfocas en lo que sí controlas, serás libre." — Epicteto

### El Entrenamiento Mental

**1. Meditación Diaria (5 min)**
Sentate, observá tus pensamientos sin juzgar, volvé a la respiración.

**2. Journaling Estoico (10 min)**
Mañana: "¿Qué desafíos enfrentaré? ¿Cómo responderé virtuosamente?"
Noche: "¿Qué hice bien? ¿Qué puedo mejorar?"

**3. Visualización Negativa (Premeditatio Malorum)**
Imagina perder lo que valorás. No para ser pesimista — para estar preparado y apreciar lo que tenés.', 'mente', 'principiante', 10,
  6, false, 50, 100,
  '["Tu mente es más poderosa que cualquier circunstancia","El sufrimiento es opcional, el dolor es inevitable","Controlas tus pensamientos, no los eventos externos","La disciplina mental se entrena como un músculo"]', '[{"question":"¿Qué es la Dicotomía del Control?","options":["Controlar todo en tu vida","Dividir lo controlable de lo incontrolable para enfocarse solo en lo primero","No controlar nada","Controlar a los demás"],"correctAnswer":1,"explanation":"La Dicotomía del Control enseña a diferenciar entre lo que está en nuestro poder y lo que no, para enfocarnos solo en lo primero."},{"question":"¿Qué es la Premeditatio Malorum?","options":["Pensar positivo siempre","Imaginar el peor escenario para prepararse mentalmente","Evitar pensar en problemas","Ser pesimista"],"correctAnswer":1,"explanation":"Premeditatio Malorum es imaginar el peor escenario posible no para ser pesimista, sino para estar mentalmente preparado."}]', '[{"statement":"La Dicotomía del Control divide el mundo en lo controlable y lo no-controlable.","isCorrect":true},{"statement":"La genética y las opiniones ajenas están bajo nuestro control.","isCorrect":false},{"statement":"Epicteto fue esclavo antes de convertirse en filósofo.","isCorrect":true},{"statement":"El journaling estoico es solo para la noche.","isCorrect":false},{"statement":"La visualización negativa ayuda a prepararse mentalmente.","isCorrect":true},{"statement":"La meditación requiere al menos 60 minutos para ser efectiva.","isCorrect":false},{"statement":"Enfocarse en lo incontrolable genera esclavitud mental.","isCorrect":true},{"statement":"El esfuerzo diario puede estar bajo nuestro control.","isCorrect":true}]', 'Epicteto', 'No son los eventos los que perturban a las personas, sino sus juicios sobre ellos.', 'Escribe 3 cosas fuera de tu control que te preocupan. Ahora analiza una acción que SÍ podés tomar.',
  0, 'filosofiaEstoica'
),
(
  'leccion-27', 27, 'El Arte de la Disciplina', 'La motivación es una mentira', '# El Arte de la Disciplina

## La Mentira de la Motivación
La motivación es excelente pero tiene un problema: **es una emoción.** Las emociones son volátiles. Habrá días que amanecerás triste, cansado, estresado. Si dependés de la motivación para entrenar, comer bien o estudiar, fallarás el 60% de los días.

Ahí entra la **Disciplina**.

### El Sistema de Acción
La disciplina moderna se basa en:
**"Hazlo de todos modos."**
- Estoy cansado → Voy de todos modos.
- Hace frío → Voy de todos modos.
- Tuve un mal día → Voy de todos modos.

### Callousing the Mind
El cerebro busca confort por instinto evolutivo. Tenés que enseñarle quién manda:
- Ducha fría de 60 segundos cada mañana.
- Al borde del fallo en una serie, hacé 2 reps extras.
- Cuando suene la alarma, ponete de pie en 3 segundos. Sin pensar.

### Disciplina es Libertad
Jocko Willink: tener la disciplina de entrenar, comer bien y dormir te da libertad de salud, energía y claridad. Carecer de disciplina te hace esclavo de tus impulsos.', 'mente', 'intermedio', 10,
  7, false, 65, 125,
  '["La motivación es una emoción temporal; la disciplina es un sistema","Haz lo que odias hacer, pero hazlo como si lo amaras","Cala tu mente haciendo cosas difíciles diariamente"]', '[{"question":"¿Por qué la motivación NO es suficiente como base del progreso?","options":["Porque es una emoción volátil","Porque cuesta dinero","Porque requiere mucho tiempo","Porque los genes importan más"],"correctAnswer":0,"explanation":"La motivación es una emoción que va y viene. No podés construir hábitos constantes sobre algo volátil."},{"question":"¿Qué concepto popularizó Jocko Willink sobre la disciplina?","options":["La Disciplina es un Castigo","La Disciplina es aburrida","Disciplina es Libertad","La Disciplina es temporal"],"correctAnswer":2,"explanation":"Jocko Willink afirma que someterse a la disciplina estricta brinda la libertad última: buena salud, finanzas y control de vida."}]', '[{"statement":"La motivación es una emoción volátil, no una base confiable.","isCorrect":true},{"statement":"La disciplina requiere esperar a sentirse motivado.","isCorrect":false},{"statement":"Callousing the mind implica exponerse voluntariamente a incomodidades pequeñas.","isCorrect":true},{"statement":"Jocko Willink dice que la disciplina limita la libertad.","isCorrect":false},{"statement":"La Regla de los 3 Segundos evita que el cerebro cree excusas.","isCorrect":true},{"statement":"El sistema ''hazlo de todos modos'' requiere sentirte bien primero.","isCorrect":false},{"statement":"La ducha fría es una forma de entrenar la resistencia mental.","isCorrect":true},{"statement":"Los hábitos de disciplina se construyen solo en momentos de alta motivación.","isCorrect":false}]', 'David Goggins', 'No te detengas cuando estés cansado. Detente cuando hayas terminado.', 'Mañana, levantate exactamente al primer sonido de la alarma. Sin negociar. Luego métete en la ducha.',
  0, 'habitos'
),
(
  'leccion-28', 28, 'Enfoque Láser — Deep Work', 'La habilidad más valiosa del siglo XXI', '# Enfoque Láser — Deep Work

## El Tesoro Oculto del Siglo XXI
En la era del TikTok y los Shorts de 15 segundos, sostener tu atención en una tarea difícil durante 90 minutos es un superpoder.

### Deep Work vs Shallow Work

**Shallow Work (Superficial)**:
Correos, responder mensajes, organizar el escritorio. Cosas que podrías hacer automáticamente y que no crean valor diferencial.

**Deep Work (Profundo)**:
Actividades realizadas sin distracciones que exigen tu límite cognitivo. Esto crea valor difícil de replicar.

### La Fragmentación del Enfoque
Cuando revisás WhatsApp "un segundo" mientras trabajás, dejás **Residuo Atencional**. Tu cerebro demora hasta 25 minutos en recuperar el enfoque pleno.
10 interrupciones = 0 minutos de trabajo profundo real.

### Cómo Entrenar el Enfoque
1. **Aislamiento Digital**: Teléfono en modo avión o en otra habitación.
2. **Abraza el Aburrimiento**: En la fila del supermercado, no saques el celular. El aburrimiento es el gym de la concentración.
3. **Bloques Ultradianos de 90 min**: El cerebro opera en ciclos de 90 minutos. Trabajá intenso, descansá 15.', 'mente', 'avanzado', 10,
  10, false, 75, 150,
  '["Deep Work vs Shallow Work","Las redes sociales fragmentan tu capacidad de atención","El aburrimiento es el campo de entrenamiento de la concentración"]', '[{"question":"¿Cuánto tiempo puede perder tu cerebro en reenfocarse tras revisar el teléfono?","options":["2 minutos","5 minutos","25 minutos","1 hora"],"correctAnswer":2,"explanation":"El Residuo Atencional es real: incluso una mirada rápida puede destruir tu concentración por más de 20 minutos."}]', '[{"statement":"El Deep Work requiere concentración máxima sin distracciones.","isCorrect":true},{"statement":"Revisar WhatsApp ''un segundo'' no afecta la concentración posterior.","isCorrect":false},{"statement":"El Residuo Atencional puede durar hasta 25 minutos después de una interrupción.","isCorrect":true},{"statement":"El aburrimiento entrena la capacidad de concentración.","isCorrect":true},{"statement":"Los bloques óptimos de trabajo profundo son de 15 minutos.","isCorrect":false},{"statement":"El Shallow Work genera el mismo valor que el Deep Work.","isCorrect":false},{"statement":"El cerebro opera en ciclos ultradianos de aproximadamente 90 minutos.","isCorrect":true},{"statement":"Cal Newport sostiene que el talento compensa la falta de producción.","isCorrect":false}]', 'Cal Newport', 'Si no produces, no prosperarás, no importa cuán talentoso seas.', 'Mañana, realiza un bloque de 90 minutos sin teléfono ni redes. Solo la tarea más importante.',
  0, 'mentalidad'
),
(
  'leccion-29', 29, 'Memento Mori — Vivir con Urgencia', 'Recordar la muerte como motor de vida', '# Memento Mori — Recordá que Morirás

## La Meditación Definitiva
En Roma, cuando un general victorioso desfilaba por las calles, un esclavo le susurraba al oído:
**"Memento Mori" — Recuerda que eres mortal.**

Esto no era cruel. Era liberador.

### La Paradoja de la Muerte
Al recordar tu muerte:
- Cada momento se vuelve precioso.
- Las trivialidades pierden poder sobre vos.
- La acción reemplaza la postergación.
- Vivís con intensidad, no con miedo.

> "No actúes como si fueras a vivir diez mil años. La muerte se cierne sobre ti. Mientras vivas, sé virtuoso." — Marco Aurelio

### Los Números
Tenés aproximadamente:
- **28.000 días** de vida (promedio)
- **10.000 entrenamientos** si empezás ahora

¿Cuántos ya usaste? ¿Cuántos desperdiciarás?

### La Práctica Diaria Memento Mori
**Mañana**: "Hoy podría ser el último. ¿Cómo lo viviré?"
**Noche**: "¿Viví hoy dignamente? Si muriera ahora, ¿estaría orgulloso?"', 'alma', 'intermedio', 10,
  4, false, 50, 100,
  '["La muerte da sentido a la vida","Cada día es un regalo, no un derecho","La urgencia elimina la procrastinación","Vive como si fuera tu último día, entrena como si fuera eterno"]', '[{"question":"¿Cuál es el propósito de recordar tu mortalidad según los estoicos?","options":["Deprimirse","Valorar cada día y eliminar procrastinación","Vivir con miedo","Dejar de planificar el futuro"],"correctAnswer":1,"explanation":"Recordar la muerte hace que valores cada momento, elimines la procrastinación y vivas con urgencia e intención."}]', '[{"statement":"Memento Mori significa ''Recuerda que morirás''.","isCorrect":true},{"statement":"Esta práctica promueve una actitud de miedo ante la vida.","isCorrect":false},{"statement":"En Roma un esclavo recordaba esto al general victorioso.","isCorrect":true},{"statement":"Recordar la muerte genera procrastinación según los estoicos.","isCorrect":false},{"statement":"El objetivo de Memento Mori es valorar cada momento.","isCorrect":true},{"statement":"En promedio una persona tiene unas 10.000 oportunidades de entrenar en su vida.","isCorrect":true},{"statement":"Marco Aurelio ignoraba la muerte en sus escritos.","isCorrect":false},{"statement":"La urgencia de vivir bien surge al contemplar la finitud del tiempo.","isCorrect":true}]', 'Séneca', 'No es que tengamos poco tiempo, es que perdemos mucho.', 'Hoy, hacé una cosa que has estado postergando. No mañana. Hoy.',
  0, 'filosofiaEstoica'
),
(
  'leccion-30', 30, 'Amor Fati — Ama tu Destino', 'Convertir la adversidad en combustible', '# Amor Fati: Amá tu Destino

## Más Allá de la Tolerancia
Los estoicos hablaban de *aceptar* el destino. Nietzsche fue más lejos con **Amor Fati** (Amar el Destino).

No es "bueno, así son las cosas". Es: **"Esto es exactamente lo que necesitaba."**

### La Metáfora del Fuego

> "Un fuego ardiente convierte en llamas y brillo todo lo que se lanza dentro de él." — Marco Aurelio

Una fogata pequeña se apaga con un tronco gigante.
Un incendio forestal lo usa como combustible.

Eres la fogata o el incendio. La adversidad decide cuál.

### La Fórmula Aplicada

*Escenario*: Fallás un levantamiento pesado.

**Reacción común**: Enojo, desánimo, queja.

**Reacción Amor Fati**: *"Fabuloso. Encontré exactamente mi límite actual. Ahora sé dónde trabajar los próximos 3 meses."*

La adversidad no es tu oponente. Es tu sparring partner.', 'alma', 'avanzado', 10,
  6, false, 75, 150,
  '["No desees que los problemas sean más fáciles, sé tú más fuerte","Amor Fati es aceptar con entusiasmo lo que te toca vivir","Convertir el fuego en combustible para tu grandeza"]', '[{"question":"¿Cómo aplica la metáfora del fuego la filosofía de Amor Fati?","options":["Que te vas a quemar con los problemas","Un fuego fuerte usa la adversidad como combustible para crecer más","Que debes quemar tus metas","Que el calor te dará fuerza"],"correctAnswer":1,"explanation":"Una mente fuerte como un gran fuego usa los problemas como combustible para fortalecerse, mientras una mente débil sería aplastada."}]', '[{"statement":"Amor Fati significa amar activamente lo que te sucede, no solo soportarlo.","isCorrect":true},{"statement":"Nietzsche popularizó el concepto de Amor Fati para la grandeza humana.","isCorrect":true},{"statement":"La metáfora del fuego indica que los problemas apagan a toda persona.","isCorrect":false},{"statement":"Un practicante de Amor Fati ve el fracaso como combustible para crecer.","isCorrect":true},{"statement":"Amor Fati es resignación pasiva ante lo inevitable.","isCorrect":false},{"statement":"Marco Aurelio relacionó la fortaleza interna con convertir adversidades en combustible.","isCorrect":true},{"statement":"Amor Fati en latín significa ''Odio al destino''.","isCorrect":false},{"statement":"Buscar el aprendizaje en cada adversidad es una aplicación práctica de Amor Fati.","isCorrect":true}]', 'Friedrich Nietzsche', 'Mi fórmula para la grandeza humana es amor fati: no querer que nada sea diferente, ni en el pasado, ni en el futuro.', 'La próxima vez que algo malo suceda, sonreí y decí en voz alta: ''Exactamente lo que necesitaba.''',
  0, 'filosofiaEstoica'
),
(
  'leccion-31', 31, 'El Obstáculo es el Camino', 'Convirtiendo la tragedia en triunfo', '# El Obstáculo es el Camino

## La Sabiduría de Marco Aurelio
Hace casi 2000 años, Marco Aurelio escribió en su diario privado:

> *"El impedimento a la acción avanza la acción. Lo que se interpone en el camino se convierte en el camino."*

### Perspectiva — Cómo Ves el Obstáculo
Nuestro instinto biológico es congelarnos ante obstáculos y verlos como bloqueos.

El Estoicismo propone lo contrario: **El obstáculo te está mostrando tu verdadero camino.**

Si el río encuentra una roca, no llora. Encuentra la bifurcación y gana presión.

### Acción Estratégica
No se trata de sonreír tontamente ante un problema. Se trata de tomar acciones que usen la desventaja como palanca:
- Sin gym → Perfeccionás la calistenia.
- Sin dinero para suplementos → Optimizás la alimentación real.
- Con lesión → Entrenas lo que podés y rehabilitás lo que no.

### Voluntad Indómita
Si el obstáculo es insuperable y te vence, aún tenés la **Voluntad**: que la derrota no arruine tus principios. Perdés la pelea pero no el carácter.', 'alma', 'avanzado', 10,
  9, false, 75, 150,
  '["Los obstáculos son la guía hacia adelante","Cambia tu percepción de los problemas","La acción es la respuesta"]', '[{"question":"Si no podés entrenar en el gimnasio porque cerraron tu membresía, ¿cuál sería la respuesta estoica?","options":["Llorar","Dejar de ir porque perdiste tus ganancias","Usar este obstáculo como oportunidad para dominar la calistenia","Enemistarse con los dueños"],"correctAnswer":2,"explanation":"El problema es una oportunidad oculta para entrenar algo distinto y salir más completo que antes."}]', '[{"statement":"El estoicismo enseña que los obstáculos son oportunidades disfrazadas.","isCorrect":true},{"statement":"La perspectiva define cómo reaccionamos ante los problemas.","isCorrect":true},{"statement":"Si fallamos ante un obstáculo insuperable, perdemos nuestros valores también.","isCorrect":false},{"statement":"Marco Aurelio escribió sobre esta filosofía en sus Meditaciones.","isCorrect":true},{"statement":"La Acción Estratégica requiere ignorar el problema por completo.","isCorrect":false},{"statement":"La metáfora del río ilustra cómo adaptarse sin perder la esencia.","isCorrect":true},{"statement":"La Voluntad estoica significa que el espíritu no se dobla aunque el resultado sea adverso.","isCorrect":true},{"statement":"Perder una pelea siempre implica perder también el carácter.","isCorrect":false}]', 'Marco Aurelio', 'El impedimento a la acción avanza la acción. Lo que se atraviesa en el camino, se convierte en el camino.', 'Elige un obstáculo actual en tu vida. Escribí qué ACCIÓN CONCRETA podés tomar que use ese obstáculo como palanca.',
  0, 'filosofiaEstoica'
),
(
  'leccion-32', 32, 'El Propósito del Atleta', 'Más allá del narcisismo físico', '# El Propósito del Atleta

## Más Allá del Espejo
Es fácil perderse en el fitness moderno donde todo se reduce al porcentaje de grasa corporal o la simetría del bíceps para una foto.

El estoicismo demanda una visión más alta: **¿Para qué estás construyendo un cuerpo fuerte de verdad?**

### Entrenar para Servir
La etimología de la fuerza tribal era **proteger a la tribu**:
- Sos fuerte para **cargar a tu hijo** sin que te duela la espalda.
- Tenés resistencia para **correr** en una emergencia.
- Trabajás tu disciplina para ser la **roca emocional** de tu pareja cuando el mundo colapsa.

> "Qué desgracia para un hombre envejecer sin nunca ver la belleza y fuerza que su cuerpo podría haber alcanzado." — Sócrates

### Viktor Frankl y el Porqué
Sobreviviente del Holocausto, descubrió que los prisioneros que sobrevivían tenían algo en común: un **propósito que los jalaba hacia adelante**.

### La Pregunta Crítica
*Si en los próximos 10 años fueras el único pilar en tu círculo, ¿tu energía mental y física de hoy alcanzaría para protegerlos física, económica y moralmente?*', 'alma', 'avanzado', 11,
  10, false, 90, 175,
  '["El físico es el medio, no el fin","Tu legado es más grande que tus músculos","El verdadero poder está en proteger a los tuyos"]', '[{"question":"¿Para qué servía la fuerza física en el sentido tribal estoico?","options":["Para ganar competencias de fitness","Para insultar a los más débiles","Para usar ropa apretada","Para ser útil a tu tribu: proteger, estabilizar y proveer"],"correctAnswer":3,"explanation":"Un hombre o mujer de alto valor usa su fortaleza para proteger, estabilizar y proveer a su familia y sociedad."}]', '[{"statement":"El propósito del atletismo estoico va más allá de la estética.","isCorrect":true},{"statement":"Viktor Frankl sobrevivió el Holocausto y estudió el poder del propósito.","isCorrect":true},{"statement":"La estética es la motivación más sostenible para entrenar a largo plazo.","isCorrect":false},{"statement":"La fuerza tribal históricamente servía para proteger a la comunidad.","isCorrect":true},{"statement":"Sócrates condenaba el entrenamiento físico como vanidoso.","isCorrect":false},{"statement":"Un propósito de servicio puede motivar incluso en condiciones extremas.","isCorrect":true},{"statement":"El fitness moderno siempre tiene un propósito más alto que la imagen.","isCorrect":false},{"statement":"Construir fuerza para servir a los tuyos es coherente con la filosofía estoica.","isCorrect":true}]', 'Viktor Frankl', 'Quien tiene un porqué para vivir puede soportar casi cualquier cómo.', 'Escribí tu ''Por Qué'' definitivo: ¿A quién debés proteger o proveer fuerza con tu entrenamiento?',
  0, 'filosofiaEstoica'
),
(
  'leccion-33', 33, 'Liderazgo con el Ejemplo', 'Las palabras mueven, el ejemplo arrastra', '# Liderazgo con el Ejemplo

## El Error del Entusiasta
Cuando uno descubre el fitness y la filosofía, el primer instinto es molestar a todos para que lo hagan:
*"Tenés que comer mejor", "Ven a entrenar", "No bebas tanto."*

Normalmente la respuesta es **resentimiento**. Lo perciben como un ataque a su identidad.

### La Solución Estoica
> "No hables de tu filosofía. Encárnala." — Epicteto

Tu familia notará tus nuevos niveles de energía.
Tus hijos verán que a pesar del frío, papá corrió temprano.
**"Las palabras mueven temporalmente, el ejemplo arrastra para siempre."**

### La Metamorfosis Silenciosa
- **Mes 1-3**: La gente te critica ("Estás muy aburrido con tu dieta").
- **Mes 4-6**: Te ignoran pero notan la consistencia.
- **Mes 7-12**: Te preguntan en secreto: *"Oye... ¿qué ejercicio hacés?", "¿Me pasás tu app?"*

En ese instante nace el verdadero liderazgo: **cuando te piden ayuda en sus propios términos.**

Tenés la obligación moral de construir la mejor versión de vos, y luego, con paciencia suprema, jalar la soga para los que quieran subir.', 'alma', 'avanzado', 11,
  12, false, 90, 175,
  '["Deja de sermonear a las personas de cómo vivir","Tu transformación silenciosa atraerá más preguntas que dar consejos no solicitados","La excelencia es contagiosa en las mentes correctas"]', '[{"question":"¿Cuándo surge el liderazgo real sobre familia y amigos respecto a su salud?","options":["Desde el primer día que vas al gym","Cuando les mandás la rutina por WhatsApp","Cuando te abordan en secreto después de meses viendo tus resultados","Cuando se pelean con vos"],"correctAnswer":2,"explanation":"Tu constancia silenciosa genera curiosidad genuina. Cuando ellos dan el primer paso es cuando el liderazgo es efectivo al 100%."}]', '[{"statement":"Dar sermones verbales sobre salud genera resentimiento frecuentemente.","isCorrect":true},{"statement":"El liderazgo estoico prioriza el ejemplo sobre las palabras.","isCorrect":true},{"statement":"La metamorfosis silenciosa muestra resultados a partir del primer mes.","isCorrect":false},{"statement":"Epicteto enseñaba que encarnar la filosofía supera predicarla.","isCorrect":true},{"statement":"La presión social de los primeros meses suele ser de apoyo entusiasta.","isCorrect":false},{"statement":"El verdadero liderazgo surge cuando otros te piden ayuda voluntariamente.","isCorrect":true},{"statement":"Las palabras son más poderosas que el ejemplo sostenido en el tiempo.","isCorrect":false},{"statement":"La constancia silenciosa genera credibilidad y curiosidad en los demás.","isCorrect":true}]', 'Epicteto', 'No hables de tu filosofía. Encárnala.', 'Esta semana, no des consejos de salud a nadie. Solo vivílos. Observá quién te pregunta primero.',
  0, 'filosofiaEstoica'
),
(
  'leccion-34', 34, 'Plantar un Árbol', 'Cuya sombra nunca disfrutarás', '# Plantar un Árbol

## El Final del Ego
El fitness, la fuerza y la disciplina personal son el escalón inicial.
Ser resiliente e imperturbable es el escalón medio.
Pero el tope absoluto del ser humano no tiene nada que ver con ganar premios en el presente.

### El Proverbio Griego Máximo

> "Una sociedad crece de manera grande y digna cuando los ancianos siembran semillas de árboles bajo cuya sombra saben muy bien que jamás van a sentarse."

**El Legado no trata sobre vos. Trata sobre los próximos 100 años.**

### Construir Dinastías de Valores
No te enfoques solo en dejar bienes materiales. Dejá **Sistemas Operativos**:
- Cultivá el amor propio en tu descendencia.
- Transferí el disfrute del esfuerzo físico a la siguiente generación.
- Modelá resiliencia económica y paciencia.

Si enseñás a un niño de 8 años que el deporte es un refugio anti-estrés, lo estás protegiendo de la drogadicción a los 16. Esa es la sombra del árbol que plantaste.

### Tu Desafío Final
- No rompas la cadena de fortaleza.
- Transmití los valores de esta Academia.
- El conocimiento que recibiste, otorgálo.

**Sos Legado.**', 'alma', 'experto', 11,
  15, false, 125, 250,
  '["Transcendencia real","Construir Sistemas Familiares","Legado a 100 años vista"]', '[{"question":"¿Qué es lo más valioso para construir e heredar según esta filosofía?","options":["Coches y oro","Sistemas Operativos: valores, resiliencia y hábitos saludables","Solo cuentas bancarias","Solo bienes inmuebles"],"correctAnswer":1,"explanation":"Los bienes los puede malgastar un heredero ignorante. Transferir herramientas conductuales sólidas asegura el éxito generacional."},{"question":"¿Cuándo termina el aprendizaje del verdadero atleta filósofo?","options":["Al completar estas lecciones","Al alcanzar su peso ideal","Nunca — el aprendizaje es continuo y se transmite","Al cumplir 40 años"],"correctAnswer":2,"explanation":"El ciclo nunca termina: recibís conocimiento, lo vivís, lo transmitís. Eso es el legado activo."}]', '[{"statement":"El legado estoico apunta al impacto en generaciones futuras, no al reconocimiento presente.","isCorrect":true},{"statement":"Transmitir valores es más valioso a largo plazo que dejar bienes materiales.","isCorrect":true},{"statement":"El proverbio griego del árbol habla de no plantar si no lo disfrutás.","isCorrect":false},{"statement":"Enseñar a un niño el deporte como refugio puede protegerlo de conductas destructivas.","isCorrect":true},{"statement":"El nivel leyenda se alcanza ganando competencias en el presente.","isCorrect":false},{"statement":"Los Sistemas Operativos (valores) son más transferibles que los bienes físicos.","isCorrect":true},{"statement":"El altruismo verdadero trabaja por otros sin esperar el beneficio propio.","isCorrect":true},{"statement":"El legado se trata principalmente de vos y tu reconocimiento.","isCorrect":false}]', 'Proverbio Griego', 'Una sociedad crece bien cuando los ancianos plantan árboles cuya sombra saben que nunca sentarán.', 'Hacete la promesa de no romper la cadena de fortaleza. El conocimiento que recibiste, transmitílo.',
  0, 'filosofiaEstoica'
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


-- Insert Legacy Path Nodes
INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  1, 1, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  2, 2, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  3, 3, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  4, 4, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  5, 5, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  6, 6, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  7, 7, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  8, 8, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  9, 9, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  10, 10, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  11, 11, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  12, 12, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  13, 13, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  14, 14, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  15, 15, 1, 'Nutrición I: Fundamentos', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  16, 16, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  17, 17, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  18, 18, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  19, 19, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  20, 20, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  21, 21, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  22, 22, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  23, 23, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  24, 24, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  25, 25, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  26, 26, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  27, 27, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  28, 28, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  29, 29, 1, 'El Hierro I: Adaptación Anatómica', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  30, 30, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  31, 31, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  32, 32, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  33, 33, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  34, 34, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  35, 35, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  36, 36, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  37, 37, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  38, 38, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  39, 39, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  40, 40, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  41, 41, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  42, 42, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  43, 43, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  44, 44, 1, 'Biohacking I: Sueño Profundo', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  45, 45, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'bossBattle', 'mente',
  '🥊', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  46, 46, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  47, 47, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  48, 48, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  49, 49, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  50, 50, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'bossBattle', 'mente',
  '🥊', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  51, 51, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  52, 52, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  53, 53, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  54, 54, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  55, 55, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'bossBattle', 'mente',
  '🥊', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  56, 56, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  57, 57, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  58, 58, 1, 'Psicología I: Resiliencia Base', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  59, 59, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  60, 60, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🦉', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  61, 61, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  62, 62, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  63, 63, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  64, 64, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  65, 65, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🦉', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  66, 66, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  67, 67, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  68, 68, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  69, 69, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  70, 70, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🦉', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  71, 71, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  72, 72, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  73, 73, 1, 'Estoicismo I: Dicotomía del Control', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  74, 74, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  75, 75, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'bossBattle', 'mente',
  '💰', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  76, 76, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  77, 77, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  78, 78, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  79, 79, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  80, 80, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'bossBattle', 'mente',
  '💰', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  81, 81, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  82, 82, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  83, 83, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  84, 84, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  85, 85, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'bossBattle', 'mente',
  '💰', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  86, 86, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  87, 87, 1, 'Riqueza I: Valor Real', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  88, 88, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  89, 89, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  90, 90, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'bossBattle', 'especial',
  '🎋', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  91, 91, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  92, 92, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  93, 93, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  94, 94, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  95, 95, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'bossBattle', 'especial',
  '🎋', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  96, 96, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  97, 97, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  98, 98, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  99, 99, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  100, 100, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'bossBattle', 'especial',
  '🎋', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  101, 101, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  102, 102, 1, 'Bushido I: Gi (Rectitud)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  103, 103, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  104, 104, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  105, 105, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'bossBattle', 'especial',
  '🏰', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  106, 106, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  107, 107, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  108, 108, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  109, 109, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  110, 110, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'bossBattle', 'especial',
  '🏰', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  111, 111, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  112, 112, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  113, 113, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  114, 114, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  115, 115, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'bossBattle', 'especial',
  '🏰', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  116, 116, 1, 'Legado I: Responsabilidad', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  117, 117, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  118, 118, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  119, 119, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  120, 120, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🥇', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  121, 121, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  122, 122, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  123, 123, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  124, 124, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  125, 125, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🥇', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  126, 126, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  127, 127, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  128, 128, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  129, 129, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  130, 130, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🥇', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  131, 131, 1, 'Era Dorada I: Pumping Iron', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  132, 132, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  133, 133, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  134, 134, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  135, 135, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  136, 136, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  137, 137, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  138, 138, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  139, 139, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  140, 140, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  141, 141, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  142, 142, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  143, 143, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  144, 144, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  145, 145, 2, 'Nutrición II: Macros', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  146, 146, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  147, 147, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  148, 148, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  149, 149, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  150, 150, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  151, 151, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  152, 152, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  153, 153, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  154, 154, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  155, 155, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  156, 156, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  157, 157, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  158, 158, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  159, 159, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  160, 160, 2, 'El Hierro II: Técnica Base', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  161, 161, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  162, 162, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  163, 163, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  164, 164, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  165, 165, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  166, 166, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  167, 167, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  168, 168, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  169, 169, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  170, 170, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  171, 171, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  172, 172, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  173, 173, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  174, 174, 2, 'Biohacking II: Cronobiología', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🔋', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  175, 175, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'bossBattle', 'mente',
  '🩸', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  176, 176, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  177, 177, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  178, 178, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  179, 179, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  180, 180, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'bossBattle', 'mente',
  '🩸', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  181, 181, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  182, 182, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  183, 183, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  184, 184, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  185, 185, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'bossBattle', 'mente',
  '🩸', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  186, 186, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  187, 187, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  188, 188, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  189, 189, 2, 'Psicología II: Gestión del Miedo', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  190, 190, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🗿', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  191, 191, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  192, 192, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  193, 193, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  194, 194, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  195, 195, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🗿', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  196, 196, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  197, 197, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  198, 198, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  199, 199, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  200, 200, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🗿', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  201, 201, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  202, 202, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  203, 203, 2, 'Estoicismo II: Amor Fati', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  204, 204, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  205, 205, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'bossBattle', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  206, 206, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  207, 207, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  208, 208, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  209, 209, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  210, 210, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'bossBattle', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  211, 211, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  212, 212, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  213, 213, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  214, 214, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  215, 215, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'bossBattle', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  216, 216, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  217, 217, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  218, 218, 2, 'Riqueza II: Protección del Patrimonio', 'Mastering Riqueza', 'challenge', 'mente',
  '🛡️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  219, 219, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  220, 220, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'bossBattle', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  221, 221, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  222, 222, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  223, 223, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  224, 224, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  225, 225, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'bossBattle', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  226, 226, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  227, 227, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  228, 228, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  229, 229, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  230, 230, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'bossBattle', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  231, 231, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  232, 232, 2, 'Bushido II: Yu (Coraje)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  233, 233, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  234, 234, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  235, 235, 2, 'Legado II: La Tribu', 'Mastering Legado', 'bossBattle', 'especial',
  '🦅', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  236, 236, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  237, 237, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  238, 238, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  239, 239, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  240, 240, 2, 'Legado II: La Tribu', 'Mastering Legado', 'bossBattle', 'especial',
  '🦅', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  241, 241, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  242, 242, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  243, 243, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  244, 244, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  245, 245, 2, 'Legado II: La Tribu', 'Mastering Legado', 'bossBattle', 'especial',
  '🦅', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  246, 246, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  247, 247, 2, 'Legado II: La Tribu', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  248, 248, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  249, 249, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  250, 250, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🌟', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  251, 251, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  252, 252, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  253, 253, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  254, 254, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  255, 255, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🌟', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  256, 256, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  257, 257, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  258, 258, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  259, 259, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  260, 260, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🌟', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  261, 261, 2, 'Era Dorada II: Estética Zane', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  262, 262, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  263, 263, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  264, 264, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  265, 265, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  266, 266, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  267, 267, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  268, 268, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  269, 269, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  270, 270, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  271, 271, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  272, 272, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  273, 273, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  274, 274, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  275, 275, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  276, 276, 3, 'Nutrición III: Ciclo de Carbos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  277, 277, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  278, 278, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  279, 279, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  280, 280, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  281, 281, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  282, 282, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  283, 283, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  284, 284, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  285, 285, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  286, 286, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  287, 287, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  288, 288, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  289, 289, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  290, 290, 3, 'El Hierro III: Sobrecarga Progresiva', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  291, 291, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  292, 292, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  293, 293, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  294, 294, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  295, 295, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  296, 296, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  297, 297, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  298, 298, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  299, 299, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  300, 300, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  301, 301, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  302, 302, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  303, 303, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  304, 304, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  305, 305, 3, 'Biohacking III: Exposición al Frío', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '🌞', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  306, 306, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  307, 307, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  308, 308, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  309, 309, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  310, 310, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'bossBattle', 'mente',
  '👁️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  311, 311, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  312, 312, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  313, 313, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  314, 314, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  315, 315, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'bossBattle', 'mente',
  '👁️', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  316, 316, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  317, 317, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  318, 318, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  319, 319, 3, 'Psicología III: Dopamina Base', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  320, 320, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  321, 321, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  322, 322, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  323, 323, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  324, 324, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  325, 325, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  326, 326, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  327, 327, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  328, 328, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  329, 329, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  330, 330, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  331, 331, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  332, 332, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  333, 333, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  334, 334, 3, 'Estoicismo III: Memento Mori', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  335, 335, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'bossBattle', 'mente',
  '♟️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  336, 336, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'challenge', 'mente',
  '♟️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  337, 337, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'challenge', 'mente',
  '♟️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  338, 338, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'challenge', 'mente',
  '♟️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  339, 339, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'challenge', 'mente',
  '♟️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  340, 340, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'bossBattle', 'mente',
  '♟️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  341, 341, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'challenge', 'mente',
  '♟️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  342, 342, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'challenge', 'mente',
  '♟️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  343, 343, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'challenge', 'mente',
  '♟️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  344, 344, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'challenge', 'mente',
  '♟️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  345, 345, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'bossBattle', 'mente',
  '♟️', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  346, 346, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'challenge', 'mente',
  '♟️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  347, 347, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'challenge', 'mente',
  '♟️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  348, 348, 3, 'Riqueza III: Asimetría de Riesgo', 'Mastering Riqueza', 'challenge', 'mente',
  '♟️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  349, 349, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  350, 350, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'bossBattle', 'especial',
  '👺', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  351, 351, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  352, 352, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  353, 353, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  354, 354, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  355, 355, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'bossBattle', 'especial',
  '👺', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  356, 356, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  357, 357, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  358, 358, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  359, 359, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  360, 360, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'bossBattle', 'especial',
  '👺', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  361, 361, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  362, 362, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  363, 363, 3, 'Bushido III: Jin (Compasión)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  364, 364, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'challenge', 'especial',
  '🔥', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  365, 365, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'bossBattle', 'especial',
  '🔥', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  366, 366, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'challenge', 'especial',
  '🔥', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  367, 367, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'challenge', 'especial',
  '🔥', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  368, 368, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'challenge', 'especial',
  '🔥', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  369, 369, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'challenge', 'especial',
  '🔥', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  370, 370, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'bossBattle', 'especial',
  '🔥', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  371, 371, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'challenge', 'especial',
  '🔥', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  372, 372, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'challenge', 'especial',
  '🔥', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  373, 373, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'challenge', 'especial',
  '🔥', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  374, 374, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'challenge', 'especial',
  '🔥', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  375, 375, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'bossBattle', 'especial',
  '🔥', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  376, 376, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'challenge', 'especial',
  '🔥', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  377, 377, 3, 'Legado III: Fraternidad', 'Mastering Legado', 'challenge', 'especial',
  '🔥', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  378, 378, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  379, 379, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  380, 380, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '💪', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  381, 381, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  382, 382, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  383, 383, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  384, 384, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  385, 385, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '💪', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  386, 386, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  387, 387, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  388, 388, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  389, 389, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  390, 390, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '💪', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  391, 391, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  392, 392, 3, 'Era Dorada III: Regla Arnold', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  393, 393, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  394, 394, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  395, 395, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  396, 396, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  397, 397, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  398, 398, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  399, 399, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  400, 400, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  401, 401, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  402, 402, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  403, 403, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  404, 404, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  405, 405, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  406, 406, 4, 'Nutrición IV: Ayuno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  407, 407, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  408, 408, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  409, 409, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  410, 410, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  411, 411, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  412, 412, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  413, 413, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  414, 414, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  415, 415, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  416, 416, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  417, 417, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  418, 418, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  419, 419, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  420, 420, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  421, 421, 4, 'El Hierro IV: Hipertrofia I', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  422, 422, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  423, 423, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  424, 424, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  425, 425, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  426, 426, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  427, 427, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  428, 428, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  429, 429, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  430, 430, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  431, 431, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  432, 432, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  433, 433, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  434, 434, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  435, 435, 4, 'Biohacking IV: Termogénesis', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '🧬', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  436, 436, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  437, 437, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  438, 438, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  439, 439, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  440, 440, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'bossBattle', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  441, 441, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  442, 442, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  443, 443, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  444, 444, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  445, 445, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'bossBattle', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  446, 446, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  447, 447, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  448, 448, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  449, 449, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  450, 450, 4, 'Psicología IV: Foco Profundo', 'Mastering Psicología', 'bossBattle', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  451, 451, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  452, 452, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  453, 453, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  454, 454, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  455, 455, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  456, 456, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  457, 457, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  458, 458, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  459, 459, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  460, 460, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  461, 461, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  462, 462, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  463, 463, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  464, 464, 4, 'Estoicismo IV: Marco Aurelio', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  465, 465, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'bossBattle', 'mente',
  '📈', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  466, 466, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  467, 467, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  468, 468, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  469, 469, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  470, 470, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'bossBattle', 'mente',
  '📈', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  471, 471, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  472, 472, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  473, 473, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  474, 474, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  475, 475, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'bossBattle', 'mente',
  '📈', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  476, 476, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  477, 477, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  478, 478, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  479, 479, 4, 'Riqueza IV: Apalancamiento', 'Mastering Riqueza', 'challenge', 'mente',
  '📈', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  480, 480, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'bossBattle', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  481, 481, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'challenge', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  482, 482, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'challenge', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  483, 483, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'challenge', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  484, 484, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'challenge', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  485, 485, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'bossBattle', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  486, 486, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'challenge', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  487, 487, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'challenge', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  488, 488, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'challenge', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  489, 489, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'challenge', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  490, 490, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'bossBattle', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  491, 491, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'challenge', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  492, 492, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'challenge', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  493, 493, 4, 'Bushido IV: Rei (Respeto)', 'Mastering Bushido', 'challenge', 'especial',
  '🗡️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  494, 494, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  495, 495, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'bossBattle', 'especial',
  '👑', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  496, 496, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  497, 497, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  498, 498, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  499, 499, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  500, 500, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'bossBattle', 'especial',
  '👑', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  501, 501, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  502, 502, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  503, 503, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  504, 504, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  505, 505, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'bossBattle', 'especial',
  '👑', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  506, 506, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  507, 507, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  508, 508, 4, 'Legado IV: Trascendencia Cívica', 'Mastering Legado', 'challenge', 'especial',
  '👑', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  509, 509, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  510, 510, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🏆', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  511, 511, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  512, 512, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  513, 513, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  514, 514, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  515, 515, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🏆', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  516, 516, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  517, 517, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  518, 518, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  519, 519, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  520, 520, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🏆', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  521, 521, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  522, 522, 4, 'Era Dorada IV: Mentzer HIT', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  523, 523, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  524, 524, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  525, 525, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  526, 526, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  527, 527, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  528, 528, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  529, 529, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  530, 530, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  531, 531, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  532, 532, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  533, 533, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  534, 534, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  535, 535, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  536, 536, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  537, 537, 5, 'Nutrición V: Micronutrientes', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  538, 538, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  539, 539, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  540, 540, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  541, 541, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  542, 542, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  543, 543, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  544, 544, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  545, 545, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  546, 546, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  547, 547, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  548, 548, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  549, 549, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  550, 550, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  551, 551, 5, 'El Hierro V: Hipertrofia II', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  552, 552, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  553, 553, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  554, 554, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  555, 555, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  556, 556, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  557, 557, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  558, 558, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  559, 559, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  560, 560, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  561, 561, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  562, 562, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  563, 563, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  564, 564, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  565, 565, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'bossBattle', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  566, 566, 5, 'Biohacking V: Nootrópicos', 'Mastering Biohacking', 'challenge', 'cuerpo',
  '❄️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  567, 567, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  568, 568, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  569, 569, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  570, 570, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'bossBattle', 'mente',
  '🥊', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  571, 571, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  572, 572, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  573, 573, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  574, 574, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  575, 575, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'bossBattle', 'mente',
  '🥊', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  576, 576, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  577, 577, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  578, 578, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  579, 579, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'challenge', 'mente',
  '🥊', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  580, 580, 5, 'Psicología V: Mentalidad de Depredador', 'Mastering Psicología', 'bossBattle', 'mente',
  '🥊', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  581, 581, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  582, 582, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  583, 583, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  584, 584, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  585, 585, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🦉', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  586, 586, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  587, 587, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  588, 588, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  589, 589, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  590, 590, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🦉', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  591, 591, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  592, 592, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  593, 593, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  594, 594, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'challenge', 'mente',
  '🦉', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  595, 595, 5, 'Estoicismo V: Epícteto', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🦉', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  596, 596, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  597, 597, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  598, 598, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  599, 599, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  600, 600, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'bossBattle', 'mente',
  '💰', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  601, 601, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  602, 602, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  603, 603, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  604, 604, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  605, 605, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'bossBattle', 'mente',
  '💰', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  606, 606, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  607, 607, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  608, 608, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  609, 609, 5, 'Riqueza V: Libertad Absoluta', 'Mastering Riqueza', 'challenge', 'mente',
  '💰', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  610, 610, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'bossBattle', 'especial',
  '🎋', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  611, 611, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  612, 612, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  613, 613, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  614, 614, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  615, 615, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'bossBattle', 'especial',
  '🎋', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  616, 616, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  617, 617, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  618, 618, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  619, 619, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  620, 620, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'bossBattle', 'especial',
  '🎋', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  621, 621, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  622, 622, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  623, 623, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  624, 624, 5, 'Bushido V: Makoto (Honestidad)', 'Mastering Bushido', 'challenge', 'especial',
  '🎋', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  625, 625, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'bossBattle', 'especial',
  '🏰', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  626, 626, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  627, 627, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  628, 628, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  629, 629, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  630, 630, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'bossBattle', 'especial',
  '🏰', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  631, 631, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  632, 632, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  633, 633, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  634, 634, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  635, 635, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'bossBattle', 'especial',
  '🏰', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  636, 636, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  637, 637, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  638, 638, 5, 'Legado V: Liderazgo Paternal', 'Mastering Legado', 'challenge', 'especial',
  '🏰', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  639, 639, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  640, 640, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🥇', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  641, 641, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  642, 642, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  643, 643, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  644, 644, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  645, 645, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🥇', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  646, 646, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  647, 647, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  648, 648, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  649, 649, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  650, 650, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🥇', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  651, 651, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  652, 652, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  653, 653, 5, 'Era Dorada V: Fuerza Columbu', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  654, 654, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  655, 655, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  656, 656, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  657, 657, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  658, 658, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  659, 659, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  660, 660, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  661, 661, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  662, 662, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  663, 663, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  664, 664, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  665, 665, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  666, 666, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  667, 667, 6, 'Nutrición VI: Volumen', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  668, 668, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  669, 669, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  670, 670, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  671, 671, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  672, 672, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  673, 673, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  674, 674, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  675, 675, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  676, 676, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  677, 677, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  678, 678, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  679, 679, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  680, 680, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  681, 681, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  682, 682, 6, 'El Hierro VI: Fallo Muscular', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  683, 683, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  684, 684, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  685, 685, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'bossBattle', 'mente',
  '🩸', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  686, 686, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  687, 687, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  688, 688, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  689, 689, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  690, 690, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'bossBattle', 'mente',
  '🩸', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  691, 691, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  692, 692, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  693, 693, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  694, 694, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  695, 695, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'bossBattle', 'mente',
  '🩸', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  696, 696, 6, 'Psicología VI: Dolor vs Sufrimiento', 'Mastering Psicología', 'challenge', 'mente',
  '🩸', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  697, 697, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  698, 698, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  699, 699, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  700, 700, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🗿', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  701, 701, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  702, 702, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  703, 703, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  704, 704, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  705, 705, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🗿', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  706, 706, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  707, 707, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  708, 708, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  709, 709, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  710, 710, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🗿', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  711, 711, 6, 'Estoicismo VI: Séneca', 'Mastering Estoicismo', 'challenge', 'mente',
  '🗿', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  712, 712, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  713, 713, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  714, 714, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  715, 715, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'bossBattle', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  716, 716, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  717, 717, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  718, 718, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  719, 719, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  720, 720, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'bossBattle', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  721, 721, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  722, 722, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  723, 723, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  724, 724, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'challenge', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  725, 725, 6, 'Bushido VI: Meiyo (Honor)', 'Mastering Bushido', 'bossBattle', 'especial',
  '⛩️', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  726, 726, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  727, 727, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  728, 728, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  729, 729, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  730, 730, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'bossBattle', 'especial',
  '🦅', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  731, 731, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  732, 732, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  733, 733, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  734, 734, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  735, 735, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'bossBattle', 'especial',
  '🦅', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  736, 736, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  737, 737, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  738, 738, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  739, 739, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'challenge', 'especial',
  '🦅', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  740, 740, 6, 'Legado VI: Línea de Sangre', 'Mastering Legado', 'bossBattle', 'especial',
  '🦅', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  741, 741, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  742, 742, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  743, 743, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  744, 744, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  745, 745, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🌟', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  746, 746, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  747, 747, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  748, 748, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  749, 749, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  750, 750, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🌟', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  751, 751, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  752, 752, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  753, 753, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  754, 754, 6, 'Era Dorada VI: El Águila Platz', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  755, 755, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  756, 756, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  757, 757, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  758, 758, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  759, 759, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  760, 760, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  761, 761, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  762, 762, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  763, 763, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  764, 764, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  765, 765, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  766, 766, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  767, 767, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  768, 768, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  769, 769, 7, 'Nutrición VII: Déficit', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  770, 770, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  771, 771, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  772, 772, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  773, 773, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  774, 774, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  775, 775, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  776, 776, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  777, 777, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  778, 778, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  779, 779, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  780, 780, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  781, 781, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  782, 782, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  783, 783, 7, 'El Hierro VII: Cadencia', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '⛓️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  784, 784, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  785, 785, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'bossBattle', 'mente',
  '👁️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  786, 786, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  787, 787, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  788, 788, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  789, 789, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  790, 790, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'bossBattle', 'mente',
  '👁️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  791, 791, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  792, 792, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  793, 793, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  794, 794, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  795, 795, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'bossBattle', 'mente',
  '👁️', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  796, 796, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  797, 797, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  798, 798, 7, 'Psicología VII: Disciplina', 'Mastering Psicología', 'challenge', 'mente',
  '👁️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  799, 799, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  800, 800, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  801, 801, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  802, 802, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  803, 803, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  804, 804, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  805, 805, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  806, 806, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  807, 807, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  808, 808, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  809, 809, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  810, 810, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  811, 811, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  812, 812, 7, 'Estoicismo VII: Ataraxia', 'Mastering Estoicismo', 'challenge', 'mente',
  '⚖️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  813, 813, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  814, 814, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  815, 815, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'bossBattle', 'especial',
  '👺', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  816, 816, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  817, 817, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  818, 818, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  819, 819, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  820, 820, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'bossBattle', 'especial',
  '👺', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  821, 821, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  822, 822, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  823, 823, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  824, 824, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  825, 825, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'bossBattle', 'especial',
  '👺', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  826, 826, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  827, 827, 7, 'Bushido VII: Chugi (Lealtad)', 'Mastering Bushido', 'challenge', 'especial',
  '👺', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  828, 828, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  829, 829, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  830, 830, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '💪', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  831, 831, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  832, 832, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  833, 833, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  834, 834, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  835, 835, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '💪', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  836, 836, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  837, 837, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  838, 838, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  839, 839, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  840, 840, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '💪', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  841, 841, 7, 'Era Dorada VII: Brazos de Oliva', 'Mastering Era Dorada', 'challenge', 'especial',
  '💪', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  842, 842, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  843, 843, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  844, 844, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  845, 845, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  846, 846, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  847, 847, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  848, 848, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  849, 849, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  850, 850, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  851, 851, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  852, 852, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  853, 853, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  854, 854, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  855, 855, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  856, 856, 8, 'Nutrición VIII: Intra-Entreno', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  857, 857, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  858, 858, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  859, 859, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  860, 860, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  861, 861, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  862, 862, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  863, 863, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  864, 864, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  865, 865, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  866, 866, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  867, 867, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  868, 868, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  869, 869, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  870, 870, 8, 'El Hierro VIII: Aislamiento', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🏋️', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  871, 871, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  872, 872, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  873, 873, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  874, 874, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  875, 875, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'bossBattle', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  876, 876, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  877, 877, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  878, 878, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  879, 879, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  880, 880, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'bossBattle', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  881, 881, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  882, 882, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  883, 883, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  884, 884, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'challenge', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  885, 885, 8, 'Psicología VIII: Estado de Flujo', 'Mastering Psicología', 'bossBattle', 'mente',
  '⚔️', '#2563EB', '#2563EB11', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  886, 886, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  887, 887, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  888, 888, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  889, 889, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  890, 890, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  891, 891, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  892, 892, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  893, 893, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  894, 894, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  895, 895, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'bossBattle', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  896, 896, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  897, 897, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  898, 898, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La dicotomía del control postula que no debemos preocuparnos por factores externos, solo por nuestras acciones?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  899, 899, 8, 'Estoicismo VIII: Desapego Moderno', 'Mastering Estoicismo', 'challenge', 'mente',
  '🏛️', '#2563EB', '#2563EB11', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Epícteto decía sobre el conocimiento de uno mismo:","options":["Nadie es verdaderamente libre si no es maestro de sí mismo"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Qué significa ''Amor Fati'' según el estoicismo?","options":["Odiar la debilidad","Amar tu propio destino y lo que sucede","Ignorar las emociones","La victoria sobre el miedo"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  900, 900, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🏆', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  901, 901, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  902, 902, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  903, 903, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  904, 904, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  905, 905, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🏆', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  906, 906, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  907, 907, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  908, 908, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  909, 909, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  910, 910, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🏆', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  911, 911, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  912, 912, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  913, 913, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  914, 914, 8, 'Era Dorada VIII: El Roble Austríaco', 'Mastering Era Dorada', 'challenge', 'especial',
  '🏆', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  915, 915, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  916, 916, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  917, 917, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  918, 918, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  919, 919, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  920, 920, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  921, 921, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  922, 922, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  923, 923, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  924, 924, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  925, 925, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  926, 926, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  927, 927, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  928, 928, 9, 'Nutrición IX: Suplementos', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  929, 929, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  930, 930, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  931, 931, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  932, 932, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  933, 933, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  934, 934, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  935, 935, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  936, 936, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  937, 937, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  938, 938, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  939, 939, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  940, 940, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  941, 941, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  942, 942, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  943, 943, 9, 'El Hierro IX: Power-Building', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦍', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  944, 944, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  945, 945, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🥇', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  946, 946, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  947, 947, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  948, 948, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  949, 949, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  950, 950, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🥇', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

INSERT INTO public.legacy_path_nodes (
  id, level, fase, title, concept, type, category, 
  emoji, color, bg_color, bc_reward, xp_reward, 
  is_milestone, is_mystery, is_checkpoint, questions
) VALUES
(
  951, 951, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  952, 952, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  953, 953, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  954, 954, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  955, 955, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🥇', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  956, 956, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  957, 957, 9, 'Era Dorada IX: The Mecca', 'Mastering Era Dorada', 'challenge', 'especial',
  '🥇', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  958, 958, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  959, 959, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  960, 960, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  961, 961, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  962, 962, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  963, 963, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  964, 964, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  965, 965, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  966, 966, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  967, 967, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  968, 968, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  969, 969, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  970, 970, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'bossBattle', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  971, 971, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  972, 972, 10, 'Nutrición X: Biohacking Dietético', 'Mastering Nutrición', 'challenge', 'cuerpo',
  '🥑', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  973, 973, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  974, 974, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  975, 975, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 250, 150,
  true, false, true, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  976, 976, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  977, 977, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  978, 978, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  979, 979, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  980, 980, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  981, 981, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  982, 982, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  983, 983, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  984, 984, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  985, 985, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'bossBattle', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La proteína es el único macronutriente que no puede ser sustituido por otro debido a sus aminoácidos esenciales?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  986, 986, 10, 'El Hierro X: Heavy Duty', 'Mastering El Hierro', 'challenge', 'cuerpo',
  '🦾', '#DC2626', '#DC262611', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"La regla de oro del fitness, arma la frase:","options":["No puedes superar una mala dieta con entrenamiento duro"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"¿Cuál es el principio base para que un músculo crezca de forma sostenida?","options":["Sobrecarga Progresiva","Confusión muscular","Sudar mucho","Entrenar en ayunas"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  987, 987, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  988, 988, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  989, 989, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  990, 990, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🌟', '#EAB308', '#EAB30811', 250, 150,
  true, false, true, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  991, 991, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  992, 992, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  993, 993, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  994, 994, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  995, 995, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🌟', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  996, 996, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  997, 997, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  998, 998, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  999, 999, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'challenge', 'especial',
  '🌟', '#EAB308', '#EAB30811', 50, 25,
  false, false, false, '[{"type":"text","question":"Según el Bushido, ¿qué es ''Meiyo''?","options":["Lealtad ciega","Honor personal","La espada samurai","Estrategia militar"],"correctAnswer":1,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
),
(
  1000, 1000, 10, 'Era Dorada X: El V-Taper Perfecto', 'Mastering Era Dorada', 'bossBattle', 'especial',
  '🌟', '#EAB308', '#EAB30811', 250, 150,
  true, false, false, '[{"type":"boolean","question":"¿La Era Dorada del culturismo priorizaba la simetría y la estética por encima del tamaño monstruoso?","options":["Verdadero","Falso"],"correctAnswer":0,"explanation":"Explicación académica en desarrollo por la universidad."},{"type":"build-phrase","question":"Arma la regla sobre la línea de sangre y el legado:","options":["Planta árboles bajo cuya sombra no esperas sentarte"],"correctAnswer":0,"explanation":"El conocimiento interior se forja con disciplina."}]'
)
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  fase = EXCLUDED.fase,
  title = EXCLUDED.title,
  concept = EXCLUDED.concept,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  bg_color = EXCLUDED.bg_color,
  bc_reward = EXCLUDED.bc_reward,
  xp_reward = EXCLUDED.xp_reward,
  is_milestone = EXCLUDED.is_milestone,
  is_mystery = EXCLUDED.is_mystery,
  is_checkpoint = EXCLUDED.is_checkpoint,
  questions = EXCLUDED.questions;

