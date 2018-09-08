import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import fetch from 'node-fetch';

export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    behalf?: any;
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

    constructor(props: any, state: IUser) {
        super(props);
        this._form = props.context;
        this._role = props.role;
        this._user = {name : ""}
        if (props.context.state.user != null) 
            this._user = props.context.state.user;
    }

    private signUp() {
        fetch('http://localhost:1340/api/author/create', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"Author":{' +
                '"Name": "' + (this.refs.name as any).value + '",' +
                '"User" : "' + (this.refs["email"] as any).value + '",' +
                '"Pwd": "' + (this.refs["pwd"] as any).value + '"}}'
        }).then(res => res.json()).then(data => {
            let _data = data;
            let _user: IUser = { name: _data.Name, email: _data.User, id: _data.Id };
            this._form.setState({ status: "Ready", user: _user });
            this.forceUpdate();
        });
    }

    private update() {
        fetch('http://localhost:1340/api/author/update', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"Author":{' +
                '"Name": "' + (this.refs.name as any).value + '",' +
                '"User" : "' + (this.refs["email"] as any).value + '",' +
                '"Id" : "' + this._user.id + '",' +
                '"Pwd": "' + (this.refs["pwd"] as any).value + '"}}'
        }).then(res => res.json()).then(data => {
            let _data = data;
            let _user: IUser = { name: _data.Name, email: _data.User, id: _data.Id };
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

                            <TextField label='Name' ref='name' value={this._user.name} />
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">

                            <TextField label='E-mail' ref='email' value={this._user.email} />
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">

                            <TextField label='Password' type="password" ref='pwd'/>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                    {(this._user == null)  ?
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