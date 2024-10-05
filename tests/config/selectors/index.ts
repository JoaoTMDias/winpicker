export const SELECTORS = {
  header: {
    logo: "header-logo",
    ratio: "header-ratio",
    rating: "header-rating",
    "rating-stars": {
      1: "1 of 5 stars",
      2: "2 of 5 stars",
      3: "3 of 5 stars",
      4: "4 of 5 stars",
      5: "5 of 5 stars",
    },
    "grade-results": "header-grade-results-title",
    "grade-list": "header-grade-results-list",
    "grade-items": {
      aa: {
        wrapper: "header-grade-results-item-aa",
        description: "header-grade-results-item-aa-description",
        icon: "header-grade-results-item-aa-icon",
        label: "header-grade-results-item-aa-label",
      },
      "aa-plus": {
        wrapper: "header-grade-results-item-aa+",
        description: "header-grade-results-item-aa+-description",
        icon: "header-grade-results-item-aa+-icon",
        label: "header-grade-results-item-aa+-label",
      },
      aaa: {
        wrapper: "header-grade-results-item-aaa",
        description: "header-grade-results-item-aaa-description",
        icon: "header-grade-results-item-aaa-icon",
        label: "header-grade-results-item-aaa-label",
      },
      "aaa-plus": {
        wrapper: "header-grade-results-item-aaa+",
        description: "header-grade-results-item-aaa+-description",
        icon: "header-grade-results-item-aaa+-icon",
        label: "header-grade-results-item-aaa+-label",
      },
    },
  },
  "color-inputs": {
    fieldset: "color-inputs-fieldset",
    foreground: {
      label: "color-inputs-foreground-label",
      picker: "color-inputs-foreground-label-toggle",
    },
    toggle: "color-inputs-swap-button",
    background: {
      label: "color-inputs-background-label",
      picker: "color-inputs-background-label-toggle",
    },
    callout: {
      dialog: "colour-picker-dialog",
      title: "colour-picker-dialog-title",
      description: "colour-picker-dialog-description",
      picker: "colour-picker-dialog-picker",
      reset: "colour-picker-dialog-reset",
      save: "colour-picker-dialog-save",
    },
  },
  footer: {
    wrapper: "footer-wrapper",
    link: {
      wrapper: "footer-link",
      icon: "footer-link-icon",
      text: "footer-link-text",
    },
  },
} as const;
