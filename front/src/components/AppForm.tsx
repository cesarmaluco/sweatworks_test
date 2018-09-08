import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { SignUp, IUser } from "./SignUp";
import { Authors } from "./Authors";
import { Publications } from "./Publications";
import { Login } from "./Login";
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
import { CommandBar, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';
import { Persona, PersonaSize, PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';


export interface IReactCrudState {
  status: string;
  user: IUser;

} 

export class AppForm extends React.Component<any, IReactCrudState> {

  private showPanel: boolean = true;
  private _callBackPublication: any;
  private _persona : any;
  constructor(props: any, state: IReactCrudState) {
    super(props);
    
    this.state = {
      status: this.playersNotConfigured(this.props) ? 'Please sign up or login' : 'Ready',
      user: this.fillUser(props)
    };

    this._callBackPublication = this.callBackPublications;
    this.logOut = this.logOut.bind(this);
  }


  public componentWillReceiveProps(nextProps: any): void {

    this.setState({
      status: this.playersNotConfigured(nextProps) ? 'Please sign up or login ' : 'Ready',
      user: this.fillUser(nextProps)
    });

    if (this.state.status == "Ready") {
      this.forceUpdate();
    }

  }
  /**
   * playersNotConfigured: Checks to sse if users are properly set up
   */
  private playersNotConfigured(props: any): boolean {
    if (!this.state) {
      return props.user === undefined;
    }
    else{
      this.fillUser(this.state);
      return this.state.user == undefined;

    }
  }


  private fillUser(nextProps: any): IUser {
    let name = (nextProps.user != null ? nextProps.user.name : "");
    let initials = name.split(' ');
    let imgIni = '';
    if (initials.length > 1)
       imgIni = initials[0].substring(0,1) + initials[1].substring(0,1);
    else
       imgIni = initials[0].substring(0,1) ;

    this._persona = {
      imageUrl: '',
      secondaryText: 'Author',
      imageInitials: imgIni ,
      text: name
    };

    return nextProps.user;
  }

  logOut(evt: any){
    this.setState({status:"Please sign up or login", user: null});
    this.forceUpdate();
  }

  changeDetails(){

  }

  private callBackPublications(id: any) {
    this.props.props.state.user.behalf = id;
    this.props.props.setState({ status: "Ready", user: this.props.props.state.user })

  }

  public render(): JSX.Element {


    return (
      <div >
        
        {(this.state.user)
          ?
          <div>
            <span> <Persona {...this._persona} size={PersonaSize.regular}  /></span>
            <CommandBar
              items={ [
                {
                  key: 'properties',
                  name: 'Log out',
                  eventDetail: this.props.eventDetail,
                  eventForm: this.props.eventForm,
                  event: this.props.event,
                  onClick: this.logOut
                },
                 {
                  key: 'guestservices',
                  name: 'Change Author Details',
                  eventDetail: this.props.eventDetail,
                  inviteForm: this.props.inviteForm,
                  event: this.props.event,
                  onClick: this.changeDetails
                }]}
              
            />
          </div>
          : ""
        }
        <div className="ms-Grid" style={{ display: (this.playersNotConfigured(this.props) ? "block" : "none") }}>

          <Panel
            isOpen={this.playersNotConfigured(this.props)}
            type={PanelType.smallFixedNear}
            onDismiss={() => { this.showPanel = false }}
            headerText='Sign Up'
          >
            <SignUp context={this} />
            <hr />
            <Login context={this} />
          </Panel>
        </div>
        <div className="ms-Grid" style={{ display: (!this.playersNotConfigured(this.props) ? "block" : "none") }}>
          <div className="ms-Grid" style={{ display: (this.state.user ? "block" : "none") }}>
            <div className="ms-Grid-row">
              <p className="ms-Panel-headerText">Authors</p>
              <Authors ref='_users' props={this} />

            </div>
            <div className="ms-Grid-row">
              <p className="ms-Panel-headerText">Publications</p>
              <Publications props={this.state.user} />
            </div>


          </div>

        </div>
      </div>

    );
  }
}