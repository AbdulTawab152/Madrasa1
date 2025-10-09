declare module 'html-truncate' {
  function truncate(html: string, maxLength: number, options?: {
    ellipsis?: string;
    keepImageTag?: boolean;
    keepWhitespace?: boolean;
    reserveLastWord?: boolean;
  }): string;
  
  export = truncate;
}
