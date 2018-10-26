import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MeetingActions from '../../store/actions/meetings';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  CheckboxVisibility,
  Selection
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

let filtercolumns = [
  {
    key: 'location',
    name: 'Location',
    fieldName: 'location',
    minWidth: 140,
    maxWidth: 140,
  }
] 

let filterrows = [
  {
    key: 'locationid1',
    locationid: '677',
    location: '5001 A',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid2',
    locationid: '1234445',
    location: '5001 A',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid3',
    locationid: '12',
    location: '5001 A',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid4',
    locationid: '89',
    location: '5001 A',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid5',
    locationid: '566',
    location: '5001 A',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },{
    key: 'locationid66',
    locationid: '34',
    location: '5001 A',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  }
] 


let featurecolumns = [
  {
    key: 'location',
    name: 'Location',
    fieldName: 'location',
    minWidth: 140,
    maxWidth: 140,
  }
] 

let featurerows = [
  {
    key: 'locationid2',
    locationid: '1232345',
    location: 'Computer Room',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid3',
    locationid: '123645',
    location: 'Computer Room',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid4',
    locationid: '122a345',
    location: 'Computer Room',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid',
    locationid: '123435',
    location: 'Computer Room',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid5',
    locationid: '123453',
    location: 'Computer Room',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid6',
    locationid: '1234525',
    location: 'Computer Room',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  },
  {
    key: 'locationid7',
    locationid: '123452',
    location: 'Computer Room',
    floor: '6th floor',
    building: 'Denver office A',
    location_type: 'Conference Room (Test)',
    capacity: '1-44',
    like: ''
  }
] 

@connect(
  state => ({ meetings: state.meetings }),
  { ...MeetingActions },
)

export class Filters extends Component {
  filterselection: Selection;
  featureselection: Selection;

  clearAll(e):any {
    const { meetings } = this.props;
   /*for (var i = 0; i < meetings.selected_locations.length; i++) {
        this.selection.setKeySelected(meetings.selected_locations[i].key,false,false);
    }*/
    //this.setState({ selectionDetails: [], count: 0 })
    const {setSelectedLocations} = this.props;
    setSelectedLocations([],0);
  }

  removeLocation(e): any {
    const { meetings,setSelectedLocations } = this.props;
    for (var i = 0; i < meetings.selected_locations.length; i++) {
      if(meetings.selected_locations[i].locationid == e.locationid) {
        meetings.selection.setKeySelected(meetings.selected_locations[i].key,false,false);
        meetings.selected_locations.splice(i,1)
        break;
      }
    }
    //this.setState({ selectionDetails: meetings.selected_locations, count: count-1 })
    setSelectedLocations(meetings.selected_locations,meetings.locations_count-1);
  }

  constructor(props) {
    super(props);

    this.removeLocation = this.removeLocation.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.state = {
      showModal: false
    };

    this.filterselection = new Selection({
      onSelectionChanged: () => {
        console.log('FILTER')
      }
    });

    this.featureselection = new Selection({
      onSelectionChanged: () => {
        console.log('FEATURE')
      }
    });
  };

  _showModal = (): void => {
    this.setState({ showModal: true });
  };

  _closeModalandUpdate = (): void => {
    this.setState({ showModal: false });
  };

  _closeModal = (): void => {
    this.setState({ showModal: false });
  };

  render() {
    //const { selectionDetails } = this.state;
    const { meetings} = this.props;
    console.log(meetings)
    const self = this
    var detailsList = meetings.selected_locations.map(function(name){
      return <div key={name.locationid} onClick={self.removeLocation.bind(this,name)}>
            <i className="ms-Icon ms-Icon--ChromeClose padding-right-5 padding-left-10 close-icon" aria-hidden="true"></i> 
            {name.location}-{name.building}-{name.floor}
        </div>;
    })

    return (
      <div className="ms-Grid-row height-100">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 filter-section">

          <div className="ms-Grid-row">
            <div className="ms-Grid-col selectedTab top-btns location margin-bottom-20">
              <DefaultButton iconProps={{ iconName: 'Filter' }} onClick={this._showModal} >
                Location Filter
              </DefaultButton>
            </div>

            <div className="ms-Grid-col selectedTab top-btns clearall margin-bottom-20">
              <DefaultButton onClick={self.clearAll.bind(this,'h')}  iconProps={{ iconName: 'ChromeClose' }}>
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
        <Modal
          isOpen={this.state.showModal}
          onDismiss={this._closeModal}
          isBlocking={false}
          containerClassName="ms-modalExample-container"
        >
          <div className="ms-modalExample-body">
            
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 filters-div">
                <div>
                  FILTERS
                  <MarqueeSelection selection={this.featureselection}>
                    <DetailsList
                      isHeaderVisible={false}
                      selectionPreservedOnEmptyClick={true}
                      checkboxVisibility = {CheckboxVisibility.always}
                      items={filterrows}
                      columns={filtercolumns}
                      selection={this.featureselection}
                    />
                  </MarqueeSelection>
                </div>
              </div>
              <div className="ms-Grid-col height-85">
              <TextField label="Capacity" /></div>
          
              <div className="ms-Grid-col height-85">
                ROOM TYPE
                <Dropdown
                  onChanged={this.meetingTypeSelected}
                  defaultSelectedKey={'A'}
                  options={[
                    { key: 'A', text: 'Meeting Room' },
                    { key: 'B', text: 'Hall' },
                    { key: 'E', text: 'Conference' }
                  ]}
                />
              </div>

              <div className="ms-Grid-col height-85">
                FLOOR TYPE
                <Dropdown
                  onChanged={this.meetingTypeSelected}
                  defaultSelectedKey={'A'}
                  options={[
                    { key: 'A', text: '3rd Floor ' },
                    { key: 'B', text: '5th Floor' },
                    { key: 'D', text: '10th Floor' },
                    { key: 'E', text: '11th Floor' }
                  ]}
                />
              </div>
            </div>
            <hr/>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 filters-div">
                <div>
                  FEATURES
                  <MarqueeSelection selection={this.filterselection}>
                    <DetailsList
                      isHeaderVisible={false}
                      selectionPreservedOnEmptyClick={true}
                      checkboxVisibility = {CheckboxVisibility.always}
                      items={featurerows}
                      columns={featurecolumns}
                      selection={this.filterselection}
                    />
                  </MarqueeSelection>
                </div>
              </div>
            </div>

            <div className='modal-footer'>
              <DefaultButton className="apply-btn" onClick={this._closeModalandUpdate} primary={true}>
                APPLY
              </DefaultButton>
              <DefaultButton className="apply-btn" onClick={this._closeModal} >
                CLOSE
              </DefaultButton>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Filters;
