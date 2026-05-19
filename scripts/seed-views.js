const slugs = [
  'the-people-who-write-in-the-margins',
  'the-page-is-a-tool',
  'constraint-sharpens',
  'catch-first-edit-later',
  'the-method-beats-the-mood',
  'notes-as-identity',
  'attention-is-physical',
  'born-of-necessity',
  'we-dont-compete-with-notebooks',
  'the-index-method',
  'notebooks-of-ancient-singers',
  'why-your-notebook-should-never-be-organised',
  'the-grid-page-and-the-wandering-thought',
  'the-roman-wax-tablet',
  'two-lines-every-day',
  'the-first-page-rule',
  'constraint-as-creative-practice',
  'notes-as-identity-the-corebook',
  'margins-where-great-ideas-live',
  'idea-parking'
];

const url  = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command) {
  const r = await fetch(`${url}/${command}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return r.json();
}

(async () => {
  for (const slug of slugs) {
    const key = `views:${slug}`;
    const result = await redis(`SET/${key}/1/NX`);
    console.log(`${slug}: ${result.result === 'OK' ? 'seeded to 1' : 'already exists, skipped'}`);
  }
  console.log('Done.');
})();
