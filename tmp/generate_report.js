const fs = require('fs');
const { execSync } = require('child_process');

try {
  require.resolve('docx');
} catch (e) {
  console.log('Installing docx...');
  execSync('npm install docx', { stdio: 'inherit' });
}

const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType, PageBreak } = docx;

async function generate() {
    const doc = new Document({
        creator: "Antigravity",
        title: "SEO / GEO / AEO Audit Report",
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({ text: "MR2LABS.COM", bold: true, size: 72 })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 1800, after: 400 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "SEO / GEO / AEO Audit Report", size: 36 })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "FULL AUDIT", size: 22 })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 1200 }
                    }),
                    new Paragraph({
                        text: "Executive Summary",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 1000, after: 200 }
                    }),
                    new Paragraph({
                        text: "The Mr² Labs portfolio site features an exceptionally strong technical SEO foundation, taking advantage of Next.js static rendering, comprehensive metadata, and Organization JSON-LD. Its GEO (Generative Engine Optimization) signals are robust, establishing clear E-E-A-T through the founder's credentials and factual case studies. The primary growth opportunity lies in AEO (Answer Engine Optimization), as the site currently lacks FAQ and HowTo schema, missing potential Answer Engine snippets. Additionally, a critical robots.txt directive currently blocks /_next/ which could hinder Googlebot's ability to render page assets correctly.",
                        spacing: { after: 400 }
                    }),
                    new Paragraph({
                        text: "Score Summary",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { after: 200 }
                    }),
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph({text: "Dimension", bold: true})] }),
                                    new TableCell({ children: [new Paragraph({text: "Score", bold: true})] }),
                                    new TableCell({ children: [new Paragraph({text: "Status", bold: true})] }),
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("SEO")] }),
                                    new TableCell({ children: [new Paragraph("8/10")] }),
                                    new TableCell({ children: [new Paragraph("Strong")] }),
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("GEO")] }),
                                    new TableCell({ children: [new Paragraph("9/10")] }),
                                    new TableCell({ children: [new Paragraph("Strong")] }),
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("AEO")] }),
                                    new TableCell({ children: [new Paragraph("5/10")] }),
                                    new TableCell({ children: [new Paragraph("Needs Work")] }),
                                ]
                            })
                        ]
                    }),
                    new Paragraph({
                        text: "Priority Recommendations",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 800, after: 200 }
                    }),
                    new Paragraph({
                        text: "1. Update robots.js to allow /_next/ to ensure Google can access JS and CSS bundles for rendering."
                    }),
                    new Paragraph({
                        text: "2. Implement FAQPage Schema on the services page to capture generative AI and voice search queries."
                    }),
                    new Paragraph({
                        text: "3. Remove render-blocking synchronous font loading in layout.js to improve Core Web Vitals (FCP)."
                    })
                ]
            }
        ]
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync('seo-audit-mr2labs-com.docx', buffer);
    console.log('DOCX written to seo-audit-mr2labs-com.docx');
}

generate().catch(console.error);
