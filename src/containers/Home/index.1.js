import React, { Component } from 'react';
import '../../index.css';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { initializeIcons } from '@uifabric/icons';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { connect } from 'react-redux';
import * as MeetingActions from '../../store/actions/meetings';
import {
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  Selection,
  IColumn,
  IDetailsList
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';


initializeIcons();

let columns = [
  {
    key: 'location',
    name: 'Location',
    fieldName: 'location',
    minWidth: 140,
    maxWidth: 140,
  },
  {
    key: 'floor',
    name: 'Floor',
    fieldName: 'floor',
    minWidth: 140,
    maxWidth: 140,
  },
  {
    key: 'building',
    name: 'Building',
    fieldName: 'building',
    minWidth: 140,
    maxWidth: 140,
  },
  {
    key: 'location_type',
    name: 'Location Type',
    fieldName: 'location_type',
    minWidth: 200,
    maxWidth: 200,
  },
  {
    key: 'capacity',
    name: 'Capacity',
    fieldName: 'capacity',
    minWidth: 140,
    maxWidth: 140,
  },
  {
    key: 'like',
    name: '',
    fieldName: 'like',
    onRender: (item) => (
      <div>
        <i className="ms-Icon ms-Icon--Heart" aria-hidden="true"></i> 
      </div>
    )
  }
];

let rows = [
  {
    key: 'locationid',
    locationid: '12345',
    location: '5003 A',
    floor: '6th floor',
    building: 'Denver office A (*)',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid1',
    locationid: '123453',
    location: '5003 B',
    floor: '6th floor',
    building: 'Denver office B (*)',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid2',
    locationid: '123454',
    location: '5003 C',
    floor: '6th floor',
    building: 'Denver office C (*)',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid3',
    locationid: '123455',
    location: '5003 D',
    floor: '6th floor',
    building: 'Denver office D (*)',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  }
]


@connect(
  state => ({ meetings: state.meetings }),
  { ...MeetingActions },
)


class Home extends Component {
  selection: Selection;

  constructor() {
    super();
    
    this.selection = new Selection({
      onSelectionChanged: () => {
        this.setState({ selectionDetails: this.getSelectionDetails(), count: this.getSelectionCount() })
        const {setSelectedLocations, setLocationsCount} = this.props;
        setSelectedLocations(this.getSelectionDetails(), this.getSelectionCount());
      }
    });

    this.state = {
      rows: null,
      isLoading: false,
      count: this.getSelectionCount(), 
      selectionDetails: this.getSelectionDetails()
    };

    this.removeLocation = this.removeLocation.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  getSelectionCount(): any {
    const selectionCount = this.selection.getSelectedCount();
    return selectionCount;
  }
  getSelectionDetails(): any {
    return this.selection.getSelection()
  }

  onChange(value): any {
    console.log(value && value.format(format));
  }

  removeLocation(e): any {
    const { selectionDetails, count } = this.state;
    for (var i = 0; i < selectionDetails.length; i++) {
      if(selectionDetails[i].locationid == e.locationid) {
        this.selection.setKeySelected(selectionDetails[i].key,false,false);

        selectionDetails.splice(i,1)
        break;
      }
    }
    this.setState({ selectionDetails: selectionDetails, count: count-1 })
    const {setSelectedLocations, setLocationsCount} = this.props;
    setSelectedLocations(selectionDetails,count-1);
  }

  clearAll(e):any {
    const { selectionDetails, count } = this.state;
    for (var i = 0; i < selectionDetails.length; i++) {
        this.selection.setKeySelected(selectionDetails[i].key,false,false);
    }
    this.setState({ selectionDetails: [], count: 0 })
    const {setSelectedLocations, setLocationsCount} = this.props;
    setSelectedLocations([],0);
  }

  _onFormatDate = (date: Date): string => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
  };

  render() {
    const { selectionDetails, count } = this.state;
    const { meetings} = this.props;
    console.log(meetings)
    const self = this
    var detailsList = []
    if(typeof selectionDetails!='undefined'){
      detailsList = selectionDetails.map(function(name){
        return <div key={name.locationid} onClick={self.removeLocation.bind(this,name)}>
              <i className="ms-Icon ms-Icon--ChromeClose padding-right-5 padding-left-10 close-icon" aria-hidden="true"></i> 
              {name.building}
          </div>;
      })
    }

    return (
       
        <div className="ms-Grid" dir="ltr">

            {/* HEADER START - SEND BUTTON, DATEPICKER, TIMER PICKER */}
              <Header></Header>
            {/* HEADER END - SEND BUTTON, DATEPICKER, TIMER PICKER */}

            {/* NAVBAR SECTION START */}
              <NavBar type={'list'}></NavBar>
            {/* NAVBAR SECTION END */}

            {/* FILTERS SECTION START */}
            <div className="ms-Grid-row height-100">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 filter-section">

                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 selectedTab top-btns location margin-bottom-20">
                    <DefaultButton>
                      <i className="ms-Icon ms-Icon--Filter padding-right-5 location-icon" aria-hidden="true"></i> 
                      Location Filter
                    </DefaultButton>
                  </div>

                  <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 selectedTab top-btns clearall margin-bottom-20">
                    <DefaultButton onClick={self.clearAll.bind(this,'h')}>
                      <i className="ms-Icon ms-Icon--ChromeClose padding-right-5 close-icon" aria-hidden="true"></i> 
                      Clear All
                    </DefaultButton>
                  </div>
                  
                  <div className="ms-Grid-cols selectedTab margin-bottom-10 locationBtn background-white">
                    <DefaultButton>
                      Location {detailsList}
                    </DefaultButton>
                  </div>

                </div>

              </div>
            </div>
            {/* FILTERS SECTION END */}

            {/* LIST VIEW START */}
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 list-section">
                <MarqueeSelection selection={this._selection}>
                  <DetailsList
                    checkboxVisibility = {CheckboxVisibility.always}
                    items={rows}
                    columns={columns}
                    selection={this.selection}
                  />
                </MarqueeSelection>
              </div>
            </div>
            {/* LIST VIEW END */}
        </div>

      
    );
  }
}

export default Home;
