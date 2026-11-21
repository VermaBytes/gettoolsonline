export type CalculatorGuide = {
  lastUpdated: string;
  sourceNote: string;
  explanation: string[];
};

// Keep source verification status explicit until the existing figures have been checked.
export const calculatorGuides: Record<string, CalculatorGuide> = {
  "india-new-vs-old-tax-regime-calculator": {
    lastUpdated: "2026-11-21", sourceNote: "Official tax references and verification date have not yet been confirmed; figures are estimates based on the model described above.",
    explanation: [
      "This comparison estimates the tax and monthly in-hand amounts produced by the two regime calculations already implemented in the calculator. Start with annual gross salary or CTC, then enter eligible old-regime deductions in the second field. The result area presents both tax totals, both monthly in-hand figures and which modeled result is lower. Use the same income basis you intend to compare; changing the basis or deductions can change the result.",
      "The old-regime deduction field is a combined input, not a document review. The page note explains how this model treats an EPF assumption toward the 80C limit. Check whether each deduction applies to your circumstances before relying on the comparison. The calculator cannot validate employer documents, eligibility, tax residency, income from other sources or special provisions. It also cannot choose or submit a tax regime for you.",
      "Worked example: use the sample values already entered in the calculator, then compare the displayed regime totals. Change one input at a time to see how the modeled result responds. This is a way to explore a scenario, not a recommendation. Keep your own record of the assumptions and compare the final result against current official guidance or a qualified adviser before making a tax decision."
    ]
  },
  "india-epf-calculator": {
    lastUpdated: "2026-11-21", sourceNote: "Official EPFO references and verification date have not yet been confirmed; figures are estimates based on the model described above.",
    explanation: [
      "The projection begins with monthly basic pay plus dearness allowance, current EPF balance, current age and planned retirement age. It then applies the entered annual increment and interest assumptions over the modeled service period. The result separates projected corpus, modeled contributions and estimated interest so you can see how the assumptions affect the projection. The estimate is sensitive to each input and is not an account statement.",
      "This implementation uses the contribution logic in the calculator code, including its treatment of the employer share and the wage cap noted there. Actual contributions can depend on payroll structure, membership history, applicable rules and employer practice. The rate field is editable because declared rates can change. A flat assumed rate over a long projection is a simplifying scenario rather than a forecast of future declarations.",
      "Worked example: keep the displayed starting assumptions, note the projected total, then change the retirement age or increment and compare the new result. This illustrates the effect of the selected assumptions only. Confirm your balance and contributions from your EPFO records and payroll, and verify the current interest and contribution rules with official sources before using the estimate for a financial decision."
    ]
  },
  "uae-gratuity-calculator": {
    lastUpdated: "2026-11-21", sourceNote: "Applicable official UAE references and verification date have not yet been confirmed; figures are estimates based on the model described above.",
    explanation: [
      "The estimate uses the last monthly basic salary, completed years and months of service, and the misconduct selection. The calculator converts basic salary to a daily figure using its built-in method, derives modeled service days and applies its configured cap. The result panel shows the estimated amount and supporting service information. Use basic salary as requested by the form rather than adding allowances unless the official rule for your situation says otherwise.",
      "The output follows the assumptions and logic currently coded in this calculator. It cannot determine whether a specific employment relationship, contract type, reason for leaving, service interruption or legal exception changes the result. The misconduct selection is a simplified switch in the model, not a legal assessment. A displayed estimate should not be treated as an entitlement decision or employer settlement statement.",
      "Worked example: enter the basic salary and service period shown in the calculator’s sample, review the estimate, then adjust the months or salary to understand how those inputs affect the modeled result. Before relying on an amount, check your contract, payroll record and the current official UAE guidance that applies to your case, or ask a qualified employment adviser."
    ]
  },
  "singapore-cpf-calculator": {
    lastUpdated: "2026-11-21", sourceNote: "Official CPF Board references and verification date have not yet been confirmed; figures are estimates based on the model described above.",
    explanation: [
      "This calculator estimates CPF contributions from monthly salary and the selected age band. Its result separates the employee share, employer share and combined contribution. The model applies the wage ceiling and contribution assumptions coded for the displayed year; the values are not a CPF account balance or an official contribution notice. Review the selected age band and the pay period before interpreting the result.",
      "CPF treatment can depend on residency status, wage type, age, contribution ceilings and rules in force for the relevant period. This tool does not collect every payroll detail or confirm a person’s eligibility. A user’s actual payslip may include rounding or adjustments that are not represented in a basic estimate. The source note below is an editorial field that must be completed after checking the current official CPF Board material.",
      "Worked example: enter a monthly salary and age band, then compare the displayed employee and employer amounts with a payslip or the official CPF calculator. Change one assumption at a time to understand its modeled effect. For an actual payroll or benefits decision, verify current rates and wage limits with CPF Board and your employer rather than relying on this projection alone."
    ]
  },
  "us-bonus-tax-calculator": {
    lastUpdated: "2026-11-21", sourceNote: "Official IRS references and verification date have not yet been confirmed; figures are estimates based on the model described above.",
    explanation: [
      "The calculator compares two modeled federal bonus withholding/tax views using annual salary, bonus amount and filing status. The flat method applies the configured supplemental withholding logic, while the aggregate method compares the modeled tax with and without the bonus. The result also displays FICA and an estimated amount kept. These are distinct concepts: withholding during payroll is not necessarily the final tax owed on a return.",
      "The page excludes state and local taxes, as stated beside the result. It does not model every deduction, credit, other income source or payroll adjustment. The selected filing status and input salary are assumptions supplied by the user. A result can therefore differ from a payslip, employer withholding or final tax calculation, especially when circumstances are more complex than the fields available here.",
      "Worked example: enter the salary and bonus from a scenario, select the applicable filing status and compare the two displayed methods. Review the withholding and estimated tax separately instead of treating either as a final bill. Confirm current IRS guidance and payroll treatment before making decisions; this tool is a planning aid, not tax advice or a tax return calculation."
    ]
  },
  "salary-raise-calculator": {
    lastUpdated: "2026-11-21", sourceNote: "Official tax authority references and verification dates have not yet been confirmed; figures are estimates based on each calculator model.",
    explanation: [
      "This comparison selects a country, takes the current annual salary and applies the entered raise percentage to create a modeled new salary. The site’s existing country tax calculation then estimates net pay before and after the change. The result shows the difference in annual and monthly take-home pay, gross increase and the share of the modeled raise retained. It depends on the selected country’s calculator assumptions and the values entered.",
      "The comparison does not model every individual deduction, benefit, household circumstance or payroll treatment. It also assumes the country tax model is appropriate for the user. A nominal raise can affect tax in ways that a simplified estimate does not fully capture. Use the result to explore a scenario, and compare it with an employer’s written compensation offer and official country guidance.",
      "Worked example: use the displayed salary and raise values, note the net difference, then adjust the country or percentage and compare. If you change countries, the calculator resets the salary to that country’s configured example amount. That is a convenience for comparison, not a suggested salary. Verify the rates and assumptions for the applicable tax year before making a job or budget decision."
    ]
  },
  "hourly-to-salary-calculator": {
    lastUpdated: "2026-11-21", sourceNote: "No tax source applies: this is a gross-pay conversion. Verify contractual work hours and paid weeks with your employer.",
    explanation: [
      "Choose a conversion direction and enter the hourly rate or annual salary, along with hours per week and weeks per year. The hourly-to-salary calculation multiplies the hourly rate by the selected work hours and weeks. The reverse calculation divides annual pay by those modeled working hours. The result also presents monthly, weekly, daily and hourly views for comparison, all before tax and in the currency represented by your inputs.",
      "The conversion treats the entered schedule as consistent across the year. It does not account for overtime, unpaid leave, paid holidays, bonuses, commissions, shift premiums or differences between contracted hours and actual hours. The daily view uses the page’s stated five-day convention. If your work schedule varies, use an appropriate average or calculate separate periods rather than treating this as a payslip.",
      "Worked example: use the default hourly rate, hours and weeks to see the annualised result, then adjust paid weeks to reflect a different schedule. In salary-to-hourly mode, check that hours and weeks are greater than zero and that annual salary covers the same period. This is a gross-pay comparison only; use a country calculator separately if you need an estimate after tax."
    ]
  }
};
