# Design — Project Identity

> This document is project-long-lived. Tokens are not changed without
> the Architect's approval. Developers MUST use these tokens
> instead of improvising their own colors/spacings.

## Style Direction

A calm, light single-page card layout with a single teal accent — quiet like a Stripe payment form, where the three inputs and the live result block are the only things that draw the eye.

## Colors

- `--color-bg`: **#F6F7F9**
- `--color-surface`: **#FFFFFF**
- `--color-fg`: **#111827**
- `--color-fg-subtle`: **#4B5563**
- `--color-muted`: **#6B7280**
- `--color-border`: **#E5E7EB**
- `--color-border-strong`: **#D1D5DB**
- `--color-accent`: **#0F766E**
- `--color-accent-hover`: **#0D5F58**
- `--color-accent-active`: **#0A4A44**
- `--color-accent-ring`: **rgba(15,118,110,0.35)**
- `--color-accent-soft`: **#ECFDF5**
- `--color-danger`: **#DC2626**
- `--color-danger-soft`: **#FEF2F2**
- `--color-success`: **#15803D**
- `--color-field-bg`: **#FFFFFF**
- `--color-field-bg-disabled`: **#F3F4F6**

## Typography

- `font_family`: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- `font_numeric`: 'Inter', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace
- `heading_weight`: 600
- `body_weight`: 400
- `label_weight`: 500
- `size_scale`: 12px (label-small/caption), 14px (label), 16px (body/input), 18px (section title), 24px (page title), 32px (total amount), 40px (hero amount)
- `line_height`: 1.5 body, 1.25 headings
- `letter_spacing_numeric`: -0.01em
- `numeric_rule`: All € amounts use font-variant-numeric: tabular-nums, so digits stay aligned while typing

## Spacing Scale

- `--space-0`: 4px
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 24px
- `--space-5`: 32px
- `--space-6`: 48px

## Border-Radii

- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 16px
- `--radius-pill`: 999px

## Components

### Button (primary — 'Berechnen', if used)

Note: the spec is live-calculating, so a submit button is optional. If present, it is a real button. Padding 12px 24px; radius md (8px); bg=accent #0F766E; text=#FFFFFF, weight 500, 16px; hover bg=accent-hover #0D5F58; active bg=accent-active #0A4A44 and translateY(1px); focus-visible outline 2px accent-ring offset 2px; disabled bg=field-bg-disabled #F3F4F6, text=muted #6B7280, cursor not-allowed, opacity 1 (visibly disabled, never just inert — AC-08); min-height 44px, full width on mobile. Label changes to 'Zurücksetzen' semantics only if wired; never render a button without a handler.

### Button (secondary / ghost)

Only if a reset control is added, and then it must actually clear all three fields. Padding 12px 20px; radius md; bg=transparent; border 1px solid border-strong #D1D5DB; text=fg #111827, weight 500; hover bg=#F3F4F6; active bg=#E5E7EB; disabled text=muted, border=border, cursor not-allowed; min-height 44px. If not implemented, it must not appear on the page.

### NumberField (Betrag / Trinkgeld-Prozent / Personenzahl)

Three instances, stacked in a single column, vertical gap 16px. Structure: <label> above input (14px, weight 500, color fg-subtle, margin-bottom 8px) with a required marker omitted; input height 44px (touch target), padding 0 12px, radius md, border 1px solid border-strong, bg=field-bg, text 16px tabular-nums, placeholder muted. Focus: border-color accent + box-shadow 0 0 0 3px accent-ring. Inputmode numeric/decimal; suffix unit shown inside the field as a right-aligned 14px muted hint ('€' for Betrag, '%' for Trinkgeld, 'Pers.' for Personenzahl) with 12px right padding to clear the value. Error state: border-color danger, bg danger-soft, focus ring rgba(220,38,38,0.3). Disabled state: bg field-bg-disabled, text muted, cursor not-allowed. Associated helper text below at 12px in muted; on error the helper text is replaced by the error message, and aria-invalid + aria-describedby are set.

### ErrorMessage

Shown inline directly under the offending field (and/or once above the result block). bg danger-soft #FEF2F2, border 1px solid rgba(220,38,38,0.3), radius sm, padding 8px 12px, text 14px color danger #DC2626, weight 500, preceded by a 16px warning glyph in danger. role='alert'. When any field is invalid, the entire ResultPanel is removed from the DOM (no result shown — AC-04), and the error replaces it.

### ResultPanel (Trinkgeld / Gesamtbetrag / Betrag pro Person)

A single surface card below the inputs, separated by 24px. Header row 'Ergebnis' 18px weight 600, color fg, with a 1px bottom border (border). Three rows, each with label (14px muted) left and value (16px, tabular-nums, weight 500, fg) right, aligned baseline, row padding 12px 0, 1px dashed divider between rows. 'Gesamtbetrag' is emphasised: value 32px weight 600 accent, label 14px weight 500 fg-subtle. Values update on every keystroke; use aria-live='polite' on the panel so screen readers announce changes. Amounts always formatted as '€ 12,34' (de-DE, two decimals, thousands separator).

### Card / Page container

Single centered card: bg surface #FFFFFF, radius lg 16px, border 1px solid border, shadow 0 1px 2px rgba(16,24,40,0.04) and 0 8px 24px rgba(16,24,40,0.06), padding 32px (24px below 640px). Page title 'Trinkgeld-Rechner' 24px weight 600 at the top, subtitle 14px muted 'Betrag eingeben – Ergebnis erscheint sofort.' with 8px gap under the title, then 24px before the fields. Nothing else on the page.

### QuantityStepper (optional)

Only if built for Personenzahl: two 44x44px icon buttons (−/+) flanking the numeric input, radius md, border 1px border-strong, bg surface, hover #F3F4F6, active #E5E7EB, disabled at min=1 (muted, cursor not-allowed) and at a sane upper bound. Any state that cannot act is visually disabled. If not implemented, do not ship the controls.

## Layout Principles

- One screen, one column, one job: page contains exactly the title, the three fields and the result block — no nav, no footer, no extra cards.
- Content max-width 440px (result-heavy) to 480px, horizontally centered with the viewport safe-area inset; vertical padding 48px top / 32px bottom on desktop, 24px on mobile.
- Section rhythm from the spacing scale only: 8px label→input, 16px between fields, 24px between field group and result panel, 32px card padding.
- Single breakpoint at 640px: below it card padding drops to 24px, title to 20px, the dominant amount to 28px, buttons go full width with min-height 44px; above it the layout is fixed and centered.
- All interactive controls are ≥44px tall (touch target) and have a visible focus ring (2px accent-ring, offset 2px) for keyboard use.
- Every € value is right-aligned and tabular-nums so digits don't shift while typing; show two decimals always (kaufmännisch gerundet).
- Error and result are mutually exclusive states in the same slot: invalid input removes the result panel and shows the message — never both at once.
- No dark mode, no theming, no extra decoration: one accent color, two grays, one danger color. Contrast ≥4.5:1 for all text (fg #111827 on #FFFFFF, accent #0F766E on #FFFFFF).
