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
    validate(pwd: any,email: any) {
        // true means invalid, so our conditions got reversed
        return (
            email.length === 0 ||
            pwd.length === 0 
        )
    }
      
    public logIn() {

        if (this.validate( (this.refs["pwd"] as any).value,(this.refs["email"] as any).value ))
            return;

        fetch('http://localhost:1340/api/login', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"data":{' +

                '"Email" : "' + (this.refs["email"] as any).value + '",' +

                '"Pwd": "' + (this.refs["pwd"] as any).value + '"}}'
        }).then(res => res.json()).then(data => {
            let _data = data;
            if (!data.name){
                //erro
            }
            else{
                let _user: IUser = { name: _data.name, email: _data.user, id: _data.id, birthDate: _data.BirthDate};
                this._form.setState({ status: "Ready", user: _user });
            }
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

                            <TextField label='E-mail' ref="email" required={true} errorMessage="Email required" />
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">
                            <TextField label='Password' type="password" ref="pwd" required={true} errorMessage="Password required" />
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