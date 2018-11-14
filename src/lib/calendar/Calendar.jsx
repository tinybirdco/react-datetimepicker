import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import MonthYearSelector from './MonthYearSelector'
import CalendarHeader from './CalendarHeader'
import CalendarRows from './CalendarRows'
import moment from 'moment'
import {getMonth, getYear, getFourtyTwoDays} from '../utils/TimeFunctionUtils'

class Calendar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      month : "",
      year : ""
    }

    this.changeMonthCallback = this.changeMonthCallback.bind(this);
    this.changeYearCallback = this.changeYearCallback.bind(this);
  }

  componentDidMount(){
    this.updateMonthYear();
  }

  componentDidUpdate(previousProps){
    if(!previousProps.date.isSame(this.props.date) || !previousProps.otherDate.isSame(this.props.otherDate)){
      this.updateMonthYear();
    }
  }

  updateMonthYear(){
    let newMonth = getMonth(this.props.date, this.props.otherDate, this.props.mode);
    let newYear = getYear(this.props.date, this.props.otherDate, this.props.mode);
    this.setState({
      month: newMonth,
      year : newYear
    })
  }

  createMonths(){
    let months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August", "September",
      "October", "November","December" ];
    return months;
  }

  createYears(){
    let years = []
    //Range from 1900 to 25 years into the future
    let past = moment("19000101", "YYYYMMDD");
    let yearsToGetFuture = 10;
    let endYear = moment().add(yearsToGetFuture, "years").get('year')
    let addedCurrentYear = false
    while(!addedCurrentYear){
        if(past.get("years") === endYear){
            addedCurrentYear = true;
        }
        years.push(past.year());
        past.add(1, "years");
    }
    return years;
  }

  changeMonthCallback(event){
    for(let i = 0; i < event.target.length; i++){
      if(event.target[i].value === event.target.value){
        this.setState({month:i})
      }
    }
  }

  changeYearCallback(event){
    this.setState({year:event.target.value})
  }

  render(){
    let months = this.createMonths();
    let years = this.createYears();
    let headers = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

    let fourtyTwoDays = getFourtyTwoDays(this.state.month, this.state.year);
    return(
        <div>
            <MonthYearSelector 
              date={this.props.date}
              mode={this.props.mode}
              otherDate={this.props.otherDate}
              months={months}
              years={years}
              month={this.state.month}
              year={this.state.year}
              changeMonthCallback={this.changeMonthCallback}
              changeYearCallback={this.changeYearCallback}
            />
            <CalendarHeader 
              headers={headers}
            />
            <CalendarRows 
              fourtyTwoDays={fourtyTwoDays}
              date={this.props.date}
              mode={this.props.mode}
              otherDate={this.props.otherDate}
              month={this.state.month}
              year={this.state.year}
              dateSelectedNoTimeCallback={this.props.dateSelectedNoTimeCallback}
            />
        </div>
    );
  }
}
export default Calendar