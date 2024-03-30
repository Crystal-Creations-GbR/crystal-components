type Viewport = "mobile" | "tablet" | "desktop";
type Theme = "light" | "dark";
type Locale = "de" | "en";

type Modes = Record<
  string,
  { viewport: Viewport; theme: Theme; locale: Locale }
>;

const viewports: Viewport[] = ["tablet", "mobile", "desktop"];
const themes: Theme[] = ["light", "dark"];
const locales: Locale[] = ["de", "en"];

const defaultViewport: Viewport = "tablet";
const defaultTheme: Theme = "light";
const defaultLocale: Locale = "de";

/**
 * All modes with different viewports
 */
export const allModes: Modes = {};

/**
 * Modes for different themes and locales
 */
export const themeLocaleModes: Modes = {};

/**
 * Modes for different themes
 */
export const themeModes: Modes = {};

/**
 * Mode for default theme, viewport and locale
 */
export const defaultMode: Modes = {};

/**
 * Mode for different viewports
 */
export const viewportModes: Modes = {};

let i = 1;

for (const theme of themes) {
  for (const locale of locales) {
    for (const viewport of viewports) {
      const name = i++ + "-" + viewport + "-" + theme + "-" + locale;

      allModes[name] = {
        viewport,
        theme,
        locale,
      };

      if (viewport === defaultViewport)
        themeLocaleModes[name] = {
          viewport,
          theme,
          locale,
        };

      if (viewport === defaultViewport && locale === defaultLocale)
        themeModes[name] = {
          viewport,
          theme,
          locale,
        };

      if (
        viewport === defaultViewport &&
        theme === defaultTheme &&
        locale === defaultLocale
      )
        defaultMode[name] = {
          viewport,
          theme,
          locale,
        };

      if (theme === defaultTheme && locale === defaultLocale)
        viewportModes[name] = {
          viewport,
          theme,
          locale,
        };
    }
  }
}
