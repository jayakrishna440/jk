import React, { Component } from 'react';
import '../../index.css';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Filters from '../../components/Filters';
import { initializeIcons } from '@uifabric/icons';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { connect } from 'react-redux';
import * as MeetingActions from '../../store/actions/meetings';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import {
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  Selection,
  IColumn,
  IDetailsList
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
var data = require('../../assets/locations.json');
console.log(data)

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
    region:'EMEA',
    location: '5001 A',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid7',
    locationid: '12345666',
    region:'EMEA',
    location: '5002 A',
    floor: '1th floor',
    building: 'Denver office A',
    location_type: 'Small Room (Test)',
    capacity: '1-4',
    like: ''
  },{
    key: 'locationid8',
    locationid: '1234577',
    region:'EMEA',
    location: '5003 A',
    floor: '4th floor',
    building: 'Denver office A',
    location_type: 'Meeting Room (Test)',
    capacity: '1-23',
    like: ''
  },
  {
    key: 'locationid1',
    locationid: '123453',
    region:'JAPA',
    location: '5003 B',
    floor: '6th floor',
    building: 'Denver office B',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid2',
    locationid: '123454',
    region:'US',
    location: '5003 C',
    floor: '6th floor',
    building: 'Denver office C',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid3',
    locationid: '123455',
    region:'LAC',
    location: '5003 D',
    floor: '6th floor',
    building: 'Denver office D',
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

  constructor(props) {
    super(props);
    this.selection = new Selection({
      onSelectionChanged: () => {
        const {setSelectedLocations} = this.props;
        setSelectedLocations(this.getSelectionDetails(), this.getSelectionCount());
      }
    });
    const {setSelection} = this.props;
    setSelection(this.selection);

    this.state = {
      items: rows,
      isLoading: false
    };
  }

  getSelectionCount(): any {
    const selectionCount = this.selection.getSelectedCount();
    return selectionCount;
  }
  getSelectionDetails(): any {
    return this.selection.getSelection()
  }

  componentDidMount() {
    var self = this;
    self.timeout = setTimeout(() => {
      const { meetings } = self.props;
      for (var i = 0; i < meetings.selected_locations.length; i++) {
        self.selection.setKeySelected(meetings.selected_locations[i].key,true,false);
      }
    }, 500);
  }

  render() {
    const { items } = this.state;
    return (
       
        <div className="ms-Grid" dir="ltr">

            {/* HEADER START - SEND BUTTON, DATEPICKER, TIMER PICKER */}
              <Header></Header>
            {/* HEADER END - SEND BUTTON, DATEPICKER, TIMER PICKER */}

            {/* NAVBAR SECTION START */}
              <NavBar type={'list'}></NavBar>
            {/* NAVBAR SECTION END */}

            {/* FILTERS SECTION START */}
            <Filters></Filters>
            {/* FILTERS SECTION END */}

            {/* LIST VIEW START */}
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 home-list-section">
                <div style={{clear:'both'}}>
                  <MarqueeSelection selection={this.selection}>
                    <DetailsList
                      selectionPreservedOnEmptyClick={true}
                      checkboxVisibility = {CheckboxVisibility.always}
                      items={items}
                      columns={columns}
                      selection={this.selection}
                    />
                  </MarqueeSelection>
                </div>
              </div>
            </div>
            {/* LIST VIEW END */}

        </div>

      
    );
  }
}

export default Home;
