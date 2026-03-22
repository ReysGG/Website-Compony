# Design System Document

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Architectural Lens."** 

Moving away from the cluttered, line-heavy dashboards of the past, this system treats the admin interface as a curated editorial space. We replace rigid borders with **Tonal Depth** and **Asymmetric Breathing Room**. While the sidebar maintains its professional, dark authority, the content area functions as a gallery of data—clean, high-contrast, and layered. We break the "template" feel by using a dual-typeface strategy and expansive spacing, ensuring that PT Soka's internal tools feel as premium as their corporate identity.

## 2. Colors
Our palette is rooted in a deep, authoritative Blue, balanced by a sophisticated range of surface neutrals that provide functional depth without visual noise.

### Core Palette
*   **Primary (`#0037b0`):** The brand's signature. Used for high-impact interactions and key identity elements.
*   **Primary Container (`#1d4ed8`):** Use this for active states and prominent CTA backgrounds to provide a softer, more modern blue than the base primary.
*   **Surface Tiering:** 
    *   **Background (`#f7f9fb`):** The canvas.
    *   **Surface-Container-Low (`#f2f4f6`):** Secondary regions.
    *   **Surface-Container-Lowest (`#ffffff`):** Reserved for primary data cards to provide maximum "pop."

### Strategy
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Differentiation must be achieved through tonal shifts—e.g., placing a white (`surface-container-lowest`) card on a light grey (`surface-container-low`) background.
*   **The Glass & Gradient Rule:** Use subtle gradients (Primary to Primary-Container) for hero buttons. Floating panels or modals should utilize "Glassmorphism" using semi-transparent surface colors and a `24px` backdrop blur to maintain context.
*   **Signature Textures:** For specific status cards, use a very low-opacity (5%) radial gradient of the status color (Success/Error) in the top right corner to add "soul" to the data.

## 3. Typography
We utilize a sophisticated pairing of **Manrope** for structural hierarchy and **Inter** for data-heavy utility.

*   **Display & Headlines (Manrope):** Bold, geometric, and authoritative. Use `display-lg` for page titles to create an editorial impact.
*   **Titles & Body (Inter):** Highly legible and neutral. `body-md` is our workhorse for data tables and card descriptions.
*   **The Hierarchy Strategy:** Use aggressive scale differences. A `display-md` page title should feel significantly larger than the surrounding content to provide an immediate "Architectural" anchor for the user’s eye.

## 4. Elevation & Depth
Depth in this system is organic and ambient, mimicking natural light rather than digital "drop shadows."

*   **The Layering Principle:** Depth is achieved by stacking surface tokens. 
    *   *Level 0:* `surface` (Global background)
    *   *Level 1:* `surface-container-low` (Content grouping area)
    *   *Level 2:* `surface-container-lowest` (Individual Data Cards)
*   **Ambient Shadows:** For "floating" elements, use extra-diffused shadows. 
    *   **Value:** `0px 12px 32px rgba(25, 28, 30, 0.06)`. The shadow color must be a tinted version of `on-surface` rather than pure black.
*   **Ghost Borders:** If an edge must be defined (e.g., in high-density tables), use the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.

## 5. Components

### Sidebar & Navigation
*   **Persistent Sidebar:** Use a deep, dark aesthetic with `on-primary-fixed` text. Active states should use a subtle left-aligned accent bar in `primary` rather than a full-width background block to maintain "air."
*   **Breadcrumbs:** Use `label-md` in `on-surface-variant`. Separate with a simple `/` or a subtle chevron.

### Data Cards
*   **Styling:** No borders. Use `roundedness-lg` (1rem). 
*   **Content:** Forbid divider lines. Separate header and body text using vertical spacing scale `4` (1.4rem).
*   **Status Indicators:** Use `tertiary_container` for subtle "Success" backgrounds and `error_container` for "Error" backgrounds, paired with high-contrast `on-container` text.

### Buttons
*   **Primary:** `surface-tint` background with `on-primary` text. `roundedness-md`.
*   **Secondary:** `surface-container-highest` background. No border.
*   **Tertiary:** Transparent background with `primary` text. Use for low-emphasis actions.

### Input Fields
*   **State:** Use `surface-container-lowest` for the field background. 
*   **Focus:** A 2px `primary` shadow glow rather than a hard border change.
*   **Error State:** Use `error` text for helper labels and a `10% opacity error` background tint for the field.

## 6. Do's and Don'ts

### Do
*   **DO** use whitespace as a separator. If you think you need a line, try adding `spacing-4` instead.
*   **DO** use "Manrope" for all numbers in data cards to emphasize their importance.
*   **DO** ensure the sidebar contrast meets WCAG AAA standards given its dark nature.

### Don't
*   **DON'T** use pure black (#000000) for shadows or text. Use `on-surface` variants to keep the palette feeling "organic."
*   **DON'T** crowd the layout. If a dashboard view feels "full," move secondary data into a "surface-container" drawer or modal.
*   **DON'T** use 100% opaque borders to define card boundaries. Refer back to the "No-Line" Rule.