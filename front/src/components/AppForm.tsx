import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { SignUp, IUser } from "./SignUp";
import { Authors } from "./Authors";
import { Publications } from "./Publications";
import {Login} from "./Login";
import {
  CheckboxVisibility,
  ColumnActionsMode,
  ConstrainMode,
  DetailsList,
  DetailsListLayoutMode as LayoutMode,
  IColumn,
  IGroup,
  Selection,
  SelectionMode,
  buildColumns
} from 'office-ui-fabric-react/lib/DetailsList';
import { timingSafeEqual } from 'crypto';

export interface IReactCrudState {
  status: string;
  user: IUser;
 
}

export  class AppForm extends React.Component<any, IReactCrudState> {
  
  private showPanel: boolean = true;

  constructor(props: any, state: IReactCrudState) {
    super(props);
   
    this.state = {
      status: this.playersNotConfigured(this.props) ? 'Please sign up or login' : 'Ready',
      user: this.fillUser(props)
    };
  }


  public componentWillReceiveProps(nextProps: any): void {
  
    this.setState({
      status: this.playersNotConfigured(nextProps) ? 'Please sign up or login ' : 'Ready',
      user: this.fillUser(nextProps)
    });

    if (this.state.status == "Ready"){
      this.forceUpdate();
    }
    
  }
  /**
   * playersNotConfigured: Checks to sse if users are properly set up
   */
  private playersNotConfigured(props: any): boolean {
    if (!this.state){
      return props.user === undefined;
    }
    else
      return this.state.user == undefined;
  }
  
  
  private fillUser(nextProps: any): IUser{
    return nextProps.user;
  }  

  public render(): JSX.Element {
    

    return (
      <div > 
      {this.state.status} 
      {(this.state.user)
                ?
                <span>{this.state.user.name}</span>
                :""
      }
      <div className="ms-Grid" style={{display:(this.playersNotConfigured(this.props)?"block":"none")}}>
          
         <Panel
          isOpen={ this.playersNotConfigured(this.props) }
          type={ PanelType.smallFixedNear }
          onDismiss={ () => {this.showPanel =  false} }
          headerText='Sign Up'
        >
          <SignUp context={this} />
          <hr/>
          <Login context={this}/>
        </Panel>
      </div>
      <div className="ms-Grid" style={{display:(!this.playersNotConfigured(this.props)?"block":"none")}}>
          <div className="ms-Grid" style={{display:(this.state.user ?"block":"none")}}>
               <div className="ms-Grid-row">
                 <p className="ms-Panel-headerText">Authors</p> 
                 <Authors ref='_users'/>
                
              </div>
               <div className="ms-Grid-row">
                 <p className="ms-Panel-headerText">Publications</p> 
                 <Publications props={this.state.user}/>
              </div>
              
              
          </div>
           
      </div>
      </div>
      
    );
  }
}