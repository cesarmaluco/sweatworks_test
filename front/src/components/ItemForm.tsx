import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import fetch  from 'node-fetch';

export interface IItem {
  name?: string;
}

export interface IRole {
  type: string;
}

export  class ItemForm extends React.Component<any, IItem> {

    private showPanel: boolean = false;
    private _form : any;
    private _callback: any;
    constructor(props: any, state: IItem) {
        super(props);
        this._form = props.context;   
        this._callback = props.callback; 
    }

    private newItem()
    {
        fetch('http://localhost:1340/api/criarItem',{ method: 'POST',headers: { 'Content-Type': 'application/json'}, body: '{"Item":{' + 
	                                                                            '"name": "' + this.refs["name"].value + '"}}'}).then(res => res.json()).then(data => {
                                                                                  let _data = data; 
                                                                                  let _item : IItem = {name:_data.name};
                                                                                  this._form.setState({status:"Ready",user:_item}); 
                                                                                  
                                                                                  this.forceUpdate();
                                                                            });
    }

    public render(): JSX.Element {
    

    return (
      <div>       
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg12">
                  
                      <TextField label='Name' ref='name' />
                </div>
            </div>
            <div className="ms-Grid-row">
                 <DefaultButton
                    data-automation-id='test'
                    onClick={() => this.newItem()}
                    iconProps={ { iconName: 'Add' } }
                    description='Create new item'
                    text='Create item'
                />
            </div>   
        </div>
      </div>
    );
  }
}