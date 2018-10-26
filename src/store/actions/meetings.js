export const SET_START_TIME = 'SET_START_TIME';
export const SET_START_TIME_MOD = 'SET_START_TIME_MOD';
export const SET_END_TIME = 'SET_END_TIME';
export const SET_END_TIME_MOD = 'SET_END_TIME_MOD';
export const SET_MEETING_DATE = 'SET_MEETING_DATE';
export const SET_MEETING_TYPE = 'SET_MEETING_TYPE';
export const SET_SELECTED_LOCATIONS = 'SET_SELECTED_LOCATIONS';
export const SET_SELECTION = 'SET_SELECTION';
export const SET_DATA = 'SET_DATA';
export const SET_SPACE_TYPE = 'SET_SPACE_TYPE'

var temprows = require('../../assets/locations.json');
var rows = [];

for (var i = 0, l = temprows.length; i < l; i++) {
  var unique = true;
  for (var j = 0, k = rows.length; j < k; j++) {
    if ((temprows[i].building === rows[j].building) && (temprows[i].room_description === rows[j].room_description)) {
      unique = false;
    }
  }
  if (unique) {
    rows.push(temprows[i]);
  }
}

/*
var groupedData = rows.reduce(function(result, current) {
  if (typeof current['building'] === 'undefined')
    current['building'] = "All";

    result[current['building']] = result[current['building']] || [];
    result[current['building']].push(current);
    return result;
}, {});*/

export function setData(search) {
  var filterData = rows
  if (search.region != '') {
    filterData = filterData.filter(function (item) {
      return item.region == search.region;
    })
  }
  if (search.building != '') {
    filterData = filterData.filter(function (item) {
      return item.building == search.building;
    })
  }
  if (search.floor != '' && search.floor != 'all') {
    filterData = filterData.filter(function (item) {
      return item.floor == search.floor;
    })
  }
  if (search.room_type != '') {
    filterData = filterData.filter(function (item) {
      return item.room_type == search.room_type;
    })
  } else {
    filterData = filterData.filter(function (item) {
      return item.room_type == 'India Meeting Space';
    })
  }
  var groupedData = filterData.reduce(function (result, current) {
    if (typeof current['building'] === 'undefined')
      current['building'] = "All";

    result[current['building']] = result[current['building']] || [];
    result[current['building']].push(current);
    return result;
  }, {});
  return {
    type: SET_DATA,
    locations: filterData,
    groupedData: groupedData
  };
}

export function setSpaceType(space) {
  var filterData = rows
  filterData = filterData.filter(function (item) {
    return item.room_type == space;
  })
  var groupedData = filterData.reduce(function (result, current) {
    if (typeof current['building'] === 'undefined')
      current['building'] = "All";

    result[current['building']] = result[current['building']] || [];
    result[current['building']].push(current);
    return result;
  }, {});
  return {
    type: SET_SPACE_TYPE,
    space: space,
    locations: filterData,
    groupedData: groupedData
  };
}

export function setStartTime(time) {
  var hours, minutes, ampm, times = [], timeToSet = '';
  for (var i = 0; i <= 1430; i += 15) {
    hours = Math.floor(i / 60);
    minutes = i % 60;
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    ampm = hours % 24 < 12 ? 'AM' : 'PM';
    hours = hours % 12;
    if (hours === 0) {
      hours = 12;
    }
    var ctime = hours + ':' + minutes + ' ' + ampm;
    if (ctime == time) {
      timeToSet = ctime;
    }
    if (timeToSet != '') {
      times.push({ key: ctime, text: ctime, disabled: false })
    } else {
      times.push({ key: ctime, text: ctime, disabled: true })
    }
  }
  times.splice(times.length - 1, 1)
  return {
    type: SET_START_TIME,
    startTimes: times,
    time: timeToSet
  };
}
export function setEndTime(time) {
  var hours, minutes, ampm, times = [], disabled = true, timeToSet = '', endTimeFound = '';
  for (var i = 0; i <= 1430; i += 15) {
    hours = Math.floor(i / 60);
    minutes = i % 60;
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    ampm = hours % 24 < 12 ? 'AM' : 'PM';
    hours = hours % 12;
    if (hours === 0) {
      hours = 12;
    }
    var ctime = hours + ':' + minutes + ' ' + ampm;
    if (endTimeFound != '' && timeToSet == '') {
      timeToSet = ctime;
    }
    if (ctime == time) {
      endTimeFound = ctime
    }
    if (timeToSet != '') {
      times.push({ key: ctime, text: ctime, disabled: false })
    } else {
      times.push({ key: ctime, text: ctime, disabled: true })
    }
  }
  return {
    type: SET_END_TIME,
    endTimes: times,
    time: timeToSet
  };
}
export function setStartTimeMod(time) {
  return {
    type: SET_START_TIME_MOD,
    time: time
  };
}
export function setEndTimeMod(time) {
  return {
    type: SET_END_TIME_MOD,
    time: time
  };
}
export function setMeetingDate(date) {
  return {
    type: SET_MEETING_DATE,
    date: date
  };
}
export function setMeetingType(mtype) {
  return {
    type: SET_MEETING_TYPE,
    meeting_type: mtype
  };
}
export function setSelection(mtype) {
  return {
    type: SET_SELECTION,
    selection: mtype
  };
}
export function setSelectedLocations(mtype, count) {
  return {
    type: SET_SELECTED_LOCATIONS,
    meeting_locations: mtype,
    locations_count: count
  };
}

