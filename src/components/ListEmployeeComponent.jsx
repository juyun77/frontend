import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      currentDate: "", // 추가: 현재 날짜를 표시하기 위한 state
    };
    // bind methods
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployeeById = this.deleteEmployeeById.bind(this);
    this.viewEmployee = this.viewEmployee.bind(this);
  }

  // route to update employee page with path variable id
  editEmployee(id) {
    this.props.history.push(`/update-employee/${id}`);
  }

  // route to view employee page
  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
  }

  // delete employee by id
  deleteEmployeeById(id) {
    EmployeeService.deleteById(id).then((res) => {
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== id
        ),
      });
    });
  }

  // fill employees array on component mount
  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({
        employees: res.data,
        currentDate: this.getCurrentDate(), // 현재 날짜를 설정
      });
    });
  }

  // 추가: 현재 날짜를 가져오는 메서드
  getCurrentDate() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  }

  // route to add employee page
  addEmployee() {
    this.props.history.push("/add-employee");
  }

  render() {
    return (
      <div>
        <h2 className="text-center" style={{ marginTop: "10px" }}>
          To do list
        </h2>
        <p className="text-right">To day: {this.state.currentDate}</p>
        <div className="row">
  <button
    className="btn btn-secondary"
    style={{ marginBottom: "10px" }}
    onClick={this.addEmployee}
  >
    할 일 추가
  </button>
</div>

        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>DUE DATE</th>
                <th style={{ width: "50%" }}>WHAT</th>
                <th>DONE</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td style={{ width: "10%" }}>{employee.firstName}</td>
                  <td style={{ width: "50%" }}>{employee.lastName}</td>
                  <td>
                    <button
                      onClick={() => this.editEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => this.deleteEmployeeById(employee.id)}
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                    >
                      완료
                    </button>

                    <button
                      onClick={() => this.viewEmployee(employee.id)}
                      className="btn btn-secondary"
                      style={{ marginLeft: "10px" }}
                    >
                      자세히
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponent;
