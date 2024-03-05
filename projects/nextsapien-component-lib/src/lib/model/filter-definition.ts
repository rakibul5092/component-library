export interface FilterDefinition {
  PublicFieldName: string;
  Label: string;
  DisplayedToUser?: boolean;
  FilterCriterias: {
    Operator: {
      Label: string;
      Value: string;
    };
    FilterParameters: {
      Name?: string;
      Label: string;
      InitialValue: string;
      ControlType: string;
      ApiQueryUrl: string;
      Separator?: string;
      Values: {
        Key: string | number;
        Value: string;
      }[];
    }[];
  }[];
}
