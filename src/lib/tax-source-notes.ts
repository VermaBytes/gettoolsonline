import type { CountryCode } from "@/lib/countries";

/** Source attribution still needs editorial verification before the figures are treated as current guidance. */
export const taxSourceNotes: Record<CountryCode, { officialSource: string; dataChecked: string }> = {
  in: { officialSource: "Official tax and EPFO references have not yet been independently verified.", dataChecked: "Not independently verified." },
  us: { officialSource: "Official IRS and Social Security references have not yet been independently verified.", dataChecked: "Not independently verified." },
  uk: { officialSource: "Official GOV.UK tax and National Insurance references have not yet been independently verified.", dataChecked: "Not independently verified." },
  ca: { officialSource: "Official CRA and provincial references have not yet been independently verified.", dataChecked: "Not independently verified." },
  au: { officialSource: "Official ATO references have not yet been independently verified.", dataChecked: "Not independently verified." },
  sg: { officialSource: "Official IRAS and CPF Board references have not yet been independently verified.", dataChecked: "Not independently verified." },
  ae: { officialSource: "Applicable official UAE references have not yet been independently verified.", dataChecked: "Not independently verified." },
  ie: { officialSource: "Official Revenue and PRSI references have not yet been independently verified.", dataChecked: "Not independently verified." }
};
