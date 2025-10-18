// Type declarations for JSON imports
declare module '*.json' {
  const value: any;
  export default value;
}

// Specific declaration for common.json files
declare module '@/locales/en/common.json' {
  const value: any;
  export default value;
}

declare module '@/locales/ps/common.json' {
  const value: any;
  export default value;
}

declare module '@/locales/prs/common.json' {
  const value: any;
  export default value;
}
