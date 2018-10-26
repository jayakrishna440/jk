import React, { Component } from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { connect } from 'react-redux';
import * as MeetingActions from '../../store/actions/meetings';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

@connect(
  state => ({ meetings: state.meetings }),
  { ...MeetingActions },
)

export class TimePicker extends Component {
  
  timeSelected = (option): string => {
    const {setStartTimeMod,setEndTime,setEndTimeMod} = this.props;
    if(this.props.type == 'start'){
      setStartTimeMod(option.key)
      setEndTime(option.key)
    }else{
      setEndTimeMod(option.key)
    }
    this.setState({ time: option.key});
  }
  _onRenderCaretDown = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="DateTime" />;
  };

  constructor(props) {
    super(props);
    const {type,setStartTime,setEndTime} = props
    var currentHours = new Date().getHours();
    var currentMin = new Date().getMinutes();
    var ampmmin = currentHours % 24 <= 12 ? 'AM' : 'PM';
    var m = (((currentMin + 7.5)/15 | 0) * 15) % 60;
    if(m<10){
      m = "0"+m
    }
    var h = (((((currentMin/105) + .5) | 0) + currentHours) % 24)% 12 || 12;
    var time = h+":"+m+' '+ampmmin;

    if(type == 'start') {
      setStartTime(time)
    }else {
      setEndTime(time)
    }
  }  

  render() {
    const {meetings,type} = this.props;
    var times = meetings.startTimes;
    var timeToSet = meetings.startTime;
    if(type == 'end') {
      var times = meetings.endTimes;
      var timeToSet = meetings.endTime;
    }
    
    return (
        <Dropdown
          selectedKey={timeToSet}
          id="TimePicker"
          className="time-picker"
          onChanged={this.timeSelected}
          onRenderCaretDown={this._onRenderCaretDown}
          options={times}
        />
    );
  }
}

export default TimePicker;
