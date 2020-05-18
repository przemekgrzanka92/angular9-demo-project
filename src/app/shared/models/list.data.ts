export interface ListConfigAction {
  actionName: string;
  label: string;
}

export interface ListConfigField {
  fieldName: string;
  label: string;
  type?: string;
}

export interface ListConfig {
  fieldNames: ListConfigField[];
  actions?: ListConfigAction[];
}
