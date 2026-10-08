// Optional authoring utility. Generated SVG assets are committed; no build required.
import { writeFile } from 'node:fs/promises';
const products = [
  ['highland', 'HIGHLAND', 'ORIGIN', 'GREEN COFFEE', '#e7e1ce', '#e7dec7', '#385940', '#eff0db', '01'],
  ['valley', 'VALLEY', 'RESERVE', 'GREEN COFFEE', '#cab796', '#b9a585', '#716245', '#f3ecda', '02'],
  ['dawn', 'MOUNTAIN', 'DAWN', 'ROASTED COFFEE', '#c17f5e', '#a36347', '#f2e5cd', '#4c3828', '03'],
  ['dusk', 'HIGHLAND', 'DUSK', 'ROASTED COFFEE', '#254738', '#183728', '#d8ccac', '#213e2e', '04'],
];
for (const [file, first, second, type, paper, side, label, ink, number] of products) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 350" width="280" height="350">
  <defs><linearGradient id="paper"><stop stop-color="${side}"/><stop offset=".15" stop-color="${paper}"/><stop offset=".7" stop-color="${paper}"/><stop offset="1" stop-color="${side}"/></linearGradient><filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7"/></filter></defs>
  <ellipse cx="143" cy="325" rx="77" ry="8" fill="#243529" opacity=".16" filter="url(#shadow)"/>
  <path d="m65 28 151 0 11 38-5 218 13 33-184 0 13-32L56 66Z" fill="url(#paper)"/>
  <path d="m65 28 6 18 137 0 8-18" fill="none" stroke="${side}" stroke-width="2"/>
  <path d="M64 52h154M65 57h151" stroke="${side}" opacity=".6"/>
  <path d="m56 66 14 9-6 210-13 32 22-6 6-247M227 66l-14 9 9 209 13 33-22-8-6-246" fill="${side}" opacity=".45"/>
  <rect x="76" y="85" width="129" height="190" fill="${label}"/>
  <g stroke="${ink}" stroke-width="1.5" fill="none" stroke-linejoin="round"><path d="m115 120 14-19 12 16 13-24 14 27h-53Z"/><path d="M119 127h45"/></g>
  <g text-anchor="middle" fill="${ink}"><text x="140" y="145" font-family="Georgia,serif" font-size="10" letter-spacing="1">MOUNTAIN COFFEE</text><text x="140" y="157" font-family="Arial,sans-serif" font-size="4.8" letter-spacing="1.8">PAPUA NEW GUINEA</text><path d="M91 174h99" stroke="${ink}" opacity=".45"/>
  <text x="140" y="194" font-family="Georgia,serif" font-size="18">${first}</text><text x="140" y="215" font-family="Georgia,serif" font-size="20">${second}</text><text x="140" y="241" font-family="Arial,sans-serif" font-size="6.5" letter-spacing="1.6">${type}</text><text x="140" y="257" font-family="Arial,sans-serif" font-size="5.5" letter-spacing="1.2">CONCEPT SAMPLE · ${number}</text></g>
  <path d="M65 300q77-9 157 0" fill="none" stroke="${side}" stroke-width="2"/>
  </svg>`;
  await writeFile(new URL(`../assets/bag-${file}.svg`, import.meta.url), svg);
}
console.log('Created four original SVG packaging illustrations.');
