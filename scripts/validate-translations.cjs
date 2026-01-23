const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../public/locales');
const LANGUAGES = ['es', 'en'];

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      keys = keys.concat(getKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

function validateTranslations() {
  console.log('Validating translation files...\n');

  const translations = LANGUAGES.map(lang => {
    const filePath = path.join(LOCALES_DIR, lang, 'translation.json');
    const content = fs.readFileSync(filePath, 'utf-8');
    return {
      lang,
      keys: getKeys(JSON.parse(content)),
    };
  });

  const [source, ...targets] = translations;
  let hasError = false;

  console.log(`Source language (${source.lang}): ${source.keys.length} keys`);

  targets.forEach(target => {
    console.log(`Target language (${target.lang}): ${target.keys.length} keys`);

    const missingInTarget = source.keys.filter(k => !target.keys.includes(k));
    const extraInTarget = target.keys.filter(k => !source.keys.includes(k));

    if (missingInTarget.length > 0) {
      console.error(`\nMissing keys in ${target.lang}:`);
      missingInTarget.forEach(k => console.error(`  - ${k}`));
      hasError = true;
    }
    if (extraInTarget.length > 0) {
      console.error(`\nExtra keys in ${target.lang}:`);
      extraInTarget.forEach(k => console.error(`  - ${k}`));
      hasError = true;
    }
  });

  if (hasError) {
    console.error('\nValidation FAILED');
    process.exit(1);
  }

  console.log('\nValidation PASSED - all translation keys are in sync');
}

validateTranslations();
