import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.spaceXdata.com/v3/launches?limit=100")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div id="loader"><Loader
        type="ThreeDots"
        color="#000000"
        height={100}
        width={100}
        timeout={3000} 
      /></div>;
    } else {
      return (
      <div style={{backgroundColor: "#FAEBD7"}}>
        <nav className="navbar navbar-dark bg-primary">
          <div className="container-fluid">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                Filter
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><button class="dropdown-item" type="button">Action</button></li>
                <li><button class="dropdown-item" type="button">Another action</button></li>
                <li><button class="dropdown-item" type="button">Something else here</button></li>
              </ul>
            </div>
            <a className="navbar-brand">SPACEX DataSet</a>
          </div>
        </nav>

        <h3> SpaceX DataSet</h3>
        <div id="showTable">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col">Filght Number</th>
                <th scope="col">Mission Name</th>
                <th scope="col">Launch date</th>
                <th scope="col">Launch year</th>
              </tr>
            </thead>

            <tbody>
              {items.map(item => (
              <tr>
                <th scope="row">{item.flight_number}</th>
                <td>{item.mission_name}</td>
                <td>{item.launch_date_local}</td>
                <td>{item.launch_year}</td>
              </tr>
              ))}
            </tbody>
          </table> 
        </div>
      </div> 
      );
    }
  }
}

export default App;

