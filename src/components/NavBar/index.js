import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MeetingActions from '../../store/actions/meetings';
import { Link } from 'react-router-dom';
@connect(
  state => ({ meetings: state.meetings }),
  { ...MeetingActions },
)

export class NavBar extends Component {

  render() {
    const {meetings,type} = this.props;
    let listViewClass = 'ms-Grid-col ms-sm6 ms-md5 ms-lg2 padding-20 color-black';
    let scheduleViewClass = 'ms-Grid-col ms-sm6 ms-md7 ms-lg2 padding-20 color-black'
    if(type == 'list') {
      listViewClass = listViewClass + ' selectedTab'
    }else {
      scheduleViewClass = scheduleViewClass + ' selectedTab'
    }
    return (
        <div className="ms-Grid-row background-blue">
            <div className={listViewClass}>
              <Link to="/" className="link">List View</Link>
            </div>
            <div className={scheduleViewClass}>
              <Link to="/scheduleview" className="link">Schedule View</Link>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg5 padding-20 color-white">
              Additional Information
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg3 padding-20 color-white text-right">
              Selected Locations ({meetings.locations_count})
            </div>
        </div>
    );
  }
}

export default NavBar;
