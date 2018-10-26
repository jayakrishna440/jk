import React, { Component } from 'react';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment';
import withDragDropContext from './withDnDContext';
import NavBar from '../../components/NavBar';
import Filters from '../../components/Filters';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { connect } from 'react-redux';
import * as MeetingActions from '../../store/actions/meetings';

let attendiesData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Day,false, false, {
    startResizable: false,
    endResizable: false,
    movable: false,
    creatable: false,
    resourceName: "ATTENDIES",
    minuteStep: 15,
    checkConflict: true,
    calendarPopoverEnabled: false,
    eventItemHeight: 40,
    eventItemLineHeight: 40
});

let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Day,false, false, {
    startResizable: false,
    endResizable: false,
    movable: false,
    creatable: false,
    resourceName: "EMS HQ",
    minuteStep: 15,
    displayWeekend: false,
    checkConflict: true,
    calendarPopoverEnabled: false,
    eventItemHeight: 40,
    eventItemLineHeight: 40
});
let attendiesresources = [
    {
       id: 'r1',
       name: 'John'
    },
    {
       id: 'r2',
       name: 'Mathew'
    },
    {
       id: 'r3',
       name: 'Vittal'
    }
];
attendiesData.setResources(attendiesresources);
let resources = [
    {
       id: 'EMS Building 1',
       name: 'EMS Building 1'
    },
    {
       id: 'EMS Conference Room',
       name: 'EMS Conference Room'
    },
    {
       id: 'EMS Building Room 2',
       name: 'EMS Building Room 2'
    }
];
schedulerData.setResources(resources);

let events = [
{
     id: 1,
     start: '2018-10-24 09:12:00',
     end: '2018-10-24 10:30:00',
     resourceId: 'EMS Building 1',
     title: 'I am finished test',
 },
  {
    id: 1,
    start: '2018-10-24 08:12:00',
    end: '2018-10-24 09:15:00',
    resourceId: 'EMS Building 1',
    title: 'I am finished',
}, 
 {
     id: 2,
     start: '2018-10-09 01:00:00',
     end: '2018-10-09 02:30:00',
     resourceId: 'EMS Conference Room',
     title: 'New Project',
     resizable: false
 }, 
 {
     id: 3,
     start: '2018-10-09 14:30:00',
     end: '2018-10-09 16:30:00',
     resourceId: 'EMS Building Room 2',
     title: 'Erick Conference',
     movable: false
 }, 
 {
     id: 4,
     start: '2018-10-09 16:30:00',
     end: '2018-10-09 23:30:00',
     resourceId: 'EMS Building 1',
     title: 'Test Jon Data',
     startResizable: false
 }, 
 {
     id: 5,
     start: '2018-10-09 19:30:00',
     end: '2018-10-09 20:30:00',
     resourceId: 'EMS Conference Room',
     title: 'R2 has recurring tasks every week on Tuesday, Friday'
 }
];
schedulerData.setEvents(events);

attendiesData.setEvents(events);

@connect(
  state => ({ meetings: state.meetings }),
  { ...MeetingActions },
)
    
