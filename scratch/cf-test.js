const { chromium } = require('playwright');
const fs = require('fs');
const outDir = 'C:/Users/iitsi/AppData/Local/Temp/cf-verify';
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE ERR:', m.text().slice(0, 100)); });

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: outDir + '/1-homepage.png' });
  console.log('1. Homepage loaded');

  await page.evaluate(() => window.dispatchEvent(new CustomEvent('open-course-finder')));
  await page.waitForFunction(() => !!document.querySelector('.cf-question'), { timeout: 10000 });
  await page.screenshot({ path: outDir + '/2-step1.png' });
  const q1 = await page.$eval('.cf-question', el => el.textContent.trim());
  console.log('First question:', q1);
  // Print all step-1 options
  const opts1 = await page.$$eval('.cf-option-btn', btns => btns.map(b => b.textContent.trim()));
  console.log('Step-1 options:', opts1);

  // exact-match helper: prefer exact, fall back to contains
  async function pickExact(exact, fallbackContains, label) {
    const isGate = await page.$('.cf-gate');
    if (isGate) {
      console.log('  [Gate at ' + label + ']');
      await page.fill('input[placeholder*="Name"]', 'Test Student');
      await page.fill('input[type="email"]', 'test@example.com');
      const tel = await page.$('input[type="tel"]');
      if (tel) await tel.fill('9876543210');
      await page.click('.cf-submit-btn');
      await page.waitForTimeout(2000);
      await page.waitForSelector('.cf-question', { timeout: 5000 });
    }
    await page.waitForSelector('.cf-option-btn', { timeout: 5000 });
    const q = await page.$eval('.cf-question', el => el.textContent.trim().slice(0, 55)).catch(() => '?');
    const buttons = await page.$$('.cf-option-btn');
    const texts = [];
    for (const btn of buttons) {
      const txt = (await btn.textContent()).trim();
      texts.push(txt);
      if (txt.toLowerCase() === exact.toLowerCase()) {
        await btn.click(); await page.waitForTimeout(350);
        console.log('  ' + label + ' [' + q + ']: EXACT "' + txt.slice(0,35) + '"');
        return;
      }
    }
    // fallback contains
    for (const btn of buttons) {
      const txt = (await btn.textContent()).trim();
      if (txt.toLowerCase().includes(fallbackContains.toLowerCase())) {
        await btn.click(); await page.waitForTimeout(350);
        console.log('  ' + label + ' [' + q + ']: contains "' + txt.slice(0,35) + '"');
        return;
      }
    }
    // last resort: first button
    if (buttons.length) {
      const txt = (await buttons[0].textContent()).trim();
      await buttons[0].click(); await page.waitForTimeout(350);
      console.log('  ' + label + ' [' + q + ']: FALLBACK "' + txt.slice(0,35) + '" (opts: ' + texts.slice(0,4).join('|') + ')');
    }
  }

  // Step 1: Qualification → Graduate (not Below 12th which also contains "12th")
  await pickExact('Graduate (Bachelors)', 'graduate', 'S1-Qual');
  // Step 2: Status
  await pickExact('Studying / Student', 'student', 'S2-Status');
  // Step 3: Mode
  await pickExact('Online', 'online', 'S3-Mode');
  // Step 4: Gate then Field → Management
  await pickExact('Management', 'management', 'S4-Field');
  await page.screenshot({ path: outDir + '/3-after-s4.png' });
  // Step 5: Specialization
  await pickExact('Finance & Accounting', 'finance', 'S5-Spec');
  // Step 6: Goal
  await pickExact('Get a Job', 'job', 'S6-Goal');
  // Step 7: University type
  await page.screenshot({ path: outDir + '/4-s7-unitype.png' });
  await pickExact('No Preference', 'preference', 'S7-UniType');
  // Step 8: Experience
  await pickExact('No Experience (Fresher)', 'no experience', 'S8-Exp');
  // Step 9: Duration
  await pickExact('Flexible / Any', 'flexible', 'S9-Dur');
  // Step 10: Budget
  await page.screenshot({ path: outDir + '/5-s10-budget.png' });
  await pickExact('₹50K – ₹1 Lakh', '50k', 'S10-Budget');
  await page.waitForTimeout(500);
  await page.screenshot({ path: outDir + '/6-pre-find.png' });

  // Find Courses
  const findBtn = await page.$('.cf-find-btn');
  if (findBtn) {
    console.log('Find button present');
    await findBtn.click();
    console.log('Waiting for results...');
    await page.waitForSelector('.cf-results-title', { timeout: 12000 });
    console.log('Results appeared!');
  } else {
    const info = await page.evaluate(() => ({
      step: document.querySelector('.cf-step-current-label')?.textContent?.trim(),
      q: document.querySelector('.cf-question')?.textContent?.trim().slice(0,60),
      opts: Array.from(document.querySelectorAll('.cf-option-btn')).map(b=>b.textContent.trim()).slice(0,4)
    }));
    console.log('WARNING - Find btn missing:', JSON.stringify(info));
  }

  await page.screenshot({ path: outDir + '/7-results.png' });

  const results = await page.evaluate(() => {
    const allCards = document.querySelectorAll('.cf-result-card');
    const uniSection = document.querySelector('.cf-universities-section');
    const uniCards = uniSection ? uniSection.querySelectorAll('.cf-result-card') : [];
    const programCards = allCards.length - uniCards.length;
    return {
      title: document.querySelector('.cf-results-title')?.textContent?.trim(),
      subtitle: document.querySelector('.cf-results-subtitle')?.textContent?.trim(),
      totalCards: allCards.length,
      programCards,
      uniSectionPresent: !!uniSection,
      uniHeading: uniSection?.querySelector('.cf-section-heading')?.textContent?.trim(),
      uniCardCount: uniCards.length,
      noResults: !!document.querySelector('.cf-no-results'),
      programDetails: Array.from(allCards).slice(0, programCards).map(c => ({
        name: c.querySelector('.cf-result-name')?.textContent?.trim(),
        fee: c.querySelector('.cf-price-value')?.textContent?.trim()
      }))
    };
  });

  console.log('\n====== RESULTS ======');
  console.log(JSON.stringify(results, null, 2));
  console.log('\n--- VERDICT ---');
  const pass = results.title && results.programCards > 0;
  console.log((results.title ? 'PASS' : 'FAIL') + ' Results title: ' + results.title);
  console.log((results.programCards > 0 ? 'PASS' : 'FAIL') + ' Programs found: ' + results.programCards);
  console.log((results.uniSectionPresent ? 'PASS' : 'FAIL') + ' Universities section present');
  console.log((results.uniCardCount > 0 ? 'PASS' : 'WARN') + ' University cards: ' + results.uniCardCount);
  console.log('\nOVERALL: ' + (pass ? 'PASS' : 'FAIL'));

  await browser.close();
  console.log('\nScreenshots: ' + outDir);
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
