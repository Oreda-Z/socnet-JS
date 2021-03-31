import React from "react";
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setToggleIsFetching,
    setUsers,
    setUsersTotalCount,
    unFollow
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.setToggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
            this.props.setToggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setUsersTotalCount(data.totalCount);
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.setToggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.setToggleIsFetching(false);
            this.props.setUsers(data.items);
        });
    }

    render() {

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                {this.props.isFetching === false ? <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unFollow={this.props.unFollow}

                /> : ""}

            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setUsersTotalCount,
    setToggleIsFetching,
})(UsersContainer);