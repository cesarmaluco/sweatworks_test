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
    private _currentPub: any;

    constructor(props: any, state: any) {
        super(props);
        this._user = props;
        this.getPublications(this._user.id);
    }

    public componentWillMount() {
        this.getPublications(this._user.id);

    }

    public componentWillReceiveProps(nextProps: any): void {
        this._user = nextProps.props;
        if (this._user != null) {
            if (this._user.behalf != null)
                this.getPublications(this._user.behalf);
            else
                this.getPublications(this._user.id);
        }

    }

    public newItem() {
        this._showForm = true;
        this.forceUpdate();
    }

    public updateItem(item: any) {
        this._showForm = true;
        this._currentPub = item;
        this.setState({ publication: this._currentPub });
        this.forceUpdate();
    }

    public deleteItem(item: any) {
        this._currentPub = item;
        fetch('http://localhost:1340/api/publication/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"Publication":{"Id":"' + this._currentPub.id + '"}}' }).then(res => res.json()).then(data => {
            this.getPublications(this._user.id);
            this.forceUpdate();
        })
    }

    public formatDate(date: any) {
        return new Date(date);
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
                item.PubDate = new Date(item.PubDate);
                return (
                    <div className="ms-Grid-row" key={item.id}>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg2">
                            {item.Title}
                        </span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg2">
                            {(item.PubDate.getMonth() + 1) + '/' + item.PubDate.getDate() + "/" + item.PubDate.getFullYear()}
                        </span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4">
                            {(this._user.behalf == null || (this._user.behalf != null && this._user.behalf == this._user.id)) ?
                                <DefaultButton
                                    data-automation-id='test'
                                    onClick={() => this.deleteItem(item)}
                                    description='Delete publication'
                                    text='Delete'
                                />
                                :
                                ""
                            }
                        </span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4">
                            {(this._user.behalf == null || (this._user.behalf != null && this._user.behalf == this._user.id)) ?
                                <DefaultButton
                                    data-automation-id='test'
                                    onClick={() => this.updateItem(item)}
                                    description='Update publications'
                                    text='Update'
                                />
                                :
                                ""
                            }
                        </span>
                    </div>
                );
            });

            this.setState({ _items })


        });
    }


    public render() {
        if (this._user == null) return (<div></div>);

        return (
            
            <div className='ms-DetailsListAdvancedExample'>
                
                {(this._user.behalf == null || (this._user.behalf != null && this._user.behalf == this._user.id)) ?
                    <DefaultButton
                        data-automation-id='test'
                        onClick={() => this.newItem()}
                        iconProps={{ iconName: 'Add' }}
                        description='Create new item'
                        text='Create item'
                    />
                    : ""
                }
                <Panel
                    isOpen={this._showForm}
                    type={PanelType.smallFixedNear}
                    onDismiss={() => { this._showForm = false }}
                    headerText='New Item'
                >
                    <ItemForm context={this} props={this} />
                </Panel>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg2 ms-font-xl">Title</span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg2 ms-font-xl">Published Date</span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4 ms-font-xl">Delete</span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4 ms-font-xl">Update</span>
                    </div>
                    {_items}
                </div>
            </div>
        );
    }


}