const fs = require('fs');
const path = require('path');

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const regexes = [
    { re: /from-(purple|blue|cyan|indigo|pink|fuchsia|teal)-[34567]00/g, rep: 'from-zinc-800' },
    { re: /to-(purple|blue|cyan|indigo|pink|fuchsia|teal)-[34567]00/g, rep: 'to-zinc-950' },
    { re: /via-(purple|blue|cyan|indigo|pink|fuchsia|teal)-[34567]00/g, rep: 'via-zinc-900' },
    { re: /bg-(purple|blue|cyan|indigo|pink|fuchsia|teal)-[34567]00/g, rep: 'bg-zinc-800' },
    { re: /text-(purple|blue|cyan|indigo|pink|fuchsia|teal)-[34567]00/g, rep: 'text-zinc-400' },
    { re: /border-(purple|blue|cyan|indigo|pink|fuchsia|teal)-[34567]00/g, rep: 'border-zinc-700' },
    { re: /ring-(purple|blue|cyan|indigo|pink|fuchsia|teal)-[34567]00/g, rep: 'ring-zinc-700' },
    { re: /shadow-(purple|blue|cyan|indigo|pink|fuchsia|teal)-[34567]00/g, rep: 'shadow-zinc-900' },
    { re: /rgba\(168,85,247/g, rep: 'rgba(113,113,122' },
    { re: /rgba\(59,130,246/g, rep: 'rgba(113,113,122' },
    { re: /rgba\(0,87,255/g, rep: 'rgba(113,113,122' },
    { re: /rgba\(147,51,234/g, rep: 'rgba(113,113,122' },
    { re: /bg-winf-aerocore_blue/g, rep: 'bg-zinc-800' },
    { re: /text-winf-aerocore_blue/g, rep: 'text-zinc-400' },
    { re: /border-winf-aerocore_blue/g, rep: 'border-zinc-700' },
    { re: /bg-winf-darkpurple/g, rep: 'bg-zinc-900' },
    { re: /text-winf-darkpurple/g, rep: 'text-zinc-500' },
    { re: /from-winf-darkpurple/g, rep: 'from-zinc-800' },
    { re: /to-winf-darkpurple/g, rep: 'to-zinc-950' },
  ];

  let modified = false;
  let newContent = content;
  
  for (const { re, rep } of regexes) {
    if (re.test(newContent)) {
      newContent = newContent.replace(re, rep);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceColorsInFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'components'));
console.log('Done replacing colors.');
