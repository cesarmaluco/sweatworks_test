import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { ItemForm } from './ItemForm';
import { IUser } from "./SignUp";
let _items: JSX.Element[];



export class Publications extends React.Component<any, any> {

    private _isFetchingItems: boolean;
    private _selection: Selection;
    private _showForm: boolean;
    private _user: IUser;

    constructor(props: any) {
        super(props);
        this._user = props;
        this.getPublications(this._user.id);
    }

    public componentWillMount() {
        this.getPublications(this._user.id);

    }

    public componentWillReceiveProps(nextProps: any): void {
        this._user = nextProps.props;
        this.getPublications(this._user.id);

    }

    public componentWillUpdate() {
        
    }

    public newItem() {
        this._showForm = true;
        this.forceUpdate();
    }

    public closeItem() {
        this._showForm = false;
        this.getPublications(this._user.id);
        this.forceUpdate();
    }

    public getPublications(authorId: any) {
        if (authorId == null)
            return;

        fetch('http://localhost:1340/api/publication/search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"filters":{"AuthorId":"' + authorId + '"}}' }).then(res => res.json()).then(data => {
            let _data = data;
            let shouldUpdate = false;

            _items = _data.map((item: any, i: number): JSX.Element => {
                return (
                    <div className="ms-Grid-row" key={item._id}>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4">
                            {item.Title}
                        </span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4">
                            <DefaultButton
                                data-automation-id='test'
                                description='Create new item'
                                text='Delete'
                            />
                        </span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4">
                            <DefaultButton
                                data-automation-id='test'
                                onClick={() => this.newItem()}
                                description='Create new item'
                                text='Update'
                            />
                        </span>
                    </div>
                );
            });

            this.setState({ _items })


        });
    }


    public render() {

        return (
            <div className='ms-DetailsListAdvancedExample'>
                <DefaultButton
                    data-automation-id='test'
                    onClick={() => this.newItem()}
                    iconProps={{ iconName: 'Add' }}
                    description='Create new item'
                    text='Create item'
                />
                <Panel
                    isOpen={this._showForm}
                    type={PanelType.smallFixedNear}
                    onDismiss={() => { this._showForm = false }}
                    headerText='New Item'
                >
                    <ItemForm context={this} />
                </Panel>
                <div className="ms-Grid">
                    {_items}
                </div>
            </div>
        );
    }


}