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
    const {setStartTime,setEndTime} = this.props;
    if(this.props.type == 'start'){
      setStartTime(option.key)
    }else{
      setEndTime(option.key)
    }
    this.setState({ time: option.key});
  }
  _onRenderCaretDown = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="DateTime" />;
  };

  constructor(props) {
    super(props);

    var currentHours = new Date().getHours();
    var currentMin = new Date().getMinutes();
    var ampmmin = currentHours % 24 < 12 ? 'AM' : 'PM';
    var m = (((currentMin + 7.5)/15 | 0) * 15) % 60;
    if(m<10){
      m = "0"+m
    }
    var h = ((((currentMin/105) + .5) | 0) + currentHours) % 24;
    var time = h+":"+m+' '+ampmmin;

    const {type,setStartTime,setEndTime} = props;
    var hours, minutes, ampm, times=[],disabled = true, timeToSet='', endTimeFound='';
    for(var i = 0; i <= 1430; i += 15){
        hours = Math.floor(i / 60);
        minutes = i % 60;
        if (minutes < 10){
            minutes = '0' + minutes;
        }
        ampm = hours % 24 < 12 ? 'AM' : 'PM';
        hours = hours % 12;
        if (hours === 0){
            hours = 12;
        }
        var ctime = hours + ':' + minutes + ' ' + ampm;
        if(endTimeFound != '' && timeToSet==''){
          disabled = false;
          timeToSet = ctime;
        }
        if(ctime == time) {
          if(type == 'end') {
            endTimeFound = ctime
          }else {
            timeToSet = ctime;
            disabled = false;
          }
        }
        times.push({ key: ctime, text: ctime, disabled: disabled})
    }
    if(type == 'start') {
      times.splice(times.length-1,1)
      setStartTime(timeToSet)
    }else {
      setEndTime(timeToSet)
    }
    
    this.state = {
      times: times,
      time: timeToSet
    }
  }  

  render() {
    const {meetings,type,setEndTime} = this.props
    let {times, time } = this.state

    if(type == 'end' && meetings.startTime!='') {
      var i = 0;
      var length = times.length;
      for(;i<length;i++) {
        if(meetings.startTime == times[i].key) {
          times[i].disabled = true;
          time = times[i+1].key;
          break;
        }else {
          times[i].disabled = true;
        }
      }
    }
    
    return (
        <Dropdown
          selectedKey={time}
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
