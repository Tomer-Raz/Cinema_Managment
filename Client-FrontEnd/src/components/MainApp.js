import React from "react";
import { Route, Switch } from "react-router-dom";
import { IdContextProvider } from "./UserIdContext";
import { PermissionsContextProvider } from "./UserPermissionsContext";
import LoginComp from "./login/LoginComp";
import MainComp from "./login/MainComp";
import CreateAccountComp from "./login/CreateAccountComp";
import MoviesComp from "./movies/MoviesComp";
import SubscriptionsComp from "./subscriptions/SubscriptionsComp";
import ManageUsersComp from "./users/ManageUsersComp";
import AddUserComp from "./users/AddUserComp";
import EditUserComp from "./users/EditUserComp";
import AddMovieComp from "./movies/AddMovieComp";
import EditMovieComp from "./movies/EditMovieComp";
import AddMemberComp from "./subscriptions/AddMemberComp";
import EditMemberComp from "./subscriptions/EditMemberComp";
import HomeComp from "./login/HomeComp";

function MainApp() {
	return (
		<div style={{ textAlign: "center", color: "white" }}>
			<h1 style={{ textShadow: "2px 2px 4px #000000" }}>Movies - Subscriptions Web Site</h1><br />
			<IdContextProvider>
				<PermissionsContextProvider>
					<Switch>
						<Route exact path="/" component={LoginComp} />
						<Route path="/MainComp/:firstName" component={MainComp} />
						<Route path="/HomeComp/:firstName" component={HomeComp} />
						<Route path="/CreateAccountComp" component={CreateAccountComp} />
						<Route exact path="/MoviesComp/:firstName" component={MoviesComp} />
						<Route exact path="/MoviesComp/:firstName/:movieWatchedName" component={MoviesComp} />
						<Route exact path="/SubscriptionsComp/:firstName" component={SubscriptionsComp} />
						<Route exact path="/SubscriptionsComp/:firstName/:memberId" component={SubscriptionsComp} />
						<Route path="/ManageUsersComp/:firstName" component={ManageUsersComp} />
						<Route path="/AddUserComp/:firstName" component={AddUserComp} />
						<Route path="/EditUserComp/:firstName/:id" component={EditUserComp} />
						<Route path="/AddMovieComp/:firstName" component={AddMovieComp} />
						<Route path="/EditMovieComp/:firstName/:movieId" component={EditMovieComp} />
						<Route path="/AddMemberComp/:firstName" component={AddMemberComp} />
						<Route path="/EditMemberComp/:firstName/:memberId" component={EditMemberComp} />
					</Switch>

				</PermissionsContextProvider>
			</IdContextProvider>
		</div>
	);
}
export default MainApp;
