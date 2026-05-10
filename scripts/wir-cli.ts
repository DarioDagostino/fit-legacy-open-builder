#!/usr/bin/env node

/**
 * CLI para .wir format
 * Comandos: validate, encode, decode, inspect, catalog
 *
 * Uso:
 *   wir validate rutina.json
 *   wir encode rutina.json
 *   wir decode "eyJ2IjoxLCJu..."
 *   wir inspect --url "https://fitlegacy.app/r/wir?data=..."
 *   wir catalog exercise press_banca
 */

import { Command, Option } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { 
  encodeWir, 
  decodeWir, 
  parseWirUrl,
  toWirUrl,
  validateWir,
  formatValidationErrors,
  printWirSummary,
  getPayloadSize,
  printPayloadStats,
  summarizeWir,
} from '../src/lib/wir';
import { 
  getExerciseById, 
  getFoodById,
  UNIFIED_EXERCISES,
  UNIFIED_FOODS,
} from '@fit-legacy/shared';

const program = new Command();

program.name('wir').description('CLI para formato .wir de rutinas').version('1.0.0');

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATE COMMAND
// ─────────────────────────────────────────────────────────────────────────────

program
  .command('validate <file>')
  .description('Validar un archivo .wir JSON')
  .option('--catalog', 'Verificar IDs en catálogo', true)
  .option('--size', 'Verificar límite de tamaño', true)
  .action((file, options) => {
    try {
      if (!fs.existsSync(file)) {
        console.error(`❌ Archivo no encontrado: ${file}`);
        process.exit(1);
      }

      const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const result = validateWir(data, {
        checkCatalog: options.catalog,
        checkSize: options.size,
      });

      if (result.valid) {
        console.log('✅ Documento válido');
        printWirSummary(result.data!);
        const sizes = getPayloadSize(result.data!);
        console.log(`\n📊 Tamaño URL: ${sizes.estimated} bytes`);
      } else {
        console.log(formatValidationErrors(result));
        process.exit(1);
      }
    } catch (error) {
      console.error(`❌ Error:`, error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// ─────────────────────────────────────────────────────────────────────────────
// ENCODE COMMAND
// ─────────────────────────────────────────────────────────────────────────────

program
  .command('encode <file>')
  .description('Codificar rutina a URL compartible')
  .option('--url <baseUrl>', 'URL base para el link', 'https://builder.fitlegacy.app')
  .action((file, options) => {
    try {
      if (!fs.existsSync(file)) {
        console.error(`❌ Archivo no encontrado: ${file}`);
        process.exit(1);
      }

      const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const validation = validateWir(data);

      if (!validation.valid) {
        console.log(formatValidationErrors(validation));
        process.exit(1);
      }

      const shareUrl = toWirUrl(validation.data!, options.url);
      console.log('🔗 URL Shareable:');
      console.log(shareUrl);

      const sizes = getPayloadSize(validation.data!);
      console.log(`\n📊 Estadísticas:`);
      console.log(`  Total: ${sizes.estimated} bytes`);
      if (sizes.estimated > 1800) {
        console.log(`  ⚠️  Cercano al límite WhatsApp (2000 bytes)`);
      } else {
        console.log(`  ✅ Seguro para WhatsApp`);
      }
    } catch (error) {
      console.error(`❌ Error:`, error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// ─────────────────────────────────────────────────────────────────────────────
// DECODE COMMAND
// ─────────────────────────────────────────────────────────────────────────────

program
  .command('decode [payload]')
  .description('Decodificar payload o URL .wir')
  .option('--url', 'Interpretar como URL completa', false)
  .option('--pretty', 'Pretty print JSON', true)
  .action((payload, options) => {
    try {
      if (!payload) {
        console.error('❌ Proporciona un payload o URL');
        process.exit(1);
      }

      let decoded;
      if (options.url) {
        decoded = parseWirUrl(payload);
      } else {
        decoded = decodeWir(payload);
      }

      console.log('✅ Decodificado:');
      console.log(JSON.stringify(decoded, null, options.pretty ? 2 : 0));
    } catch (error) {
      console.error(`❌ Error:`, error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// ─────────────────────────────────────────────────────────────────────────────
// INSPECT COMMAND
// ─────────────────────────────────────────────────────────────────────────────

program
  .command('inspect')
  .description('Inspeccionar un URL o archivo .wir')
  .option('--url <url>', 'URL con ?data=...')
  .option('--file <file>', 'Archivo JSON')
  .action((options) => {
    try {
      let data;

      if (options.url) {
        data = parseWirUrl(options.url);
      } else if (options.file) {
        if (!fs.existsSync(options.file)) {
          console.error(`❌ Archivo no encontrado: ${options.file}`);
          process.exit(1);
        }
        data = JSON.parse(fs.readFileSync(options.file, 'utf-8'));
      } else {
        console.error('❌ Usa --url o --file');
        process.exit(1);
      }

      const summary = summarizeWir(data);
      console.log(`📋 "${summary.name}"`);
      console.log(`  Versión: v${summary.version}`);
      console.log(`  Ejercicios: ${summary.exerciseCount}`);
      console.log(`  Alimentos: ${summary.foodCount}`);
      console.log(`  Portada: ${summary.hasCover ? '✅' : '❌'}`);

      if (options.file) {
        printPayloadStats(data);
      }
    } catch (error) {
      console.error(`❌ Error:`, error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG COMMAND
// ─────────────────────────────────────────────────────────────────────────────

program
  .command('catalog <type> [id]')
  .description('Resolver IDs del catálogo')
  .action((type, id) => {
    try {
      if (type === 'exercise' || type === 'exercises') {
        if (id) {
          const ex = getExerciseById(id);
          if (ex) {
            console.log(`✅ Ejercicio: ${ex.name}`);
            console.log(`   ID: ${ex.id}`);
            console.log(`   Sección: ${ex.section}`);
            console.log(`   Dificultad: ${ex.difficulty}`);
          } else {
            console.log(`❌ Ejercicio no encontrado: ${id}`);
            process.exit(1);
          }
        } else {
          console.log('📚 Ejercicios disponibles:');
          let count = 0;
          for (const [section, categories] of Object.entries(UNIFIED_EXERCISES)) {
            for (const cat of categories) {
              for (const ex of cat.exercises) {
                console.log(`   ${ex.id.padEnd(25)} ${ex.name}`);
                count++;
              }
            }
          }
          console.log(`\n📊 Total: ${count} ejercicios`);
        }
      } else if (type === 'food' || type === 'foods') {
        if (id) {
          const food = getFoodById(id);
          if (food) {
            console.log(`✅ Alimento: ${food.name}`);
            console.log(`   ID: ${food.id}`);
            console.log(`   Categoría: ${food.category}`);
            console.log(`   Kcal: ${food.calories}`);
            console.log(`   Proteína: ${food.protein}g | Carbs: ${food.carbs}g | Grasas: ${food.fats}g`);
          } else {
            console.log(`❌ Alimento no encontrado: ${id}`);
            process.exit(1);
          }
        } else {
          console.log('📚 Alimentos disponibles:');
          let count = 0;
          for (const [category, foods] of Object.entries(UNIFIED_FOODS)) {
            for (const food of foods) {
              console.log(`   ${food.id.padEnd(20)} ${food.name}`);
              count++;
            }
          }
          console.log(`\n📊 Total: ${count} alimentos`);
        }
      } else {
        console.error(`❌ Tipo desconocido: ${type}. Usa 'exercise' o 'food'`);
        process.exit(1);
      }
    } catch (error) {
      console.error(`❌ Error:`, error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLE COMMAND
// ─────────────────────────────────────────────────────────────────────────────

program
  .command('example [type]')
  .description('Mostrar ejemplos de documentos .wir válidos')
  .action((type = 'simple') => {
    const examples: Record<string, object> = {
      simple: {
        v: 1,
        n: 'SIMPLE_WORKOUT',
        e: [{ i: 'press_banca', s: 4, r: 10, w: 80 }],
      },
      mixed: {
        v: 1,
        n: 'FULL_PROTOCOL',
        c: 'https://example.com/image.jpg',
        e: [
          { i: 'press_banca', s: 4, r: 10, w: 80 },
          { i: 'sentadilla', s: 3, r: 8, w: 120 },
        ],
        f: [
          { i: 'pollo', q: 300 },
          { i: 'arroz', q: 200 },
        ],
      },
      nutrition: {
        v: 1,
        n: 'MEAL_PLAN',
        f: [
          { i: 'pollo', q: 200 },
          { i: 'batata', q: 150 },
          { i: 'brocoli', q: 100 },
        ],
      },
    };

    if (examples[type]) {
      console.log(`📄 Ejemplo: ${type}`);
      console.log(JSON.stringify(examples[type], null, 2));
    } else {
      console.log('Ejemplos disponibles: simple, mixed, nutrition');
    }
  });

program.parse(process.argv);

// Mostrar ayuda por defecto
if (process.argv.length < 3) {
  program.outputHelp();
}
