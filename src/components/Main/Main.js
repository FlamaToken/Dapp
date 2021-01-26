import { NavLink, Switch, Route } from 'react-router-dom';
import Conversor from './../Conversor/index'
import Bridge from './../Bridge/index'

function Main() {
    return(
        <Switch>
            <Route exact path='/' component={Conversor}></Route>
            <Route exact path='/bridge' component={Bridge}></Route>
        </Switch>
    );
}

export default Main;
