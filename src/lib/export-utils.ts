import jsPDF from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  LevelFormat,
} from "docx";

// -------- Minimal markdown tokenizer --------
type InlineSegment = { text: string; bold?: boolean; italic?: boolean; code?: boolean };

type Block =
  | { type: "heading"; level: 1 | 2 | 3 | 4; inlines: InlineSegment[] }
  | { type: "paragraph"; inlines: InlineSegment[] }
  | { type: "bullet"; inlines: InlineSegment[] }
  | { type: "ordered"; inlines: InlineSegment[]; index: number }
  | { type: "table"; headers: InlineSegment[][]; rows: InlineSegment[][][] }
  | { type: "hr" }
  | { type: "blank" };

function parseInline(raw: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let i = 0;
  let buf = "";
  let bold = false;
  let italic = false;
  let code = false;
  const flush = () => {
    if (buf) {
      segments.push({ text: buf, bold, italic, code });
      buf = "";
    }
  };
  while (i < raw.length) {
    const two = raw.slice(i, i + 2);
    if (two === "**") { flush(); bold = !bold; i += 2; continue; }
    if (raw[i] === "*" || raw[i] === "_") { flush(); italic = !italic; i += 1; continue; }
    if (raw[i] === "`") { flush(); code = !code; i += 1; continue; }
    buf += raw[i];
    i += 1;
  }
  flush();
  return segments.length ? segments : [{ text: raw }];
}

