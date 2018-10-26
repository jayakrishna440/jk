import React, { Component } from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { connect } from 'react-redux';
import * as MeetingActions from '../../store/actions/meetings';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

var currentHours = new Date().getHours();
var currentMin = new Date().getMinutes();
var ampmmin = currentHours % 24 < 12 ? 'AM' : 'PM';
var m = (((currentMin + 7.5)/15 | 0) * 15) % 60;
if(m<10){
  m = "0"+m
}
var h = ((((currentMin/105) + .5) | 0) + currentHours) % 24;
var time = h+":"+m+' '+ampmmin;

var hours, minutes, ampm, endTime='', times=[];
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
    times.push({ key: hours + ':' + minutes + ' ' + ampm, text: hours + ':' + minutes + ' ' + ampm, disabled: false})
}

@connect(
  state => ({ meetings: state.meetings }),
  { ...MeetingActions },
)

export class TimePicker extends Component {
  
  timeSelected = (option): string => {
    const {setStartTime,setEndTime} = this.props;
    if(this.props.type == 'start'){
      time = option.key
      setStartTime(option.key)
      setEndTime(endTime)
    }else{
      setEndTime(option.key)
    }
  }
  _onRenderCaretDown = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="DateTime" />;
  };

  constructor(props) {
    super(props);
alert(props.type)
  }  

  render() {
    const{type,meetings} = this.props
    var selectedTypeDate = new Date(meetings.meetingDate)
    selectedTypeDate = selectedTypeDate.setHours(0,0,0,0);
    var currentDate = new Date();
    currentDate = currentDate.setHours(0,0,0,0);
    
    if(currentDate == selectedTypeDate) {
      var i = 0 ;
      var length = times.length;

      for(;i< length;i++) {
        //console.log(times[i].key+"-"+time+"--"+type)
        if(times[i].key == time) {
          if(type == 'end') {
            //times[i].disabled = true
            if(i+1 >= times.length){
              
            }else {
              //times[i].disabled = true
              time = times[i+1].key
              //times[i+1].disabled = true
            }
          }
          break;
        } else {
          times[i].disabled = true
          /*if(type == 'end') {
            if(i+1 >= times.length){
              
            }else {
              times[i+1].disabled = true
            }
          }*/
        }
      }
      /*if(type == 'end') {
        if(meetings.startTime !== '') {
          i = 0;
          for(;i< length;i++) {
            if(times[i].key == meetings.startTime) {
              times[i].disabled = true
              if(i+1 >= times.length){
                time = times[0].key;
              }else {
                time = times[i+1].key;
              }
              break;
            }else {
              times[i].disabled = true
            }
          }
        }else {
          if(i+1 >= times.length){
            time = times[0].key;
          }else {
            time = times[i+1].key;
          }
        }
        endTime = time;
      }*/
    } else {
      /*var i = 0 ;
      var length = times.length;
      for(;i< length;i++) {
        if(times[i].key == time) {
          break;
        }
      }
      if(meetings.startTime !== '') {
        time = meetings.startTime;
      }
      if(type == 'end') {
        if(meetings.startTime !== '') {
          i = 0;
          for(;i< length;i++) {
            if(times[i].key == meetings.startTime) {
              times[i].disabled = true
              if(i+1 >= times.length){
                time = times[0].key;
              }else {
                time = times[i+1].key;
              }
              break;
            }else {
              times[i].disabled = true
            }
          }
        }else {
          if(i+1 >= times.length){
            time = times[0].key;
          }else {
            time = times[i+1].key;
          }
        }
        endTime = time;
      }*/
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
