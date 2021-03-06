import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { SignUp, IUser } from "./SignUp";

let _items: JSX.Element[];



export class Authors extends React.Component<any, any> {

    private _isFetchingItems: boolean;
    private _selection: Selection;
    private _showForm: boolean;
    private _callbackPub : any;
    

    constructor(props: any) {
        super(props);
        this._callbackPub = props.props._callBackPublication;
    }

    public callBackPublications(id: any){
        this._callbackPub(id);
    }

    public componentWillMount() {
        this.getUsers();

    }

    public componentWillReceiveProps(nextProps: any): void {
        this.getUsers();
    }

    public componentWillUpdate() {
        this.getUsers();
    }

    public getUsers() {
        fetch('http://localhost:1340/api/author/search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"data":{}}' }).then(res => res.json()).then(data => {
            let _data = data;
          
          
            _items = _data.map((item: any, i: number): JSX.Element => {
                return (
                    <div className="ms-Grid-row" key={item.id}>
                         <span className="ms-Grid-col ms-u-lg4">
                            <DefaultButton
                                description='Create new item'
                                onClick={() => this.callBackPublications(item.id)}
                                text='Check Publications'
                            />
                        </span>
                        <span className="mns-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4">
                            {item.user}
                        </span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4">
                            {item.name}
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
                
               
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4 ms-font-xl">Actions</span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4 ms-font-xl">Name</span>
                        <span className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-lg4 ms-font-xl">E-mail</span>
                    </div>
                    {_items}
                </div>
            </div>
        );
    }


}