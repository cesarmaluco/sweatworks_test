import * as React from 'react';
import { IUser, IRole } from './SignUp';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class Login extends React.Component<any, IUser> {

    private showPanel: boolean = false;
     private _form : any;
    constructor(props: any, state: IUser) {
        super(props);
        this._form = props.context;
    }

    public logIn() {
        fetch('http://localhost:1340/api/login', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"filtros":{' +

                '"email" : "' + this.refs["email"] + '",' +

                '"senha": "' + this.refs["pwd"] + '"}}'
        }).then(res => res.json()).then(data => {
            let _data = data;
            let _user: IUser = { nome: _data.name, email: _data.email, roles: _data.roles };
            this._form.setState({ status: "Ready", user: _user });
            this.forceUpdate();
        });
    }

    public render(): JSX.Element {


        return (
            <div >
                <p className="ms-Panel-headerText">Login</p>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">

                            <TextField label='E-mail' ref="email"/>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">
                            <TextField label='Password' type="password" ref="pwd"/>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <DefaultButton
                            onClick={() => this.logIn()}
                            data-automation-id='test'
                            description='Login'
                            text='Login'
                        />
                    </div>
                </div>
            </div>
        );
    }
}