function stripInlineMarks(s: string) {
  return s.replace(/\*\*/g, "").replace(/[`]/g, "").replace(/^\s*[-*+]\s+/, "");
}

export function parseMarkdown(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let orderedIdx = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { blocks.push({ type: "blank" }); orderedIdx = 0; continue; }
    if (/^---+$/.test(trimmed) || /^===+$/.test(trimmed)) { blocks.push({ type: "hr" }); continue; }

    // Headings
    const h = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (h) {
      blocks.push({ type: "heading", level: h[1].length as 1 | 2 | 3 | 4, inlines: parseInline(h[2]) });
      orderedIdx = 0;
      continue;
    }

    // Table (header | header) followed by --- | ---
    if (trimmed.includes("|") && i + 1 < lines.length && /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(lines[i + 1])) {
      const parseRow = (l: string) =>
        l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => parseInline(c.trim()));
      const headers = parseRow(trimmed);
      i += 2;
      const rows: InlineSegment[][][] = [];
      while (i < lines.length && lines[i].trim().includes("|") && lines[i].trim() !== "") {
        rows.push(parseRow(lines[i]));
        i += 1;
      }
      i -= 1;
      blocks.push({ type: "table", headers, rows });
      orderedIdx = 0;
      continue;
    }

    // Ordered list
    const ol = /^(\d+)\.\s+(.*)$/.exec(trimmed);
    if (ol) {
      orderedIdx += 1;
      blocks.push({ type: "ordered", inlines: parseInline(ol[2]), index: orderedIdx });
      continue;
    }

    // Bullet
    if (/^[-*+]\s+/.test(trimmed)) {
      blocks.push({ type: "bullet", inlines: parseInline(trimmed.replace(/^[-*+]\s+/, "")) });
      orderedIdx = 0;
      continue;
    }

    // Blockquote → treat as paragraph
    if (trimmed.startsWith(">")) {
      blocks.push({ type: "paragraph", inlines: parseInline(trimmed.replace(/^>\s?/, "")) });
      orderedIdx = 0;
      continue;
    }

    blocks.push({ type: "paragraph", inlines: parseInline(trimmed) });
    orderedIdx = 0;
  }
  return blocks;
}

// -------- PDF export --------
export function downloadPdf(markdown: string, filename: string, title: string) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 54;
  const maxW = pageW - margin * 2;
  let y = margin;

  const lineHeight = 14;

  const ensureSpace = (h: number) => {
    if (y + h > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  const titleLines = doc.splitTextToSize(title, maxW);
  titleLines.forEach((l: string) => { ensureSpace(22); doc.text(l, margin, y); y += 22; });
  y += 6;

  const blocks = parseMarkdown(markdown);

  const renderInlines = (inlines: InlineSegment[], indent = 0, fontSize = 11) => {
    doc.setFontSize(fontSize);
    // Build a single string with markers; for simplicity, render with bold spans
    const text = inlines.map((s) => s.text).join("");
    const lines = doc.splitTextToSize(text, maxW - indent);
    // Apply bold if entire block was bold (heading-like)
    const allBold = inlines.every((s) => s.bold);
    doc.setFont("helvetica", allBold ? "bold" : "normal");
    lines.forEach((l: string) => {
      ensureSpace(lineHeight);
      doc.text(l, margin + indent, y);
      y += lineHeight;
    });
  };

  for (const b of blocks) {
    if (b.type === "blank") { y += 6; continue; }
    if (b.type === "hr") {
      ensureSpace(10);
      doc.setDrawColor(180);
      doc.line(margin, y, pageW - margin, y);
      y += 10;
      continue;
    }
    if (b.type === "heading") {
      const sizes = { 1: 16, 2: 14, 3: 12, 4: 11 } as const;
      y += b.level <= 2 ? 8 : 4;
      ensureSpace(sizes[b.level] + 6);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(sizes[b.level]);
      const text = b.inlines.map((s) => s.text).join("");
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((l: string) => { ensureSpace(sizes[b.level] + 2); doc.text(l, margin, y); y += sizes[b.level] + 2; });
      y += 2;
      continue;
    }
    if (b.type === "bullet") {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const text = b.inlines.map((s) => s.text).join("");
      const lines = doc.splitTextToSize(text, maxW - 18);
      lines.forEach((l: string, idx: number) => {
        ensureSpace(lineHeight);
        if (idx === 0) doc.text("•", margin, y);
        doc.text(l, margin + 14, y);
        y += lineHeight;
      });
      continue;
    }
    if (b.type === "ordered") {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const text = b.inlines.map((s) => s.text).join("");
      const lines = doc.splitTextToSize(text, maxW - 22);
      lines.forEach((l: string, idx: number) => {
        ensureSpace(lineHeight);
        if (idx === 0) doc.text(`${b.index}.`, margin, y);
        doc.text(l, margin + 20, y);
        y += lineHeight;
      });
      continue;
    }
    if (b.type === "table") {
      const cols = b.headers.length;
      const colW = maxW / cols;
      const drawRow = (cells: InlineSegment[][], header: boolean) => {
        const cellTexts = cells.map((c) => c.map((s) => s.text).join(""));
        const wrapped = cellTexts.map((t) => doc.splitTextToSize(t, colW - 8));
        const rowH = Math.max(...wrapped.map((w) => w.length)) * lineHeight + 6;
        ensureSpace(rowH);
        doc.setFont("helvetica", header ? "bold" : "normal");
        doc.setFontSize(10);
        if (header) {
          doc.setFillColor(235, 240, 245);
          doc.rect(margin, y - 10, maxW, rowH, "F");
        }
        doc.setDrawColor(210);
        for (let c = 0; c < cols; c++) {
          doc.rect(margin + c * colW, y - 10, colW, rowH);
          wrapped[c].forEach((l: string, li: number) => {
            doc.text(l, margin + c * colW + 4, y + li * lineHeight);
          });
        }
        y += rowH;
      };
      drawRow(b.headers, true);
      for (const r of b.rows) drawRow(r, false);
      y += 6;
      continue;
    }
    // paragraph
    renderInlines(b.inlines, 0, 11);
    y += 2;
  }

  doc.save(filename);
}

// -------- DOCX export --------
function inlinesToRuns(inlines: InlineSegment[]): TextRun[] {
  return inlines.map(
    (s) =>
      new TextRun({
        text: s.text,
        bold: s.bold,
        italics: s.italic,
        font: s.code ? "Courier New" : undefined,
      }),
  );
}

export async function downloadDocx(markdown: string, filename: string, title: string) {
  const blocks = parseMarkdown(markdown);
  const children: (Paragraph | Table)[] = [];

  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: title, bold: true, size: 36 })],
      spacing: { after: 240 },
    }),
  );

  for (const b of blocks) {
    if (b.type === "blank") {
      children.push(new Paragraph({ children: [new TextRun("")] }));
      continue;
    }
    if (b.type === "hr") {
      children.push(
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "BBBBBB", space: 1 } },
          children: [new TextRun("")],
        }),
      );
      continue;
    }
    if (b.type === "heading") {
      const level =
        b.level === 1
          ? HeadingLevel.HEADING_1
          : b.level === 2
          ? HeadingLevel.HEADING_2
          : b.level === 3
          ? HeadingLevel.HEADING_3
          : HeadingLevel.HEADING_4;
      children.push(
        new Paragraph({
          heading: level,
          children: inlinesToRuns(b.inlines).map(
            (r) => new TextRun({ ...((r as any).options ?? {}), bold: true }),
          ),
          spacing: { before: 200, after: 120 },
        }),
      );
      continue;
    }
    if (b.type === "bullet") {
      children.push(
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: inlinesToRuns(b.inlines),
        }),
      );
      continue;
    }
    if (b.type === "ordered") {
      children.push(
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: inlinesToRuns(b.inlines),
        }),
      );
      continue;
    }
    if (b.type === "table") {
      const cols = b.headers.length || 1;
      const totalW = 9360;
      const colW = Math.floor(totalW / cols);
      const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };
      const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

      const makeCell = (segs: InlineSegment[], header: boolean) =>
        new TableCell({
          width: { size: colW, type: WidthType.DXA },
          borders: cellBorders,
          shading: header ? { fill: "EBF0F5", type: ShadingType.CLEAR, color: "auto" } : undefined,
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: segs.map(
                (s) =>
                  new TextRun({
                    text: s.text,
                    bold: header || s.bold,
                    italics: s.italic,
                  }),
              ),
            }),
          ],
        });

      const rows: TableRow[] = [];
      rows.push(new TableRow({ tableHeader: true, children: b.headers.map((h) => makeCell(h, true)) }));
      for (const r of b.rows) {
        rows.push(
          new TableRow({
            children: Array.from({ length: cols }).map((_, i) => makeCell(r[i] ?? [{ text: "" }], false)),
          }),
        );
      }
      children.push(
        new Table({
          width: { size: totalW, type: WidthType.DXA },
          columnWidths: Array.from({ length: cols }).map(() => colW),
          rows,
        }),
      );
      children.push(new Paragraph({ children: [new TextRun("")] }));
      continue;
    }
    children.push(new Paragraph({ children: inlinesToRuns(b.inlines), spacing: { after: 120 } }));
  }

  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Calibri", size: 22 } } },
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } },
            },
          ],
        },
        {
          reference: "numbers",
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
