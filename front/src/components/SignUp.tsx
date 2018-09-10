import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import fetch from 'node-fetch';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { addMonths, addYears } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';

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

export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    behalf?: any;
    birthDate? : any;
    roles?: IRole[];
}

export interface IRole {
    type: string;
}

export class SignUp extends React.Component<any, IUser> {

    private showPanel: boolean = false;
    private _form: any;
    private _role: string = "admin";
    private _callback: any;
    private _user: IUser;
    private _birthDate : any;
    

    constructor(props: any, state: IUser) {
        super(props);
        this._form = props.context;
        this._role = props.role;
        this._user = {name : ""}
        this._birthDate = new Date();
        if (props.context.state.user != null) {
            this._user = props.context.state.user;
            this._birthDate = new Date(this._user.birthDate);
        }
    }

    validate(name: any, pwd: any,email: any) {
        // true means invalid, so our conditions got reversed
        return (
           name.length === 0 ||
           pwd.length === 0 ||
           email.length === 0
        )
      }

    private signUp() {
        if (this.validate( (this.refs.name as any).value,(this.refs["pwd"] as any).value,(this.refs["email"] as any).value ))
            return;

        fetch('http://localhost:1340/api/author/create', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"Author":{' +
                '"Name": "' + (this.refs.name as any).value + '",' +
                '"User" : "' + (this.refs["email"] as any).value + '",' +
                '"BirthDate" : "' + (this.refs["date"] as DatePicker).state.selectedDate.toISOString()  + '",' +
                '"Pwd": "' + (this.refs["pwd"] as any).value + '"}}'
        }).then(res => res.json()).then(data => {
            let _data = data;
            let _user: IUser = { name: _data.Name, email: _data.User, id: _data.Id ,   birthDate : data.BirthDate};
            this._form.setState({ status: "Ready", user: _user });
            this.forceUpdate();
        });
    }

    private update() {
        if (this.validate( (this.refs.name as any).value,(this.refs["pwd"] as any).value,(this.refs["email"] as any).value ))
            return;

        fetch('http://localhost:1340/api/author/update', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"Author":{' +
                '"Name": "' + (this.refs.name as any).value + '",' +
                '"User" : "' + (this.refs["email"] as any).value + '",' +
                '"Id" : "' + this._user.id + '",' +
                '"BirthDate" : "' + (this.refs["date"] as DatePicker).state.selectedDate.toISOString()  + '",' +
                '"Pwd": "' + (this.refs["pwd"] as any).value + '"}}'
        }).then(res => res.json()).then(data => {
            let _data = data;
            let _user: IUser = { name: _data.Name, email: _data.User, id: _data.Id, birthDate: _data.BirthDate };
            this._form.setState({ status: "Ready", user: _user });
            this.forceUpdate();
        });
    }

    public render(): JSX.Element {


        return (
            <div>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">

                            <TextField label='Name' ref='name' value={this._user.name} required={true} errorMessage="Name required" />
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">

                            <TextField label='E-mail' ref='email' value={this._user.email} required={true} errorMessage="E-mail required"/>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">

                            <TextField label='Password' type="password" ref='pwd' required={true} errorMessage="Password required"/>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">

                             <DatePicker
                                    isRequired={false}
                                    firstDayOfWeek={DayOfWeek.Sunday}
                                    strings={DayPickerStrings}
                                    value={this._birthDate}
                                    ref="date"
                                    label="Date of birth"
                                    placeholder="Select a date of birth..."
                                    allowTextInput={true}
                            />
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                    {(this._user.name == "")  ?
                        <DefaultButton
                            data-automation-id='test'
                            onClick={() => this.signUp()}
                            iconProps={{ iconName: 'Add' }}
                            description='Create new user'
                            text='Create account'
                        />
                        :
                        <DefaultButton
                            data-automation-id='test'
                            onClick={() => this.update()}
                            description='Create new user'
                            text='Update account'
                        />
                    }
                    </div>
                </div>
            </div>
        );
    }
}