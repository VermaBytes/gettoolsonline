import type { ComponentType } from "react";
import { IndiaRegimeTool } from "./IndiaRegimeTool";
import { IndiaEpfTool } from "./IndiaEpfTool";
import { UaeGratuityTool } from "./UaeGratuityTool";
import { SingaporeCpfTool } from "./SingaporeCpfTool";
import { UsBonusTool } from "./UsBonusTool";
import { SalaryRaiseTool } from "./SalaryRaiseTool";
import { HourlySalaryTool } from "./HourlySalaryTool";
// <<NEW_TOOL_IMPORT>>

export const toolComponents: Record<string, ComponentType> = {
  "india-new-vs-old-tax-regime-calculator": IndiaRegimeTool,
  "india-epf-calculator": IndiaEpfTool,
  "uae-gratuity-calculator": UaeGratuityTool,
  "singapore-cpf-calculator": SingaporeCpfTool,
  "us-bonus-tax-calculator": UsBonusTool,
  "salary-raise-calculator": SalaryRaiseTool,
  "hourly-to-salary-calculator": HourlySalaryTool,
  // <<NEW_TOOL_MAP>>
};
