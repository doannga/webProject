import React, { Component } from "react";
import CareerGroupsChart from './career_groups_chart'
import CareerGroupsBar from './career_groups_bar'

class AnalysistPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            career_groups: [],
            careers: [],
            address: []
        }
    }

    componentDidMount() {
        fetch("http://127.0.0.1:5000/career_groups", { method: "GET" })
            .then(res => res.json())
            .then(
                result => {
                    console.log("result: ", result);
                    this.setState({
                        isLoaded: true,
                        career_groups: this.getCareerGroups(result.result),
                        careers: this.getCareersInCareerGroup(result.result)
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
        fetch("http://127.0.0.1:5000/tinh_tpho", { method: "GET" })
            .then(res => res.json())
            .then(
                result => {
                    console.log("result: ", result);
                    this.setState({
                        isLoaded: true,
                        address: result.result
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    getCareerGroups = (result) => {
        var career_groups = []
        result.forEach(item => {
            career_groups.push(item.name)
        });
        return career_groups
    }

    getCareersInCareerGroup = (result) => {
        var careers = []
        result.forEach(item => {
            careers = careers.concat(item.careers)
        });
        return careers
    }

    render() {
        const { error, isLoaded, career_groups, careers, address } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <CareerGroupsChart career_groups={career_groups} />
                    <CareerGroupsBar careers={careers} address={address} />
                </div>
            );
        }
    }
}

export default AnalysistPage;