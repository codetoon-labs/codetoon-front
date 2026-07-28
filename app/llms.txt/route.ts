// Served as a route (not a public/ asset) so the markdown-for-agents
// middleware rewrite works on Cloudflare, with an explicit markdown content-type.

const content = `# Codetoon

> Codetoon is a full-service digital agency based in New Cairo, Egypt. We fuse design and technology into one team under one roof — Build. Brand. Boost. — covering AI & automation, software development, design, and digital marketing from strategy through launch.

Codetoon works with brands that are tired of juggling multiple vendors: one team, one strategy, end-to-end execution. Client work spans ERP systems, real-estate platforms, mobile apps, branding, and growth marketing.

## Solutions

- [AI & Automation](https://codetoon.net/solution/ai-automation): Workflow automation, AI integrations, and intelligent systems that optimize efficiency
- [Technology](https://codetoon.net/solution/technology): Web, mobile, and custom software built for performance, security, and scale
- [Design](https://codetoon.net/solution/design): Branding and visual experiences, from identity to product UI
- [Marketing](https://codetoon.net/solution/marketing): Results-driven digital marketing to grow traffic, brand, and conversions
- [All solutions](https://codetoon.net/solutions): Overview of every solution area and its services

## Work

- [Projects portfolio](https://codetoon.net/projects): Case studies including ERP systems, real-estate websites, and mobile apps

## Company

- [About us](https://codetoon.net/about-us): Who we are, how we work, and the team
- [Privacy policy](https://codetoon.net/privacy): How we handle data

## Contact

- Phone: +20 115 616 7758
- WhatsApp: https://codetoon.net/wa
- Address: 316 Ninety Road, Sector 2, Office No. 3, Third Floor, 5th Settlement, New Cairo, Cairo, Egypt

## Optional

- [Sitemap](https://codetoon.net/sitemap.xml): Full list of pages including individual project and solution pages
`;

export async function GET() {
    return new Response(content, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
