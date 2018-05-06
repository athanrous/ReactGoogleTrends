import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js';

let data = {
  labels: [],
  datasets: [
    {
      label: '',
      data: []
    }
  ]
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', dataGraph: [], labels: [],values: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    axios.get('/trends/', { params: { word: this.state.value } }).then(res => {
  
      let lab = [];
      let val = [];
      res.data['data'].forEach(function(current_value) {
        lab.push(new Date(current_value['date']).toLocaleDateString());
        val.push(current_value[Object.keys(current_value)[1]]);
      });
      let ctx = document.getElementsByClassName("chartjs-render-monitor");
      let myChart = new Chart(ctx, {
        type: 'line',
        data: { labels: [], datasets: [{label: '', data: [] }] }
      });
      myChart.data['datasets'][0]['label'] = this.state.value;
      myChart.data['datasets'][0]['data'] = val;
      myChart.data['labels'] = lab;
      myChart.update();
    });
    event.preventDefault();
  }

  render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <label>
        Type your search term:
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <Line data={data} redraw={true} />
        </form>
        );
    }
  }

export default App;