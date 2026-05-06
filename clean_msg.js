const { execSync } = require('child_process');
const fs = require('fs');

try {
  const msg = execSync('git --git-dir=../.git --work-tree=.. log -1 --format=%B').toString();
  const newMsg = msg
    .replace(/Co-authored-by: Cursor <cursoragent@cursor.com>/g, '')
    .replace(/Made-with: Cursor/g, '')
    .replace(/\n+$/, '') // remove trailing newlines
    .trim();
  fs.writeFileSync('msg.txt', newMsg);
  execSync('git --git-dir=../.git --work-tree=.. commit --amend -F msg.txt');
  console.log('Cleaned commit message.');
} catch (e) {
  console.error(e);
  process.exit(1);
}
