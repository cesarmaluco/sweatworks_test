import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import fetch  from 'node-fetch';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { addMonths, addYears } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';


import {  IUser } from "./SignUp";

export interface IItem {
  Title?: string;
  Body? :string;
  Date? : any;
  AuthorId? : any;
}

export interface IRole {
  type: string;
}

const today: Date = new Date(Date.now());
const minDate: Date = addMonths(today, -1);
const maxDate: Date = addYears(today, 1);
const description = `When date boundaries are set (via minDate and maxDate props) the DatePicker will not allow out-of-bounds dates to be picked or entered. In this example, the allowed dates are ${minDate.toLocaleDateString()}-${maxDate.toLocaleDateString()}`;

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',

  isRequiredErrorMessage: 'Field is required.',

  invalidInputErrorMessage: 'Invalid date format.'
};

export interface IDatePickerRequiredExampleState {
  firstDayOfWeek?: DayOfWeek;
}

export  class ItemForm extends React.Component<any, IItem> {

    private showPanel: boolean = false;
    private _form : any;
    private _callback: any;
    private _user : IUser;
    private _body : any;
    private _date: any;
    private _pubData: any;
    private _title : any;

    constructor(props: any, state: IItem) {
        super(props);
        this._form = props.context;   
        
        this._callback = props.callback; 
        this._user = props._user;
        this._date = new Date();

        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);

        if (props.props._currentPub != null){
          this._pubData = props.props._currentPub;
          props.props._currentPub = null;
        }
    }

    handleChangeBody(event: any) {
      this._body = event.target.value;
      this.setState({Body: this._body});
    }

    handleChangeTitle(newvalue: any) {
      this._title = newvalue;
      this.setState({Title: this._title});
    }

    public componentDidMount(){
      
      if (this._pubData != null){
        this._title = this._pubData.Title;
        this._body = this._pubData.Body;
        this._date = new Date(this._pubData.PubDate);
        this.setState({Body: this._pubData.Body, AuthorId: this._pubData.AuthorId, Date: new Date(this._pubData.PubDate), Title: this._pubData.Title});
        this.forceUpdate();
      }
    }

    private newItem()
    {
        fetch('http://localhost:1340/api/publication/create',{ method: 'POST',headers: { 'Content-Type': 'application/json'}, body: '{"data":{' + 
                                                                              '"Title": "' + this._title + '",' + 
                                                                              '"Body": "' + this._body + '",' + 
                                                                              '"PubDate": "' + (this.refs["date"] as DatePicker).state.selectedDate.toISOString() + '",' + 
                                                                              '"AuthorId": "' + this.props.context.props.props.id + '"}}'}).then(res => res.json()).then(data => {
                                                                                  let _data = data; 
                                                                                  let _item : IItem = {Title:_data.Title};
                                                                                  this._form.setState({status:"Ready",user:this.props.context.props.props}); 
                                                                                  this._form.closeItem();
                                                                                  this.forceUpdate();
                                                                            });
    }

    private loadItem(){

    }

    private updateItem()
    {
        fetch('http://localhost:1340/api/publication/update',{ method: 'POST',headers: { 'Content-Type': 'application/json'}, body: '{"data":{' + 
                                                                              '"Title": "' + this._title + '",' + 
                                                                              '"Body": "' + this._body + '",' + 
                                                                              '"PubDate": "' + (this.refs["date"] as DatePicker).state.selectedDate.toISOString() + '",' + 
                                                                              '"Id": "' + this._pubData.id + '"}}'}).then(res => res.json()).then(data => {
                                                                                  this._pubData = null;
                                                                                  this._form.setState({status:"Ready",user:this.props.context.props.props}); 
                                                                                  this._form.closeItem();
                                                                                  this.forceUpdate();
                                                                            });
    }

    public render(): JSX.Element {
    

    return (

      <div>       
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">
                      <TextField  ref='title' value={this._title} onChanged={this.handleChangeTitle} />
                </div>
                <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">
                <DatePicker
                  isRequired={false}
                  firstDayOfWeek={DayOfWeek.Sunday}
                  strings={DayPickerStrings}
                  value={this._date}
                  ref="date"
                  placeholder="Select a date..."
                  allowTextInput={true}
        />
                </div>
                <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">
                  <textarea value={this._body} onChange={this.handleChangeBody} cols={20} rows={20}  />
                </div>
            </div>
            <div className="ms-Grid-row">
              {(this._pubData == null) 
                ?
                
                 <DefaultButton
                    data-automation-id='test'
                    onClick={() => this.newItem()}
                    iconProps={ { iconName: 'Add' } }
                    description='Create new item'
                    text='Create item'
                />
              
                :
                   <DefaultButton
                   data-automation-id='test'
                   onClick={() => this.updateItem()}
                   iconProps={ { iconName: 'Add' } }
                   description='Update item'
                   text='Update item'
               />

              }
            </div>   
        </div>
      </div>
    );
  }
}