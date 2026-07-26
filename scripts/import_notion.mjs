import fs from 'fs';
import path from 'path';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// Helper to extract a section based on an array of possible heading titles
function extractSection(content, possibleHeadings) {
  const lines = content.split('\n');
  let capturing = false;
  let result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('#')) {
      // Check if it's one of our target headings
      const normalizedLine = line.replace(/#/g, '').replace(/\*\*/g, '').trim().toLowerCase();
      
      const isTarget = possibleHeadings.some(h => normalizedLine.includes(h.toLowerCase()));
      
      if (isTarget) {
        capturing = true;
        continue;
      } else if (capturing) {
        // We reached another heading, stop capturing
        break;
      }
    }
    
    if (capturing) {
      result.push(line);
    }
  }
  
  return result.join('\n').trim();
}

const projects = [
  {
    folder: 'doc/Portfolio-Crewdible',
    file: 'Crewdible OMS Redesign 32831b0eea4d474a9329ed22181f1626.md',
    name: 'Crewdible OMS Redesign'
  },
  {
    folder: 'doc/Portfolio-IsuzuLink',
    file: 'Isuzu Link - Mobile Apps 6e677f7530d94236a4852bc3954a7f3f.md',
    name: 'Isuzu Link - Mobile Apps'
  },
  {
    folder: 'doc/Portfolio-QRDigitalMenu',
    file: 'QR Digital Menu c75a0f67a9fc4004b2cb26ce424a20df.md',
    name: 'QR Digital Menu'
  },
  {
    folder: 'doc/Portfolio-TractoGo',
    file: 'TRACtoGO Web dan Mobile Application UX Enhancement 2113807023608064bba9e1e5d1d9edca.md',
    name: 'TRACtoGO Web dan Mobile Application UX Enhancement'
  }
];

async function main() {
  let sqlOutput = '';
  
  for (const proj of projects) {
    const filePath = path.join(process.cwd(), proj.folder, proj.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Parse metadata
    const tagsMatch = content.match(/Tags:\s*(.+)/i);
    const techStack = tagsMatch ? tagsMatch[1].split(',').map(s => s.trim()) : [];
    
    const roleMatch = content.match(/Role:\s*(.+)/i);
    const category = roleMatch ? roleMatch[1].trim() : 'Design';

    // Parse sections
    const problem = extractSection(content, ['Problem', 'Masalah yang Diidentifikasi']);
    let solution = extractSection(content, ['Solution', 'The Goal', 'The Goals', 'Tujuan Proyek']);
    const about = extractSection(content, ['About', 'Gambaran Proyek']);
    
    // The entire markdown without the frontmatter (Role, Timeline, Tags, Tools) 
    // and let's remove the first title if it matches the project name.
    let longDescription = content;
    longDescription = longDescription.replace(/^# .+\n/, ''); // Remove title
    longDescription = longDescription.replace(/^Role: .+\n/, '');
    longDescription = longDescription.replace(/^Timeline: .+\n/, '');
    longDescription = longDescription.replace(/^Tags: .+\n/, '');
    longDescription = longDescription.replace(/^Tools: .+\n/, '');
    longDescription = longDescription.trim();

    // Fix image paths in longDescription to match public path
    longDescription = longDescription.replace(/\]\(([^)]+)\)/g, (match, p1) => {
      // If it's an external link, keep it
      if (p1.startsWith('http')) return match;
      // It's a local image like "Crewdible OMS Redesign/Behance_shot_HD_-_2.png"
      // We must ensure spaces are URL-encoded for valid markdown
      const encodedPath = encodeURI(`/projects/${decodeURI(p1)}`);
      return `](${encodedPath})`;
    });

    // Find main image from the first image in the file
    let imagePath = '';
    const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (imageMatch && !imageMatch[1].startsWith('http')) {
        imagePath = encodeURI(`/projects/${decodeURI(imageMatch[1])}`);
    }

    const slug = slugify(proj.name);
    
    const shortDesc = about ? (about.length > 200 ? about.substring(0, 197) + '...' : about) : 'Project details available.';

    const projectData = {
      name: proj.name,
      slug: slug,
      category: category,
      description: shortDesc,
      image: imagePath,
      tech_stack: techStack,
      problem: problem || 'Informasi masalah dapat dilihat pada detail proyek.',
      solution: solution || 'Informasi solusi dapat dilihat pada detail proyek.',
      long_description: longDescription,
      link: '#'
    };

    const escapeSql = (str) => {
      if (str === null || str === undefined) return '';
      return String(str).replace(/'/g, "''");
    };
    
    sqlOutput += `
INSERT INTO projects (name, slug, category, description, image, tech_stack, problem, solution, long_description, link)
VALUES (
  '${escapeSql(projectData.name)}',
  '${escapeSql(projectData.slug)}',
  '${escapeSql(projectData.category)}',
  '${escapeSql(projectData.description)}',
  '${escapeSql(projectData.image)}',
  ARRAY[${projectData.tech_stack.map(t => `'${escapeSql(t)}'`).join(', ')}]::TEXT[],
  '${escapeSql(projectData.problem)}',
  '${escapeSql(projectData.solution)}',
  '${escapeSql(projectData.long_description)}',
  '${escapeSql(projectData.link)}'
) ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  tech_stack = EXCLUDED.tech_stack,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  long_description = EXCLUDED.long_description,
  link = EXCLUDED.link;
`;
    console.log(`Generated SQL for: ${proj.name}...`);
  }
  
  fs.writeFileSync(path.join(process.cwd(), 'import_notion.sql'), sqlOutput);
  console.log('Done! Generated import_notion.sql');
}

main().catch(console.error);
