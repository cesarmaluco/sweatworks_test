import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { SignUp, IUser } from "./SignUp";

let _items: JSX.Element[];



export class Authors extends React.Component<any, any> {

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
        fetch('http://localhost:1340/api/author/search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"data":{}}' }).then(res => res.json()).then(data => {
            let _data = data;
            let shouldUpdate = false;
            if ((_items) && (_items.length < _data.length))
                shouldUpdate = true;
            _items = _data.map((item: any, i: number): JSX.Element => {
                return (
                    <div className="ms-Grid-row" key={item._id}>
                        <span className="mns-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg4">
                            {item.name}
                        </span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg4">
                            {item.user}
                        </span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg4">
                        <DefaultButton
                                data-automation-id='test'
                                description='Create new item'
                                text='Check Publications'
                            />
                        </span>
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