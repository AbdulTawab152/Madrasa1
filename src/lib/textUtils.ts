/**
 * Utility functions for cleaning and formatting text content
 */

/**
 * Cleans HTML entities and tags from text content
 * Removes &nbsp;, HTML tags, and normalizes whitespace
 */
export const cleanText = (text: string | undefined | null): string => {
  if (!text) return "";
  
  return text
    // Remove HTML tags (including dir attributes)
    .replace(/<[^>]*>/g, '')
    // Replace HTML entities
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with regular space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .replace(/&apos;/g, "'") // Replace &apos; with '
    .replace(/&rsquo;/g, "'") // Replace &rsquo; with '
    .replace(/&lsquo;/g, "'") // Replace &lsquo; with '
    .replace(/&mdash;/g, '—') // Replace &mdash; with —
    .replace(/&ndash;/g, '–') // Replace &ndash; with –
    .replace(/&hellip;/g, '…') // Replace &hellip; with …
    // Normalize whitespace
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, '\n') // Replace multiple newlines with single newline
    .trim(); // Remove leading/trailing whitespace
};

/**
 * Cleans text and limits it to a specific length
 */
export const cleanTextWithLimit = (text: string | undefined | null, limit: number = 100): string => {
  const cleaned = cleanText(text);
  if (cleaned.length <= limit) return cleaned;
  return cleaned.substring(0, limit).trim() + '...';
};

/**
 * Cleans text and preserves line breaks for display
 */
export const cleanTextWithLineBreaks = (text: string | undefined | null): string => {
  if (!text) return "";
  
  return text
    // Remove HTML tags but preserve line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<p[^>]*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<div[^>]*>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    // Replace HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    // Normalize whitespace but preserve line breaks
    .replace(/[ \t]+/g, ' ') // Replace multiple spaces/tabs with single space
    .replace(/\n\s*\n/g, '\n') // Replace multiple newlines with single newline
    .trim();
};
