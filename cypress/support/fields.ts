const utils = {
  addButton: '[data-testid="add_button"]',
  formHeader: '[data-testid="form_header"]',
  formClose: '[data-testid="form_close"]',
  formSubmitButton: '[data-testid="form_submit"]',
  formDeleteButton: '[data-testid="form_delete"]',
  formCancleButton: '[data-testid="form_cancle"]',
}

export const nav = {
  settingsButton: '[data-testid="nav_settings"]',
  overviewButton: '[data-testid="CalendarTodayIcon"]',
}

export const settings = {
  settingsButton: nav.settingsButton,
  overviewButton: nav.overviewButton,
  header: '[data-testid="page_header"]',
  projects: '[data-testid="settings_projects"]',
  customers: '[data-testid="settings_customers"]',
  tasks: '[data-testid="settings_tasks"]',
  defaultProject: '[data-testid="settings_default_project"]',
  defaultProjectSelect: '[data-testid="settings_default_project_select" ]',
  breakInput: '[data-testid="settings_breakInput"]',
  break: '[data-testid="settings_break"]',
  breakRuleInput: '[data-testid="settings_break_ruleInput"]',
  breakRule: '[data-testid="settings_break_rule"]',
  rateInput: '[data-testid="settings_rateInput"]',
  rate: '[data-testid="settings_rate"]',
  darkmode: '[data-testid="settings_darkmode"]',
  darkmodeSwitch: '[data-testid="settings_darkmode_switch"]',
  darkmodeSwitchCheck: '[aria-label="settings_darkmode_switch_check"]',
  email: '[data-testid="settings_email"]',
  userEmail: '[data-testid="settings_userEmail"]',
  logout: '[data-testid="settings_logout"]',
  version: '[data-testid="settings_version"]',
}

export const customer = {
  settingsButton: nav.settingsButton,
  customersSettings: settings.customers,
  settingsHeader: settings.header,
  addCustomerButton: utils.addButton,
  formHeader: utils.formHeader,
  formClose: utils.formClose,
  formSubmitButton: utils.formSubmitButton,
  formDeleteButton: utils.formDeleteButton,
  formCancleButton: utils.formCancleButton,
  formName: '[data-testid="customer_name"]',
  formContact: '[data-testid="customer_contact"]',
  formEmail: '[data-testid="customer_email"]',
  formAdress: '[data-testid="customer_adress"]',
  formPhone: '[data-testid="customer_phone"]',
  formRate: '[data-testid="customer_rate"]',
  formNote: '[data-testid="customer_note"]',
}

export const login = {
  emailInput: '[data-testid="login_email"]',
  passwordInput: '[data-testid="login_password"]',
  loginButton: '[data-testid="login_button"]',
  logoutButton: settings.logout,
}