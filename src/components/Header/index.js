import React, { Component } from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import { connect } from 'react-redux';
import * as MeetingActions from '../../store/actions/meetings';
import TimePicker from '../TimePicker';

@connect(
  state => ({ meetings: state.meetings }),
  { ...MeetingActions },
)

class Header extends Component {
  _onFormatDate = (date: Date): string => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
  };

  selectMeetingDate = (date): string => {
    const { setMeetingDate, setStartTime, setEndTime } = this.props;
    setMeetingDate(date)

    var selectedTypeDate = new Date(date)
    selectedTypeDate = selectedTypeDate.setHours(0, 0, 0, 0);
    var currentDate = new Date();
    currentDate = currentDate.setHours(0, 0, 0, 0);

    if (currentDate == selectedTypeDate) {
      var currentHours = new Date().getHours();
      var currentMin = new Date().getMinutes();
      var ampmmin = currentHours % 24 < 12 ? 'AM' : 'PM';
      var m = (((currentMin + 7.5) / 15 | 0) * 15) % 60;
      if (m < 10) {
        m = "0" + m
      }
      var h = (((((currentMin / 105) + .5) | 0) + currentHours) % 24) % 12 || 12;
      var time = h + ":" + m + ' ' + ampmmin;
      setStartTime(time)
      setEndTime(time)
    } else {
      setStartTime("12:00 AM")
      setEndTime("12:00 AM")
    }
  };
  meetingTypeSelected = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    const {setSpaceType} = this.props
    setSpaceType(item.key)
  };

  render() {
    const { meetings } = this.props;
    var dat = new Date(meetings.meetingDate)
    return (
      <div className="ms-Grid-row header-section">
        <div className="ms-Grid-col background-white ms-sm-2 margin-bottom-10">
          <DefaultButton iconProps={{ iconName: 'Mail' }}>SEND</DefaultButton>
        </div>
        <div className="ms-Grid-col ms-sm-10 ms-md5 ms-lg3 margin-bottom-10">
          <Dropdown
            onChange={this.meetingTypeSelected}
            defaultSelectedKey={'India Meeting Space'}
            options={[
              { key: 'India Meeting Space', text: 'India Meeting Space' },
              { key: 'BlueWork Seat', text: 'BlueWork Seat' },
              { key: 'India Requestable Meeting Space', text: 'India Requestable Meeting Space' },
              { key: 'Technology BlueWork Seat', text: 'Technology BlueWork Seat' },
              { key: 'Technology Meeting Space', text: 'Technology Meeting Space' },
              { key: 'Reservable Meeting Space', text: 'Reservable Meeting Space' },
              { key: 'Requestable Meeting Space', text: 'Requestable Meeting Space' },
            ]}
          />
        </div>
        <div className="ms-Grid-col ms-sm12 ms-md2 ms-lg2 margin-bottom-10">
          <DatePicker
            onSelectDate={this.selectMeetingDate}
            formatDate={this._onFormatDate}
            value={dat}
            isRequired={false}
            allowTextInput={false}
          />
        </div>
        <div className="ms-Grid-col ms-sm12 ms-md2 ms-lg2 margin-bottom-10">
          <TimePicker type={'start'} />
        </div>
        <div className="ms-Grid-col ms-sm12 ms-md2 ms-lg2 margin-bottom-10">
          <TimePicker type={'end'} />
        </div>
      </div>
    );
  }
}

export default Header;
