export const nav = {
  settingsButton: '[data-testid="nav_settings"]',
  overviewButton: '[data-testid="CalendarTodayIcon"]',
}

export const settings = {
  settingsButton: nav.settingsButton,
  overviewButton: nav.overviewButton,
  projects: '[data-testid="settings_projects"]',
  customers: '[data-testid="settings_customers"]',
  tasks: '[data-testid="settings_tasks"]',
  defaultProject: '[data-testid="settings_default_project"]',
  breakInput: '[data-testid="settings_breakInput"]',
  break: '[data-testid="settings_break"]',
  breakRuleInput: '[data-testid="settings_break_ruleInput"]',
  breakRule: '[data-testid="settings_break_rule"]',
  rateInput: '[data-testid="settings_rateInput"]',
  rate: '[data-testid="settings_rate"]',
  darkmode: '[data-testid="settings_darkmode"]',
  email: '[data-testid="settings_email"]',
  logout: '[data-testid="settings_logout"]',
  version: '[data-testid="settings_version"]',
}

export const login = {
  emailInput: '[data-testid="login_email"]',
  passwordInput: '[data-testid="login_password"]',
  loginButton: '[data-testid="login_button"]',
  logoutButton: settings.logout,
}
