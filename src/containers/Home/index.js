import React, { Component } from 'react';
import { initializeIcons } from '@uifabric/icons';
import { connect } from 'react-redux';
import * as MeetingActions from '../../store/actions/meetings';
import NavBar from '../../components/NavBar';
import Filters from '../../components/Filters';
import {
  DetailsList,
  CheckboxVisibility,
  Selection
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

initializeIcons();

let columns = [ 
  {
    key: 'key',
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
    minWidth: 340,
    maxWidth: 340,
  },
  {
    key: 'room_description',
    name: 'Location Type',
    fieldName: 'room_description',
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
        const { meetings, setSelectedLocations } = this.props;
        if (this.getSelectionCount() <= 4) {
          setSelectedLocations(this.getSelectionDetails(), this.getSelectionCount());
        } else {
          alert('Only 4 allowed');
          var arr = this.getSelectionDetails();
          for (var k = 0; k < arr.length; k++) {
            this.selection.setKeySelected(arr[k].key, false, false);
          }
          for (var i = 0; i < meetings.selected_locations.length; i++) {
            this.selection.setKeySelected(meetings.selected_locations[i].key, true, false);
          }
        }
      }
    });
    const { setSelection, setData } = this.props;
    setSelection(this.selection);
    setData({ region: '', building: '', floor: '', room_type: '' })
    this.state = {
      items: [],
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
        self.selection.setKeySelected(meetings.selected_locations[i].key, true, false);
      }
    }, 500);
  }

  render() {
    var { items } = this.state;
    const { meetings } = this.props;
    items = meetings.locations
    return (
      <div>
        <NavBar type={'list'}></NavBar>
        <Filters></Filters>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 home-list-section">
            <div style={{ clear: 'both' }}>
              <MarqueeSelection selection={this.selection}>
                <DetailsList
                  selectionPreservedOnEmptyClick={true}
                  checkboxVisibility={CheckboxVisibility.always}
                  items={items}
                  columns={columns}
                  selection={this.selection}
                />
              </MarqueeSelection>
            </div>
          </div>
        </div></div>
    );
  }
}

export default Home;
