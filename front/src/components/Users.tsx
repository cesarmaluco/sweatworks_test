import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { SignUp, IUser } from "./SignUp";

let _items: JSX.Element[];



export class Users extends React.Component<any, any> {

    private _isFetchingItems: boolean;
    private _selection: Selection;
    private _showForm: boolean;

    constructor() {
        super();

    }

    public componentWillMount() {
        this.getUsers();

    }

    public componentWillUpdate() {
        this.getUsers();
    }

    public getUsers() {
        fetch('http://localhost:1340/api/consultarMensagem', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"filtros":{}}' }).then(res => res.json()).then(data => {
            let _data = data;
            let shouldUpdate = false;
            if ((_items) && (_items.length < _data.length))
                shouldUpdate = true;
            _items = _data.map((item: any, i: number): JSX.Element => {
                return (
                    <div className="ms-Grid-row" key={item._id}>
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg6">
                            {item.name}
                        </div>
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg6">
                            {item.email}
                        </div>
                    </div>
                );
            });
            if (shouldUpdate)
                this.setState({ _items })
        });
    }
    public newUser() {
        this._showForm = true;
        this.forceUpdate();
    }

    public render() {


        return (
            <div className='ms-DetailsListAdvancedExample'>
                <DefaultButton
                    data-automation-id='test'
                    onClick={() => this.newUser()}
                    iconProps={{ iconName: 'Add' }}
                    description='Create new user'
                    text='Create user'
                />
                <Panel
                    isOpen={this._showForm}
                    type={PanelType.smallFixedNear}
                    onDismiss={() => { this._showForm = false }}
                    headerText='New User'
                >
                    <SignUp context={this} role="user"/>
                </Panel>
                <div className="ms-Grid">
                    {_items}
                </div>
            </div>
        );
    }


}