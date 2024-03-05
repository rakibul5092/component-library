export const demoFilterDefinitions = [
  {
    PublicFieldName: 'ClientCompanyId',
    Label: 'Client Company',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoCompleteMulti',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'All Of',
          Value: 'AllOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoCompleteMulti',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'ClientCompanyName',
    Label: 'Client Company',
    DisplayedToUser: false,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Starts With',
          Value: 'StartsWith',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Contains',
          Value: 'Contains',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
    ],
  },
  {
    PublicFieldName: 'CompletionDate',
    Label: 'Completion Date',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'Today',
          Value: 'Today',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'Yesterday',
          Value: 'Yesterday',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'Tomorrow',
          Value: 'Tomorrow',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'This Week',
          Value: 'ThisWeek',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'This Month',
          Value: 'ThisMonth',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'This Quarter',
          Value: 'ThisQuarter',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'This Year',
          Value: 'ThisYear',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'Between',
          Value: 'Between',
        },
        FilterParameters: [
          {
            Label: 'Begin',
            InitialValue: '',
            ControlType: 'Date',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
          {
            Label: 'End',
            InitialValue: '',
            ControlType: 'Date',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
    ],
  },
  {
    PublicFieldName: 'Country',
    Label: 'Country Custom',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoComplete',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Starts With',
          Value: 'StartsWith',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoComplete',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Contains',
          Value: 'Contains',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoComplete',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
    ],
  },
  {
    PublicFieldName: 'DateCreated',
    Label: 'Date Created',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'Today',
          Value: 'Today',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'Yesterday',
          Value: 'Yesterday',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'Tomorrow',
          Value: 'Tomorrow',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'This Week',
          Value: 'ThisWeek',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'This Month',
          Value: 'ThisMonth',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'This Quarter',
          Value: 'ThisQuarter',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'This Year',
          Value: 'ThisYear',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'Between',
          Value: 'Between',
        },
        FilterParameters: [
          {
            Label: 'Begin',
            InitialValue: '',
            ControlType: 'Date',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
          {
            Label: 'End',
            InitialValue: '',
            ControlType: 'Date',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
    ],
  },
  {
    PublicFieldName: 'FirmOrgDivision',
    Label: 'Divisions Custom',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 7765,
                Value: 'Commercial',
              },
              {
                Key: 54979,
                Value: 'Education',
              },
              {
                Key: 43174,
                Value: 'Environmental',
              },
              {
                Key: 43166,
                Value: 'Geotechnical',
              },
              {
                Key: 54580,
                Value: 'Municipal',
              },
              {
                Key: 54581,
                Value: 'Residential',
              },
              {
                Key: 7764,
                Value: 'Transportation',
              },
              {
                Key: 776576,
                Value: 'Commercial 2',
              },
              {
                Key: 54975,
                Value: 'Education 2',
              },
              {
                Key: 431741,
                Value: 'Environmental 2',
              },
              {
                Key: 431661,
                Value: 'Geotechnical 2',
              },
              {
                Key: 545801,
                Value: 'Municipal 2',
              },
              {
                Key: 545811,
                Value: 'Residential 2',
              },
              {
                Key: 77641,
                Value: 'Transportation 2',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'All Of',
          Value: 'AllOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 7765,
                Value: 'Commercial',
              },
              {
                Key: 54979,
                Value: 'Education',
              },
              {
                Key: 43174,
                Value: 'Environmental',
              },
              {
                Key: 43166,
                Value: 'Geotechnical',
              },
              {
                Key: 54580,
                Value: 'Municipal',
              },
              {
                Key: 54581,
                Value: 'Residential',
              },
              {
                Key: 7764,
                Value: 'Transportation',
              },
              {
                Key: 776576,
                Value: 'Commercial 2',
              },
              {
                Key: 54975,
                Value: 'Education 2',
              },
              {
                Key: 431741,
                Value: 'Environmental 2',
              },
              {
                Key: 431661,
                Value: 'Geotechnical 2',
              },
              {
                Key: 545801,
                Value: 'Municipal 2',
              },
              {
                Key: 545811,
                Value: 'Residential 2',
              },
              {
                Key: 77641,
                Value: 'Transportation 2',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'FinancialStatus',
    Label: 'Financial Status Custom',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'SingleSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 710,
                Value: 'Profitable',
              },
              {
                Key: 716,
                Value: 'Not Profitable',
              },
              {
                Key: 717,
                Value: 'This was a terrible idea',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'SingleSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 710,
                Value: 'Profitable',
              },
              {
                Key: 716,
                Value: 'Not Profitable',
              },
              {
                Key: 717,
                Value: 'This was a terrible idea',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'FirmOrgOffice',
    Label: 'Offices Custom',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 49867,
                Value: 'Boston',
              },
              {
                Key: 6025,
                Value: 'Orlando (702)',
              },
              {
                Key: 49872,
                Value: 'Portland (403)',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'All Of',
          Value: 'AllOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 49867,
                Value: 'Boston',
              },
              {
                Key: 6025,
                Value: 'Orlando (702)',
              },
              {
                Key: 49872,
                Value: 'Portland (403)',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'OwnerCompanyId',
    Label: 'Owner Company',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoCompleteMulti',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'All Of',
          Value: 'AllOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoCompleteMulti',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'OwnerCompanyName',
    Label: 'Owner Company',
    DisplayedToUser: false,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Starts With',
          Value: 'StartsWith',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Contains',
          Value: 'Contains',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
    ],
  },
  {
    PublicFieldName: 'PercentComplete',
    Label: 'Percent Complete cust',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Percent',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Percent',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'FirmOrgPracticeArea',
    Label: 'Practice Areas Custom',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 2593,
                Value: 'Courthouse',
              },
              {
                Key: 2658,
                Value: 'Healthcare',
              },
              {
                Key: 2562,
                Value: 'High-Tech',
              },
              {
                Key: 2594,
                Value: 'Higher Ed',
              },
              {
                Key: 158184,
                Value: 'Hotel',
              },
              {
                Key: 128814,
                Value: 'Industrial',
              },
              {
                Key: 158185,
                Value: 'Mixed-use',
              },
              {
                Key: 129086,
                Value: 'Multi Family',
              },
              {
                Key: 2561,
                Value: 'Office Building',
              },
              {
                Key: 2563,
                Value: 'Retail',
              },
              {
                Key: 129085,
                Value: 'Senior Living',
              },
              {
                Key: 2564,
                Value: 'Sports',
              },
              {
                Key: 128816,
                Value: 'Transportation',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'All Of',
          Value: 'AllOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 2593,
                Value: 'Courthouse',
              },
              {
                Key: 2658,
                Value: 'Healthcare',
              },
              {
                Key: 2562,
                Value: 'High-Tech',
              },
              {
                Key: 2594,
                Value: 'Higher Ed',
              },
              {
                Key: 158184,
                Value: 'Hotel',
              },
              {
                Key: 128814,
                Value: 'Industrial',
              },
              {
                Key: 158185,
                Value: 'Mixed-use',
              },
              {
                Key: 129086,
                Value: 'Multi Family',
              },
              {
                Key: 2561,
                Value: 'Office Building',
              },
              {
                Key: 2563,
                Value: 'Retail',
              },
              {
                Key: 129085,
                Value: 'Senior Living',
              },
              {
                Key: 2564,
                Value: 'Sports',
              },
              {
                Key: 128816,
                Value: 'Transportation',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'ProjectNumber',
    Label: 'Proj num cust',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Starts With',
          Value: 'StartsWith',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Contains',
          Value: 'Contains',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
    ],
  },
  {
    PublicFieldName: 'City',
    Label: 'Project city',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Starts With',
          Value: 'StartsWith',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Contains',
          Value: 'Contains',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
    ],
  },
  {
    PublicFieldName: 'ProjectId',
    Label: 'Project Id',
    DisplayedToUser: false,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Number',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Number',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'ProjectName',
    Label: 'Project Name',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Starts With',
          Value: 'StartsWith',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Contains',
          Value: 'Contains',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
    ],
  },
  {
    PublicFieldName: 'ProjectStatus',
    Label: 'Project Status Custom',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'SingleSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 1,
                Value: 'Completed',
              },
              {
                Key: 5,
                Value: 'Dead',
              },
              {
                Key: 2,
                Value: 'In Progress',
              },
              {
                Key: 2554,
                Value: 'MG',
              },
              {
                Key: 3,
                Value: 'Not Started',
              },
              {
                Key: 4,
                Value: 'On Hold',
              },
              {
                Key: 2378,
                Value: 'On-Going',
              },
              {
                Key: 7,
                Value: 'Pending Accounting',
              },
              {
                Key: 6,
                Value: 'Pending Project Manager',
              },
              {
                Key: 8,
                Value: 'Project Closed',
              },
              {
                Key: 2555,
                Value: 'SW New Project Status',
              },
              {
                Key: 2556,
                Value: 'test1',
              },
              {
                Key: 2557,
                Value: 'test2',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'SingleSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 1,
                Value: 'Completed',
              },
              {
                Key: 5,
                Value: 'Dead',
              },
              {
                Key: 2,
                Value: 'In Progress',
              },
              {
                Key: 2554,
                Value: 'MG',
              },
              {
                Key: 3,
                Value: 'Not Started',
              },
              {
                Key: 4,
                Value: 'On Hold',
              },
              {
                Key: 2378,
                Value: 'On-Going',
              },
              {
                Key: 7,
                Value: 'Pending Accounting',
              },
              {
                Key: 6,
                Value: 'Pending Project Manager',
              },
              {
                Key: 8,
                Value: 'Project Closed',
              },
              {
                Key: 2555,
                Value: 'SW New Project Status',
              },
              {
                Key: 2556,
                Value: 'test1',
              },
              {
                Key: 2557,
                Value: 'test2',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'PublishedProjectName',
    Label: 'Published Project Name',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Starts With',
          Value: 'StartsWith',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Contains',
          Value: 'Contains',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Text',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
    ],
  },
  {
    PublicFieldName: 'PrimaryCategory',
    Label: 'Renamed Primary Category',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 66,
                Value: 'Academic Facilities',
              },
              {
                Key: 2,
                Value: 'Airport',
              },
              {
                Key: 3,
                Value: 'Aquarium',
              },
              {
                Key: 5,
                Value: 'Architecture School',
              },
              {
                Key: 7,
                Value: 'Broadcast Media Center',
              },
              {
                Key: 8,
                Value: 'Brownfields Redevelopment',
              },
              {
                Key: 9,
                Value: 'Business School',
              },
              {
                Key: 12,
                Value: 'Community Center',
              },
              {
                Key: 13,
                Value: 'Computer Center',
              },
              {
                Key: 11,
                Value: 'Conference Center',
              },
              {
                Key: 14,
                Value: 'Convention Center',
              },
              {
                Key: 15,
                Value: 'Correctional Facility',
              },
              {
                Key: 16,
                Value: 'Courthouse',
              },
              {
                Key: 18,
                Value: 'Dormitory',
              },
              {
                Key: 9104,
                Value: 'Education',
              },
              {
                Key: 19,
                Value: 'Elementary School',
              },
              {
                Key: 69,
                Value: 'Government',
              },
              {
                Key: 22,
                Value: 'Headquarters',
              },
              {
                Key: 23,
                Value: 'High School',
              },
              {
                Key: 24,
                Value: 'Hospital',
              },
              {
                Key: 25,
                Value: 'Hotel',
              },
              {
                Key: 26,
                Value: 'Industrial',
              },
              {
                Key: 27,
                Value: 'Intermodal Facility',
              },
              {
                Key: 28,
                Value: 'Laboratory',
              },
              {
                Key: 29,
                Value: 'Library',
              },
              {
                Key: 30,
                Value: 'Manufacturing Facility',
              },
              {
                Key: 31,
                Value: 'Medical Center',
              },
              {
                Key: 32,
                Value: 'Middle School',
              },
              {
                Key: 108303,
                Value: "Mike's Awesome Category",
              },
              {
                Key: 33,
                Value: 'Mission-Critical Facility',
              },
              {
                Key: 35,
                Value: 'Mixed-Use Facility',
              },
              {
                Key: 36,
                Value: 'Motel',
              },
              {
                Key: 37,
                Value: 'Multi-Family Housing',
              },
              {
                Key: 38,
                Value: 'Museum',
              },
              {
                Key: 39,
                Value: 'Natatorium',
              },
              {
                Key: 40,
                Value: 'Office Building',
              },
              {
                Key: 41,
                Value: 'Office Interiors',
              },
              {
                Key: 42,
                Value: 'Park',
              },
              {
                Key: 44,
                Value: 'Pediatric Hospital',
              },
              {
                Key: 45,
                Value: 'Performing Arts',
              },
              {
                Key: 80,
                Value: 'Post Office',
              },
              {
                Key: 46,
                Value: 'Private School',
              },
              {
                Key: 47,
                Value: 'Rail Station',
              },
              {
                Key: 48,
                Value: 'Recreational Facility',
              },
              {
                Key: 34,
                Value: 'Religious Facility',
              },
              {
                Key: 85,
                Value: 'Reroof',
              },
              {
                Key: 49,
                Value: 'Research Facility',
              },
              {
                Key: 52,
                Value: 'Restaurant',
              },
              {
                Key: 64,
                Value: 'Retail',
              },
              {
                Key: 54,
                Value: 'Shopping Center',
              },
              {
                Key: 55,
                Value: 'Single-Family Housing',
              },
              {
                Key: 65,
                Value: 'Specialty',
              },
              {
                Key: 56,
                Value: 'Stadium',
              },
              {
                Key: 57,
                Value: 'Store',
              },
              {
                Key: 58,
                Value: 'Student Center',
              },
              {
                Key: 59,
                Value: 'Theater',
              },
              {
                Key: 56275,
                Value: 'Topeka',
              },
              {
                Key: 121193,
                Value: 'Travis T Category',
              },
              {
                Key: 62,
                Value: 'Vehicle Maintenance Facility , Garage',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'All Of',
          Value: 'AllOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 66,
                Value: 'Academic Facilities',
              },
              {
                Key: 2,
                Value: 'Airport',
              },
              {
                Key: 3,
                Value: 'Aquarium',
              },
              {
                Key: 5,
                Value: 'Architecture School',
              },
              {
                Key: 7,
                Value: 'Broadcast Media Center',
              },
              {
                Key: 8,
                Value: 'Brownfields Redevelopment',
              },
              {
                Key: 9,
                Value: 'Business School',
              },
              {
                Key: 12,
                Value: 'Community Center',
              },
              {
                Key: 13,
                Value: 'Computer Center',
              },
              {
                Key: 11,
                Value: 'Conference Center',
              },
              {
                Key: 14,
                Value: 'Convention Center',
              },
              {
                Key: 15,
                Value: 'Correctional Facility',
              },
              {
                Key: 16,
                Value: 'Courthouse',
              },
              {
                Key: 18,
                Value: 'Dormitory',
              },
              {
                Key: 9104,
                Value: 'Education',
              },
              {
                Key: 19,
                Value: 'Elementary School',
              },
              {
                Key: 69,
                Value: 'Government',
              },
              {
                Key: 22,
                Value: 'Headquarters',
              },
              {
                Key: 23,
                Value: 'High School',
              },
              {
                Key: 24,
                Value: 'Hospital',
              },
              {
                Key: 25,
                Value: 'Hotel',
              },
              {
                Key: 26,
                Value: 'Industrial',
              },
              {
                Key: 27,
                Value: 'Intermodal Facility',
              },
              {
                Key: 28,
                Value: 'Laboratory',
              },
              {
                Key: 29,
                Value: 'Library',
              },
              {
                Key: 30,
                Value: 'Manufacturing Facility',
              },
              {
                Key: 31,
                Value: 'Medical Center',
              },
              {
                Key: 32,
                Value: 'Middle School',
              },
              {
                Key: 108303,
                Value: "Mike's Awesome Category",
              },
              {
                Key: 33,
                Value: 'Mission-Critical Facility',
              },
              {
                Key: 35,
                Value: 'Mixed-Use Facility',
              },
              {
                Key: 36,
                Value: 'Motel',
              },
              {
                Key: 37,
                Value: 'Multi-Family Housing',
              },
              {
                Key: 38,
                Value: 'Museum',
              },
              {
                Key: 39,
                Value: 'Natatorium',
              },
              {
                Key: 40,
                Value: 'Office Building',
              },
              {
                Key: 41,
                Value: 'Office Interiors',
              },
              {
                Key: 42,
                Value: 'Park',
              },
              {
                Key: 44,
                Value: 'Pediatric Hospital',
              },
              {
                Key: 45,
                Value: 'Performing Arts',
              },
              {
                Key: 80,
                Value: 'Post Office',
              },
              {
                Key: 46,
                Value: 'Private School',
              },
              {
                Key: 47,
                Value: 'Rail Station',
              },
              {
                Key: 48,
                Value: 'Recreational Facility',
              },
              {
                Key: 34,
                Value: 'Religious Facility',
              },
              {
                Key: 85,
                Value: 'Reroof',
              },
              {
                Key: 49,
                Value: 'Research Facility',
              },
              {
                Key: 52,
                Value: 'Restaurant',
              },
              {
                Key: 64,
                Value: 'Retail',
              },
              {
                Key: 54,
                Value: 'Shopping Center',
              },
              {
                Key: 55,
                Value: 'Single-Family Housing',
              },
              {
                Key: 65,
                Value: 'Specialty',
              },
              {
                Key: 56,
                Value: 'Stadium',
              },
              {
                Key: 57,
                Value: 'Store',
              },
              {
                Key: 58,
                Value: 'Student Center',
              },
              {
                Key: 59,
                Value: 'Theater',
              },
              {
                Key: 56275,
                Value: 'Topeka',
              },
              {
                Key: 121193,
                Value: 'Travis T Category',
              },
              {
                Key: 62,
                Value: 'Vehicle Maintenance Facility , Garage',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'StaffRole',
    Label: 'Staff Role',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoCompleteMulti',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'All Of',
          Value: 'AllOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoCompleteMulti',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'StaffTeam',
    Label: 'Staff Team',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoCompleteMulti',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'All Of',
          Value: 'AllOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoCompleteMulti',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'StateProvince',
    Label: 'State/Prov',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Equals',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoComplete',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Starts With',
          Value: 'StartsWith',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoComplete',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Contains',
          Value: 'Contains',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'AutoComplete',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
    ],
  },
  {
    PublicFieldName: 'FirmOrgStudio',
    Label: 'Studios Custom',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 68623,
                Value: 'Studio 1',
              },
              {
                Key: 70477,
                Value: 'Studio 2',
              },
              {
                Key: 70478,
                Value: 'Studio 3',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'All Of',
          Value: 'AllOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 68623,
                Value: 'Studio 1',
              },
              {
                Key: 70477,
                Value: 'Studio 2',
              },
              {
                Key: 70478,
                Value: 'Studio 3',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'FirmOrgTerritory',
    Label: 'Territories Custom',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Any Of',
          Value: 'AnyOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 56640,
                Value: 'Mid-West',
              },
              {
                Key: 56641,
                Value: 'Northeast',
              },
              {
                Key: 56643,
                Value: 'Southeast',
              },
              {
                Key: 56642,
                Value: 'Southwest',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'All Of',
          Value: 'AllOf',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'MultiSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: 56640,
                Value: 'Mid-West',
              },
              {
                Key: 56641,
                Value: 'Northeast',
              },
              {
                Key: 56643,
                Value: 'Southeast',
              },
              {
                Key: 56642,
                Value: 'Southwest',
              },
            ],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
    ],
  },
  {
    PublicFieldName: 'TotalProjectFinalCost',
    Label: 'Total Project Costs: Final Cost',
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Is',
          Value: 'Equals',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Currency',
            ApiQueryUrl: '',
            Separator: 'Unknown',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Less Than',
          Value: 'LessThan',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Currency',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Less Than Or Equal To',
          Value: 'LessThanOrEqualTo',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Currency',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Greater Than',
          Value: 'GreaterThan',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Currency',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Greater Than Or Equal To',
          Value: 'GreaterThanOrEqualTo',
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'Currency',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [],
          },
        ],
      },
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: 'Between',
          Value: 'Between',
        },
        FilterParameters: [
          {
            Label: 'Begin',
            InitialValue: '',
            ControlType: 'Currency',
            ApiQueryUrl: '',
            Separator: 'Unknown',
            Values: [],
          },
          {
            Label: 'End',
            InitialValue: '',
            ControlType: 'Currency',
            ApiQueryUrl: '',
            Separator: 'Unknown',
            Values: [],
          },
        ],
      },
    ],
  },
];