class ScheduleView extends Component {
    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
    }
    _onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
        console.log(ev.currentTarget.id)
        console.log(isChecked)
        const {meetings} = this.props;
        console.log(meetings)
        var start = meetings.startTime.replace('AM','').replace('PM','')
        var end = meetings.endTime.replace('AM','').replace('PM','')
        let schedulerData = this.state.viewModel;
        if(isChecked) {
            let newFreshId = schedulerData.resources.length + 1;
            events.push({id: newFreshId, 
                start:  "2018-10-23 9:30:00",
                end: '2018-10-23 14:30:00',
                resourceId: ev.currentTarget.id,
                title: ev.currentTarget.id,
                movable: false})
                schedulerData.setEvents(events);
                this.setState({
                    viewModel: schedulerData
                })
        }else {
            events.splice(events.length-1,1);
            schedulerData.setEvents(events);
            this.setState({
                viewModel: schedulerData
            })
        }
      }
    slotItemTemplateResolver = (schedulerData, slot, slotClickedFunc, width, clsName) => {
        return (
            <div>
               <Checkbox label={slot.slotName} id={slot.slotName} onChange={this._onCheckboxChange} />
            </div>
        );
    }    
    nonAgendaCellHeaderTemplateResolver = (schedulerData, item, formattedDateItems, style) => {
        let datetime = schedulerData.localeMoment(item.time);
        let isCurrentDate = false;
  
        if (schedulerData.viewType === ViewTypes.Day) {
            isCurrentDate = datetime.isSame(new Date(), 'hour');
        }
        else {
            isCurrentDate = datetime.isSame(new Date(), 'day');
        }
  
        if (isCurrentDate) {
            style.backgroundColor = '#118dea';
            style.color = 'white';
        }
        return (
            <th key={item.time} className={`header3-text`} style={style}>
                {
                    formattedDateItems.map((formattedItem, index) => (
                        <div key={index}
                            dangerouslySetInnerHTML={{__html: formattedItem.replace(/[0-9]/g, '<b>$&</b>')}}/>
                    ))
                }
            </th>
        );
    }
    slotClickedFunc = (schedulerData, slot) => {
        alert(`You just clicked a ${schedulerData.isEventPerspective ? 'task':'resource'}.{id: ${slot.slotId}, name: ${slot.slotName}}`);
    }
    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };
    updateEventStart = (schedulerData, event, newStart) => {
        if(confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if(confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        if(confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
            schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
      schedulerData.next();
      schedulerData.setEvents(events);
      this.setState({
          viewModel: schedulerData
      });

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
      schedulerData.prev();
      schedulerData.setEvents(events);
      this.setState({
          viewModel: schedulerData
      });

      schedulerContent.scrollLeft = 10;
    }

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollTop');
    }

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollBottom');
    }

    constructor(props) {
        super(props);
        this._onCheckboxChange = this._onCheckboxChange.bind(this);
        this.state = {
          hideDialog: true,
          viewModel:schedulerData
        };
      }

      conflictOccurred = (schedulerData, action, event) => {
        alert(`Conflict occurred. {action: ${action}, event: ${event}`);
    }

   _showDialog = (): void => {
    this.setState({ hideDialog: false });
  };

   _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };

    render() {
        const {viewModel} = this.state
        console.log(viewModel)
        return (
            <div>
                <NavBar type={'fff'}></NavBar>
                <Filters></Filters>
                <div className="ms-Grid-row attendies">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <div style={{position:'absolute',top: '24%'}}>
                            <span>All Attendees</span><br/>
                            <span onClick={this._showDialog}>
                                Add New
                            </span>
                        </div>
                        <Scheduler schedulerData={attendiesData} 
                                prevClick={this.prevClick}
                                nextClick={this.nextClick}
                                onSelectDate={this.onSelectDate}
                                onViewChange={this.onViewChange}
                                updateEventStart={this.updateEventStart}
                                updateEventEnd={this.updateEventEnd}
                                moveEvent={this.moveEvent}
                                nScrollLeft={this.onScrollLeft}
                                onScrollRight={this.onScrollRight}
                                onScrollTop={this.onScrollTop}
                                onScrollBottom={this.onScrollBottom}
                                conflictOccurred={this.conflictOccurred}
                                nonAgendaCellHeaderTemplateResolver = {this.nonAgendaCellHeaderTemplateResolver} />
                    </div>
                </div>
                <div className="ms-Grid-row rooms">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 list-section">
                        <div style={{position:'absolute'}}>
                            <span>Rooms</span><br/>
                            <span onClick={this._showDialog}>
                                Add New
                            </span>
                        </div>
                        <Scheduler schedulerData={viewModel} 
                                prevClick={this.prevClick}
                                nextClick={this.nextClick}
                                onSelectDate={this.onSelectDate}
                                onViewChange={this.onViewChange}
                                conflictOccurred={this.conflictOccurred}
                                updateEventStart={this.updateEventStart}
                                updateEventEnd={this.updateEventEnd}
                                moveEvent={this.moveEvent}
                                nScrollLeft={this.onScrollLeft}
                                onScrollRight={this.onScrollRight}
                                onScrollTop={this.onScrollTop}
                                onScrollBottom={this.onScrollBottom}
                                slotItemTemplateResolver={this.slotItemTemplateResolver}
                                nonAgendaCellHeaderTemplateResolver = {this.nonAgendaCellHeaderTemplateResolver} />
                    </div>
                </div>

                <div>
                 <Dialog
                    hidden={this.state.hideDialog}
                    onDismiss={this._closeDialog}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: 'Select Rooms',
                        subText:'Show Here All Rooms List'
                    }}
                    modalProps={{
                        isBlocking: true,
                        containerClassName: 'ms-dialogMainOverride'
                    }}
                    >
                    <DialogFooter>
                        <PrimaryButton onClick={this._closeDialog} text="Save" />
                        <DefaultButton onClick={this._closeDialog} text="Cancel" />
                    </DialogFooter>
                    </Dialog>
                </div>
                
            </div>
        );    
    }    
}

export default withDragDropContext(ScheduleView);
