import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDataRequest, FilterDefinition, GridFilterService, GridFiltersModalComponent, ManageFiltersModalComponent } from 'nextsapien-component-lib';

@Component({
  selector: 'app-grid-filters-demo',
  templateUrl: './grid-filters-demo.component.html',
  styleUrls: ['./grid-filters-demo.component.scss'],
})
export class GridFiltersDemoComponent implements OnInit {
  public readonly userFilter: FilterDataRequest = {
    Name: 'Custom Filter',
    ProjectGridFilterId: 0,
    UserFilters: [
      {
        PublicFieldName: 'Status',
        OperatorType: 'IsEmpty',
        Values: [],
      },
      {
        PublicFieldName: 'FinancialStatus',
        OperatorType: 'Is',
        Values: [1],
      },
      {
        PublicFieldName: 'PrimaryCategories',
        OperatorType: 'OneOf',
        Values: [2, 3, 5],
      },
    ],
  };

  public readonly filterDefinitions: FilterDefinition[] = [
    {
      PublicFieldName: 'Status',
      Label: 'Status',
      FilterCriterias: [
        {
          Operator: {
            Label: 'is',
            Value: 'Is',
          },
          FilterParameters: [
            {
              Name: 'Status',
              Label: 'Status',
              InitialValue: '',
              ControlType: 'SingleSelect',
              ApiQueryUrl: null,
              Values: [
                {
                  Key: 1,
                  Value: 'Yes',
                },
                {
                  Key: 2,
                  Value: 'No',
                },
              ],
            },
          ],
        },
        {
          Operator: {
            Label: 'is empty',
            Value: 'IsEmpty',
          },
          FilterParameters: [
            {
              Name: 'Status',
              Label: 'Status',
              InitialValue: '',
              ControlType: 'SingleSelect',
              ApiQueryUrl: null,
              Values: [],
            },
          ],
        },
      ],
    },
    {
      PublicFieldName: 'FinancialStatus',
      Label: 'Financial Status',
      FilterCriterias: [
        {
          Operator: {
            Label: 'is',
            Value: 'Is',
          },
          FilterParameters: [
            {
              Name: 'Financial Status',
              Label: 'Financial Status',
              InitialValue: '',
              ControlType: 'SingleSelect',
              ApiQueryUrl: null,
              Values: [
                {
                  Key: 1,
                  Value: 'Yes',
                },
                {
                  Key: 2,
                  Value: 'No',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      PublicFieldName: 'PrimaryCategories',
      Label: 'Primary Categories',
      FilterCriterias: [
        {
          Operator: {
            Label: 'One Of',
            Value: 'OneOf',
          },
          FilterParameters: [
            {
              Name: 'PrimaryCategory',
              Label: 'Primary Category',
              InitialValue: '',
              ControlType: 'MultiSelect',
              Separator: 'Or',
              ApiQueryUrl: null,
              Values: [
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
              Name: 'PrimaryCategory',
              Label: 'Primary Category',
              InitialValue: '',
              ControlType: 'MultiSelect',
              Separator: 'And',
              ApiQueryUrl: null,
              Values: [
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
              ],
            },
          ],
        },
      ],
    },
    {
      PublicFieldName: 'CreatedDate',
      Label: 'Created Date',
      FilterCriterias: [
        {
          Operator: {
            Label: 'is today',
            Value: 'Today',
          },
          FilterParameters: [],
        },
        {
          Operator: {
            Label: 'is yesterday',
            Value: 'Yesterday',
          },
          FilterParameters: [],
        },
        {
          Operator: {
            Label: 'is between',
            Value: 'Between',
          },
          FilterParameters: [
            {
              Name: 'CreatedDate',
              Label: 'Created Date Range',
              InitialValue: '',
              ControlType: 'DateFilter',
              ApiQueryUrl: null,
              Values: [],
            },
          ],
        },
        {
          Operator: {
            Label: 'is',
            Value: 'Is',
          },
          FilterParameters: [
            {
              Name: 'CreatedDate',
              Label: 'Created Date Range',
              InitialValue: '',
              ControlType: 'DateFilter',
              ApiQueryUrl: null,
              Values: [],
            },
          ],
        },
      ],
    },
  ];

  private readonly userFiltersList: FilterDataRequest[] = [
    {
      Name: 'Custom Filter',
      ProjectGridFilterId: 0,
      UserFilters: [
        {
          PublicFieldName: 'Status',
          OperatorType: 'IsEmpty',
          Values: [],
        },
        {
          PublicFieldName: 'FinancialStatus',
          OperatorType: 'Is',
          Values: [1],
        },
        {
          PublicFieldName: 'PrimaryCategories',
          OperatorType: 'OneOf',
          Values: [2, 3, 5],
        },
      ],
    },
    {
      Name: 'Custom Filter 2',
      ProjectGridFilterId: 1,
      UserFilters: [
        {
          PublicFieldName: 'FinancialStatus',
          OperatorType: 'Is',
          Values: [1],
        },
      ],
    },
    {
      Name: 'Custom Filter 3',
      ProjectGridFilterId: 2,
      UserFilters: [
        {
          PublicFieldName: 'FinancialStatus',
          OperatorType: 'Is',
          Values: [2],
        },
      ],
    },
  ];

  public readonly dateFormat = 'MM/DD/YYYYY';

  constructor(private dialog: MatDialog, private gridFilterService: GridFilterService) {}

  ngOnInit(): void {
    this.gridFilterService.filterDefinitions = this.filterDefinitions;
    this.gridFilterService.userFiltersList = this.userFiltersList;
    this.gridFilterService.dateFormat = this.dateFormat;
    this.gridFilterService.getUserFilters();
    this.gridFilterService.getGridFilterDefinations();
  }

  public handleLaunchClick(): void {
    this.dialog.open(GridFiltersModalComponent, {
      disableClose: true,
      width: '70vw',
      minWidth: '50vw',
      minHeight: '60vh',
    });
  }

  public launchManageFiltersModal(): void {
    this.dialog.open(ManageFiltersModalComponent, {
      disableClose: true,
      width: '70vw',
      minWidth: '50vw',
      minHeight: '60vh',
    });
  }
}
